console.log('Loaded!');
//change the text of main text-div
var element = document.getElementById('main-text');
element.innerHTML = 'new-value';

var img = document.getElementById('madi');
//img.onclick = function()
//{
//    img.style.marginLeft = '100px';
//}
//img.onClick = function()
var marginLeft = 0;
function moveRight()
{
   marginLeft = marginLeft + 1;
   img.style.marginLeft = marginLeft + 'px';
}
   img.onclick = function(){
 
 var interval = setInterval(moveRight, 50);
 //img.style.marginLeft = '100px';
};