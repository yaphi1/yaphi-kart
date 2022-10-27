import gsap from 'gsap';

const audio = {
  sfx: {},
  tracks: {},
};

audio.sfx.engineSound = new Audio('https://assets.codepen.io/246719/engine-loop-1-normalized.wav');
audio.sfx.engineSound.setAttribute('loop', true);
audio.sfx.engineSound.minVolume = 0.1;
audio.sfx.engineSound.maxVolume = 0.4;
audio.sfx.engineSound.volume = audio.sfx.engineSound.minVolume;
audio.sfx.engineSound.addEventListener('timeupdate', function() {
	const offset = 0.64;
	if (this.currentTime > this.duration - offset) {
		this.currentTime = 0.1;
		this.play();
	}
});

audio.sfx.tireScreech = new Audio('/audio/tireScreech.mp3');
audio.sfx.tireScreech.setAttribute('loop', true);
audio.sfx.tireScreech.volume = 0;
audio.sfx.tireScreech.addEventListener('timeupdate', function() {
	const offset = 0.5;
	if (this.currentTime > this.duration - offset) {
		this.currentTime = 0;
		this.play();
	}
});

audio.tracks.warioStadium = new Audio('https://ia903401.us.archive.org/13/items/mario-kart-64-original-soundtrack/1.02%20Raceway%20%26%20Wario%20Stadium.flac');
audio.tracks.warioStadium.setAttribute('loop', true);

audio.tracks.toadsTurnpike = new Audio('https://ia903401.us.archive.org/13/items/mario-kart-64-original-soundtrack/1.06%20Toad%27s%20Turnpike.mp3');
audio.tracks.toadsTurnpike.setAttribute('loop', true);
audio.tracks.toadsTurnpike.addEventListener('timeupdate', function() {
	const offset = 10.4;
	if (this.currentTime > this.duration - offset) {
		this.currentTime = 14.05;
		this.play();
	}
});

audio.bgMusic = audio.tracks.toadsTurnpike;

audio.applyAcceleration = function ({ isAccelerating }) {
  const { minVolume, maxVolume } = audio.sfx.engineSound;
  gsap.to(audio.sfx.engineSound, {
    duration: 2,
    volume: isAccelerating ? maxVolume : minVolume,
  });
};

audio.updateScreech = function({ shouldPlay, isBraking }) {
  const minVolume = 0;
  const maxVolume = isBraking ? 0.6 : 0.3;
  gsap.to(audio.sfx.tireScreech, {
    duration: 0.2,
    volume: shouldPlay ? maxVolume : minVolume,
  });
};

export default audio;
