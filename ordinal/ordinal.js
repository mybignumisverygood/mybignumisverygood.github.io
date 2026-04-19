displayInterval = setInterval(display, 0);

var EN = ExpantaNum;
var mList = 1;
var timeNow = 0;

function formatTime(sec){
	if (sec < 0){return "0秒";}
	let s = Math.floor(sec % 60);
	let m = Math.floor(sec / 60 % 60);
	let h = Math.floor(sec / 3600);
	return (h?h + "小时":"") + (m?m + "分钟":"") + s + "秒";
}

function display(){
	time.innerHTML="你最少需要花费"+formatTime(timeNow / 50)+"到达这里";
	mList = add(mList, add(mList,1));
	//ordinum.innerHTML = JSON.stringify(mList);
	ordinal.innerHTML = toOrdinal(mList);
	timeNow++
}

function flat(f){
	if (typeof(f) == "number"){return [[0,f]]}
	let c = [];
	c = c.concat([[f[3], f[2]]]);
    if (Array.isArray(f[1])){c = c.concat(flat(f[1]));}
    else {c = c.concat([[0, f[1]]])}
    return c;
}

function nest(f){
	if (f.length == 1){return f[0][0]?[0, 0, f[0][1], f[0][0]]:f[0][1];}
	return [0, nest(f.slice(1)), f[0][1], f[0][0]];
}


// 对于满足康托尔范式 (CNF) 的两个序数 α, β (α >= β), 返回 α + β
// 希望对于不满足 CNF 的序数能有不那么猎奇的行为 =w=

function add(x, y){
	if (typeof(x) == "number"){x = [[0, x]];}
	if (typeof(y) == "number"){y = [[0, y]];}
	let res = [];
	let i = j = 0;
	while (i != x.length || j != y.length){
		if (x[i] && y[j] && !cmp(x[i][0], y[j][0])){
			res = res.concat([[x[i][0], x[i][1] + y[j][1]]]); i++; j++;
		} else if (x[i] && (!y[j] || cmp(x[i][0], y[j][0]) + 1)){
			res = res.concat([[x[i][0], x[i][1]]]); i++;
		} else {
			res = res.concat([[y[j][0], y[j][1]]]); j++;
		}
	}
	for (let k = res.length - 1; k + 1; k--){
		if (res[k][1] > 3){
			let temp = add(res[k][0], 1);
			if (res[k][1] % 4){res[k][1] -= 4;}
			else{res.splice(k, 1);}
			if (k && !cmp(res[k - 1][0], temp)){res[k - 1][1]++;}
			else{res.splice(k, 0, [temp, 1]);}
		}
	}
	return (res[0][0]?res:res[0][1]);
}

// 对于满足 CNF 的两个序数 α, β 的 compare
// 1, 0, -1 分别表示 α > β, α = β, α < β
// 我其实不想压行的但是者个东西真的很难使我按捺住我的冲动 =w= 扁平化者一块/.

/*
function cmp(a, b){
	if (JSON.stringify(a) == JSON.stringify(b)){return 0;}
	if (typeof(a) == "number" && typeof(b) == "number" ){return (a>b?1:-1);}
	if (typeof(a) == "number" || typeof(b) == "number" ){return ((typeof(a) == "number")?-1:1);}
	for (let i = 3; i + 1; i--){if (cmp(a[i], b[i])){return cmp(a[i], b[i]);}}
}
*/

function cmp(a, b){
	if (JSON.stringify(a) == JSON.stringify(b)){return 0;}
	if (typeof(a) == "number" && typeof(b) == "number"){return a>b?1:-1;}
	if (typeof(a) == "number" || typeof(b) == "number"){return (Array.isArray(a)?1:-1);}
	for (let i = 0; i < Math.min(a.length, b.length); i++){if (cmp(a[i], b[i])){return cmp(a[i], b[i]);}}
	return a.length > b.length?1:-1;
}

function veblen(f){
	if (f[0] == 1){return EN(4).tetr(EN(f[4]).mul(3).add(4));}
	return EN.arrow(veblen([f[0] - 1, 0, 1, 1, 0]), f[0] + 1, EN(f[4]).mul(3).add(4))
}

// 列表转序数
// 传入的列表格式符合 [x, add, mul, exp, *args] => φ(x, *args)^exp * mul + add

/*
function toOrdinal(p){
	let f = JSON.parse(JSON.stringify(p));
	for (let i = 0; i < 5 - !f[0]; i++){
		if (typeof(f[i]) == "object"){f[i] = toOrdinal(f[i]);}
	}
	let add = f[1], mul = f[2], exp = f[3];
	let suffix = `${exp == 1?'':'<sup>'+exp+'</sup>'}${mul == 1?'':mul}${add?'+'+add:''}`;
	if (f[0] == 0){return `ω${suffix}`;}
	if (0 < f[0] && f[0] < 4) {
		return `${'εζη'[f[0] - 1]}<sub>${f[4]}</sub>${suffix}`;
	}
	return `φ(${f[0]},${f[4]})${suffix}`;
}*/

function toOrdinal(p){
	let res = ``;
	if (typeof(p) == "number"){return `${p}`;}
	for (let i = 0; i < p.length; i++){
		res += p[i][0]
				?`ω${p[i][0] <= 1?'':'<sup>'+toOrdinal(p[i][0])+'</sup>'}${p[i][1] == 1?'':p[i][1]}${i == p.length - 1?'':'+'}`
				:`${p[i][1]}`;
	}
	return res;
}

function autoRun(){
	if (setMode.checked){
		displayInterval=setInterval(display, 0);
	} else {
		clearInterval(displayInterval, 0);
	}
}
