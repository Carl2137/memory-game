
const characters = ["ciri.png","geralt.png","jaskier.png","iorweth.png","triss.png","yen.png"];
let cards = getMixedCards();


let randomizedChars = [];
let IndexFree = false;

//let characters_index = []; // index which will be used to concatenate 'cards' Array
//let repeat_checking = [];  //Array for random randomizedChars to checking for possible repeat



const c0 = document.getElementById('c0');
const c1 = document.getElementById('c1');
const c2 = document.getElementById('c2');
const c3 = document.getElementById('c3');
const c4 = document.getElementById('c4');
const c5 = document.getElementById('c5');
const c6 = document.getElementById('c6');
const c7 = document.getElementById('c7');
const c8 = document.getElementById('c8');
const c9 = document.getElementById('c9');
const c10 = document.getElementById('c10');
const c11 = document.getElementById('c11');

c0.addEventListener('click', function() {revealCard(0)});
c1.addEventListener('click', function() {revealCard(1)});
c2.addEventListener('click', function() {revealCard(2)});
c3.addEventListener('click', function() {revealCard(3)});
c4.addEventListener('click', function() {revealCard(4)});
c5.addEventListener('click', function() {revealCard(5)});
c6.addEventListener('click', function() {revealCard(6)});
c7.addEventListener('click', function() {revealCard(7)});
c8.addEventListener('click', function() {revealCard(8)});
c9.addEventListener('click', function() {revealCard(9)});
c10.addEventListener('click', function() {revealCard(10)});
c11.addEventListener('click', function() {revealCard(11)});

let oneUncovered = false;
let turnCounter = 0;
let uncoveredName='';
let uncoveredNumber;
let lock = false;
let pairsLeft = 6;


function getRandomCard(cards)
{
    const randomIdx = Math.floor(Math.random()*cards.length);

    return cards [randomIdx];
}

function isItemTwiceInArr(item, array)
{
    const filteredArr = array.filter(function (el) {
        return el === item;
    });
    
    return filteredArr.length === 2;

}

function getMixedCards()
{
    const mixedDoubledChars = [];

    for(let i=0; i<characters.length * 2; i++)
    {
        let cardPushed = false;
        while (cardPushed === false)
        {
           const randomCard = getRandomCard(characters);
           const canAddRandomCard = !isItemTwiceInArr(randomCard, mixedDoubledChars);

           if (canAddRandomCard){
               mixedDoubledChars.push(randomCard);
               cardPushed = true;
           }
        }
    }

    return mixedDoubledChars;
}




function win()
{
    $('.board').css('margin-top', '100px');
    $('.board').html('<h1>Congratulations!</h1><p>All pairs found in ' + turnCounter + ' turns</p><br/><span class="reset" onclick="location.reload()">Play again</span>');
}

function counting() {
    turnCounter++;
    document.getElementById("score").innerHTML='Turn counter: ' + turnCounter;
}

function vanishing(first,second)
{
    $('#c' + first).css('opacity', '0');
    $('#c' + second).css('opacity', '0');
    counting();
    pairsLeft--;
    lock = false;

    if (pairsLeft === 0)
    {
        setTimeout(function() { win() }, 500 );
    }
}

function covering(first,second)
{
    $('#c' + first).removeClass('cardAct');
    $('#c' + second).removeClass('cardAct');
    $('#c' + first).css('background-image', 'url(img/karta.png)');
    $('#c' + second).css('background-image', 'url(img/karta.png)');
    counting();
    lock = false;
    uncoveredNumber = null;

}

function revealCard(nr)
{
    
    let opacityValue = $('#c' + nr).css('opacity');
    if (opacityValue != 0 && nr != uncoveredNumber && lock === false)
    {
        lock = true;
        let graph = 'url("img/' + cards[nr] +'")';
        $('#c' + nr).css('background-image', graph);
        $('#c' + nr).toggleClass('cardAct');
        
        
        if (oneUncovered === false) //when first card uncovered
        {
            uncoveredName = cards[nr];
            uncoveredNumber = nr;
            lock = false;
            oneUncovered = true;

        }
        else    //when second card uncovered
        {
            if(cards[nr]===uncoveredName)
                {
                    setTimeout(function() { vanishing(uncoveredNumber,nr) }, 1000 );

                }
                else
                {
                    setTimeout(function() { covering(uncoveredNumber,nr) }, 1000 );
                }
            
            oneUncovered = false;
            
        }


    
}
    }

