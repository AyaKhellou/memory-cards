//settings
let cards = document.querySelectorAll('.block');
let blockConatainer = document.querySelector(".game-blocks");
let start = document.querySelector(".start-page .start");
let nameContainer = document.querySelector(".name span");
let startPage = document.querySelector(".start-page");
let tries = document.querySelector(".tries span");
let results = document.querySelector(".game-result");
let wrongsCount = 0;



// when click ask the user to write their name 

start.onclick = ()=>{

    let name = prompt("please enter your name");
    if (name !== "") {

        nameContainer.innerHTML = name;
        
    }else{
        nameContainer.innerHTML = 'unknown';

    }
    startPage.style.display = "none";

    questionMarks();

    show();
    blockConatainer.classList.add('no-clicking');


    setTimeout(() => {
        show();
    }, 2000);

    shuffleCards(cards);

    flip();
}



//add question mark on all cards
function questionMarks() {
    let front = document.querySelectorAll(".face.front");
    let txt = document.createTextNode("?");
    front.forEach(e => {
        e.textContent = "?"
    });
}
//show all the cards for 1s

function show() {

        cards.forEach(card => {

            card.classList.toggle("myStyle");
            blockConatainer.classList.remove('no-clicking');


        });

}


//shuffle function
function shuffle(arr){

    for (let i = arr.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i+1));
        
        [arr[i],arr[j]] = [arr[j],arr[i]]
    }
    return arr;
}

//shuffle the cards
function shuffleCards (myArr){
    
    let newCardsArr = []
    for (let i = 0; i < myArr.length; i++) {
        newCardsArr.push(myArr[i])
        
    }

    newCardsArr = shuffle(newCardsArr);
    blockConatainer.innerHTML ="";
    for (let card of newCardsArr){
        blockConatainer.appendChild(card);
    }

}




//flip card when click




function flip() {
    cards.forEach(card => {
        card.onclick = (e)=>{

            //get the clicked item's block
            let clickedCard = e.target.parentElement;
            // clickedCard.classList.toggle("myStyle");
            clickedCard.classList.add("myStyle");
            
            let allSelected = document.querySelectorAll('.myStyle');
            
            if (allSelected.length === 2) {

                //stop clicking function
                stopClicking();

                //check if two cards similar
                checkCards(allSelected);
            }
        }
    });
}


//stop clicking function

function stopClicking(){
    blockConatainer.classList.add('no-clicking');
    setTimeout(()=>{
        blockConatainer.classList.remove('no-clicking');
    },1000);
}

//check if two cards similar
function checkCards(selectedCards){

    //get cards brand attr
    let arr = Array.from(selectedCards).map(card => {

        return card.getAttribute("brand");
        
    });

    //check if the two brands are the same

    setTimeout(() => {

        if (arr[0] === arr[1]) {

            for (let i = 0; i < selectedCards.length; i++) {
                selectedCards[i].innerHTML="";
                selectedCards[i].style.pointerEvents = 'none'
            }
            
            
        }else{

            wrongsCount++;

            //add wrong tries to span

            tries.innerHTML = wrongsCount;
        }
        selectedCards[0].classList.remove('myStyle');
        selectedCards[1].classList.remove('myStyle');

        gameResult(wrongsCount)
        
    }, 1000);


}

//win

function gameResult(tries) {
    
    let icon = document.querySelector(".game-result .icon");
    let text = document.querySelector(".game-result .text");
    let button = document.querySelector(".game-result .button");

    button.onclick = ()=>{
        location.reload()
    }


    if (Array.from(cards).every(card => card.innerHTML === "")) {

        results.classList.toggle('win')
        icon.innerHTML = '<i class="fa-solid fa-face-laugh-squint" style="color: #FFD43B;"></i>';
        text.innerHTML = 'Congrats,you win';
        button.innerHTML = 'play once more';

    }
    if(tries > cards.length){

        results.classList.toggle('fail')
        icon.innerHTML = '<i class="fa-solid fa-face-sad-tear" style="color: #FFD43B;"></i>';
        text.innerHTML = 'unfortunately,you lose';
        button.innerHTML = 'try again';
        

    }
    
}
