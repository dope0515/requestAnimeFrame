const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click', () => {
	anime(box, {
		prop: 'opacity',
		value: '0.9',
		duration: 1000,
	});
});

function anime(selector, option) {
	const startTime = performance.now();
	let currentValue = parseFloat(getComputedStyle(selector)[option.prop]);
	//만약 value속성으로 받은 값이 문자열이면 퍼센트 연산처리 해야되므로 정수가 아닌 실수로 값을 반환
	const isString = typeof option.value;
	if (isString === 'string') {
        const parentW = parseInt(getComputedStyle(selector.parentElement).width)
        const parentH = parseInt(getComputedStyle(selector.parentElement).height)
		
        const x = ['left','right','width'];
        const y = ['top','botton','height'];

        // 퍼센트로 적용이 안되는 속성들
        const errProps = ['margin-left','margin-right','margin-top','margin-bottom','padding-left','padding-right','padding-top','padding-bottom'];

        //퍼센트로 적용할 수 없는 속성명이 들어오면 경고문구 출력 및
        for(let cond of errProps) {
            if(option.prop === cond) return console.log('margin과 padding값은 %로 모션처리할 수 없습니다')
        }

        for(let cond of x) {
            (option.prop === cond) && (currentValue = (currentValue / parentW) * 100);
        }
        for(let cond of y) {
            (option.prop === cond) && (currentValue = (currentValue / parentH) * 100);
        }

		option.value = parseFloat(option.value);
	}

	requestAnimationFrame(move);

	function move(time) {
		let timelast = time - startTime;
		let progress = timelast / option.duration;

		progress < 0 && (progress = 0);
		progress > 1 && (progress = 1);
		progress < 1 ? requestAnimationFrame(move) : option.callback && option.callback();

		let result = currentValue + (option.value - currentValue) * progress;
        
		//전달된 value값이 문자열이면 퍼센트 처리해야 되므로 result뒤에 %처리
		if (isString === 'string') selector.style[option.prop] = result + '%';
        //전달되는 속서명이 opacity이면 실수 처리
        else if (option.prop === 'opacity') selector.style[option.prop] = result;
		//그렇지 않은경우에는 px단위이니 result뒤에 px처리
		else selector.style[option.prop] = result + 'px';
	}
}