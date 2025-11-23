// API Configuration
const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// State Management
let currentRecipes = [];
let favorites = loadFavorites();

// DOM Elements
const ingredientInput = document.getElementById('ingredientInput');
const searchBtn = document.getElementById('searchBtn');
const loading = document.getElementById('loading');
const recipesContainer = document.getElementById('recipesContainer');
const favoritesContainer = document.getElementById('favoritesContainer');
const recipesSection = document.getElementById('recipesSection');
const favoritesSection = document.getElementById('favoritesSection');
const tabButtons = document.querySelectorAll('.tab-btn');
const modal = document.getElementById('recipeModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    renderFavorites();
    registerServiceWorker();
});

// Event Listeners Setup
function setupEventListeners() {
    searchBtn.addEventListener('click', handleSearch);
    ingredientInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Tab Switching
function switchTab(tab) {
    tabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    if (tab === 'recipes') {
        recipesSection.style.display = 'block';
        favoritesSection.style.display = 'none';
    } else {
        recipesSection.style.display = 'none';
        favoritesSection.style.display = 'block';
        renderFavorites();
    }
}

// Search Handler
async function handleSearch() {
    const ingredients = ingredientInput.value.trim();
    
    if (!ingredients) {
        alert('Please enter at least one ingredient');
        return;
    }

    loading.style.display = 'block';
    recipesContainer.innerHTML = '';

    try {
        const recipes = await searchRecipesByIngredient(ingredients);
        currentRecipes = recipes;
        
        if (recipes.length === 0) {
            recipesContainer.innerHTML = `
                <div class="error-message">
                    <p>No recipes found for "${ingredients}". Try different ingredients!</p>
                </div>
            `;
        } else {
            renderRecipes(recipes, recipesContainer);
        }
    } catch (error) {
        console.error('Error searching recipes:', error);
        recipesContainer.innerHTML = `
            <div class="error-message">
                <p>Failed to fetch recipes. Please check your internet connection and try again.</p>
            </div>
        `;
    } finally {
        loading.style.display = 'none';
    }
}

// API Functions
async function searchRecipesByIngredient(ingredients) {
    const ingredientList = ingredients.split(',').map(i => i.trim().toLowerCase());
    const allRecipes = new Map();

    // Search for recipes by each ingredient
    for (const ingredient of ingredientList) {
        try {
            const response = await fetch(`${API_BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
            const data = await response.json();
            
            if (data.meals) {
                // Fetch full details for each recipe
                for (const meal of data.meals) {
                    if (!allRecipes.has(meal.idMeal)) {
                        const fullRecipe = await getRecipeDetails(meal.idMeal);
                        if (fullRecipe) {
                            allRecipes.set(meal.idMeal, fullRecipe);
                        }
                    }
                }
            }
        } catch (error) {
            console.error(`Error fetching recipes for ${ingredient}:`, error);
        }
    }

    return Array.from(allRecipes.values());
}

async function getRecipeDetails(mealId) {
    try {
        const response = await fetch(`${API_BASE_URL}/lookup.php?i=${mealId}`);
        const data = await response.json();
        
        if (data.meals && data.meals[0]) {
            return formatRecipe(data.meals[0]);
        }
    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
    return null;
}

// Format Recipe Data
function formatRecipe(meal) {
    const ingredients = [];
    
    // Extract ingredients and measures
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        
        if (ingredient && ingredient.trim()) {
            ingredients.push({
                ingredient: ingredient.trim(),
                measure: measure ? measure.trim() : ''
            });
        }
    }

    // Format instructions
    const instructions = meal.strInstructions
        ? meal.strInstructions.split(/\r?\n/).filter(step => step.trim())
        : [];

    return {
        id: meal.idMeal,
        name: meal.strMeal,
        category: meal.strCategory,
        area: meal.strArea,
        image: meal.strMealThumb,
        instructions: instructions,
        ingredients: ingredients,
        youtube: meal.strYoutube,
        source: meal.strSource
    };
}

// Render Functions
function renderRecipes(recipes, container) {
    container.innerHTML = '';
    
    recipes.forEach(recipe => {
        const card = createRecipeCard(recipe);
        container.appendChild(card);
    });
}

function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    
    const isFavorite = favorites.some(fav => fav.id === recipe.id);
    
    card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23667eea%22 width=%22200%22 height=%22200%22/%3E%3Ctext fill=%22%23fff%22 font-family=%22Arial%22 font-size=%2218%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3ERecipe%3C/text%3E%3C/svg%3E'">
        <div class="recipe-content">
            <h3 class="recipe-title">${recipe.name}</h3>
            <span class="recipe-category">${recipe.category}</span>
            <div class="recipe-actions">
                <button class="btn btn-view" onclick="viewRecipe('${recipe.id}')">View Recipe</button>
                <button class="btn btn-favorite ${isFavorite ? 'active' : ''}" onclick="toggleFavorite('${recipe.id}')">
                    ${isFavorite ? '❤️ Saved' : '🤍 Save'}
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function renderFavorites() {
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = `
            <div class="empty-state">
                <p>No favorite recipes yet. Start searching and save your favorites!</p>
            </div>
        `;
    } else {
        renderRecipes(favorites, favoritesContainer);
    }
}

// Recipe Viewing
async function viewRecipe(recipeId) {
    let recipe;
    
    // Check if recipe is in current recipes or favorites
    recipe = currentRecipes.find(r => r.id === recipeId) || 
             favorites.find(r => r.id === recipeId);
    
    // If not found, fetch from API
    if (!recipe) {
        loading.style.display = 'block';
        recipe = await getRecipeDetails(recipeId);
        loading.style.display = 'none';
    }
    
    if (recipe) {
        displayRecipeModal(recipe);
    }
}

function displayRecipeModal(recipe) {
    const isFavorite = favorites.some(fav => fav.id === recipe.id);
    
    modalBody.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}" class="modal-recipe-image" onerror="this.style.display='none'">
        <h2 class="modal-recipe-title">${recipe.name}</h2>
        <span class="modal-recipe-category">${recipe.category} ${recipe.area ? '• ' + recipe.area : ''}</span>
        
        <div class="modal-section">
            <h3>Ingredients</h3>
            <ul class="ingredients-list">
                ${recipe.ingredients.map(ing => `
                    <li>${ing.measure ? ing.measure + ' ' : ''}${ing.ingredient}</li>
                `).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>Instructions</h3>
            <ol class="instructions-list">
                ${recipe.instructions.length > 0 
                    ? recipe.instructions.map(step => `<li>${step}</li>`).join('')
                    : `<li>${recipe.instructions.join(' ')}</li>`
                }
            </ol>
        </div>
        
        ${recipe.youtube ? `
            <div class="modal-section">
                <h3>Video Tutorial</h3>
                <a href="${recipe.youtube}" target="_blank" class="btn btn-view" style="text-decoration: none; display: inline-block;">
                    Watch on YouTube
                </a>
            </div>
        ` : ''}
        
        <div style="margin-top: 2rem; text-align: center;">
            <button class="btn btn-favorite ${isFavorite ? 'active' : ''}" onclick="toggleFavorite('${recipe.id}'); updateModalFavorite('${recipe.id}')">
                ${isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
            </button>
        </div>
    `;
    
    modal.style.display = 'block';
}

function updateModalFavorite(recipeId) {
    const favoriteBtn = modalBody.querySelector('.btn-favorite');
    const isFavorite = favorites.some(fav => fav.id === recipeId);
    
    favoriteBtn.className = `btn btn-favorite ${isFavorite ? 'active' : ''}`;
    favoriteBtn.innerHTML = isFavorite 
        ? '❤️ Remove from Favorites' 
        : '🤍 Add to Favorites';
}

// Favorites Management
function toggleFavorite(recipeId) {
    const recipe = currentRecipes.find(r => r.id === recipeId) || 
                   favorites.find(r => r.id === recipeId);
    
    if (!recipe) {
        // Fetch recipe if not available
        getRecipeDetails(recipeId).then(recipe => {
            if (recipe) {
                addOrRemoveFavorite(recipe);
            }
        });
        return;
    }
    
    addOrRemoveFavorite(recipe);
}

function addOrRemoveFavorite(recipe) {
    const index = favorites.findIndex(fav => fav.id === recipe.id);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(recipe);
    }
    
    saveFavorites();
    
    // Update UI
    if (recipesSection.style.display !== 'none') {
        renderRecipes(currentRecipes, recipesContainer);
    }
    if (favoritesSection.style.display !== 'none') {
        renderFavorites();
    }
}

function saveFavorites() {
    localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
}

function loadFavorites() {
    const saved = localStorage.getItem('recipeFavorites');
    return saved ? JSON.parse(saved) : [];
}

// Service Worker Registration
function registerServiceWorker() {
    // Only register service worker if running on localhost or HTTPS
    if ('serviceWorker' in navigator) {
        const isLocalhost = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1' ||
                           window.location.protocol === 'https:';
        
        if (isLocalhost) {
            window.addEventListener('load', () => {
                const swPath = './sw.js';
                navigator.serviceWorker.register(swPath)
                    .then(registration => {
                        console.log('ServiceWorker registered:', registration);
                    })
                    .catch(error => {
                        console.log('ServiceWorker registration failed (app will still work):', error);
                    });
            });
        } else {
            console.log('ServiceWorker requires localhost or HTTPS. App will work but offline features may be limited.');
        }
    }
}

// Make functions globally available for onclick handlers
window.viewRecipe = viewRecipe;
window.toggleFavorite = toggleFavorite;
window.updateModalFavorite = updateModalFavorite;

