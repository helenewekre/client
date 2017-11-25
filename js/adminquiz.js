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
                        <button class="btn btn-primary delete-button" data-delete-quiz-id=${quiz.quizId}> Delete quiz</button>
                      </dl>
                    </div>
                </div>
            `);

                    }
                );

                $('.delete-button').on('click', function () {
                    const quizId = $(this).data('delete-quiz-id');
                    const quiz = quizes.find((quiz) => quiz.quizId === quizId);
                    //console.log(quizId);
                    SDK.Storage.persist('quizID', quizId);
                    //SDK.Storage.persist('quizToDelete', quiz);

                    if (window.confirm('Are you sure you want to delete ' + quiz.quizTitle + '? ') === true) {
                        //SDK.Quiz.deleteQuiz(quizId, (e, data)=> {
                            SDK.Quiz.deleteQuiz((e, data) =>{
                            if (e) throw e;
                            });
                            //location.reload();
                    }
                });


            }
        );
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
    $('#createBtn').click(()=>{
        window.location.href = 'createQuiz.html';
    });

    }
)