import axios from 'axios';
import { MESSAGES, MESSAGES_BG_COLORS, showInfoMessage } from './helpers';
import { fetchLoader } from './render-functions';

const API_KEY = '42598065-1779ad5a953180c3fe77c2809';
const API_URL = 'https://pixabay.com/api/?';
const CONFIG = {
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientations: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 15,
  },
};

export async function getGalleryData(queryValue, page) {
  try {
    fetchLoader();
    CONFIG.params.q = queryValue;
    CONFIG.params.page = page;
    const response = await axios.get(API_URL, CONFIG);
    return response.data;
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      // The request was made, but the server responded with a non-2xx status code
      showInfoMessage(
        `${MESSAGES.exception} ERROR: ${data}`,
        MESSAGES_BG_COLORS.orange
      );
    } else if (error.request) {
      // The request was made, but no response was received
      showInfoMessage(
        `${MESSAGES.exception} ERROR: ${error.request}`,
        MESSAGES_BG_COLORS.orange
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      showInfoMessage(
        `${MESSAGES.exception} ERROR: ${error.message}`,
        MESSAGES_BG_COLORS.orange
      );
    }
  }
}
