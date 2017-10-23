'use strict';

const startLocation = 4,
  output = document.querySelector('#output'),
  input = document.querySelector('#input'),
  button = document.querySelector('button'),
  image = document.querySelector('img'),
  actionsIKnow = ['north', 'east', 'south', 'west'];

let map = [],
  images = [],
  blockedPathMessages = [],
  playerInput = '',
  gameMessage = '',
  action = '',
  mapLocation = startLocation;

// Create the map
map = createMap();

// Create images
images = createImages();

// Create blocked path messages
blockedPathMessages = createBlockedPathMessages();

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
      if (mapLocation >= 3) mapLocation -= 3;
      else gameMessage = blockedPathMessages[mapLocation];
      break;
    case 'east':
      if (mapLocation % 3 !== 2) mapLocation += 1;
      else gameMessage = blockedPathMessages[mapLocation];
      break;
    case 'south':
      if (mapLocation < 6) mapLocation += 3;
      else gameMessage = blockedPathMessages[mapLocation];
      break;
    case 'west':
      if (mapLocation % 3 !== 0) mapLocation -= 1;
      else gameMessage = blockedPathMessages[mapLocation];
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
  image.src = `assets/${images[mapLocation]}`;

  // Display message
  output.innerHTML += `<br><em>${gameMessage}</em>`;
}
