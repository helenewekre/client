$(document).ready(() => {

    $('#createBtn').click(() => {

        const username = $('#inputUsername').val();
        const password = $('#inputPassword').val();
        const passwordCheck  = $('#inputPasswordCheck');

        if (!username || !password || !passwordCheck ) {
            alert('Please enter valid login data')
        } else {
            if (password === passwordCheck) {

                SDK.User.signup(username, password, (e, data) =>  {
                    if (e && e.xhr.status === 401) {
                        $(".margin-bottom").addClass('Error');
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