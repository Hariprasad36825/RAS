release: python manage.py collectstatic
release: python manage.py migrate
web: gunicorn RAS.wsgi
web:node index.js
