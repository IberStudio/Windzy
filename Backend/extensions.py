from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()
cors = CORS()


from ytmusicapi import YTMusic
ytmusic = YTMusic()

import yt_dlp

ytdlp = yt_dlp
