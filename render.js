const {ipcRenderer} = require('electron');
const { dialog } = require('electron').remote;
const copyFile = require('fs-copy-file');
const fs = require('fs');
const PixabayApi = require('node-pixabayclient');
const PixabayPhotos = new PixabayApi({ apiUrl: "https://pixabay.com/api/" });
var results = [];

const btngetimgs = document.getElementById('btn-get-img');
var ul = document.getElementById("images-liste");
btngetimgs.addEventListener("click", getData);
let imgTag = [];

 // GET DATA FUNCTION 
 function  getData(){
  keyword = document.getElementById("search").value;
  var params = {
    key: "1118383-6f030915521bd916870f0aa17",
    q: keyword, // automatically URL-encoded
    image_type: "photo",
  };
  PixabayPhotos.query(params, function(errors, res, req) {
    if (errors) {
      console.log('One or more errors were encountered:');
      console.log('- ' + errors.join('\n- '));
      return;
    }
      console.log("RES hits");
      ul.innerHTML = "";
      res["hits"].forEach(function(item, index, array){
        results.push(item["largeImageURL"]);
        var li =  document.createElement("li");
        var div1  = document.createElement("div");
        div1.classList.add("card");
        var img = document.createElement("img");
        img.src = item["largeImageURL"];
        //img.("click",imgClick(img.src));
        img.classList.add("images-listed");
        img.classList.add("card-img-top");
        div1.appendChild(img);
        li.appendChild(div1);
        ul.appendChild(li);
      })
      myCanvas = document.getElementById("my-canvas");
      images = document.getElementsByClassName('images-listed');
        for (var i = 0; i < images.length; i++) {
          console.log(images[i]);
            images[i].addEventListener('click',renderCanvas,false);
        }
      console.log("ReQ");
      console.log(req);

  }) ; 
} ;


//  Function Render image to Canvas whene click
 function renderCanvas(ev){
 var ctxx ;
 ctxx = myCanvas.getContext('2d');
 var image = new Image();
 image.src = ev.target.src;
 myCanvas.width = image.width;
 myCanvas.height = image.height;
 ctxx.drawImage(image,0,0);
 }

 document.getElementById("open").addEventListener("click",OpenImage); 
function  OpenImage(){
  
  let filepath =dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] });
  myCanvas = document.getElementById("my-canvas");
  console.log('source  was copied to destination ');
  var ctxx ;
  ctxx = myCanvas.getContext('2d');
  
  var image = new Image();
  image.src =filepath[0];
  myCanvas.width = image.width;
  myCanvas.height = image.height;
  image.onload= function(){ 
    myCanvas.width = image.width;
    myCanvas.height = image.height;
    ctxx.drawImage(image,0,0);
  }
}

  
