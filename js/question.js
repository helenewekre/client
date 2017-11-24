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
                        <dd>${question.question}</dd>
                        <div id="option-list"></div>
                      </dl>
                    </div>
                </div>
            `);

            SDK.Quiz.loadOptions( (e, options)=>{
                if (e) throw e;
                const $optionList = $('#option-list');
                options.forEach( (option)=>{
                    $optionList.append(`
                    <form action="">
                        <input type="radio" name="options" value="option"> ${option.option}<br>
                    </form>
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