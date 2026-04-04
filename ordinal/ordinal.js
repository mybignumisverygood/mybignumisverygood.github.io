displayInterval = setInterval(display, 20);

var EN = ExpantaNum;

function NZ(x){
	return !x.sub(1).isneg();
}
var ordivar = EN(0);
var recur = EN(0);

function formatTime(sec){
	if (sec<0){ return "0秒"; }
	let s = sec%60;
	let m = Math.floor(sec/60%60);
	let h = Math.floor(sec/3600);
	return (h?h+"小时":"")+(m?m+"分钟":"")+s+"秒";
}

function display(){
	time.innerHTML="你最少需要花费"+formatTime(ordivar.div(50).floor().toNumber())+"到达这里";
	if(ordivar.lt(EN(52391))){ // <ε_ω
		ordinum.innerHTML = formatWhole(number(ordivar));
		ordinal.innerHTML = formaty(number(ordivar));
	} else {
		var p1 = formaty1(ordivar);
		ordinum.innerHTML = formatWhole(p1[0]);
		ordinal.innerHTML = p1[1];
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

function cheat(m){
	ordivar = ordivar.plus(m);
	display();
}

function formaty(x, m=0){
	if (x.isNaN()){ return "ω<sub>1</sub>"; }
	if (m!=1){ recur=x; }
	if (recur.div(x).gt("1e50")){ // 递归截断
		return "";
	}
	// 0<=x<ω, ω=3
	if (x.lt(4)){
		return "0123"[x.floor()];
	// ω+1<=x<ω^2, ω^2=3^2=9
	} else if (x.lt(16)){
		return "ω"+(m!=3?(NZ(x.div(4).floor().sub(1))?x.div(4).floor():"")+(NZ(x.mod(4))?"+"+x.mod(4).floor():""):"");
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

// Epsilon 序数的计算方式可被看作是一个 "左结合" 的 tetration 函数
// 也即, ε_α => ( … ((4^^4)^^4) … )^^4 其中有 g_{α+1}(4) 个 "^^"
// 下面计算 Epsilon 序数的函数从理论上来讲虽然给出的不是精确值但其精度也是极高的所以不要担心 =ω=.
// (丢失的精度大概相当于 slog 级别, 从理论上来说也是无法察觉的w)

function Epsilons(base){
	return EN(4).tetr(base.mul(3).add(4));
}

const zeta = Epsilons(Epsilons(Epsilons(epsilon))); // ~FFFe8.072e153

// 下面出现的一堆神秘数字 (基本上) 都是精确计算过的结果, 其目的在于使函数递归到合适的序数

function formaty1(x){
	if (x.lte(78826)){ // <ζ_0 ~ 26m16s
		if (x.lte(52390)){
			return [number(x), formaty(number(x), (ordivar.gt(72524)?3:2))];
		}
		var base_x = x.sub(52390).pow(1.1).add(2300).floor();
		var loop = formaty1(base_x);
		return [Epsilons(loop[0]), "ε<sub>"+loop[1]+"</sub>" + 
			(ordivar.lt(54494)?(" ~ "+format(Epsilons(loop[0].floor()))):""
		)];
	} else if (x.lte(81082)){ // <ζ_0^2 ~ 27m1s
		var milestone = "<font color='yellow'>ζ<sub>0</sub> ~ FFFe8.072e153 ~ 4^^^5</font>";
		var diff = x.lte(80664)?78826:80614;
		var base_x = x.sub(diff).pow(EN(1.5).plus(EN(x.gt(80664)+0).div(3)));
		var loop = formaty1(base_x);
		return [zeta, (ordivar.gt(78862) ?
						"<font color='yellow'>ζ<sub>0</sub></font>"+(loop[1]!="0"?(x.lte(80664)?"+":"")+loop[1]:""):milestone),
						 x.lte(80664)?loop[0]:zeta];
	} else if (x.lte(87119)){ // <ε_{ζ_0+1}
		var base_x = x.sub(80833).pow(1.3);
		var loop = formaty1(base_x);
		return [zeta, "<font color='yellow'>ζ<sub>0</sub></font><sup>"+loop[1]+"</sup>", zeta];
	} else if (x.lte(112177)){
		var milestone = "<font color='orange'>ε<sub>ζ<sub>0</sub>+1</sub> = ζ<sub>0</sub><sup>ζ<sub>0</sub><sup>ζ<sub>0</sub></sup></sup></font>";
		var diff = x.lte(102647)?-489684:73765;
		var base_x = x.sub(diff).pow(EN(0.85).plus(EN(x.gt(102647)+0).div(4)));
		var loop = formaty1(base_x);
		return [Epsilons(Epsilons(Epsilons(epsilon)).plus(loop[2])), (ordivar.gt(87837)?"ε<sub>"+loop[1]+"</sub>":milestone), 
				Epsilons(Epsilons(Epsilons(epsilon)).plus(loop[2]))];
	} else {
		var milestone = "<font color='yellow'>ζ<sub>1</sub> = ε<sub>ε<sub>ε<sub>ε<sub><font color='yellow'>ζ<sub>0</sub></font>+1</sub></sub></sub></sub> ~ 4^^^8";
		return [EN(4).pent(8), milestone];
	}
}

function autoRun(){
	if (setMode.checked){
		displayInterval=setInterval(display,20);
	} else {
		clearInterval(displayInterval,20);
	}
}
