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