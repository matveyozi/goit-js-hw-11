import './style.css'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getData } from './js/fetch.js'

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
let searchState = '';
let pageState = 1;
let total = 0;
form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const { searchQuery } = e.currentTarget.elements;
	const search = searchQuery.value;
	if (search == '') {
		onError()
	}
	if (search !== searchState || total) {
		searchState = search;
		pageState = 1;
		resetList(gallery);
		await fetchCollection(search, 1)
		onSuccess(total)
	}
});

loadBtn.addEventListener('click', () => {
	const page = document.querySelector('.load-more').dataset.page;
	const final = document.querySelector('.load-more').dataset.final;
	const search = document.querySelector('input').value;
	if (final !== page) {
		fetchCollection(searchState, page);
	} else {
		loadBtn.style.display = 'none';
		Notify.info('The end')
	}
})

async function fetchCollection(search, page) {
	const db = await getData(search, page);
	if (db.hits.length == 0 || search) {

	}

	total = db.total;
	renderList(db.hits)
	const finalPage = Math.ceil(+(db.total) / 10);
	updateLoadButton(page, finalPage)
	


}


function renderList(collection) {
	const gallaryItem = collection.map(element => {
		return `<a href="${element.largeImageURL}" class="photo-card">
  <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
	  <span>${element.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
	  <span>${element.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
	  <span>${element.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
	  <span>${element.downloads}</span>
    </p>
  </div>
</a>`
	}).join('');

	gallery.insertAdjacentHTML('beforeend', gallaryItem);
	const lightbox = new SimpleLightbox('.gallery a', {
		captionDelay: 250
	});
}

function resetList(selector) {
	selector.innerHTML = '';
}

function updateLoadButton(currentPage, finalPage) {

	loadBtn.style.display = 'block';
	loadBtn.dataset.page = Number(currentPage) + 1;
	loadBtn.dataset.final = Number(finalPage) + 1;
};


function onSuccess(totalHits) {
	Notify.success(`Hooray! We found ${totalHits} images.`);
}

function onError() {
	Notify.failure(`Sorry, there are no images matching your search query.Please try again.`);

}