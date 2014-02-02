
  //--functie om de animatie aan te maken--//
  (function() 
  {
    		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
   			window.requestAnimationFrame = requestAnimationFrame;
	 })();

    //--inladen achtergrond--//
    var achtergrond = new Image();
    achtergrond.src = "imagesp/bg.png";  

    //--inladen speler-plaatjes--//
    var happyplayer = new Image();
    happyplayer.src = "imagesp/happyplayer.png"; 

    var sadplayer = new Image();
    sadplayer.src = "imagesp/sadplayer.png"; 

    var scaredplayer = new Image();
    scaredplayer.src = "imagesp/scaredplayer.png";

    //--inladen opstartschermen--//
    var startscreen = new Image();
    startscreen.src = "imagesp/startscreen.png";

    var instructions = new Image();
    instructions.src = "imagesp/instructions.png"; 

    //--inladen vraagschermen--//
    var laptopscherm = new Image();
    laptopscherm.src = "imagesp/laptopscherm.png";

    var laptopscherm2 = new Image();
    laptopscherm2.src = "imagesp/laptopscherm2.png";

    var laptopscherm2b = new Image();
    laptopscherm2b.src = "imagesp/laptopscherm2b.png";

    var laptopscherm2c = new Image();
    laptopscherm2c.src = "imagesp/laptopscherm2c.png";

    var laptopscherm3 = new Image();
    laptopscherm3.src = "imagesp/laptopscherm3.png";

    var laptopscherm4 = new Image();
    laptopscherm4.src = "imagesp/laptopscherm4.png";

    var laptopscherm4a = new Image();
    laptopscherm4a.src = "imagesp/laptopscherm4a.png";

    var laptopscherm4b = new Image();
    laptopscherm4b.src = "imagesp/laptopscherm4b.png";

    var laptopscherm5 = new Image();
    laptopscherm5.src = "imagesp/laptopscherm5.png";

    var laptopscherm6 = new Image();
    laptopscherm6.src = "imagesp/laptopscherm6.png";

    var laptopscherm7 = new Image();
    laptopscherm7.src = "imagesp/laptopscherm7.png";

    var laptopscherm8 = new Image();
    laptopscherm8.src = "imagesp/laptopscherm8.png";

    var laptopscherm9 = new Image();
    laptopscherm9.src = "imagesp/laptopscherm9.png";

    var laptopscherm9a = new Image();
    laptopscherm9a.src = "imagesp/laptopscherm9a.png";

    //--inladen afleidingschermen--//
    var afleiding1 = new Image();
    afleiding1.src = "imagesp/afleiding1.png";

    var afleiding2 = new Image();
    afleiding2.src = "imagesp/afleiding2.png";

    //--inladen hintschermen--//
    var hint1 = new Image();
    hint1.src = "imagesp/tips1.png";

    var hint2 = new Image();
    hint2.src = "imagesp/tips2.png";

    var hint3 = new Image();
    hint3.src = "imagesp/tips3.png";
   
    var hint4 = new Image();
    hint4.src = "imagesp/tips4.png";

    //--inladen eindschermen--//
    var goedEinde = new Image();
    goedEinde.src = "imagesp/goedeinde.png";

    var slechtEinde = new Image();
    slechtEinde.src = "imagesp/slechteinde.png";

    //--inladen achtergrondmuziek--//
    myAudio = new Audio('audiop/bgmusic.mp3'); 

    //--background canvas--//
    var bgcanvas = document.getElementById("bgcanvas"),
        bgctx = bgcanvas.getContext("2d"),
        width = 800,
        height = 600;

    //--hint canvas--//
    var hintcanvas = document.getElementById("hintcanvas"),
        hintctx = hintcanvas.getContext("2d"),
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
    var afleidingaan = 0;
    var pc1gedaan = false;
    var pc2gedaan = false;
    var vraagnummer = 1;
    var afleidingsnummer = 1;
    var raamaan = false;
    var keypressed = false;
    var eindegoed = false;
    var eindeslecht = false;
    var musicplaying = 0;
   
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
    hintcanvas.width = width;
    hintcanvas.height = height;

 
    //--speler laten bewegen dmv toetsen--//
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

      //--overige toetsen toewijzen--//  

        if (keys[74]) {
          //--J-knop--//
          if (!keypressed ) {
            keypressed = true;

            //--in het geval van vragen, doe onderstaande acties--//
            if (vraagaan ===1) {
              console.log("JA")

              //--eerste set vragen--//
              if (vraagnummer ===1) {
                clearQ();
                drawQ2b();
              }
              if (vraagnummer ===2) {
                clearQ();
                drawQ2c();
                vraagnummer++;
                vraagnummer++;
                score--;
              }
              if (vraagnummer ===3) {
                clearQ();
                drawQ2();
              }
              if (vraagnummer ===4) {
                clearQ();
                drawQ3();
                score--;
              }
              if (vraagnummer ===5) {
                clearQ();
                drawQ4();
                score--;
              }
              if (vraagnummer ===6) {
                clearQ();
                drawQ5();
              }
              if (vraagnummer ===7) {
                clearQ();
                drawQ6();
              }
              if (vraagnummer ===8) {
                clearQ();
                pc1gedaan = true;
                spelspeelbaar = 1;
                raamaan = true;
                vraagaan = 0;
              }

              //--tweede set vragen--//
              if (vraagnummer ===11) {
                clearQ();
                drawQ8();
              }
              if (vraagnummer ===12 && eindscore > 1) {
                clearQ();
                drawQ4();
              }
              if (vraagnummer ===12 && eindscore <= 1) {
                clearQ();
                drawQ4a();
                score--;
              }
              if (vraagnummer ===13 && eindscore > 1) {
                clearQ();
                drawQ9();
              }
              if (vraagnummer ===13 && eindscore <= 1) {
                clearQ();
                drawQ9a();
                score--;
              }
              if (vraagnummer ===14 && eindscore > 1) {
                clearQ();
                pc2gedaan = true;
                spelspeelbaar = 1;
                eindegoed = true;
                vraagaan = 0;
              }
              if (vraagnummer ===14 && eindscore <= 1) {
                clearQ();
                score--;
                pc2gedaan = true;
                spelspeelbaar = 1;
                eindeslecht = true;
                vraagaan = 0;
              }  
              vraagnummer++;
            }

            //--in geval van afleiding, doe onderstaande acties--//
            if (afleidingaan ===1){
              if (afleidingsnummer ===1) {
                clearQ();
                drawDist2();
              }
              if (afleidingsnummer ===2) {
                clearQ();
                spelspeelbaar = 1;
                afleidingaan = 0;
                raamaan = false;
                vraagaan = 0;
              }
              afleidingsnummer++;
            }
          } 
        }

        if (keys[78]) {
          //--N-knop--//
          if (!keypressed ) {
            keypressed = true;

            //--in geval van vragen, doe onderstaande acties--//
            if (vraagaan ===1) {
             console.log("NEE")
              if (vraagnummer ===2) {
                clearQ();
                drawQ2c();
                vraagnummer = 3;
                eindscore++;
              }
              if (vraagnummer ===4) {
                clearQ();
                drawQ6();
                vraagnummer = 8;
                eindscore++;
              }
              if (vraagnummer ===5) {
                clearQ();
                drawQ6();
                vraagnummer = 8;
                eindscore++;
              }
            }
          } 
        }

        if (keys[32]) {
          //--spatiebalk--//
           if (!keypressed) {
            keypressed = true;
            if (spelspeelbaar === 1) {
             console.log("Speler x ", player.x, "Speler y ", player.y);
              //--interactie raam--//
              if (player.x > 280 && player.x < 450 && player.y >= 100 && player.y <=125) {
                
                if (raamaan === true) {
                  spelspeelbaar = 0;
                  afleidingaan = 1;
                  vraagaan = 1;
                  clearQ();
                  drawDist();
                }
              }

              //--interactie deur--//
              if (player.x > 20 && player.x < 105 && player.y >= 100 && player.y <=135) {
                
               if (eindeslecht === true) {
                  spelspeelbaar = 0;
                  drawBadEnd(); 
                  myAudio.pause();
                }

               if (eindegoed === true) {
                  spelspeelbaar = 0;
                  drawGoodEnd();
                  myAudio.pause();
                } 
              }

              //--interactie laptop--//
              if (player.x > 596 && player.x < 700 && player.y >= 138 && player.y <=190) {

                //--eerste set vragen--//
                if (pc1gedaan === false && pc2gedaan === false) {
                  spelspeelbaar = 0;
                  vraagaan = 1;
                  clearQ();
                  drawQ();
                }
                //--tweede set vragen--//
                if (pc1gedaan === true && pc2gedaan === false) {
                  clearQ();
                  spelspeelbaar = 0;
                  vraagaan = 1;
                  drawQ7();
                }
              }  
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
              myAudio.play();
              musicplaying = 1;
            } 
            preloaded++; 
          }  
        }

        if (keys[80]) {
          //--P-toets voor debug doeleinden--//
          if (!keypressed) {
            keypressed = true;
            console.log("moodindex", score, "eindscore", eindscore, "vraagnummer", vraagnummer);
          }  
        }

        if (keys[77]) {
          //--m-toets om muziek aan en uit te zetten--//
          if (!keypressed) {
            keypressed = true;
            if (musicplaying === 1) {
              myAudio.pause();
              musicplaying = 0;
            }
            else {
              myAudio.play();
              musicplaying = 1;
            }
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

      //--speel achtergrondmuziek af--//
      myAudio.addEventListener('ended', function() 
      {
        this.currentTime = 0;
        this.play();
      }, 
      false);
      

      //--teken instructies--//
      hintctx.clearRect(0,0,width,height);
      if (spelspeelbaar ===1) {
       if (vraagnummer === 1) {
        hintctx.drawImage(hint1,0,0,800,600,0,0,800,600);
       }
       if (vraagnummer === 9) {
        hintctx.drawImage(hint2,0,0,800,600,0,0,800,600);
       }
       if (vraagnummer ===11) {
        hintctx.drawImage(hint3,0,0,800,600,0,0,800,600);
       }
       if (vraagnummer === 15) {
        hintctx.drawImage(hint4,0,0,800,600,0,0,800,600);
       }
      } 

      //--teken speler afhankelijk van score--//
      avctx.clearRect(0,0,width,height);
      //--teken bange speler als score slecht is--//
      if (score <= -4) {
        avctx.drawImage(scaredplayer, player.x, player.y, 139, player.height);
      } 
      //--teken zorgelijke speler als score gemiddeld is--//
      if (score <= -2 && score > -4) {
        avctx.drawImage(sadplayer, player.x, player.y, player.width, player.height);        
      } 
      //--teken vrolijke speler als score goed is--//
      if (score <=0 && score > -2) {
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

    //--vragen tekenen--//
    function drawQ(){
      vrgctx.drawImage(laptopscherm,0,0,800,600,0,0,800,600);
    }

    function drawQ2(){
      vrgctx.drawImage(laptopscherm2,0,0,800,600,0,0,800,600);
    }

    function drawQ2b(){
      vrgctx.drawImage(laptopscherm2b,0,0,800,600,0,0,800,600);
    }

    function drawQ2c(){
      vrgctx.drawImage(laptopscherm2c,0,0,800,600,0,0,800,600);
    }

    function drawQ3(){
      vrgctx.drawImage(laptopscherm3,0,0,800,600,0,0,800,600);
    }

    function drawQ4(){
      vrgctx.drawImage(laptopscherm4,0,0,800,600,0,0,800,600);
    }

    function drawQ4a(){
      vrgctx.drawImage(laptopscherm4a,0,0,800,600,0,0,800,600);
    }

    function drawQ4b(){
      vrgctx.drawImage(laptopscherm4b,0,0,800,600,0,0,800,600);
    }

    function drawQ5(){
      vrgctx.drawImage(laptopscherm5,0,0,800,600,0,0,800,600);
    }

    function drawQ6(){
      vrgctx.drawImage(laptopscherm6,0,0,800,600,0,0,800,600);
    }

    function drawQ7(){
      vrgctx.drawImage(laptopscherm7,0,0,800,600,0,0,800,600);
    }

    function drawQ8(){
      vrgctx.drawImage(laptopscherm8,0,0,800,600,0,0,800,600);
    }

    function drawQ9(){
      vrgctx.drawImage(laptopscherm9,0,0,800,600,0,0,800,600);
    }

    function drawQ9a(){
      vrgctx.drawImage(laptopscherm9a,0,0,800,600,0,0,800,600);
    }

    //--afleidingen tekenen--//
    function drawDist(){
      vrgctx.drawImage(afleiding1,0,0,800,600,0,0,800,600);
    }

    function drawDist2(){
      vrgctx.drawImage(afleiding2,0,0,800,600,0,0,800,600);
    }

    //--eindes tekenen--//
    function drawGoodEnd(){
      startctx.drawImage(goedEinde,0,0,800,600,0,0,800,600);
    }

    function drawBadEnd(){
      startctx.drawImage(slechtEinde,0,0,800,600,0,0,800,600);
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