var bgm = document.getElementById("bgm");
var button = document.getElementById("play");
var bottom = document.getElementById("bottom");
var sono = document.getElementById("sono");
var utau = document.getElementById("utau");
var waitE = document.getElementById("wait");
var currentTime = bgm.currentTime;

const bpm = 103, offset = 140, beat = 60 / bpm * 1000; // BPM, 第一拍偏移时长

var fontLoaded = false, bgmLoaded = false; // 字体的音乐有没有乖乖加载好呢?

bgm.addEventListener("canplaythrough", () => { // 如果能够不卡顿地播放完整个音频文件
	bgmLoaded = true; waitE.innerHTML += "（音乐已加载完毕）"; youCanGetIn();
	if (isMobile()){bgm.pause(); bgm.currentTime = 0; bgm.addEventListener("play", () => {main();});} // 依旧移动
});

document.fonts.ready.then(() => { // 如果字体都加载完毕
	fontLoaded = true; waitE.innerHTML += "（字体已加载完毕）"; youCanGetIn();
});

document.fonts.onloadingdone = () => {
	fontLoaded = true; waitE.innerHTML += "（字体已加载完毕）"; youCanGetIn();
};

bgm.addEventListener("pause", () => {button.style.display = "block";});
if (!isMobile()){ // 要是电脑的话, 直接捕获播放事件就好了
	bgm.addEventListener("play", () => {main();});
} else { // 要不然的话还得让它再加载一次才能捕获 canplaythrough…… 糟心啊
	waitE.innerHTML += "，注意到您正在使用移动设备，加载速度可能会比电脑端要慢一些（实际上，我不推荐使用移动端访问本页面），请见谅w";
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
	centerPos(sono);
	window.addEventListener('resize', () => {centerPos(sono);});
	sono.style.visibility = "visible";
	await wait(beat * 16);
	sono.style.visibility = "hidden";
	
	centerPos(utau);
	window.addEventListener('resize', () => {centerPos(utau);});
	utau.style.visibility = "visible";
	await wait(beat * 15);
	utau.style.visibility = "hidden";
	window.removeEventListener('resize', () => {centerPos(utau);});
	
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
	var interval2 = [2, 4, 4, 6.5, 1.5, 8, 4, 2];
	for (let i=0; i<lyrics2.length; i++){
		await wait(beat * interval2[i]); bottom.innerHTML = lyrics2[i];
	}
	
	// Verse 3
	var lyrics3 = ["正しいと思える世界で", "間違いに塗れてみたいな", "ララバイこの歌終わるまで後ろ向いちゃだめだよ", "", 
	"一番星が輝いてる／細かな未来が待ってる", "軽快なリズムに合わせて共にダンスをしましょう", ""];
	var interval3 = [2, 4, 4, 7.5, 0.5, 8, 7.5];
	for (let i=0; i<lyrics3.length; i++){
		await wait(beat * interval3[i]); bottom.innerHTML = lyrics3[i];
	}
	
	// かんそう！
	await wait(beat * 0.5); sono.style.visibility = "visible";
	return 0;
}

function wait(x) {
    return new Promise(resolve => setTimeout(resolve, x));
}
