$(document).ready(()=>{
    //Loads current user in const.
    const currentUser = SDK.User.currentUser();

    //Adds value to the thml div with class name of profile.
    $('.profile').html( `<h1>Hi,  ${currentUser.username}</h1>
    <p>Your user id is ${currentUser.userId}</p>
    `);

    //Reacts to click on logout button
    $('#logoutBtn').click(() => {
        SDK.User.logout(currentUser.userId, (e, data)=> {
           if (e && e.xhr.status === 400) {
                $('.margin-bottom').addClass('Error');
            }else {
               window.location.href = 'index.html';
               //SDK.Storage.clear();
               SDK.Storage.remove('Token')
               SDK.Storage.remove('User')

           }
        });
    });

    //Listens to click on courses button. Directs user to course.html, which displays available courses.
    $('#courseBtn').click(()=> {
        window.location.href = "course.html";
        }
    )
    }
)

