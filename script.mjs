const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');
const pageInfo = document.getElementById('pageInfo');
const searchBtn = document.getElementById('searchBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentPage = 1;
const limit = 10;
let currentQuery = '';

// Fetch dog breed list and process it
const fetchPhotos = async (query = '', page = 1) => {
  const endpoint = `https://dog.ceo/api/breeds/list/all`;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();

    // Get list of breeds
    const allBreeds = Object.keys(data.message);

    // Filter by query
    const filteredBreeds = query
      ? allBreeds.filter(breed => breed.toLowerCase().includes(query.toLowerCase()))
      : allBreeds;

    // Pagination
    const start = (page - 1) * limit;
    const paginatedBreeds = filteredBreeds.slice(start, start + limit);

    // Return breeds with image URLs
    return Promise.all(
      paginatedBreeds.map(async (breed) => {
        const imgRes = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
        const imgData = await imgRes.json();
        return {
          title: breed,
          thumbnailUrl: imgData.message
        };
      })
    );

  } catch (error) {
    console.error('Error fetching dog breeds:', error);
    throw error;
  }
};

// Display photo cards
const displayPhotos = (photos) => {
  gallery.innerHTML = '';
  if (photos.length === 0) {
    gallery.innerHTML = '<p>No results found.</p>';
    return;
  }

  photos.forEach(photo => {
    const div = document.createElement('div');
    div.className = 'photo';
    div.innerHTML = `
      <img src="${photo.thumbnailUrl}" alt="${photo.title}">
      <p>${photo.title}</p>
    `;
    gallery.appendChild(div);
  });
};

// Load and render photos
const loadPhotos = async () => {
  try {
    const photos = await fetchPhotos(currentQuery, currentPage);
    displayPhotos(photos);
    pageInfo.textContent = `Page ${currentPage}`;
  } catch (error) {
    gallery.innerHTML = '<p>Error loading gallery.</p>';
  }
};

// Event Handlers
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
