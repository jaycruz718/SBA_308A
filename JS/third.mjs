

/* export const displayPhotos = (photos) => {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;

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

export const updatePageInfo = (page) => {
  const pageInfo = document.getElementById('pageInfo');
  if (pageInfo) {
    pageInfo.textContent = `Page ${page}`;
  }
};*/
