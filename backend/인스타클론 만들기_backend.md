# 인스타클론 만들기



#### MTV

<img src="..\Readme_img\MTV.png" alt="1572166118358" style="zoom:67%;" />

#### 세팅

- 가상환경 생성(미니컴퓨터 생성)

```bash
$ pyenv install 3.7.2
$ pyenv global 3.7.2
$ pyenv rehash
$ python -V
# === version 확인 후, 가상환경 원하는 폴더에서 ===
$ python -m venv django-venv
$ source django-venv/Scripts/activate
# === 그러면, 이렇게 될 것 ===
(django-venv) ~

# 그 후 npm install을 통해 이전에 깔아두었던 npm service 를 설치한다.
# npm run serve 를 통해 서버를 실행시킨다.
$ pip3 list 
# 를 외치면 최소한의 npm이 나온다.
$ pip3 install django==2.1
# 장고의 맞춤 버전을 설치한다.
$ django-admin startproject config .
# .이라는 현재 폴더에 config를 설치한다.
# 설정 파일이 생성
# settings.py 변경
$ LANGUAGE_CODE = 'ko-kr'
$ TIME_ZONE = 'Asia/Seoul'

$ python manage.py migrate
$ python manage.py runserver

# 브라우저에서 127.0.0.1:8000 확인
# 가상환경 실행
$ source django-venv/Scripts/activate
# 가상환경 종료
$  deactivate
```

