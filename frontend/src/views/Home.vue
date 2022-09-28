<template>
 <main class="row">
    <navbar/>
    <div class="col-2"></div>
    <div class="col-8">
        
        <h1>Stackoverlow</h1>
    
        <div class="d-flex authenticationButtons">
            <button class="btn btn-primary m-2" @click="IWantToRegister()">Register</button>
            <button class="btn btn-primary m-2" @click="IWantToLogin()">Login</button>
        </div>
        <div v-if="this.toastVisible" class="toastBlock">
            <h4>{{this.toastText}}</h4>
        </div>
        <form @submit.prevent="FormSubmit()" v-if="this.formVisible" class="autenticationForm">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="this.email">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" v-model="this.password">
            </div>
            <button type="submit" class="btn btn-primary m-2">{{this.buttonText}}</button>
            <button class="btn btn-danger" @click="closeForm(event)">Close</button>
        </form>
    </div>
    <div class="col-2"></div>
 </main>
</template>

<script>
import DataService from '../services/DataService.js'
import navbar from '../components/navbar'
export default {
    name:"Home",
    components: {
        navbar
    },
    data(){
        return{
            doIWantToRegister: false,
            formVisible: false,
            toastVisible: false,
            toastText:"asd",
            email:"",
            password:"",
            buttonText:"Login"
        }
    },
    methods: {
        IWantToLogin(){
            this.doIWantToRegister = false
            this.formVisible = true
            this.buttonText = "Login"
        },
        IWantToRegister(){
            this.doIWantToRegister = true
            this.formVisible = true
            this.buttonText = "Register"
        },
        closeForm(){
            this.formVisible = false
        },
        closeToast(){
            this.toastVisible = false
            this.toastText = ""
        },
        FormSubmit(){
            if (this.doIWantToRegister == false) {
                DataService.Login({"email":this.email,"password":this.password})
                .then(()=>{
                    this.$router.push('/questions')
                })
                .catch(err => {
                    console.log(err.response.data.error)
                    this.toastVisible = true
                    this.toastText = err.response.data.error
                })
            }
            if (this.doIWantToRegister) {
                DataService.Register({"email":this.email,"password":this.password})
                .then((err)=>{
                    console.log(err.response.data.error)
                    this.toastVisible = true
                    this.toastText = err.response.data.error
                })
                .catch(err => {
                    console.log(err.response.data.error)
                    this.toastVisible = true
                    this.toastText = err.response.data.error
                })
            }
        }
    }
}
</script>

<style>
    .authenticationButtons{
        margin-top: 30px;
        margin-left: 50px;
    }
    .autenticationForm{
        z-index: 1000;
        background-color: white;
        position: absolute;
        width: 250px;
        height: 400px;
        left: 10%;
        top: 15%;
        box-shadow: 10px 10px 8px 8px #888888;
        border: 2px black solid;
        padding: 10px;
        border-radius: 5px;
    }
    .toastBlock{
        display: flex;
        position: absolute;
        top: 5%;
        left: 35%;
        height: 30px;
        width: 600px;
        background-color: rgb(180, 89, 89);
        padding: 10px;
        color: white;
        border-radius: 10px;
        padding-top: 30px;
        padding-bottom: 30px;
    }


</style>