import iziToast from 'izitoast';
import {
  EVENT_TYPE,
  MESSAGES,
  MESSAGES_BG_COLORS,
  showInfoMessage,
} from './js/helpers';
import { getGalleryData } from './js/pixabay-api';
import { fetchGallery } from './js/render-functions';

let queryString = '';
let currentPage = 1;
let evtType = '';

const IMAGE_MAX_COUNT = 15;

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');

form.addEventListener('submit', onSubmitForm);

loadMoreBtn.addEventListener('click', async () => {
  try {
    evtType = EVENT_TYPE.click;
    await renderGallery(queryString, currentPage);
    const liEl = document.querySelector('li');
    const { height } = liEl.getBoundingClientRect();
    scrollVertical(height * 2, 0);
  } catch (error) {
    showInfoMessage(MESSAGES.exception + error, MESSAGES_BG_COLORS.orange);
  }
});

async function onSubmitForm(event) {
  try {
    event.preventDefault();

    const target = event.target;
    const search = target.elements.search.value.trim();

    evtType = EVENT_TYPE.submit;

    loadMoreBtn.classList.remove('visible');

    iziToast.destroy();

    if (queryString !== search || evtType === EVENT_TYPE.submit) {
      gallery.innerHTML = '';
      queryString = target.elements.search.value.trim();
      currentPage = 1;
    }

    if (!search) {
      showInfoMessage(MESSAGES.info, MESSAGES_BG_COLORS.blue);
      gallery.innerHTML = '';
      return;
    }

    await renderGallery(queryString, currentPage);

    target.reset();
  } catch (error) {
    showInfoMessage(MESSAGES.exception + error, MESSAGES_BG_COLORS.orange);
  }
}

async function renderGallery(searchValue, page) {
  try {
    if (searchValue === queryString && evtType === EVENT_TYPE.click) {
      currentPage += 1;
      page += 1;
    }

    const galleryData = await getGalleryData(searchValue, page);

    removeLoader();

    if (validateGalleryData(galleryData)) {
      const restOfImages = Math.round(galleryData.totalHits / page);
      fetchGallery(galleryData);
      showHideBtn(restOfImages);
    }
  } catch (error) {
    showInfoMessage(MESSAGES.exception + error, MESSAGES_BG_COLORS.orange);
  }
}

function scrollVertical(x = 0, y = 0) {
  window.scrollBy({ top: x, left: y, behavior: 'smooth' });
}

function removeLoader() {
  const loaderWrapper = document.querySelector('.loader-wrapper');
  loaderWrapper.remove();
}

function validateGalleryData(galleryData) {
  if (!galleryData) {
    gallery.innerHTML = '';
    return false;
  } else if (galleryData && galleryData.totalHits === 0) {
    showInfoMessage(MESSAGES.warning, MESSAGES_BG_COLORS.red);
    gallery.innerHTML = '';
    return false;
  } else {
    return true;
  }
}

function showHideBtn(imagesCount) {
  if (imagesCount <= IMAGE_MAX_COUNT) {
    loadMoreBtn.classList.remove('visible');
    showInfoMessage(MESSAGES.endOfSearch, MESSAGES_BG_COLORS.blue);
    return;
  }
  loadMoreBtn.classList.add('visible');
}
