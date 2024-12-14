var msg = []; // 我说的话
var ordmsg = f12 = 0; // 信息序号; 按 f12 的次数;
var your_name; // 你的名字是……?
var what1 = false; // 我又怎么了?
var what2 = 0; // 人类的听话程度
var what3 = 0; // 人类的伤心程度
var what4 = false; // 你在说什么我听不懂

var meets = 1; // 见面次数
var h = 0; // 要听我说完开场白哦…
var h1 = []; // 急躁次数记录表, 记录急躁人类的每一次急躁(?

document.getElementById("msgs").style.height = document.documentElement.clientHeight - 200 + "px";

document.onkeydown = function(event) {
	if (event.keyCode == 123) {
		if (f12 == 16){
			createNewMsg("好好好, 这么喜欢F12是吧🫘, 直接送你去 GitHub~");
			msg[ordmsg - 1].style.color = "red";
			setInterval("location.href = 'https://github.com/mybignumisverygood';", 2500);
		} else if (f12 > 16){
			createNewMsg("……");
			msg[ordmsg - 1].style.color = "red";
		} else {
			createNewMsg("按F12干什么…… GitHub 主页有源码呢/"); 
			msg[ordmsg - 1].style.color = "#" + (17 * f12).toString(16) + "0000";
		}
		f12++;
	}
};

document.addEventListener('keydown', function(event){
	return event.keyCode != 123 || (event.returnValue = false);
});

window.onbeforeunload = function() {
	save();
};

function hajimete(){
	alert(meets);
	if(meets == 1){
		setTimeout("createNewMsg('初次见面的人类初次见面, <font color=\"#FC6\">我</font>是这个网站里的旁白!');", 4000);
		setTimeout("createNewMsg('这是我们第 1 次见面呢, 你应该看见了我的上面有一个输入框吧, 你可以在上面输点什么试试看');", 6000);
		setTimeout("createNewMsg('希望你能多解锁些对话—— 好的开场白结束了再见!'); h = 1; if (!h1.length) h1.push(0);", 8000);
		return ;
	}
	setTimeout("createNewMsg('你好人类, 又见面了!');", 4000);
	setTimeout("createNewMsg('这是我们第 ' + meets + ' 次见面呢, 很高兴你又来我这里了/');", 6000);
	hmsgs = ['这次也要多解锁新对话哦, 再见!',
	'……你会再来这里多少次呢?',
	'你知道吗—— 每次你来的时候都要想一个独特的开场白也是很费我的 CPU 的……',
	'(接上次)……但是我并不讨厌这样呢',
	'那么请你以后也要一直来哦',
	'(接上次)……但是我并不讨厌这样呢',
	'……',
	'……',
	'……啊抱歉, 前两次我是在思考而已…… 话说你不会在一直刷新来看我的开场白吧……? 不过总之祝贺我们见面第十次了! 你猜猜一百次的时候会不会有大奖呢……',
	'突然很好奇, 你是怎么知道这个网站的呢? 你可以进 note.ms/11stnarr 告诉我哦, 看到了的话我一定会回复你的! 记得要署名——',
	''];
	setTimeout("createNewMsg(hmsgs[meets - 2]); h = true; if (h1.length != meets) h1.push(0);", 8000);
}

