$(document).ready(() => {
    const currentUser = SDK.User.currentUser();

    $('#createBtn').click(() => {

        // const $courseHeader= $('#course-header');
        // const course = SDK.Storage.load(Course);
        //  $courseHeader.append(`<p> ${course.courseTitle}</p>`);
        const Test = SDK.Storage.load('Token');
        console.log(Test);
        const quizTitle = $('#title').val();
        const quizDescription = $('#description').val();
        const courseId = SDK.Storage.load('courseID')
        const questionCount = 10; //$('#questions').val();
        const createdBy = currentUser.username;

        if (!quizTitle || !quizDescription) {
            alert('Please enter data')
        } else {

            //console.log(quizTitle, quizDescription, courseId, questions, createdBy);
            //SDK.encrypt(title, description, courseId, questions, createdby);


            SDK.Quiz.create(createdBy, questionCount, quizTitle, quizDescription, courseId, (e, newQuiz) => {
                if (e && e.xhr.status === 400) {
                    $(".margin-bottom").addClass('Error');
                }
                else if (e) {
                    console.log('Error')
                } else {
                    console.log(newQuiz);
                    // var newQuiz = JSON.parse(newQuiz);


                    document.getElementById('create-question-div').style.display = '';

                    $('#addQuestionBtn').click(() => {
                            const question = $('#question').val();
                            const questionToQuizId = newQuiz.quizId;

                            if (!question) {
                                alert('Enter data!')
                            } else {
                                console.log(question);

                                SDK.Quiz.createQuestion(question, questionToQuizId, (e, newQuestion) => {
                                    if (e && e.xhr.status === 400) {
                                        $(".margin-bottom").addClass('Error');
                                    }
                                    else if (e) {
                                        console.log('Error')
                                    } else {
                                        //var question = JSON.parse(data);
                                        console.log(newQuestion);

                                        document.getElementById('create-options-div').style.display = '';
                                        document.getElementById('another-or-done-div').style.display = 'none';
                                        $('#createOptionsBtn').click(() => {
                                                const correct = $('#correct').val();
                                                const wrong1 = $('#wrong1').val();
                                                const wrong2 = $('#wrong2').val();
                                                const wrong3 = $('#wrong3').val();
                                                const optionQuestionId = newQuestion.questionId;
                                                console.log(optionQuestionId);

                                                var isCorrect = 1;
                                                SDK.Quiz.createOptions(correct, optionQuestionId, isCorrect, (e, data) => {
                                                        if (e && e.xhr.status === 400) {
                                                            $(".margin-bottom").addClass('Error');
                                                        }
                                                        else if (e) {
                                                            console.log('Error')
                                                        }
                                                        else {
                                                            //correct.val("");
                                                            var isCorrect = 0;

                                                            SDK.Quiz.createOptions(wrong1, optionQuestionId, isCorrect, (e, data) => {
                                                                    if (e && e.xhr.status === 400) {
                                                                        $(".margin-bottom").addClass('Error');
                                                                    }
                                                                    else if (e) {
                                                                        console.log('Error')
                                                                    }
                                                                    else {
                                                                        //wrong1.val('');

                                                                        var isCorrect = 0;

                                                                        SDK.Quiz.createOptions(wrong2, optionQuestionId, isCorrect, (e, data) => {
                                                                                if (e && e.xhr.status === 400) {
                                                                                    $(".margin-bottom").addClass('Error');
                                                                                }
                                                                                else if (e) {
                                                                                    console.log('Error')
                                                                                }
                                                                                else {
                                                                                   // wrong2.val('');

                                                                                    var isCorrect = 0;

                                                                                    SDK.Quiz.createOptions(wrong3, optionQuestionId, isCorrect, (e, data) => {
                                                                                            if (e && e.xhr.status === 400) {
                                                                                                $(".margin-bottom").addClass('Error');
                                                                                            }
                                                                                            else if (e) {
                                                                                                console.log('Error')
                                                                                            }
                                                                                            else {
                                                                                               // wrong3.val('');
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

                                            document.getElementById('another-or-done-div').style.display = '';
                                            }
                                        );

                                        $('#addAnotherBtn').click(() => {
                                                $('#question').val('')
                                                $('#correct').val('')
                                                $('#wrong1').val('')
                                                $('#wrong2').val('')
                                                $('#wrong3').val('')
                                                document.getElementById('create-options-div').style.display = 'none';
                                                document.getElementById('create-question-div').style.display = '';


                                                //HVORDAN SKAL MAN FÅ KJØRT METODEN IGJEN? OG HVORDAN ENDRE QUESTION ID?

                                            }
                                        );
                                        $('#doneBtn').click(() => {
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
    $('#logoutBtn').click(() => {
        SDK.User.logout(currentUser.userId, (e, data) => {
            if (e && e.xhr.status === 400) {
                $('.margin-bottom').addClass('Error');
            }
            //Usikker på denne else-if, bør ikke være nødvendig, var kun for feilmld
            /*else if (e){
               window.location.href = 'index.html';
               SDK.Storage.clear();
           } */ else {
                window.location.href = 'index.html';
                //SDK.Storage.clear();
                SDK.Storage.remove('Token')
                SDK.Storage.remove('User')

            }
        });
    });
});
/*
        //window.location.href = 'quiz.html';
    }
});
*/




