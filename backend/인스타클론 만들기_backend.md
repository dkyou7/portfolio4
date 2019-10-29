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

- config > settings.py 다루기

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
            os.path.join(BASE_DIR,'config','templates'),	# <- 폴더 생성해주자.
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

- 최종 구조

![1572277932454](../Readme_img/backend_tree.PNG)

#### accounts: model

```bash
# 이미지 처리를 위한 pip download
pip install pillow
pip install pilkit
pip install psycopg2-binary
pip install django-imagekit
$ service postgresql start	# postgresql 사용하고 싶다면?
```

- accounts > models.py 

  ```python
  from django.conf import settings
  from django.db import models
  from imagekit.models import ProcessedImageField
  from imagekit.processors import ResizeToFill
  
  def user_path(instance,filename):
      from random import choice
      import string
      arr = [choice(stirng.ascii_letters) for _ in range()]
      pid = ''.join(arr)
      extension = filename.split('.')[-1]
      return 'accounts/{}/{}.{}'.format(instance.user.username, pid, extension)
  
  
  # Create your models here.
  class Profile(models.Model):
      user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
      nickname = models.CharField('별명', max_length=20, unique=True)
      picture = ProcessedImageField(upload_to=user_path,
                                      processors=[ResizeToFill(150,150)],
                                      format="JPEG",
                                      options={'quality:90'},
                                      blank=True,
                                      )
      about = models.CharField(max_length=300, blank=True)
      GENDER_C = (
          ('선택안함','선택안함'),
          ('여성','여성'),
          ('남성','남성'),
      )
      gender = models.CharField('성별(선택사항)',
                                  max_length=10,
                                  choices=GENDER_C,
                                  default='N')
  
      def __str__(self):
          return self.nickname
  ```

- 다 처리 후

  ```bash
  $ python manage.py makemigrations accounts
  $ python manage.py migrate
  ```


#### accounts:admin

- accounts - admin.py

```python
from django.contrib import admin
from .models import Profile

# Register your models here.

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['id','nickname','user']
    list_display_links = ['nickname','user',]
    search_fields = ['nickname']
```

```python
python manage.py runserver # 실행하기
```

```python
python manage.py createsuperuser	# 슈퍼유저 생성하기
```

