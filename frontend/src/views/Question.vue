<template>
  <main class="row">
    <navbar/>
    <div class="col-2"></div>
    <div class="col-8">
        <h1>{{ this.question.title }}</h1>
        <div v-if="this.toastVisible" class="toastBlock">
             <h5>{{this.toastText}}</h5>
        </div>
        <div class="messageArea">
            <p>{{ this.question.message }}</p>
        </div>
        <div class="mb-3" v-if="this.userId">
            <label for="exampleFormControlTextarea1" class="form-label">Here you can write your answer.</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" v-model="this.message"></textarea>
            <button class="btn btn-primary" @click="postAnswer()">Post your answer!</button>
        </div>
        <div class="answerArea">
            <div v-for="(answer,i) in question.answers" :key="i">
                <div class="oneAnswerAccepted" v-if="answer.isAccepted">
                    <div class="d-flex">
                        <div>
                            <p>{{ answer.answerDate }}</p>
                            <p>{{ answer.answerText }}</p>
                        </div>
                        <button class="btn btn-info editBTN" v-if="answer.answeringUserId == this.userId" @click="startEditing(answer._id)">Edit</button>
                        <button class="btn btn-danger editBTN" v-if="answer.answeringUserId == this.userId" @click="deleteAnswer(answer._id)">Delete</button>
                        <button class="btn btn-info editBTN" v-if="this.question.userId == this.userId" @click="acceptAnswer(answer._id)">Accept</button>
                        <button class="btn btn-danger editBTN" v-if="this.question.userId == this.userId" @click="declineAnswer(answer._id)">Decline</button>
                    </div>
                </div>
                <div class="oneAnswer" v-else>
                    <div class="d-flex">
                        <div>
                            <p>{{ answer.answerDate }}</p>
                            <p>{{ answer.answerText }}</p>
                        </div>
                        <button class="btn btn-info editBTN" v-if="answer.answeringUserId == this.userId" @click="startEditing(answer._id)">Edit</button>
                        <button class="btn btn-danger editBTN" v-if="answer.answeringUserId == this.userId" @click="deleteAnswer(answer._id)">Delete</button>
                        <button class="btn btn-warning editBTN" v-if="this.question.userId == this.userId" @click="acceptAnswer(answer._id)">Accept</button>
                        <button class="btn btn-dark editBTN" v-if="this.question.userId == this.userId" @click="declineAnswer(answer._id)">Decline</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-3 editPanel" v-if="this.amIEditing">
            <label for="exampleFormControlTextarea1" class="form-label">What is your new answer?</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" v-model="this.newAnswer"></textarea>
            <button class="btn btn-primary" @click="editAnswer()">Change your answer.</button>
            <button class="btn btn-danger" @click="cancelEditing()">Cancel</button>
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
            amIEditing: false,
            currentEdit: 0,
            newAnswer: "",
            question: {},
            message: "",
            id: 0,
            userId: 0,
            toastVisible: false,
            toastText:"asd",
        }
    },
    methods: {
        postAnswer(){
            DataService.PostNewAnswer(this.question._id, 
            {"userId": this.userId, "answer": this.message})
            .then(() => {
                    this.$router.go()
                }).catch((err) => {
                    this.toastText = err.response.data.error
                    this.toastVisible = true
                })
        },
        editAnswer(){
            console.log(this.currentEdit)
            DataService.EditAnswer(this.question._id, 
            {"userId": this.userId, "answerId": this.currentEdit, "newAnswer": this.newAnswer})
            .then(() => {
                    this.$router.go()
                }).catch((err) => {
                    this.toastText = err.response.data.error
                    this.toastVisible = true
                })
        },
        deleteAnswer(id){
            DataService.DeleteAnswer(this.question._id,
            {"userId": this.userId, "answerId": id})
            .then(() => {
                this.$router.go()
                }).catch((err) => {
                    this.toastText = err.response.data.error
                    this.toastVisible = true
                })
        },
        acceptAnswer(id){
            DataService.AcceptAnswer(this.question._id,
            {"userId": this.userId, "answerId": id})
            .then(() => {
                    this.$router.go()
                }).catch((err) => {
                    this.toastText = err.response.data.error
                    this.toastVisible = true
                })

        },
        declineAnswer(id){
            DataService.declineAnswer(this.question._id,
            {"userId": this.userId, "answerId": id})
            .then(() => {
                    this.$router.go()
                }).catch((err) => {
                    this.toastText = err.response.data.error
                    this.toastVisible = true
                })

        },
        startEditing(id){
            this.currentEdit = id
            this.amIEditing = true
        },
        cancelEditing(){
            this.amIEditing = false
        }
    },
    mounted(){
        this.id = this.$route.params.Id
        DataService.GetQuestionById(this.id).then((resp) => {
            this.question = resp.data
        })
        .then(() => {
            DataService.IsLoggedIn().then((resp) => {
                this.userId = resp.data
            })
        })
        .catch((err) => {
            console.log(err)
            this.toastText = err.response.data.error
            this.toastVisible = true
        })
    }
}
</script>

<style>
    .toastBlock{
        margin: 0;
        margin-bottom: 20px;
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
    .messageArea {
        width: 100%;
        border: 3px black solid;
        height: fit-content;
        min-height: 50px;
        margin-bottom: 10px;
    }
    .answerArea {
        width: 100%;
        border: 3px black solid;
        height: fit-content;
        min-height: 30px;
        margin-bottom: 5px;
    }
    .oneAnswer {
        width: 90%;
        border: 3px black solid;
        height: fit-content;
        min-height: 30px;
        margin: 5px;
    }
    .oneAnswerAccepted{
        width: 90%;
        border: 5px gold solid;
        height: fit-content;
        min-height: 30px;
        margin: 5px;
    }
    .editBTN{
        position: relative;
        left: 50%;
    }
    .editPanel{
        z-index: 1000;
        background-color: white;
        position: absolute;
        width: 500px;
        height: 400px;
        left: 10%;
        top: 15%;
        box-shadow: 10px 10px 8px 8px #888888;
        border: 2px black solid;
        padding: 10px;
        border-radius: 5px;
    }
</style>