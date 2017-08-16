console.log('Loaded!');
var element=document.getElementById("main-text");
element.innerHTML="New Text";

var img=document.getElementById("madi");
var marginleft=0;
function moveright(){
    while(marginleft<=50){
    marginleft+=2;
    img.style.marginleft=marginleft+"px";
    }
}
img.onclick=function(){
var interval=setInterval(moveright,50);
};