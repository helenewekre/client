$(function (){

/*
    let $username = $('username');
    let $password = $('password');
    SDK.User.loadUser();

    */

    $('#loginBtn').click(() => {
        const username = $('#inputUsername').val();
        const password = $('#inputPassword').val();
        SDK.User.login(username, password, (err, data) => {
            if (err) {
                console.log('Error')
            }
            else
                window.location.href('index.html')
        });

    })
    $('#signupBtn').click(() => {
        const username = $('#inputUsername').val();
        const password = $('#inputPassword').val();
        SDK.User.signup(username, password, (err, data) => {
            if (err) {
                console.log('Error')
            }
            else
                console.log('User created')
        })
    })

    $('#logoutBtn').click(() => {

        SDK.User.logout();
    })



})