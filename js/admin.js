$(document).ready(() => {
    //Loads current user
    const currentUser = SDK.User.currentUser();

    //Listens to click on create button
    $('#createBtn').click(() => {
        //Saves user input in consts
        const quizTitle = $('#title').val();
        const quizDescription = $('#description').val();
        const courseId = SDK.Storage.load('courseID')
        //QuestionCount is not really used, but necessary in database. Therefor set to 10 as default.
        const questionCount = 10;
        const createdBy = currentUser.username;

        //check that there is input
        if (!quizTitle || !quizDescription) {
            alert('Please enter data')
        } else {
            //SDK request to create quiz. SEending input as params
            SDK.Quiz.create(createdBy, questionCount, quizTitle, quizDescription, courseId, (e, newQuiz) => {
                if (e && e.xhr.status === 400) {
                    $(".margin-bottom").addClass('Error');
                }
                else if (e) {
                    console.log('Error')
                } else {
                    //Now displays div for creating questions.
                    document.getElementById('create-question-div').style.display = '';

                    //Listens to click on button for adding question,.
                    $('#addQuestionBtn').click(() => {
                            //Saves values from input area in const.
                            const question = $('#question').val();
                            const questionToQuizId = newQuiz.quizId;

                            //Checks that there is input
                            if (!question) {
                                alert('Enter data!')
                            } else {
                                //SDK request to create question. Value from const (input) and id as param.
                                SDK.Quiz.createQuestion(question, questionToQuizId, (e, newQuestion) => {
                                    if (e && e.xhr.status === 400) {
                                        $(".margin-bottom").addClass('Error');
                                    }
                                    else if (e) {
                                        console.log('Error')
                                    } else {
                                        //var question = JSON.parse(data);
                                        console.log(newQuestion);

                                        //Displays create-options div and hides diff containing done/another question buttons.
                                        document.getElementById('create-options-div').style.display = '';
                                        document.getElementById('another-or-done-div').style.display = 'none';

                                        //Listens to click on create options button
                                        $('#createOptionsBtn').click(() => {
                                                //Saves inputvalues in consts
                                                const correct = $('#correct').val();
                                                const wrong1 = $('#wrong1').val();
                                                const wrong2 = $('#wrong2').val();
                                                const wrong3 = $('#wrong3').val();
                                                const optionQuestionId = newQuestion.questionId;

                                                //Sets variable isCorrect to 1,which indicates TRUE, and that the option is correct.
                                                var isCorrect = 1;
                                                //Creates correct option
                                                SDK.Quiz.createOptions(correct, optionQuestionId, isCorrect, (e, data) => {
                                                        if (e && e.xhr.status === 400) {
                                                            $(".margin-bottom").addClass('Error');
                                                        }
                                                        else if (e) {
                                                            console.log('Error')
                                                        }
                                                        else {
                                                            //Sets isCorrect variable to 0 (FALSE) and creates wrong options (times 3)
                                                            var isCorrect = 0;
                                                            SDK.Quiz.createOptions(wrong1, optionQuestionId, isCorrect, (e, data) => {
                                                                    if (e && e.xhr.status === 400) {
                                                                        $(".margin-bottom").addClass('Error');
                                                                    }
                                                                    else if (e) {
                                                                        console.log('Error')
                                                                    }
                                                                    else {

                                                                        var isCorrect = 0;

                                                                        SDK.Quiz.createOptions(wrong2, optionQuestionId, isCorrect, (e, data) => {
                                                                                if (e && e.xhr.status === 400) {
                                                                                    $(".margin-bottom").addClass('Error');
                                                                                }
                                                                                else if (e) {
                                                                                    console.log('Error')
                                                                                }
                                                                                else {

                                                                                    var isCorrect = 0;

                                                                                    SDK.Quiz.createOptions(wrong3, optionQuestionId, isCorrect, (e, data) => {
                                                                                            if (e && e.xhr.status === 400) {
                                                                                                $(".margin-bottom").addClass('Error');
                                                                                            }
                                                                                            else if (e) {
                                                                                                console.log('Error')
                                                                                            }
                                                                                        }
                                                                                    );
                                                                                }
                                                                            }
                                                                        );
                                                                    }
                                                                }
                                                            );
                                                        }
                                                }
                                                );
                                            //Displays div with done/another button + alerts user that the question is succesfully added.
                                            document.getElementById('another-or-done-div').style.display = '';
                                            window.alert('Question added!')
                                            }
                                        );

                                        //Listens to click on add another question button
                                        $('#addAnotherBtn').click(() => {
                                                //Clears input areas
                                                $('#question').val('')
                                                $('#correct').val('')
                                                $('#wrong1').val('')
                                                $('#wrong2').val('')
                                                $('#wrong3').val('')
                                                //Hides div for creating options, but displays div for creating question.
                                                document.getElementById('create-options-div').style.display = 'none';
                                                document.getElementById('create-question-div').style.display = '';
                                            }
                                        );
                                        //Listens to click on done button.
                                        $('#doneBtn').click(() => {
                                            //Alterts user of success
                                            window.alert('Quiz completed!')
                                                //Persists course ID in local storage and redirects to quiz overview (for given course) page.
                                                SDK.Storage.persist('courseID', courseId)
                                                window.location.href = 'adminquiz.html'
                                            }
                                        );
                                    }
                                });
                            }
                        }
                    );
                }
            });
        }
    });
    //listens to clik on logout button. SDK request to logout. Redirects to home (login) page.
    $('#logoutBtn').click(() => {
        SDK.User.logout(currentUser.userId, (e, data) => {
            if (e && e.xhr.status === 400) {
                $('.margin-bottom').addClass('Error');
            } else {
                window.location.href = 'index.html';
                //Removes token authorization object and user object from local storage.
                SDK.Storage.remove('Token')
                SDK.Storage.remove('User')

            }
        });
    });
});