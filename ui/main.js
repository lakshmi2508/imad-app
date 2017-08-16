console.log('Loaded!');
var element=document.getElementById("main-text");
element.innerHTML="New Text";

var img=document.getElementById("madi");
var marginLeft=0;
function moveright(){
    if(marginLeft<=50){
    marginLeft=marginLeft+10;
    img.style.marginleft=marginLeft+"px";
    console.log(img.style.marginleft);
    }
}
img.onclick=function(){
    alert("onclick");
var interval=setInterval(moveright,100);
};