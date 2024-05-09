import axios from "axios";

const instance = axios.create();

instance.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

export default instance;
