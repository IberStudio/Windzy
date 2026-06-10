import { useEffect, useRef, useState } from 'react'
import { icons } from '../utils/imports'
import Button from './Button'
import type { TrackOutput } from '../types/trackOutput'
import { putData } from '../utils/fetch'


const MusicPlayer = ({videoId}: {videoId: string}) => {

    const API_BASE = 'http://localhost:5000/api';
    
    const player = useRef<HTMLAudioElement>(null)
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentTrack, setCurrentTrack] = useState<TrackOutput>();
    const [nextTrack, setNextTrack] = useState<TrackOutput>();
    const [queueTrack, setQueueTrack] = useState<string[]>([]);

    const [isPlaying, setIsPlaying] = useState(false);

    async function loadQueue(videoID: string) {
        if (!videoID) return;

        type RelatedResponse = {
            related: string[]; // array of video IDs
        };

        const data= await putData<RelatedResponse>('stream', `related`, {
            videoId: videoID
        });
        const mergedQueue = [videoID, ...data.related]
        setQueueTrack(mergedQueue);
        setCurrentIndex(0)
    }

    async function trackInfo(videoID: string, current: boolean) {
        if (!videoID) return;
        const data: TrackOutput = await putData<TrackOutput>('stream', `info`, {
            id: videoID
        });
        if (current) {
            setCurrentTrack(data)
        } else {
            return data
        };
    }

    async function queueInfo(id: string) {
        if (!id) return;
        const data = await trackInfo(id, false);
        setNextTrack(data)
    }

    useEffect(() => {
        if (!videoId) return;
        loadQueue(videoId);
    }, [videoId])

    useEffect(() => {
        if (currentIndex === null || queueTrack.length === 0 || !player.current) return;

        if (currentIndex >= queueTrack.length - 1) {
            loadQueue(queueTrack[queueTrack.length - 1]);
            setCurrentIndex(0);
        };

        trackInfo(queueTrack[currentIndex], true);
        queueInfo(queueTrack[currentIndex + 1]);

        const audio = player.current;
        audio.pause();
        audio.src = `${API_BASE}/stream/play/${queueTrack[currentIndex]}`;
        audio.load();
        audio.oncanplay = () => {
        audio.play().catch((err) => {
            if (err.name !== 'AbortError') console.error(err);
        });
        };
    }, [currentIndex, queueTrack]);

    // audio event listeners
    useEffect(() => {
        const audio = player.current;
        if (!audio) return;

        const onPlay  = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onEnded = () => {
        setCurrentIndex((prev) =>
            prev !== null && prev < queueTrack.length - 1 ? prev + 1 : prev
        );
        };

        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('ended', onEnded);

        return () => {
        audio.removeEventListener('play', onPlay);
        audio.removeEventListener('pause', onPause);
        audio.removeEventListener('ended', onEnded);
        };
    }, [queueTrack]);

    function togglePlay() {
        if (!player.current || queueTrack.length === 0) return;
        isPlaying ? player.current.pause() : player.current.play();
        console.log(queueInfo(queueTrack[currentIndex + 1]));
    }

   async function playNext() {
        if (currentIndex === null) return;
        if (currentIndex < queueTrack.length - 1) {
            setCurrentIndex(currentIndex + 1);
            trackInfo(queueTrack[currentIndex + 1], true);
        };
    }

    function playPrev() {
        if (currentIndex === null) return;
        if (player.current && player.current.currentTime > 3) {
            player.current.currentTime = 0;
        } else if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    return (
        <div 
        className='flex flex-col justify-center items-center gap-4 px-8'
        >
            {/* Audio */}
            <audio 
            ref={player}
            />
            {/* Thumbnail */}
            <img 
            className='w-60 h-60 rounded-xl'
            src={currentTrack?.thumbnail} 
            alt={currentTrack?.title} 
            />
            {/* Info */}
            <div
            className='flex flex-col w-full'
            >
                <div>
                    <p
                    className='text-md'
                    >{currentTrack?.title}</p>
                    <p
                    className='text-sm'
                    >{currentTrack?.songWriter}</p>
                </div>
            </div>
            {/* Buttons */}
            <div 
                className="flex flex-row justify-between items-center px-4 gap-4"
                >
                    <Button
                        value={{
                            name: "Previous",
                            url: icons.previous
                        }}
                        type="button"
                        onClick={playPrev}
                    />
                    <Button
                        value={{
                            name: "Play",
                            url: isPlaying ? icons.pause: icons.play
                        }}
                        type="button"
                        onClick={togglePlay}
                    />
                    <Button
                        value={{
                            name: "Next",
                            url: icons.next
                        }}
                        type="button"
                        onClick={playNext}
                    />

            </div>
            {/* Queue */}
            <div
            className='w-full flex flex-row justify-between mt-6'
            >
                <Button 
                    value={{
                        name: "Replay",
                        url: icons.replay
                    }}
                    type= "button"
                />
                <div
                className='flex flex-row justify-center gap-4'
                >
                    <p className='text-sm' >Queue:</p>
                    <img 
                    className='w-12 h-12 rounded-xl'
                    src={nextTrack?.thumbnail}
                    alt="" 
                    />
                </div>
            </div>
        </div>
    )
}

export default MusicPlayer