$(document).ready(() => {
    const currentUser = SDK.User.currentUser();

    SDK.Course.loadCourses((e, courses) => {
        if (e) throw e;


        const $courseList = $('#course-list');

        courses.forEach((course) => {
            $courseList.append(`
            <tr>
               <td><button class="btn btn-primary select-button" data-course-id=${course.courseId}>${course.courseTitle}</button></td>
            </tr>
            `);
        });

        $('.select-button').click(function () {
            const courseId = $(this).data('course-id');
            const course = courses.find((course) => course.courseId === courseId);
            SDK.Storage.persist('courseID', courseId);
            console.log(course);
            window.location.href = 'quiz.html'
        });

    });

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