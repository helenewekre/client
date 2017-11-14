$(document).ready(()=> {

        const $courseList = $("#course-list");
        SDK.Course.loadAll((e, courses) => {

                courses.forEach((course)=> {
                        const courseHtml = `
            
            <div class="col-lg-4 book-container">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">${course.title}</h3>
            </div>
            <div class="col-lg-8">
                <dl>
                <dt>Course:</dt>
                <dd>${course.course}</dd>
                </dl>
            </div>
            <div class="panel-footer">
               <button class="selectBtn" data-course-id=${course.id}>Select course</button>
            </div>
            </div>
            </div>
            `;
                    $courseList.append(courseHtml);
                    }
                );
                $('.selectBtn').click(function () {
                    const courseId = $ (this).data('course-id');
                    const course = courses.find((course)=> course.id === courseId);
                    console.log(course);
                    window.location.href = 'quiz.html'
                });

            }

        )

    }
)