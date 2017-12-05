import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    city: '',
    days: [],
    showDetails: false,
    detailsDay: {},
    showDetailsHour: false,
    detailsHour: {},
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
        'name': 'Distrito de Faro',
        'id': 2268337
      },
      {
        'name': 'Paris',
        'id': 2988507
      },
      {
        'name': 'London',
        'id': 2643743
      },
      {
        'name': 'Bucureştii Noi',
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
    }
  },
  mutations: {
    setDayData: (state, payload) => {
      var dayData = payload
      if (payload.name !== 'dzisiaj') {
        dayData.nightTemp = payload.hourData.find(o => o.hour === '06:00:00').temp
        dayData.dayTemp = payload.hourData.find(o => o.hour === '12:00:00').temp
        dayData.temp = dayData.nightTemp + '/' + dayData.dayTemp
        dayData.icon = payload.hourData.find(o => o.hour === '15:00:00').icon
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
      state.showDetails = true
      state.detailsDay = payload
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
    }
  },
  actions: {
    setData: ({commit}, payload) => {
      var dayData = {}

      commit('setCity', payload.city.name)

      payload.list.forEach((e, index) => {
        var date = e.dt_txt.split(' ')
        if (date[0] !== dayData.date) {
          if (dayData.date) {
            commit('setDayData', dayData)
          }
          dayData = {
            date: date[0],
            hourData: [],
            name: index === 0 ? 'dzisiaj' : ''
          }
        }

        dayData.hourData.push({
          hour: date[1],
          temp: Math.round(e.main.temp - 273.15),
          icon: 'http://openweathermap.org/img/w/' + e.weather[0].icon + '.png',
          wind: e.wind.speed,
          rain: e.rain ? Math.round(e.rain['3h']*100)/100 || '0' : '0'
        })
      })
    }
  }
})
