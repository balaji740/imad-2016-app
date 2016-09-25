var button = document.getElementById('counter');
button.onclick = function (){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE) {
            if (request.status == 200) {
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
    };
    request.open('GET','http://balaji740.imad.hasura-app.io/counter', true);
    request.send(null);
};
    
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
submit.onclick = function (){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE) {
            if (request.status == 200) {
                var names = request.responseText;
                names = JSON.parse(names);
                var list ='';
                for(var i=0;i<names.length;i++){
                     list += '<li>' + names[i] + '</li>';
                    }
                var ui = getElementById('namelist');
                ui.innerHTML = list;
            }
        }
    };
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    request.open('GET','http://balaji740.imad.hasura-app.io/submit-one?name=' + name, true);
    request.send(null);
};
