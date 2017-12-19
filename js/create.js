$(document).ready(() => {

    $('#createBtn').click(() => {

        //User input saved as const
        const username = $('#username').val();
        const password = $('#password').val();
        const passwordCheck  = $('#passwordCheck').val();

        //Checking if input is empty
        if(!username || !password || !passwordCheck){
            alert('Please enter valid login data')
        } else {
            //Checking that the two typed passwords are alike
            if (password === passwordCheck) {
                //Calling SDK method to create user, sending the username and passowrd as params
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
                //Pop-up stating that passwords must be retyped.
                alert('Passwords do not match! Please reenter. ')
                //Clears input areas
                $('#inputPassword').val('');
                $('#inputPasswordCheck').val('');
            }
        }
    });
});