var colors = document.getElementsByClassName("color");
var main = document.getElementById("main");
var rgb = document.getElementById("rgb");
var preview = document.getElementById("preview");
var setting = {}; 
// 20px 是默认大小!

var lockeds = document.getElementsByClassName("locked");
var checkGradient = document.getElementById("gradient");
var gradient = [false, false];

rgb.addEventListener("input", createGradient);

for (let i = 0; i < colors.length; i++){
	if (colors[i].parentNode.id == "monocolors"){
		colors[i].onclick = function (){
			gradientStyle("");
			setting["color"] = this.outerHTML.slice(43,50); // 获取点击色块的rgb值, 我简直是天才!
			rgb.value = setting["color"];
			preview.style.background = rgb.value;
		};
	} else {
		colors[i].onclick = function (){
			var style = ["#6CF, #FC6", "red, blue", "red, orange 17%, yellow 33%, green 50%, cyan 67%, blue 83%, purple"][i - 14];
			gradientStyle(style);
			rgb.value = style;
		};
	}
}

function createMonocolor(){ // 在那个输入框里输入单色的话, 实时变更预览色块的颜色, 并且修改一下弹幕w
	var color = rgb.value;
	if ((color == "???" || color == "？？？") && gradient[0]){ // 小彩蛋, 用来解锁渐变色
		gradientStyle("#FC6, #6CF");
		rgb.setAttribute("placeholder", "");
		checkGradient.parentNode.style.color = "#000";
		if (!gradient[1]){document.getElementById("unlockGradient").innerHTML = "<i style='color: #cecece'>" + document.getElementById("unlockGradient").innerHTML + "</i>";}
		gradient[1] = true;
		for (let i = 0; i < lockeds.length; i++){
			if(lockeds[i].innerHTML == "渐变色"){
				lockeds[i].classList.add("gradient");
				lockeds[i].classList.remove("locked");
				i--;
			}
		}
		document.getElementById("syntaxGradient").style.display = "list-item";
		document.getElementById("gradients").style.display = "inline-block";
		return ;
	}
	if (["颜色的16进制RGB值", "颜色的16进制rgb值", "颜色的十六进制RGB值", "颜色的十六进制rgb值"].includes(color)){ // 小彩蛋
		gradientStyle("#6CF, #FC6");
		// 修改帮助那里的文字! 我可是情绪价值人!
		if (!gradient[1] && !gradient[0]){
			rgb.setAttribute("placeholder", "输入???");
			document.getElementById("hintGradient").style.display = "none";
			document.getElementById("unlockGradient").innerHTML += "<br />哇! 你找到了第一个用来解锁渐变色的彩蛋诶! 接下来再重复一次<span color='#6cf'>刚才的流程</span>吧……";
		}
		gradient[0] = true;
		return ;
	} 
	gradientStyle("");
	if (color.length != 4 && color.length != 7){
		preview.style.background = "#000"; // 不合理就变黑
	} else {
		preview.style.background = color;
	}
	setting["color"] = preview.style.background;
}

function gradientStyle(color){
	if (color){
		color = "linear-gradient(to right, " + color + ")";
		setting["background"] = color;
		setting["backgroundClip"] = setting["webkitBackgroundClip"] = "text";
		setting["webkitTextFillColor"] = "transparent";
		preview.style.background = color;
	} else {
		preview.style.background = "";
	}
	
}

function createGradient(){
	var color = rgb.value;
	color = color.split(",");
	if (color.length == 1){
		createMonocolor(color[0].split(" ")[0]);
		return ;
	}
	gradientStyle(color);
}

// 预设动画们!
var goStraight = [{transform: "translateX(100vw)"}]; // 从左到右水平滚动

function createDanmu(danmu, setting){
	var newDanmu = document.createElement("p");
	newDanmu.textContent = danmu;
	for (let i = 0; i < Object.keys(setting).length; i++){ // 将 setting 的设置落实到弹幕上!
		newDanmu.style[Object.entries(setting)[i][0]] = Object.entries(setting)[i][1];
	}
	newDanmu.style.top = Math.random() * 20 + "vh";
	main.appendChild(newDanmu);
	newDanmu.animate(goStraight, {duration: 10000, timing: "linear", fill: "forwards"});
	setTimeout(function(){newDanmu.remove();}, 10000);
	return newDanmu;
}

function toggle(id){
	var toggleEl = document.getElementById(id);
	toggleEl.innerHTML = (toggleEl.innerHTML == "隐藏" ? "显示" : "隐藏");
	(toggleEl.innerHTML == "隐藏" ?
	document.getElementById(id.slice(6).toLowerCase()).style.display = "block" :
	document.getElementById(id.slice(6).toLowerCase()).style.display = "none");
}
