<template>
  <main class="row">
    <navbar/>
    <div class="col-2"></div>
    <div class="col-8">
        
        <h1>Here you can view the available questions.</h1>

        <ol class="list-group list-group-numbered">
          <li class="list-group-item d-flex justify-content-between align-items-start" v-for="(question,i) in questions" :key="i">
            <div class="ms-2 me-auto">
              <div class="fw-bold"><router-link :to='"/question/"+question._id'>{{question.title}}</router-link></div>
              Click here to for more detail.
            </div>
            <button v-if="question.userId == this.userId" class="btn btn-success" @click="edit(question._id)">Edit</button>
          </li>
        </ol>
    </div>
    <div class="col-2"></div>
  </main>
</template>

<script>
import DataService from '../services/DataService.js'
import navbar from '../components/navbar'
export default {
  name:'questions',
  components: {
        navbar
    },
    data(){
        return{
            userId: 0,
            questions: [],
            toastVisible: false,
            toastText:"asd",
        }
    },
    methods: {
        edit(id){
          this.$router.push('/editquestion/'+id)
        }
    },
    mounted(){
        DataService.IsLoggedIn().then((resp) => {
            this.userId = resp.data
            if (this.userId) {
                DataService.GetAllGuestions().then((resp) => {
                    this.questions = resp.data
                })
            }
        }).catch((err) => {
            console.log(err)
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