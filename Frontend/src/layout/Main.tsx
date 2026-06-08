import Worklist from "./Worklist";
import Profile from "./Profile";
import Settings from "./Settings";
import Shop from "./Shop";


type MainProps = {
    page: "worklist" | "profile" | "settings" | "shop";
}

const Main = ({ page }: MainProps) => {
    const pages = {
        worklist: <Worklist />,
        profile: <Profile />,
        settings: <Settings />,
        shop: <Shop />,
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