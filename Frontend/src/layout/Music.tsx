import React, { useRef } from 'react';
import { useState } from 'react';
import { Border } from '../components/Border';
import Button from '../components/Button';
import MusicOutput from '../components/MusicOutput';
import MusicPlayer from '../components/MusicPlayer';
import type { TrackOutput } from '../types/trackOutput';
import { putData } from '../utils/fetch';

// const { search, searchResults, searching, jumpTo } = usePlayer(playlist);

const Music = () => {

    const border = Border("borders", "brownBorder")
    const button = Border("buttons", "brownButton")

    const [currentId, setCurrentId] = useState<string>('');

    const inputRef = useRef<HTMLInputElement>(null);
    const [searchOutput, setSearchOutput] = useState<TrackOutput[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const value = inputRef.current?.value?.trim();
        if (!value) return;

        const data = await putData<TrackOutput[]>('stream', `search`, {
            title: value
        });
        setSearchOutput(data);
    }

    return (
        <div
        className={`h-full flex flex-col gap-2`}
        >
            <div
            className={`${border.className} max-h-[30%] flex-1 flex flex-col gap-1`}
            style={border.style}
            >
                <form
                className='flex-1 flex flex-row justify-between items-center px-3'
                onSubmit={handleSubmit}
                >
                    <input 
                    ref={inputRef}
                    className='input-border'
                    type="text" 
                    placeholder='Search song...'
                    required
                    />
                    <Button
                    value="Search"
                    type='submit'
                    />
                </form>
                <div
                className='flex-5 flex flex-col gap-2 overflow-y-scroll'
                >
                {
                    searchOutput && searchOutput.map((track, index) => (
                        <MusicOutput 
                        key={index}
                        videoId={track.videoId}
                        thumbnail={track.thumbnail}
                        title={track.title}
                        songWriter={track.songWriter}
                        onClick={() => {setCurrentId(track.videoId)}}
                        />
                    ))
                }
                </div>
            </div>
            <div
            className={`${border.className} max-h-[70%] flex-1 p-2`}
            style={border.style}
            >
                <MusicPlayer 
                videoId={currentId}
                />
            </div>
        </div>
    )
}

export default Music