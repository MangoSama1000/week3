// DOM Elements
const scoreElement = document.getElementById('score');
const cookieElement = document.getElementById('cookie');
const upgradesList = document.getElementById('upgrades-list');

// Game State
let score = parseInt(localStorage.getItem('cookieScore')) || 0;
let cookiesPerClick = parseInt(localStorage.getItem('cookiesPerClick')) || 1;
let autoClickerInterval;
let upgrades = [];

// Update Score in DOM
function updateScore() {
    scoreElement.textContent = score;
}

// Increment Score when Cookie is Clicked
function incrementScore() {
    score += cookiesPerClick;
    updateScore();
    saveGameState();
}

// Fetch Upgrades from API
async function fetchUpgrades() {
    try {
        const response = await fetch('https://api.example.com/upgrades'); // Replace with your actual API endpoint
        const data = await response.json();
        upgrades = data;
        displayUpgrades();
    } catch (error) {
        console.error('Failed to fetch upgrades:', error);
    }
}

// Display Available Upgrades
function displayUpgrades() {
    upgradesList.innerHTML = '';
    upgrades.forEach(upgrade => {
        const upgradeElement = document.createElement('li');
        upgradeElement.textContent = `${upgrade.name} - Cost: ${upgrade.cost} Cookies`;
        upgradeElement.addEventListener('click', () => purchaseUpgrade(upgrade));
        upgradesList.appendChild(upgradeElement);
    });
}

// Purchase Upgrade
function purchaseUpgrade(upgrade) {
    if (score >= upgrade.cost) {
        score -= upgrade.cost;
        if (upgrade.multiplier) {
            cookiesPerClick *= upgrade.multiplier;
        }
        if (upgrade.autoClick) {
            startAutoClicker(upgrade.autoClick);
        }
        updateScore();
        saveGameState();
    } else {
        alert('Not enough cookies!');
    }
}

// Start Auto Clicker
function startAutoClicker(clicksPerSecond) {
    clearInterval(autoClickerInterval);
    autoClickerInterval = setInterval(() => {
        score += clicksPerSecond;
        updateScore();
        saveGameState();
    }, 1000);
}

// Save Game State to Local Storage
function saveGameState() {
    localStorage.setItem('cookieScore', score);
    localStorage.setItem('cookiesPerClick', cookiesPerClick);
}

// Restore Game State from Local Storage
function restoreGameState() {
    score = parseInt(localStorage.getItem('cookieScore')) || 0;
    cookiesPerClick = parseInt(localStorage.getItem('cookiesPerClick')) || 1;
    updateScore();
}

// Initialize Game
function initializeGame() {
    restoreGameState();
    fetchUpgrades();
    setInterval(() => {
        saveGameState();
    }, 1000);
}

// Event Listener for Cookie Click
cookieElement.addEventListener('click', incrementScore);

// Start the Game
initializeGame();