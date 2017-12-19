$(document).ready(() => {
    //Loads current user in const
    const currentUser = SDK.User.currentUser();
    //Hides the result table div.
    document.getElementById('result-table').style.display = 'none';

    //Loads question to the chosen quiz.
    SDK.Quiz.loadQuestions((e, questions) => {
        if (e) throw e;
        //Refers to id of html DIV in question.html
        const $questionList = $('#question-list');

        //Saves values of all questions in question list div.
        questions.forEach((question) => {
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
            //Saves question id in localstorage. Necessary to use loadOptions request.
            SDK.Storage.persist('questionId', question.questionId);

            //Loads option of the given question ID
            SDK.Quiz.loadOptions((e, options) => {
                if (e) throw e;

                //Adding value to the option list div (html)
                const $optionList = $('#option-list' + question.questionId);
                options.forEach((option) => {
                        $optionList.append(`
                       <input type="radio" class="correct-or-wrong-radio" name="options${question.questionId}" value="${option.isCorrect}"> ${option.option}<br>
                    `);
                    }
                );
            });
            SDK.Storage.remove('questionId');
        });
        //Listens to click on the submit button.
        $('#submitBtn').click(() => {
            //Const to be used in result table, referring to the tbody element in html file.
            const $questionTbody = $('#question-tbody');
            //Variables to save the users result
            let total = 0;
            let answered = 0;
            let correct = 0;

            //Checks if radiobuttons are checked.
            $('.correct-or-wrong-radio').each(function(){
                if ($(this).is(":checked")){
                    answered++;
                    //Checks if the check radiobutton (option) is correct.
                    if ($(this).val() == 1) {
                        correct++;
                    }
                }
            });

            //Shows the result table.
            document.getElementById('result-table').style.display = '';
            //This method loops through all the questions, and displays the correct answer.
            questions.forEach((question)=> {
                SDK.Storage.persist('questionId', question.questionId);
                    total ++;
                    //Adds the value to the tbody
                    $questionTbody.append(`
                    <tr id="correct${question.questionId}">
                    <td>${question.question}</td>
                    </tr>
                    `);
                    SDK.Quiz.loadOptions((e, loadedOptions)=>{
                        for (let i = 0; i < loadedOptions.length; i++){
                            if (loadedOptions[i].isCorrect == 1){
                                correct++;
                                $(`#correct${question.questionId}`).append(`<td>${loadedOptions[i].option}</td>`);
                            }
                        }
                    });
             });
            //Pop up to inform user of result.
            window.alert('You answered ' + answered + ' out of ' + total + ' questions. \n\nCorrect answers: ' + correct + '!');
        });
    //Listens to logout button.
    $('#logoutBtn').click(() => {
        SDK.User.logout(currentUser.userId, (e, data) => {
            if (e && e.xhr.status === 400) {
                $('.margin-bottom').addClass('Error');
            } else {
                window.location.href = 'index.html';
                SDK.Storage.remove('Token')
                SDK.Storage.remove('User')
            }
        });
    });
});
});