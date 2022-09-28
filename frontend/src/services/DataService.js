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
    Logout() {
        return Axios.get('/logout')
        .then((resp) => {
            console.log(resp)
            return resp
        })
        .catch(err => {
            console.log(err)
            return Promise.reject(err)
        })
    },
    IsLoggedIn() {
        return Axios.get('/isloggedin')
        .then((resp) => {
            console.log(resp)
            return resp
        })
        .catch(err => {
            console.log(err)
            return Promise.reject(err)
        })
    },
    GetAllGuestions() {
        return Axios.get('/getallquestions')
        .then((resp) => {
            console.log(resp)
            return resp
        })
        .catch(err => {
            console.log(err)
            return Promise.reject(err)
        })
    },
    GetQuestionById(id) {
        return Axios.get('/getquestionsbyid/'+id)
        .then((resp) => {
            console.log(resp)
            return resp
        })
        .catch(err => {
            console.log(err)
            return Promise.reject(err)
        })
    },
    PostNewQuestion(data) {
        return Axios.post('/postnewquestion',data)
        .then((resp) => {
            console.log(resp)
            return resp
        })
        .catch(err => {
            console.log(err)
            return Promise.reject(err)
        })
    },
    EditQuestion(id, data) {
        return Axios.post('/editquestion/'+id, data)
        .then((resp) => {
            console.log(resp)
            return resp
        })
        .catch(err => {
            console.log(err)
            return Promise.reject(err)
        })
    },
    DeleteQuestion(id, data) {
        return Axios.post('/deletequestion/'+id, data)
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