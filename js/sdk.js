const SDK = {
    //URL to local server
    serverURL: 'http://localhost:9988/',

    //Requests server
    request: (options, callback) => {

        //Using AJAX (acynchronous communication)
        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: options.header,
            contentType: 'application/json',
            dataType: 'json',
            //Adding encryption to the data that is sent
            data: JSON.stringify(SDK.encrypt(JSON.stringify(options.data))),
            success: (data, status, xhr) => {
                //On success data is decrypted and parsed as JSON object
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
        //Loads user
        loadUser: (callback) => {
            SDK.request({
                method: "GET",
                url: "api/user/myuser",
                header: {
                    //Token is necessary as authorization, therefor sent in header.
                    authorization: SDK.Storage.load('Token')
                },

            }, (e, user) => {
                if (e)
                    return callback(e);
                //Persists user object on error.
                SDK.Storage.persist('User', user);
                callback(null, user);
            });
        },
        //Current user load request
        currentUser: () => {
          return SDK.Storage.load('User');

        },
        //Log in request, username and password must be sendt in request, therefore params
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
                callback(null, data);
            });
        },
        //Sign up request
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
        //Log out request
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
        //Request loads courses
        loadCourses: (callback) => {
            SDK.request({
                method: 'GET',
                url: 'api/course',
                header: {
                    authorization: SDK.Storage.load('Token')
                }

            },
                (e, course) => {
                    if (e) return callback(e);
                    callback(null, course)

                }
            );
        }
    },
    Quiz: {
        //Loads all quizzes in DB
        loadAll: (callback) => {
            const courseId = SDK.Storage.load('courseID');
            SDK.request({
                    method: 'GET',
                    url: 'api/quiz/' + courseId,
                    header: {
                        //To access this method, user must be authorized by token
                        authorization: SDK.Storage.load('Token')
                    }
                },
                (e, quiz) => {
                    if (e) return callback(e);
                    callback(null, quiz)

                });
        },
        //Load question request. Uses token as authorizatoin.
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
        //Loads option to questions
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
        //Create quiz request, several params must be sent with method. Uses token authorization.
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
        //Creates question
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
        //Creates options
        createOptions: (option, questionId, isCorrect, callback) => {
            console.log(option);
            console.log(questionId);
            console.log(isCorrect);
            SDK.request({
                method:'POST',
                url: 'api/option',
                data: {
                    option: option,
                    optionToQuestionId: questionId,
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
        //Request for deleting quiz.
        deleteQuiz: (callback) => {
            const quizToDelete = SDK.Storage.load('quizToDelete');
            const quizId = quizToDelete.quizId;
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
    //Using local storage on the given computer to remember chosen values (fx quiz id)
    Storage: {
        //Prefix put before token in the given localstorage
        prefix: 'ExamQuiz',
        //This persist method saves values in the local storage
        persist: (key, value) => {
            window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value);
        },
        //Method for loading the value persisted in local storage
        load: (key) => {
            const value
                = window.localStorage.getItem(SDK.Storage.prefix + key);
            try {
                return JSON.parse(value);
            } catch (e) {
                return value;
            }
        },
        //Method for removing values of a given key in local storage.
        remove: (key) => {
            window.localStorage.removeItem(SDK.Storage.prefix + key);
        }
    },
    //Encryption method used on data sent to server.
    encrypt: (encrypt) => {
        if (encrypt !== undefined && encrypt.length !== 0) {
            //Encryption Keys. Theese must be recognized on the server.
            const key = ['L', 'Y', 'N'];
            let isEncrypted = '';
            for (let i = 0; i < encrypt.length; i++) {
                //Encryption algorithm
                isEncrypted += (String.fromCharCode((encrypt.charAt(i)).charCodeAt(0) ^ (key[i % key.length]).charCodeAt(0)))
            }
            return isEncrypted;
        } else {
            return encrypt;
        }
    },
    //Method to decrypt data from the server.
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
