const heart = document.querySelector('.heart_btn');
heart.addEventListener('click',function(){
   heart.classList.toggle('on'); 
});

const header = document.querySelector('#header');
const side_box = document.querySelector('.side_box');

function calcFunc(){
    let cal = window.innerWidth/2+180;
    side_box.style.left = cal+'px';
}
function scrollFunc(){
    console.log(pageYOffset);
    if(pageYOffset>=10){
        header.classList.add('on');
        side_box.classList.add('on');

        calcFunc();
    }else{
        header.classList.remove('on');
        side_box.classList.remove('on');
        side_box.removeAttribute('style');
    }
}

window.addEventListener('scroll',scrollFunc);
// 스크롤을 얼마나 했는지 알려준다.