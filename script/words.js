importScripts("list.js");

var wlen = words.length;
var target = new Array();
var regexVal;
var wordTotal = 0;
var mystery = 0;

self.onmessage = function(evt){

	regexVal = evt.data.letter;
	
	if(evt.data.action == "start"){
		
		var regex = eval(regexVal);
		
		postTarget(regex);
		
		startCount();

	}
	
	
	if(evt.data.action == "resume"){
		startCount();
	}
	if(evt.data.action == "end"){
			clearInterval(gamer);
			evaluate(evt.data.finscore);
	}
	if(evt.data.action == "pause"){
			clearInterval(gamer);
	}
}

function startCount(){
		gamer = setInterval(function(){
			
			var num = Math.ceil(Math.random() * 100);
			
			var q = num % 2;
			if(q == 0){
			var randomWords = Math.ceil(Math.random() * wlen);
			postMessage(words[randomWords]);
			}else{
			var randomWords = Math.ceil(Math.random() * target.length);
			postMessage(target[randomWords]);
			}
			
			mystery++;
			
			if(mystery == 30){
				var mysteryWords = Math.ceil(Math.random() * target.length);
				postMessage({action:"mystery",word:target[mysteryWords]});
				mystery = 0;
			}
		},500);
}

function postTarget(regex){
	for(var i = 0;i < wlen;i++){
		if(words[i].toString().match(regex)){
			wordTotal += parseInt(words[i].length);
			target.push(words[i]);
		}
	}
}

function evaluate(score){
	var total = wordTotal / 3;
	if(score <= 0){
		postMessage({action:"score",star:0,scores:score,words:wordTotal});
	}else{
		if(score > 0 && score <= 100){
			postMessage({action:"score",star:1,scores:score,words:wordTotal});
		}else{
			if(score > 100 && score <= 250){
				postMessage({action:"score",star:2,scores:score,words:wordTotal});
			}else{
				if(score > 250){
					postMessage({action:"score",star:3,scores:score,words:wordTotal});
				}
				
			}
		}
	
	}
}
