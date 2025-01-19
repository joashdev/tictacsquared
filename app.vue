<template>
  <div class="w-dvw min-h-screen flex flex-col md:flex-row bg-slate-200 font-poppins">
    <div class="statsContainer w-full md:w-1/3 p-1">
      <div class="w-full h-full">
        (tictac^2)
      </div>

    </div>
    <div class="gameContainer w-full md:w-2/3 h-full m-auto">
      <div class="w-1/2 md:w-4/5 m-auto grid grid-cols-3 gap-4 p-1 relative">
        <div v-if="winnerState !== null" class="absolute text-center items- w-full h-full bg-white z-10 opacity-70">
          <div class="flex flex-col items-center justify-center w-full h-full">
            Winner Player {{playerState}}
            <button @click="resetGame">Restart</button>
            <button @click="continueGame">Continue</button>
          </div>
        </div>
        <div v-for="(item, index) in gridState" class="relative grid grid-cols-3 grid-flow-row gap-1 bg-white">
            <div v-if="activeGridState !== null && index !== activeGridState" class="absolute text-center w-full h-full bg-white opacity-20">{{index}}</div>
            <div class="w-full h-full aspect-square" v-for="(value, valueIndex) in item">
              <button class="w-full h-full text-4xl" :class="value === 'X' ? 'bg-blue-500' : value === 'O' ? 'bg-green-500' : 'bg-slate-500'" @click="setTile(index, valueIndex)">
                {{value !== "_" ? value : ""}}
              </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const gridState = useState('gridState', () =>
    [
      ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
      ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
      ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
      ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
      ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
      ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
      ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
      ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
      ["_", "_", "_", "_", "_", "_", "_", "_", "_"]
    ]
);
const activeGridState = useState('activeGridState', () => null)
const playerState = useState('playerState', () => 'X')
const winnerState = useState('winnerState', () => null);
const setTile = (index, valueIndex) => {
  gridState.value[index][valueIndex] = playerState.value;
  if (checkWinner(index)) {
    winnerState.value = playerState.value;
  } else {
    playerState.value = playerState.value === 'X' ? 'O' : 'X' ;
    activeGridState.value = valueIndex;
  }
}

const checkWinner = (index) => {
  const possibleWins = [
      [0,1,2],[3,4,5],[6,7,8], // horizontals
      [0,3,6],[1,4,7],[2,5,8], // verticals
      [1,4,8],[2,4,6] // diagonals
  ]
  const currGrid = gridState.value[index]
  const combos = possibleWins.map((combo) => {
    return (new Set([currGrid[combo[0]], currGrid[combo[1]], currGrid[combo[2]]])).size === 1 && currGrid[combo[0]] !== "_";
  } );
  return combos.includes(true);
}

const resetGame = () => {
  playerState.value = 'X';
  activeGridState.value =  null;
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
const continueGame = () => {}
</script>
