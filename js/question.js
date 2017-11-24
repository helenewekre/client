$(document).ready(() => {

        SDK.Quiz.loadQuestions((e,questions) => {
            if (e) throw e;
            const $questionList = $('#question-list');



            questions.forEach( (question)=> {
                SDK.Storage.persist('questionID', question.questionId);

                $questionList.append(`
                <div class="panel-body">
                    <div class="col-lg-8">
                      <dl>
                        <dt> </dt>
                        <dd>${question.question}
                        <div id="option-list${question.questionId}"></div>
                        </dd>
                        
                      </dl>
                    </div>
                </div>
            `);

            SDK.Quiz.loadOptions( (e, options)=>{
                if (e) throw e;
                const $optionList = $('#option-list' + question.questionId);
                options.forEach( (option)=>{
                    $optionList.append(`
                        <input type="radio" name="options${question.questionId}" value="option${option.optionId}"> ${option.option}<br>
                    `);
                    }
                )
                }
            );

            SDK.Storage.remove('questionID');
            }
            );

        }
        );
    }
)