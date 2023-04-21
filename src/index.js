import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { api } from './js/fetches';
import { dataCardTemp } from './js/dataTemp';
import { notActive, makePagin } from './js/pagination';

const gallery = document.querySelector('[gallery-active]');
const formGallery = document.querySelector('[data-search-forms]');
const btnForm = document.querySelector('[type="submit"]');
const wrapDiv = document.querySelector('.fixed-top');
const btnHome = document.querySelector('.HOME');
const navCtegories = document.querySelector('.dropdown-menu');
const lightbox = new SimpleLightbox('.gallery a', {});
formGallery.addEventListener('submit', newPhotoOnSubmit);
btnHome.addEventListener('click', () => {
  api.query = 'people';
  cleanImg();
  makeImg();
});
navCtegories.addEventListener('click', takeCategiries);
function takeCategiries(e) {
  api.page = 1;

  const f = e.target.id;
  api.query = f;
  cleanImg();
  makeImg();
}

function newPhotoOnSubmit(e) {
  e.preventDefault();
  let inputForm = e.currentTarget.elements.searchQuery.value.trim();
  api.page = 1;
  api.query = inputForm;
  if (inputForm === '') return;
  makeImgOnSubm();
  cleanImg();
}
// =============================>searcher
export async function makeImgOnSubm() {
  try {
    const { data } = await api.makeFetch();
    notActive(data.totalHits);
    noticeDeclaretion(data);
    markup(data);
    scrollSmooth();
  } catch (err) {
    console.log(err);
    Notiflix.Notify.failure('Oops, something went wrong...');
  } finally {
    formGallery.reset();
  }
}
makeImg();
// =========================>
export async function makeImg() {
  try {
    const { data } = await api.makeImgFone();
    makePagin();
    noticeDeclaretion(data);
    markup(data);
  } catch (err) {
    console.log(err);
    Notiflix.Notify.failure('Oops, something went wrong...');
  }
}
function markup(response) {
  gallery.insertAdjacentHTML('beforeend', dataCardTemp(response));
  lightbox.refresh();
}

export function cleanImg() {
  gallery.innerHTML = '';
}
function noticeDeclaretion(value) {
  if (value.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
      { timeout: 1000 }
    );
  } else if (value.hits.length > 0 && api.page == 1) {
    Notiflix.Notify.success(`Hooray! We found ${value.totalHits} images.`, {
      timeout: 1000,
    });
  } else if (api.lengOfValue < 40) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results.",
      { timeout: 1000 }
    );
  }
}

// ==================> !scroll
function scrollSmooth() {
  let hScreen = wrapDiv.getBoundingClientRect();
  const { height: cardHeight } = hScreen;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
