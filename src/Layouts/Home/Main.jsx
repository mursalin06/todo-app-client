import Hero from "../../Components/hero/Hero";
import Navbar from "../../Components/Navbar/Navbar";

const Main = () => {
    return (
        <div>
            {/* <nav className="sticky top-0 z-50">
                <Navbar></Navbar>
            </nav> */}
            <header>
                <Hero></Hero>
            </header>
        </div>
    );
};

export default Main;