import { api } from './fetches';

export const dataCardTemp = response => {
  return response.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
          <li class="col-lg-4 col-md-6  p-2 hover-zoom" width="100%" height="100%" id="gallery-item">
          <div class="">
            <img src="${largeImageURL}"alt="${tags}"class="w-100"  loading="lazy" />
            </div>
            <div class="d-flex justify-content-around p-2 align-content-center">
            <p class="d-flex flex-column mr-2 justify-content-center  align-items-center"><b class="">Likes</b>${likes}</p>
            <p class="d-flex flex-column mr-2 justify-content-center  align-items-center"><b class="">Views</b>${views}</p>
            <p class="d-flex flex-column mr-2 justify-content-center  align-items-center"><b class="">Comments</b>${comments}</p>
            <p class="d-flex flex-column mr-2 justify-content-center  align-items-center"><b class="">Downloads</b>${downloads}</p>
          </div>
        </li>
        `;
      }
    )
    .join('');
};
