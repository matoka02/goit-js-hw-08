import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(evt) {
    localStorage.setItem(LOCALSTORAGE_KEY, evt.seconds);
};


player
.setCurrentTime(localStorage.getItem(LOCALSTORAGE_KEY) || [])
.catch(function (error) {
    console.error(error);
});

console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));

player.off('ended', offPlay);

function offPlay() {
    localStorage.removeItem(LOCALSTORAGE_KEY)
};