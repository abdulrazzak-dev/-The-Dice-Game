// Base URL for dice face images (1.png ... 6.png)
const DICE_IMG_BASE = "https://raw.githubusercontent.com/tewarig/Dice_IMG/main/";

// Grab DOM elements
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const resultEl = document.getElementById("result");
const rollBtn = document.getElementById("rollBtn");

// Generate a random number between 1 and 6
function getRandomDiceNumber() {
  return Math.floor(Math.random() * 6) + 1;
}

// Update an image element to show a given dice face number
function setDiceImage(imgEl, number) {
  imgEl.src = `${DICE_IMG_BASE}${number}.png`;
}

// Determine and display the winner based on the two rolled values
function showResult(value1, value2) {
  resultEl.classList.remove("win", "lose", "tie");

  if (value1 > value2) {
    resultEl.textContent = `Player 1 Wins! (${value1} vs ${value2})`;
    resultEl.classList.add("win");
  } else if (value2 > value1) {
    resultEl.textContent = `Player 2 Wins! (${value2} vs ${value1})`;
    resultEl.classList.add("lose");
  } else {
    resultEl.textContent = `It's a Tie! (${value1} vs ${value2})`;
    resultEl.classList.add("tie");
  }
}

// Handle the dice roll: animate, then reveal final results
function rollDice() {
  rollBtn.disabled = true;
  resultEl.textContent = "Rolling...";
  resultEl.classList.remove("win", "lose", "tie");

  img1.classList.add("rolling");
  img2.classList.add("rolling");

  // Quickly cycle through random faces to simulate a "rolling" effect
  let cycles = 0;
  const maxCycles = 10;
  const interval = setInterval(() => {
    setDiceImage(img1, getRandomDiceNumber());
    setDiceImage(img2, getRandomDiceNumber());
    cycles++;

    if (cycles >= maxCycles) {
      clearInterval(interval);

      // Final results
      const finalValue1 = getRandomDiceNumber();
      const finalValue2 = getRandomDiceNumber();

      setDiceImage(img1, finalValue1);
      setDiceImage(img2, finalValue2);

      img1.classList.remove("rolling");
      img2.classList.remove("rolling");

      showResult(finalValue1, finalValue2);
      rollBtn.disabled = false;
    }
  }, 100);
}

// Wire up the roll button
rollBtn.addEventListener("click", rollDice);
