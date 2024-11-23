var msg = [];
var ordmsg = 0;
var your_name;
var what1 = what2 = false;

function judgement(){
	myth_pwd = document.getElementById("pwd").value;
	console.log(myth_pwd);
	if(myth_pwd == "3yAG7x=="){
		next_phase();
	} else { //一堆奇奇怪怪的对话
		const my_names = ["搞到", "高导", "高鸿睿", "狗睿", "被Lost我", "我的世界彡犭乄丶", "Lg1t6_", "lg123456_", "G-Lion", "mcshanquanwuzhu", "mcsanquanwuzhu"];
		const meaningless = ["!", "！", ".", "。", "/", " ", ";", "啊", "呀", "呢", "哈", "吖", "哦"];
		const regEng = /^[A-Za-z]+$/;
		for (let i = myth_pwd.length - 1; i >= 0; i--){ // 剔除末尾无关的字符
			if (!meaningless.includes(myth_pwd[i])) break;
			else myth_pwd = myth_pwd.slice(0, -1);
		}
		if (!myth_pwd){
			createNewMsg("你说了什么吗……?");
		} else if (myth_pwd == "我"){
			createNewMsg("你……! " + (what1 ? "又" : "") + "怎么了吗?");
			what1 = true;
		} else if (myth_pwd == "你"){
			createNewMsg("我……! " + (what1 ? "又" : "") + "怎么了吗?");
			what1 = true;
		} else if (my_names.includes(myth_pwd)){
			createNewMsg(myth_pwd + "，在此!/.");
		} else if (myth_pwd == "你好"){
			createNewMsg("你好！");
		} else if (myth_pwd == "再见"){
			createNewMsg("再见……!");
			setInterval("window.open('', '_self').close();", 2500);
		} else if (regEng.test(myth_pwd)){
			createNewMsg("那个……全是英文字母的话我是看不懂的, 要不还是说中文吧");
			what2 = true;
		} else if (myth_pwd.includes("杀")){
			// 主语是谁?
			let subject = myth_pwd[myth_pwd.indexOf("杀") - 1];
			if (subject == "我") createNewMsg("……?补药杀啊啊");
			else if (subject == "你") createNewMsg("……这种事情不要拿我当主语啊啊");
			else createNewMsg("不是发生什么了.?");
		} else if (["普朗西斯语", "普朗西斯", "Plantheas", "plantheas"].includes(myth_pwd)){
			createNewMsg("Yearing! 原来你也<u style = 'background: linear-gradient(to right, red, blue); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'>Plantheas</u>!");
		} else if ((myth_pwd.substring(0, 2) == "我是" || myth_pwd.substring(0, 2) == "我叫") && myth_pwd.slice(2).substring(0,1) != "谁"){
			// 自我介绍
			let k1 = false;
			if (your_name){ // 你已经有名字了啊……
				if (your_name == myth_pwd.slice(2)) {createNewMsg("我知道呢, 你不是说过吗?"); k1 = true;}
				else createNewMsg("哇你改名了吗? 总之我会记住这个最新的名字的——");
			}
			your_name = myth_pwd.slice(2); // 你的名字!
			if (plantheases(your_name)){
				createNewMsg(plantheases(your_name));
			}	
			if (my_names.includes(your_name)) createNewMsg("哇你的名字竟然和我一样诶! 我记住了呢! 你现在可以问问我你是谁/");
			else if (your_name == "") createNewMsg("嗯……你是什么……?");
			else if (!k1) createNewMsg("你好, " + your_name+ "! 我记住了呢, 你现在可以问问我你是谁/");
		} else if (myth_pwd == "我是谁"){
			if (your_name) createNewMsg("你是" + your_name + "///");
			else createNewMsg("嗯……我不知道啊, 不过你可以告诉我");
		} else if (myth_pwd == "你是谁"){
			createNewMsg("你可以叫我" + my_names.join("或"));
		} else { // 你在说什么我听不懂
			if (!what2) createNewMsg("抱歉我暂时还听不懂 '" + myth_pwd + "' 呢/ 其实算上这个只有十个对话左右而已");
			else {createNewMsg("抱歉虽然你这次不是全英文但我还是看不懂你在说什么……"); what2 = false;}
		}
	}
	return "哇你是能看到这条消息的人类！";
}

function plantheases(x){
	for(let i = 0; i <= 3; i++){
		if(x.includes(["涨到", "张导", "张轩宁", "zhang萱琳"][i])) return "哇你是涨到吗?";
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
	document.body.appendChild(msg[ordmsg]);
	ordmsg++;
}

function next_phase(){
	var d1 = document.createElement("div");
	var c1 = document.createElement("h2");
	c1.innerHTML = "!你竟然输入了我的密文!";
	d1.setAttribute("class", "p1_text_effect");
	d1.appendChild(c1);
	document.body.appendChild(d1);
	return ;
}
