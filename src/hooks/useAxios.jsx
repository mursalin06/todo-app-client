import axios from "axios";

const axiosPB = axios.create({
    baseURL: "http://localhost:5001"
});

const useAxios = () => {
    return axiosPB;
}

export default useAxios;