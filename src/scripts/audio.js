import gsap from 'gsap';

const audio = {
  masterVolume: 0.1,
  sfx: {},
  tracks: {},
};

const engineMinVolumeMultiplier = 0.1;
const engineMaxVolumeMultiplier = 0.4;
audio.sfx.engineSound = new Audio('https://assets.codepen.io/246719/engine-loop-1-normalized.wav');
audio.sfx.engineSound.setAttribute('loop', true);
audio.sfx.engineSound.minVolume = engineMinVolumeMultiplier * audio.masterVolume;
audio.sfx.engineSound.maxVolume = engineMaxVolumeMultiplier * audio.masterVolume;
audio.sfx.engineSound.volume = audio.sfx.engineSound.minVolume;
audio.sfx.engineSound.addEventListener('timeupdate', function() {
	const offset = 0.64;
	if (this.currentTime > this.duration - offset) {
		this.currentTime = 0.1;
	}
});

audio.sfx.tireScreech = new Audio('/audio/tireScreech.mp3');
audio.sfx.tireScreech.setAttribute('loop', true);
audio.sfx.tireScreech.volume = 0;
audio.sfx.tireScreech.addEventListener('timeupdate', function() {
	const offset = 0.5;
	if (this.currentTime > this.duration - offset) {
		this.currentTime = 0;
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
  const maxVolumeBraking = 0.6 * audio.masterVolume;
  const maxVolumeTurning = 0.3 * audio.masterVolume;
  const maxVolume = isBraking ? maxVolumeBraking : maxVolumeTurning;
  gsap.to(audio.sfx.tireScreech, {
    duration: 0.2,
    volume: shouldPlay ? maxVolume : minVolume,
  });
};

audio.setMasterVolume = function(volume) {
  audio.masterVolume = volume;
  const tracks = Object.values(audio.tracks);
  tracks.forEach(track => {
    track.volume = audio.masterVolume;
  });
  updateEngineVolumeRange(volume);
};
audio.setMasterVolume(audio.masterVolume); // don't forget this init!

function updateEngineVolumeRange(volume) {
  audio.sfx.engineSound.minVolume = engineMinVolumeMultiplier * audio.masterVolume;
  audio.sfx.engineSound.maxVolume = engineMaxVolumeMultiplier * audio.masterVolume;
  audio.sfx.engineSound.volume = audio.sfx.engineSound.minVolume;
}

audio.playAll = function() {
  audio.sfx.engineSound.play();
  audio.sfx.tireScreech.play();
  audio.bgMusic.play();
};

audio.pauseAll = function() {
  audio.sfx.engineSound.pause();
  audio.sfx.tireScreech.pause();
  audio.bgMusic.pause();
};

export default audio;
