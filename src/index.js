import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { NewApiService } from './js/fetchFood';
import { dataCardTemp } from './js/dataCardTemp';
import { notActive } from './js/pagination';

const gallery = document.querySelector('[gallery-active]');
const formGallery = document.querySelector('[data-search-forms]');
const btnForm = document.querySelector('[type="submit"]');
const wrapDiv = document.querySelector('.fixed-top');
const btnLoadMore = document.querySelector('[is-hidden]');
const lightbox = new SimpleLightbox('.gallery a', {});

formGallery.addEventListener('submit', newPhotoOnSubmit);

const makeApi = new NewApiService();

function newPhotoOnSubmit(e) {
  e.preventDefault();
  let inputForm = e.currentTarget.elements.searchQuery.value.trim();
  makeApi.page = 1;
  makeApi.query = inputForm;
  if (inputForm === '') return;
  makeImgOnSubm();
  cleanImg();
}

export async function makeImgOnSubm() {
  try {
    const { data } = await makeApi.makeFetch();
    makeApi.lengOfValue = data.hits.length;
    makeApi.dataSaver = data;
    notActive(data.totalHits);
    noticeDeclaretion(data);
    markup(data);
    scrollSmooth();
  } catch (err) {
    console.log(err);
    Notiflix.Notify.failure('Oops, something went wrong...');
  }
}

function noticeDeclaretion(value) {
  if (value.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
      { timeout: 3000 }
    );
  } else if (value.hits.length > 0 && makeApi.page == 1) {
    Notiflix.Notify.success(`Hooray! We found ${value.totalHits} images.`, {
      timeout: 2000,
    });
  } else if (makeApi.lengOfValue < 40) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results.",
      { timeout: 3000 }
    );
    btnForm.removeAttribute('disabled');
  }
}

function markup(response) {
  gallery.insertAdjacentHTML('beforeend', dataCardTemp(response));
  lightbox.refresh();
}

export function cleanImg() {
  gallery.innerHTML = '';
}
function scrollSmooth() {
  let hScreen = wrapDiv.getBoundingClientRect();
  const { height: cardHeight } = hScreen;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
