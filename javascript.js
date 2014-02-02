
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
    happyplayer.src = "images/happyplayer.png"; 

    var sadplayer = new Image();
    sadplayer.src = "images/sadplayer.png"; 

    var scaredplayer = new Image();
    scaredplayer.src = "images/scaredplayer.png";

    var startscreen = new Image();
    startscreen.src = "images/startscreen.png";

    var instructions = new Image();
    instructions.src = "images/instructions.png"; 

    var laptopscherm = new Image();
    laptopscherm.src = "images/laptopscherm.png";

    var laptopscherm2 = new Image();
    laptopscherm2.src = "images/laptopscherm2.png";

    var laptopscherm3 = new Image();
    laptopscherm3.src = "images/laptopscherm3.png";

    var laptopscherm4 = new Image();
    laptopscherm4.src = "images/laptopscherm4.png";
   
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
    var spelspeelbaar = 0;

    //--vraagcanvas--//
    var vraagcanvas = document.getElementById("vraagcanvas"),
        vrgctx = vraagcanvas.getContext("2d"),
        width = 800,
        height = 600;

    //--vraag variabelen--//
    var preloaded = 1;
    var vraagaan = 0;
    var vraagnummer = 1;
    var keypressed = false;
   
    //--avatar canvas--//
		var avcanvas = document.getElementById("avcanvas"),
        avctx = avcanvas.getContext("2d"),
  			width = 800,
   			height = 600,
        keys = [],
        friction = 0.8;

    //--avatar variabelen--//
    var player = {
          x : (width/2),
          y : height*(9/10),
          width : 85,
          height : 274,
          speed: 3,
          velX: 0,
          velY: 0
        };
    var score = 0;
    var eindscore = 0;

    //--geef canvas correcte grootte mee--//
		avcanvas.width = width;
		avcanvas.height = height;
    bgcanvas.width = width;
    bgcanvas.height = height;
    startcanvas.width = width;
    startcanvas.height = height;
    vraagcanvas.width = width;
    vraagcanvas.height = height;

 
    //--speler laten bewegen dmv pijltjestoetsen--//
    function update(){

      //--pijltjestoetsen toewijzen--//

        if (keys[38]) {
        //--pijltje naar boven--//
        if (spelspeelbaar === 1) {
          if (player.velY > -player.speed) {                         
           player.velY--;                  
           } 
         }
        }

        if (keys[40]) {
        //--pijltje naar beneden--//
        if (spelspeelbaar === 1) {
          if (player.velY < player.speed) {                         
            player.velY++;                  
           } 
         }
       }

        if (keys[39]) {
          //--pijltje naar rechts--//
          if (spelspeelbaar === 1) {
            if (player.velX < player.speed) {                         
            player.velX++;                  
            }          
          } 
        }

        if (keys[37]) {                 
          //--pijltje naar links--//                 
          if (spelspeelbaar === 1) {
           if (player.velX > -player.speed) {
            player.velX--;
            }
         }
        }

        if (keys[74]) {
          //--J-knop--//
          if (!keypressed ) {
            keypressed = true;
            if (vraagaan ===1) {
              console.log("JA")
              if (vraagnummer ===1) {
                clearQ();
                drawQ2();
                console.log(vraagnummer, "fuck");
              }
              if (vraagnummer ===2) {
                clearQ();
                drawQ3();
                console.log(vraagnummer, "yeah");
              }
              if (vraagnummer ===3) {
                clearQ();
                drawQ4();
              }
              vraagnummer++;
            }
          } 
        }

        if (keys[78]) {
          //--N-knop--//
          if (!keypressed ) {
            keypressed = true;
            if (vraagaan ===1) {
             console.log("NEE")
              if (vraagnummer ===1) {
                clearQ();
                drawQ4();
                vraagnummer = 4;
              }
              if (vraagnummer ===2) {
                clearQ();
                drawQ4();
                vraagnummer = 4;
              }
              if (vraagnummer ===3) {
                clearQ();
                drawQ4();
                vraagnummer = 4;
              }
            }
          } 
        }

        if (keys[32]) {
          //--spatiebalk--//
           if (spelspeelbaar === 1) {
            console.log("Speler x ", player.x, "Speler y ", player.y);
            //--interactie raam--//
            if (player.x > 280 && player.x < 450 && player.y >= 100 && player.y <=125) {
              console.log("KIJK EEN MUS");
              clearQ();
            }
            //--interactie laptop--//
            if (player.x > 596 && player.x < 700 && player.y >= 138 && player.y <=190) {
              console.log("Laptop jonguh!");
              spelspeelbaar = 0;
              vraagaan = 1;
              clearQ();
              drawQ();

            }
          }
        }

        if (keys[13]) {
          //--enter toets--//
          if (!keypressed) {
            keypressed = true;
            if (preloaded === 1) {
              clearPre();
              loadIns();
            } 
            if (preloaded === 2) {
              clearIns();
            } 
            preloaded++; 
          }  
        }

      player.velX *= friction;
      player.velY *= friction;
      player.x += player.velX;
      player.y += player.velY;

      //--laat speler niet buiten de toegewezen ruimte bewegen--//
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

       //--teken speler afhankelijk van score--//
      avctx.clearRect(0,0,width,height);
      //--teken bange speler als score slecht is--//
      if (score < -10) {
        avctx.drawImage(scaredplayer, player.x, player.y, 139, player.height);
      } 
      //--teken zorgelijke speler als score gemiddeld is--//
      if (score <= -5 && score > -10) {
        avctx.drawImage(sadplayer, player.x, player.y, player.width, player.height);        
      } 
      //--teken vrolijke speler als score goed is--//
      if (score <=0 && score > -5) {
        avctx.drawImage(happyplayer, player.x, player.y, player.width, player.height);
      }  
      requestAnimationFrame(update);
    }

    //--prescreen inladen--//
    function loadPre(){
      startctx.drawImage(startscreen,0,0,800,600,0,0,800,600);
    }

    //--prescreen verwijderen--//
    function clearPre(){
      startctx.clearRect(0,0,800,600);
    }

    function loadIns(){
      startctx.drawImage(instructions,0,0,800,600,0,0,800,600);
    }

    function clearIns(){
      startctx.clearRect(0,0,800,600);
      spelspeelbaar = 1;
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

    //--vraag leegmaken--//
    function clearQ(){
      vrgctx.clearRect(0,0,800,600);
    }

    //--vragen etc tekenen--//
    function drawQ(){
      vrgctx.drawImage(laptopscherm,0,0,800,600,0,0,800,600);
    }

    function drawQ2(){
      vrgctx.drawImage(laptopscherm2,0,0,800,600,0,0,800,600);
    }


    function drawQ3(){
      vrgctx.drawImage(laptopscherm3,0,0,800,600,0,0,800,600);
    }

    function drawQ4(){
      vrgctx.drawImage(laptopscherm4,0,0,800,600,0,0,800,600);
    }

  //--eventlistener koppelen aan toetsen--//
  document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
    e.preventDefault();
    }
  );

  document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
    e.preventDefault();
    keypressed = false;
    }
  );

  //--eventlistener koppelen aan het in te laden scherm--//
  window.addEventListener("load", function(){
    loadPre();
    update();
    loadBg();
  });