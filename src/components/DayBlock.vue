<template>
  <div :class="[{'active-block': active, 'details-block active-block': details},'weather__container']" :key="temp + date">
    <p>{{ date }}</p>
    <img :src="icon" class="weather_icon">
    <p class="weather_temperature">{{ temp }}°C</p>    
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['temp', 'date', 'icon', 'active', 'details']
  }
</script>
<style type="text/css">
  .weather__container {
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0px 1px 2px #003F6B;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    margin: 5px;
    transition: background 0.4s ease-in-out, width 0.5s ease-in-out 0.5s, height 0.5s ease-in-out 0.2s, margin 0.5s ease-in-out 0.2s;
    width: 100px;
    height: 130px;
    flex-shrink: 0;
  }
  .temp__block-main .weather__container {
    min-width: 100px;
    width: 18%;
  }
  .weather__container.details-block {
    width: 200px;
    height: 200px;
  }
  .weather__container:hover {
    background: #fff;
    box-shadow: 0px 1px 4px #003F6B;
    cursor: pointer;
  }
  .weather__container.active-block {
    background: rgba(155, 181, 198, 0.6);
    box-shadow: 0px 1px 4px #003F6B;
  }
  .weather_icon {
    width: 50px;
  }
</style>