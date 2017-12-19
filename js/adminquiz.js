$(document).ready(() => {
    //Loads the current user
    const currentUser = SDK.User.currentUser();

    //Loading all quizes from chosen course id (in local stoage)
    SDK.Quiz.loadAll((e, quizes) => {
            if (e) throw e;
            //Refers to id of html DIV in adminquiz.html
            const $quizList = $('#quiz-list');

            //Saves values in html div. jQuery allows use of the append function. Using Bootstrap class to style delete button.
            quizes.forEach((quiz) => {
                    $quizList.append(`
                <div class="panel-body">
                    <div class="col-lg-8">
                      <dl>
                        <dt>Quiz title:</dt>
                        <dd>${quiz.quizTitle}</dd>
                        <dt>Description: </dt>
                        <dd>${quiz.quizDescription}</dd>
                        <dt>Created by: </dt>
                        <dd>${quiz.createdBy}</dd>
                        <button class="btn btn-primary delete-button" data-delete-quiz-id=${quiz.quizId}> Delete quiz</button>
                      </dl>
                    </div>
                </div>
            `);

                }
            );
            //Handles click on delete button.
            $('.delete-button').on('click', function () {
                    //Finds data of the chosen quiz. Saves the id in loacal stoage.
                    const quizId = $(this).data('delete-quiz-id');
                    const quiz = quizes.find((quiz) => quiz.quizId === quizId);
                    SDK.Storage.persist('quizToDelete', quiz);

                        //Asks admin to confirm the deleting of the chosen quiz.
                        if (window.confirm('Are you sure you want to delete ' + quiz.quizTitle + '? ') === true) {
                                //Calls the delete quiz request i SDK.
                                SDK.Quiz.deleteQuiz((e, data) =>{
                                });
                            //Refreshes the page, so the delete quiz is no longer visable.
                            location.reload();
                        } else {
                            //Is quiz is not delete (on error)
                            window.alert('Error error!!!');
                        }
                    });
                }
            );
            //Reacts to click on logout
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
            //Reacts to klick on create button. Directs usr to the create quiz page.
            $('#createBtn').click(() => {
                window.location.href = 'createQuiz.html';
            });
        }
    )