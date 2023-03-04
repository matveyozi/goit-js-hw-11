import Player from '@vimeo/player';
const throttle = require('lodash.throttle');
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function (data) {
	player.setCurrentTime(localStorage.getItem('videoplayer-current-time')).then(function (seconds) {
		// seconds = the actual time that the player seeked to
	}).catch(function (error) {
		switch (error.name) {
			case 'RangeError':
				// the time was less than 0 or greater than the video’s duration
				break;

			default:
				// some other error occurred
				break;
		}
	});
});
// THIS STOP ME
player.on('timeupdate', throttle((data) => {
	localStorage.setItem('videoplayer-current-time', data.seconds);
	console.log(localStorage.getItem('videoplayer-current-time'));
	}, 1000));

// console.log(localStorage.getItem('videoplayer-current-time'))
// player.getVideoTitle().then(function (title) {
// 	console.log('title:', title);
// });

