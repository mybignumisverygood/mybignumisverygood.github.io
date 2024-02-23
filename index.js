// Phase 1: 从一切的源头

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
