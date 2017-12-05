<template>
  <div class="max-min__container">
    <button class='btn' @click = "sendData">{{ text }}</button>
    <div v-if = "active">
      <span>Temperatura maksymalna: {{ max.city }}: {{ max.temp }}°C</span>
      <span>Temperatura minimalna: {{ min.city }}: {{ min.temp }}°C</span>
    </div>
    
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  
  export default {
    data () {
      return {
        min: {
          city: '',
          temp: ''
        },
        max: {
          city: '',
          temp: ''
        },
        active: false,
        text: 'Prześlij dane'
      }
    },
    computed: {
      ...mapGetters([
        'days',
        'cities',
        'getCity'
      ])
    },
    methods: {
      sendData () {
        let minLocal = 100,
            maxLocal = -100,
            minCity = this.getCity,
            maxCity = this.getCity,
            iterate = 0,
            cityArray = this.cities

        if (this.days.length) {
          minLocal = this.days[0].temp
          maxLocal = this.days[0].temp
          cityArray = this.cities.filter((e) => {
            return e.name !== this.getCity
          })
        }

        cityArray.forEach((e, index) => {
          this.getWeatherData(e.id)
          .then(response => {
            let temp = this.getTemp(response)
            if (temp < minLocal) {
              minLocal = temp
              minCity = e.name
            }
            if (temp > maxLocal) {
              maxLocal = temp
              maxCity = e.name
            }
            iterate++
            if (iterate === cityArray.length) {
              this.min.city = minCity
              this.min.temp = minLocal
              this.max.city = maxCity
              this.max.temp = maxLocal
              this.active = true
            }
          })
        })
      }
    }
  }
</script>
<style>
  .max-min__container {
    min-height: 15%;
    display: flex;
    align-items: center;
  }
</style>