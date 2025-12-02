ordinum = document.getElementById("ordinum");
ordinal = document.getElementById("ordinal");
celm = document.getElementById('setMode');
displayInterval = setInterval(display, 20);
fundEl = document.getElementById('fund');

const epsilon = EN(3).tetr(3);
const ep1 = epsilon.tetr(3);
const ep2 = ep1.tetr(3);
function EN(x){
	return ExpantaNum(x);
}
// 判断 "不小于一"
function NZ(x){
	return !x.sub(1).isneg();
}
var ordivar = EN(0);
var fundWidth = (fundEl.style.width)/2;
function fund(){
	fundEl.style.display = "block";
	// 让帮助界面居中! 最可怕的一集w
	fundEl.style.left = "calc(50% - "+fundEl.getBoundingClientRect().width/2+"px)";
	fundEl.style.bottom = "calc(50% - "+fundEl.getBoundingClientRect().height/2+"px)";
}
function exit(){ // 真是屈才您了呢
	fundEl.style.display = "none";
}

function display(){
	if(ordivar.lt(EN(42337))){ // <ε_ω
		ordinum.innerHTML = formatWhole(number(ordivar));
		ordinal.innerHTML = formaty(number(ordivar));
	}else{
		var p1 = formaty1(ordivar);
		ordinum.innerHTML = formatWhole(p1[0]);
		ordinal.innerHTML = p1[1];
	}
	ordivar = ordivar.plus(1);
	
}

function number(x){
	return ExpantaNum.arrow(x.div(5e6).plus(1.001).plus(x.mul(0.01)).pow(x.div(1e3).plus(1)).sub(1),5,1+1e-7).tetr(x.plus(1).slog().slog());
}
	
function formaty(x){
	// 0<=x<ω, ω=3
	if (x.lt(3)){
		return "012"[x.floor()];
	// ω+1<=x<ω^2, ω^2=3^2=9
	} else if (x.lt(9)){
		return "ω"+(NZ(x.div(3).floor().sub(1))?x.div(3).floor():"")+(NZ(x.mod(3))?"+"+x.mod(3).floor():"");
	// ω^2<=x<ε_0, ε_0=3^^3=7e12
	} else if (x.lt(epsilon)){
		var expo = x.logBase(3).floor();
		var fac = x.div(EN(3).pow(expo)).floor();
		var suffix = formaty(x.mod(EN(3).pow(expo)));
		return "ω<sup>"+formaty(expo)+"</sup>"+(NZ(fac.sub(1))?fac:"")+(suffix!="0"?"+"+suffix:"");
	} else if (x.lt(ep1)){
		var expo = x.logBase(epsilon).floor();
		var fac = x.div(EN(epsilon).pow(expo)).floor();
		return "ε<sub>0</sub><sup>"+(NZ(expo.sub(1))?formaty(expo):"")+"</sup>"+(NZ(fac.sub(1))?"("+formaty(fac)+")":"");
	} else if (x.lt(ep2)){
		var expo = x.logBase(ep1).floor();
		return "ε<sub>1</sub><sup>"+(NZ(expo.sub(1))?formaty(expo):"")+"</sup>";
	} else if (x.lt(ep2.tetr(3))){
		var expo = x.logBase(ep2).floor();
		return "ε<sub>2</sub><sup>"+(NZ(expo.sub(1))?formaty(expo):"")+"</sup>";
	} else {
		return "ε<sub>ω</sub>";
	}
}
// Beyond ε_ω
// 现在开始就是数字随序数动了! 虽然…… 好像…… 有点麻烦

const magic = EN('3.04365'); // 经过计算的神秘数字, 估算ε_x用
function Epsilons(base){ // 什么叫数值逼近之力啊(骄傲)
	return magic.tetr(base.mul(2).add(3));
}

const zeta = Epsilons(Epsilons(epsilon)); //~FF1.525e13

function formaty1(x){
	if(x.lt(EN(59364))){ // <ζ_0
		if(x.lt(EN(42337))){
			return [number(x), formaty(number(x))];
		}
		var base_x = x.sub(42337).pow(1.1).add(1350);
		return [Epsilons(formaty1(base_x)[0]), "ε<sub>"+formaty1(base_x)[1]+"</sub>"];
	} else {
		return [zeta, "ζ<sub>0</sub>=ε<sub>ε<sub>ε<sub>0</sub></sub></sub>"];
	}
}
	
	
function autoRun(){
	if (celm.checked){
		displayInterval=setInterval(display,20);
	} else {
		clearInterval(displayInterval,20);
	}
}