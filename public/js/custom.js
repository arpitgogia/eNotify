function categoryResponse() {
    var employee = document.getElementById('employee').checked;
    var student = document.getElementById('student').checked;
    var textbox = document.getElementById('uid_label');
    if (student)
        textbox.setInnerHtml = 'Roll No.';
    else
        textbox.setInnerHtml = 'Employee UID';
}