import './style.css'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getData } from './js/fetch.js'

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
let searchState = '';
let pageState = 1;
form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const { searchQuery } = e.currentTarget.elements;
	const search = searchQuery.value;
	const db = await getData(search, 1);
	if (db.hits.length == 0) {
		onError()
	}
	if (search !== searchState) {
		searchState = search;
		pageState = 1;
		resetList(gallery);
		await renderList(gallery, db.hits);
	}
});
async function  fetchCollection(search, page) {
	
}


function renderList(parentSelector, collection) {
	const gallaryItem = collection.map(element => {
		return `<div class="photo-card">
  <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${element.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${element.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${element.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${element.downloads}</b>
    </p>
  </div>
</div>`
	}).join('');

	parentSelector.insertAdjacentHTML('beforeend',gallaryItem);
}

function resetList(selector) {
	selector.innerHTML = '';
}

const updateLoadButton = (currentPage, finalPage) => {
	const btn = document.querySelector('.load');
	btn.style.display = 'block';
	btn.dataset.page = Number(currentPage) + 1;
	btn.dataset.final = Number(finalPage) + 1;
};


function onSuccess(totalHits) {
	Notify.success(`Hooray! We found ${totalHits} images.`);
}

function onError() {
	Notify.failure(`Sorry, there are no images matching your search query.Please try again.`);
	
}