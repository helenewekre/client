$(document).ready(() => {
    const currentUser = SDK.User.currentUser();

        SDK.Quiz.loadAll((e, quizes) => {
                if (e) throw e;
                const $quizList = $('#quiz-list');


                quizes.forEach((quiz) => {
                        $quizList.append(`
                <div class="panel-body">
                    <div class="col-lg-8">
                      <dl>
                        <dt>Quiz title:</dt>
                        <dd>${quiz.quizTitle}</dd>
                        <dt>Description: </dt>
                        <dd>${quiz.quizDescription}</dd>
                        <dt>Created by: </dt>
                        <dd>${quiz.createdBy}</dd>
                        <dt>Number of questions: </dt>
                        <dd>${quiz.questionCount}</dd>
                        <button class="btn btn-primary take-button" data-quiz-id=${quiz.quizId}> Take quiz</button>
                      </dl>
                    </div>
                </div>
            `);

                    }
                );


                $('.take-button').click(function () {
                    const quizId = $(this).data('quiz-id');
                    const quiz = quizes.find((quiz) => quiz.quizId === quizId);
                    console.log(quiz);
                    SDK.Storage.persist('quizID', quizId);
                    window.location.href = 'question.html'
                });

            }
        );
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

    }
)