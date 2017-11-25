$(document).ready(() => {

        SDK.Quiz.loadQuestions((e, questions) => {
            if (e) throw e;

            const $questionList = $('#question-list');

            questions.forEach((question)=> {
                $questionList.append(`
                <div class="panel-body">
                    <div class="col-lg-8">
                      <dl>
                        <dt> </dt>
                        <dd>Question (${question.questionId}): ${question.question}
                        <div id="option-list${question.questionId}"></div>
                        </dd>
                        
                      </dl>
                    </div>
                </div>
            `);

                SDK.Storage.persist('questionId', question.questionId);

            SDK.Quiz.loadOptions((e, options)=> {
                if (e) throw e;

                const $optionList = $('#option-list' + question.questionId);

                options.forEach((option)=> {
                    $optionList.append(`
                        <input type="radio" name="options${question.questionId}" value="option${option.optionId}"> ${option.option}<br>
                    `);
                    }
                );
                    $('#submitBtn').click(() => {

                        clickHandler(question, options);
                    });
            }
            );
            SDK.Storage.remove('questionId');
            });


            /*
            $('#submitBtn').click(() => {
               console.log("");
            });
            */

        });

    function clickHandler(question, options) {
        var correct = 0;
        var correctQuestions = [];
        var wrong = 0;

        for (var i = 0; i < options.length; i++) {
            wrong ++;
            if (options[i].checked==true) {
                if (options[i].isCorrect === 1) {
                    correct ++;
                    correctQuestions.push(question.questionId);
                } else if (options[i].isCorrect === 0) {
                    wrong --;
                }
            }
        }
      //  window.alert('You got ' + correct + ' correct answers, and ' + wrong + ' wrong answers!' + 'Question ' + correctQuestions.toString() + 'are correct. ');

        console.log('correct', correct);
        console.log('wrong', wrong);

    };


});