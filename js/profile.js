$(document).ready(()=>{

    const currentUser = SDK.User.currentUser();


    //$(".profile").html(`<h1>Username: ${currentUser.username}\n Type:  ${currentUser.type}</h1>`);

    $('.profile').html( `<h1>Hi,  ${currentUser.username}</h1>`);

    $('#logoutBtn').click(() => {
        SDK.User.logout(currentUser.userId, (e, data)=> {
           if (e && e.xhr.status === 400) {
                $(".margin-bottom").addClass('Error');
            } else {
               window.location.href = 'index.html';
               SDK.Storage.remove('Token')
               SDK.Storage.remove('User')

           }
        });
    });
    $('#courseBtn').click(()=> {

        //SDK.Course.loadAll();
        window.location.href = "course.html";
        }


    )
    }

)

