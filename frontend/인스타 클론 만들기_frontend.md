# 인스타 클론 만들기

#### header

- spritecow

  - 이미지 위치 css 지정해주는 곳

- 높이값은 자식한테 주는거다?

  - 1:36초 참고

  - background는 이미지를 넣었을 때 크기를 갖지 않기 때문에 강제로 width와 height를 줘야한다

    ```css
    .sprite {
    	background: url('../imgs/background01.png') no-repeat -53px -235px;
    	width: 22px;
    	height: 22px;
    }
    ```

- display:inline-block

  - 이거는 inline 속성과 block 속성을 같이 주고싶을 때 사용한다고 한다.

- after 가상 선택자 적용하기

  - 부모에게 position이 지정되어있어야 부모 안에서 놀 수 있다.

- 헤더 이쁘게 꾸미는 방법. 및 배치 예쁘게 하기

  ```css
      display: flex;
      justify-content: space-between;
      align-items: center;
  ```

- absolute 하려면 부모의 position의 기준점을 잡아주는 것이 좋다.

- 검색 input의 검색 글자위치를 조정하는부분 너무 궁굼하다.

  - 해결해씀 -> px가 24px짜리가 있고 10px짜리가 있는데 나는 24px짜리를 사용하고 있었기에 크기가 맞지 않았던 것이다.
  - 그래도 사진이 그렇게밖에 없을 경우 어떻게 해결하는지 궁굼해졌다.

#### contents

- x 축 가운데 정렬 하는 방법

  ```css
  display: flex;
  justify-content: center;
  ```


- overflow:hidden
  - 자식이 흘러넘치면 안되는 경우 사용
  - 6:32~,10:20~ 참고

#### side_box

- absolute : 부모의 기준점이 없다면 꼭대기 부모까지 올라가버린다.
- 기준점 잡고싶은 부모에게 position: relative 걸어주면 된다.

#### 반응형 적용

- 메타태그를 적용하는 것
  - 웹 사이트의 셋팅을 도와주는 역할(1:00~)

#### javascript 란?

- html : 뼈대
- css : 예쁜 옷
- JS : 근육의 역활. 동적인 웹사이트로 변환함

#### 데이터 타입

- let : 허용한다. 

- const : 담아두게 되면 다른게 들어올 수 없다.

  ```js
  const userName = "유동관";	//string
  const age = 28; //number
  const married = false;	//boolean
  let girlfriend;	//undefined
  cosnt money = null;	//Object
  ```

#### 연산자

- 비교연산자

  ```js	
  userName === age	//=== 3개 찍힌다.
  ```

- 선택자

  - DOM Object 를 선언한다.(Document Object Model)

    ```js
    //document.getElementsByClassName('box');
    const box = document.querySelector('.box');
    // 여러개일 경우
    const boxes = document.querySelectorAll('.box');
    ```

#### 클릭 이벤트

```js
const logo = document.querySelector('.logo');	// 먼저 선택해준다.
logo.addEventListener('click',function(){		// 클릭 이벤트를 준다.
  alert('로고입니다.');
});
```

- 클래스를 줘서 스타일링 하는 방법

  포인트 점수 

  - id : 100
  - class : 10
  - Tag : 1

- 스위치처럼 스타일링하기

```html
<!-- html -->
<div class="heart_btn">
  <div class="icon_heart_outline"></div>
</div>
```

```js
//js
const heart = document.querySelector('.heart_btn');	// 먼저 선택해준다.
heart.addEventListener('click',function(){		// 클릭 이벤트를 준다.
  heart.classlist.toggle('on');					// on이라는 클래스를 더해준다.
});
```

```css
/* css */
.heart_btn.on .icon_heart_outline{
  /* 변화된 css 값을 입력해준다.*/
  background: url('../imgs/background01.png') no-repeat -26px -261px;
}
```

- 한계 : 하나만 가능하다. 여러개 있으면 가장 위에꺼만 된다.
- 극복 : 이벤트 델리게이션을 써서 각각의 컨텐츠에 이벤트를 설정할 수 있도록 한다.

#### scroll-event

- 함수의 이름을 지정안하고도 만들 수 있다.

```js
// main.js
const header = document.querySelector('#header');
const side_box = document.querySelector('.side_box');

window.addEventListener('scroll',scrollFunc);	// 스크롤을 얼마나 했는지 알려준다.

function scrollFunc(){
    console.log(pageYOffset);
    if(pageYOffset>=10){
        header.classList.add('on');
        side_box.classList.add('on');

        calcFunc();		// 함수 실행
    }else{
        header.classList.remove('on');
        side_box.classList.remove('on');
        side_box.removeAttribute('style');
    }
}

function calcFunc(){
    let cal = window.innerWidth/2+180;
    side_box.style.left = cal+'px';
}
```

