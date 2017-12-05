<template>
  <div class = "input__container">
  	<input type="text" v-model='value' @keyup = "inputFocus = true" class="input" >
    <div v-if = "inputFocus" class = "search-list__container" @mouseover = "inputFocus = true"
    @mouseout = "inputFocus = false">
      <p v-for="city in filterCities" @click = "setCityValue(city)" >{{ city.name }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      value: '',
      inputFocus: false
    }
  },
  methods: {
    getWeather (city) {
      this.$store.commit('removeOldState')
      this.getWeatherData(city.id)
        .then(response => {
          this.$store.dispatch('setData', response)
        })
    },
    setCityValue (city) {
      this.inputFocus = false
      this.value = ''
      this.getWeather(city)
    }
  },
  computed: {
    ...mapGetters([
      'cities'
    ]),
    filterCities () {
      return this.cities.filter((city) => {
        return city.name.toLowerCase().indexOf(this.value.toLowerCase()) !== -1
      })
    }
  }

}
</script>
<style>
.input__container {
  width: 200px;
  margin: 10px auto;
  position: relative;
}
.input {
  height: 20px;
  width: 100%
}
.search-list__container {
  border: 1px solid #000;
  padding: 5px;
  position: absolute;
  left: 0;
  right: 0;
  top: 20px;
  background: #FFFCF2;
}
</style>