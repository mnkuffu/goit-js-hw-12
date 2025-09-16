// Import necessary functions and libraries
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  showLoader,
  hideLoader,
  clearGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';

// Get DOM elements
const formEl = document.querySelector('.form');
const inputEl = document.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');
const loaderText = document.querySelector('.loader-text');

// Variables for search and pagination
let searchQuery = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

// Listen to form submit and "Load More" button click
formEl.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

// Handle search form submission:
// clears previous results, resets pagination, fetches images, and updates UI accordingly
async function onSearch(e) {
  e.preventDefault();
  clearGallery();
  hideLoadMoreButton();

  searchQuery = inputEl.value.trim();
  page = 1;

  if (!searchQuery) {
    iziToast.warning({
      title: 'Error',
      message: 'Please type something to search',
      position: 'topRight',
    });
    return;
  }

  showLoader();
  inputEl.value = '';

  try {
    const data = await getImagesByQuery(searchQuery, page);
    totalHits = data.totalHits;

    if (!data.hits.length) {
      iziToast.info({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      hideLoader();
      return;
    }

    createGallery(data.hits);

    if (page * perPage < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: `Error: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

// Handle Load More button click:
// fetches next page of images, adds them to gallery, manages button visibility and smooth scroll
async function onLoadMore() {
  showLoader();
  page += 1;

  try {
    const data = await getImagesByQuery(searchQuery, page);

    createGallery(data.hits);

    if (page * perPage >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }

    const cardHeight = document
      .querySelector('.gallery li')
      .getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      message: `Error: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
