"""Gunicorn configuration file for Portfolio API"""
import multiprocessing
import os

# Server socket
bind = "0.0.0.0:8000"
backlog = 2048

# Worker processes
workers = int(os.getenv("GUNICORN_WORKERS", multiprocessing.cpu_count() * 2 + 1))
worker_class = "uvicorn.workers.UvicornWorker"
worker_connections = 1000
max_requests = 1000
max_requests_jitter = 50
timeout = 120
graceful_timeout = 30
keepalive = 5

# Logging
accesslog = os.getenv("GUNICORN_ACCESS_LOG", "-")  # - means stdout
errorlog = os.getenv("GUNICORN_ERROR_LOG", "-")    # - means stdout
loglevel = os.getenv("GUNICORN_LOG_LEVEL", "info")
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s" %(D)s'

# Process naming
proc_name = "portfolio-api"

# Server mechanics
daemon = False
pidfile = None
umask = 0
user = None
group = None
tmp_upload_dir = None

# SSL (if needed)
# keyfile = None
# certfile = None

# Reload on code changes (development only)
reload = os.getenv("GUNICORN_RELOAD", "false").lower() == "true"

# Pre-fork hooks
def on_starting(server):
    """Called just before the master process is initialized."""
    server.log.info("Starting Portfolio API with Gunicorn")

def on_reload(server):
    """Called to recycle workers during a reload via SIGHUP."""
    server.log.info("Reloading Portfolio API workers")

def post_worker_init(worker):
    """Called just after a worker has been initialized."""
    worker.log.info(f"Worker {worker.pid} initialized")
