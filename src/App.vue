<template>
  <div id="app">
    <weather-cities></weather-cities>
    <weather-max-min></weather-max-min>
    <div class="wather-data__container">
      <weather-main></weather-main>
      <weather-details v-show = 'details'></weather-details>
    </div>
    
  </div>
</template>

<script>
import weatherMain from './components/main/Main'
import weatherDetails from './components/details/Details'
import weatherCities from './components/cities/Cities'
import weatherMaxMin from './components/maxMin/MaxMin'

import { mapGetters } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'details'
    ])
  },
  components: {
    weatherMain,
    weatherDetails,
    weatherCities,
    weatherMaxMin
  }
}
</script>

<style>
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body, html {
  background: #F0F6FC;
  min-height: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  min-height: 100%;
}

.wather-data__container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content:;
  min-height: 65%;
}
</style>
