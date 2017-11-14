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
            data: JSON.stringify(SDK.encrypt(JSON.stringify(options.data))),
            success: (data, status, xhr) => {
                callback(null, SDK.decrypt(data), status, xhr);
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
                headers: {
                    authorization: SDK.Storage.load('Token'),
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
            }, (err, data) => {
                if (err) return callback(err);

                callback(null, data);
            });

        },

        logout: () => {
            window.location.href = '/index.html'

            SDK.Storage.remove('User');
            SDK.Storage.remove('Token');

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
                    headers: {
                        authorization: SDK.Storage.load('Token')
                    }
                }, callback);
        },
        currentQuiz: () => {
            return SDK.Storage.load('Quiz')

        },
        create: (data, callback) => {
            SDK.request({
                method: 'POST',
                url: 'api/quiz',
                data: data,
                headers: {
                    authorization: SDK.Storage('id')
                }
            }, callback);
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
