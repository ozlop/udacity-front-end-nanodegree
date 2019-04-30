/*
 * Create a list that holds all of your cards
 */
const cardList = [
    {"imageClass": "fa fa-diamond"},
    {"imageClass": "fa fa-paper-plane-o"},
    {"imageClass": "fa fa-anchor"},
    {"imageClass": "fa fa-bolt"},
    {"imageClass": "fa fa-cube"},
    {"imageClass": "fa fa-leaf"},
    {"imageClass": "fa fa-bicycle"},
    {"imageClass": "fa fa-bomb"}
];
const deckElement = document.querySelector('.deck');
let openCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

(function createDeck() {
    const fullDeckList = shuffle(cardList.concat(cardList));
    const deckFragment = document.createDocumentFragment();

    function createCardElement(card) {
        const cardElement = document.createElement('li');
        const imageElement = document.createElement('i');

        cardElement.setAttribute('class', 'card');
        imageElement.setAttribute('class', card['imageClass']);

        cardElement.appendChild(imageElement);

        return cardElement
    }

    for (let card of fullDeckList) {
        const cardElement = createCardElement(card);

        deckFragment.appendChild(cardElement)
    }

    deckElement.appendChild(deckFragment);
})(deckElement);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function displayCardSymbol(card) {
    card.setAttribute('class', 'card open show');
}

function trackOpenCard(card) {
    openCards.push(card);
}

function resetCards() {
    for (let card of openCards) {
        card.setAttribute('class', 'card');
    }
}

function setMatch() {
    for (let card of openCards) {
        card.setAttribute('class', 'card match');
    }
}

function addMove() {
    const moveElement = document.querySelector('.moves');
    let moveCount = Number(moveElement.textContent);

    moveElement.textContent = (moveCount + 1);
}

function checkMatch() {
    let firstCardSymbol = openCards[0].firstElementChild.getAttribute('class');
    let secondCardSymbol = openCards[1].firstElementChild.getAttribute('class');

    if (firstCardSymbol === secondCardSymbol) {
        setMatch();
    } else {
        resetCards();
    }

    openCards = [];
}

// event creator
function clickEvent(node, type, callback) {
    // create event
    node.addEventListener(type, function(e) {
        // remove event
        node.removeEventListener(e.type, arguments.callee);

        // call handler
        return callback(e);
    })
}

function endGame(){
    alert('won');
}

function checkGameStatus() {
    const matchedCards = document.getElementsByClassName('card match');

    if (matchedCards.length === 16) {
        endGame();
    }
}

function flipCard() {
    const card = event.target;

    if (card.getAttribute('class') === 'card') {
        displayCardSymbol(card);
        trackOpenCard(card);

        if (openCards.length === 2) {
            setTimeout(checkMatch, 800);
        }
    }
    addMove();
    setTimeout( () => {clickEvent(deckElement, 'click', flipCard);}, 800);
    setTimeout( () => {clickEvent(deckElement, 'click', checkGameStatus());}, 800);
}

(function runGame(){
    // Initial click event handler
    clickEvent(deckElement, 'click', flipCard);
    clickEvent(deckElement, 'click', checkGameStatus);
})();

