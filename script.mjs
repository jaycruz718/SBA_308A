    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const gallery = document.getElementById('gallery');
    const pageInfo = document.getElementById('pageInfo');

    let currentPage = 1;
    const limit = 6;
    let currentQuery = ''; // Breed name (optional)

    const fetchPhotos = async (breed, page, limit) => {
      try {
        if (breed) {
          // Breed-specific fetch
          const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
          const data = await res.json();
          if (data.status !== 'success') throw new Error('Breed not found');
          const start = (page - 1) * limit;
          const end = start + limit;
          return data.message.slice(start, end);
        } else {
          // Random images
          const res = await fetch(`https://dog.ceo/api/breeds/image/random/${limit}`);
          const data = await res.json();
          return data.message;
        }
      } catch (error) {
        console.error(error);
        return [];
      }
    };

    const displayPhotos = (photos) => {
      gallery.innerHTML = '';
      photos.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        gallery.appendChild(img);
      });
    };

    const updatePageInfo = (page) => {
      pageInfo.textContent = `Page: ${page}`;
    };

    const loadPhotos = async () => {
      const photos = await fetchPhotos(currentQuery, currentPage, limit);
      displayPhotos(photos);
      updatePageInfo(currentPage);
    };

    searchBtn.addEventListener('click', () => {
      currentQuery = searchInput.value.trim().toLowerCase();
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
