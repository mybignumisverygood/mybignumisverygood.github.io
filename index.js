// Phase 1: 从一切的源头
/*
var sphase1 = document.getElementById('sphase1')
var ph1 = document.getElementsByClassName("showing_text_effect");

sphase1.addEventListener('animationstart', handle)
function handle(){
	for (i = 0; i < 6; i++){
		ph1[0].style.cssText = ''
		ph1[0].className = "sphase1";
	}
	sphase1.removeEventListener('animationstart', handle)
}
*/

var ordmsg = 0;
var your_name;

function judgement(){
	myth_pwd = document.getElementById("pwd").value;
	console.log(myth_pwd);
	if(myth_pwd == "3yAG7x=="){
		next_phase();
	} else { //一堆奇奇怪怪的对话
		var new_msg = document.createElement("h2");
		var what1 = false;
		new_msg.setAttribute("id", "msg_" + ordmsg);
		new_msg.setAttribute("class", "showing_text_effect");
		const my_names = ["搞到", "高导", "高鸿睿", "狗睿", "被Lost我", "我的世界彡犭乄丶", "Lg1t6_", "lg123456_", "G-Lion"];
		const meaningless = ["!", "！", ".", "。", "/", " ", ";", "啊", "呀", "呢", "哈"];
		for(let i = myth_pwd.length - 1; i >= 0; i--){
			if (!meaningless.includes(myth_pwd[i])) {break;}
			else myth_pwd = myth_pwd.slice(0, -1);
		}
		if (!myth_pwd){
			new_msg.innerHTML = "你说了什么吗……?";
		} else if (myth_pwd == "我"){
			what1 = true;
			new_msg.innerHTML = "你……!" + (what1 ? "又" : "") + "怎么了吗?";
		} else if (myth_pwd == "你"){
			what1 = true;
			new_msg.innerHTML = "我……!" + (what1 ? "又" : "") + "怎么了吗?";
		} else if (my_names.includes(myth_pwd)){
			new_msg.innerHTML = myth_pwd + "，在此!/.";
		} else if (myth_pwd == "你好"){
			new_msg.innerHTML = "你好！";
		} else if (myth_pwd == "再见"){
			new_msg.innerHTML = "再见……!";
			setInterval("window.open('', '_self').close();", 2500);
		} else if ((myth_pwd.substring(0,2) == "我是" || myth_pwd.substring(0,2) == "我叫") && myth_pwd.slice(2).substring(0,1) != "谁"){
			let k1 = false;
			if (your_name){
				let new_name_temp= document.createElement("h2");
				new_name_temp.setAttribute("class", "showing_text_effect");
				if (your_name == myth_pwd.slice(2)) {new_name_temp.innerHTML = "我知道呢, 你不是说过吗?"; k1 = true;}
				else new_name_temp.innerHTML = "哇你改名了吗? 总之我会记住这个最新的名字的——";
				document.body.appendChild(new_name_temp);
			}
			your_name = myth_pwd.slice(2); //你的名字!
			if (my_names.includes(your_name)) new_msg.innerHTML = "哇你的名字竟然和我一样诶! 我记住了呢! 你现在可以问问我你是谁/";
			else if (your_name == "") new_msg.innerHTML = "嗯……你是什么……?";
			else if (!k1) new_msg.innerHTML = "你好, " + your_name+ "! 我记住了呢, 你现在可以问问我你是谁/";
		} else if (myth_pwd == "我是谁"){
			if (your_name) new_msg.innerHTML = "你是" + your_name + "///";
			else new_msg.innerHTML = "嗯……我不知道啊, 不过你可以告诉我";
		} else if (myth_pwd == "你是谁"){
			new_msg.innerHTML = "你可以叫我" + my_names.join("或");
		} else if (["普朗西斯语", "普朗西斯", "Plantheas", "plantheas"].includes(myth_pwd)){
			new_msg.innerHTML = "Yearing! 原来你也<u><font color: linear-gradient(to right, blue, pink)>Plantheas</font></u>!";
		} else {
			new_msg.innerHTML = "抱歉暂时还没有这么多对话呢/ 其实算上这个只有十个左右而已";
		}
		document.body.appendChild(new_msg);
		ordmsg++;
	}
	return "哇你是能看到这条消息的人类！";
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

