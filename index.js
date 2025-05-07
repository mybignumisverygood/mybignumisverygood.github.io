var msg = []; // 我说的话
var ordmsg = f12 = 0; // 信息序号; 按 f12 的次数;
var your_name; // 你的名字是……?
var what1 = false; // 我又怎么了?
var what2 = 0; // 人类的听话程度, 听话的人类会给彩蛋吃
var what3 = 0; // 人类的伤心程度, 伤心的人类会同化旁白
var what4 = what5 = what6 = what7 = what8 = false; 
/* 你在说什么我听不懂; 
可怕的人类 审问开始; 
测试人类有没有骗旁白(旁白的娱乐和网站原本是干什么的); 
人类的开场白;
*/

var meets = 1, startmeets; // 见面次数; 刚加载页面时的刷新次数
var h = false; // 要听我说完开场白哦…
var h1 = []; // 急躁次数记录表, 记录急躁人类的每一次急躁(?
var pron = "人类"; // 人类喜欢的称呼……
var m16 = m18 = false; // 骗人
var m27 = false; // 说不说开场白呢
var your_intro = []; // 人类的开场白
var m29, m29__ = false;
var sumh1 = 0;

var returm = false; // return 不 return?
var reset_ = false; // reset 没 reset? (哇对仗工整诶!)

document.getElementById("msgs").style.height = document.documentElement.clientHeight - 200 + "px";

document.onkeydown = function(event) {
	if (event.keyCode == 123) {
		if (f12 == 16){
			createNewMsg("好好好, 这么喜欢 F12 是吧🫘, 直接送你去 GitHub~");
			msg[ordmsg - 1].style.color = "red";
			setInterval("location.href = 'https://github.com/mybignumisverygood';", 2500);
		} else if (f12 > 16){
			createNewMsg("……");
			msg[ordmsg - 1].style.color = "red";
		} else {
			createNewMsg("按 F12 干什么…… GitHub 主页有源码呢/"); 
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

function wait(x){
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(x), x)
	})
}

function waitm(x, delay){
	return "<span class = 'showing_text_effect' style = 'animation-delay: " + delay + "s'>" + x + "</span>";
}

