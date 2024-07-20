<script>
	import {onMount} from "svelte";
	import { musicList } from "./musicList"
	let currentSongIndex = 0;
	let playerState= 'play';
	let audioElement;
	let mainElement;

	function setBackground() {
		let background = `
			linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.5)),
			url(./files/image/${$musicList[currentSongIndex].image}) center no-repeat
		`;
		mainElement.style.background = background;
		mainElement.style.backgroundSize = 'cover';
	}

	onMount(function(){
		setBackground();
		audioElement.src = `./files/audio/${$musicList[currentSongIndex].audio}`;
	})

	function prev(){
		if(currentSongIndex == 0) {
			currentSongIndex = $musicList.length - 1;
		} else {
			currentSongIndex = (currentSongIndex - 1) % $musicList.length;
		}
		playerState = "play";
		setBackground();
		audioElement.src = `./files/audio/${$musicList[currentSongIndex].audio}`;
	}
	function playPause(){
		if(playerState == "play") {
			playerState = "pause";
			audioElement.pause();
			
		} else {
			playerState = "play";
			audioElement.play();
		}
	}
	function next(){
		currentSongIndex = (currentSongIndex + 1) % $musicList.length;
		playerState = "play";
		setBackground();
		audioElement.src = `./files/audio/${$musicList[currentSongIndex].audio}`;
		
	}

	function setSong(i){
		currentSongIndex = i;
		playerState = "play";
		setBackground();
		audioElement.src = `./files/audio/${$musicList[currentSongIndex].audio}`;

	}
	
</script>

<main bind:this={mainElement} style="width: 100vw; height: 100vh;">
	<audio
		bind:this={audioElement}
		type="audio/mp3"scr={"./files/audio/"+$musicList[currentSongIndex].audio}
		autoplay="false"
	>
	
	</audio>
	<div class="player">
		<div class="current-song">
			<div class="avatar">
				<img src={"./files/image/" + $musicList[currentSongIndex].image} alt="AlbumCover">
			</div>
			<div class="song-control">
				<h2>{$musicList[currentSongIndex].name}</h2>
				<div class="control">
					<button on:click={prev}>
						<i class="fa fa-backward"></i>
					</button>
					<button on:click={playPause}>
						{#if playerState == "play"}
							<i class="fa fa-pause"> </i>
						{:else}
							<i class= "fa fa-play"> </i>
						{/if}
					</button>
					<button on:click={next}>
						<i class="fa fa-forward"></i>
					</button>
				</div>
			</div>
		</div>
		<div class="song-list">
			{#each $musicList as music,i}
				<div class="{i == currentSongIndex ? "active": ''}"
					on:click = {()=> setSong(i)}
				>
						<div class="avatar">
						<img src={"./files/image/" + music.image} alt="AlbumCover">
						</div>
						<div class="song-details">
						<h2>{music.name}</h2>
						<p>{music.artist}</p>
					</div>
				</div>
			{/each}
		</div>
		
	</div>

</main>

<style>
	main {
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100;
	}
	audio {
		display: none;
	}
	.player{
		position: absolute;
		
		left: 50%;
		transform: translate( -50%, 50%);
		width: 380px;
		height: 430px;
		display: flex;
		flex-direction: column;
		border-radius: 20px;
		overflow: hidden;
	}
	.player .current-song {
		height: 120px;
		padding: 10px;
		display: flex;
		background: rgba(255, 255, 255, 0.8);
		z-index: 2;
	}
	.player .current-song .avatar{
		width: 100px;
		height: 100px;
		padding: 10px;
		text-align: center;
	}
	.player .current-song .avatar img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
	}
	.player .current-song .song-control {
		padding-left: 10px;
		flex: 1;
	}
	.player .current-song .song-control h2 {
		margin-bottom: 15px;
		font-size: 20px;
		color: #111;
	}
	.player .current-song .song-control .control {
		display: flex;
		justify-content: space-between;
		padding-right: 40px;
	}
	.player .current-song .song-control .control button {
		outline: none;
		border: none;
		background: transparent;
		color: #111;
		font-size: 20px;
		cursor: pointer;
	}
	.player .song-list {
		height: calc(100% - 120px);
		background: rgba(255, 255, 255, 0.2);
		box-shadow: 0px 8px 32px 0 rgba(32, 38, 135, 0.2);
		backdrop-filter: blur(5px);
		border: 1px solid rgba(255, 255, 255, 0.4);
		overflow-y: auto;
	}
	.player .song-list ::-webkit-scrollbar {
		width: 4px;
		background: transparent;
	}
	.player .song-list ::-webkit-scrollbar-thumb {
		width: 4px;
		background: #fff;

	}
	.player .song-list > div {
		display: flex;
		border-bottom: 1px solid rgba(255, 255, 255, 0.25);
		cursor: pointer;
	}
	.player .song-list > div .avatar {
		width: 50px;
		height: 50px;
		text-align: center;
		padding: 10px;
	}
	.player .song-list > div .avatar img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
	}
	.player .song-list > div .song-details {
		padding: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.player .song-list > div .song-details h2 {
		font-size: 16px;
		margin: 0px 0px 2px;
		color: #fff;
	}
	.player .song-list > div .song-details p {
		color: #eee;
		font-size: 15px;
		margin: 0px;
	}
</style>