// main.mjs

import { fetchPhotos } from './second.mjs';
import { displayPhotos, updatePageInfo } from 'script.mjs';

let currentPage = 1;
let currentQuery = '';
const limit = 10;

// DOM elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Load and render
const loadPhotos = async () => {
  try {
    const photos = await fetchPhotos(currentQuery, currentPage, limit);
    displayPhotos(photos);
    updatePageInfo(currentPage);
  } catch (error) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '<p>Error loading gallery.</p>';
  }
};

// Event Listeners
searchBtn.addEventListener('click', () => {
  currentQuery = searchInput.value.trim();
  currentPage = 1;
  loadPhotos();
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadPhotos();
  }
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  loadPhotos();
});

// Initial Load
loadPhotos();