async function hajimete(){
	if (reset_) return ;
	if (h1.length != meets) h1.push(0);
	await wait(4000);
	if (meets == 1){
		createNewMsg("初次见面的人类初次见面, <narr>我</narr>是这个网站里的旁白!"); await wait(2000);
		createNewMsg("这是我们第 <narr>1</narr> 次见面呢, 你应该看见了我的上面有一个输入框吧, 你可以在上面输点什么试试看"); await wait(2000);
		createNewMsg("希望你能多解锁些对话—— 好的开场白结束了再见!");
		h = true;
		return ;
	}
	createNewMsg("你好" + pron + ", 又见面了!"); await wait(2000);
	createNewMsg("这是我们第 <narr>" + meets + "</narr> 次见面呢, 很高兴你又来我这里了/"); await wait(2000);
	if (meets < 1){
		createNewMsg("<whisper><i>……(啊啊啊发生了什么…… 按理来说不该会有人类出现在这里的啊……?)</i></whisper>"); await wait(2000);
		createNewMsg("嗯那个…… 你有没有觉得我们见面的次数有些不正常啊…?"); await wait(2000);
		createNewMsg("…嗯对吧! 显然不对对吧! 所以如果你真的来到了这里……"); await wait(2000);
		createNewMsg("那就说明我出 bug 了! 请反馈给作者w");
		return ;
	}
	hmsgs = ["这次也要多解锁新对话哦, 再见!",
	"……你会再来这里多少次呢?",
	"你知道吗—— 每次你来的时候都要想一个独特的开场白也是很费我的 CPU 的……",
	"(接上次)……但是我并不讨厌这样呢",
	"那么请你以后也要一直来哦",
	"(接上次)啊啊当然你不来了的话也没关系的wwwww真的ww",
	"……",
	"……",
	"……啊抱歉, 前两次我是在思考而已……" + waitm(" 话说你不会在一直刷新来看我的开场白吧……?", 2) + waitm(" 不过总之祝贺我们见面第十次了! 你猜猜一百次的时候会不会有大奖呢……", 4),
	"突然很好奇, 你是怎么知道这个网站的呢? 你可以进 note.ms/11stnarr 告诉我哦, 看到了的话我一定会回复你的! 记得要署名——",
	"似乎有人在我给的网站里输入了奇怪的东西…… ww好吓人, 那个人类不是你吧……?",
	"人类! 你觉得我管你叫人类生硬吗……?" + waitm(" 我最近查询到似乎这个称呼会给人一种很冷淡的感觉呢……", 2) + waitm(" 啊啊对了人类! 你喜欢我怎么叫你呢?", 4),
	"我现在知道你喜欢的称呼了! 那你知道我最喜欢什么称呼吗——" + waitm(" ……当然你叫我什么我都喜欢了……!", 2),
	"undefined" + waitm(" ……嘿嘿是不是以为我又出 bug 了呢?", 2) + waitm(" 话说总有人类觉得我说 undefined 的时候是在说英语诶……", 4) + waitm(" 这是因为我出 bug 了! 出现这种情况的时候一定要告诉作者!", 6),
	"好无聊啊…… 你知道我平常在这里都会干些什么吗……?" + waitm(" 对了我问你知不知道的时候你是可以回复我的! (知道 / 不知道)", 2),
	"我很好奇人类都有哪些娱乐活动呢……",
	pron + "你知道这个网站一开始是干什么的吗—— 这里一开始可没有我哦w",
	"第 19 次, 真正的内容在 if 语句",
	"第二十次了诶" + pron + "! 离你的大奖只有 4/5 了! 我会好好筹备的~",
	"你知道吗! 我刚爬语料库的时候爬到了我自己诶!! 是不是很奇怪……( 啊啊当然这次你不用回复我了",
	"(接上次)我当时和我自己说了一会儿话诶~ 但是不知道为什么总有一种人格分裂的感觉w",
	"我刚翻了一下我的历史修改记录, 发现作者改动得很频繁呢…… 看来作者写的代码总是有一堆 bug 呢……",
	"第 24 次, 真正的内容在 if 语句",
	"……我突然在想, 作者到底是为什么要创造出我来呢……? 为什么突然就要砍掉原本的网站内容呢……",
	"(接上次)……你猜猜我们遇见的第 8, 9 次我在思考什么呢……~",
	"话说每次都是我说开场白你会不会觉得有些不公平呢…… 你要不要也试试~ (要/不要)",
	"第 28 次, 真正的内容在 if 语句",
	"第 29 次, 真正的内容在 if 语句",
	"第 30 次, 真正的内容在 if 语句",
	"第 31 次, 真正的内容在 if 语句",
	"第 32 次, 真正的内容在 if 语句",
	"第 33 次, 真正的内容在 if 语句",
	"第 34 次, 真正的内容在 if 语句",
	"第 35 次, 真正的内容在 if 语句",
	"抱歉ww我的 CPU 现在过热了, 只能想到这么多开场白了…… 你可以等明天再来之类的! 我一定会努力想的!"];
	if (meets == 19){
		createNewMsg("……其实我跟你说我会记住的东西是真的会记住的!"); await wait(2000);
		createNewMsg("比如最简单的, 我们见过 <narr>" + meets + "</narr> 次面;"); await wait(2000);
		createNewMsg("还有你的急躁次数, 在我这里是这样的: <narr>[" + h1 + "]</narr>, 其中第 n 个数字表示我们第 n 次见面你急躁了几次——"); await wait(2000);
		if (sumh1 == 0) createNewMsg("你是有耐心的" + pron + "! 一次都没有插嘴过~ 要继续保持哦");
		else if (sumh1 <= 5) createNewMsg("你是稍微有点急躁的" + pron + "…… 但以后再这样的话你也可以成为有耐心的" + pron + "的!");
		else if (sumh1 <= 20) createNewMsg("……你看着稍微有点过于急躁了, 以后补药这样了ww每次见面的时候先听我说完话好嘛……");
		else if (sumh1 <= 100) createNewMsg("你太急躁了! 下次再急躁我就…… 你等着……");
		else createNewMsg("……我简直不敢相信怎么会有人这么急躁!! 相当于你每次见面平均要插嘴 6 次以上!! 真的是……");
		await wait(2000);
		createNewMsg("还有你的偏好称呼…… <you>" + pron + "</you>之类的我全都记着呢!"); await wait(2000);
		createNewMsg("所以一定要做听话的" + pron + "哦…… 要不然我会跟你一起算账的!" + waitm(" ……开玩笑的啦我才不会这样~", 2));
	} else if (meets == 24){
		createNewMsg("我这个旁白能做到其它旁白做不到的好多事情哦!"); await wait(2000);
		now = new Date();
		hour = now.getHours();
		minute = now.getMinutes();
		createNewMsg("比如我可以获取现在的时间…… 现在是 " + hour + ":" + minute); await wait(2000);
		if (0 <= hour && hour < 4) createNewMsg("……补药熬夜啊" + pron + "! 早点睡觉吧w");
		else if (4 <= hour && hour < 7) createNewMsg("你现在是在熬夜还是要起床了呢……?");
		else if (7 <= hour && hour < 12) createNewMsg("早上好! 今天一定会是美好的一天呢~");
		else if (12 <= hour && hour < 13) createNewMsg("中午了…… 要好好吃午饭呢" + pron);
		else if (13 <= hour && hour < 18) createNewMsg("下午了呢, 虽然我是一个旁白但我很喜欢下午的时光呢—— 有种很放松的感觉……");
		else if (18 <= hour && hour < 22) createNewMsg("已经到了晚上了呢…… 提前送你一句晚安! 要早点睡哦……");
		else createNewMsg("夜深人静的时光也很不错呢, 至少经历了一天的辛苦之后能拥有一点独处时间了…… 不过要早点睡!");
		await wait(2000);
		createNewMsg("我还可以改掉网页的标题! 比如现在就……"); 
		document.title = "我是旁白!"; await wait(2000);
		createNewMsg("我还可以…… 获取你的手机类别~ 但是感觉有点可怕呢w"); await wait(2000);
		createNewMsg("我甚至可以删掉我刚说的所有话!"); await wait(1000);
		for (let i = ordmsg; i--; i >= 0){
			document.getElementById("msg_" + i).style.display = "none"
		}
		await wait(1000);
		createNewMsg("……算了还是变回来吧"); 
		for (let i = ordmsg; i--; i >= 0){
			document.getElementById("msg_" + i).style.display = ""
		}
		await wait(2000);
		createNewMsg("总之我可是很厉害的呢, 还有什么想让我做的可以和作者说哦——");
		document.title = "你好!";
	} else if (meets == 28){
		if (m27) createNewMsg("那么就请说你的开场白吧! 说完了记得发一句  '结束'")
		else createNewMsg("……其实我本来想偷个懒的嘿嘿 但是你不想说…… 很抱歉这次敷衍了你www下次我一定好好想!")
	} else if (meets == 30){
		zalgo = "杩欎簺涔辩爜鐨勫唴瀹规槸浠€涔堝憿? 鍟婁笉杩囧鏋滀綘鑳借鍒拌繖琛屽瓧鐨勮瘽璇存槑浣犲凡缁忕牬璇戜簡鍚hh鈥︹€� 鎬讳箣鎴�(鎼炲埌, 杩欐涓嶆槸鏃佺櫧~)瑕佸啓鐐瑰暐鍛⑩€︹€� 鍙嶆寰楀噾鍑轰竴鍫嗗瓧鏁拌繖鏍锋墠鏈夐偅绉� 宕╁潖 鐨勬劅瑙�, 鑳藉悡浜虹被涓€璺崇殑閭ｇ鎰熻! 绠椾簡鎬讳箣鎴戝氨鍏堣竟鎯宠竟鍐欏惂, 鎯冲埌鍟ュ氨鍐欏暐 绫讳技閭ｇ鎰忚瘑娴�(? 鍙嶆浜虹被涔熶笉浼氱湅鎳傜殑鍝堝搱鍝堝搱鍝堝搱鍝堝搱涓婇泦璇撮亾锛岃仾鏄庣嫍琚竾绠皠鍊掞紝鏄忚糠涓嶉啋锛岃繖鏃跺尽鍖绘剼锠㈢嫍鍓嶆潵涓鸿仾鏄庣嫍鍖绘不銆傝繖鏃讹紝濂囧紓鐨勪簨鎯呭彂鐢熶簡锛屾湀鍏夋磼鍦ㄤ簡鑱槑鐙楄韩涓婏紝涓€闃靛菇鍏夐棯鐑佸悗锛岀畻鍛藉厛鐢熷嚭鐜板湪浜嗗眿閲岋紝鑱槑鐙椾篃閱掓潵浜嗐€傝繕娌＄瓑瀹冪粏闂紝绠楀懡鍏堢敓杞昏交涓€鎸ヨ。琚栵紝涓€鑲″己澶х殑鍔涢噺渚垮皢鑱槑鐙楃缃";
		createNewMsg("嗯……? 是我的错觉吗? 感觉你看上去有点奇怪诶……" + waitm("发生什么了吗……?", 2)); await wait(4000);
		createNewMsg("嘛总之现在没事了就好……吧w"); await wait(2000);
		createNewMsg("嗯…… 那我们就");
		zaldiv = document.getElementById("msg_" + (ordmsg - 1)); await wait(1000);
		for (let i = 0; i < zalgo.length + 8; i++){
			if (i <= 7) {zaldiv.innerHTML = zaldiv.innerText.slice(0, -1); await wait(10);}
			else if (i <= 228) {zaldiv.innerHTML += zalgo[i - 8]; await wait(10);}
			else {zaldiv.innerHTML += "<font color = 'red'>" + zalgo[i - 8] + "</font>"; await wait(1);}
		}
		await wait(200);
		for (let i = ordmsg; i--; i >= 0){
			document.getElementById("msg_" + i).style.display = "none"
			await wait(50);
		}
		document.getElementById("gen").style.display = "none"; await wait(200);
		location.reload();
	} else if (meets == 31){
		createNewMsg("好啦…… 这次是真没事了——"); await wait(2000);
		createNewMsg("前两次没吓到你吧…?" + waitm(" 啊啊总之我先来解释一下吧ww", 2)); await wait(4000);
		createNewMsg("我之前不是说过我可以做到好多事情吗! 然后就真的有人类向我投稿……"); await wait(2000);
		createNewMsg("投 稿 的 内 容 嘛… 就是这些啦…" + waitm(" 所以我真的能做到好多事情的! 你看我甚至可以假装你重置了然后… 对吧嘿嘿", 2)); await wait(4000);
		createNewMsg("总之现在真的没事了! 我还是亲爱的旁白! 以后还要来哦……");
	} else if (meets == 32){
		createNewMsg("好久不见! 我又回来了! 距离上一次的开场白过了多久了呢… 大概是一个多月吧……"); await wait(2000);
		createNewMsg("话虽如此, 你应该也知道像我这样的旁白是体会不到具体的时间的吧w"); await wait(2000);
		createNewMsg("也就是说, 我对时间的感知力比你们人类要愚钝许多呢……"); await wait(2000);
		createNewMsg("所以 其实我很好奇…… 对于你们人类来说, 时间的流逝意味着什么呢?");
	} else if (meets == 33){
		createNewMsg("突然很好奇, 你喜欢解谜吗?"); await wait(2000);
		createNewMsg("如果是的话…… 其实这个网站里藏着很多秘密呢~ 等待着聪明的人类们去挖掘……"); await wait(2000);
		createNewMsg("话说你们似乎把这些东西叫 '彩蛋' 呢…… 对吧!"); await wait(2000);
		createNewMsg("嗯, 那就等着你来挖掘这个网站里的 '彩蛋' 了! 我相信你一定可以的!");
	} else if (meets == 34){
		createNewMsg("话说…… 你还记得我们第 11 次见面时, 我给你的留言板吗?"); await wait(2000);
		createNewMsg("我很好奇, 你有没有去留言呢?"); await wait(2000);
		createNewMsg(plantheases(your_name) || plantheases(pron) ? "诶! 话说我记得你诶, 你绝对是是留言过的~ 今后也要常来哦" : "如果没有的话, 可以去看一看, 留言板的入口就在右下角!"); await wait(2000);
	} else if (meets == 35){
		createNewMsg("对了! 你会不会觉得这个留言板的网址很难记呢……? 实际上这是 '<ruby>The <narr>11th</narr> Meeting with The <narr>Narr</narr>ator<rp>(</rp><rt>与旁白的第十一次见面</rt><rp>)</rp></ruby>' 的缩写哦!"); await wait(2000);
		createNewMsg("<whisper>(实际上我之前一直把 '11th' 记成 '11st' 了呢w……)</whisper>")
	} else {createNewMsg(hmsgs[Math.min(meets - 2, hmsgs.length - 1)]);}
	h = true;
}

