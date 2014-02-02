
//--functie om de animatie aan te maken--//
  (function() 
  {
    		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
   			window.requestAnimationFrame = requestAnimationFrame;
	 })();

    //--inladen plaatjes--//
    var achtergrond = new Image();
    achtergrond.src = "images/bg.png";   

    var happyplayer = new Image();
    happyplayer.src = "images/happyplayer.png" 

    var sadplayer = new Image();
    sadplayer.src = "images/sadplayer.png" 

    var scaredplayer = new Image();
    scaredplayer.src = "images/scaredplayer.png" 

   
    //--background canvas--//
    var bgcanvas = document.getElementById("bgcanvas"),
        bgctx = bgcanvas.getContext("2d"),
        width = 800,
        height = 600;

    //--startcanvas--//
    var startcanvas = document.getElementById("startcanvas"),
        startctx = startcanvas.getContext("2d"),
        width = 800,
        height = 600;
   
    //--avatar canvas--//
		var avcanvas = document.getElementById("avcanvas"),
        avctx = avcanvas.getContext("2d"),
  			width = 800,
   			height = 600,
   			player = {
          x : (width/2),
   	   		y : height*(9/10),
          width : 85,
          height : 274,
          speed: 3,
          velX: 0,
          velY: 0
  	 		},
        keys = [],
        friction = 0.8;

    //--geef canvas correcte grootte mee--//
		avcanvas.width = width;
		avcanvas.height = height;
    bgcanvas.width = width;
    bgcanvas.height = height;
    startcanvas.width = width;
    startcanvas.height = height;

 
    //--speler laten bewegen dmv pijltjestoetsen--//
    function update(){

      //--pijltjestoetsen toewijzen--//

        if (keys[38]) {
        //--pijltje naar boven--//
        if (player.velY > -player.speed) {                         
          player.velY--;                  
          } 
        }

        if (keys[40]) {
        //--pijltje naar beneden--//
        if (player.velY < player.speed) {                         
          player.velY++;                  
          } 
        }

        if (keys[39]) {
          //--pijltje naar rechts--//
          if (player.velX < player.speed) {                         
          player.velX++;                  
          }          
        } 

        if (keys[37]) {                 
          //--pijltje naar links--//                 
          if (player.velX > -player.speed) {
          player.velX--;
          }
        }

        if (keys[32]) {
          //--spatiebalk--//
          console.log("SPATIE");
        }

      player.velX *= friction;
      player.velY *= friction;
      player.x += player.velX;
      player.y += player.velY;

      if (player.x >= width-(player.width)) 
      {
        player.x = width-(player.width);
      } 
      else if (player.x <= 0) 
      {
        player.x = 0;
      }

      if (player.y >= height-player.height) 
      {
        player.y = height-player.height;
      } 
      else if (player.y <= height/6) 
      {
        player.y = height/6;
      }

       //--teken speler--//
      avctx.clearRect(0,0,width,height);
      avctx.drawImage(happyplayer, player.x, player.y, player.width, player.height);
      requestAnimationFrame(update);
    }

    //--achtergrond in laten laden ingame--//
    function loadBg(){
      clearBg();
      bgctx.drawImage(achtergrond,0,0,800,600,0,0,800,600);
    }

    //--achtergrond leegmaken--//
    function clearBg(){
      bgctx.clearRect(0,0,800,600);
    }

  //--eventlistener koppelen aan toetsen--//
  document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
    e.preventDefault();
  });
 
  document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
    e.preventDefault();
  });

  //--eventlistener koppelen aan het in te laden scherm--//
  window.addEventListener("load", function(){
    update();
    loadBg();
  });