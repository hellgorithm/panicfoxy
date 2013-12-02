//var topic = /^a/gi;
var topic = ["/^a/gi","/^b/gi","/^c/gi","/^d/gi","/^e/gi","/^f/gi","/^g/gi","/^h/gi","/^i/gi","/^j/gi","/^k/gi","/^l/gi","/^m/gi","/^n/gi","/^o/gi","/^p/gi","/^q/gi","/^r/gi","/^s/gi","/^t/gi","/^u/gi","/^v/gi","/^w/gi","/^x/gi","/^y/gi","/^z/gi"];
var myletters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var thisletters = ["Aa","Bb","Cc","Dd","Ee","Ff","Gg","Hh","Ii","Jj","Kk","Ll","Mm","Nn","Oo","Pp","Qq","Rr","Ss","Tt","Uu","Vv","Ww","Xx","Yy","Zz"];
var star = ["nostar.png","1star.png","2star.png","3star.png"];
var star2= ["nostarbig.png","1starbig.png","2starbig.png","3starbig.png"];
var id = 0;
var score = 0;
var time;
var gameTime;
var wordWorker;
var mydb;
var curr_letter;
var curr_Regex;
var res_w = 321;
var res_h = 480;

var combo1 = 0;
var combo2 = 0;
var combo3 = 0;
var allowsound;
var gameSound = new Audio("./sounds/blaze.ogg");
gameSound.loop = true;

//globals

var startbutt = document.getElementById("start-button");
var header = document.getElementById("direction");
var letter = document.getElementById("whatletter");
var butt = document.getElementById("start-button");
var headergame = document.getElementById("header-game");
var wordplay = document.getElementById("word-play");
var myscore = document.getElementById("score");
var timersss = document.getElementById("timercol");
var returnbutt = document.getElementById("return-button");
var whatletter = document.getElementById("whatletter");
var gameProper = document.getElementById("game-proper");
var gl = document.getElementById("game-level");
var foxy = document.getElementById("foxsay");
var foxsaid = document.getElementById("foxsaid");
var profile = document.getElementById("profile");
var pname = document.getElementById("profile-name");
var pscore = document.getElementById("profile-score");
var pstar = document.getElementById("profile-star");
var reg = document.getElementById("get-name");
var myname = document.getElementById("myname");
var myreg = document.getElementById("myreg");
var noreg = document.getElementById("noreg");
var cancelTimeoutAnimationFoxy;
			
window.onload = function(){
	//startGame();
	checkSound();
	loadWelcome();
	setTimeout(function(){
		gameLevel()
	},4000);
	
	var myster = new saudio();
	myster.mystery();
}

function checkSound(){
	if(typeof localStorage["settingsound"] !== "undefined"){
		allowsound = localStorage["settingsound"];
	}else{
		localStorage["settingsound"] = "yes";
		allowsound = "yes";
	}
}

