import Tasks from "./Tasks";
import Profile from "./Profile";
import Settings from "./Settings";
import Shop from "./Shop";
import Home from "./Home";
import Music from "./Music";
import type { Pages } from "../types/pages";

const Main = ({page}: {page: Pages}) => {
    const pages = {
        home: <Home />,
        tasks: <Tasks />,
        profile: <Profile />,
        settings: <Settings />,
        shop: <Shop />,
        music: <Music home={false} />
    };

    return (
        <main 
        className="h-full flex flex-col gap-2 flex-1 overflow-y-scroll"
        >
            {pages[page]}
        </main>
    )
}

export default Main