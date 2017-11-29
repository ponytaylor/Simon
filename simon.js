var btns = document.getElementsByClassName("simonbutton");
var notes = document.getElementById("notes");
for(var i=0; i<btns.length;i++){
    btns[i].addEventListener("click", playAndSetClickEvent);
}

var audios = document.getElementsByTagName('audio');
for(var i=0; i<audios.length;i++){
    audios[i].addEventListener("ended", endAudio);
}

function endAudio() {
    console.log("audio ended ");
}
function playAndSetClickEvent() {
    if (theGame.playerTurn){
        document.getElementById(this.getAttribute("sound")).play();
        theGame.player.btnClicks.push(this.id.slice(-1) - 1);
        this.classList.add("playing");
        console.log(theGame.player.btnClicks);
        theGame.checkForBadNote();
    }
}
/*
var numToPlay = 0;
var playback = false;
var gameplayback = false;
var winner = false;
var loser = false;

var btnClicks = [];
var userStatus;
var waitforinput = false;

*/

window.addEventListener("play", function(evt)
{
    console.log("Play", evt.target);
}, true);

window.addEventListener("ended", function(evt)
{
    console.log("Ended", evt.target);
    
    var btnElem = document.getElementById("btn" + evt.target.id);
    btnElem.classList.remove("playing");
    if (theGame.computerTurn){
        theGame.computer.playNext();
    }
  
}, true);
/*
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
        console.log("level reached");
        notes.dispatchEvent(pevent);
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
                userStatus = false;
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
        notes.dispatchEvent(cevent);
      } else {
          if (btnClicks.length == level) {
            clearInterval(id);
            notes.innerHTML = "good job";
            waitforinput = false;
            notes.dispatchEvent(cevent);
          }
        
      }
    }

}

function takeaturn(callback){
    playSounds(0);
    btnClicks = [];
    callback();
}

// Create the event.
var pevent = document.createEvent('Event');
var cevent = document.createEvent('Event');

// Define that the event name is 'build'.
pevent.initEvent('goplayer', true, true);
cevent.initEvent('gocomputer', true, true);

// Listen for the event.
notes.addEventListener('goplayer', function (e) {
  // e.target matches elem
  console.log(e);
  btnClicks = [];
}, false);

notes.addEventListener('gocomputer', function (e) {
    // e.target matches elem
    console.log(e);
    level++;
    console.log ("setting level to ", level); 
    playSounds(0);
  }, false);
  
*/

function Player(){
    this.numCorrect = 0;
    this.btnClicks = [];
    var status = 'good';
    this.setStatus = function(s){
        status = s;
    }

    this.getStatus = function(){
        return status;
    }

    this.takeTurn= function(){
        console.log("player turn");
        notes.innerHTML = "play it";
        this.btnClicks = [];
       
    }

    this.endTurn = function(){
        //for(var i=0; i<btns.length;i++){
            console.log("end turn");
            //btns[i].removeEventListener("click", this.setClickEvent);
            
       // }
    }
}

function Computer(){
    this.currentPlayNum = 0;
    
    this.takeTurn = function(){
        console.log("computer turn");
        notes.innerHTML = "listen to this!";
        this.currentPlayNum = 0;
        playSounds(this.currentPlayNum);
    }

    var playSounds = function( num){
        console.log("playSounds", num);
        var randNext = theGame.rands[num];
        var soundid = btns[randNext].getAttribute("sound");
        //console.log(soundid);
        var soundElem = document.getElementById(soundid);
        var btnElem = document.getElementById("btn" + soundid);
        
        soundElem.playbackrate = "0.5";
        soundElem.currentTime = 0;
        btnElem.classList.add("playing");
        console.log(soundElem, btnElem);
        soundElem.play();
    }

    this.playNext = function(){
        console.log("playnext ");
        this.currentPlayNum++;
        if (this.currentPlayNum >= theGame.level) {
            console.log("level reached");
            //notes.dispatchEvent(pevent);
            theGame.startPlayerTurn();
            return;
        }
        playSounds(this.currentPlayNum);
    }

}


function setRands(randArr){
    for (var r = 0; r < 8; r++){
        var randNum = Math.floor(Math.random() * 4);
        randArr.push(randNum);
    }
    console.log(randArr);
}

function SimonGame(){
    this.level = 1;
    this.rands = [];
    this.playerTurn = false;
    this.computerTurn = false;
    this.computer = new Computer();
    this.player = new Player();

    this.initGame = function (){
         setRands(this.rands);
         this.startComputerTurn();
         console.log(this.rands);
    }
    this.startComputerTurn= function(){
        console.log("setting comp turn true");
        this.computerTurn = true;
        this.computer.takeTurn(this.rands, this.level);
    }
    this.startPlayerTurn= function(){
        this.computerTurn = false;
        console.log("setting comp turn false");
        this.playerTurn = true;
        this.player.takeTurn(this.rands, this.level);
    }
    this.checkForBadNote = function(){
        for(var cl=0; cl< this.player.btnClicks.length; cl++){
            if(this.player.btnClicks[cl] != this.rands[cl]){
                notes.innerHTML = "bad note";
                this.playerTurn = false;
                this.player.setStatus('bad');
                this.player.endTurn();
            }
        }
        // if we get past that loop without ending the turn
        // check to see if we have successfully finished the turn
        if(this.playerTurn){
            if (this.player.btnClicks.length == this.level){
                notes.innerHTML = "good job!";
                this.playerTurn = false;
                this.player.setStatus('good');
                this.player.endTurn();
            }
        }
        if (!this.playerTurn){
            if (this.player.getStatus() == 'bad'){
                notes.innerHTML = "loooooser";
            }
            else{
                this.level++;
                setTimeout(this.startComputerTurn(), 3000);
            }
        }
    }
}

var theGame;

//function startSimonGame(){
    theGame = new SimonGame();
    theGame.initGame();
//}