function database(){
	var JSONdata = localStorage["foxydb"];
	if(typeof JSONdata !== "undefined"){
		mydb = JSON.parse(JSONdata);
	}else{
		mydb = {a:{star:0,score:0,played:0,myname:undefined},b:{star:0,score:0,played:0,myname:undefined},c:{star:0,score:0,played:0,myname:undefined},d:{star:0,score:0,played:0,myname:undefined},e:{star:0,score:0,played:0,myname:undefined},f:{star:0,score:0,played:0,myname:undefined},g:{star:0,score:0,played:0,myname:undefined},h:{star:0,score:0,played:0,myname:undefined},i:{star:0,score:0,played:0,myname:undefined},j:{star:0,score:0,played:0,myname:undefined},k:{star:0,score:0,played:0,myname:undefined},l:{star:0,score:0,played:0,myname:undefined},m:{star:0,score:0,played:0,myname:undefined},n:{star:0,score:0,played:0,myname:undefined},o:{star:0,score:0,played:0,myname:undefined},p:{star:0,score:0,played:0,myname:undefined},q:{star:0,score:0,played:0,myname:undefined},r:{star:0,score:0,played:0,myname:undefined},s:{star:0,score:0,played:0,myname:undefined},t:{star:0,score:0,played:0,myname:undefined},u:{star:0,score:0,played:0,myname:undefined},v:{star:0,score:0,played:0,myname:undefined},w:{star:0,score:0,played:0,myname:undefined},x:{star:0,score:0,played:0,myname:undefined},y:{star:0,score:0,played:0,myname:undefined},z:{star:0,score:0,played:0,myname:undefined}}
	}
	
	var letters = document.getElementsByClassName("letters");
	var score;
	for(var i = 0;i < letters.length;i++){
		
		var fletter = myletters[letters[i].getAttribute("index")];
		var myletter = thisletters[letters[i].getAttribute("index")];
		if(mydb[fletter]["played"] == 1){
			score = "<div class='score_main'>"+mydb[fletter]["score"]+"</div>";
			letters[i].style.background = "radial-gradient(ellipse at center, yellowgreen 0%,green 100%)";
		}else{
			score = "";
			letters[i].style.background = "radial-gradient(ellipse at center, #cedce7 0%,#596a72 100%)";
		}
		letters[i].innerHTML = myletter + "<img src='./img/"+star[mydb[fletter]["star"]]+"'>";
	
	}
}

function gameLevel(){

database();

var gamelevel = document.getElementById("game-level");
gamelevel.style.width = window.innerWidth + "px";
gamelevel.style.height = window.innerHeight + "px";
gamelevel.style.display = "block";

var nav1 = document.getElementById("nav1");
var nav2 = document.getElementById("nav2");
var nav3 = document.getElementById("nav3");
var page1 = document.getElementById("page1");
var page2 = document.getElementById("page2");
if(allowsound == "no"){
	nav3.style.background = "red";
}else if(allowsound == "yes"){
	nav3.style.background = "#0099CC";
}
nav1.ontouchstart = function(){
	page1.style.display = "block";
	page2.style.display = "none";
}
nav2.ontouchstart = function(){
	page2.style.display = "block";
	page1.style.display = "none";
}

nav3.ontouchstart = function(){
	if(allowsound == "yes"){
		allowsound = "no";
		this.style.background = "red";
		localStorage["settingsound"] = "no";
	}else if(allowsound == "no"){
		allowsound = "yes";
		this.style.background = "#0099CC";
		localStorage["settingsound"] = "yes";
	}
}

var letters = document.getElementsByClassName("letters");

	for(var i = 0;i < letters.length;i++){
	
		letters[i].ontouchstart = function(){
			var currletter = myletters[this.getAttribute("index")];
			
			var thisLetter = thisletters[this.getAttribute("index")];
			var thisReg = topic[this.getAttribute("index")];
			
			gamelevel.style.animation = "rollup 1s forwards";
			gamelevel.style.webkitAnimation = "rollup 1s forwards";
			
			setTimeout(function(){
				if(typeof mydb[currletter]["myname"] !== "undefined" && mydb[currletter]["myname"] != ""){
					pname.innerHTML = mydb[currletter]["myname"];
				}else{
					pname.innerHTML = "Nobody";
				}
				pscore.innerHTML = mydb[currletter]["score"];
				pstar.innerHTML = "<img src='./img/"+star2[mydb[currletter]["star"]]+"'>";
				showData(currletter);
			},1000);
			
			setTimeout(function(){
				startGame(thisLetter,thisReg);
			},1500);
			
			if(allowsound == "yes"){
				var touchstarter = new saudio();
				touchstarter.level();
			}
		}
	}
}

function showData(){
	profile.style.width = window.innerWidth + "px";
	profile.style.height = window.innerHeight + "px";
	profile.style.left = "0px";
	profile.style.animation = "rolleddown 3s forwards";
	profile.style.webkitAnimation = "rolleddown 3s forwards";
	
}

