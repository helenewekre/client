$(document).ready(() => {

    $('#createBtn').click(() => {

        const username = $('#username').val();
        const password = $('#password').val();
        const passwordCheck  = $('#passwordCheck').val();

        if(!username || !password || !passwordCheck){
            alert('Please enter valid login data')
        } else {
            if (password === passwordCheck) {
               // SDK.encrypt(username, password);

                SDK.User.signup(username, password, (e, data) =>  {
                    if (e && e.xhr.status === 400) {
                        $('.margin-bottom').addClass('Error');
                    }
                    else if (e) {
                        console.log('Error')
                    } else {
                        alert('User ' + username + ' successfully created!')
                        window.location.href = 'index.html';
                    }
                });
            } else {
                alert('Passwords do not match! Please reenter. ')
                $('#inputPassword').val('');
                $('#inputPasswordCheck').val('');
            }
        }
    });
});