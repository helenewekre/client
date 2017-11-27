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

        logout: (userId, callback) => {
            SDK.request({
                method: 'POST',
                url: 'api/user/logout',
                data: userId,
            }, (e, data) => {
                if (e) return callback(e);
                callback(null, data);
            });

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

            }, //callback
                (e, course) => {
                    if (e) return callback(e);
                    callback(null, course)

                }
            );
           // console.log(callback);
        },
        currentCourse: (callback) => {
            return SDK.Storage.load('Course')
        }
    },
    Quiz: {
        loadAll: (callback) => {
            const courseId = SDK.Storage.load('courseID');
            SDK.request({
                    method: 'GET',
                    url: 'api/quiz/' + courseId,
                    header: {
                        authorization: SDK.Storage.load('Token')
                    }
                },
                (e, quiz) => {
                    if (e) return callback(e);
                    callback(null, quiz)

                });
        },
        loadQuestions: (callback) => {
            const quizId = SDK.Storage.load('quizID');
            SDK.request({
                    method: 'GET',
                    url: 'api/question/' + quizId,
                    header: {
                        authorization: SDK.Storage.load('Token')
                    }
                },
                (e, question) => {
                    if (e) return callback(e);
                    callback(null, question)
                });
        },
        loadOptions: (callback) => {
            const questionId = SDK.Storage.load('questionId');
            SDK.request({
                    method: 'GET',
                    url: 'api/option/' + questionId,
                    header: {
                        authorization: SDK.Storage.load('Token')
                    }
                },
                (e, option) => {
                    if (e) return callback(e);
                    callback(null, option)

                });
        },
        currentQuiz: () => {
            return SDK.Storage.load('Quiz')

        },
        create: (createdBy, questionCount, quizTitle, quizDescription, courseId, callback) => {
            SDK.request({
                method: 'POST',
                url: 'api/quiz',
                data: {
                    createdBy: createdBy,
                    questionCount: questionCount,
                    quizTitle: quizTitle,
                    quizDescription: quizDescription,
                    courseId: courseId,
                },
                header: {
                    authorization: SDK.Storage.load('Token')
                }
            }, (e, data) => {
                    if (e) return callback(e);

                    callback(null, data);
            });
        },
        createQuestion: (question, questionToQuizId, callback) => {
            SDK.request({
                method: 'POST',
                url: 'api/question',
                data: {
                    question: question,
                    questionToQuizId: questionToQuizId
                },
                header: {
                    authorization: SDK.Storage.load('Token')
                }
                }, (e, data) => {
                    if(e) return callback(e);
                    callback(null, data);
                });
        },
        createOptions: (option, questionId, isCorrect, callback) => {
            SDK.request({
                method:'POST',
                url: 'api/option',
                data: {
                    option: option,
                    questionId: questionId,
                    isCorrect: isCorrect
                },
                header: {
                    authorization: SDK.Storage.load('Token')
                }
                }, (e, data) => {
                    if(e) return callback(e);
                    callback(null, data);
                });
        },
        deleteQuiz: (callback) => {
            //const quizIdToDelete = SDK.Storage.load('quizID');
            const quizToDelete = SDK.Storage.load('quizToDelete');
            const quizId = quizToDelete.quizId;
          //  const quizIdToDelete = quizToDelete.quizId;
            console.log(quizId);

            SDK.request({
                method:'DELETE',
                url: 'api/quiz/' + quizId,
                header: {
                    authorization: SDK.Storage.load("Token")
                },
            }, (e, data) => {
                if (e) return callback(e);
                callback(null, data)
            });

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
