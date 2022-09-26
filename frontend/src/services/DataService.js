import  Axios  from "axios";
Axios.defaults.withCredentials = true
Axios.defaults.baseURL='http://localhost:3000/api';

export default {
    Register(data) {
        return Axios.post('/register', data)
        .then((resp) => {
            console.log(resp)
            return resp
        })
        .catch(err => {
            console.log(err)
            return Promise.reject(err)
        })
    },
    Login(data) {
        return Axios.post('/login', data)
        .then((resp) => {
            console.log(resp)
            return resp
        })
        .catch(err => {
            console.log(err)
            return Promise.reject(err)
        })
    },
}