function loadWelcome(){
	var loading = document.getElementById("loading");
	loading.style.width = window.innerWidth + "px";
	loading.style.height = window.innerHeight + "px";
}

function startGame(l,r){

	var wwidth = window.innerWidth;
	var wheight = window.innerHeight;
	var letterwidth = 200;
	
	whatletter.innerHTML = l;
	
	whatletter.style.left = ((wwidth - letterwidth) / 2) + "px";
	
	curr_letter = l.match(/^[a-zA-Z]/).toString().toLowerCase();
	setTimeout(function(){
		profile.style.animation = "";
		profile.style.webkitAnimation = "";
	},3000);
	
	whatletter.style.animation = "bounce 2s 3s forwards";
	whatletter.style.webkitAnimation = "bounce 2s 3s forwards";
	gameProper.style.width = wwidth + "px";
	gameProper.style.height = wheight + "px";
	gameProper.style.display = "block";
	
	header.style.animation= "";
	startbutt.style.animation = "";
	returnbutt.style.animation = "";
	header.style.webkitAnimation= "";
	startbutt.style.webkitAnimation = "";
	returnbutt.style.webkitAnimation = "";
	
	startbutt.ontouchstart = function(){
		startLetter(r);
		var touchstart = new saudio();
		touchstart.normal();
	}
	returnbutt.ontouchstart = function(){
			var letter = document.getElementById("whatletter");
			var gl = document.getElementById("game-level");
			gl.style.animation = "rolldown 1s forwards";
			gl.style.webkitAnimation = "rolldown 1s forwards";
			letter.style.animation = "";
			letter.style.webkitAnimation = "";
			database();
			var touchstart = new saudio();
			touchstart.normal();
	}
}

