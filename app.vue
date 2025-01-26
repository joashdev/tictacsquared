<template>
  <div class="w-screen h-screen min-h-screen text-white flex flex-col lg:flex-row font-tw">
    <div class="statsContainer aspect-square grid grid-cols-2 grid-rows-5 gap-1 w-full h-1/3 lg:h-4/5 lg:w-1/3 p-2 lg:py-5 lg:pl-5">
      <div class="col-span-2 row-span-3 bg-white/10 rounded-lg border-4 border-white flex items-center justify-center text-center">
        <h1 class="text-4xl font-extrabold tracking-wide">
          (<span class="text-teal-300">tictac</span>)<sup class="text-orange-400">2</sup>
        </h1>
      </div>
      <div class="self-center text-center md:text-2xl">
        player X: &hairsp; {{ gameState.X }}
      </div>
      <div class="self-center text-center md:text-2xl text-orange-400">
        <button @click="howToPlay()">How to Play?</button>
      </div>
      <div class="self-center text-center md:text-2xl">
        player O: &hairsp; {{ gameState.O }}
      </div>
      <div class="self-center text-center md:text-2xl text-orange-400">
        <button @click="setGame">Reset Game</button>
      </div>
      <div class="col-span-2 self-center text-center">
        round {{ gameState.round }}:  &hairsp;
        <span class="font-bold" :class="gameState.currentPlayer === 'X' ? 'text-teal-300' : 'text-orange-400'">
           PLAYER {{gameState.currentPlayer}}
        </span>
        to move.
      </div>

    </div>
    <div class="gameContainer p-2 lg:p-5 w-full lg:w-2/3 h-2/3 lg:h-full lg:m-auto">
      <div class="w-full md:w-4/5 m-auto grid grid-cols-3 gap-2 md:gap-4 relative">
        <div v-for="(item, index) in gridState"
             class="relative grid grid-cols-3 grid-flow-row gap-0.5 md:gap-1 ">
          <div v-if="activeGridState !== null && index !== activeGridState"
               class="absolute text-center w-full h-full bg-white opacity-40">
          </div>
          <div class="w-full h-full aspect-square" v-for="(value, valueIndex) in item">
            <button :disabled="value !== '_'" class="w-full h-full text-2xl font-black md:text-4xl"
                    :class="value === 'X' ? 'bg-teal-300' : value === 'O' ? 'bg-orange-400' : 'bg-white/20'"
                    @click="setTile(index, valueIndex)">
              {{ value !== "_" ? value : "" }}
            </button>
          </div>
        </div>
        <div v-if="winnerState !== null" class="absolute text-center w-full h-full bg-white z-10 opacity-90">
          <div class="flex flex-col items-center justify-center w-full h-full">
            <h3 class="text-4xl lg:text-6xl text-black font-bold mb-2"> Winner Player {{ winnerState }} </h3>
            <button class="w-1/2 md:w-1/3 p-2 text-lg md:text-xl text-black rounded m-2 bg-orange-400" @click="resetBoard">clear board</button>
            <button class="w-1/2 md:w-1/3 p-2 text-lg md:text-xl text-black rounded bg-orange-400" @click="continueGame">continue</button>
          </div>
        </div>
        <div v-if="gameOverState" class="absolute text-center w-full h-full bg-white z-10">
          <div class="flex flex-col items-center justify-center w-full h-full">
            <h3 class="text-2xl lg:text-6xl text-black font-bold mb-2"> Game Over. </h3>
            <h3 v-if="winnerState !== null" class="text-4xl lg:text-6xl text-black font-bold mb-2"> Winner Player {{ winnerState }}!</h3>
            <h3 v-else class="text-4xl lg:text-6xl text-black font-bold mb-2"> Tied!</h3>
            <button class="w-1/2 md:w-1/3 p-2 text-lg md:text-xl text-black rounded m-2 bg-orange-400" @click="resetBoard">clear board</button>
            <button class="w-1/2 md:w-1/3 p-2 text-lg md:text-xl text-black rounded bg-orange-400" @click="setGame">reset scores</button>
          </div>
        </div>
        <div v-if="aboutState" class="absolute text-center w-full h-full bg-white z-20">
          <div class="absolute right-2 top-2 lg:right-5 lg:top-5">
            <button @click="howToPlay" class="underline text-black bg-orange-400 p-2">X close</button>
          </div>
          <div class="flex flex-col items-center justify-center w-full h-full text-black m-2">
            <h3 class="text-2xl font-bold mb-2"> How to Play? </h3>
            <ul class="list-disc text-sm text-left md:text-base mx-8 md:mx-16 lg:mb-32">
              <li>
                First player to choose any bigger block. Select any smaller cell within that block and that ends your turn.
              </li>
              <li>
                Second player MUST play in the corresponding bigger block. You cannot make a move on other bigger blocks.
              </li>
              <li>
                If that block is full, the next player can choose any open cell.
              </li>
            </ul>
            <h3 class="text-2xl font-bold mt-2  mb-2">About</h3>
            <p>Developed By: &hairsp; joashdev</p>
            <a target="_blank" href="https://github.com/joashdev">Github: &hairsp; <span class="underline">joashdev</span></a>
            <a target="_blank" href="https://joash.dev">Website: &hairsp; <span class="underline">joash.dev</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "tictacsquared"
})
const gridState = useState('gridState', () => [
  ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_"]
]);
const gameState = useState('gameState', () => {
  return {
    'X': 0,
    'O': 0,
    'round': 1,
    'XWins': {},
    'OWins': {},
    'currentPlayer': 'X'
  }
});
const activeGridState = useState('activeGridState', () => null);
const winnerState = useState('winnerState', () => null);
const gameOverState = useState('gameOverState', () => null);
const aboutState = useState('aboutState', () => false);