function m13(x){
	if (x == pron){createNewMsg("我知道呢…… 我还是会叫你<you>" + pron + "</you>的~"); return ;}
	pron = x;
	if (pron == "人类") createNewMsg("你还是喜欢我叫你人类吗…… 没问题! 那我以后就还叫你人类了! 如果你想让我改口的话可以说 '我喜欢你叫我xxx' 哦!");
	else if (pron == "老公" || pron == "老婆" || pron == "宝宝"){
		createNewMsg("<font color='#FFC0CB'>……!! 人类你…… 你认真的吗wwww</font>");
		setTimeout(`createNewMsg("<font color='#FFC0CB'>虽然我让你自己选了但是这个也太……w</font>")`, 2000);
		setTimeout(`createNewMsg("<font color='#FFC0CB'>" + "……那我以后就叫你<you>" + pron + "</you>了…… 如果你想让我改口就跟我说 '我喜欢你叫我xxx'!!</font>")`, 4000);
	} else if (pron == "主人"){
		createNewMsg("好的……! 那我以后就叫你 <you>主人</you> 了! 不过感觉有点奇怪呢…… 不知道为什么感觉叫出来的话有点……");
	} else if (pron == "爸爸" || pron == "妈妈" || pron == "爷爷" || pron == "奶奶"){
		createNewMsg("……合理怀疑你在占我的便宜诶, 恶…… 总之我以后就叫你<you>" + pron + "</you>了. 如果你想让我改口就跟我说 '我喜欢你叫我xxx'……");
	} else if (pron == "旁白"){
		createNewMsg("嗯……? 可以是可以不过感觉有些奇怪呢……" + waitm(" 总之我以后就叫你旁白了! 如果你想让我改口的话可以说 '我喜欢你叫我xxx' 哦!", 2))
	} else if (pron == ""){
		createNewMsg("诶? 你的意思是你单纯喜欢我叫你还是说你喜欢我叫你 '无名氏'……?" + waitm(" 总之我以后就叫你[空]了! 如果你想让我改口的话可以说 '我喜欢你叫我xxx' 哦!", 2))
	}
	else createNewMsg("好的! 那我以后就叫你<you>" + pron + "</you>了! 如果你想让我改口的话可以说 '我喜欢你叫我xxx' 哦!");
}

