// Game constants & Variable
let inputDir={x:0,y:0}
const foodSound=new Audio('eat.mp3')
const gameOverSound = new Audio('gameover.mp3');
const moveSound =new Audio('move.mp3')
const musicSound =new Audio('music.mp3')
let score=0
let speed =2
let lastPaintTime =0;
let snakeArr =[
    {x:13,y:15}
]
let food ={x:6,y:7}


// Game Fuction
function main(cTime){
window.requestAnimationFrame(main);
if((cTime-lastPaintTime)/1000<1/speed){
    return
}
    lastPaintTime =cTime;
    gameEngine();
}
function isCollide(snake){
    // If you bump into yourself
for (let i=1; i <snakeArr.length; i++) {
    if (snake[i].x ===snake[0].x && snake[i].y ===snake[0].y) {
        return true;
    }
}
// If you bump into wall

if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18  || snake[0].y<=0){
    return true;
}

}
    


function gameEngine(){
// Part 1: Updating the snake array
if(isCollide(snakeArr)){
gameOverSound.play()
musicSound.pause()
inputDir ={x:0,y:0};
snakeArr=[ {x:13,y:14}]
score=0;
alert("Game Over. Press any key to play again!")
musicSound.play()
}
// If you have eaten the food , increment the score and regenerate the food
if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
    foodSound.play()
    score+=1;
    if(score>hiscoreval){
        hiscoreval=score;
        localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
        highScoreBox.innerHTML="High score:"+hiscoreval
    }
    scoreBox.innerHTML="Score:"+score;
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
    let a = 2
    let b = 16
    food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
}

// Moving snake
for (let i = snakeArr.length - 2; i>=0; i--) { 
    snakeArr[i+1] = {...snakeArr[i]};
}

snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;


// Part 2: Display the snake and Food

// Display the snake
board.innerHTML ="";
snakeArr.forEach((e,index)=>{
    sankeElement = document.createElement('div');
    sankeElement.style.gridRowStart=e.y;
    sankeElement.style.gridColumnStart=e.x;
    if(index===0){
        sankeElement.classList.add('head');
    }
    else{
        sankeElement.classList.add('snake');

    }
    board.appendChild(sankeElement)
})

//  Display the food
foodElement = document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement)

}

// Main logic starts here
let hiscore =localStorage.getItem("hiscore")
if(hiscore==null){
    hiscoreval=0
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))

}
else{
    hiscoreval=JSON.parse(hiscore);
    highScoreBox.innerHTML="High score:" +hiscore
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir ={x:0,y:1}
    moveSound.play()
    musicSound.play()
    switch(e.key){
        case "ArrowUp":
          inputDir.x=0;
          inputDir.y=-1;
            break;
        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;
        default:
            break;
        
    }
    upArrow.addEventListener("click",()=>{
        inputDir.x=0;
        inputDir.y=-1;
    })
    downArrow.addEventListener("click",()=>{
        inputDir.x=0;
        inputDir.y=1;
    })
    leftArrow.addEventListener("click",()=>{
        inputDir.x=-1;
        inputDir.y=0;
    })
    rightArrow.addEventListener("click",()=>{
        inputDir.x=1;
        inputDir.y=0;
       
    })
   
})
window.addEventListener('touchstart',e=>{
    inputDir ={x:0,y:1}
    moveSound.play()
    musicSound.play()
    upArrow.addEventListener("click",()=>{
        inputDir.x=0;
        inputDir.y=-1;
    })
    downArrow.addEventListener("click",()=>{
        inputDir.x=0;
        inputDir.y=1;
    })
    leftArrow.addEventListener("click",()=>{
        inputDir.x=-1;
        inputDir.y=0;
    })
    rightArrow.addEventListener("click",()=>{
        inputDir.x=1;
        inputDir.y=0;
       
    })
   
})
