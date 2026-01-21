var colors = document.getElementsByTagName("li");
var main = document.getElementById("main");
var rgb = document.getElementById("rgb");
var preview = document.getElementById("preview");
var setting = {fontSize: "20px"}; // 20px 是默认大小!

rgb.addEventListener("input", () => { // 在那个输入框里输入的话, 实时变更预览色块的颜色
	if (rgb.value == "颜色的16进制RGB值" || rgb.value == "颜色的16进制rgb值"){
		preview.style.background = "linear-gradient(to right, #6CF, #FC6)";
		setting["background"] = "linear-gradient(to right, #6CF, #FC6)";
		setting["backgroundClip"] = setting["webkitBackgroundClip"] = "text";
		setting["webkitTextFillColor"] = "transparent";
		//rgb.setAttribute("placeholder", "输入???");
		return 0;
	} 
	preview.style.background = "";
	if (rgb.value.length != 4 && rgb.value.length != 7){
		preview.style.backgroundColor = "#FFF"; // 不合理就变白
	} else {
		preview.style.backgroundColor = rgb.value;
	}
	setting["color"] = preview.style.backgroundColor;
});

for(let i = 0; i < colors.length; i++){
	colors[i].onclick = function(){
		setting["color"] = this.outerHTML.slice(43,50); // 获取点击色块的rgb值, 我简直是天才!
		rgb.value = setting["color"];
		preview.style.backgroundColor = rgb.value;
	};
}

// 预设动画们!
var goStraight = [{transform: "translateX(0)"}, {transform: "translateX(100vw)", display: "none"}]; // 从左到右水平滚动

function createDanmu(danmu, setting){
	var newDanmu = document.createElement("p");
	newDanmu.innerHTML = danmu;
	for (let i = 0; i < Object.keys(setting).length; i++){
		newDanmu.style[Object.entries(setting)[i][0]] = Object.entries(setting)[i][1];
	}
	newDanmu.style.margin = "0px";
	newDanmu.style.top = "calc(" + main.getBoundingClientRect().y + "px + " + Math.random() * 20 + "vh)";
	newDanmu.style.position =  "absolute";
	main.appendChild(newDanmu);
	newDanmu.style.display = "block";
	newDanmu.animate(goStraight, {duration: 10000, timing: "linear", fill: "forwards"});
	
	return newDanmu;
}

function toggle(){
	var toggleEl = document.getElementById("toggle");
	toggleEl.innerHTML = (toggleEl.innerHTML == "隐藏" ? "显示" : "隐藏");
	(toggleEl.innerHTML == "隐藏" ?
	document.getElementById("setting").style.display = "block" :
	document.getElementById("setting").style.display = "none");
	return 0;
}
