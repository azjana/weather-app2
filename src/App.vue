<template>
  <div id="app" class="app__container">
    <search-city></search-city>
    <transition name="fade-short" mode="out-in">
      <div :key = "getCity" class = "main-block" v-if = "getCityChosen">
        <p class="headings">{{getCity}}</p>
        <weather-main></weather-main>      
        <weather-details v-if = 'details' :key="Math.random()"></weather-details>    
      </div>      
    </transition>
    <transition name="fade-loading" mode="out-in">
      <div v-if="getLoading" class = "loading">
        <p class='dot__container'>
          <span class = 'dot'></span>
        </p>      
      </div>
    </transition>
  </div>
</template>

<script>
import weatherMain from './components/main/Main'
import searchCity from './components/main/Search'
import weatherDetails from './components/details/Details'

import { mapGetters } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'details',
      'getCity',
      'getCityChosen',
      'getLoading'
    ])
  },
  components: {
    weatherMain,
    weatherDetails,
    searchCity
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
  min-height: 100%;
  height: 100%;
  display: grid;
  justify-content: stretch;
}
body {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
}
.headings {
  font-size: 20px;
  line-height: 30px;
  margin: 50px 0 30px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.app__container {
  width: 100%;
  min-height: 100%;
  display: flex;
  background: url('./assets/sky.jpg') top left;
  background-attachment: scroll;
  background-size: 100% 100%;
  align-items: stretch;
}
.fade-loading-enter {
  opacity: 0;
}
.fade-loading-enter-active {
  transition: opacity 0.2s ease-out;
}
.fade-loading-leave-active {
  transition: opacity 0.2s ease-out;
  opacity: 0;
}
.fade-short-enter, .fade-short-leave-to {
  opacity: 0;
}
.fade-short-enter-active {
  transition: all 0.8s ease-out 0.2s;
}
.fade-short-leave-active {
  transition: all 0.3s ease-out;
}
.fade-short-enter, .fade-short-leave-to {
  opacity: 0;
}
.main-block {
  width: 96%;
  align-self: stretch;
  margin: 0 2%;    
}
.loading {
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}
.dot {
  position: relative;
  animation: loading 2s infinite ease-in-out;
  transform-origin: center;
}
.dot, .dot:after, .dot:before {
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  display: inline-block;  
}
.dot:after, .dot:before {
  position: absolute;  
  animation: loading 2s infinite ease-in-out 1s;
  transform-origin: center;
}
.dot:after {
  left: 20px;  
}
.dot:before {
  left: -20px;
}
@keyframes loading {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
@media (min-width: 996px) {
  body {
    font-size: 16px;
  }
  .main-block {
    width: 80%;
    margin: 0 10%;
  }
}
@media (min-width: 1200px) {
  body {
    overflow: hidden;
  }
  .main-block {
    width: 75%;
    margin: 0 5%;
  }
}
</style>