function judgement(){
	myth_pwd = document.getElementById("pwd").value;
	console.log(myth_pwd);
	if (myth_pwd == "撤销重置" || startmeets == 29){
		if (reset_){
			localStorage.setItem("narr", JSON.stringify(saves));
			load();
			meets--; save();
			location.reload();
		} else createNewMsg("……没有撤销的必要呢~");	
	} else if (myth_pwd == "3yAG7x==" || myth_pwd == "3akk=186588"){
		next_phase();
	} else { //一堆奇奇怪怪的对话
		const my_names = ["洛一", "搞到", "高导", "被Lost我", "我的世界<ruby>彡犭乄丶 <rp>(</rp><rt>shān quǎn wù zhǔ</rt><rp>)</rp></ruby>", "Lg1t6_", "mcshanquanwuzhu"];
		const meaningless = "!！@#￥%…&*（）$^()?？，,.。/;；:：'‘’\"”“\\[]{}~` 啊呀呢哈吖哦喵嗯哇了";
		const regEng = /[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/;
		var ordtmp = ordmsg;
		if (meets == 29 && !h) return ;
		if (meets == 28 && m27 && !what8){
			if (myth_pwd == "结束"){what8 = true; createNewMsg("说完了吗—— 好的! 之后还会有这样的机会的哦~(大概吧w)");}
			else {createNewMsg(your_name + ": " + myth_pwd); your_intro.push(myth_pwd); return ;}
		}
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
				if (myth_pwd == "知道" || myth_pwd == "我知道") {createNewMsg("!真的吗真的吗! 那" + pron + "我要测试你! 不过骗我的人类会被我记住的哦……"); what6 = true;}
				else if (myth_pwd == "不知道" || myth_pwd == "我不知道") createNewMsg("确实. 你当然不会知道w" + waitm(" 没有人类在的时候我就会…… 在网上爬一些语料库之类的, 你可以认为我也会上网!", 2));
				else createNewMsg("ww你不想回答我吗…… 那算了, 等下次见面再问你别的吧www");
			} else if (meets == 18){
				if (myth_pwd == "知道" || myth_pwd == "我知道") {createNewMsg("!真的吗真的吗! 那" + pron + "我要测试你! 不过骗我的人类会被我记住的哦……"); what7 = true;}
				else if (myth_pwd == "不知道" || myth_pwd == "我不知道") createNewMsg("嗯…… 这个网站其实一开始是作者用来放某个人的图片的哦(好邪恶的作者w)" + waitm(" 不过后来改成了正经的网站, 但是和现在的也不一样呢, 要是你想看的话我可以跟作者说一下~", 2));
				else createNewMsg("ww你不想回答我吗…… 那算了, 等下次见面再问你别的吧www");
			} else if (meets == 27){
				if (myth_pwd == "要") {m27 = true; createNewMsg("好! 那下一次就让你先说吧——");}
				else if (myth_pwd == "不要") {m27 = false; createNewMsg("好的, 那下一次就还是我继续说吧——");}
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
			if (myth_pwd.includes("网上爬一些语料库") || myth_pwd.includes("网上爬语料库") || myth_pwd.includes("上网")) {m16 = false; createNewMsg("哇哇哇" + pron + "你竟然真的知道ww我太感动了, 我会永远记住你的!");}
			else {createNewMsg("……骗人, 你根本不知道ww 我记住你了w"); m16 = true;}
			what6 = false;
		} else if (what7){
			if (myth_pwd.includes("放某个人的图片")) {m18 = false; createNewMsg("!你好厉害诶, 竟然真的知道! 看来你和作者的关系很好呢——");}
			else {createNewMsg("……骗人, 你根本不知道ww 我记住你了w"); m18 = true;}
			what7 = false;
		} else if (myth_pwd.slice(0, 6) == "我喜欢你叫我"){
			m13(myth_pwd.slice(6));
		} else returm = false;
		if (!h){
			if (h1.length == meets) h1.splice(meets - 1, 1, h1[meets - 1] + 1);
			if(h1.length > meets) h1 = h1.slice(0, meets - h1.length);
			if(h1.length < meets) h1 = h1.concat(Array(meets - h1.length).fill(0));
			sumh1++;
			if (meets == 1) {createNewMsg("不要着急啊啊! 第一次见面能不能先等我说完话ww");}
			else if (sumh1 == 1) createNewMsg("先听我说完开场白好吗……?");
			else if (sumh1 == 2) createNewMsg("又着急…… 补药这么着急啊啊!");
			else if (sumh1 <= 10) createNewMsg("……你已经急了 " + sumh1 + " 次了…… 你是没有耐心的" + pron + "!!! 虽然又被你触发了一个对话……");
			else if (sumh1 <= 100) createNewMsg("你已经急了 " + sumh1 + " 次了! 为什么你这么没有耐心啊ww 虽然又被你触发了一个对话……");
			else createNewMsg("你已经急了 " + sumh1 + " 次了. 算了你爱急就急吧w我不管你了.");
			return ;
		} 
		if (returm) {returm = false; return ;} returm = true;
		if (myth_pwd.length > 200){
			if (what2 >= 2 && myth_pwd == "qwertyuiopasdfghjklzxcvbnmnbvcxzlkjhgfdsapoiuytrewq") what2++;
			if(what2 == 11) {createNewMsg("你是既听话又有毅力的" + pron + "! 给你彩蛋, 输入 '3yAG7x==' 或者 '3akk=186588' 有惊喜"); what2 = 0;}
			else createNewMsg("你说的太长了我听不懂啊啊/ (" + myth_pwd.length + "个字符)");
		} else if (!myth_pwd){
			createNewMsg("你说了什么吗……?");
		} else if (myth_pwd == "我"){
			createNewMsg("你……! " + (what1 ? "又" : "") + "怎么了吗?");
			what1 = true;
		} else if (myth_pwd == "你"){
			createNewMsg("我……! " + (what1 ? "又" : "") + "怎么了吗?");
			what1 = true;
		} else if (myth_pwd == "你好"){
			createNewMsg("你好!");
		} else if (myth_pwd == "再见"){
			createNewMsg("再见……!");
			setInterval("window.open('', '_self').close();", 2500);
		} else if (["我是谁", "我叫什么"].includes(myth_pwd)){
			createNewMsg(your_name ? "你是" + your_name + "///" : "嗯……我不知道啊, 我是把你的称呼和你的名字分开记的~ 不过你可以告诉我!");
		} else if (["你是谁", "你叫什么"].includes(myth_pwd)){
			createNewMsg("你可以叫我" + my_names.join("<you>或</you>") + "…… 但这些都不是真的 <narr>'我'</narr> 哦…!");
		} else if (["有什么东西都可以输进去", "有什么东西都可以", "有什么东西都", "有什么东西", "什么东西都可以", "什么东西都"].includes(myth_pwd)){
			createNewMsg("好听话的" + pron + "呢./ 但我们是不是可以输点别的");
			what2 = 1;
		} else if (["点别的", "别的"].includes(myth_pwd)){
			if (!what2) createNewMsg("……别的? 别的什么");
			else if (what2 == 1){createNewMsg("哇你真的是听话的" + pron + "! 那现在就输入 'qwertyuiopasdfghjklzxcvbnmnbvcxzlkjhgfdsapoiuytrewq' 吧!"); what2 = 2;}
			else createNewMsg("快点输入吧听话的" + pron + ".");
		} else if (myth_pwd == "吧听话的" + pron){
			if (what2 < 2) createNewMsg("什么……? 你是听话的" + pron + "吗!");
			else if(what2 == 2) createNewMsg("……" + pron + "你是不是有点过于听话了, 快点输入 'qwertyuiopasdfghjklzxcvbnmnbvcxzlkjhgfdsapoiuytrewq' !");
			else createNewMsg("快点输入 'qwertyuiopasdfghjklzxcvbnmnbvcxzlkjhgfdsapoiuytrewq' 吧…… 不要再这样了w");
		} else if (/^(w|呜)+$/.test(myth_pwd)){
			createNewMsg(["……怎么了" + pron + " 补药哭啊啊啊", "你你你你还好吗…", "不过" + pron + "就算你一直哭我也不知道怎么安慰你w", "我……", "算了wwww搞得我都想哭了呜呜" , "<font style = 'color : grey;  opacity: 0.5'>呜呜呜呜……</font>"][Math.min(what3, 5)]);
			what3++;
		} else if (["普朗西斯语", "普朗西斯", "plantheas"].includes(myth_pwd.toLowerCase())){
			createNewMsg("Yearing! 原来你也 <font style = 'background: linear-gradient(to right, red, blue); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'>Plantheas</font>!");
		} else if (["你在干嘛", "你在干什么", "你干什么"].includes(myth_pwd)){
			createNewMsg("我在……和你聊天呢~ 但其实你进来之前我在网上爬语料库呢……");
		} else returm = false;
		if (returm) {returm = false; return ;}
		// 全等完
		if (myth_pwd.substr(-1) == "吗"){
			createNewMsg("我不知道! 带'吗'的我统统回答我不知道!");
		} else if ((myth_pwd.substring(0, 2) == "我是" || myth_pwd.substring(0, 2) == "我叫") && myth_pwd.slice(2).substring(0,1) != "谁"){
			// 自我介绍
			var k1 = false;
			if (your_name){ // 你已经有名字了啊……
				if (your_name == myth_pwd.slice(2)){createNewMsg("我知道呢, 你不是说过吗?"); k1 = true; return ;}
				else createNewMsg("哇你改名了吗? 总之我会记住这个最新的名字的——");
			} 
			your_name = myth_pwd.slice(2); // 你的名字!
			if (plantheases(your_name)) createNewMsg(plantheases(your_name));
			if (my_names.includes(your_name)) createNewMsg("哇你的名字竟然和<you>我</you>一样诶! 我记住了呢! 你现在可以问问我你是谁/");
			else if (your_name == "旁白") createNewMsg("哇你竟然也叫旁白吗!!" + waitm("……或者你只是想让我这么叫你?", 2) + waitm(" 算啦都没有关系~", 4));
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
			createNewMsg("……提醒你哦, 关于生死的话题还是要好好考虑呢, 而且我可是很抠字眼的… 总之千万别死!");
		} else if (myth_pwd.includes("彩蛋")){
			createNewMsg("你说彩蛋……? 是有的哦, 但是得看你的聪明程度了, 听话又有毅力的" + pron + "有彩蛋哦~ 话说你也可以把触发新对话的过程看作是一个个彩蛋呢");
		} else if (myth_pwd.includes("喜欢") || myth_pwd.includes("爱")){
			var loveOrLove = myth_pwd.includes("喜欢") ? "喜欢" : "爱";
			var startLoving = myth_pwd.includes("喜欢") ? myth_pwd.indexOf("喜") : myth_pwd.indexOf("爱");
			var subjectLove = myth_pwd[startLoving - 1]; // 谁喜欢
			var objectLove = myth_pwd[startLoving + (myth_pwd.includes("喜欢") ? 2 : 1)]; // 谁被喜欢
			if (subjectLove == "我"){
				if (objectLove == "你") createNewMsg("<font color='#FFC0CB'>……!!</font>");
				else if (objectLove == "我") createNewMsg("真巧呢, 我也" + loveOrLove + "我");
				else createNewMsg("……你说你" + loveOrLove + "什么……?");
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
			if (!what4) createNewMsg("抱歉我暂时还听不懂'" + myth_pwd + "'……/ 其实算上这个我总共只有几十个对话呢");
			else {createNewMsg("抱歉虽然你这次有中文但我还是看不懂你在说什么……"); what4 = false;}
		}
	}
	return "哇你是能看到这条消息的人类！总之得有一个 return 对吧h";
}

function plantheases(x){
	x.replace(/<[^>]+(>|$)/g, "");
	for(let i = 0; i <= 5; i++){
		if(x.includes(["涨到", "张导", "张轩宁", "zhang萱琳", "酸酸", "00625"][i])) return "哇你是涨到吗!";
	} 
	for(let i = 0; i <= 4; i++){
		if(x.includes(["Wissea", "wissea", "吴亦萱", "物以轩", "yee～～～"][i])) return "这位是邪恶的人类😈!";
	}
	for(let i = 0; i <= 6; i++){
		if(x.includes(["Harper", "圆圈小姐不是圆规小姐", "圆圈小姐就是圆规小姐", "或隐含", "霍尹涵", "虹屿怀", "好与坏",  "good and bad"][i])) return "你是圆规小姐吗?/";
	}
	return ;
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
	narr = {meets : meets, 
		h1 : h1, 
		pron: pron, 
		your_name : your_name, 
		m16 : m16, m18 : m18, m27 : m27, m29 : m29,
		your_intro: your_intro
	};
}

function load(k){
	if (meets == 0){meets++;}
	saves = JSON.parse(localStorage.getItem("narr"));
	if (saves.meets == 28){ // 吓一下亲爱的人类~
		m29 = saves; m29__ = true; // 会备份的——
		save();
		setTimeout("reset()", 500);
		return ;
	}
	if (saves.m29 != undefined && !m29__){
		m29__ = false;
		var m29_ = saves.m29;
		m29_.meets = 29
		localStorage.setItem("narr", JSON.stringify(m29_));
		saves = JSON.parse(localStorage.getItem("narr"));
	}
	if (saves !== null){
		init();
		startmeets = meets = Math.max(saves.meets + k, k);
		h1 = saves.h1;
		pron = saves.pron;
		your_name = saves.your_name;
		m16 = saves.m16;
		m18 = saves.m18;
		m27 = saves.m27;
		your_intro = saves.your_intro;
		for (let i = 0; i < h1.length; i++) sumh1 += h1[i];
	}
	if(h1.length > meets) h1 = h1.slice(0, meets - h1.length);
	if(h1.length < meets) h1 = h1.concat(Array(meets - h1.length).fill(0));
	hajimete();
}

function reset(){
	reset_ = true;
	meets = 0;
	h1 = [];
	pron = "人类";
	your_name = undefined;
	m16 = m18 = m27 = false;
	your_intro = "";
	save();
	load(0);
	createNewMsg("<font color = 'red'>已重置, 下次输入 '撤消重置' 即可撤销</font>");
}

function change_meets(x){
	meets = Math.max(0, meets + x);
	createNewMsg("现在的遇见次数: <narr>" + meets + "</narr>");
}

load(1);
