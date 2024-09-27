let boxs=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO=true; // playerX, PlayerO
let count=0;
let winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
const resetGame = () => {
    turnO=true;
    count=0;
    enableBoxs();
    msgContainer.classList.add("hide");
    //msg.innerText="";

};
boxs.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText="O";
            box.style.color="red";
            turnO=false;
        }
        else{
            box.innerText="X";
            box.style.color="green";
            turnO=true;
        }  
        box.disabled=true;
        count++;

        let isWinner=checkWinner();
        if(count===9 && !isWinner){
            gameDraw();
        }
    });
});
const gameDraw = () => {
    msg.innerText=`Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxs();
};
const disableBoxs = () => {
    for(let box of boxs) {
        box.disabled=true;
    }
};
const enableBoxs = () => {
    for(let box of boxs) {
        box.disabled=false;
        box.innerText="";
        box.style.backgroundColor="";
    }

};
const showWinner = (winner, pattern) => {
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    highlightWinningBoxs(pattern);
    disableBoxs();

};
const highlightWinningBoxs = (pattern) => {
    for(let index of pattern){
        boxs[index].style.backgroundColor="lightgreen";
    }
};
const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1val=boxs[pattern[0]].innerText; 
        let pos2val=boxs[pattern[1]].innerText;
        let pos3val=boxs[pattern[2]].innerText;
        if(pos1val!=="" && pos2val!=="" && pos3val!=="") {
            if(pos1val===pos2val && pos2val===pos3val) {
                showWinner(pos1val, pattern);
                return true;
            }
        }

    }
};
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
