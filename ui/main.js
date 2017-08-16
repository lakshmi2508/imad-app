console.log('Loaded!');
var element=document.getElementById("main-text");
element.innerHTML="New Text";

var img=document.getElementById("madi");
var marginLeft=0;
function moveright(){
    marginleft=marginleft+2;
    img.style.marginleft=marginleft+"px";
}
img.onclick=function(){
    alert("onclick");
var interval=setInterval(moveright,50);
};