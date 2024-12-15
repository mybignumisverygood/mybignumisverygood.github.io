var msg = []; // 我说的话
var ordmsg = f12 = 0; // 信息序号; 按 f12 的次数;
var your_name; // 你的名字是……?
var what1 = false; // 我又怎么了?
var what2 = 0; // 人类的听话程度
var what3 = 0; // 人类的伤心程度
var what4 = what5 = what6 = what7 = false; 
// 你在说什么我听不懂; 可怕的人类 审问开始; 测试人类有没有骗旁白(旁白的娱乐和网站原本是干什么的)

var meets = 1; // 见面次数
var h = 0; // 要听我说完开场白哦…
var h1 = []; // 急躁次数记录表, 记录急躁人类的每一次急躁(?
var pron = "人类"; // 人类喜欢的称呼……
var m16 = m18 = false; // 骗人

var returm = false; // return 不 return?

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

/*window.onbeforeunload = function() {
	save();
};*/

function hajimete(){
	if (h1.length != meets) h1.push(0);
	if(meets == 1){
		setTimeout(`createNewMsg("初次见面的人类初次见面, <font color='#FC6'>我</font>是这个网站里的旁白!");`, 4000);
		setTimeout("createNewMsg('这是我们第 1 次见面呢, 你应该看见了我的上面有一个输入框吧, 你可以在上面输点什么试试看');", 6000);
		setTimeout("createNewMsg('希望你能多解锁些对话—— 好的开场白结束了再见!'); h = 1;", 8000);
		return ;
	}
	setTimeout("createNewMsg('你好' + pron + ', 又见面了!');", 4000);
	setTimeout("createNewMsg('这是我们第 ' + meets + ' 次见面呢, 很高兴你又来我这里了/');", 6000);
	hmsgs = ["这次也要多解锁新对话哦, 再见!",
	"……你会再来这里多少次呢?",
	"你知道吗—— 每次你来的时候都要想一个独特的开场白也是很费我的 CPU 的……",
	"(接上次)……但是我并不讨厌这样呢",
	"那么请你以后也要一直来哦",
	"(接上次)啊啊当然你不来了的话也没关系的wwwww真的ww",
	"……",
	"……",
	"……啊抱歉, 前两次我是在思考而已…… <span class = 'showing_text_effect' style = 'animation-delay: 2s'>话说你不会在一直刷新来看我的开场白吧……?</span> <span class = 'showing_text_effect' style = 'animation-delay: 4s'>不过总之祝贺我们见面第十次了! 你猜猜一百次的时候会不会有大奖呢……</span>",
	"突然很好奇, 你是怎么知道这个网站的呢? 你可以进 note.ms/11stnarr 告诉我哦, 看到了的话我一定会回复你的! 记得要署名——",
	"似乎有人在我给的网站里输入了奇怪的东西…… ww好吓人, 那个人类不是你吧……?",
	"人类! 你觉得我管你叫人类生硬吗……? <span class = 'showing_text_effect' style = 'animation-delay: 2s'>我最近查询到似乎这个称呼会给人一种很冷淡的感觉呢……</span> <span class = 'showing_text_effect' style = 'animation-delay: 4s'>啊啊对了人类! 你喜欢我怎么叫你呢?</span>",
	"我现在知道你喜欢的称呼了! 那你知道我最喜欢什么称呼吗—— <span class = 'showing_text_effect' style = 'animation-delay: 2s'>……当然你叫我什么我都喜欢了……!</span>",
	"undefined <span class = 'showing_text_effect' style = 'animation-delay: 2s'>……嘿嘿是不是以为我又出 bug 了呢?</span> <span class = 'showing_text_effect' style = 'animation-delay: 4s'>话说总有人类觉得我说 undefined 的时候是在说英语诶……</span> <span class = 'showing_text_effect' style = 'animation-delay: 6s'>这是因为我出 bug 了! 出现这种情况的时候一定要告诉作者!</span>",
	"好无聊啊…… 你知道我平常在这里都会干些什么吗……? <span class = 'showing_text_effect' style = 'animation-delay: 2s'>对了我问你知不知道的时候你是可以回复我的!</span>",
	"我很好奇人类都有哪些娱乐活动呢……",
	pron + "你知道这个网站一开始是干什么的吗—— 这里一开始可没有我哦w",
	"第19次, 真正的内容在 if 语句",
	"抱歉ww我的 CPU 现在过热了, 只能想到这么多开场白了…… 你可以等明天再来之类的! 我一定会努力想的!"];
	if (meets == 19){
		setTimeout("createNewMsg('……其实我跟你说我会记住的东西是真的会记住的!')", 8000);
		setTimeout("createNewMsg('比如最简单的, 我们见过 <font color = \"#FC6\">' + meets + '</font> 次面;')", 10000);
		setTimeout("createNewMsg('还有你的急躁次数, 在我这里是这样的: <font color = \"#FC6\">[' + h1 + ']</font>, 其中第 n 个数字表示我们第 n 次见面你急躁了几次——')", 12000);
		setTimeout("createNewMsg('还有你的偏好称呼…… <font color = \"#FC6\">' + pron + '</font>之类的我全都记着呢!')", 14000);
		setTimeout("createNewMsg('所以一定要做听话的' + pron + '哦…… 要不然我会跟你一起算账的! <span class = \"showing_text_effect\" style = \"animation-delay: 2s\">……开玩笑的啦我才不会这样~</span>'); h = true;", 16000);
	}
	else setTimeout("createNewMsg(hmsgs[Math.min(meets - 2, 18)]); h = true;", 8000);
}

