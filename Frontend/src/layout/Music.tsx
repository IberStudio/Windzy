import React, { useRef, useState } from 'react'
import { Border } from '../components/Border'
import Button from '../components/Button'
import MusicOutput from '../components/MusicOutput'
import MusicPlayer from '../components/MusicPlayer'
import type { TrackOutput } from '../types/track'
import { putData } from '../utils/fetch'
import { usePlayer } from '../context/PlayerContext'
import { useLoading } from '../context/LoadingContext'

const Music = ({ home }: { home: boolean }) => {

    const border = Border("borders", "brownBorder")
    const darkBorder = Border("borders", "grayBorder")
    const { setVideoId } = usePlayer();

    const inputRef = useRef<HTMLInputElement>(null);
    const [searchOutput, setSearchOutput] = useState<TrackOutput[]>([]);

    const { setIsLoading } = useLoading();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const value = inputRef.current?.value?.trim();
        if (!value) return;
        const data = await putData<TrackOutput[]>('stream', `search`, { title: value });
        
        setIsLoading(false);
        setSearchOutput(data);
    }

    if (home) {
        return (
            <div className={`${darkBorder.className} max-w-full h-full flex`} style={darkBorder.style}>
                <MusicPlayer home={home} />
            </div>
        );
    }

    return (
        <div className='h-full flex flex-col gap-1'>
            <div className={`${border.className} max-h-[30%] flex-1 flex flex-col gap-1`} style={border.style}>
                <form className='flex-1 flex flex-row justify-between items-center px-3' onSubmit={handleSubmit}>
                    <input ref={inputRef} className='input-border' type="text" placeholder='Search song...' required />
                    <Button value="Search" type='submit' />
                </form>
                <div className='flex-5 flex flex-col gap-2 overflow-y-scroll'>
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
                        <p className="m-auto text-3xl text-white">No Results</p>
                    )}
                </div>
            </div>
            <div className={`${border.className} max-h-[70%] flex-1 p-2`} style={border.style}>
                <MusicPlayer home={home} />
            </div>
        </div>
    );
}

export default Music;