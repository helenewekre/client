$(document).ready(() => {

    $('#createBtn').click(() => {

        const course = $('#course').val();
        const title = $('#title').val();
        const description  = $('#description').val();

        if(!course || !title || !description){
            alert('Please enter data')
        } else {
            SDK.Quiz.create(title, description, course, (e, data) =>  {
                if (e && e.xhr.status === 400) {
                    $(".margin-bottom").addClass('Error');
                }
                else if (e) {
                    console.log('Error')
                } else {
                    alert('Quiz ' + title + ' successfully created!')
                    window.location.href = 'quiz.html';
                }
            });
        }
    });
});