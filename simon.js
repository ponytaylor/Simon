var btns = document.getElementsByClassName("simonbutton");
var svgbtns = document.getElementsByClassName("svgbutton");
var notes = document.getElementById("notes");
/*for(var i=0; i<btns.length;i++){
    btns[i].addEventListener("click", playAndSetClickEvent);
}
*/
for(var i=0; i<svgbtns.length;i++){
    svgbtns[i].addEventListener("click", playAndSetClickEvent);
}

var audios = document.getElementsByTagName('audio');
for(var i=0; i<audios.length;i++){
    audios[i].addEventListener("ended", endAudio);
}

function endAudio() {
    console.log("audio ended ");
}


function playIt() {
        document.getElementById(this.getAttribute("sound")).play();
        this.classList.add("playing");
    
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
       // console.log("playnext ");
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
    for (var r = 0; r < 5; r++){
        var randNum = Math.floor(Math.random() * 4);
        randArr.push(randNum);
    }
    console.log(randArr);
}

function SimonGame(){
    this.level = 1;
    this.rands = [];
    this.speed = 1;
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
        //console.timeEnd('compturn');
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
                if (this.level > this.rands.length){
                    // winner
                    console.log("winner");
                    notes.innerHTML = "winner!"
                }
                else {
                    console.log('start comp');
                    //console.time('compturn');
                    setTimeout(function(){theGame.startComputerTurn()}, 3000);
                }
            }
        }
    }
}

var theGame;

function startSimonGame(){
    theGame = new SimonGame();
    theGame.initGame();
}

