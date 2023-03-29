import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api/?${process.env.PIX_KEY}/`;

export const getData = async (search, page) => {
	const { data } = await axios.get('https://pixabay.com/api/', {
		params: {
			q: search,
			key: process.env.PIX_KEY,
			per_page: 20,
			page,
			image_type: 'photo',
			orientation: 'horizontal',
			safesearch: true
		}
	})
	return await data;
}