<template>
  <div class="cities__container">
    <city-block v-for="city in cities" :key="city.id" :name="city.name" :id="city.id"></city-block>
  </div>  
</template>

<script>
  import { mapGetters } from 'vuex'
  import cityBlock from './CityBlock'

  export default{
    computed: {
      ...mapGetters([
        'cities'
      ])
    },
    components: {
      cityBlock
    }
  }
</script>
<style>
  .cities__container {
    width: 100%;
    padding: 20px 0;
    min-height: 20%;
  }
</style>
