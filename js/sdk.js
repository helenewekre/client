const SDK = {
    serverURL: 'http://localhost:9988/',
    request: (options, callback) => {


        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: options.header,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(SDK.encrypt(JSON.stringify(options.data))),
            success: (data, status, xhr) => {
                data =  SDK.decrypt(data);
                data = JSON.parse(data);

                callback(null, data, status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                callback({xhr: xhr, status: status, error: errorThrown});
            }
        });
    },
    User: {
        loadUser: (callback) => {
            SDK.request({
                method: "GET",
                url: "api/user/myuser",
                header: {
                    authorization: SDK.Storage.load('Token')
                },

            }, (e, user) => {
                if (e)
                    return callback(e);
                SDK.Storage.persist('User', user);
                callback(null, user);
            });
        },
        currentUser: () => {
          return SDK.Storage.load('User');

        },
        login: (username, password, callback) => {
            SDK.request({
                data: {
                    username: username,
                    password: password
                },
                url: 'api/user/login',
                method: 'POST'
            }, (e, data) => {
                if (e)
                    return callback(e);
                SDK.Storage.persist('Token', data);
               // SDK.Storage.persist('Username', data.username)
               // SDK.Storage.persist('Type', data.type)
                callback(null, data);
            });
        },
        signup: (username, password, callback) => {

            SDK.request({
                data: {
                    username: username,
                    password: password
                },
                method: "POST",
                url: "api/user/signup"
            }, (e, data) => {
                if (e) return callback(e);

                callback(null, data);
            });

        },

        logout: () => {
            SDK.Storage.remove('User');
            SDK.Storage.remove('Token');
            window.location.href = '/index.html'

        }
    },
    Course: {
        loadCourses: (callback) => {
            SDK.request({
                method: 'GET',
                url: 'api/course',
                header: {
                    authorization: SDK.Storage.load('Token')
                }

            }, SDK.decrypt(callback)
                /*(e, course) => {
                    if (e) return callback(e);
                    callback(null, course)

                } */
            );
           // console.log(callback);
        },
        currentCourse: (callback) => {
            return SDK.Storage.load('Course')
        }
    },
    Quiz: {
        loadAll: (callback) => {
            SDK.request({
                    method: 'GET',
                    url: 'api/quiz/' + SDK.Course.currentCourse('course_id'),
                    //url: 'api/quiz/' + SDK.Course.currentCourse().id,
                    header: {
                        authorization: SDK.Storage.load('Token')
                    }
                }, callback);
        },
        currentQuiz: () => {
            return SDK.Storage.load('Quiz')

        },
        create: (title, description, courseId, questions, createdBy, callback) => {
            SDK.request({
                method: 'POST',
                url: 'api/quiz',
                data: {
                    title: title,
                    description: description,
                    courseId: courseId,
                    questions: questions,
                    createdBy: createdBy
                },
                header: {
                    authorization: SDK.Storage.load('Token')
                }
            }, (e, data) => {
                    if (e) return callback(e);

                    callback(null, data);
            });
        },
        createQuestion: (question, quizId, callback) => {
            SDK.request({
                method: 'POST',
                url: 'api/question/' + quizId,
                data: {
                    question: question,
                    quizId: quizId
                }
                }, (e, data) => {
                    if(e) return callback(e);
                    callback(null, data);
                });
        },
        createOptions: (option, questionId, status, callback) => {
            SDK.request({
                method:'POST',
                url: 'api/option/' + questionId,
                data: {
                    option: option,
                    questionId: questionId,
                    status: status
                }
                }, (e, data) => {
                    if(e) return callback(e);
                    callback(null, data);
                });
        },
        loadQuestions: () => {

        },
        loadOptions: () => {
        }
    },
    Storage: {
        prefix: 'ExamQuiz',
        persist: (key, value) => {
            window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value);
        },
        load: (key) => {
            const value
                = window.localStorage.getItem(SDK.Storage.prefix + key);
            try {
                return JSON.parse(value);
            } catch (e) {
                return value;
            }
        },
        remove: (key) => {
            window.localStorage.removeItem(SDK.Storage.prefix + key);
        }
    },
    encrypt: (encrypt) => {
        if (encrypt !== undefined && encrypt.length !== 0) {
            const key = ['L', 'Y', 'N'];
            let isEncrypted = '';
            for (let i = 0; i < encrypt.length; i++) {
                isEncrypted += (String.fromCharCode((encrypt.charAt(i)).charCodeAt(0) ^ (key[i % key.length]).charCodeAt(0)))
            }
            return isEncrypted;
        } else {
            return encrypt;
        }
    },

    decrypt:
        (decrypt) => {
            if (decrypt !== undefined && decrypt.length !== 0) {
                const key = ['L', 'Y', 'N'];
                let isDecrypted = '';
                for (let i = 0; i < decrypt.length; i++) {
                    isDecrypted += (String.fromCharCode((decrypt.charAt(i)).charCodeAt(0) ^ (key[i % key.length]).charCodeAt(0)))
                }
                return isDecrypted;
            } else {
                return decrypt;
            }
        },
};
