const SDK = {
    serverURL: 'distribueredesystemer.cqsg17giwvxa.eu-central-1.rds.amazonaws.com/api',
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
        /**
        loadUser: (userId) => {
            SDK.request({
                data:{
                    userId: userId
                },
                url: '/user/myuser',
                method: 'GET'
            })
        }, */
        currentUser: () => {
            SDK.Storage.load('User');
        },
        login: (username, password, callback) => {
            SDK.request({
                data:{
                    username: username,
                    password: password
                },
                url: '/user/login',
                method: 'POST'
            }, (e, data) => {
                if (e)
                    return callback(e);
                SDK.Storage.persist('user_id', data.userId);
                SDK.Storage.persist('type', data.userType);
                SDK.Storage.persist('username', data.username);

                callback(null, data);
            });
        },
        signup: (username, password, callback) => {
            SDK.request({
                type: 'POST',
                url: '/signup',
                data:{
                    username: username,
                    password: password
                },
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
            window.location.href = '../html/index.html'
        }
    },
    Course: {
        loadAll: (callback) => {
            SDK.request({
                method: 'GET',
                url: '/course',
                callback
            })
        },
        currentCourse: () => {
            return SDK.Storage.load('Course')
        }
    },
    Quiz: {
        loadAll: (callback) => {
            SDK.request( {
                method: 'GET',
                url: '/quiz/' + SDK.Course.currentCourse('course_id'),
                callback
            })
        },
        currentQuiz: () => {
          return SDK.Storage.load('Quiz')
        },
        create: (data, callback) => {
            SDK.request( {
                method: 'POST',
                url: '/quiz',
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
    }
};
