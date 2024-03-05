import iziToast from 'izitoast';

import { MESSAGES, MESSAGES_BG_COLORS, showInfoMessage } from './js/helpers';

import { getGalleryData } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const div = document.createElement('div');

form.addEventListener('submit', onSubmitForm);

async function onSubmitForm(event) {
  event.preventDefault();

  iziToast.destroy();
  gallery.innerHTML = '';
  addLoader();

  const formData = new FormData(event.target);
  const { search } = Object.fromEntries(formData.entries());

  if (!search.trim()) {
    showInfoMessage(MESSAGES.info, MESSAGES_BG_COLORS.blue);
    gallery.innerHTML = '';
    return;
  }

  try {
    const galleryData = await getGalleryData(search.trim());
    if (validateGalleryData(galleryData)) {
      renderGallery(galleryData, gallery);
    }
  } catch (error) {
    showInfoMessage(MESSAGES.exception + error, MESSAGES_BG_COLORS.orange);
  }

  event.target.reset();
}

function addLoader() {
  div.classList.add('loader');
  gallery.append(div);
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
