$(document).ready(() => {
    const currentUser = SDK.User.currentUser();

    $('#createBtn').click(() => {

        // const $courseHeader= $('#course-header');
        // const course = SDK.Storage.load(Course);
        //  $courseHeader.append(`<p> ${course.courseTitle}</p>`);

        const title = $('#title').val();
        const description = $('#description').val();
        const courseId = SDK.Storage.load('courseID')
        const questions = 10; //$('#questions').val();
        const createdby = currentUser.username;

        if (!title || !description) {
            alert('Please enter data')
        } else {

            console.log(title, description, courseId, questions, createdby);
            //SDK.encrypt(title, description, courseId, questions, createdby);


            SDK.Quiz.create(title, description, courseId, questions, createdby, (e, data) => {
                if (e && e.xhr.status === 400) {
                    $(".margin-bottom").addClass('Error');
                }
                else if (e) {
                    console.log('Error')
                } else {
                    //$('#title').val();
                    //  $('#description').val();
                    // $('#questionModal').show();
                    //var newQuiz = JSON.parse(data);

                    // alert('Quiz ' + title + ' successfully created! Now add questions! ')
                    // window.location.href = 'createQuestion.html';


                    var newQuiz = JSON.parse(data);


                    document.getElementById('create-question-div').style.display = '';
                    const newQuestion = $('#question').val();
                    const questionQuizId = newQuiz.quizId;
                    if (!newQuestion) {
                        alert('Enter data!')
                    } else {
                        console.log(newQuestion);

                        SDK.Quiz.createQuestion(newQuestion, questionQuizId, (e, data) => {
                            if (e && e.xhr.status === 400) {
                                $(".margin-bottom").addClass('Error');
                            }
                            else if (e) {
                                console.log('Error')
                            }

                            var question = JSON.parse(data);

                            $('#createOptionsBtn').click(() => {
                                    const correct = $('#correct').val();
                                    const wrong1 = $('#wrong1').val();
                                    const wrong2 = $('#wrong2').val();
                                    const wrong3 = $('#wrong3').val();
                                    const optionQuestionId = question.questionId;

                                    if (!correct || !optionQuestionId) {
                                        alert('Enter correct option!')
                                    } else {
                                        var status = 1;
                                        SDK.Quiz.createOptions(correct, questionId, status, (e, data) => {
                                                if (e && e.xhr.status === 400) {
                                                    $(".margin-bottom").addClass('Error');
                                                }
                                                else if (e) {
                                                    console.log('Error')
                                                }
                                                else {
                                                    correct.val('');
                                                }
                                            }
                                        );
                                    }

                                    if (!wrong1 || !optionQuestionId) {
                                        alert('Enter first wrong option!')
                                    } else {
                                        var status = 0;

                                        SDK.Quiz.createOptions(wrong1, questionId, status, (e, data) => {
                                                if (e && e.xhr.status === 400) {
                                                    $(".margin-bottom").addClass('Error');
                                                }
                                                else if (e) {
                                                    console.log('Error')
                                                }
                                                else {
                                                    wrong1.val('');
                                                }
                                            }
                                        );
                                    }

                                    if (!wrong1 || !optionQuestionId) {
                                        alert('Enter second wrong option!')
                                    } else {
                                        var status = 0;

                                        SDK.Quiz.createOptions(wrong2, questionId, status, (e, data) => {
                                                if (e && e.xhr.status === 400) {
                                                    $(".margin-bottom").addClass('Error');
                                                }
                                                else if (e) {
                                                    console.log('Error')
                                                }
                                                else {
                                                    wrong2.val('');
                                                }
                                            }
                                        );

                                    }

                                    if (!wrong1 || !optionQuestionId) {
                                        alert('Enter third wrong option!')
                                    } else {
                                        var status = 0;

                                        SDK.Quiz.createOptions(wrong3, questionId, status, (e, data) => {
                                                if (e && e.xhr.status === 400) {
                                                    $(".margin-bottom").addClass('Error');
                                                }
                                                else if (e) {
                                                    console.log('Error')
                                                }
                                                else {
                                                    wrong3.val('');
                                                }
                                            }
                                        );
                                    }
                                    window.alert('Completed!');
                                }
                            );


                            $('#addAnotherBtn').click(() => {
                                    window.alert('another');
                                    //HVORDAN SKAL MAN FÅ KJØRT METODEN IGJEN? OG HVORDAN ENDRE QUESTION ID?

                                }
                            );
                        });


                    }
                }
            });
        }
    });
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
});
            /*
                    //window.location.href = 'quiz.html';
                }
            });
            */




