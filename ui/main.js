console.log('Loaded!');
var element=document.getElementById("main-text");
element.innerHTML="New Text";

var img=document.getElementById("madi");
var marginLeft=0;
function moveright(){
    //img.style.marginleft="0px";
    if(marginLeft<=10){
    marginLeft=marginLeft+1;
    img.style.marginLeft=marginLeft+'px';
    //console.log(img.style.marginleft);
    }
    else{
        if(marginLeft>=0){
        marginLeft=marginLeft-1;
    img.style.marginLeft=marginLeft+'px';
        }
    }
}
img.onclick=function(){
var interval=setInterval(moveright,100);
};