// reset
const setGame = () => {
  gridState.value = [
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"]
  ];
  gameState.value = {
    'X': 0,
    'O': 0,
    'round': 1,
    'XWins': {},
    'OWins': {},
    'currentPlayer': 'X'
  };
  activeGridState.value = null;
  winnerState.value = null;
  gameOverState.value = null;
  aboutState.value = false;

}

const howToPlay = () => {aboutState.value = !aboutState.value;}

const setTile = (index, valueIndex) => {
  gridState.value[index][valueIndex] = gameState.value.currentPlayer;
  checkWinner(index, valueIndex);
  checkGameOver();
}

const checkWinner = (index, nextIndex) => {
  const possibleWins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontals
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // verticals
    [0, 4, 8], [2, 4, 6] // diagonals
  ]
  const currGrid = gridState.value[index];
  const currPlayer = gameState.value.currentPlayer;

  if (!gameState.value[`${currPlayer}Wins`].hasOwnProperty(index)) {
    gameState.value[`${currPlayer}Wins`][index] = [];
  }
  const combos = possibleWins.map((combo) => {
    if (gameState.value[`${currPlayer}Wins`][index].some(c => JSON.stringify(c) === JSON.stringify(combo))) {
      return false;
    }
    return (
            new Set(
                [currGrid[combo[0]], currGrid[combo[1]], currGrid[combo[2]]])).size === 1
        && currGrid[combo[0]] !== "_"
        && currGrid[combo[0]] === gameState.value.currentPlayer
  });

  const playerWon = combos.includes(true);
  if (playerWon) {
    gameState.value[`${currPlayer}Wins`][index].push(possibleWins[combos.indexOf(true)]);
    gameState.value[currPlayer] += 1;
    winnerState.value = currPlayer;
  } else {
    gameState.value.currentPlayer = gameState.value.currentPlayer === 'X' ? 'O' : 'X';
  }
  if (gridState.value[nextIndex].includes('_')) {
    activeGridState.value = nextIndex;
  } else {
    activeGridState.value = null;
  }
}

const checkGameOver = () => {
  gameOverState.value = !gridState.value.map(grid => grid.includes("_")).includes(true);
  if (gameOverState.value) {
    winnerState.value = gameState.value.X > gameState.value.O ? 'X' : gameState.value.O > gameState.value.X ? 'O' : null;
  }
}

const resetBoard = () => {
  gameState.value.currentPlayer = gameState.value.currentPlayer === 'X' ? 'O' : 'X';
  gameOverState.value = null;
  activeGridState.value = null;
  winnerState.value = null;
  gridState.value = [
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"]
  ];
}
const continueGame = () => {
  gameState.value.currentPlayer = gameState.value.currentPlayer === 'X' ? 'O' : 'X';
  winnerState.value = null;
  gameState.value.round += 1;
  gameOverState.value = null;
}
</script>

<style>
html {
  overflow-y: scroll;
  overflow-x: hidden !important;
  background-color: rgb(3 29 11 / 83%);
  background-image: url("/bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-blend-mode: overlay;
}
</style>
