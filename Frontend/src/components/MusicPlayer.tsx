import { usePlayer } from '../context/PlayerContext'
import { icons } from '../utils/imports'
import Button from './Button'

const MusicPlayer = ({ home }: { home: boolean }) => {
    const {
        currentTrack,
        nextTrack,
        isPlaying,
        currentTime,
        duration,
        togglePlay,
        playNext,
        playPrev,
        handleSeek,
    } = usePlayer();

    const format = (secs: number) => {
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    if (home) {
        return (
            <div className='relative w-full flex flex-row justify-between items-center gap-3 px-2'>
                <div className='size-28 shrink-0 border-2 border-white rounded-xl overflow-hidden'>
                    <img className='w-full h-full object-cover' src={currentTrack?.thumbnail} alt={currentTrack?.title} />
                </div>
                <div className='min-w-0 flex flex-col gap-1 flex-1'>
                    <div className='px-4'>
                        <p className='text-md truncate'>{currentTrack?.title || 'No Track Selected'}</p>
                        <p className='text-sm truncate'>{currentTrack?.songWriter || ''}</p>
                    </div>
                    <div className='px-4 flex flex-col gap-1'>
                        <input
                            type="range"
                            min={0}
                            max={duration || 0}
                            value={currentTime}
                            onChange={(e) => handleSeek(Number(e.target.value))}
                            className='w-full accent-white cursor-pointer'
                        />
                        <div className='flex justify-between text-xs text-gray-700'>
                            <span>{format(currentTime)}</span>
                            <span>{format(duration)}</span>
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly items-center px-4 gap-4">
                        <Button value={{ name: "Previous", url: icons.previous }} type="button" onClick={playPrev} />
                        <Button value={{ name: "Play", url: isPlaying ? icons.pause : icons.play }} type="button" onClick={togglePlay} />
                        <Button value={{ name: "Next", url: icons.next }} type="button" onClick={playNext} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col justify-center items-center gap-1 px-8'>
            <img
                className='w-60 h-60 rounded-xl border-2 border-white object-cover'
                src={currentTrack?.thumbnail}
                alt={currentTrack?.title}
            />
            <div className='flex flex-col w-full'>
                <p className='text-md line-clamp-2'>{currentTrack?.title || 'No Track Selected'}</p>
                <p className='text-sm line-clamp-1'>{currentTrack?.songWriter || ''}</p>
            </div>

            <div className='w-full flex flex-col gap-1'>
                <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    value={currentTime}
                    onChange={(e) => handleSeek(Number(e.target.value))}
                    className='w-full accent-white cursor-pointer'
                />
                <div className='flex justify-between text-xs text-gray-700'>
                    <span>{format(currentTime)}</span>
                    <span>{format(duration)}</span>
                </div>
            </div>

            <div className="flex flex-row justify-between items-center px-4 gap-4">
                <Button value={{ name: "Previous", url: icons.previous }} type="button" onClick={playPrev} />
                <Button value={{ name: "Play", url: isPlaying ? icons.pause : icons.play }} type="button" onClick={togglePlay} />
                <Button value={{ name: "Next", url: icons.next }} type="button" onClick={playNext} />
            </div>

            <div className='w-full flex flex-row justify-between mt-4'>
                <Button value={{ name: "Replay", url: icons.replay }} type="button" />
                <div className='flex flex-row justify-center gap-4'>
                    <p className='text-sm'>Queue:</p>
                    <img className='w-12 h-12 rounded-xl border-2 border-white object-cover' src={nextTrack?.thumbnail} alt="" />
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;