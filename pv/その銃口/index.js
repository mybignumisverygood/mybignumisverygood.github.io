var bgm = document.getElementById("bgm");
var button = document.getElementById("play");
var bottom = document.getElementById("bottom");
var title = document.getElementById("title");
var currentTime = bgm.currentTime;
const bpm = 103, offset = 140, beat = 60 / bpm * 1000; // BPM, 第一拍偏移时长
const vh = window.innerHeight * 0.01, vw = window.innerWidth * 0.01;

var fontLoaded = false, bgmLoaded = false;

bgm.addEventListener("canplaythrough", () => {
	bgmLoaded = true; youCanGetIn();
});

document.fonts.ready.then(() => {
	fontLoaded = true; youCanGetIn();
});

bgm.addEventListener("pause", () => {button.style.display = "block";});
bgm.addEventListener("play", () => {main();});

function youCanGetIn(){
	if(fontLoaded && bgmLoaded){
		document.getElementById("wait").style.display = "none";
		document.getElementById("main").style.visibility = "visible"
	}
	return 0;
}

function centerPos(x){
	var xWidth = x.getBoundingClientRect().width, xHeight = x.getBoundingClientRect().height;
	x.style.left = "calc(50% - " + xWidth / 2 + "px)"; x.style.bottom = "calc(50% - " + xHeight / 2 + "px)";
	return [xWidth, xHeight];
}

async function main(){
	button.style.display = "none";
	await wait(offset + beat * 3);
	centerPos(title);
	window.addEventListener('resize', () => {centerPos(title);});
	title.style.visibility = "visible";
	await wait(beat * 16);
	title.style.fontSize = "5vh"; title.style.letterSpacing = "1vh";
	title.innerHTML = "歌唱：可不"; centerPos(title);
	await wait(beat * 15);
	title.style.visibility = "hidden";
	window.removeEventListener('resize', () => {centerPos(title);});
	
	var lyrics1 = ["敬虔な私だ", "自己を崇拝中です。ひたすら", "だって絶対裏切らないという保証があるから"];
	var interval1 = [1, 4, 4];
	for (let i=0; i<=2; i++){
		await wait(beat * interval1[i]); bottom.innerHTML = lyrics1[i];
	}
	return 0;
}

function wait(x) {
    return new Promise(resolve => setTimeout(resolve, x));
}