<template>
	<div class="app-block main-block">
		<search></search>
    <p>{{getCity}}</p>
    <div v-for="day in days" @click = "setDetails(day)">
      <dayBlock   :date = "day.date" :temp = "day.temp" :icon = "day.icon" @click = "clicked(day)"></dayBlock>
    </div>
	</div>	
</template>

<script>
import search from './Search'
import dayBlock from '../DayBlock'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'days',
      'details',
      'getCity'
    ])
  },
  methods: {
    setDetails (day) {
      this.$store.commit('setDetails', day)
    }
  },
  components: {
    search,
    dayBlock
  }
}
</script>
<style type="text/css">
  .main-block {
    border-right: 1px solid #456E95;
  }
  .app-block {
    width: 50%;
    min-width: 300px;
    padding: 20px 5%;
    border-top: 1px solid #456E95;
  }
</style>