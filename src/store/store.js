import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    city: '',
    days: [],
    cityChosen: false,
    showDetails: false,
    detailsDay: {},
    showDetailsHour: false,
    detailsHour: {},
    loading: false,
    cities: [
      {
        'name': 'Warszawa',
        'id': 6695624
      },
      {
        'name': 'Berlin',
        'id': 2950159
      },
      {
        'name': 'Faro',
        'id': 2268337
      },
      {
        'name': 'Paryż',
        'id': 2988507
      },
      {
        'name': 'Londyn',
        'id': 2643743
      },
      {
        'name': 'Bukareszt',
        'id': 683503
      },
      {
        'name': 'Sopot',
        'id': 7530820
      }
    ]
  },
  getters: {
    getCity: state => {
      return state.city
    },
    days: state => {
      return state.days
    },
    details: state => {
      return state.showDetails
    },
    detailsDay: state => {
      return state.detailsDay
    },
    showDetailsHour: state => {
      return state.showDetailsHour
    },
    detailsHour: state => {
      return state.detailsHour
    },
    cities: state => {
      return state.cities
    },
    getCityChosen: state => {
      return state.cityChosen
    },
    getLoading: state => {
      return state.loading
    }
  },
  mutations: {
    setDayData: (state, payload) => {
      var dayData = payload
      if (payload.name !== 'Dzisiaj') {
        dayData.nightTemp = payload.hourData.find(o => o.hour === '06:00').temp
        dayData.dayTemp = payload.hourData.find(o => o.hour === '12:00').temp
        dayData.temp = dayData.nightTemp + ' / ' + dayData.dayTemp
        dayData.icon = payload.hourData.find(o => o.hour === '15:00').icon
      } else {
        dayData.icon = payload.hourData[0].icon
        dayData.temp = payload.hourData[0].temp
      }
      state.days.push(dayData)
    },
    setDetails: (state, payload) => {
      if (state.showDetailsHour) {
        state.showDetailsHour = false
      }      
      state.detailsDay = payload
      state.showDetails = true
    },
    removeOldState: (state) => {
      if (state.showDetails) {
        state.showDetails = false
      }
      state.days.length = 0
    },
    setHourDetails: (state, payload) => {
      state.showDetailsHour = true
      state.detailsHour = payload
    },
    closeHourDetails: (state) => {
      state.showDetailsHour = false
    },
    setCity: (state, payload) => {
      state.city = payload
    },
    setCityChosen: (state) => {
      state.cityChosen = !state.cityChosen
    },
    setLoading: (state) => {
      state.loading = !state.loading
    }
  },
  actions: {
    setData: ({commit}, payload) => {
      var dayData = {}
      let today = new Date()
      const daysNames = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']
      const alternativeDays = ['Dzisiaj', 'Jutro']
      payload.list.forEach((e, index) => {
        var date = e.dt_txt.split(' ')
        let dataDay = date[0].substr(-2)
        let dataDifference = dataDay - today.getDate()
        let indexDay = today.getDay() + dataDifference

        if (date[0] !== dayData.date) {
          if (dayData.date) {
            commit('setDayData', dayData)
          }

          if (indexDay > 6) {
            indexDay = indexDay - 7
          }

          dayData = {
            date: date[0],
            hourData: [],
            name: dataDifference <= 1 ? alternativeDays[dataDifference] : daysNames[indexDay]
          }
        }

        date[1] = date[1].substring(0, 5)

        dayData.hourData.push({
          hour: date[1],
          temp: Math.round(e.main.temp - 273.15),
          icon: 'http://openweathermap.org/img/w/' + e.weather[0].icon + '.png',
          wind: e.wind.speed.toFixed(2),
          rain: e.rain ? e.rain['3h'] || '0' : '0',
          snow: e.snow ? e.snow['3h'] || '0' : '0'
        })
      })
    }
  }
})
