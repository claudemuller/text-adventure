'use strict';

const startLocation = 4,
  output = document.querySelector('#output'),
  input = document.querySelector('#input'),
  button = document.querySelector('button'),
  image = document.querySelector('img'),
  actionsIKnow = ['north', 'east', 'south', 'west', 'take', 'use', 'drop'],
  items = ['flute', 'stone', 'sword'],
  itemLocations = [1, 6, 8],
  itemsIKnow = ['flute', 'stone', 'sword'],
  backpack = [];

let map = [],
  images = [],
  blockedPathMessages = [],
  playerInput = '',
  gameMessage = '',
  action = '',
  mapLocation = startLocation,
  item = '';

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

  for (let i = 0; i < itemsIKnow.length; i++) {
    if (playerInput.indexOf(itemsIKnow[i]) !== -1) {
      item = itemsIKnow[i];
      console.log(`Player's item: ${item}`);
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
    case 'take':
      takeItem();
      break;
    case 'drop':
      dropItem();
      break;
    case 'use':
      useItem();
      break;
    default:
      gameMessage = `I don't understand that.`;
      break;
  }

  render();
}

function takeItem() {
  // Find the index number of the item in the items array
  const itemIndexNumber = items.indexOf(item);

  // Does the item exist in the game world and is it at the player's current location?
  if (itemIndexNumber !== -1 && itemLocations[itemIndexNumber] === mapLocation) {
    gameMessage = `You take the ${item}.`;

    // Add the item to the player's backpack
    backpack.push(item);

    // Remove the item from the game world
    items.splice(itemIndexNumber, 1);
    itemLocations.splice(itemIndexNumber, 1);
  } else {
    gameMessage = `You can't do that.`;
  }
}

function dropItem() {
  // Try to drop the item only if the backpack isn't empty
  if (backpack.length !== 0) {
    // Find the item's array index number in the backpack
    const backpackIndexNumber = backpack.indexOf(item);

    // The item is in the backpack if backpackIndex number isn't -1
    if (backpackIndexNumber !== -1) {
      // Tell the player that the item has been dropped
      gameMessage = `You drop the ${item}.`;

      // Add the item from the backpack to the game world
      items.push(backpack[backpackIndexNumber]);
      itemLocations.push(mapLocation);

      // Remove the item from the player's backpack
      backpack.splice(backpackIndexNumber, 1);
    } else {
      gameMessage = `You can't do that.`;
    }
  } else {
    gameMessage = `You're not carrying anything.`;
  }
}

function useItem() {
  // Find out if the item is in the backpack
  const backpackIndexNumber = backpack.indexOf(item);

  // Tell the player whether or not they are carrying it
  if (backpackIndexNumber === -1) gameMessage = `You're not carrying it.`;

  // If there are no items in the backpack, tell the player
  if (backpack.length === 0) gameMessage += ' Your backpack is empty';

  // If the item is found in the backpack
  if (backpackIndexNumber !== -1) {
    switch (item) {
      case 'flute':
        gameMessage = 'Beautiful music fills the air.';
        break;
      case 'sword':
        if (mapLocation === 3) gameMessage = 'You swing the sword and slay the dragon!';
        else gameMessage = 'You swing the sword listlessly.';
        break;
      case 'stone':
        if (mapLocation === 1) {
          gameMessage = 'You drop the stone in the well.';
          backpack.splice(backpackIndexNumber, 1);
        } else {
          gameMessage = 'You fumble with the stone in your pocket.';
        }
        break;
    }
  }
}

function render() {
  // Render location
  output.innerHTML = map[mapLocation];
  image.src = `assets/${images[mapLocation]}`;

  // Display an item if there's one in the location
  for (let i = 0; i < items.length; i++) {
    if (mapLocation === itemLocations[i]) output.innerHTML += `<br>You see a <strong>${items[i]}</strong> here.`;
  }

  // Display game message
  output.innerHTML += `<br><em>${gameMessage}</em>`;

  // Display the player's backpack contents
  if (backpack.length !== 0) output.innerHTML += `<br>You are carrying: ${backpack.join(', ')}`;
}
