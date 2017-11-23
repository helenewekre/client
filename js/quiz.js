$(document).ready(() => {

        SDK.Quiz.loadAll((e, quiz) => {
                if (e) throw e;
                const $quizList = $("#quiz-list");


                quiz.forEach((quiz) => {
                        $quizList.append(`
            
   
                <!---<div class="panel-heading">
                    <h3 class="panel-title">${quiz.quizTitle}</h3>
                </div>--->
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
                    const quiz = quiz.find((quiz) => quiz.quizId === quizId);
                    console.log(quiz);
                    SDK.Storage.persist('quizID', quizId);
                    window.location.href = 'question.html'
                });

            }
        )

    }
)