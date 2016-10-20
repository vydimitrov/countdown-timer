$(document).ready(function(){
	var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };	
    		
	var circle = $('.time-out'),
		$secondsHolder = $('.seconds'),
		$seconds = $('.seconds'),
		len,
		count = 0,
		seconds = ($seconds.html() | 0) - 1,
		colorStep = 0,
		step;

	var colors = [
				// color provided in rgb format
				[94,127,56], // start color #5e7f38
				[242,118,54],
				[139,32,40] // end color #8b2028
			];	

	circle.each(function(){ 
			len = +(this.getTotalLength()).toFixed(2);
		}),
	step = +(len / (60 * 15)).toFixed(2);

	circle.attr({
		'stroke-dasharray': len
	});

	window.requestAnimationFrame(draw);
	window.requestAnimationFrame(colorAnimation);
	var interval = setInterval(function(){
		$secondsHolder.html(seconds);
		if(seconds === 0){
			clearInterval(interval);
		}
		seconds -=1;
	},1000);


	function colorAnimation(){
		var change1 = (colors[colorStep][0] - colors[colorStep + 1][0]) * -1,
			change2 = (colors[colorStep][1] - colors[colorStep + 1][1]) * -1,
			change3 = (colors[colorStep][2] - colors[colorStep + 1][2]) * -1,
			frame = 0,
			duration = 360;

			window.requestAnimationFrame(animate);

			function animate(){
				var increase1 = ease(frame, colors[colorStep][0], change1, duration),
					increase2 = ease(frame, colors[colorStep][1], change2, duration),
					increase3 = ease(frame, colors[colorStep][2], change3, duration);

				circle.css('stroke', 'rgb('+ increase1 +', '+ increase2 +', '+ increase3 +')');
				$seconds.css('color', 'rgb('+ increase1 +', '+ increase2 +', '+ increase3 +')');
				if(frame === duration){
					colorStep += 1;
					if(colorStep === 2){
						return;
					}
					colorAnimation();
					return;
				}
				frame++;
				window.requestAnimationFrame(animate);
			}

			function ease(t, b, c, d){
				t/=d;
				return (b+c*(t)) | 0;
			}
	}

	function draw(){
		count = +(count + step).toFixed(2);
		circle.attr({
			'stroke-dashoffset': count >= len ? len : count
		});			

		if(count >= len){
			return;
		}
		window.requestAnimationFrame(draw);
	}
});