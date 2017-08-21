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
/*var button=document.getElementById('counter');
//var counter=0;
button.onclick=function(){
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
      if(request.readyState===XMLHttpRequest.DONE){
          if(request.status===200){
              var counter=request.responseText;
                var span=document.getElementById('count');
                 span.innerHTML=counter.toString();
          }
      }  
    };
  //counter+=1;
  request.open('GET','http://lakshmi2508.imad.hasura-app.io/counter',true);
  request.send(null);
};


var submit=document.getElementById('submit_btn');
submit.onclick=function(){
  var request=new XMLHttpRequest();
  request.onreadystatechange=function(){
    if(request.readyState===XMLHttpRequest.DONE){
        if(request.status===200){
            
            var names=request.responseText;
            names=JSON.parse(names);
            var list='';
            for(var i=0;i<names.length;i++){
                list+='<li>'+names[i]+'</li>';
            }
            var ul=document.getElementById('namelist');
            ul.innerHTML=list;
        }
    }  
  };
  var nametxt=document.getElementById('name');
            var name=nametxt.value;
  request.open('GET','http://lakshmi2508.imad.hasura-app.io/submit-name?name='+name,true);
  request.send(null);
};*/

var submit=document.getElementById('submit_btn');
submit.onclick=function(){
  var request=new XMLHttpRequest();
  request.onreadystatechange=function(){
    if(request.readyState===XMLHttpRequest.DONE){
        if(request.status===200){
           alert("Login successful!"); 
           
        }
        else if(request.status===404){
            alert("Username/password invalid");
            
        }
        else if(request.status==500){
            alert("Server error");
        }
    }  
  };
  var username=document.getElementById("username").value;
  var password=document.getElementById("password").value;

  request.open('POST','http://lakshmi2508.imad.hasura-app.io/login',true);
  request.setRequestHeader('Content-Type','application/json');
  console.log(username);
  console.log(password);
  console.log('data length: ' + Buffer.byteLength(JSON.stringify(send)))
  request.send(JSON.stringify({username:username,password:password}));
};