function startLetter(regex){
	//yeah sounds
	if(allowsound == "yes"){
		gameSound.play();
	}
	curr_Regex = regex;
	startbutt.style.animation = "fadeOut 1s forwards";
	returnbutt.style.animation = "fadeOut 1s forwards";
	header.style.animation = "fadeOut 1s forwards";
	letter.style.animation = "fadeOut 1s forwards";
	butt.style.animation = "fadeOut 1s forwards";
	headergame.style.animation = "fadeInTools 1s forwards";
	startbutt.style.webkitAnimation = "fadeOut 1s forwards";
	returnbutt.style.webkitAnimation = "fadeOut 1s forwards";
	header.style.webkitAnimation = "fadeOut 1s forwards";
	letter.style.webkitAnimation = "fadeOut 1s forwards";
	butt.style.webkitAnimation = "fadeOut 1s forwards";
	headergame.style.webkitAnimation = "fadeInTools 1s forwards";
	
	headergame.style.width = window.innerWidth + "px";
	wordplay.style.display = "block";
	
	wordWorker = new Worker("./script/words.js");
	wordWorker.onerror = function(err){
		console.log(err.filename+" "+err.lineno+" "+err.message);
	}
	wordWorker.postMessage({action:"start",letter:regex});/////
	wordWorker.onmessage = function(evt){
	console.log(evt.data);
		if(evt.data.action == "score"){
			
			gameSound.pause();
			gameSound.currentTime = 0;
			
			var cheers = new Audio("./sounds/cheer.ogg");
			var failed = new Audio("./sounds/failed.ogg");
			//check if score was beaten
			if(mydb[curr_letter]["score"] < score){
				//alert(evt.data.star+" "+evt.data.scores+" "+evt.data.words);
				mydb[curr_letter]["star"] = evt.data.star;
				mydb[curr_letter]["score"] = evt.data.scores;
				mydb[curr_letter]["played"] = 1;
				localStorage["foxydb"] = JSON.stringify(mydb);
				//register new name
				setTimeout(function(){
					reg.style.width = window.innerWidth + "px";
					reg.style.minWidth = (window.innerWidth - 20) + "px";
					reg.style.maxWidth = (window.innerWidth - 20)+ "px";
					reg.style.animation = "regdown 1s forwards";
					reg.style.webkitAnimation = "regdown 1s forwards";
					
					myname.value = "Your name is?";
					myname.onfocus = function(){
						if(this.value == "Your name is?"){
							this.value = "";
							this.style.color = "#424242";
						}
					}
					
					myname.onblur = function(){
						if(this.value == ""){
							this.value = "Your name is?";
							this.style.color = "gray";
						}
					}
					
					myreg.ontouchstart = function(){
						if(myname.value == "Your name is" || myname.value == ""){
							mydb[curr_letter]["myname"] = "Unknown";
						}else{
							mydb[curr_letter]["myname"] = myname.value;
						}
						localStorage["foxydb"] = JSON.stringify(mydb);
						reg.style.animation = "";
						reg.style.webkitAnimation = "";
						var touchstart = new saudio();
						touchstart.normal();
					}
					
					noreg.ontouchstart = function(){
						reg.style.animation = "";
						reg.style.webkitAnimation = "";
						var touchstart = new saudio();
						touchstart.normal();
					}
					
				},1000);
			}	
				var stat;
				
				switch(evt.data.star){
					case 0:
						stat = "Better Luck Next Time.";
						failed.play();
						break;
					case 1:
						stat = "Good! Nice one!";
						cheers.play();
						break;
					case 2:
						stat = "Very Good! You're awesome!";
						cheers.play();
						break;
					case 3:
						stat = "Amazing! You're the Best!";
						cheers.play();
						break;
				}
				
				clearTimeout(cancelTimeoutAnimationFoxy);
				foxsaid.innerHTML = stat+"<br><div id='score-board'><div id='finscore'>"+evt.data.scores+"</div><img id='finstar' src='./img/"+star2[evt.data.star]+"'></div><img id='ok' src='./img/ok.png'> <img id='replay' src='./img/replay.png'>";
				foxy.style.animation = "slideup3 1s forwards";
				foxy.style.webkitAnimation = "slideup3 1s forwards";
				
				var returnhome = document.getElementById("ok");
				var replay = document.getElementById("replay");
				
				returnhome.ontouchstart = function(){
					foxy.style.animation = "slidedown 1s forwards";
					gl.style.animation = "rolldown 1s forwards";
					headergame.style.animation = "fadeOutTools 1s forwards";
					foxy.style.webkitAnimation = "slidedown 1s forwards";
					gl.style.webkitAnimation = "rolldown 1s forwards";
					headergame.style.webkitAnimation = "fadeOutTools 1s forwards";
					wordplay.style.display = "none";
					database();
					reg.style.animation = "";
					reg.style.webkitAnimation = "";
					
					gameSound.pause();
					gameSound.currentTime = 0;
					cheers.pause();
					cheers.currentTime = 0;
					failed.pause();
					failed.currentTime = 0;
					
				var touchstart = new saudio();
					touchstart.normal();
					gameSound.pause();
					gameSound.currentTime = 0;
					cheers.pause();
					cheers.currentTime = 0;
					failed.pause();
					failed.currentTime = 0;
				}
				
				replay.ontouchstart = function(){
					
					gameSound.pause();
					gameSound.currentTime = 0;
					cheers.pause();
					cheers.currentTime = 0;
					var touchstart = new saudio();
					touchstart.normal();
					
					foxy.style.animation = "slidedown 1s forwards";
					foxy.style.webkitAnimation = "slidedown 1s forwards";
					startLetter(curr_Regex);
					reg.style.animation = "";
					reg.style.webkitAnimation = "";
					
				
				}
				
		}else if(evt.data.action == "mystery"){
			pushwords(evt.data.word,regex,"mystery");
		}
		else{
			pushwords(evt.data,regex,"normal");
		}
		
	}
	//modify
	time = 60;
	myscore.innerHTML = "0";
	timersss.style.width = "240px";
	timersss.style.background = "yellowgreen";
	score = 0;
	getTime();
	
	var back = document.getElementById("back");
	back.ontouchstart = function(){
		clearInterval(gameTime);
		wordWorker.postMessage({action:"pause"});
		
		var foxy = document.getElementById("foxsay");
		var foxsaid = document.getElementById("foxsaid");
		foxsaid.innerHTML = "Are you sure?<br/><button id='b2menu'>Back to Menu</button><button id='resume'>Resume Game</button><button id='reset'>Reset</button>";
		foxy.style.animation = "slideup2 500ms forwards";
		foxy.style.webkitAnimation = "slideup2 500ms forwards";
		
		var resume = document.getElementById("resume");
		var menu = document.getElementById("b2menu");
		var reset = document.getElementById("reset");
		resume.ontouchstart = function(){
			getTime();
			foxy.style.animation = "slidedown 1s forwards";
			foxy.style.webkitAnimation = "slidedown 1s forwards";
			wordWorker.postMessage({action:"resume"});
				var touchstart = new saudio();
				touchstart.normal();
		}
		
		reset.ontouchstart =function(){
				foxy.style.animation = "slidedown 1s forwards";
				foxy.style.webkitAnimation = "slidedown 1s forwards";
				startLetter(curr_Regex);
				var touchstart = new saudio();
				touchstart.normal();
		}
		
		menu.ontouchstart = function(){
			foxy.style.animation = "slidedown 1s forwards";
			gl.style.animation = "rolldown 1s forwards";
			headergame.style.animation = "fadeOutTools 1s forwards";
			foxy.style.webkitAnimation = "slidedown 1s forwards";
			gl.style.webkitAnimation = "rolldown 1s forwards";
			headergame.style.webkitAnimation = "fadeOutTools 1s forwards";
			wordplay.style.display = "none";
			database();
				var touchstart = new saudio();
				touchstart.normal();
				
				gameSound.pause();
				gameSound.currentTime = 0;
		}
	}
}

