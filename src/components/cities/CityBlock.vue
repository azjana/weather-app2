<template>
  <button @click = 'getWeather' class = 'btn'>{{ name }}</button>
</template>

<script>

export default {
  props: ['name', 'id'],
  methods: {
    getWeather () {
      this.$store.commit('removeOldState')
      this.getWeatherData(this.id)
        .then(response => {
          this.$store.dispatch('setData', response)
          this.sendData(this.setDataToSend(response))
        })
    },
    setDataToSend (data) {
      return JSON.stringify({
        'name': this.$store.getters.getCity,
        'coordinates': {
          'longitude': data.city.coord.lon,
          'latitude': data.city.coord.lat
        },
        'temperature': Math.round(data.list[0].main.temp - 273.15)
      })
    },
    sendData (data) {
      this.$http.post('https://api.myjson.com/bins', data)
      .then(response => {
      },
      response => {
        console.log(response)
      })
    }
  }
}
</script>
<style>
  .btn {
    margin: 10px;
    padding: 10px;
    background: #fff;
    color: #456E95;
    border: 1px solid #FFF5D5;
    box-shadow: 0 2px 4px #FFF5D5;
    border-radius: 5px;
  }
</style>