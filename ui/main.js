//var button = document.getElementById('counter');
//button.onclick = function (){
//    var request = new XMLHttpRequest();
//    request.onreadystatechange = function () {
//        if (request.readyState == XMLHttpRequest.DONE) {
//            if (request.status == 200) {
//                var counter = request.responseText;
//                var span = document.getElementById('count');
//                span.innerHTML = counter.toString();
//            }
//        }
//    };
//    request.open('GET','http://balaji740.imad.hasura-app.io/counter', true);
//    request.send(null);
//};
    
//console.log('Loaded!');
//change the text of main text-div
//var element = document.getElementById('main-text');
//element.innerHTML = 'new-value';

//var img = document.getElementById('madi');
//img.onclick = function()
//{
//    img.style.marginLeft = '100px';
//}
//img.onClick = function()
//var marginLeft = 0;
//function moveRight()
//{
//   marginLeft = marginLeft + 1;
//   img.style.marginLeft = marginLeft + 'px';
//}
//   img.onclick = function(){
 
//var interval = setInterval(moveRight, 50);
//img.style.marginLeft = '100px';
//};


var submit = document.getElementById('btn_id');
//submit.onclick = function(){
//    var names = ['name1','name2','name3','name4'];
//    var list ='';
//    for(var i=0;i<names.length;i++){
//        list += '<li>' + names[i] + '</li>';
//    }
//    var ui = getElementById('namelist');
//    ui.innerHTML = list;
//submit.onclick = function (){
//    var request = new XMLHttpRequest();
//    request.onreadystatechange = function () {
//        if (request.readyState == XMLHttpRequest.DONE) {
//            if (request.status == 200) {
//                var names = request.responseText;
//                names = JSON.parse(names);
//                var list ='';
//                for(var i=0;i<names.length;i++){
//                     list += '<li>' + names[i] + '</li>';
//                    }
//                var ui = document.getElementById('namelist');
//                ui.innerHTML = list;
//            }
//        }
//    };

      submit.onclick = function (){
      var request = new XMLHttpRequest();
       request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE) {
            if (request.status == 200) {
                console.log('user logged in');
                alert('logged in successfully');
            }else if ( request.status == 403) {
                alert('username/password is invalid');
             
            }else if ( request.status == 500) {
                alert('something went wrong in the server');   
            }
        }
    };
//    var nameInput = document.getElementById('name');
//    var name = nameInput.value;
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;
      console.log(username);
      console.log(password);
      console.log(password);
//    request.open('GET','http://balaji740.imad.hasura-app.io/submit-name?name=' + name, true);
      request.open('POST','http://balaji740.imad.hasura-app.io/login',true);
      console.log('test1');
      request.setRequestHeader('Content-Type', 'application/json');
      console.log('test2');
      request.send(JSON.stringify({username:username , password:password}));
      console.log('test3');
 //   request.send(null);
};
