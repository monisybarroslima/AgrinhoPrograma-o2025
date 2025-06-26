  function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let cards = [];

let flipped = [];

let cardSize = 100;

let cols = 4;

let rows = 4;

let totalCards = cols * rows;

let cardValues = [];

let matchedCount = 0;

// Emojis ou nomes com tema Campo vs Cidade

let icons = [

  "🚜", // trator - campo

  "🌾", // planta - campo

  "🐄", // vaca - campo

  "🌻", // girassol - campo

  "🏙️", // cidade

  "🚗", // carro - cidade

  "🏢", // prédio - cidade

  "🚌"  // ônibus - cidade

];

function setup() {

  createCanvas(cols * cardSize, rows * cardSize).parent("game-container");

  initializeCards();

  textFont('Arial');

}

function draw() {

  background(255);

  for (let i = 0; i < cards.length; i++) {

    cards[i].show();

  }

  if (flipped.length === 2) {

    setTimeout(checkMatch, 700);

  }

}

function mousePressed() {

  for (let card of cards) {

    if (card.contains(mouseX, mouseY) && !card.flipped && !card.matched) {

      if (flipped.length < 2) {

        card.flipped = true;

        flipped.push(card);

      }

    }

  }

}

function initializeCards() {

  cardValues = [];

  for (let i = 0; i < icons.length; i++) {

    cardValues.push(icons[i]);

    cardValues.push(icons[i]);

  }

  shuffle(cardValues, true);

  cards = [];

  let index = 0;

  for (let y = 0; y < rows; y++) {

    for (let x = 0; x < cols; x++) {

      let val = cardValues[index];

      cards.push(new Card(x * cardSize, y * cardSize, cardSize, val));

      index++;

    }

  }

}

function checkMatch() {

  if (flipped.length === 2) {

    if (flipped[0].value === flipped[1].value) {

      flipped[0].matched = true;

      flipped[1].matched = true;

      matchedCount += 2;

    } else {

      flipped[0].flipped = false;

      flipped[1].flipped = false;

    }

    flipped = [];

    if (matchedCount === totalCards) {

      setTimeout(() => {

        alert("Você completou todos os pares! 🌻🏙️");

        resetGame();

      }, 500);

    }

  }

}

function resetGame() {

  matchedCount = 0;

  flipped = [];

  initializeCards();

}

class Card {

  constructor(x, y, size, value) {

    this.x = x;

    this.y = y;

    this.size = size;

    this.value = value;

    this.flipped = false;

    this.matched = false;

  }

  contains(px, py) {

    return (

      px > this.x &&

      px < this.x + this.size &&

      py > this.y &&

      py < this.y + this.size

    );

  }

  show() {

    stroke(0);

    fill(this.flipped || this.matched ? '#fff' : '#bbb');

    rect(this.x, this.y, this.size, this.size, 10);

    if (this.flipped || this.matched) {

      fill(0);

      textAlign(CENTER, CENTER);

      textSize(32);

      text(this.value, this.x + this.size / 2, this.y + this.size / 2);

    }

  }

}