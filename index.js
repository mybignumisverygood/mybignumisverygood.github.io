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
		next_phrase();
	} else { //一堆奇奇怪怪的对话
		let new_msg = document.createElement("h2");
		new_msg.setAttribute("id", "msg_" + ordmsg);
		new_msg.setAttribute("class", "showing_text_effect");
		const my_names = ["搞到", "高导", "高鸿睿", "狗睿", "被Lost我", "我的世界彡犭乄丶", "Lg1t6_", "lg123456_", "G-Lion"]
		if (my_names.includes(myth_pwd)){
			new_msg.innerHTML = myth_pwd + "，在此!/.";
		} else if (myth_pwd.substring(0,2) == "你好"){
			new_msg.innerHTML = "你好！";
		} else if (myth_pwd.substring(0,2) == "再见"){
			new_msg.innerHTML = "再见……!";
			setInterval("window.close()", 2500);
		} else if ((myth_pwd.substring(0,2) == "我是" || myth_pwd.substring(0,2) == "我叫") && myth_pwd.slice(2).substring(0,1) != "谁"){
			your_name = myth_pwd.slice(2);
			if (my_names.includes(your_name)) new_msg.innerHTML = "哇你的名字竟然和我一样诶! 我记住了呢! 你现在可以问问我你是谁/";
			else if (your_name == "") new_msg.innerHTML = "嗯……你确定你叫这个吗?";
			else new_msg.innerHTML = "你好, " + your_name+ "! 我记住了呢, 你现在可以问问我你是谁/";
		} else if (myth_pwd.substring(0,3) == "我是谁"){
			if (your_name) new_msg.innerHTML = "你是" + your_name + "///";
			else new_msg.innerHTML = "嗯……我不知道啊, 不过你可以告诉我";
		} else {
			new_msg.innerHTML = "抱歉暂时还没有这么多对话呢/ 其实算上这个只有十个左右个而已";
		}
		document.body.appendChild(new_msg);
		ordmsg++;
	}
	return "哇你是能看到这条消息的人类！";
}

function next_phrase(){
	return ;
}

