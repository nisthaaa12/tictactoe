console.log("Welcome");
let music=new Audio("music.mp3");
let ting=new Audio("ting.mp3");
let gameOver=new Audio("gameover.mp3");
let turn="X";
let info=document.getElementsByClassName("info");
let gamedone=false;

//function to change turn
const changeTurn=()=>{
    return turn==="X"?"0":"X";
}

//function to check for a win
const checkWin = () => {
    let boxText = document.getElementsByClassName("boxText");
    let wins = [
         [0, 1, 2, 5, 5, 0],   // Horizontal top row
         [3, 4, 5, 5, 15, 0],   // Horizontal middle row
         [6, 7, 8, 5, 25, 0],   // Horizontal bottom row
         [0, 3, 6, -5, 15, 90], // Vertical first column
         [1, 4, 7, 5, 15, 90],  // Vertical second column
         [2, 5, 8, 15, 15, 90], // Vertical third column
         [0, 4, 8, 5, 15, 45],  // Diagonal top-left to bottom-right
         [2, 4, 6, 5, 15, 135], // Diagonal top-right to bottom-left
    ];
 
    wins.forEach(element => {
         // Check if all 3 boxes in the winning combination have the same value
         if (
             boxText[element[0]].innerText === boxText[element[1]].innerText &&
             boxText[element[1]].innerText === boxText[element[2]].innerText &&
             boxText[element[0]].innerText !== ""
         ) {
             document.querySelector('.info').innerText = boxText[element[0]].innerText + " Won!!!!";
             gamedone = true;
             gameOver.play();
 
            //  // Ensure the line element exists in the DOM
            //  let line = document.querySelector(".line");
 
            //  // Get the current grid cell size (calculated dynamically)
            //  let gridCellSize = document.querySelector('.container').offsetWidth / 3;
 
            //  // Adjust the line's position and size based on the winning combination
            //  line.style.transform = `translate(${element[3] * gridCellSize}px, ${element[4] * gridCellSize}px) rotate(${element[5]}deg)`;
            //  line.style.width = `${gridCellSize * 3}px`; // Adjust width for full row or column
            //  line.style.height = '5px';  // Adjust height for visibility
 
             // Adjust image size for the win indicator
             document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width = "150px";
             document.querySelector('.imgBox').getElementsByTagName('img')[0].style.height = "170px";
         }   
    });
 };
 
 //function for tie 
 const isTie = () => {
    let boxText = document.getElementsByClassName("boxText");
    for (let e of boxText) {
        if (e.innerText === "") {
            return // Exit immediately if any box is empty
        }
    }
    // If the loop completes, all boxes are filled, and it's a tie
    document.querySelector('.info').innerText = "It's a tie!";
    gamedone = true;
    gameOver.play();
   
};
//reset function
const resetF=()=>{
    let boxText = document.getElementsByClassName("boxText");
    for (let e of boxText) {
        e.innerText="";
    }
    turn = "X";
    gamedone = false;
    document.querySelector('.info').innerText = "Turn for " + turn;
    document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width = "0px";
    document.querySelector('.imgBox').getElementsByTagName('img')[0].style.height = "0px";
} 
 

//game logic

let boxes=document.getElementsByClassName("box");
Array.from(boxes).forEach(element=>{
    let e=element.querySelector(".boxText");
    element.addEventListener('click',()=>{
        if(!gamedone && e.innerText === ''){
            e.innerText=turn;
            ting.play();
            checkWin(); 
            if (!gamedone) {
                isTie();
            }
            if(!gamedone){
                turn=changeTurn();
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    })
})
let reset=document.getElementById("reset");
reset.addEventListener('click',resetF);
