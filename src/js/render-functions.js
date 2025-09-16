import SimpleLightbox from 'simplelightbox';

// DOM elements for gallery, loader, load more button, and loader text
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
const loaderText = document.querySelector('.loader-text');

// Initialize SimpleLightbox for gallery images with captions
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Create gallery markup from images array and insert into DOM
export function createGallery(imgs) {
  
  const markup = imgs
    .map(
      img => `
        <li class='item'>
          <a class='gallery-item' href='${img.largeImageURL}'>
            <img 
              class='gallery-img' 
              src='${img.webformatURL}' 
              alt='${img.tags}' 
              loading="lazy" 
            />
          </a>
          <div class='info'>
            <ul class='info-list'>
              <li><h3>Likes</h3><p>${img.likes}</p></li>
              <li><h3>Views</h3><p>${img.views}</p></li>
              <li><h3>Comments</h3><p>${img.comments}</p></li>
              <li><h3>Downloads</h3><p>${img.downloads}</p></li>
            </ul>
          </div>
        </li>
      `
    )
    .join('');
  
   gallery.insertAdjacentHTML('beforeend', markup); 
  lightbox.refresh();
}

// Clear gallery content
export function clearGallery() {
  gallery.innerHTML = '';
}
// Show loader animation and text
export function showLoader() {
  loader.classList.remove('is-hidden');
  loaderText.classList.remove('is-hidden');
}

// Hide loader animation and text
export function hideLoader() {
  loader.classList.add('is-hidden');
  loaderText.classList.add('is-hidden');
}

// Show Load More button and hide loader text
export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
  loaderText.classList.add('is-hidden');
}

// Hide Load More button
export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}