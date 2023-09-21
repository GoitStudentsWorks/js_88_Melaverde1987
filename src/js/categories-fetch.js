import { fetchCategories} from './API/categories-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkupGridCard } from './grid-card-fetch';
import { fetchCards } from './API/grid-cards-api';

const gallery = document.querySelector('.list-recipes');

const categoryContainer = document.querySelector('.categories');
const categoriesAll = document.querySelector('.categories-list');
export const btnAllCategories = document.querySelector('.btn-all-categories');
const blokCategory = document.querySelector('.categories-block');
const btnCategory = document.querySelector('.category-btn');
const categoriesItem = document.querySelector('.categories-element')
const CATEGORIES_ENDPOINT = '/categories';

categoriesData();
async function categoriesData() {
  try {
    const result = await fetchCategories();
    const categoriesList = createMarkupCategories(result);
    categoriesAll.insertAdjacentHTML('beforeend', categoriesList);
  } catch {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }

  function createMarkupCategories(data) {
    return data.map( item => 
    `<li class="categories-element" data-id=${item._id}>
    <button class="category-btn" type="submit">${item.name}</button>
    </li>`
    ).join('');
  }
}


btnAllCategories.addEventListener('click', onAllRecipesClick);
categoriesAll.addEventListener('click', onSearchCategory);

let recipes = [];

async function onAllRecipesClick(evt){
  let data = await getDataArr();
  gallery.innerHTML = createMarkupGridCard(data);
}

async function onSearchCategory(evt) {
  if (!evt.target.classList.contains('category-btn')) {
    return;
  } const value = evt.target.textContent;
  let data = await getDataArr();

  const recipesByCategory = data.filter(
  item => item.category === value);
  gallery.innerHTML = createMarkupGridCard(recipesByCategory);
}


async function getDataArr() {
  let data = [];
  if (recipes[0]) {
    data = [];
  } else {
    const responce = await fetchCards(currentlimit);
    data = responce.data;
  }
  return data;}

  let currentlimit = 0;
if (document.documentElement.clientWidth < 768) {
  currentlimit = 6;
} else if (document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280) {
  currentlimit = 8;
} else {
  currentlimit = 9;
}


// let searchedCategory = ''; 

// let PER_PAGE = 0;
// if (document.documentElement.clientWidth < 768) {
//   PER_PAGE = 6;
// } else if (document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280) {
//   PER_PAGE = 8;
// } else {
//   PER_PAGE = 9;
// }

// async function fetchRecipeByCategory(category) {
//   const response = await axios.get(`${BASE_URL}recipes?category=${category}&limit=${PER_PAGE}`);
//   return response;
// }

// renderRecipeByCategory();
// async function renderRecipeByCategory(category){
//   try {
//     const result = await fetchRecipeByCategory(category);
//     const searchedCategory = createMarkupGridCard(result);
//     categoriesAll.insertAdjacentHTML('beforeend', searchedCategory);

//   } catch {
//     Notify.failure('Ooops! No recipes found');
//   }
// }

