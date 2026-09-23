'use strict';

class BaseProp {
	static translate_dict = { x: '', y: '', opacity: 'opacity', rotate: '' };

	constructor(attr = {}) {
		this.x = attr.x || 0; // 元素相对于父容器的基准点
		this.y = attr.y || 0; // 同上
		this.opacity = attr.opacity ?? 1; // 透明度
		this.angle = attr.angle || 0; // 相对于页面底部的夹角 (旋转用)
		this.parent = attr.parent || document.body; // 父节点, 在分组时候会有用
	}

	// 鼠标拖拽逻辑, 仅测试用!
	#animationLoop = () => {
		this.update({
			x: this.start_elX + this._pendingX - this.start_mouseX,
			y: this.start_elY + this._pendingY - this.start_mouseY
		});
		this.rAF_flag = false;
	};

	#mdown = (event) => {
		cancelAnimationFrame(this.animation);
		this.start_mouseX = this._pendingX = event.clientX; // 鼠标初始坐标
		this.start_mouseY = this._pendingY = event.clientY;
		this.start_elX = this.x; // 元素初始的坐标
		this.start_elY = this.y;
		this.rAF_flag = false;
		// mousemove 与 mouseup 绑定到 document, 防止鼠标移出元素时事件中断
		document.addEventListener('mousemove', this.#mmove);
		document.addEventListener('mouseup', this.#mup);
	};

	#mmove = (event) => {
		this._pendingX = event.clientX; // 缓存鼠标实时位置
		this._pendingY = event.clientY;
		if (!this.rAF_flag) {
			this.animation = requestAnimationFrame(this.#animationLoop);
			this.rAF_flag = true;
		}
	};

	#mup = () => {
		document.removeEventListener('mousemove', this.#mmove);
		document.removeEventListener('mouseup', this.#mup);
	};

	init(tag, NS) {
		// NS 目前仅在绘制 svg 时候传入
		this.el = NS ? document.createElementNS(NS, tag) : document.createElement(tag); // 我出生了
		// 绑定监听器, 鼠标拖拽用, 仅测试用
		if (this.el.nodeName !== 'DIV' && this.el.nodeName !== 'g') {
			// 不给 Group 绑定, 要不然有的元素可能会更新两次
			this.el.addEventListener('mousedown', this.#mdown);
		}
		return this;
	}

	applyAttr(attr, val) {
		switch (attr) {
			case 'x':
				this.el.style.transform = `translate(${val}px, ${this.y}px) `;
				break;
			case 'y':
				this.el.style.transform = `translate(${this.x}px, ${val}px) `;
				break;
			case 'rotate':
				this.el.style.transform = ``;
				break;
			default:
				this.el.style[BaseProp.translate_dict[attr]] = val;
				break;
		}
	}

	update(update_attr) {
		// 传入的仅仅是要修改的参数, 例如 a.update({x : 100, y : 200}) 只会修改位置, 不会修改其它
		const keys = Object.keys(update_attr);
		for (let i = 0; i < keys.length; i++) {
			const attr = keys[i];
			if (this.constructor.translate_dict[attr]) {
				const val = update_attr[attr];
				this.applyAttr(attr, val);
				this[attr] = val;
			}
		}
		return this;
	}

	display() {
		this.el.style.display = 'block';
		return this;
	}

	hide() {
		this.el.style.display = 'none';
		return this;
	}

	getWidth() {
		return this.el.getBoundingClientRect().width;
	}

	getHeight() {
		return this.el.getBoundingClientRect().height;
	}
}

class TextObject extends BaseProp {
	static tag = 'p';
	static translate_dict = {
		x: 'transform',
		y: 'transform',
		font: 'fontFamily',
		size: 'fontSize',
		color: 'color'
	};

	constructor(attr = {}) {
		super(attr);
		this.content = attr.content ?? '大江東去浪淘尽';
		this.font = attr.font || 'Yu Mincho'; // 好看的游明朝体
		this.size = attr.size ?? 20; // 单位 px
		this.color = attr.color ?? 'black';
	}

	draw() {
		super.init(TextObject.tag);
		this.update(this);
		this.parent.appendChild(this.el);
		return this;
	}

	applyAttr(attr, val) {
		switch (attr) {
			case 'x':
				this.el.style.transform = `translate(${val}px, ${this.y}px) `;
				break;
			case 'y':
				this.el.style.transform = `translate(${this.x}px, ${val}px) `;
				break;
			case 'size':
				this.el.style[TextObject.translate_dict[attr]] = val + 'px';
				break;
			default:
				this.el.style[TextObject.translate_dict[attr]] = val;
				break;
		}
	}

	update(update_attr) {
		if (update_attr.content != null) this.el.textContent = this.content = update_attr.content;
		super.update(update_attr);
	}
}

const shape_canvas = document.querySelector('#shape_canvas');
const svgNS = 'http://www.w3.org/2000/svg';

function resizeSVG() {
	shape_canvas.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
}

resizeSVG(); // 确保调整窗口大小时 svg 画布不会变形. 由于这个事件不是很频繁所以就先不优化了()
window.addEventListener('resize', resizeSVG);

class ShapeObject extends BaseProp {
	static tag = 'svg';

	constructor(attr = {}) {
		super(attr);
		this.parent = attr.parent || shape_canvas;
		this.color = attr.color || 'black';
		this.size = attr.size ?? 2;
	}

	draw() {
		super.init(this.constructor.tag, svgNS);
		this.update(this);
		this.parent.appendChild(this.el);
		return this;
	}
}

const deg = Math.PI / 180;

class Line extends ShapeObject {
	// x, y 属性可以为空
	static tag = 'line';
	static translate_dict = {
		x: 'x1',
		y: 'y1',
		dx: 'x2',
		dy: 'y2',
		color: 'stroke',
		size: 'stroke-width',
		line_cap: 'stroke-linecap'
	};

	constructor(attr = {}) {
		super(attr);
		this.dx = attr.dx ?? 100; // x2 = x1 + dx = x + dx
		this.dy = attr.dy ?? 100; // y2 = y1 + dy = y + dy
		this.line_cap = attr.line_cap || 'butt';
	}

	applyAttr(attr, val) {
		let new_val = val;
		switch (attr) {
			case 'x':
				this.el.setAttribute('x2', val + this.dx); // 保证变化之后线段不变形
				break;
			case 'y':
				this.el.setAttribute('y2', val + this.dy); // 保证变化之后线段不变形
				break;
			case 'dx':
				new_val += this.x;
				break;
			case 'dy':
				new_val += this.y;
				break;
			case 'size':
				new_val += 'px';
				break;
			default:
				break;
		}
		this.el.setAttribute(Line.translate_dict[attr], new_val);
	}

	byAngleLength(x, y, theta, length) {
		// 角度制, 以浏览器底部为 x 轴逆时针计算
		const rad = -theta * deg; // HTML 页面的 y 轴是反着来的……哈哈
		[this.x, this.y, this.dx, this.dy] = [x, y, length * Math.cos(rad), length * Math.sin(rad)];
		return this;
	}

	byEndpoints(x1, y1, x2, y2) {
		// 最简单的, 接收两端点坐标
		[this.x, this.y, this.dx, this.dy] = [x1, y1, x2 - x1, y2 - y1];
		return this;
	}

	byScale(obj, scale, x, y) {
		// obj 处接收一个 Line 对象, 将它缩放 scale 倍, 起始顶点变为 (x, y)
		[this.x, this.y, this.dx, this.dy] = [x, y, obj.dx * scale, obj.dy * scale];
		return this;
	}

	getLength() {
		return Math.sqrt(this.dx ** 2 + this.dy ** 2);
	}

	getTheta() {
		return Math.atan2(-this.dy, this.dx) / deg;
	}
}

class Circle extends ShapeObject {
	static tag = 'circle';
	static translate_dict = {
		x: 'cx',
		y: 'cy',
		r: 'r',
		fill: 'fill',
		size: 'stroke-width',
		color: 'stroke'
	};

	constructor(attr = {}) {
		super(attr);
		this.r = attr.r ?? 100;
		this.fill = attr.fill || 'none'; // 默认空心
	}

	static dot(x, y, r = 2) {
		// 一个预设的 Dot 样式, 还要有别的就直接使用 Circle 吧
		return new Circle({ x: x, y: y, r: r });
	}

	applyAttr(attr, val) {
		this.el.setAttribute(Circle.translate_dict[attr], val);
	}

	byCenterRadius(x, y, r) {
		// 甚至比 Line 的 byEndPoints 还要简单…… 理想状况是根本不会用到
		[this.x, this.y, this.r] = [x, y, r];
		return this;
	}

	byThreePoints(x1, y1, x2, y2, x3, y3) {
		// 目前最难的一个, 接收三点坐标确定一个圆
		const dx1 = x3 - x2,
			dx2 = x1 - x3,
			dx3 = x2 - x1;
		const dy1 = y2 - y3,
			dy2 = y3 - y1,
			dy3 = y1 - y2;
		const det = 2 * (x1 * dy1 + x2 * dy2 + x3 * dy3);
		const p1 = x1 ** 2 + y1 ** 2,
			p2 = x2 ** 2 + y2 ** 2,
			p3 = x3 ** 2 + y3 ** 2;
		const centerX = (p1 * dy1 + p2 * dy2 + p3 * dy3) / det;
		const centerY = (p1 * dx1 + p2 * dx2 + p3 * dx3) / det;
		const r = Math.sqrt((centerX - x1) ** 2 + (centerY - y1) ** 2);
		[this.x, this.y, this.r] = [centerX, centerY, r];
		return this;
	}
}

// 这才是 BaseProp().parent 真正派上用场的时候! 伟大的分组功能!
class Group {
	constructor(attr = {}) {
		// 分别处理非 svg 组和 svg 组是由于二者所在的父容器和标签等细节均不一样
		// regualr_group (非 svg 组) 使用 div 标签, 父容器默认为 body, 不可进入 svg 标签
		// svg_group (svg 组) 使用 g 标签 (foreignObject 太丑陋, 不适合动态), 父容器默认为 svg, 不可逃逸
		if (attr.regular_group != null) {
			this.regular_group = attr.regular_group;
		} else {
			this.regular_group = new BaseProp();
			this.regular_group.init('div');
		}

		if (attr.svg_group != null) {
			this.svg_group = attr.svg_group;
		} else {
			this.svg_group = new BaseProp();
			this.svg_group.init('g', svgNS);
		}
		document.body.appendChild(this.regular_group.el);
		shape_canvas.appendChild(this.svg_group.el);
		this.x = this.y = 0;
	}

	add(el) {
		for (let i = 0; i < el.length; i++) {
			if (el[i] instanceof ShapeObject) {
				this.svg_group.el.appendChild(el[i].el);
				el[i].parent = this.svg_group;
			} else {
				this.regular_group.el.appendChild(el[i].el);
				el[i].parent = this.regular_group;
			}
		}
		return this;
	}

	combine(group, obj) {
		// 计算一个组和一个组内普通对象 m 的属性应用在 m 上的等价结合属性值
		const keys = Object.keys(group);
		let combined_dict = {};
		for (let i = 0; i < keys.length; i++) {
			if (BaseProp.translate_dict[keys[i]] == null) {
				continue;
			}
			let group_val = group[keys[i]],
				obj_val = obj[keys[i]];
			switch (keys[i]) {
				case 'x': // fall through
				case 'y':
					combined_dict[keys[i]] = group_val + obj_val;
					break;
				case 'opacity':
					combined_dict[keys[i]] = group_val * obj_val;
					break;
				default:
					combined_dict[keys[i]] = group_val;
			}
		}
		obj.update(combined_dict);
		return obj;
	}

	remove(el, inheritance = true) {
		for (let i = 0; i < el.length; i++) {
			if (el[i] instanceof ShapeObject) {
				this.svg_group.el.removeChild(el[i].el);
				shape_canvas.appendChild(el[i].el);
				el[i].parent = document.body;
			} else {
				this.regular_group.el.removeChild(el[i].el);
				document.body.appendChild(el[i].el);
				el[i].parent = shape_canvas;
			}
			if (inheritance) {
				// 若是选择继承群组的属性
				this.combine(el[i] instanceof ShapeObject ? this.svg_group : this.regular_group, el[i]);
			}
		}
		return this;
	}

	update(attr) {
		this.regular_group.update(attr);
		this.svg_group.update(attr);
		return this;
	}
}

// 最伟大的设计! 时间轴!
class Timeline {
	constructor() {
		this.ms_cnt = 0;
		this.frames_cnt = 0;
		this.anims = [];
		this.idx_tail = 0;
	}

	init() {
		this.anims.sort((a, b) => a.start - b.start);
		this.anims.push(0); // 利用 0 没有索引值, 所以 loop 内部的 while 判断条件在此时会返回 false, 省去一些无用的判断w
		this.loop();
	}

	add(start, duration, anim_id) {
		this.anims.push({ start: start, duration: duration, ...anim_id });
		return this;
	}

	at(start, opration) {
		this.anims.push({ start: start, opration: opration });
		return this;
	}

	thenAdd(interval, duration, anim_id) {
		let previous_anim = this.anims[this.anims.length - 1];
		this.anims.push({ start: interval + previous_anim.start + previous_anim.duration, duration: duration, ...anim_id });
		return this;
	}

	thenAt(interval, opration) {
		let previous_anim = this.anims[this.anims.length - 1];
		this.anims.push({ start: interval + previous_anim.start, opration: opration });
		return this;
	}

	pause() {
		cancelAnimationFrame(this.loop_id);
	}

	loop = () => {
		if (this.frames_cnt === 0) {
			this.load_time = performance.now();
		}
		this.ms_cnt = performance.now() - this.load_time;
		ms_text.update({ content: `${this.frames_cnt}frames ${this.ms_cnt.toFixed(1)}ms` }); // debug 用
		this.frames_cnt++;
		while (this.anims[this.idx_tail].start <= this.ms_cnt) {
			if (this.anims[this.idx_tail].duration) {
				// 如果这不是瞬时操作
				this.anims[this.idx_tail].anim.original_obj = { ...this.anims[this.idx_tail].anim.obj };
			} // 缓存一下动画前的对象样式以便于更新
			this.idx_tail++;
		}
		for (let i = 0; i < this.idx_tail; i++) {
			if (this.anims[i].duration && this.anims[i].start + this.anims[i].duration >= this.ms_cnt) {
				this.anims[i].anim.progress = (this.ms_cnt - this.anims[i].start) / this.anims[i].duration;
				this.anims[i].recall(this.anims[i].anim.original_obj);
				continue;
			}
			if (this.anims[i].duration == null) {
				console.log(this.anims[i]);
				this.anims[i].opration();
			} else {
				this.anims[i].anim.progress = 1;
				this.anims[i].recall(this.anims[i].anim.original_obj);
			}
			this.anims.splice(i, 1); // 删除
			this.idx_tail--;
			i--;
		}
		ms_text.update({ x: window.innerWidth - ms_text.getWidth() - 30, y: 20 }); // debug 用
		this.loop_id = requestAnimationFrame(this.loop);
		return this;
	};
}

const global_timeline = new Timeline();
let ms_text = new TextObject({ content: '0 0ms' }).draw(); // debug 用

class Anim {
	static easing_functions = {
		linear: (progress) => progress,
		ease: (progress) => cubicBezier(0.25, 0.1, 0.25, 1, progress),
		easeIn: (progress) => cubicBezier(0.42, 0, 1, 1, progress),
		easeOut: (progress) => cubicBezier(0, 0, 0.58, 1, progress),
		easeInOut: (progress) => cubicBezier(0.42, 0, 0.58, 1, progress)
	};

	constructor(attr) {
		// this.playing = false; // 是否正在播放
		this.progress = attr.progress || 0;
		this.animation = attr.animation || undefined;
		this.obj = attr.obj || undefined;
		this.args = attr.args || {};
		this.original_obj = attr.original_obj || undefined;
	}

	static mojibake(obj, args) {
		// 乱码 (文字化け)
		// args: {to : string, mode : mode, charset : list -> (int || char)}
		// to 为最终要变换到的字符串; mode 可为 'random' 或 'gradual'; charset 为可用的字符集, 内部元素可以是 10 进制 UNICOCE 编码也可以是单个字符
		let anim = new Anim({ animation: Anim.mojibake, obj: obj, args: args });
		let recall = () => {
			let char = Math.floor(Math.random() * (40959 - 19968)) + 19968;
			while (!isValidGlyph(char)) {
				char = Math.floor(Math.random() * (40959 - 19968)) + 19968;
			}
			obj.update({
				content: anim.progress === 1 ? args.to : String.fromCharCode(char)
			});
		};
		return { anim: anim, recall: recall };
	}

	static translate(obj, args) {
		// 平移
		// args: {to : [x, y] -> number, easing : [x0, y0, x1, y1] -> number || function(progress)}
		// easing 可以是一个长度 4 的列表, 其中每个数推荐在区间 [0, 1] 内, 也可以是一个接收 progress 参数的自定义缓动函数
		let anim = new Anim({ animation: Anim.translate, obj: obj, args: args });
		args.easing = args.easing || 'linear';
		let easing_function = Anim.easing_functions[args.easing];
		if (typeof args.easing === 'function') {
			easing_function = args.easing;
		}
		if (args.easing instanceof Array) {
			easing_function = (progress) => cubicBezier(...args.easing, progress);
		}
		let recall = (temp) => {
			obj.update({
				x: temp.x + (args.to[0] - (temp.ref_x || 0) - temp.x) * easing_function(anim.progress),
				y: temp.y + (args.to[1] - (temp.ref_y || 0) - temp.y) * easing_function(anim.progress)
			});
		};
		return { anim: anim, recall: recall };
	}

	static rotate(obj, args) {
		let anim = new Anim({ animation: Anim.rotate, obj: obj, args: args });
		let recall = (temp) => {
			obj.update();
		};
		return { anim: anim, recall: recall };
	}
}

function cubicBezier(x0, y0, x1, y1, progress) {
	let x = (t) => {
			return 3 * x0 * t * (1 - t) ** 2 + 3 * x1 * t ** 2 * (1 - t) + t ** 3;
		},
		dx = (t) => {
			return 3 * (t ** 2 * (3 * x0 - 3 * x1 + 1) - 2 * t * (2 * x0 - x1) + x0);
		},
		t = progress;
	for (let i = 0; i < 6; i++) {
		t = t - (x(t) - progress) / dx(t);
	}
	return 3 * y0 * t * (1 - t) ** 2 + 3 * y1 * t ** 2 * (1 - t) + t ** 3;
}

let buffer;

async function loadBuffer() {
	buffer = await fetch('yumin.ttf').then((r) => r.arrayBuffer());
}
loadBuffer();

function isValidGlyph(query) {
	// 具体标准可参考 https://developer.apple.com/fonts/TrueType-Reference-Manual/
	const data = new DataView(buffer),
		cmap_hex = 0x636d6170; // c m a p
	let cmap_offset; // cmap 表的起始位置
	for (let i = 1; ; i++) {
		if (data.getUint32(16 * i - 4, false) === cmap_hex) {
			cmap_offset = data.getUint32(16 * i + 4);
			break;
		}
	}
	const number_subtables = data.getInt8(cmap_offset + 3, false); // cmap 子表总数
	let f12_mapping_table;
	for (let i = 0; i < number_subtables; i++) {
		if (data.getInt8(cmap_offset + 8 * i + 5, false) === 3 && data.getInt8(cmap_offset + 8 * i + 7, false) === 10) {
			// 分别判断是否为 Windows 以及是否为 Unicode USC-4
			f12_mapping_table = cmap_offset + data.getUint32(cmap_offset + 8 * i + 8, false);
			break;
		}
	}
	const n_group = data.getUint32(f12_mapping_table + 12);
	for (let i = 0; i < n_group; i++) {
		if (
			data.getUint32(f12_mapping_table + 12 * i + 16) <= query &&
			query <= data.getUint32(f12_mapping_table + 12 * i + 20)
		) {
			return true;
		}
	}
	return false;
}

// 测试用
let a = new TextObject({ x: 100, y: 400, content: '你好' });
a.draw();
a.update({ content: '我是洛一' });

let b = new Line().byEndpoints(100, 100, 200, 200);
b.draw();

let c = new Line().byAngleLength(100, 100, 60, 100);
c.draw();

let d = new Circle({ color: 'red' }).byCenterRadius(100, 100, 100);
d.draw();

let e = Circle.dot(100, 400);
e.draw();

let f = new Group().add([b, c]);
f;

let mouse_debugger = false,
	mouse_pos_dot = Circle.dot().draw().hide(),
	mouse_pos_text = new TextObject().draw().hide();

document.addEventListener('keydown', (e) => {
	if (e.key === 'Control') {
		mouse_debugger = !mouse_debugger;
	}
	if (!mouse_debugger) {
		mouse_pos_dot.hide();
		mouse_pos_text.hide();
	}
});

document.addEventListener('mousedown', (e) => {
	if (mouse_debugger) {
		mouse_pos_dot.display().update({ x: e.clientX, y: e.clientY });
		mouse_pos_text.display().update({ x: e.clientX, y: e.clientY, content: `(${e.clientX},${e.clientY})` });
	}
});

// let g1 = global_timeline.add(0, 1000, Anim.translate(a, { to: [600, 300], easing: 'ease' }));
// let g2 = global_timeline
// 	.add(1000, 1000, Anim.mojibake(a, { to: '洛' }))
// 	.then(1000, 1000, Anim.mojibake(a, { to: '一' }))
// 	.then(1000, 1000, Anim.mojibake(a, { to: '是' }))
// 	.then(1000, 1000, Anim.mojibake(a, { to: '也' }));
// let g3 = global_timeline.add(3000, 1500, Anim.translate(a, { to: [400, 100], easing: [0, 0.5, 0.6, 1] }));
// let g4 = global_timeline.add(1000, 1000, Anim.translate(f, { to: [-100, 100] }));
const bs = (60 / 193.2) * 1000;

let g5 = global_timeline
	.at(0, () => a.update({ content: 'ずっとずっと思っていた', color: 'salmon' }))
	.thenAt(bs * 7, () =>
		a.update({ content: '対等には程遠いような関係', x: Math.random() * 1000, y: Math.random() * 600 })
	)
	.thenAt(bs * 9, () =>
		a.update({ content: 'ずっとずっと願っていた', x: Math.random() * 1000, y: Math.random() * 600 })
	)
	.thenAt(bs * 7, () =>
		a.update({ content: '思い込みを続けて十数年', x: Math.random() * 1000, y: Math.random() * 600 })
	)
	.thenAt(bs * 9, () =>
		a.update({ content: 'ずっとずっと騙されてた', x: Math.random() * 1000, y: Math.random() * 600 })
	)
	.thenAt(bs * 7, () =>
		a.update({ content: '対等には程遠いような関係', x: Math.random() * 1000, y: Math.random() * 600 })
	)
	.thenAt(bs * 9, () =>
		a.update({ content: 'ずっとずっと騙っていたんだね', x: Math.random() * 1000, y: Math.random() * 600 })
	);

global_timeline.init();
