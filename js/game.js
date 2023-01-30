
//Funciones anónimas autoinvocadas: crean un nuevo Scope, no tienen referencia por nommbre. No serán llamadas directamente. 
// Esto es un modulo
(()=>{
  'use strict'

            /**
           * C = Clubs (Tréboles)
           * H = Heart
           * D = Diamonds
           * S = Spades
           */

          let deck      = [];
          const types   = ["C", "H", "D", "S"], 
                symbols = ["A", "J", "Q", "K"];
                
          let pointsPlayer = []; //['player1', 'player2', 'pc'] 
          let pointsComputer; 


          //Elements from HTML
          const btnNew = document.querySelector("#btn-new"),
            btnRequest = document.querySelector("#btn-request"),
               btnStop = document.querySelector("#btn-stop");

          const pointsHTML = document.querySelectorAll("small");
          
          const divPlayerCards = document.querySelector("#player-cards"),
              divComputerCards = document.querySelector("#computer-cards");
          
          const imgAll = document.querySelectorAll('#cards');  

          
          const startGame = ( numPlayers = 2) => {

            deck = createDeck();

            for (let i = 0; i < numPlayers.length; i++) {
                  pointsPlayer.push(0)
            }

            console.log({pointsPlayer});
          }

          // Function to create a complete deck:
          const createDeck = () => {
                deck = []; 
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
                // Shuffling the cards
                return deck = _.shuffle(deck);
          };


          // Order Card
          const orderCard = () => {
              // validation
              if (deck.length === 0) {
                // STOP a program and show a console error
                throw "There are not cards in the deck";
              }
              // Select a Card and Eliminate card of the deck
              return deck.pop();
          };

          //Get value of the card
          const cardValue = (card) => {
            //Todos los Strings pueden ser trabajados como Arreglos.
            // SUBSTRING: regresa un string cortado en base a l inicio y el final que yo le diga
            const value = card.substring(0, card.length - 1);

            return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
          };


          //Events

          //collect points players
          const collectPoints = () => {

          }

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

            pointsPlayer = pointsPlayer + cardValue(card);

            pointsHTML[0].innerText = pointsPlayer;

            //show cards in HTML document
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
                btnNew.disabled = false;
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
            
            startGame(); 
            // //vaciar deck
            // deck = []
            
            // //Recreate Deck: 
            // createDeck();

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



})(); 