```css
/* css */
#header.on{
    position: fixed;
}
```

#### resize-event

#### event-delegation 1부

```js
const delegation = document.querySelector('.contents_box');

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
    }else if(elem.matches('[data-name="share"]')) {
        console.log("공유!");
    } else if (elem.matches('[data-name="reply"]')) {
        console.log("댓글!");
    }else if (elem.matches('[data-name="bookmark"]')) {
        console.log("북마크!");
    }
    
    elem.classList.toggle('on');	// 원하는 클래스를 더해준다.
}
delegation.addEventListener('click',delegationFunc);
```

#### event-delegation 2부

```js
// delegation 내부에서만 js 가 먹도록 변경!
// 다른 html 작업시 혼선을 방지하기 위해 delegation이 있을 경우에만 작동하도록
// 변경!
if(delegation){
    delegation.addEventListener('click',delegationFunc);
}
```

```js
// 새로고침하면 맨 위로 올라가짐
setTimeout(function(){
    scroll(0,0);
},100)
```

#### ajax 란?

- 비동기적 vs 동기적
  - 동기적 : 1번을 하는 도중 2번과 3번의 일을 수행시 1번이 끝날때까지 기다리기
  - 비동기적 : 부분만 통신하는 것. 내리면 끝도 없이 내려가는 타임라인. 보여줄 부분만 보여주기

#### jQuery 를 사용한 ajax 통신-좋아요

- cdn 삽입

```html
<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
```

```js
$.ajax({
    type:"get",
    url:"data/like.json",
    data:37,    //{pk}
    dataType:'json',
    success: function(response){
        let likeCount = document.querySelector('#like-count-37');
        likeCount.innerHTML = '좋아요' + response.like_count+'개';
    },
    error: function(request,status,error){
        // console.log(request,error);   
        window.location.replace('https://www.naver.com');
    }
});
```

#### ajax - 북마크

```html
<!-- index.html -->
<div class="bottom_icons">
    <div class="left_icons">
        <div class="heart_btn">
            <!-- name 등록하기 -->
            <div class="icon_heart_outline" name='37' data-name="heartbeat"></div>
        </div>
        <div class="icon_bubble" data-name="reply"></div>
        <div class="icon_share" data-name="share"></div>
    </div>
    <div class="right_icon">
        <!-- name 등록하기 -->
        <div class="icon_bookmark" name='37' data-name="bookmark"></div>
    </div>
</div>
```

#### ajax - 댓글달기

```js
else if(elem.matches('[data-name="comment"]')){
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
}
```

```html
<!-- comment.html -->
<div class="comment-detail">
    <div class="nick_name m_text">kindTiger</div>
    <div>강아지 귀욥네<button data-name='comment_delete'>삭제</button></div>
</div>
```

```html
<!-- index.html -->
<div class="comment_container">
    <div class="comment" id='comment-list-ajax-post-37'>
        <div class="comment-detail">
            <div class="nick_name m_text">dkyou7</div>
            <div class="comment_content">강아지가 귀엽네요~!</div>
        </div>
    </div>
    <div class="small_heart">
        <div class="icon_small_heart_outline"></div>
    </div>
</div>

<div class="timer">1시간 전</div>

<div class="comment_field" id='add-commment-post-37'>
    <input type="text" placeholder="댓글달기...">
    <!-- 데이터 이름이 comment 이다. -->
    <div class="upload_btn m_text" data-name="comment">게시</div>
</div>
```

#### ajax - 댓글 삭제

```js
else if(elem.matches('[data-name="comment_delete"]')){
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
        }
    })
}
```

#### ajax - 팔로우

1. 토글 버튼으로 팔로우 띄우기
2. 팔로우 클릭 시 팔로윙 하기

````html
<div class="icon_more" data-name="more">
    <ul class="toggle_box">
        <li><input type='submit'value='팔로우' class='follow' data-name='follow'></li>
        <li>수정</li>
        <li>삭제</li>
    </ul>
</div>
````

```js
// main.js
else if(elem.matches('[data-name="follow"]')){
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
```

#### ajax - 무한스크롤

```html
<input type='hidden' id='page' value='0'>
```

```js
function scrollFunc(){
    let scrollHeight = pageYOffset+window.innerHeight;
    let documentHeight = document.body.scrollHeight;
    ...
    if (scrollHeight >= documentHeight){
        let page = document.querySelector('#page').value;
        if (page > 5) {
            return;
        }
        document.querySelector('#page').value = parseInt(page)+1;

        callMorePostAjax(page);
        
    }
}
```

```js
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
```

