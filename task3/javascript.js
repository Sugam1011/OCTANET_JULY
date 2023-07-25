let songIndex = 0;
let audioElement = new Audio('audio/1.mp3');
let masterplay = document.getElementById('masterplay');
let progressBar = document.getElementById('progressBar');
let title = document.getElementById('title');
let playerPoster = document.getElementById('player-poster');
let songitems = Array.from(document.getElementsByTagName('songs'));

let songs = [
    { songName: "Star Boy <div class='subtitle'> The Weeknd</div>", path: "/audio/1.mp3", cover: "/img/starboy.jpg" },
    { songName: "On My Way <div class='subtitle'> Alan Walker</div>", path: "/audio/2.mp3", cover: "/img/onMyWay.jpg" },
    { songName: "Safari <div class='subtitle'> Serena</div>", path: "/audio/3.mp3", cover: "/img/safari.jpg" },
    { songName: "Kalesh Chori <div class='subtitle'> DG IMMORTALS</div>", path: "/audio/4.mp3", cover: "/img/kaleshChori.jpg" },
    { songName: "Bilionera <div class='subtitle'> Otilia</div>", path: "/audio/5.mp3", cover: "/img/billiorea.jpg" },
    { songName: "Binding Lights <div class='subtitle'> The Weekend</div>", path: "/audio/6.mp3", cover: "/img/blinding-lights.jpg" },
    { songName: "LALA <div class='subtitle'> Myke Towers</div>", path: "/audio/7.mp3", cover: "/img/lala.jpg" },
    { songName: "Pathaan <div class='subtitle'> Vishal-Shekhar</div>", path: "/audio/8.mp3", cover: "/img/pathaan.jpg" },
    { songName: "Yummy <div class='subtitle'> Justin Bieber</div>", path: "/audio/9.mp3", cover: "/img/yummy.jpg" },
    { songName: "Alone <div class='subtitle'> Alan Walker</div>", path: "/audio/10.mp3", cover: "/img/Alone.png" },
    { songName: "Alone <div class='subtitle'> Alan Walker </div>", path: "/audio/11.mp3", cover: "/img/Alone.jpg" },
    { songName: "Love is Gone <div class='subtitle'> Slander </div>", path: "/audio/12.mp3", cover: "/img/love is gone.png" },
    { songName: "Love is on fire <div class='subtitle'> Black Pink </div>", path: "/audio/13.mp3", cover: "/img/love is on fire.jpg" },
    { songName: "Hwa Banke <div class='subtitle'> Darshan Raval </div>", path: "/audio/14.mp3", cover: "/img/hawa banke.jpg" },
    { songName: "Ik Vaari Aa <div class='subtitle'> Arjit Singh. </div>", path: "/audio/15.mp3", cover: "/img/arjitsingh.jpg" },
    { songName: "wajah Tum Ho <div class='subtitle'> Arman Malik </div>", path: "/audio/16.mp3", cover: "/img/wajah tum ho.jpg" },
    { songName: "Do You Know <div class='subtitle'> Diljit Dosanjh </div>", path: "/audio/16.mp3", cover: "/img/do you know.jpg" },
];

songitems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i].cover;
    element.getElementsByClassName('name')[0].innerHTML = songs[i].songName;

});
//-------------Audio PLayer control--------------
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('bi-play-circle-fill')
        masterplay.classList.add('bi-pause-circle-fill')
    } else {
        audioElement.pause();
        masterplay.classList.remove('bi-pause-circle-fill')
        masterplay.classList.add('bi-play-circle-fill')
    }
})
//------------Event Listener----

let start = document.getElementById('start');
let end = document.getElementById('end');

audioElement.addEventListener('timeupdate', () => {
    let mint = Math.floor(audioElement.duration / 60);
    let sec = Math.floor(audioElement.duration % 60);

    if (sec < 10) {
        sec = `0${sec}`;
    }
    end.innerHTML = `${mint}:${sec}`;


    let curMint = Math.floor(audioElement.currentTime / 60);
    let curSec = Math.floor(audioElement.currentTime % 60);
    if (curSec < 10) {
        curSec = `0${curSec}`;
    }

    start.innerHTML = `${curMint}:${curSec}`;

    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    progressBar.value = progress;
})

let vol = document.getElementById('volume');
let volume_icon = document.getElementById('volume_icon');
volume.addEventListener('change', () => {
    if (vol.value == 0) {
        volume_icon.classList.remove('bi-volume-down');
        volume_icon.classList.add('bi-volume-mute');

    }
    if (vol.value > 0) {

        volume_icon.classList.remove('bi-volume-mute');
        volume_icon.classList.add('bi-volume-down');
    }

    audioElement.volume = vol.value / 100;
})

progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('p-btn')).forEach((element) => {
        element.classList.remove('bi-pause-circle-fill');
        element.classList.add('bi-play-circle-fill');
    })
}

Array.from(document.getElementsByClassName('p-btn')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays()
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        audioElement.src = `audio/${songIndex + 1}.mp3`;
        title.innerHTML = songs[songIndex].songName;
        playerPoster.src = songs[songIndex].cover;
        audioElement.currentTime = 0;
        audioElement.play();
        masterplay.classList.remove('bi-play-circle-fill');
        masterplay.classList.add('bi-pause-circle-fill');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 15) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }

    audioElement.src = `audio/${songIndex + 1}.mp3`;
    title.innerHTML = songs[songIndex].songName;
    playerPoster.src = songs[songIndex].cover;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('bi-play-circle-fill');
    masterplay.classList.add('bi-pause-circle-fill');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex < 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `audio/${songIndex + 1}.mp3`;
    title.innerHTML = songs[songIndex].songName;
    playerPoster.src = songs[songIndex].cover;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('bi-play-circle-fill');
    masterplay.classList.add('bi-pause-circle-fill');
})