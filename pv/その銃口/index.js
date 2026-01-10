var bgm = document.getElementById("bgm");
var button = document.getElementById("play");
var bottom = document.getElementById("bottom");
var title = document.getElementById("title");
var currentTime = bgm.currentTime;

const bpm = 103, offset = 140, beat = 60 / bpm * 1000; // BPM, 第一拍偏移时长

var fontLoaded = false, bgmLoaded = false; // 字体的音乐有没有乖乖加载好呢?

bgm.addEventListener("canplaythrough", () => { // 如果能够不卡顿地播放完整个音频文件
	bgmLoaded = true; document.getElementById("wait").innerHTML+="音乐已加载完毕"; youCanGetIn();
	if (isMobile()){bgm.pause(); bgm.currentTime = 0; bgm.addEventListener("play", () => {main();});} // 依旧移动
});

document.fonts.ready.then(() => { // 如果字体都加载完毕
	fontLoaded = true; document.getElementById("wait").innerHTML+="字体已加载完毕"; youCanGetIn();
});

bgm.addEventListener("pause", () => {button.style.display = "block";});
if (!isMobile()){ // 要是电脑的话, 直接捕获播放事件就好了
	bgm.addEventListener("play", () => {main();});
} else { // 要不然的话还得让它再加载一次才能捕获 canplaythrough…… 糟心啊
	bgm.load();
	bgm.play();
}

function isMobile() { // 判断是否为移动端
    return /Mobi|Android|iPhone/i.test(navigator.userAgent);
}

function youCanGetIn(){ // 如果都加载好了话, 就放你进去吧!
	if(fontLoaded && bgmLoaded){
		document.getElementById("wait").style.display = "none";
		document.getElementById("main").style.visibility = "visible"
	}
	return 0;
}

function centerPos(x){
	var xWidth = x.getBoundingClientRect().width, xHeight = x.getBoundingClientRect().height;
	x.style.left = "calc(50% - " + xWidth / 2 + "px)";
	x.style.bottom = "calc(50% - " + xHeight / 2 + "px)";
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
	
	// Verse 1
	var lyrics1 = ["敬虔な私だ", "自己を崇拝中です。ひたすら", "だって絶対裏切らないという保証があるから", "", 
	"謄本と食事とそれと最低限の自己犠牲", "何も面倒なことはない", "あとは睡眠取るだけ", ""];
	var interval1 = [1, 4, 4, 7, 1, 8, 4, 2];
	for (let i=0; i<lyrics1.length; i++){
		await wait(beat * interval1[i]); bottom.innerHTML = lyrics1[i];
	}
	
	// Verse 2
	var lyrics2 = ["ある日の夜深淵をちょっと見た", "銃口みたいで笑った", "どっかで見たことあった気した", "", 
	"また今度に深淵があったなら一回覗いとこうか", "ああ、ちょどいい平和で", "なんて幸福", ""];
	var interval2 = [2, 4, 4, 7, 1, 8, 4, 2];
	for (let i=0; i<lyrics2.length; i++){
		await wait(beat * interval2[i]); bottom.innerHTML = lyrics2[i];
	}
	return 0;
}

function wait(x) {
    return new Promise(resolve => setTimeout(resolve, x));
}
