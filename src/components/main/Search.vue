<template>
    <div :class = "[{close: !isOpen}, 'search__container']" @click = "!isOpen ? isOpen = true : ''">
      <transition name="fade-out" mode="out-in" appear>
        <div v-if = "isOpen" key="open" class = "openPanelContent">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve" class="icon icon-cross" @click.stop = "isOpen = false">
            <polyline stroke-miterlimit="10" points="0,0 11.116,11.116 30.241,30.241 40,40 "/>
            <polyline stroke-miterlimit="10" points="40,0 30.386,9.614 10.328,29.672 0,40 "/>
          </svg>
          <div class="search__content">
            <input type="text" v-model='value' @keydown.down = "chooseCityDown( $event.target )" tabindex="0" class="city-list city-list__input" id="input" ref = "inputCity" placeholder="Wyszukaj miasto" @keyup.enter = "checkIfExist()">
            <transition-group name="fade-out" mode="out-in">
              <p v-for="(city, index) in filterCities" :ref="'cityList' + index" @click = "setCityValue(city)" @keyup.enter = "setCityValue(city)" @keydown.down = "chooseCityDown( index )" @keydown.up = "chooseCityUp( index )" tabindex="0" class = "city-list city-list__elem" :key="index">{{ city.name }}</p>
            </transition-group>
          </div>
        </div>
        <div v-else key="close">
          <p>Wybierz miasto</p>
        </div>
      </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      value: '',
      isOpen: true
    }
  },
  computed: {
    ...mapGetters([
      'cities',
      'getCityChosen',
      'getCity'
    ]),
    filterCities () {
      return this.cities.filter((city) => {
        return city.name.toLowerCase().indexOf(this.value.toLowerCase()) === 0
      })
    }
  },
  methods: {
    getWeather (city) {
      this.$store.commit('removeOldState')
      this.$store.commit('setCity', city.name)
      this.$store.commit('setLoading')

      this.getWeatherData(city.id)
        .then(response => {
          if (response !== 'error') {
            this.$store.dispatch('setData', response)
            !this.getCityChosen ? this.$store.commit('setCityChosen') : ''

            setTimeout(() => {
              this.$store.commit('setLoading')
            }, 500)
          } else {
            console.log(response)
          }
        })
    },
    setCityValue (city) {
      this.value = ''
      !(this.getCity === city.name) ? this.getWeather(city) : ''

      if (window.innerWidth < 1200) {
        setTimeout(() => {
          this.isOpen = !this.isOpen
        }, 500)
      }
    },
    chooseCityDown (e) {
      let index
      if (e.id === 'input') {
        index = 0
      } else if ((e + 1) < this.filterCities.length) {
        index = (e + 1)
      }
      this.$refs['cityList' + index][0].focus()
      // this.value = this.cities[index].name
    },
    chooseCityUp (e) {
      if (e === 0) {
        this.$refs.inputCity.focus()
      } else {
        this.$refs['cityList' + (e - 1)][0].focus()
      }
    },
    checkIfExist () {
      if (this.value.toLowerCase() === this.filterCities[0].name.toLowerCase()) {
        this.setCityValue(this.filterCities[0])
      }
    }
  },
  mounted () {
    this.getWeather(this.cities[0])
  }

}
</script>
<style>
.search__container {
  background: #fff;
  width: 100%;
  height: 100%;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 4px #003F6B;
  transition: height 1s ease-in-out 0.5s, background 1s ease-in-out;
  position: absolute;
  overflow: visible;
  z-index: 2;
}
.search__container.close {
  height: 40px;
  cursor: pointer;
}
.search__content {
  text-align: center;
  padding: 80px 0 46px;
}
.city-list {
  padding: 10px;
  width: 80%;
}
.city-list__elem {
  color: #000;
  border-bottom: 1px solid #000;
  display: inline-block;
  cursor: pointer;
  transition: background 0.4s ease;
  background: none;
}
.city-list__elem:focus, .city-list__elem:hover, .city-list__elem:active, .search__container.close:hover {
  background: #fff;
  outline: none;
}
.city-list__input {
  border: 1px solid #000;
  text-align: center;
}
.city-list__input:focus {
  outline: none;
  box-shadow: 0 0 3px #3C6884;
}
.fade-out-enter-active {
  transition: all 0.3s ease-out 1s;
}
.fade-out-leave-active {
  transition: all 0.3s ease-out;
}
.fade-out-enter, .fade-out-leave-to {
  opacity: 0;
}
.icon-cross {
  stroke: #000;
  width: 20px;
  height: auto;
  margin: 10px;
  cursor: pointer;
}
.openPanelContent {
  align-self: flex-start;
  width: 100%;
}
.search__content {
  width: 100%;
}
@media (min-width: 996px) {
  .search__container {
    width: 30%;
  }
}
@media (min-width: 1200px) {
  .search__container {
    position: relative;
    width: 15%;
    background: rgba(255, 255, 255, 0.4);
  }
}

</style>
