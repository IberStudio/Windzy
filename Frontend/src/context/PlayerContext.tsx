// context/PlayerContext.tsx
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { TrackOutput } from '../types/track'
import { putData } from '../utils/fetch'
import { useLoading } from './LoadingContext';

const API_BASE = 'http://localhost:5000/api';

type PlayerContextType = {
    player: React.RefObject<HTMLAudioElement | null>;
    currentTrack?: TrackOutput;
    nextTrack?: TrackOutput;
    queueTrack: string[];
    currentIndex: number;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    setVideoId: (id: string) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrev: () => void;
    handleSeek: (time: number) => void;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
    const player = useRef<HTMLAudioElement>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentTrack, setCurrentTrack] = useState<TrackOutput>();
    const [nextTrack, setNextTrack] = useState<TrackOutput>();
    const [queueTrack, setQueueTrack] = useState<string[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [videoId, setVideoIdState] = useState<string>('');

    const {setIsLoading} = useLoading()

    async function loadQueue(videoID: string) {
        if (!videoID) return;
        setIsLoading(true)
        type RelatedResponse = { related: string[] };
        const data = await putData<RelatedResponse>('stream', `related`, { videoId: videoID });
        const mergedQueue = [videoID, ...data.related];
        setIsLoading(false)
        setQueueTrack(mergedQueue);
        setCurrentIndex(0);
    }
    
    async function trackInfo(videoID: string, current: boolean) {
        if (!videoID) return;
        const data: TrackOutput = await putData<TrackOutput>('stream', `info`, { id: videoID });
        if (current) {
            setCurrentTrack(data);
        } else {
            return data;
        }
    }
    
    async function queueInfo(id: string) {
        if (!id) return;
        const data = await trackInfo(id, false);
        setNextTrack(data);
    }

    function setVideoId(id: string) {
        if (!id || id === videoId) return;
        setVideoIdState(id);
        loadQueue(id);
    }

    useEffect(() => {
        if (currentIndex === null || queueTrack.length === 0 || !player.current) return;

        if (currentIndex >= queueTrack.length - 1) {
            loadQueue(queueTrack[queueTrack.length - 1]);
            setCurrentIndex(0);
        }

        trackInfo(queueTrack[currentIndex], true);
        queueInfo(queueTrack[currentIndex + 1]);
        
        const audio = player.current;
        audio.pause();
        audio.src = `${API_BASE}/stream/play/${queueTrack[currentIndex]}`;
        setIsLoading(true)
        audio.load();
        audio.oncanplay = () => {
            audio.play().catch((err) => {
                if (err.name !== 'AbortError') console.error(err);
            });
            setIsLoading(false)
        };
        
        audio.onerror = () => {
            setIsLoading(false)
        }

        setCurrentTime(0);
        setDuration(0);
    }, [currentIndex, queueTrack]);

    useEffect(() => {
        const audio = player.current;
        if (!audio) return;

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onEnded = () => {
            setCurrentIndex((prev) =>
                prev !== null && prev < queueTrack.length - 1 ? prev + 1 : prev
            );
        };
        const onTimeUpdate = () => setCurrentTime(audio.currentTime);
        const onLoadedMetadata = () => setDuration(audio.duration);

        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('ended', onEnded);
        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('loadedmetadata', onLoadedMetadata);

        return () => {
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('ended', onEnded);
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('loadedmetadata', onLoadedMetadata);
        };
    }, [queueTrack]);

    function togglePlay() {
        if (!player.current || queueTrack.length === 0) return;
        isPlaying ? player.current.pause() : player.current.play();
    }

    function playNext() {
        if (currentIndex < queueTrack.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    function playPrev() {
        if (player.current && player.current.currentTime > 3) {
            player.current.currentTime = 0;
        } else if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    function handleSeek(time: number) {
        if (!player.current) return;
        player.current.currentTime = time;
        setCurrentTime(time);
    }

    return (
        <PlayerContext.Provider value={{
            player,
            currentTrack,
            nextTrack,
            queueTrack,
            currentIndex,
            isPlaying,
            currentTime,
            duration,
            setVideoId,
            togglePlay,
            playNext,
            playPrev,
            handleSeek,
        }}>
            <audio ref={player} />
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => {
    const ctx = useContext(PlayerContext);
    if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
    return ctx;
};