import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Error() {
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // Update theme if it changes in localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            setTheme(localStorage.getItem("theme") || "light");
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} flex items-center justify-center h-screen`}>
            <div className="text-center">
                <h1 className="text-6xl font-bold tracking-wide">OOPS!</h1>
                <p className="text-xl mt-2">404 - The page can't be found</p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-6 px-6 py-3 bg-primary text-white rounded-lg text-lg font-semibold hover:bg-orange-600 transition"
                >
                    Go to Homepage
                </button>
            </div>
        </div>
    );
}