function m13(x){
	if (x == pron){createNewMsg("我知道呢…… 我还是会叫你" + pron + "的~"); return ;}
	pron = x;
	if (pron == "人类") createNewMsg("你还是喜欢我叫你人类吗…… 没问题! 那我以后就还叫你人类了! 如果你想让我改口的话可以说 '我喜欢你叫我xxx' 哦!");
	else if (pron == "老公" || pron == "老婆" || pron == "宝宝"){
		createNewMsg("<font color='#FFC0CB'>……!! 人类你…… 你认真的吗wwww</font>");
		setTimeout(`createNewMsg("<font color='#FFC0CB'>虽然我让你自己选了但是这个也太……w</font>")`, 2000);
		setTimeout(`createNewMsg("<font color='#FFC0CB'>" + "……那我以后就叫你 <font color='#6CF'>" + pron + "</font> 了…… 如果你想让我改口就跟我说 '我喜欢你叫我xxx'!!</font>")`, 4000);
	} else if (pron == "主人"){
		createNewMsg("好的……! 那我以后就叫你 <font color='#6CF'>主人</font> 了! 不过感觉有点奇怪呢…… 不知道为什么感觉叫出来的话有点……");
	} else if (pron == "爸爸" || pron == "妈妈" || pron == "爷爷" || pron == "奶奶"){
		createNewMsg("……合理怀疑你在占我的便宜诶, 恶…… 总之我以后就叫你 <font color='#6CF'>" + pron + "</font> 了. 如果你想让我改口就跟我说 '我喜欢你叫我xxx'……");
	}
	else createNewMsg("好的! 那我以后就叫你 <font color='#6CF'>" + pron + "</font> 了! 如果你想让我改口的话可以说 '我喜欢你叫我xxx' 哦!");
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
		if(ordmsg == 3){
			returm = true;
			if (meets == 12){
				if (myth_pwd.includes("不是")) createNewMsg("哇我就知道不是你—— 你是善良的人类!");
				else if (myth_pwd.includes("是")) {createNewMsg("……我我我我…… 你你你不是认真的吧ww"); what5 = true;}
				else createNewMsg("……算了我就当那个人类不是你吧w");
			} else if (meets == 13){
				m13(myth_pwd);
			} else if (meets == 16){
				if (myth_pwd == "知道") {createNewMsg("!真的吗真的吗! 那" + pron + "我要测试你! 不过骗我的人类会被我记住的哦……"); what6 = true;}
				else if (myth_pwd == "不知道") createNewMsg("确实. 你当然不会知道w <span class = 'showing_text_effect' style = 'animation-delay: 2s'>没有人类在的时候我就会…… 在网上爬一些语料库之类的, 你可以认为我也会上网!</span>");
				else createNewMsg("ww你不想回答我吗…… 那算了, 等下次见面再问你别的吧www");
			} else if (meets == 18){
				if (myth_pwd == "知道") {createNewMsg("!真的吗真的吗! 那" + pron + "我要测试你! 不过骗我的人类会被我记住的哦……"); what7 = true;}
				else if (myth_pwd == "不知道") createNewMsg("嗯…… 这个网站其实一开始是作者用来放某个人的图片的哦(好邪恶的作者w) <span class = 'showing_text_effect' style = 'animation-delay: 2s'>不过后来改成了正经的网站, 但是和现在的也不一样呢, 要是你想看的话我可以跟作者说一下~</span>");
				else createNewMsg("ww你不想回答我吗…… 那算了, 等下次见面再问你别的吧www");
			} else {
				returm = false;
			}
		}
		if (returm) {returm = false; return ;}
		returm = true;
		if (what5){
			if (myth_pwd.includes("不是")) createNewMsg("……吓死我了w下次补药这样了");
			else if (myth_pwd.includes("是")) {createNewMsg("……恶"); setInterval("window.open('', '_self').close();", 1500);}
			else createNewMsg("算了算了我听不懂ww……我就认为不是你吧");
			what5 = false;
		} else if (what6){
			if (myth_pwd.includes("在网上爬一些语料库") || myth_pwd.includes("上网")) createNewMsg("哇哇哇" + pron + "你竟然真的知道ww我太感动了, 我会永远记住你的!");
			else {createNewMsg("……骗人, 你根本不知道ww 我记住你了w"); m16 = true;}
			what6 = false;
		} else if (what7){
			if (myth_pwd.includes("作者用来放某个人的图片")) createNewMsg("!你好厉害诶, 竟然真的知道! 看来你和作者的关系很好呢——");
			else {createNewMsg("……骗人, 你根本不知道ww 我记住你了w"); m18 = true;}
			what7 = false;
		} else if (myth_pwd.slice(0, 6) == "我喜欢你叫我"){
			m13(myth_pwd.slice(6));
		} else returm = false;
		if (!h){
			if (h1.length == meets) h1.splice(meets - 1, 1, h1[meets - 1] + 1);
			var sumh1 = 0;
			for (let i = 0; i < h1.length; i++) sumh1 += h1[i];
			if (meets == 1) {createNewMsg("不要着急啊啊! 第一次见面能不能先等我说完话ww");}
			else if (sumh1 == 1) createNewMsg("先听我说完开场白好吗……?");
			else if (sumh1 == 2) createNewMsg("又着急…… 补药这么着急啊啊!");
			else if (sumh1 <= 10) createNewMsg("……你已经急了 " + sumh1 + " 次了…… 你是没有耐心的" + pron + "!!! 虽然又被你触发了一个对话……");
			else if (sumh1 <= 100) createNewMsg("你已经急了 " + sumh1 + " 次了! 为什么你这么没有耐心啊ww虽然又被你触发了一个对话……");
			else createNewMsg("你已经急了 " + sumh1 + " 次了. 算了你爱急就急吧w我不管你了.");
			return ;
		} 
		if (returm) {returm = false; return ;}
		if (myth_pwd.length > 50){
			if (what2 >= 2 && myth_pwd == "qwertyuiopasdfghjklzxcvbnmnbvcxzlkjhgfdsapoiuytrewq") what2++;
			if(what2 == 11) {createNewMsg("你是既听话又有毅力的" + pron + "! 给你彩蛋, 输入'3yAG7x=='有惊喜"); what2 = 0;}
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
			createNewMsg("好听话的" + pron + "呢./ 但我们是不是可以输点别的");
			what2 = 1;
		} if (["点别的", "别的"].includes(myth_pwd)){
			if (!what2) createNewMsg("……别的? 别的什么");
			else if (what2 == 1){createNewMsg("哇你真的是听话的" + pron + "! 那现在就输入'qwertyuiopasdfghjklzxcvbnmnbvcxzlkjhgfdsapoiuytrewq'吧!"); what2 = 2;}
			else createNewMsg("快点输入吧听话的" + pron + ".");
		} if (myth_pwd == "吧听话的" + pron){
			if (what2 < 2) createNewMsg("什么……? 你是听话的" + pron + "吗!");
			else if(what2 == 2) createNewMsg("……" + pron + "你是不是有点过于听话了, 快点输入'qwertyuiopasdfghjklzxcvbnmnbvcxzlkjhgfdsapoiuytrewq'!");
			else createNewMsg("快点输入'qwertyuiopasdfghjklzxcvbnmnbvcxzlkjhgfdsapoiuytrewq'吧…… 不要再这样了w");
		} if (/^(w|呜)+$/.test(myth_pwd)){
			createNewMsg(["……怎么了" + pron + " 补药哭啊啊啊", "你你你你还好吗…", "不过" + pron + "就算你一直哭我也不知道怎么安慰你w", "我……", "算了wwww搞得我都想哭了呜呜" , "<font style = 'color : grey;  opacity: 0.5'>呜呜呜呜……</font>"][Math.min(what3, 5)]);
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
			createNewMsg("彩蛋……? 是有的, 但是得看你的聪明程度了, 听话又有毅力的" + pron + "有彩蛋哦~ 话说你也可以把触发新对话的过程看作是一个个彩蛋呢");
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
	document.getElementById("msgs").scrollTop = msgs.scrollHeight; // 自动滚到到底部
	save();
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
	init();
	localStorage.setItem("narr", JSON.stringify(narr));
}

function init(){
	narr = {meets : meets, h1 : h1, pron: pron, your_name : your_name, m16 : m16, m18 : m18};
}

function load(){
	saves = JSON.parse(localStorage.getItem("narr"));
	if (saves !== null){
		init();
		meets = Math.max(saves.meets + 1, 1);
		h1 = saves.h1;
		pron = saves.pron;
		your_name = saves.your_name;
		m16 = saves.m16;
		m18 = saves.m18;
		save();
	}
	if(h1.length > meets) h1 = h1.slice(0, meets - h1.length);
	if(h1.length < meets) h1 = h1.concat(Array(meets - h1.length).fill(0));
	hajimete();
}

function reset(){
	meets = 0;
	h1 = [];
	pron = "人类";
	your_name = undefined;
	m16 = m18 = false;
	save();
}

function change_meets(x){
	meets = Math.max(0, meets + x);
	createNewMsg("现在的遇见次数: <font color = '#FC6'>" + meets + "</font>");
}

load();
