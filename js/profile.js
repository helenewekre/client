$(document).ready(()=>{

    const currentUser = SDK.User.currentUser();


    //$(".profile").html(`<h1>Username: ${currentUser.username}\n Type:  ${currentUser.type}</h1>`);

    $(".profile").html( `<h1>Hi,  ${currentUser.username}</h1>`);

    $('#logoutBtn').click(() => {
        SDK.User.logout();
    })
    }

)

