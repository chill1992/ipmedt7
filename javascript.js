(function() 
  {
    		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
   			window.requestAnimationFrame = requestAnimationFrame;
	})();

		var canvas = document.getElementById("canvas"),
 			ctx = canvas.getContext("2d"),
  			width = 800,
   			height = 600,
   			player = {
   	 		x : width/2,
   	   		y : height/2,
  	    	width : 5,
  	   		height : 5,
          speed: 3,
          velX: 0,
          velY: 0
  	 		},
        keys = [],
        friction = 0.8;
 
		canvas.width = width;
		canvas.height = height;
 
    function update(){

      // check keys
        if (keys[38]) {
        // up arrow
        if (player.velY < player.speed) {                         
          player.velY--;                  
          } 
        }

        if (keys[40]) {
        // down arrow
        if (player.velY < player.speed) {                         
          player.velY++;                  
          } 
        }

        if (keys[39]) {
          // right arrow
          if (player.velX < player.speed) {                         
          player.velX++;                  
          }          
        } 

        if (keys[37]) {                 
          // left arrow                  
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
      else if (player.y <= 0) 
      {
        player.y = 0;
      }

      // draw our player
      ctx.clearRect(0,0,width,height);
      ctx.fillStyle = "red";
      ctx.fillRect(player.x, player.y, player.width, player.height);
      // run through the loop again
      requestAnimationFrame(update);
    }

document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});
 
document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});

window.addEventListener("load", function(){
  update();
});