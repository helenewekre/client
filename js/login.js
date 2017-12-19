$(document).ready(() => {

    //Listens to click on login button
    $('#loginBtn').click(() => {
        //Saves userinput in username/password input areas as consts
        const username = $('#username').val();
        const password = $('#password').val();

        //Checks that user input is not empty, alerts user
        if (!username || !password) {
            alert('Please enter valid login data')
        } else {
            //Calls login request is input is not empty.
            SDK.User.login(username, password, (e, data) => {
                if (e && e.xhr.status == 401) {
                    $(".margin-bottom").addClass('Unvalid username/password combination');
                }
                else if (e) {
                    console.log('Error')
                }
                else {
                    //Is an error does not occur, the user object is loaded.
                    SDK.User.loadUser((e, data) => {
                        if (e && e.xhr.status == 401) {
                            console.log('Unvalid username/password combination')
                        } else {
                            console.log(data)
                            SDK.decrypt(data);
                            var currentUser = SDK.User.currentUser();

                            //Checks the users type. If admin, directed to course overview, if user, directed to profilepage.
                            if(currentUser.type === 2) {
                                window.location.href = "profile.html";
                            }else if (currentUser.type === 1) {
                                window.location.href = "admincourse.html";
                            }
                        }
                    });
                }
            });
        }
    });

    //Listens to click on signup button. Directs user to the create page.
    $('#signupBtn').click(() => {
        window.location.href = "create.html";
    });
});
