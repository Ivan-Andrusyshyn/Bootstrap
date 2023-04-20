import Pagination from 'tui-pagination';
import { NewApiService } from './fetchFood';
import { cleanImg } from '..';
import { makeImgOnSubm } from '..';

const container = document.querySelector('.tui-pagination');
let paginationSearch;
function notActive(itemsTotal) {
  paginationSearch = new Pagination(container, {
    totalItems: itemsTotal,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
    page: makeApi.page,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
  });
  go(paginationSearch);
}
function go(value) {
  value.on('beforeMove', event => {
    makeApi.page = event.page;
    cleanImg();
    makeImgOnSubm();
  });
}
export { notActive };
