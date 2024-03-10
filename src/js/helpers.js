import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const MESSAGES = {
  info: `Please enter a value in the search field!`,
  endOfSearch: `We're sorry, but you've reached the end of search results.`,
  warning: `Sorry, there are no images matching your search query. Please try again!`,
  error: `Sorry, there are no connection to the server. Please try again later!`,
  exception: `Exception: We have some issue with connection. Please try again later!`,
};

const MESSAGES_BG_COLORS = {
  blue: '#abd4f8',
  orange: '#f28111',
  red: '#e97782',
};

const EVENT_TYPE = {
  click: 'click',
  submit: 'submit',
};

function showInfoMessage(message, color) {
  iziToast.info({
    position: 'topRight',
    backgroundColor: `${color}`,
    message: `${message}`,
  });
}

export { EVENT_TYPE, MESSAGES, MESSAGES_BG_COLORS, showInfoMessage };
