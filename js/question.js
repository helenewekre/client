$(document).ready(() => {
    const currentUser = SDK.User.currentUser();
    let loadedQuestions;
    let loadedOptions;
    document.getElementById('result-table').style.display = 'none';

    SDK.Quiz.loadQuestions((e, questions) => {
        if (e) throw e;

        loadedQuestions = questions;

        const $questionList = $('#question-list');

        questions.forEach((question) => {
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

            SDK.Quiz.loadOptions((e, options) => {
                if (e) throw e;
                loadedOptions = options;

                const $optionList = $('#option-list' + question.questionId);

                options.forEach((option) => {
                    console.log("Option" + option.option + " Correct?" + option.isCorrect);
                        $optionList.append(`
                       <input type="radio" class="correct-or-wrong-radio" name="options${question.questionId}" value="${option.isCorrect}"> ${option.option}<br>
                    `);
                    }
                );

            });
            SDK.Storage.remove('questionId');
        });


        /*
        $('#submitBtn').click(() => {
           console.log("");
        });
        */
        $('#submitBtn').click(() => {
            const $questionTbody = $('#question-tbody');

            document.getElementById('result-table').style.display = '';
            questions.forEach((question)=> {
                SDK.Storage.persist('questionId', question.questionId);

                    $questionTbody.append(`
                    <tr id="correct${question.questionId}">
                    <td>${question.question}</td>
                    </tr>
                    `);

                    SDK.Quiz.loadOptions((e, loadedOptions)=>{
                        for (let i = 0; i < loadedOptions.length; i++){
                            if (loadedOptions[i].isCorrect == 1){
                                $(`#correct${question.questionId}`).append(`<td>${loadedOptions[i].option}</td>`);
                            }
                        }
                    });


             });
        });

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