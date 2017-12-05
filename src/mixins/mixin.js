export default {
  created () {
    const appId = '3e04a6a5d832966d06ac105769539b07'
    this.resource = this.$resource('?id={id}&APPID=' + appId)
  },
  methods: {
    async getWeatherData (cityId) {
      const response = await this.resource.get({id: cityId}).then(response => {
        return JSON.parse(response.bodyText)
      },
        response => {
          console.log('error', response)
        })
      return response
    },
    getTemp (data) {
      return Math.round(data.list[0].main.temp - 273.15)
    }
  }
}
