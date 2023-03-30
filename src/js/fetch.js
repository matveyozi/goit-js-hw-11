import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api/?/`;

export const getData = async (search, page) => {
	const { data } = await axios.get('https://pixabay.com/api/', {
		params: {
			q: search,
			key: '34711822-1a18608b89d6db278337710b9',
			per_page: 20,
			page,
			image_type: 'photo',
			orientation: 'horizontal',
			safesearch: true
		}
	})
	return await data;
}