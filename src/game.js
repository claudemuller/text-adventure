'use strict';

const startLocation = 4,
  output = document.querySelector('#output'),
  input = document.querySelector('#input'),
  button = document.querySelector('button'),
  actionsIKnow = ['north', 'east', 'south', 'west'];

let map = [],
  playerInput = '',
  gameMessage = '',
  action = '',
  mapLocation = startLocation;

// Create the map
map.push('An old stone keep.');
map.push('A deep well.');
map.push('A sunny glade');
map.push('A sleeping dragon.');
map.push('A narrow pathway.');
map.push('An ancient gate.');
map.push('The edge of a river.');
map.push('A lonely wooden bench.');
map.push('An isolated cottage. Faint music comes from inside.');

// Display the player's location
output.innerHTML = map[mapLocation];

// The button
button.style.cursor = 'pointer';
button.addEventListener('click', clickHandler, false);

render();

function clickHandler() {
  playGame();
}

function playGame() {
  // Get player input
  playerInput = input.value.toLowerCase();

  // Reset vars from previous turn
  gameMessage = '';
  action = '';

  // Work out player action
  for (let i = 0; i < actionsIKnow.length; i++) {
    if (playerInput.indexOf(actionsIKnow[i]) !== -1) {
      action = actionsIKnow[i];
      console.log(`Player's action: ${action}`);
      break;
    }
  }

  // Choose the correct action
  switch (action) {
    case 'north':
      mapLocation -= 3;
      break;
    case 'east':
      mapLocation += 1;
      break;
    case 'south':
      mapLocation += 3;
      break;
    case 'west':
      mapLocation -= 1;
      break;
    default:
      gameMessage = `I don't understand that.`;
      break;
  }

  render();
}

function render() {
  // Render location
  output.innerHTML = map[mapLocation];

  // Display message
  output.innerHTML += `<br><em>${gameMessage}</em>`;
}
