$(document).ready(() => {
    const currentUser = SDK.User.currentUser();


    $('#createBtn').click(() => {

        const title = $('#title').val();
        const description  = $('#description').val();
        const course = $('#course').val();
        const questions = $('#questions').val();
        //cont questions = 15;
        const createdby = currentUser.username;



        if(!course || !title || !description){
            alert('Please enter data')
        } else {
           /* for(var c; c < courses.length; c++){
                if (course === courses[c].courseId){
                    course = courses[c].courseId;
                }
            }
            */
           SDK.encrypt(course, title, description, questions, createdby);

            SDK.Quiz.create(title, description, course, questions, createdby, (e, data) =>  {
                if (e && e.xhr.status === 400) {
                    $(".margin-bottom").addClass('Error');
                }
                else if (e) {
                    console.log('Error')
                } else {
                    $('#title').val();
                    $('#description').val();
                    $('#questionModal').show();
                        var newQuiz = JSON.parse(data);

                    $('#addBtn').click(()=> {
                        const newQuestion = $('#question').val();
                        const quizId = newQuiz.quizId;

                        if (!newQuestion || !quizId){
                            alert('Enter data!')
                        } else {
                            SDK.Quiz.createQuestion(newQuestion, quizId, (e, data)=> {
                                    if (e && e.xhr.status === 400) {
                                        $(".margin-bottom").addClass('Error');
                                    }
                                    else if (e) {
                                        console.log('Error')
                                    } else {

                                        //const newQuestion = JSON.parse(data);
                                        const questionId = newQuestion.questionId;
                                        const correct = $("#correct").val();
                                        const wrong1 = $("#wrong1").val();
                                        const wrong2 = $("#wrong2").val();
                                        const wrong3 = $("#wrong3").val();

                                        if (!correct || !questionId) {
                                            alert('Enter correct option!')
                                        } else {
                                            var status = 1;

                                            SDK.Quiz.createOptions(correct, questionId, status, (e, data)=> {
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

                                        if (!wrong1 || !questionId) {
                                            alert('Enter first wrong option!')
                                        } else {
                                            var status = 0;

                                            SDK.Quiz.createOptions(wrong1, questionId, status, (e, data)=> {
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

                                        if (!wrong1 || !questionId) {
                                            alert('Enter second wrong option!')
                                        } else {
                                            var status = 0;

                                            SDK.Quiz.createOptions(wrong2, questionId, status, (e, data)=> {
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

                                        if (!wrong1 || !questionId) {
                                            alert('Enter third wrong option!')
                                        } else {
                                            var status = 0;

                                            SDK.Quiz.createOptions(wrong3, questionId, status, (e, data)=> {
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
                                    }
                                }
                            );
                        }
                        }
                    );

                    alert('Quiz ' + title + ' successfully created!')
                    window.location.href = 'quiz.html';
                }
            });
        }
    });







});