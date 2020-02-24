/* MEMORY GAME */

// SELECTORS 
const cards = document.querySelector("ul.deck"); // select the cards list
const restart = document.getElementById("shuffle"); //select the restart icon
const stars = document.querySelector(".stars-container");// select the stars container
const counterB = document.getElementById("moves"); // select Moves counter
const clock = document.getElementById("time"); // Select the clock
const scoreContainer = document.querySelector(".your-score"); // Select the score container


// FUNCTION  - LIST RANOMIZER
function randomizer() {
    for (let i = cards.children.length; i >= 0; i--) {
        cards.appendChild(cards.children[Math.random() * i | 0]);
    }
}

// CALL RANDOMIZER WHEN WINDOW OPENS
window.onload = randomizer();

// EVENT LISTENER: CALL RANDOMIZER - RESET COUNTER - CLOSE ALL CARDS
restart.addEventListener("click", function (e) {
    e.preventDefault();

    randomizer(); // Shuffling cards
    // Resetting the counter - I have to do both
    counterB.innerHTML = 0;
    count = 0;

    clearDeck(); // Close all cards
    cardArray = []; // Clear Array
    successArray = [];
    zero();
    cards.addEventListener("click", tiktok, true); // Removed at function: compare
    allStars();
})

// RESET THE STARS BLOCK
const starsReset =
    `
    <ul class="stars">
        <li>
            <i class="fa fa-star"></i>
        </li>
        <li>
            <i class="fa fa-star"></i>
        </li>
        <li>
            <i class="fa fa-star"></i>
        </li>
    </ul>
    `;

function allStars() {
    stars.innerHTML = starsReset;
}

// LISTENER: MOVES COUNTER - TIMER
cards.addEventListener("click", compare); //Cards are compared 
cards.addEventListener("click", tiktok, true); // Start timer when card clicked

// FUNTION: RESET CARDS
function clearDeck() {

    const visibleCards = document.querySelectorAll(".show", ".match"); // select all the cards shown
    //.. and close them all
    visibleCards.forEach(function (e) {
        e.classList.remove("open", "show", "match");
    });
}

// FUNCTION - COMPARE THE CARDS
let cardArray = []; //Empty Array for selected cards
let successArray = []; //All open cards
let success = 0; // Initializing counter for successful hits

function compare(e) {

    if (e.target.nodeName === "LI") { // If a list element is hit...

        cardArray.push(e.target); //Place current card into array...
        let total = cardArray.length;
        cards.removeEventListener("click", tiktok, true); // Don't start timer again

        if (total < 2) {
            showCard(e); //show a card
        }

        if (total === 2) { // ...When 2 cards selected...

            showCard(e); //show a card again
            cards.removeEventListener("click", showCard); // Show is disabled
            counter(); //Start counting moves

            if (cardArray[0].classList.value === cardArray[1].classList.value) { // ...compare the 2 cards...

                match(e);
                success +=1 ; // Increment successfull hits counter
                console.log(success);
            }

            else {
                setTimeout(close, 600); // if no match close them
                console.log("miss!!!");
            }
        }

        if (success === 8) {
            console.log("You got it!!!");
            openModal();
            pause();
            success = 0; // zero counter
        }
    }
}

// FUNCTION - SHOW CARD
function showCard(e) {
    e.preventDefault();
    e.stopPropagation();

    e.target.classList.add("open"); // change card color
    e.target.classList.add("show"); // display the image
}

// FUNCTION - CLOSE CARD
function close(e) {
    cardArray[0].classList.remove('open');
    cardArray[0].classList.remove('show');
    cardArray[1].classList.remove('open');
    cardArray[1].classList.remove('show');
    cardArray = [];
    cards.addEventListener("click", showCard);
}

// FUNCTION - MATCHED CARDS BEHAVIOR
function match(e) {
    cardArray[0].classList.add("match");
    cardArray[1].classList.add("match");
    cardArray = [];
}

//FUNCTION - MOVES COUNTER -STAR RATING
let count = 0; // Initialize the counter

function counter(e) {

    count += 1;
    counterB.innerHTML = count;

    let collectMoves = document.getElementById("moves").innerHTML; //Collect Value

    //Star Rating Conditions
    if (collectMoves == 10) {
        //remove first star
        document.querySelector(".fa-star:last-of-type").classList.remove("fa-star");
    }

    else if (collectMoves == 16) {
        document.querySelector(".fa-star:last-of-type").classList.remove("fa-star");
    }
    
}

// TIMER SET:
// The Vars:
let seconds = 0;
let int; // Stores the interval to be accesed globally

//FUNCTION - INCREMENT SEC - ADD TO BOARD
function run() {
    seconds++; // seconds are incremented
    clock.innerHTML = seconds + "sec"; //pass seconds to the html
}

//FUNCTION - INCREMENT SEC - ADD TO BOARD
function tiktok() {
    int = setInterval(run, 1000); // configure interval
}

//FUNCTION - PAUSE
function pause() {
    clearInterval(int);
}

//FUNCTION - RESET
function zero() {
    clearInterval(int);
    clock.innerHTML = 0;
    seconds = 0;
}

//MODAL FUNCTIONALITY
const modal = document.getElementById("my-modal"); // Select the modal
const btn = document.getElementById("myBtn"); // Select the button
const span = document.getElementsByClassName("close")[0]; // Select the X

// FUNCTION - OPEN THE MODAL
function openModal() {
    modal.style.display = "block";
    passTheScore();
}

// Close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
};

// PASSING SCORE INTO MODAL
function passTheScore() {
    const score =
        `
    <p>Your Rank: ${stars.innerHTML}</p>
    <p>Number of Moves: ${counterB.innerHTML}</p>
    <p>Your Time: ${clock.innerHTML}</p>
    `;
    scoreContainer.innerHTML = score;
}

/*
const cardsAncientGreece = [
    { card: 1,
        img: "images/labrys.svg"
    },
    { card: 2,
        img: "images/laurel.svg"
    },
    { card: 3,
        img: "images/lyre.svg"
    },
    { card: 4,
        img: "images/parthenon.svg"
    },
    { card: 5,
        img: "images/shield.svg"
    },
    {card: 6,
        img: "images/theatre.svg"
    },
    {card: 7,
        img: "images/trireme.svg"
    },
    {card: 8,
        img: "images/helmet.svg"
    }
]
*/