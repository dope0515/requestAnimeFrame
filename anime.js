/*
    perfomance.now();
    1ms단위로 정밀한 시간계산이 가능
    브라우저가 로딩된 순간부터 해당 구문이 호출되는 시점까지 시간을 ms단위로 반환
    requestAnimationFrame에서는 고정된 반복횟수, 고정된 수치값안에서 원하는 시간동안 동작 = 각 반복 횟수마다의 변화량을 제어
*/
const btn = document.querySelector('button');
const box = document.querySelector('#box');
let speed = 1000;
let tartgetValue = 500;
let startTime = 0;
let count = 0;

// 1초동안 500px 이동
btn.addEventListener('click',()=>{
    startTime = performance.now();
    requestAnimationFrame(move);
});

function move(time){
    //각 사이클마다 걸리는 누적시간
    let timelast = time - startTime;
    
    //매 반복횟수마다 현재 걸리는 누적시간을 전체시간으로 나누면 0 ~ 1 사이의 실수값이 반환 (* 100 = 백분율)
    //progress : 설정한 시간대비 현재 반복되는 수치값의 진행상황을 0~1사의 실수값으로 반환한 값
    let progress = timelast / speed;

    console.log('누적시간',timelast);
    console.log('진행률',progress);
    console.log('반복횟수',count++);
    console.log('-------------'); 
    
    //진행률이 음수거 되거나 1이 넘어가면 각각 0,1로 보정
    progress < 0 && (progress = 0);
    progress > 1 && (progress = 1);
    //진행률이 1에 도달하지 않을떄까지만 반복처리
    progress < 1 && requestAnimationFrame(move);
    //고정된 시간값을 활용한 보정된 진행률로 고정 반복횟수안에서 움직임 폭을 설정
    box.style.marginLeft = tartgetValue * progress + 'px';
}