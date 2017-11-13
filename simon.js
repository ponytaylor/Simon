var btns = document.getElementsByClassName("simonbutton");
var rands = [];
var numToPlay = 0;

for (var r = 0; r < 8; r++){
    var randNum = Math.floor(Math.random() * 3);
    rands.push(randNum);
}
console.log(rands);

window.addEventListener("play", function(evt)
{
    console.log("Play", evt.target);
}, true);

window.addEventListener("ended", function(evt)
{
    console.log("Ended", evt.target);
    numToPlay++;
    playSound(numToPlay);
}, true);

function playSound(num){
    console.log(numToPlay);
    if (numToPlay == rands.length) return;
    var randNext = rands[num];
    var soundid = btns[randNext].getAttribute("sound");
    console.log(soundid);
    var soundElem = document.getElementById(soundid);
    //soundElem.currentTime = 0;
    console.log(soundElem.readyState);
    //soundElem.addEventListener('ended', playSound(num+1));
    soundElem.playbackrate = "0.5";
    soundElem.play();

}

//setTimeout(function(){ playSound(3); }, 3000);

//playSound(0);

for(var i=0; i<btns.length;i++){
    btns[i].style.backgroundColor = "rgb("+ i*50 +", 33, 223)";
    btns[i].addEventListener("click", function(){
        
        document.getElementById(this.getAttribute("sound")).play();
    });
}