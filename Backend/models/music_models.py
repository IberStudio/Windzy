from extensions import ytmusic, db

class Music(db.Model):
    __tablename__ = "music"
    id = db.Column(db.Integer, primary_key=True)
    video_id = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "videoId" : self.video_id,
        }

def get_info(id: str):

    info = ytmusic.get_song(id)

    return {
        "videoId": id,
        "thumbnail": info["videoDetails"]["thumbnail"]["thumbnails"][-1]["url"],
        "title": info["videoDetails"]["title"],
        "songWriter": info["videoDetails"]["author"]
    }

def get_result(query: str):

    result = []

    try:
        results = ytmusic.search(query, filter="songs", limit=10)
        for info in results:
            result.append({
                "videoId": info["videoId"],
                "thumbnail": info["thumbnails"][-1]["url"],
                "title": info["title"],
                "songWriter": [name["name"] for name in info["artists"]]
            })

        return result
    except KeyError:
        return result

def get_related(query: str):
    results = ytmusic.search(query, filter="songs")[0]

    watch = ytmusic.get_watch_playlist(results["videoId"])

    related = ytmusic.get_song_related(
        watch["related"]
    )

    video_ids = []

    for section in related:
        for item in section.get("contents", []):
            if "videoId" in item:
                video_ids.append(item["videoId"])

    return {
        "related": video_ids
    }
