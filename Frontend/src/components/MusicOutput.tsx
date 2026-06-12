import { Border } from "./Border"
import Button from "./Button"
import type { TrackOutput } from "../types/track"

const MusicOutput = ({
    thumbnail,
    title,
    songWriter,
    onClick
}: TrackOutput & { onClick?: () => void }) => {
    const border = Border("borders", "brownBorder")

    return (
        <div
            className={`${border.className} flex flex-row bg-amber-200 justify-between items-center px-2 py-1`}
            style={border.style}
        >
            <img className="max-w-16 max-h-16 rounded-xl object-cover" src={thumbnail} alt="" />
            <div className="w-full mx-4">
                <p className="text-md line-clamp-1">{title}</p>
                <p className="text-sm text-gray-600 line-clamp-1">{songWriter}</p>
            </div>
            <Button value="Play" type="button" onClick={onClick} />
        </div>
    );
}

export default MusicOutput;