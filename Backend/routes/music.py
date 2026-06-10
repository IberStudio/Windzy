import requests
from flask import Blueprint, Response, request, jsonify
from extensions import ytdlp
from models.music_models import get_result, get_related, get_info

stream_bp = Blueprint('stream', __name__, url_prefix='/api/stream')


def get_audio_info(video_id: str) -> dict:
    """Extract audio URL and metadata from a video ID."""
    with ytdlp.YoutubeDL({'format': 'bestaudio', 'quiet': True}) as ydl:
        info = ydl.extract_info(
            f"https://youtube.com/watch?v={video_id}",
            download=False
        )
        return {
            'url': info['url'],
            'ext': info.get('ext', 'webm'),
            'title': info.get('title'),
            'duration': info.get('duration'),
            'thumbnail': info.get('thumbnail'),
        }

@stream_bp.route('/search', methods=["PUT"])
def get_music_id():
    data = request.get_json()
    title = data['title']

    return jsonify(get_result(title))


@stream_bp.put('/related')
def video_info():
    data = request.get_json()
    video_id = data['videoId']
    
    return jsonify(get_related(video_id))

@stream_bp.route('/info', methods=['GET', 'PUT'])
def get_music_info():
    data = request.get_json()
    id = data['id']

    return jsonify(get_info(id))


@stream_bp.route('/play/<video_id>', methods=['GET', 'PUT'])
def stream_audio(video_id: str):
    print(f"Received video_id: {video_id}")

    try:
        info = get_audio_info(video_id)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

    yt_response = requests.get(
        info['url'],
        stream=True,
        headers={'User-Agent': 'Mozilla/5.0'}  # some requests need this
    )

    return Response(
        yt_response.iter_content(chunk_size=4096),
        content_type=f"audio/{info['ext']}",
        headers={'Accept-Ranges': 'bytes'}
    )


