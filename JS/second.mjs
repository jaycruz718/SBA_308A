

export const fetchPhotos = async (breed, page, limit) => {
  try {
    if (breed) {
      const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
      const data = await res.json();

      if (data.status !== 'success') {
        throw new Error('Breed not found');
      }

      const start = (page - 1) * limit;
      const end = start + limit;
      return data.message.slice(start, end);
    } else {
      const res = await fetch(`https://dog.ceo/api/breeds/image/random/${limit}`);
      const data = await res.json();
      return data.message;
    }
  } catch (error) {
    console.error('API Error:', error.message);
    return [];
  }
};
