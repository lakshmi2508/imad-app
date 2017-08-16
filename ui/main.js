/*console.log('Loaded!');
var element=document.getElementById("main-text");
element.innerHTML="New Text";

var img=document.getElementById("madi");
var marginLeft=0;
var moved=false;
function moveright(){
    //img.style.marginleft="0px";
    if(marginLeft<100 && moved===false){
        moved=false;
    marginLeft=marginLeft+5;
    img.style.marginLeft=marginLeft+'px';
    console.log(img.style.marginleft);
    }
    else{
        moved=true;
        //marginLeft=img.style.marginLeft;
        if(marginLeft>=0){
        marginLeft=marginLeft-5;
        console.log(marginLeft);
    img.style.marginLeft=marginLeft+'px';
        }
    }
}
img.onclick=function(){
var interval=setInterval(moveright,100);
};*/
var button=document.getElementById("counter");
var counter=0;
button.onclick=function(){
  counter+=1;
  var span=document.getElementById("count");
  span.innerHTML=counter.toString();
};