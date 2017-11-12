$(document).ready(() => {

    const $username = $('username');
    const $password = $('password');


    $('#loginBtn').click(() => {
        const username = $('#inputUsername').val();
        const password = $('#inputPassword').val();

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
                else{
                    SDK.loadUser((e, data)) => {
                        if (e && e.xhr.status == 401) {

                            console.log('Unvalid username/password combination')
                        } else {
                            console.log(data)
                            window.location.href('index.html')
                        }

                    }
                }

            });

        }
        });

    $('#logoutBtn').click(() => {

        SDK.User.logout();
    });

    $('#signupBtn').click(() => {
        window.location.href = 'create.html';
    });



})
}
