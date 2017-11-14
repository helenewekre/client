$(document).ready(() => {

    $('#loginBtn').click(() => {
        const username = $('#username').val();
        const password = $('#password').val();

        console.log(username)
        console.log(password)

        if (!username || !password) {
            alert('Please enter valid login data')
        } else {
            SDK.User.login(username, password, (e, data) => {
                if (e && e.xhr.status == 401) {

                    $(".margin-bottom").addClass('Unvalid username/password combination');
                }
                else if (e) {
                    console.log('Error')
                }
                else {
                    SDK.User.loadUser((e, data) => {
                        if (e && e.xhr.status == 401) {
                            console.log('Unvalid username/password combination')
                        } else {
                            console.log(data)
                            //SDK.User.currentUser();
                            window.location.href = "profile.html";
                        }

                    });
                }
            });
        }
    });

    $('#signupBtn').click(() => {
        window.location.href = "create.html";
    });


});
