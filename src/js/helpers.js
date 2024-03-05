import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const MESSAGES = {
  info: 'Please enter a value in the search field!',
  warning:
    'Sorry, there are no images matching your search query. Please try again!',
  error:
    'Sorry, there are no connection to the server. Please try again later! ',
  exception:
    'Exception: We have some issue with connection. Please try again later! ',
};

const MESSAGES_BG_COLORS = {
  blue: '#abd4f8',
  orange: '#f28111',
  red: '#e97782',
};

function showInfoMessage(message, color) {
  iziToast.info({
    position: 'topRight',
    backgroundColor: `${color}`,
    message: `${message}`,
  });
}

export { MESSAGES, MESSAGES_BG_COLORS, showInfoMessage };
