$(document).ready(()=>{

    const currentUser = SDK.User.currentUser();


    //$(".profile").html(`<h1>Username: ${currentUser.username}\n Type:  ${currentUser.type}</h1>`);

    $('.profile').html( `<h1>Hi,  ${currentUser.username}</h1>
    <p>Your user id is ${currentUser.userId}</p>
    `);

    $('#logoutBtn').click(() => {
        SDK.User.logout(currentUser.userId, (e, data)=> {
           if (e && e.xhr.status === 400) {
                $('.margin-bottom').addClass('Error');
            }
            //Usikker på denne else-if, bør ikke være nødvendig, var kun for feilmld
            /*else if (e){
               window.location.href = 'index.html';
               SDK.Storage.clear();
           } */else {
               window.location.href = 'index.html';
               //SDK.Storage.clear();
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

