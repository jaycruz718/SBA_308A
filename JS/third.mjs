

const gallery = document.getElementById('gallery');
const pageInfo = document.getElementById('pageInfo');

export const displayPhotos = (photos) => {
  gallery.innerHTML = '';
  if (photos.length === 0) {
    gallery.innerHTML = '<p>No photos found.</p>';
    return;
  }

  photos.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Dog Photo';
    img.style.margin = '10px';
    img.style.maxWidth = '200px';
    gallery.appendChild(img);
  });
};

export const updatePageInfo = (page) => {
  pageInfo.textContent = `Page: ${page}`;
};

