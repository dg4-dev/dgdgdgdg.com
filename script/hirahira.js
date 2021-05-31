(function(){
	document.addEventListener('DOMContentLoaded', function(){
		var canvas = createElement('canvas', {
			appendTo: document.body,
			width: window.innerWidth,
			height: window.innerHeight,
			style: {
				position: "fixed",
				top: 0,
				left: 0,
				zIndex: -1
			}
		});
		var context = canvas.getContext('2d');

		var mouseLog = new Array();
		move = function(e){
			if(!e) e = window.event;
			if(mouseLog[0]==null) mouseLog.push({ x:e.clientX, y:e.clientY, c:getRandomColor() });
			var delta = Math.sqrt(Math.pow(mouseLog[mouseLog.length-1].x-e.clientX,2)+Math.pow(mouseLog[mouseLog.length-1].y-e.clientY,2));
			if(1+Math.max(0, mouseLog.length-2)*4 < delta){
				mouseLog.push({ x:e.clientX, y:e.clientY, c:getRandomColor() });
				if(mouseLog.length>=30) mouseLog.shift();
				drawMouseLog();
			}
		}
		document.addEventListener('touchmove', move);
		document.addEventListener("mousemove", move);
		
		var intervalCount = 0;
		setInterval(function(){
			drawMouseLog();
			if(mouseLog.length>10){
				mouseLog.shift();
			} else if(mouseLog.length>5){
				if(intervalCount%2==0) mouseLog.shift();
			} else if(mouseLog.length>0){
				if(intervalCount%4==0) mouseLog.shift();
			}
			intervalCount++;
		}, 20);

		function drawMouseLog(){
			context.fillStyle = "white";
			context.fillRect(0, 0, canvas.width, canvas.height)
			for(var i=0; i<mouseLog.length-2; i++){
				context.lineWidth = 0;
				context.beginPath();
				context.fillStyle = mouseLog[i].c;
				context.moveTo(mouseLog[i+0].x, mouseLog[i+0].y);
				context.lineTo(mouseLog[i+1].x, mouseLog[i+1].y);
				context.lineTo(mouseLog[i+2].x, mouseLog[i+2].y);
				context.closePath();
				context.fill();
			}
		}

		function getRandomColor(){
			return "rgba("+(Math.floor(Math.random()*155)+120)+","+(Math.floor(Math.random()*155)+120)+","+(Math.floor(Math.random()*155)+120)+",1)";
		}

		function createElement(tagName, options){
			var options = options;
			var tag = document.createElement(tagName);
			Object.keys(options).forEach(function(key){
				if(key=='appendTo'){
					options[key].appendChild(tag);
					return;
				} else if(key=='style'){
					Object.keys(options[key]).forEach(function(keyStyle){
						tag.style[""+keyStyle] = options[key][keyStyle];
					});
					return;
				}
				tag[key] = options[key];
			});
			return tag;
		}
	}, false);
})();