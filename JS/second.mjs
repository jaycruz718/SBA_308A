/* let controller; // Used to cancel old requests

export const fetchPhotos = async (query = '', page = 1, limit = 10) => {
  if (controller) controller.abort();
  controller = new AbortController();

  try {
    const res = await fetch('https://dog.ceo/api/breeds/list/all', {
      signal: controller.signal
    });

    const data = await res.json();
    const allBreeds = Object.keys(data.message);

    const filtered = query
      ? allBreeds.filter(breed => breed.toLowerCase().includes(query.toLowerCase()))
      : allBreeds;

    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return Promise.all(
      paginated.map(async (breed) => {
        try {
          const imgRes = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
          const imgData = await imgRes.json();
          return {
            title: breed,
            thumbnailUrl: imgData.message
          };
        } catch {
          return {
            title: breed,
            thumbnailUrl: 'https://via.placeholder.com/150?text=No+Image'
          };
        }
      })
    );

  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn('Request aborted');
      return []; // Return empty on abort
    }
    console.error('API Error:', error);
    throw error;
  }
}; */
