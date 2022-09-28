<template>
  <main>
    <navbar/>
    <h1>Here are the available questions.</h1>
  </main>
</template>

<script>
//import DataService from '../services/DataService.js'
import navbar from '../components/navbar'
export default {
  name:'questions',
  components: {
        navbar
    },
}
</script>

<style>

</style>