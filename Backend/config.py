import sys
import os

if getattr(sys, 'frozen', False):
    base_dir = os.path.dirname(sys.executable)
else:
    base_dir = os.path.dirname(os.path.abspath(__file__))

instance_dir = os.path.join(base_dir, 'instance')
os.makedirs(instance_dir, exist_ok=True)  # ← ensures folder exists

class Config:
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(instance_dir, 'app.db')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False