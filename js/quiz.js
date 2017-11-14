$(document).ready(()=> {

    const $quizList = $("#quiz-list");

    SDK.Quiz.loadAll((e, quizes) => {

        quizes.forEach((quiz)=> {
            const quizHtml = `
            
            <div class="col-lg-4 book-container">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">${quiz.title}</h3>
            </div>
            <div class="col-lg-8">
                <dl>
                <dt>Course:</dt>
                <dd>${quiz.course}</dd>
                <dt>Description: </dt>
                <dd>${quiz.description}</dd>             
                </dl>
            </div>
            <div class="panel-footer">
               <button class="takeBtn" data-quiz-id=${quiz.id}>Start quiz</button>
            </div>
            </div>
            </div>
            `;

            $quizList.append(quizHtml);
        }
        );
        $('.takeBtn').click(function () {
            const quizId = $ (this).data('quiz-id');
            const quiz = quizes.find((quiz)=> quiz.id === quizId);
            console.log(quiz);
          //  SDK.Quiz.loadQuestions()
        });

    }

    )

}
)