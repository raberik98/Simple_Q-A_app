<template>
  <main class="row">
    <navbar/>
    <div class="col-2"></div>
    <div class="col-8">
        
        <h1>{{ this.HeaderText }}</h1>
        <div class="mb-3">
            <input class="form-control" type="text"  aria-label="default input example" v-model="this.title">
            </div>
            <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Can you explain the problem?</label>
            <textarea class="form-control" rows="9" v-model="this.message"></textarea>
            </div>
            <button class="btn btn-primary" @click="submit()">Submit</button>
            <button class="btn btn-danger" v-if="!this.amIPostingANewQuestion" @click="this.delete()">Delete</button>
            <div v-if="this.toastVisible" class="toastBlock">
                <h5>{{this.toastText}}</h5>
            </div>
        </div>
        
    <div class="col-2"></div>
  </main>
</template>

<script>
import DataService from '../services/DataService.js'
import navbar from '../components/navbar'
export default {
  name:'questionEditor',
  components: {
        navbar
    },
    data(){
        return{
            HeaderText:"What would you like to ask?" ,
            amIPostingANewQuestion: true,
            id: 0,
            userId: 0,
            title:"<The title comes here>",
            message:"<The message comes here>",
            toastVisible: false,
            toastText:"asd",
        }
    },
    methods: {
        submit(){
            if (this.amIPostingANewQuestion) {
                DataService.PostNewQuestion({"title": this.title, "message": this.message, "userId": this.userId})
                .then((resp) => {
                    this.toastText = resp.data.error
                    this.toastVisible = true
                }).catch((err) => {
                    this.toastText = err.response.data.error
                    this.toastVisible = true
                })
            }else {
                DataService.EditQuestion(this.id, {"title": this.title, "message": this.message, "userId": this.userId, "questionId": this.id})
                .then((resp) => {
                    this.toastText = resp.data.error
                    this.toastVisible = true
                }).catch((err) => {
                    this.toastText = err.response.data.error
                    this.toastVisible = true
                })
            }
        },
        delete(){
            DataService.DeleteQuestion(this.id, {"userId": this.userId})
                .then(() => {
                    this.$router.push('/questions')
                }).catch((err) => {
                    this.toastText = err.response.data.error
                    this.toastVisible = true
                })
        }
    },
    mounted(){
        DataService.IsLoggedIn().then((resp) => {
            this.userId = resp.data
            this.id = this.$route.params.Id
            if (this.id != 11) {
                this.amIPostingANewQuestion = false
                this.HeaderText = "How would you like to edit your question?"
                DataService.GetQuestionById(this.id).then((resp) => {
                    this.title = resp.data.title
                    this.message = resp.data.message
                })
            }
        }).catch((err) => {
            console.log(err)
            this.$router.push('/')
        })
    }
}
</script>

<style>
    .toastBlock{
        margin: 0;
        position: relative;
        left: 0;
        height: 30px;
        width: 700px;
        background-color: rgb(180, 89, 89);
        color: white;
        border-radius: 10px;
        padding-top: 30px;
        padding-bottom: 30px;
    }
</style>