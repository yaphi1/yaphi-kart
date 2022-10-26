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
	const buffer = 0.64;
	if (this.currentTime > this.duration - buffer) {
		this.currentTime = 0.1;
		this.play();
	}
});

audio.tracks.warioStadium = new Audio('https://ia903401.us.archive.org/13/items/mario-kart-64-original-soundtrack/1.02%20Raceway%20%26%20Wario%20Stadium.flac');
audio.tracks.warioStadium.setAttribute('loop', true);

audio.bgMusic = audio.tracks.warioStadium;

audio.applyAcceleration = function ({ isAccelerating }) {
  const { minVolume, maxVolume } = audio.sfx.engineSound;
  gsap.to(audio.sfx.engineSound, {
    duration: 2,
    volume: isAccelerating ? maxVolume : minVolume,
  });
};

export default audio;
