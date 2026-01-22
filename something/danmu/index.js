var colors = document.getElementsByClassName("color");
var main = document.getElementById("main");
var rgb = document.getElementById("rgb");
var preview = document.getElementById("preview");
var setting = {fontSize: "20px"}; // 20px 是默认大小!
var checkGradient = document.getElementById("gradient");

var gradient = [false, false];

rgb.addEventListener("input", inputColor);

for(let i = 0; i < colors.length; i++){
	colors[i].onclick = function (){
		preview.style.background = setting["background"] = setting["backgroundClip"] = setting["webkitBackgroundClip"] = setting["webkitTextFillColor"] = "";
		setting["color"] = this.outerHTML.slice(43,50); // 获取点击色块的rgb值, 我简直是天才!
		rgb.value = setting["color"];
		preview.style.backgroundColor = rgb.value;
	};
}

function monocolor(){ // 在那个输入框里输入单色的话, 实时变更预览色块的颜色, 并且修改一下弹幕w
	var color = rgb.value;
	if ((color == "???" || color == "？？？") && gradient[0]){ // 小彩蛋, 用来解锁渐变色
		preview.style.background = "linear-gradient(to right, #FC6, #6CF)";
		setting["background"] = "linear-gradient(to right, #FC6, #6CF)";
		setting["backgroundClip"] = setting["webkitBackgroundClip"] = "text";
		setting["webkitTextFillColor"] = "transparent";
		rgb.setAttribute("placeholder", "");
		checkGradient.removeAttribute("disabled");
		checkGradient.parentNode.style.color = "#000";
		if (!gradient[1]){document.getElementById("unlockGradient").innerHTML = "<i style='color: #cecece'>" + document.getElementById("unlockGradient").innerHTML + "</i>";}
		gradient[1] = true;
		return ;
	}
	if (["颜色的16进制RGB值", "颜色的16进制rgb值", "颜色的十六进制RGB值", "颜色的十六进制rgb值"].includes(color)){ // 小彩蛋
		preview.style.background = "linear-gradient(to right, #6CF, #FC6)";
		setting["background"] = "linear-gradient(to right, #6CF, #FC6)";
		setting["backgroundClip"] = setting["webkitBackgroundClip"] = "text";
		setting["webkitTextFillColor"] = "transparent";
		rgb.setAttribute("placeholder", "输入???");
		gradient[0] = true;
		// 修改帮助那里的文字! 我可是情绪价值人!
		if (!gradient[1]){
			document.getElementById("hintGradient").style.display = "none";
			document.getElementById("unlockGradient").innerHTML += "<br />哇! 你找到了第一个用来解锁渐变色的彩蛋诶! 接下来再重复一次<span color='#6cf'>刚才的流程</span>吧……";
		}
		return ;
	} 
	preview.style.background = setting["background"] = setting["backgroundClip"] = setting["webkitTextFillColor"] = "";
	if (color.length != 4 && color.length != 7){
		preview.style.backgroundColor = "#000"; // 不合理就变黑
	} else {
		preview.style.backgroundColor = color;
	}
	setting["color"] = preview.style.backgroundColor;
}

function createGradient(){
	var color = rgb.value;
	
}

function inputColor(){
	if (checkGradient.checked){
		createGradient();
	} else {
		monocolor();
	}
}

// 预设动画们!
var goStraight = [{transform: "translateX(0)"}, {transform: "translateX(100vw)", visibility: "hidden"}]; // 从左到右水平滚动

function createDanmu(danmu, setting){
	var newDanmu = document.createElement("p");
	newDanmu.textContent = danmu;
	for (let i = 0; i < Object.keys(setting).length; i++){
		newDanmu.style[Object.entries(setting)[i][0]] = Object.entries(setting)[i][1];
	}
	newDanmu.style.margin = "0px";
	newDanmu.style.top = "calc(" + main.getBoundingClientRect().y + "px + " + Math.random() * 20 + "vh)";
	newDanmu.style.position =  "absolute";
	newDanmu.style.width = "max-content";
	main.appendChild(newDanmu);
	newDanmu.style.display = "block";
	newDanmu.animate(goStraight, {duration: 10000, timing: "linear", fill: "forwards"});
	
	return newDanmu;
}

function toggleSetting(){
	var toggleEl = document.getElementById("toggleSetting");
	toggleEl.innerHTML = (toggleEl.innerHTML == "隐藏" ? "显示" : "隐藏");
	(toggleEl.innerHTML == "隐藏" ?
	document.getElementById("setting").style.display = "block" :
	document.getElementById("setting").style.display = "none");
	return 0;
}

function toggleHelp(){
	var toggleEl = document.getElementById("toggleHelp");
	toggleEl.innerHTML = (toggleEl.innerHTML == "隐藏" ? "显示" : "隐藏");
	(toggleEl.innerHTML == "隐藏" ?
	document.getElementById("help").style.display = "block" :
	document.getElementById("help").style.display = "none");
	return 0;
}

