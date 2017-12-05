<template>
  <div class="hour-details-container">
    <div class="hour-details-close">
      <span @click = "closeDetails">x</span>
    </div>
    
    <p>{{detailsHour.hour}}</p>
    <img :src="detailsHour.icon">
    <p>Temperatura: {{detailsHour.temp}} °C</p>
    <p>Wiatr: {{detailsHour.wind}}</p>
    <p>Deszcz: {{detailsHour.rain}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'detailsHour'
    ])
  },
  methods: {
    closeDetails () {
      this.$store.commit('closeHourDetails')
    }
  }
}
</script>

<style>
  .hour-details-container {
    background: #C8DBEC;
    padding: 10px;
  }
  .hour-details-close {
    text-align: right;
    padding: 10px;
  }
  .hour-details-close p {
    cursor: cursor;
  }
</style>