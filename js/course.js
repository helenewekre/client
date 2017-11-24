$(document).ready(() => {

    SDK.Course.loadCourses((e, courses) => {
        if (e) throw e;

        const $courseList = $('#course-list');

        courses.forEach((course) => {
            $courseList.append(`
            <!--<div class="col-lg-4 book-container">-->
            <tr>
               <td><button class="btn btn-primary select-button" data-course-id=${course.courseId}>${course.courseTitle}</button></td>
            </tr>
            <!--</div>-->
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


});