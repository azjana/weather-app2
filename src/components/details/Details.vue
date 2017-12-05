<template>
	<div class="app-block">
     <p>{{detailsDay.name + ' ' + detailsDay.date}}</p>
   
      <hour-details v-if="showDetailsHour">        
      </hour-details>
    
    <div  v-for = "hour in detailsDay.hourData" @click = "setHourDetails(hour)">
         <day-block :date="hour.hour" :temp="hour.temp" :icon="hour.icon">
          </day-block>
      
    </div>   
  </div>
</template>

<script>
  import dayBlock from '../DayBlock'
  import hourDetails from './HourDetails'
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'detailsDay',
        'showDetailsHour'
      ])
    },
    methods: {
      setHourDetails (hour) {
        this.$store.commit('setHourDetails', hour)
      }
    },
    components: {
      dayBlock,
      hourDetails
    }
  }
</script>