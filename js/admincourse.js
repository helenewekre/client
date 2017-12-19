$(document).ready(() => {
    //Loads the current user.
    const currentUser = SDK.User.currentUser();

    //Loads courses.
    SDK.Course.loadCourses((e, courses) => {
        if (e) throw e;

        //Value to course list tbody in html is saved as const.
        const $courseList = $('#course-list');

        // Adds value to the const of course list. Uses Bootstrap class for button styling
        courses.forEach((course) => {
            $courseList.append(`
            <tr>
               <td><button class="btn btn-primary select-button" data-course-id=${course.courseId}>${course.courseTitle}</button></td>
            </tr>
            `);
        });

        //Listen to click on the select button. Allows admin to choose a course
        $('.select-button').click(function () {
            const courseId = $(this).data('course-id');
            const course = courses.find((course) => course.courseId === courseId);
            SDK.Storage.persist('courseID', courseId);
            console.log(course);
            window.location.href = 'adminquiz.html'
            //window.location.href = 'createQuiz.html'
        });

    });
    //Listens to click on logout button.
    $('#logoutBtn').click(() => {
        SDK.User.logout(currentUser.userId, (e, data)=> {
            if (e && e.xhr.status === 400) {
                $('.margin-bottom').addClass('Error');
            }else {
                window.location.href = 'index.html';
                SDK.Storage.remove('Token')
                SDK.Storage.remove('User')

            }
        });
    });
});