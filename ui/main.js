console.log('Loaded!');
//change the text of main text-div
var element = document.getElementById('main-text');
element.innerHTML = 'new-value';

var img = document.getElementById('madi')
img.onClick = function()
{
    img.style.marginLeft = '100px';
}