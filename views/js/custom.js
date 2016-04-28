// $(document).ready(function() {
//      $('#submit').click(function(event) {
//          console.log("Signing Up");
//          var username = $('#username').val();
//          var uid = $('#uid').val();
//          var password = $('#password').val();
//          var category = $('input:radio[name=category]:checked').val();
//          $.post(
//              "http://localhost:3000/signup", 
//              {"username":username, "password":password, "category":category, "uid":uid},
//              function(data) {
//                  $(document).html(data);
//              }  
//          );
//       });
// });