function judgement(){
	myth_pwd = document.getElementById("pwd").value;
	console.log(myth_pwd);
	if(myth_pwd == "3yAG7x=="){
		next_phase();
	} else { //一堆奇奇怪怪的对话
		const my_names = ["搞到", "高导", "高鸿睿", "狗睿", "被Lost我", "我的世界<ruby>彡犭乄丶 <rp>(</rp><rt>shān quǎn wù zhǔ</rt><rp>)</rp></ruby>", "Lg1t6_", "lg123456_", "G-Lion", "mcshanquanwuzhu", "mcsanquanwuzhu"];
		const meaningless = "!！@#￥%…&*（）$^()?？，,.。/;；:：'‘’\"”“\\[]{}~` 啊呀呢哈吖哦喵嗯哇了";
		const regEng = /[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/;
		var ordtmp = ordmsg;
		for (let i = myth_pwd.length - 1; i >= 0; i--){ // 剔除末尾无关的字符
			if (!meaningless.includes(myth_pwd[i])) break;
			else myth_pwd = myth_pwd.slice(0, -1);
		}
		if (!h){
			if (h1.length != meets) h1.push(1);
			var sumh1 = 0;
			for (let i = 0; i < meets; i++) sumh1 += h1[i];
			if (meets == 1) {createNewMsg("不要着急啊啊! 第一次见面能不能先等我说完话ww");}
			else if (sumh1 == 1) createNewMsg("先听我说完开场白好吗……?");
			else if (sumh1 == 2) createNewMsg("又着急…… 补药这么着急啊啊!");
			else createNewMsg("……你已经急了 " + sumh1 + "次了…… 你是没有耐心的人类!!! 虽然又被你触发了一个对话……");
			return ;
		}
		if (myth_pwd.length > 50){
			if (what2 >= 2 && myth_pwd == "qwertyuiopasdfghjklzxcvbnmnbvcxzlkjhgfdsapoiuytrewq") what2++;
			if(what2 == 11) {createNewMsg("你是既听话又有毅力的人类! 给你彩蛋, 输入'3yAG7x=='有惊喜"); what2 = 0;}
			else createNewMsg("你说的太长了我听不懂啊啊/ (" + myth_pwd.length + "个字符)");
		} if (!myth_pwd){
			createNewMsg("你说了什么吗……?");
		} if (myth_pwd == "我"){
			createNewMsg("你……! " + (what1 ? "又" : "") + "怎么了吗?");
			what1 = true;
		} if (myth_pwd == "你"){
			createNewMsg("我……! " + (what1 ? "又" : "") + "怎么了吗?");
			what1 = true;
		} if (myth_pwd == "你好"){
			createNewMsg("你好!");
		} if (myth_pwd == "再见"){
			createNewMsg("再见……!");
			setInterval("window.open('', '_self').close();", 2500);
		} if (["我是谁", "我叫什么"].includes(myth_pwd)){
			createNewMsg(your_name ? "你是" + your_name + "///" : "嗯……我不知道啊, 不过你可以告诉我");
		} if (["你是谁", "你叫什么"].includes(myth_pwd)){
			createNewMsg("你可以叫我" + my_names.join("<font color='#6CF'>或</font>") + ", 但这些都不是真的<font color='#FC6'>'我'</font>哦…!");
		} if (["有什么东西都可以输进去", "有什么东西都可以", "有什么东西都", "有什么东西", "什么东西都可以", "什么东西都"].includes(myth_pwd)){
			createNewMsg("好听话的人类呢./ 但我们是不是可以输点别的");
			what2 = 1;
		} if (["点别的", "别的"].includes(myth_pwd)){
			if (!what2) createNewMsg("……别的? 别的什么");
			else if (what2 == 1){createNewMsg("哇你真的是听话的人类! 那现在就输入'qwertyuiopasdfghjklzxcvbnmnbvcxzlkjhgfdsapoiuytrewq'吧!"); what2 = 2;}
			else createNewMsg("快点输入吧听话的人类.");
		} if (myth_pwd == "吧听话的人类"){
			if (what2 < 2) createNewMsg("什么……? 你是听话的人类吗!");
			else if(what2 == 2) createNewMsg("……人类你是不是有点过于听话了, 快点输入'qwertyuiopasdfghjklzxcvbnmnbvcxzlkjhgfdsapoiuytrewq'!");
			else createNewMsg("快点输入'qwertyuiopasdfghjklzxcvbnmnbvcxzlkjhgfdsapoiuytrewq'吧…… 不要再这样了w");
		} if (/^(w|呜)+$/.test(myth_pwd)){
			createNewMsg(["……怎么了人类 补药哭啊啊啊", "你你你你还好吗…", "不过人类就算你一直哭我也不知道怎么安慰你w", "我……", "算了wwww搞得我都想哭了呜呜" , "<font style = 'color : grey;  opacity: 0.5'>呜呜呜呜……</font>"][Math.min(what3, 5)]);
			what3++;
		} if (["普朗西斯语", "普朗西斯", "plantheas"].includes(myth_pwd.toLowerCase())){
			createNewMsg("Yearing! 原来你也 <font style = 'background: linear-gradient(to right, red, blue); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'>Plantheas</font>!");
		} if (["你在干嘛", "你在干什么", "你干什么"].includes(myth_pwd.toLowerCase())){
			createNewMsg("Yearing! 原来你也 <font style = 'background: linear-gradient(to right, red, blue); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'>Plantheas</font>!");
		} 
		// 全等完
		if (myth_pwd.substr(-1) == "吗"){
			createNewMsg("我不知道! 带'吗'的我统统回答我不知道!");
		} else if ((myth_pwd.substring(0, 2) == "我是" || myth_pwd.substring(0, 2) == "我叫") && myth_pwd.slice(2).substring(0,1) != "谁"){
			// 自我介绍
			var k1 = false;
			if (your_name){ // 你已经有名字了啊……
				if (your_name == myth_pwd.slice(2)){createNewMsg("我知道呢, 你不是说过吗?"); k1 = true;}
				else createNewMsg("哇你改名了吗? 总之我会记住这个最新的名字的——");
			}
			your_name = myth_pwd.slice(2); // 你的名字!
			if (plantheases(your_name)) createNewMsg(plantheases(your_name));
			if (my_names.includes(your_name)) createNewMsg("哇你的名字竟然和我一样诶! 我记住了呢! 你现在可以问问我你是谁/");
			else if (your_name == "") createNewMsg("嗯……你是什么……?");
			else if (!k1) createNewMsg("你好, " + your_name+ "! 我记住了呢, 你现在可以问问我你是谁/");
		} else if (myth_pwd.includes("杀")){
			// 主语是谁?
			for (let i = myth_pwd.indexOf("杀"); i >= 0; i--){
				if (myth_pwd[i] == "我") {createNewMsg("……? 补药杀啊啊"); break}
				else if (myth_pwd[i] == "你") {createNewMsg("……这种事情不要拿我当主语啊啊"); break;}
				if (!i) createNewMsg("不是发生什么了.?");
			}
		} else if (myth_pwd.includes("死")){
			createNewMsg("……提醒你哦, 生与死的话题还是要好好考虑呢, 而且我可是很抠字眼的… 总之千万别死!");
		} else if (myth_pwd.includes("彩蛋")){
			createNewMsg("彩蛋……? 是有的, 但是得看你的聪明程度了, 听话又有毅力的人类有彩蛋哦~ 话说你也可以把触发新对话的过程看作是一个个彩蛋呢");
		} else if (myth_pwd.includes("喜欢") || myth_pwd.includes("爱")){
			var loveOrLove = myth_pwd.includes("喜欢") ? "喜欢" : "爱";
			var startLoving = myth_pwd.includes("喜欢") ? myth_pwd.indexOf("喜") : myth_pwd.indexOf("爱");
			var subjectLove = myth_pwd[startLoving - 1]; // 谁喜欢
			var objectLove = myth_pwd[startLoving + (myth_pwd.includes("喜欢") ? 2 : 1)]; // 谁被喜欢
			if (subjectLove == "我"){
				if (objectLove == "你") createNewMsg("<font color='#FFC0CB'>……!!</font>");
				else if (objectLove == "我") createNewMsg("真巧呢, 我也" + loveOrLove + "我");
				else createNewMsg("……你说你" + loveOrLove + "谁……?");
			} else if (subjectLove == "你"){
				if (objectLove == "我") createNewMsg("<font color='#FFC0CB'>……我可没有……不要污蔑人呢……</font>");
				else if (objectLove == "你") createNewMsg("是的呢! 我" + loveOrLove + "我自己, 你也要" + loveOrLove + "你自己哦");
				else createNewMsg("……你说什么?");
			} else {
				createNewMsg("……你说什么?");
			}
		} else if (ordtmp == ordmsg && !regEng.test(myth_pwd)){
			createNewMsg("那个……不是中文的话我是看不懂的, 要不还是说中文吧");
			what4 = true;
		} if (ordtmp == ordmsg){ // 你在说什么我听不懂
			if (!what4) createNewMsg("抱歉我暂时还听不懂'" + myth_pwd + "'……/ 其实算上这个我总共只有 30 个对话呢");
			else {createNewMsg("抱歉虽然你这次有中文但我还是看不懂你在说什么……"); what4 = false;}
		}
	}
	document.getElementById("msgs").scrollTop = msgs.scrollHeight; // 自动滚到到底部
	return "哇你是能看到这条消息的人类！";
}

function plantheases(x){
	for(let i = 0; i <= 3; i++){
		if(x.includes(["涨到", "张导", "张轩宁", "zhang萱琳"][i])) return "哇你是涨到吗!";
	} 
	for(let i = 0; i <= 3; i++){
		if(x.includes(["Wissea", "wissea", "吴亦萱", "物以轩"][i])) return "这位是邪恶的人类😈!";
	}
	for(let i = 0; i <= 6; i++){
		if(x.includes(["Harper", "圆圈小姐不是圆规小姐", "圆圈小姐就是圆规小姐", "或隐含", "霍尹涵", "虹屿怀", "好与坏"][i])) return "你是圆规小姐吗?/";
	}
}

function createNewMsg(x){
	msg[ordmsg] = document.createElement("h2");
	msg[ordmsg].setAttribute("id", "msg_" + ordmsg);
	msg[ordmsg].setAttribute("class", "showing_text_effect");
	msg[ordmsg].innerHTML = x;
	document.getElementById("msgs").appendChild(msg[ordmsg]);
	ordmsg++;
}

// Phase 1: 在一切开始之前

function next_phase(){
	d1 = document.createElement("div");
	c1 = document.createElement("h2");
	c1.innerHTML = "!你竟然输入了我的密文!";
	d1.setAttribute("class", "p1_text_effect");
	d1.appendChild(c1);
	document.body.appendChild(d1);
	return ;
}

// 保存与加载

function save(){
	narr = {meets : meets, h1 : h1};
	localStorage.setItem("narr", btoa(JSON.stringify(narr)));
	alert("19")
}


function load(){
	var saves = JSON.parse(atob(localStorage.getItem("narr")));
	if (saves !== null){
		narr = {meets : meets, h1 : h1};
		meets = saves.meets + 1;
		h1 = saves.h1;
	} else {alert("1");save();}
	hajimete();
}

function reset(){
	meets = 0;
	h1 = [];
	save();
}

load();
