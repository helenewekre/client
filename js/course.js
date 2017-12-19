$(document).ready(() => {
    //Loading current user
    const currentUser = SDK.User.currentUser();

    //loading courses
    SDK.Course.loadCourses((e, courses) => {
        if (e) throw e;

        //Value to course list tbody in html is saved as const.
        const $courseList = $('#course-list');

        // Adds value to the const of course list. Using Bootstrap class to style select button.
        courses.forEach((course) => {
            $courseList.append(`
            <tr>
               <td><button class="btn btn-primary select-button" data-course-id=${course.courseId}>${course.courseTitle}</button></td>
            </tr>
            `);
        });

        //Listen to click on the select button. Allows user to select course.
        $('.select-button').click(function () {
            //Uses courseID and finds the course with the given ID
            const courseId = $(this).data('course-id');
            const course = courses.find((course) => course.courseId === courseId);

            //Persistcourse ID in local storage, which is necessary to access quiz.html
            SDK.Storage.persist('courseID', courseId);
            window.location.href = 'quiz.html'
        });
    });

    //Listens to click on logout button. Uses logout request from SDK. s
    $('#logoutBtn').click(() => {
        SDK.User.logout(currentUser.userId, (e, data)=> {
            if (e && e.xhr.status === 400) {
                $('.margin-bottom').addClass('Error');
            } else {
                window.location.href = 'index.html';
                SDK.Storage.remove('Token')
                SDK.Storage.remove('User')

            }
        });
    });


});