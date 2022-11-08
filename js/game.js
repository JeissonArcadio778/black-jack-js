/**
 * C = Clubs (Tréboles)
 * H = Heart
 * D = Diamonds
 * S = Spades
 */

let deck = [];
const types = ["C", "H", "D", "S"];
const symbols = ["A", "J", "Q", "K"];

let pointsPlayer = 0,
  pointsComputer = 0;

//Variables

const btnNew = document.querySelector("#btn-new");
const btnRequest = document.querySelector("#btn-request");
const btnStop = document.querySelector("#btn-stop");
const pointsHTML = document.querySelectorAll("small");
const divPlayerCards = document.querySelector("#player-cards");
const divComputerCards = document.querySelector("#computer-cards");
const imgAll = document.querySelectorAll('#cards');  


// Function to create a complete deck:
const createDeck = () => {
  // Shuffling numbers
  for (let i = 2; i <= 10; i++) {
    for (const type of types) {
      deck.push(i + type);
    }
  }
  // Shuffling symbols
  for (const symbol of symbols) {
    for (const type of types) {
      deck.push(symbol + type);
    }
  }
  // console.log(deck);

  // Shuffling the cards
  deck = _.shuffle(deck);

  // console.log(deck);
};

createDeck();

// Order Card
const orderCard = () => {
  // validation
  if (deck.length === 0) {
    // STOP a program a show a console error
    throw "There are not cards in the deck";
  }

  // Select a Card and Eliminate card of the deck
  const card = deck.pop();

  //show new deck
  // console.log(deck);

  // print card
  // console.log(card);
  return card;
};

// deck = [];
orderCard();

// module.exports = {
//     createDeck
// }

// const cardValue = ( card ) =>{

//     //const value = card[0]; //This get the first letter (index 0). Because in Js all thins are objects. console.log({value});

//     //Return a String with a start and end (not includes) that I can define
//     const value = card.substring(0, card.length - 1);
//     let points = 0;

//     if (isNaN(value)) {
//       points = (value === 'A')? 11 : 10;
//     }else{
//       points = value * 1;
//     }

//     console.log(points);
// }

const cardValue = (card) => {
  //Todos los Strings pueden ser trabajados como Arreglos.
  // SUBSTRING: regresa un string cortado en base a l inicio y el final que yo le diga
  const value = card.substring(0, card.length - 1);
  // return points = (isNaN(value))? ((value === 'A')? 11 : 10) : points = value * 1;
  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
};

// const valueFinal = cardValue(orderCard());
// console.log(valueFinal);

//Events

//Computer shift

const computerShift = ( minimumPoints ) => {
  
  do {
    const card = orderCard();
    pointsComputer = pointsComputer + cardValue(card); 
    pointsHTML[1].innerText = pointsComputer;
  
    const imgCard = document.createElement("img");
    imgCard.src = `assets/cartas/${card}.png`;
    imgCard.classList.add("cards");
    divComputerCards.append(imgCard);

    if ( minimumPoints > 21 ) {
      break; 
    }

  } while ( (minimumPoints > pointsComputer) && (minimumPoints <= 21));

  setTimeout(() => {
    if ( (minimumPoints === pointsComputer))  {
      alert ('Tie. No one wins')
    } else if ((minimumPoints > 21)) {
      alert('Computer wins'); 
    } else if ((21 < pointsComputer)) {
      alert('You win'); 
    } else {
      alert('computer wins')
    }
  }, 100)
}

btnRequest.addEventListener("click", () => {
  const card = orderCard();
  // console.log({ card });

  pointsPlayer = pointsPlayer + cardValue(card);
  // console.log({ pointsPlayer });

  pointsHTML[0].innerText = pointsPlayer;

  //Aparecer las cartas
  // <img class="cards" src="./assets/cartas/3C.png">
  const imgCard = document.createElement("img");
  imgCard.src = `assets/cartas/${card}.png`;
  imgCard.classList.add("cards");
  divPlayerCards.append(imgCard);

  //Control count of cards. When the played has loss.
  if (pointsPlayer > 21) {
      
      console.warn('You loss!')
      btnRequest.disabled = true;
      btnStop.disabled = true;
      computerShift(pointsPlayer)

  } else if (pointsPlayer === 21){
    
    console.warn('21. Great!')
    btnStop.disabled = true;
    btnRequest.disabled = true;
    btnNew.disabled = false;
    computerShift(pointsPlayer)
  
  }
});

btnStop.addEventListener('click', ()=>{
  btnStop.disabled = true;
  btnRequest.disabled = true;
  btnNew.disabled = false;
  computerShift(pointsPlayer); 
})

btnNew.addEventListener('click', () => {

  //vaciar deck
  deck = []
  // //Recreate Deck: 
  createDeck();

  // deck = createDeck(); 

  //Borrar puntajes 
  pointsHTML[0].innerText = 0;
  pointsHTML[1].innerText = 0;
  pointsPlayer = 0
  pointsComputer = 0
  
  //Borrar cartas
  divPlayerCards.innerText = ''; 
  divComputerCards.innerText = '';

  //habilitar nuevamente los botones
  btnStop.disabled = false;
  btnRequest.disabled = false;
  btnNew.disabled = true;
})