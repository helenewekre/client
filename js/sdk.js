const SDK = {
    serverURL: 'http://localhost:9988/',
    request: (options, callback) => {


        let header = {};

        if (options.header) {
            Object.keys(options.header).forEach((i) => {
                header[i] = (typeof options.header(i) === 'object') ? JSON.stringify(options.header[i]) : options.header[i];
            });
        }

        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            header: header,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(options.data),
            success: (data, status, xhr) => {
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
                url: '/user/myuser',
                method: 'GET',
                headers: {
                    authorization: SDK.Storage.load('Tkn'),
                },

            }, (e, user) => {
                if (e)
                    return callback(e);
                SDK.Storage.persist('User', user);
                callback(null, user);
            });
        },
        currentUser: () => {
            SDK.Storage.load('User');
            return 'User';
        },
        login: (username, password, callback) => {
            SDK.request({
                data:{
                    username: username,
                    password: password
                },
                url: 'api/user/login',
                method: 'POST'
            }, (e, data) => {
                if (e)
                    return callback(e);
               // SDK.Storage.persist('tkn', data);
                //HUSK Å ENDRE TIL TOKEN I SERVERSIDE???

                SDK.Storage.persist('user_id', data.userId);
                SDK.Storage.persist('type', data.userType);
                SDK.Storage.persist('username', data.username);

                callback(null, data);
            });
        },
        signup: (user, callback) => {
            SDK.request({
                type: 'POST',
                url: 'api/user/signup',
                data: user,
                    //{

                    //username: username,
                   // password: password
                //},
                success: (newUser) => {
                    alert('New user created: ' + user );

                },
                error: () => {
                    alert('Error creating user');
                }
            }, callback);
        },
        logout: () => {
            SDK.Storage.remove('user_id');
            window.location.href = '/html/index.html'
        }
    },
    Course: {
        loadAll: (callback) => {
            SDK.request({
                method: 'GET',
                url: 'api/course',
                callback
            });
        },
        currentCourse: () => {
            return SDK.Storage.load('Course')
        }
    },
    Quiz: {
        loadAll: (callback) => {
            SDK.request( {
                method: 'GET',
                url: 'api/quiz/' + SDK.Course.currentCourse('course_id'),
                callback
            });
        },
        currentQuiz: () => {
            return SDK.Storage.load('Quiz')
        },
        create: (data, callback) => {
            SDK.request( {
                method: 'POST',
                url: 'api/quiz',
                data: data,
                headers: {
                    authorization: SDK.Storage('id')
                }
            }, callback);
        },
        loadQuestions: () => {},
        loadOptions: () => {}
    },
    Storage: {
        prefix: 'ExamQuiz',
        persist: (key, value) => {
            window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value);
        },
        load: (key) => {
            const value
                = SDK.localStorage.getItem(SDK.Storage.prefix + key);
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
