import React, { useRef, useState } from 'react'
import Button from '../components/Button'
import MusicOutput from '../components/MusicOutput'
import MusicPlayer from '../components/MusicPlayer'
import type { TrackOutput } from '../types/track'
import { putData } from '../utils/api'
import { usePlayer } from '../context/PlayerContext'
import { LoadingProvider } from '../context/LoadingContext'
import { theme } from '../constants/theme'

const Music = () => {

    const { setVideoId } = usePlayer();

    const inputRef = useRef<HTMLInputElement>(null);
    const [searchOutput, setSearchOutput] = useState<TrackOutput[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const value = inputRef.current?.value?.trim();
        if (!value) return;
        const data = await putData<TrackOutput[]>('stream', `search`, { title: value }, "Search Music");
        
        setSearchOutput(data);
    }

    return (
        <div 
        className={`${theme.secondary.bg} h-full flex flex-row`}
        >
            <div 
            className={`
                flex-3 flex flex-col gap-5 
                border-r-4 ${theme.outline.border}
                `}
            >
                <h2
                className='
                flex justify-center items-center text-center mt-5
                text-3xl font-bold 
                '
                >
                    Find Your Song
                </h2>
                <form className='flex flex-row justify-between items-center px-2 gap-2 border-b-4 border-black pb-4' onSubmit={handleSubmit}>
                    <input 
                    ref={inputRef} 
                    className={`
                        w-[80%]
                        border-4 ${theme.outline.border}
                        bg-white px-3 py-1 rounded-2xl
                        `} 
                    type="text" 
                    placeholder='Search song...' 
                    required />
                    <Button cn='text-white' value="Search " type='submit' />
                </form>
                <div className='relative w-full h-full flex flex-col pl-4 pr-2 gap-2 max-h-120 pb-2 overflow-y-auto'>
                    <LoadingProvider loadingKey='Search Music'/>
                    {searchOutput.length !== 0 ? (
                        searchOutput.map((track, index) => (
                            <MusicOutput
                            key={index}
                            videoId={track.videoId}
                            thumbnail={track.thumbnail}
                            title={track.title}
                            songWriter={track.songWriter}
                            onClick={() => setVideoId(track.videoId)}
                            />
                        ))
                    ) : (
                        <p 
                        className="w-full h-full flex justify-center items-center text-3xl">
                            No Results
                        </p>
                    )}
                </div>
            </div>
            <div
            className={`flex-5 ${theme.primary.bg}`}
            >

            </div>
            <div 
            className={`
                relative
                flex-3 flex flex-col p-2
                border-l-4 ${theme.outline.border}
                `}
            >
                <MusicPlayer />
            </div>
        </div>
    );
}

export default Music;