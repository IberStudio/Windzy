import Tasks from "./Tasks";
import Profile from "./Profile";
import Settings from "./Settings";
import Shop from "./Shop";
import Home from "./Home";
import Music from "./Music";


type MainProps = {
    page: "home" | "tasks" | "profile" | "settings" | "shop" | "music";
}

const Main = ({ page }: MainProps) => {
    const pages = {
        home: <Home />,
        tasks: <Tasks />,
        profile: <Profile />,
        settings: <Settings />,
        shop: <Shop />,
        music: <Music />
    };

    return (
        <main 
            className="flex flex-col gap-2 flex-1 overflow-y-scroll"
        >
            {pages[page]}
        </main>
    )
}

export default Main