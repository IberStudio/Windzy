# -*- mode: python ; coding: utf-8 -*-
from PyInstaller.utils.hooks import collect_data_files

a = Analysis(
    ['app.py'],
    pathex=[],
    binaries=[],
    datas=[
        ('config.py', '.'),
        ('extensions.py', '.'),
        ('models', 'models'),
        ('routes', 'routes'),
    ] + collect_data_files('ytmusicapi'),
    hiddenimports=['yt_dlp', 'flask_cors', 'ytmusicapi'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[
        'matplotlib', 'numpy', 'pandas', 'scipy',  # if unused
        'tkinter', 'test', 'unittest',
        'PyQt5', 'PySide2',
        'IPython', 'jupyter',
    ],
    noarchive=False,
    optimize=2,  # ← strip docstrings/asserts
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='app',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)