function getTime(){
	var timersss = document.getElementById("timercol");
	gameTime = setInterval(function(){
		try{
			if(time < 11){
				timersss.style.background = "red";
			}else if(time < 20){
				timersss.style.background = "orange";
			}else if(time < 40){
				timersss.style.background = "#0099cc";
			}
			
			if(time < 1){
				wordWorker.postMessage({action:"end",finscore:score})
				clearInterval(gameTime);
		
			}
			timersss.style.width = (time * 4) + "px";
			time = time - 1;
		}catch(e){
			alert(e);
		}
	},1000);
}

function pushwords(word,regex,type){

	var pos = ["left","right"];
	var heighth = window.innerHeight;
	//here
	var heightw = window.innerWidth;
	
	var colors = ["","#0099CC","#15EFEC","#EF151C","#EF15D7","#AA13B7","#d2ff52"];
	
	var wwidth = window.innerWidth - 100;
	
	var rcolors = Math.ceil(Math.random() * 6);
	var rpos = Math.ceil(Math.random() * 2);
	var top = Math.ceil(Math.random() * (heighth - 150));
	//here
	var left = Math.ceil(Math.random() * heightw );
	var myword = document.createElement("span");
	
	myword.innerHTML = word;
	//myword.style.animation = "up "+fast[speed]+" forwards";
	myword.setAttribute("class","wordy");
	myword.style.background = colors[rcolors];
	myword.setAttribute("id","word_"+id);
	
	if(rpos == 1){
		myword.style.left = "20px";
	}else{
		myword.style.right = "20px";
	}
	
	myword.style.bottom = top + "px";
	
	//myword.style.left = left + "px";
	
	wordplay.appendChild(myword);
	
	if(type == "normal"){
		myword.ontouchstart = function(){
			if(this.innerHTML.match(eval(regex))){
				var pic = ["good.png","amazing.png","awesome.png","good.png"];
				var rand  = Math.ceil(Math.random() * 4);
				var len = this.innerHTML.length;
				var sc = document.getElementById("scorecard");
				score += parseInt(len);
				this.style.animation = "boom 500ms forwards";
				this.style.webkitAnimation = "boom 500ms forwards";
				this.innerHTML = "<img src='./img/"+pic[rand]+"'>";
				
				if(len == 5){
					combo1++;
					if(combo1 == 15){
						score += 50;
						combo1 = 0;
						sc.innerHTML = "<img src='./img/combo1.png' class='scoreboard'>";
						var myster = new saudio();
						myster.mystery();
					}
				}
				
				if(len > 5 && len < 10){
					combo2++;
					if(combo2 == 15){
						score += 20;
						combo2 = 0;
						sc.innerHTML = "<img src='./img/combo2.png' class='scoreboard'>";
						var myster = new saudio();
						myster.mystery();
					}
				}else{
					combo2 = 0;
				}
				
				if(len < 10 && len < 20){
					combo3++;
					if(combo2 == 5){
						score += 30;
						combo3 = 0;
						sc.innerHTML = "<img src='./img/combo3.png' class='scoreboard'>";
						var myster = new saudio();
						myster.mystery();
					}
				}else{
					combo3 = 0;
				}
				myscore.innerHTML = score;
				
				var touchstart = new saudio();
				touchstart.normal();
				
			}else{
			score = score - 10;
			myscore.innerHTML = score;
				if(typeof this.innerHTML.match(/^[a-zA-Z]/i).toString() !== "undefined"){
				foxsaid.innerHTML = "It starts with letter "+this.innerHTML.match(/^[a-zA-Z]/i).toString()+"! We need something that starts with letter '"+curr_letter.toUpperCase()+"'";
				foxy.style.animation = "slideup 2s forwards";foxy.style.webkitAnimation = "slideup 2s forwards";
					cancelTimeoutAnimationFoxy = setTimeout(function(){
						foxy.style.animation = "";foxy.style.webkitAnimation = "";
					},2000);
				}
				
				var err = new saudio();
				err.error();
			}
		}
	}
	
	if(type == "mystery"){
		myword.ontouchstart = function(){
				this.style.animation = "boom 500ms forwards";
				this.style.webkitAnimation = "boom 500ms forwards";
				this.innerHTML = "<img src='./img/mystery.png'>";
				var sc = document.getElementById("scorecard");
				sc.innerHTML = "<img src='./img/mystery.png' class='scoreboard'>";
				score += 100;
				myscore.innerHTML = score;
				
				var myster = new saudio();
				myster.mystery();
		}
	}
	
	setTimeout(function(){
		//var elem = document.getElementById("word_"+id);
		myword.parentNode.removeChild(myword);
		//console.log(myword);
	},3000);
	
	id++;
}

var saudio = function(){}

saudio.prototype = {
	level : function(){
		if(allowsound == "yes"){
			var levelSound = new Audio("./sounds/shoot.ogg");
			levelSound.play();
		}
	},
	normal : function(){
		if(allowsound == "yes"){
			var normalSound = new Audio("./sounds/tick.ogg");
			normalSound.play();
		}
	},
	mystery : function(){
		if(allowsound == "yes"){
			var mysterSound = new Audio("./sounds/shoot.ogg");
			mysterSound.play();
		}
	},
	error : function(){
		if(allowsound == "yes"){
			var mysterSound = new Audio("./sounds/buzzer.ogg");
			mysterSound.play();
		}
	},
	game : function(){
		if(allowsound == "yes"){
			var gameSound = new Audio("./sounds/blaze.ogg");
			gameSound.play();
		}
	},
	failed : function(){
		if(allowsound == "yes"){
			var gameSound = new Audio("./sounds/failed.ogg");
			gameSound.play();
		}
	}
}
