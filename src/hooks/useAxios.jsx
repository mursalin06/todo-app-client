import axios from "axios";

const axiosPB = axios.create({
    baseURL: "https://get-sh-t-done-server.vercel.app"
});

const useAxios = () => {
    return axiosPB;
}

export default useAxios;