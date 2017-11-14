var btns = document.getElementsByClassName("simonbutton");
var notes = document.getElementById("notes");
var rands = [];
var numToPlay = 0;
var playback = false;
var gameplayback = false;
var winner = false;
var loser = false;
var level = 0;
var btnClicks = [];
var userStatus;
var waitforinput = false;

for (var r = 0; r < 8; r++){
    var randNum = Math.floor(Math.random() * 4);
    rands.push(randNum);
}
console.log(rands);

window.addEventListener("play", function(evt)
{
    //console.log("Play", evt.target);
}, true);

window.addEventListener("ended", function(evt)
{
    //console.log("Ended", evt.target);
    
    var btnElem = document.getElementById("btn" + evt.target.id);
    btnElem.classList.remove("playing");
    //console.log("Unplay", btnElem);
    if (playback){
       if (numToPlay == rands.length){
          numToPlay = 0;
       }
    numToPlay++;
    playSound(numToPlay);
   }
   if (gameplayback){

      numToPlay++;
      playSounds(numToPlay);
   }
}, true);

function playSound(num){
    console.log(num);
 playback = true;
    if (num == rands.length) {
        playback = false;
        return;
    }
    var randNext = rands[num];
    var soundid = btns[randNext].getAttribute("sound");
    //console.log(soundid);
    var soundElem = document.getElementById(soundid);
    var btnElem = document.getElementById("btn" + soundid);
    //console.log(soundElem.readyState);
    soundElem.playbackrate = "0.5";
    btnElem.classList.add("playing");
    soundElem.play();

}
function playSounds(num){
    console.log("playSounds", num);
 gameplayback = true;
    if (num >= level) {
        gameplayback = false;
        return;
    }
    var randNext = rands[num];
    var soundid = btns[randNext].getAttribute("sound");
    //console.log(soundid);
    var soundElem = document.getElementById(soundid);
    var btnElem = document.getElementById("btn" + soundid);
//console.log(soundElem.readyState);
    soundElem.playbackrate = "0.5";
    btnElem.classList.add("playing");
    soundElem.play();

}

//setTimeout(function(){ playSound(3); }, 3000);

//playSound(0);

for(var i=0; i<btns.length;i++){
    //btns[i].style.backgroundColor = "rgb("+ i*50 +", 33, 223)";
    btns[i].addEventListener("click", function(){
        
        document.getElementById(this.getAttribute("sound")).play();
        btnClicks.push(this.id.slice(-1) - 1);
        console.log(btnClicks);
        for(var cl=0; cl< btnClicks.length; cl++){
            if(btnClicks[cl] != rands[cl]){
                notes.innerHTML = "bad note";
            }
        }
    });
}

function checkInput(){
    console.log("checkInput");
    waitforinput = true;
    var id = setInterval(checkUserInput, 300);
    function checkUserInput() {
      if (userStatus == false) {
        clearInterval(id);
        loser=true;
        waitforinput = false;
      } else {
          if (btnClicks.length == level) {
            clearInterval(id);
            notes.innerHTML = "good job";
            waitforinput = false;
          }
        
      }
    }

}

function takeaturn(callback){
    playSounds(0);
    btnClicks = [];
    callback();
    
}

function moreGame(){
    level++;
    console.log ("setting level to ", level);
    if (level < 8){
     takeaturn(checkInput);
    }
}


function simonGame(){
    level = 1;
    numToPlay = 0;
    userStatus = true;
    takeaturn(checkInput);    
}