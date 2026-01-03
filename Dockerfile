FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY . /app

RUN pip install uv

RUN pip install -r requirements.txt
#RUN uv pip install -r pyproject.toml --system

EXPOSE 8000

# Production command using Gunicorn with Uvicorn workers
# Configuration is in gunicorn.conf.py
CMD ["gunicorn", "main:app", "-c", "gunicorn.conf.py"]
