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

#### github

- 다시 이전 커밋으로 돌리고 싶을 때 사용하는 명령어

  ```bash
  git reset --hard
  ```

#### accounts: create,settings

```bash	
django-admin startapp accounts 	# 뭔가를 만드는 행위. accounts 폴더가 생겼다!
```

- settings.py 다루기

```python
# ['*'] or []
ALLOWED_HOSTS = ['*']
```

```python
# folder settings
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'accounts',		# <-
]
```

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            # html settings
            os.path.join(BASE_DIR,'config','templates'),	# <-
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

```python
# language settings
LANGUAGE_CODE = 'ko-kr'

TIME_ZONE = 'Asia/Seoul'
```

```python
# js , css , media files , login redirect settings
STATIC_URL = '/static/'
STATICFILES_DIRS=[
    os.path.join(BASE_DIR,'config','static'),
]
STATIC_ROOT = os.path.join(BASE_DIR,'staticfiles')

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR,'media')

LOGIN_REDIRECT_URL = '/'
```

