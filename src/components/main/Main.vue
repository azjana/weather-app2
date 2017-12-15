<template>
  <transition name="fade-short" mode="out-in">
    <div class="temp__block temp__block-main" :key = "getCity +'Data'">
      <dayBlock  v-for="day in days" :date = "day.name" :temp = "day.temp" :icon = "day.icon"  @click.native = "setDetails(day)" :active = "isActiveDay(day.date)" :key = "day.name + getCity"></dayBlock>
    </div>
  </transition>	
</template>

<script>

import dayBlock from '../DayBlock'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'days',
      'getCity',
      'detailsDay'
    ])
  },
  methods: {
    setDetails (day) {
      if (!this.isActiveDay(day.date)) {
        this.$store.commit('setDetails', day)
      }
    },
    isActiveDay (date) {
      return date === this.detailsDay.date
    }
  },
  components: {
    dayBlock
  },
  mounted () {
    if(this.days[0] !== undefined) {
      this.$store.commit('setDetails', this.days[0])
    }    
  }
}
</script>
<style type="text/css">
  .temp__block {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
  }
 
</style>