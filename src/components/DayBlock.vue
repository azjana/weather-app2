<template>
  <div class="short-day__container">
    <p>{{ date }}</p>
    <p class="short-day_temperature">{{ temp }}°C</p>
    <img :src="icon" class="short-day_icon">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['temp', 'date', 'icon']
  }
</script>
<style type="text/css">
  .short-day__container {
    background: #9ab7d4;
    display: flex;
    align-content: center;
    justify-content: space-around;
    margin: 10px 0;
  }
</style>