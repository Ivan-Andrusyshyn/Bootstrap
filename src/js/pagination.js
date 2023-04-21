import Pagination from 'tui-pagination';
import { api } from './fetchFood';
import { cleanImg } from '..';
import { makeImgOnSubm, makeImg } from '..';

const container = document.querySelector('.tui-pagination');
let paginationPopularimg;
let paginationSearch;

function notActive(itemsTotal) {
  paginationSearch = new Pagination(container, {
    totalItems: itemsTotal,
    itemsPerPage: 30,
    visiblePages: 4,
    centerAlign: true,
    page: api.page,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
  });
  go(paginationSearch);
}
function go(value) {
  value.on('beforeMove', event => {
    api.page = event.page;
    cleanImg();
    makeImgOnSubm();
  });
}
// ======================defoult pagination=============>
function makePagin() {
  paginationPopularimg = new Pagination(container, {
    totalItems: 500,
    itemsPerPage: 30,
    visiblePages: 4,
    centerAlign: true,
    page: api.page,
  });
  paginGo(paginationPopularimg);
}
// ==========================
function paginGo(value) {
  value.on('afterMove', e => {
    api.page = e.page;
    cleanImg();
    makeImg();
  });
}

export { notActive, makePagin };
