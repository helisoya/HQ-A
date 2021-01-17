// BALIST Engine - JavaScript Port

var ScenesTable;
var XmlButtonData;
var CurrentScene;


function ChangeWindowName(Name){
  document.title=Name;
};

function ChangePersoName(Name,Color){
  document.getElementById("perso").innerHTML = Name;
  document.getElementById("perso").style.color = Color;
};

function ChangeDialog(Txt,Scene){
  document.getElementById("dialog").innerHTML = "";
  typeWriter(Txt,Scene,0);
};

function typeWriter(Txt,Scene,i) {
  if (i < Txt.length && Scene == CurrentScene) {
    document.getElementById("dialog").innerHTML += txt.charAt(i);
    i++
    setTimeout(function(){typeWriter(Txt,Scene)}, 100,i);
  }
}

function ChangeImg(Img){
  if(document.getElementById("img").getAttribute("src") != Img){
    document.getElementById("img").setAttribute("src",Img);
  };
};

function ChangePersoImg(Img){
  if(document.getElementById("persoimg").getAttribute("src") != Img){
    document.getElementById("persoimg").setAttribute("src",Img);
  };
};

function SetButtons(XmlData){
  XmlButtonData = XmlData;
  document.getElementById('button1').style.visibility = 'hidden';
  document.getElementById('button2').style.visibility = 'hidden';
  document.getElementById('button3').style.visibility = 'hidden';
  document.getElementById('button4').style.visibility = 'hidden';
  document.getElementById('button1').replaceWith(document.getElementById('button1').cloneNode(true));
  document.getElementById('button2').replaceWith(document.getElementById('button2').cloneNode(true));
  document.getElementById('button3').replaceWith(document.getElementById('button3').cloneNode(true));
  document.getElementById('button4').replaceWith(document.getElementById('button4').cloneNode(true));
  for(var i = 0;i <= XmlData.querySelector("number").innerHTML;i++){
    if (i > 0){
      document.getElementById("button"+i).style.visibility = 'visible';
      document.getElementById("button"+i).innerHTML = XmlData.querySelector("b"+i+"name").innerHTML;
      document.getElementById("button"+i).addEventListener("click",function() {
        LoadScene(XmlButtonData.querySelector("b"+this.id[6]+"to").innerHTML);
      });
    };
  };
};

function LoadScene(Id){
  var Scene = ScenesTable.getElementById(Id);
  CurrentScene = Scene;
  ChangePersoName(Scene.querySelector("charname").innerHTML,Scene.querySelector("charcolor").innerHTML)
  ChangeDialog(Scene.querySelector("dialog").innerHTML,Scene,0);
  ChangeImg(Scene.querySelector("background").innerHTML);
  ChangePersoImg(Scene.querySelector("char").innerHTML)
  SetButtons(Scene.querySelector("buttons"));

};

function InitData(){
   fetch("https://raw.githubusercontent.com/helisoya/HQ-A/gh-pages/res/Data.xml")
       .then(function(resp){
		return resp.text();
	})
       .then(function(data){
		parser = new DOMParser();
		ScenesTable = parser.parseFromString(data,"application/xml");
    LoadScene(document.getElementById("Data").innerHTML);
	});
};
