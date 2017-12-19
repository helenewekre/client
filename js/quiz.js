$(document).ready(() => {
    //Loads the current user
    const currentUser = SDK.User.currentUser();

        //Loading all quizes from chosen course id (in local stoage)
        SDK.Quiz.loadAll((e, quizes) => {
                if (e) throw e;
                //Refers to id of html DIV in quiz.html
                const $quizList = $('#quiz-list');

                //Saves values in html div. jQuery allows use of the append function. Using Bootstrap class to style "take quiz" button.
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
                        <button class="btn btn-primary take-button" data-quiz-id=${quiz.quizId}> Take quiz</button>
                      </dl>
                    </div>
                </div>
            `);
                    }
                );

                //Handles click on the "take button". Sends user to question.html with the chosen quizID
                $('.take-button').click(function () {
                    const quizId = $(this).data('quiz-id');
                    const quiz = quizes.find((quiz) => quiz.quizId === quizId);
                    SDK.Storage.persist('quizID', quizId);
                    window.location.href = 'question.html'
                });
            }
        );
    //Listens to clik on log out button. Uses logout SDK request.
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