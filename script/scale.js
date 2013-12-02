var myscale = 1;
function aspectRatio(myhost,target)
	{
			var mytarget = target;
			var windowheight = typeof myhost.innerHeight !== "undefined" ? parseInt(myhost.innerHeight) : parseInt(myhost.clientHeight);
			var windowwidth = typeof myhost.innerWidth !== "undefined" ? parseInt(myhost.innerWidth) : parseInt(myhost.clientWidth);
			var endCount = typeof mytarget.length !== "undefined" ? parseInt(mytarget.length) : 1;
			
			
				var toFit = typeof mytarget !== "undefined" ? mytarget : mytarget;
				var myheight = parseInt(toFit.clientHeight);
				var mywidth = parseInt(toFit.clientWidth);
				
				var mytop = (windowheight / 2) - (this.canvasHeight / 2);
				var myleft = (windowwidth / 2) - (this.canvasWide / 2);
				
				toFit.style.top = mytop+"px";
				toFit.style.left = myleft+"px";
				toFit.style.transform = ""; //reset transform
				toFit.style.webkitTransform = ""; //reset transform
				if(windowheight < myheight && windowwidth > mywidth){
					var minus = myheight - windowheight;
					var calc = (myheight - minus) / myheight;
					myscale = calc;
				}else if(windowwidth < mywidth && windowheight > myheight){
					var minus = mywidth - windowwidth;
					var calc = (mywidth - minus) / mywidth;
					myscale = calc;
				}else if(windowwidth < mywidth && windowheight < myheight){
					var diff1 = mywidth - windowwidth;
					var diff2 = myheight - windowheight;
					
					if(diff1 > diff2){
						var minus = mywidth - windowwidth;
						var calc = (mywidth - minus) / (mywidth + 20);
						myscale = calc;
					}else if(diff1 < diff2){
						var minus = myheight - windowheight;
						var calc = (myheight - minus) / (myheight + 20);
						myscale = calc;
					}
				}
				
				if(windowwidth > mywidth && windowheight > myheight){
					//custom
					
					//myscale = windowwidth / mywidth;
					var diff1 = windowwidth - mywidth;
					var diff2 = windowheight - myheight;
					if(diff1 > diff2){
						myscale = windowheight / myheight;
						console.log("diff1");
					}else{
						myscale = windowwidth / mywidth;
						console.log("diff2");
					}
				}
				
				toFit.style.transform = "scale("+myscale+")";
				toFit.style.webkitTransform = "scale("+myscale+")";
				//__x(toFit,"transform","scale("+myscale+")");
			
	}