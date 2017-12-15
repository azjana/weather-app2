<template>
  <transition name="fade-short" mode="out-in">
    <div :key = "getCity + detailsDay.date">
      <p class="headings">Pogoda: {{ detailsDay.name }} {{ detailsDay.date.split('-').reverse().join('-') }}</p> 
    
    	<div class="temp__block" >
        <day-block v-for = "hour in detailsDay.hourData" @click.native = "setHourDetails(hour)" :date="hour.hour" :temp="hour.temp" :icon="hour.icon" :details = "ifHourActive(hour.hour)" :key = "detailsDay.name + hour.hour">
          <transition name="slide-text" mode="out-in">
            <div v-if="ifHourActive(hour.hour)" class="weather__details">
              <p>Wiatr: {{ hour.wind }} m/s</p>
              <p>
                Deszcz: 
                <span v-if="hour.rain !== '0'">{{ Number.parseFloat(hour.rain/3).toFixed(2) }}</span>
                <span v-else>0</span> m<span class="sup">3</span>/h
              </p>
              <p>
                Śnieg: 
                <span v-if="hour.snow !== '0'">{{ Number.parseFloat(hour.snow/3).toFixed(2) }}</span>
                <span v-else>0</span> m<span class="sup">3</span>/h
              </p>
            </div>
          </transition>
        </day-block>                
      </div>
    </div>
  </transition>
</template>

<script>
  import dayBlock from '../DayBlock'
  import hourDetails from './HourDetails'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        details: '',
        date: ''
      }
    },
    computed: {
      ...mapGetters([
        'detailsDay',
        'showDetailsHour',
        'getCity'
      ])
    },
    methods: {
      setHourDetails (hour) {
        this.details = !(this.details === hour.hour + this.date) ? hour.hour + this.date : ''
        this.$store.commit('setHourDetails', hour)
      },
      ifHourActive (hourData) {
        return hourData + this.date === this.details
      }
    },
    components: {
      dayBlock,
      hourDetails
    },
    updated () {
      this.date = this.detailsDay.date
    },
    mounted () {
      this.date = this.detailsDay.date
    }
  }
</script>
<style type="text/css">
  .weather__details {
    text-align: center;
  }
  .slide-text-enter {
    opacity: 0;
    transform: translateY(20px);
  }
  .slide-text-enter-active {
    animation: slide-text-in 1.2s ease-out forwards;    
  }
  .slide-text-leave-active {
    animation: slide-text-out 0.4s ease-out forwards;
  }
  .slide-text-move {
    transition: transform 1s;
  }
  .sup {
    position: relative;
    bottom: 10px;
    font-size: 10px;
  }
  @keyframes slide-text-in {
    0% {
      transform: translateY(10px);
      opacity: 0;
    }
    50% {
      transform: translateY(10px);
      opacity: 0;
    }
    80% {
      opacity: 0.2;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-text-out {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(10px);
      opacity: 0;
    }
  }
</style>