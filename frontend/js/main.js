const header = document.querySelector('#header');
const side_box = document.querySelector('.side_box');
const delegation = document.querySelector('.contents_box');

function calcFunc(){
    let cal = window.innerWidth/2+180;
    side_box.style.left = cal+'px';
}
function scrollFunc(){
    let scrollHeight = pageYOffset+window.innerHeight;
    let documentHeight = document.body.scrollHeight;

    console.log('scrollHeight : ' + scrollHeight);
    console.log('documentHeight : ' + documentHeight);
    
    if(pageYOffset>=10){
        header.classList.add('on');
        if (side_box){
            side_box.classList.add('on');
        }
        calcFunc();
    }else{
        header.classList.remove('on');
        if (side_box) {
            side_box.classList.remove('on');
            side_box.removeAttribute('style');
        }
    }

    if (scrollHeight >= documentHeight){
        let page = document.querySelector('#page').value;
        if (page > 5) {
            return;
        }
        document.querySelector('#page').value = parseInt(page)+1;

        callMorePostAjax(page);
        
    }
}
function callMorePostAjax(page){
    if (page > 5) {
        return;
    }
    $.ajax({
        type:'get',
        url:'./post.html',
        data:{
            'page':page
        },
        dataType:'html',
        success: addMorePostAjax,
        error: function (request, status, error) {
            alert("문제 발생!");
        }
    })
}
function addMorePostAjax(data){
    delegation.insertAdjacentHTML('beforeend',data);
}
function delegationFunc(e){
    console.log(e.target);
    let elem = e.target;

    while(!elem.getAttribute('data-name')){ //데이터 이름을가지고 있지 않다면
        elem = elem.parentNode;     // 부모를 찾아 떠난다.
        if(elem.nodeName==='BODY'){ // 마지막까지 올라갔는데도 없다면 종료!
            elem = null;
            return;
        }
    }
    // 해당하는 js 실행시키기
    if(elem.matches('[data-name="heartbeat"]')){
        console.log("하트!");

        let pk = elem.getAttribute('name'); // pk 가져오기

        $.ajax({
            type:"get",
            url:"data/like.json",
            data:{pk},    //{pk}
            dataType:'json',
            success: function(response){
                let likeCount = document.querySelector('#like-count-'+pk);
                likeCount.innerHTML = '좋아요' + response.like_count+'개';
            },
            error: function(request,status,error){
                // console.log(request,error);   
                window.location.replace('https://www.naver.com');
            }
        });
    }else if(elem.matches('[data-name="share"]')) {
        console.log("공유!");
    } else if (elem.matches('[data-name="reply"]')) {
        console.log("댓글!");
    }else if (elem.matches('[data-name="bookmark"]')) {
        console.log("북마크!");
        let pk = elem.getAttribute('name');

        $.ajax({
            type: 'get',
            url: 'data/bookmark.json',
            data: { pk },
            dataType: 'json',
            success: function (res) {
                let bookmark = document.querySelector('#bookmark-count-' + pk);
                bookmark.innerHTML = '북마크' + res.bookmark_count + '개';
            },
            error: function (request, status, error) {
                alert("문제 발생!");
            }
        })
    }else if(elem.matches('[data-name="comment"]')){
        console.log('댓글');
        let comment = document.querySelector('#add-commment-post-37 > input[type=text]').value;
        console.log(comment);
        if(comment.length>140){
            alert("댓글은 최대 140자입니다. 현재 글자 수 : "+comment.length);
            return;
        }

        $.ajax({
            type:'get',
            url:'./comment.html',   //dom을 뿌려줌
            data:{
                'pk':37,
                'content':comment,
            },
            dataType:'html',
            success:function(data){
                document.querySelector('#comment-list-ajax-post-37').insertAdjacentHTML('afterbegin',data);
            },
            error:function(request,status,error){
                alert("문제 발생!");
            }
        });
        // 글 작성 시 초기화
        document.querySelector('#add-commment-post-37 > input[type=text]').value='';
    }else if(elem.matches('[data-name="comment_delete"]')){
        $.ajax({
            type:'get',
            url:'data/delete.json',
            data:{
                'pk':37
            },
            dataType:'json',
            success:function(res){
                if(res.status){
                    let comt = document.querySelector('.comment-detail');
                    comt.remove();
                }
            },
            error: function (request, status, error) {
                alert("문제 발생!");
            }
        })
    }else if(elem.matches('[data-name="follow"]')){
        $.ajax({
            type:'get',
            url:'data/follow.json',
            data:{
                'pk':37
            },
            dataType:'json',
            success:function(res){
                if(res.status){
                    alert('구독하시겠습니까?');
                    document.querySelector('input.follow').value='팔로잉';
                }else{
                    document.querySelector('input.follow').value = '팔로우';
                }
            },
            error: function (request, status, error) {
                alert("문제 발생!");
            }
        })
    }
    
    elem.classList.toggle('on');
}
// delegation 내부에서만 js 가 먹도록 변경!
// 다른 html 작업시 혼선을 방지하기 위해 delegation이 있을 경우에만 작동하도록
// 변경!
if(delegation){
    delegation.addEventListener('click',delegationFunc);
}
window.addEventListener('scroll',scrollFunc);
// 스크롤을 얼마나 했는지 알려준다.

// 새로고침하면 맨 위로 올라가짐
setTimeout(function(){
    scroll(0,0);
},100)

