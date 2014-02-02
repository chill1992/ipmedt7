
//--functie om de animatie aan te maken--//
  (function() 
  {
    		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
   			window.requestAnimationFrame = requestAnimationFrame;
	 })();

    //--background canvas--//
    var bgcanvas = document.getElementById("bgcanvas"),
        bgctx = bgcanvas.getContext("2d"),
        width = 800,
        height = 600;

    //--inladen achtergrond--//
    var achtergrond = new Image();
    achtergrond.src = "bg.png";    

    //--avatar canvas--//
		var avcanvas = document.getElementById("avcanvas"),
        avctx = avcanvas.getContext("2d"),
  			width = 800,
   			height = 600,
   			player = {
   	 		x : width/2,
   	   		y : height*(9/10),
  	    	width : 5,
  	   		height : 5,
          speed: 1,
          velX: 0,
          velY: 0,
          draw: function() {
            
            canvas.fillRect(this.x, this.y, this.width, this.height);
          }
  	 		},
        keys = [],
        friction = 0.8;

    //--geef canvas correcte grootte mee--//
		avcanvas.width = width;
		avcanvas.height = height;
    bgcanvas.width = width;
    bgcanvas.height = height;

 
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

      player.velX *= friction;
      player.velY *= friction;
      player.x += player.velX;
      player.y += player.velY;

      if (player.x >= width-player.width) 
      {
        player.x = width-player.width;
      } 
      else if (player.x <= 0) 
      {
        player.x = 0;
      }

      if (player.y >= height-player.height) 
      {
        player.y = height-player.height;
      } 
      else if (player.y <= height/2 + height/10) 
      {
        player.y = height/2 + height/10;
      }

      //--teken rood vierkant--//
      avctx.clearRect(0,0,width,height);
      avctx.fillStyle = "red";
      avctx.fillRect(player.x, player.y, player.width, player.height);
      //--update tekenen--//
      requestAnimationFrame(update);
    }

    //--achtergrond in laten laden ingame--//
    function loadBg(){
      clearBg();
      bgctx.drawImage(achtergrond,0,0,800,600,0,0,800,600);
      console.log("YOLOLO");
    }

    //--achtergrond leegmaken--//
    function clearBg(){
      bgctx.clearRect(0,0,800,600);
      console.log("pleaserespond");
    }

  //--eventlistener koppelen aan toetsen--//
  document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
  });
 
  document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
  });

  //--eventlistener koppelen aan het in te laden scherm--//
  window.addEventListener("load", function(){
    update();
    loadBg();
  });