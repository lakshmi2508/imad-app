console.log('Loaded!');
var element=document.getElementById("main-text");
element.innerHTML="New Text";

var img=document.getElementById("madi");
var marginLeft=0;
function moveright(){
    marginLeft=marginLeft+5;
    img.style.marginleft=marginLeft+"px";
    console.log(img.style.marginleft);
}
img.onclick=function(){
    alert("onclick");
var interval=setInterval(moveright,100);
};