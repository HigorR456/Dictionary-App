import { fetchData } from './fetch.js';

let search = document.querySelector('.search-btn');
search.addEventListener('click', fetchData);