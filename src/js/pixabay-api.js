import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '';

// Get images from Pixabay API by query and page
export async function getImagesByQuery(query, page) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error.message);
    throw error; 
  }
}