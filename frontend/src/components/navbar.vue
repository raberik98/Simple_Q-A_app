<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                <router-link class="nav-link" to="/">Landing Page</router-link>
                </li>
                <li class="nav-item">
                <router-link class="nav-link" to="/questions">Questions</router-link>
                </li>
                <li class="nav-item">
                <router-link class="nav-link" v-if="this.loggedIn" to="/askquestion/11">Ask a Question</router-link>
                </li>
                <li class="nav-item">
                <button class="nav-link navbarButton" v-if="this.loggedIn" @click="logOut()">Logout</button>
                </li>
            </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import Dataservice from '../services/DataService.js'
export default {
    name:"navbar",
    data(){
        return{
            loggedIn:false
        }
    },
    methods: {
            logOut(){
                Dataservice.Logout().then(
                () => {
                    this.$router.push('/')
                }
            ).catch((err) => {
                console.log(err)
                this.$router.push('/')
            })
        }
    },
    mounted(){
        Dataservice.IsLoggedIn().then((resp) => {
            if (resp != false) {
                this.loggedIn = true
            }
        }).catch((err) => {
            console.log(err)
        })
    }
}
</script>
    
<style>
    .navbarButton{
        border: 0;
    }
</style>