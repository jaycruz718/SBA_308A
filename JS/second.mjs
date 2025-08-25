

const API_BASE = 'https://dog.ceo/api';

export const fetchPhotos = async (query = '', page = 1, limit = 10) => {
  try {
    const response = await fetch(`${API_BASE}/breeds/list/all`);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    const allBreeds = Object.keys(data.message);

    // Filter
    const filtered = query
      ? allBreeds.filter(breed => breed.toLowerCase().includes(query.toLowerCase()))
      : allBreeds;

    // Paginate
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    // Get random image for each breed
    return Promise.all(
      paginated.map(async (breed) => {
        const res = await fetch(`${API_BASE}/breed/${breed}/images/random`);
        const img = await res.json();
        return {
          title: breed,
          thumbnailUrl: img.message
        };
      })
    );

  } catch (err) {
    console.error('API error:', err);
    throw err;
  }
};
