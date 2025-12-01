ordinum = document.getElementById("ordinum");
ordinal = document.getElementById("ordinal");
celm = document.getElementById('setMode');
displayInterval = setInterval(display, 20);
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

function fund(){
	document.getElementById('fund').style.display = "block";
}
function exit(){
	document.getElementById('fund').style.display = "none";
}

function display(){
	if(ordivar.lt(EN(42337))){
		ordinum.innerHTML = formatWhole(number(ordivar));
		ordinal.innerHTML = formaty(number(ordivar));
	}else{
		var base = number((ordivar.sub(42337).pow(1.1).add(1350)));
		var sbase = EN('3.04365').tetr(base.mul(2).add(3));
		ordinum.innerHTML = formatWhole(sbase);
		ordinal.innerHTML = formaty(number(ordivar));
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
		return "ε<sub>"+formaty(number((ordivar.sub(42337).pow(1.1).add(1350))))+"</sub>";
	}
}
	
function autoRun(){
	if (celm.checked){
		displayInterval=setInterval(display,20);
	} else {
		clearInterval(displayInterval,20);
	}
}