displayInterval = setInterval(display, 20);

function EN(x){
	return ExpantaNum(x);
}
// 判断 "不小于一"
function NZ(x){
	return !x.sub(1).isneg();
}
var ordivar = EN(0);

function formatTime(sec){
	let s = sec%60;
	let m = Math.floor(sec/60%60);
	let h = Math.floor(sec/3600);
	return (h?h+"小时":"")+(m?m+"分钟":"")+s+"秒";
}

function display(){
	time.innerHTML="你最少需要花费"+formatTime(parseInt(format(ordivar.div(50)).replace(/,/g, '')))+"到达这里";
	if(ordivar.lt(EN(52391))){ // <ε_ω
		ordinum.innerHTML = formatWhole(number(ordivar));
		ordinal.innerHTML = formaty(number(ordivar));
		recurDepth = 0;
	}else{
		var p1 = formaty1(ordivar);
		ordinum.innerHTML = formatWhole(p1[0]);
		ordinal.innerHTML = p1[1];
		// if(p1[1].match(/ζ/g).length==3){console.log(ordivar); return;}
	}
	ordivar = ordivar.plus(1);
	
}

function number(x){
	return ExpantaNum.arrow(x.div(5e6).plus(x.mul(0.005)).pow(x.div(1e3).plus(1)),5,1+1e-7).tetr(x.div(2).slog().slog());
}

const epsilon = EN(4).tetr(4);
const ep1 = epsilon.tetr(4);
const ep2 = ep1.tetr(4);
const ep3 = ep2.tetr(4);

var recur = EN(0);

function cheat(){
	ordivar = ordivar.plus(1000);
}

function formaty(x, m=0){
	if (m!=1){
		recur=x;
	}
	if (recur.div(x).gt("1e50")){ // 递归截断
		return "";
	}
	// 0<=x<ω, ω=3
	if (x.lt(4)){
		return "0123"[x.floor()];
	// ω+1<=x<ω^2, ω^2=3^2=9
	} else if (x.lt(16)){
		return "ω"+(NZ(x.div(4).floor().sub(1))?x.div(4).floor():"")+(NZ(x.mod(4))?"+"+x.mod(4).floor():"");
	// ω^2<=x<ε_0, ε_0=3^^3=7e12
	} else if (x.lt(epsilon)){
		var expo = x.logBase(4).floor();
		var fac = x.div(EN(4).pow(expo)).floor();
		if (m!=3 && x.lt(EN("4").pow(EN("4").pow(EN("8"))))){
			var suffix = formaty(x.mod(EN(4).pow(expo)), 1);
		}
		return "ω<sup>"+formaty(expo)+"</sup>"+(NZ(fac.sub(1))?fac:"")+(suffix!="0"&&suffix?"+"+suffix:"");
	} else if (x.lt(ep1)){
		var expo = x.logBase(epsilon).floor();
		var fac = x.div(EN(epsilon).pow(expo)).floor();
		return "ε<sub>0</sub><sup>"+(NZ(expo.sub(1))&&m<2?formaty(expo):"")+"</sup>";
	} else if (x.lt(ep2)){
		var expo = x.logBase(ep1).floor();
		return "ε<sub>1</sub><sup>"+(NZ(expo.sub(1))&&m<2?formaty(expo):"")+"</sup>";
	} else if (x.lt(ep3)){
		var expo = x.logBase(ep2).floor();
		return "ε<sub>2</sub><sup>"+(NZ(expo.sub(1))&&m<2?formaty(expo):"")+"</sup>";
	} else if (x.lt(ep3.tetr(4))){
		var expo = x.logBase(ep3).floor();
		return "ε<sub>3</sub><sup>"+(NZ(expo.sub(1))&&m<2?formaty(expo):"")+"</sup>";
	} else {
		return "ε<sub>ω</sub>";
	}
}

// Beyond ε_ω
// 现在开始就是数字随序数动了! 虽然…… 好像…… 有点麻烦

const magic = EN('2.3279574276999582'); // 经过计算的神秘数字, 估算ε_x用
function Epsilons(base){ // 什么叫数值逼近之力啊(骄傲)
	return magic.tetr(base.mul(3).add(5));
}

const zeta = Epsilons(Epsilons(Epsilons(epsilon))); // ~FFFe8.072e153

function formaty1(x){
	if(x.lt(EN(78828))){ // <ζ_0
		if(x.lt(EN(52391))){
			return [number(x), formaty(number(x), (ordivar.gt(72524)?3:2))];
		}
		var base_x = x.sub(52391).pow(1.1).add(2300);
		return [Epsilons(formaty1(base_x)[0]), "ε<sub>"+formaty1(base_x)[1]+"</sub>" + (ordivar.lt(54494)?(" ~ "+format(Epsilons(formaty1(base_x)[0].floor()))):"")];
	} else {
		return [zeta, "<font color='yellow'>ζ<sub>0</sub> ~ FFFe8.072e153</font>"];
	}
}

function autoRun(){
	if (document.getElementById('setMode').checked){
		displayInterval=setInterval(display,20);
	} else {
		clearInterval(displayInterval,20);
	}
}
