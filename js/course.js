$(document).ready(() => {

    SDK.Course.loadCourses((e, courses) => {
        if (e) throw e;

        const $courseList = $("#course-list");

        courses.forEach((course) => {
            $courseList.append(`
            <!--<div class="col-lg-4 book-container">-->
            <tr>
               <td><button class="btn btn-primary test-button" id=selectBtn" data-course-id=${course.courseId}>${course.courseTitle}</button></td>
            </tr>
            <!--</div>-->
            `);
        });

        $('.test-button').click(function () {
            console.log("hey");
            const courseId = $(this).data('course-id');
            const course = courses.find((course) => course.courseId === courseId);
            //const course = courses.find((course)=> course.id === courseId); BRUKES VED courses.forEach
            console.log(course);
            window.location.href = 'quiz.html'
        });

    });


});