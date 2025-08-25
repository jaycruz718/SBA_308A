/* import { fetchPhotos } from './second.mjs';
import { displayPhotos, updatePageInfo } from './third.mjs'; */

let currentPage = 1;
let currentQuery = '';
const limit = 10;

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const loadPhotos = async () => {
  try {
    const photos = await fetchPhotos(currentQuery, currentPage, limit);
    displayPhotos(photos);
    updatePageInfo(currentPage);
  } catch {
    document.getElementById('gallery').innerHTML = '<p>Error loading gallery.</p>';
  }
};

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

// Initial load
loadPhotos();


/* const toggleControls = (disabled) => {
  searchBtn.disabled = disabled;
  prevBtn.disabled = disabled;
  nextBtn.disabled = disabled;
};

const loadPhotos = async () => {
  toggleControls(true);
  try {
    const photos = await fetchPhotos(currentQuery, currentPage, limit);
    displayPhotos(photos);
    updatePageInfo(currentPage);
  } catch (error) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '<p>Error loading gallery.</p>';
  } finally {
    toggleControls(false);
  }
}; */
