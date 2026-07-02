import Button from "./Button"
import type { TrackOutput } from "../types/track"
import { theme } from "../constants/theme";

const MusicOutput = ({
    thumbnail,
    title,
    songWriter,
    onClick
}: TrackOutput & { onClick?: () => void }) => {

    return (
        <div
            className={`
                max-w-full
                flex flex-row justify-between items-center p-2
                border-4 ${theme.outline.border} rounded-2xl bg-white
                `}
        >
            <img className="max-w-16 max-h-16 rounded-xl object-cover" src={thumbnail} alt={title} />
            <div className="w-32 mx-4">
                <p className="text-md line-clamp-1">{title}</p>
                <p className="text-sm text-gray-600 line-clamp-1">{songWriter}</p>
            </div>
            <Button 
            cn="mx-2 text-white"
            value="Play" 
            type="button" 
            onClick={onClick} />
        </div>
    );
}

export default MusicOutput;