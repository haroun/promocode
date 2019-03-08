const promocode = require('../domain/promocode/promocode')
const promocodeRepository = require('../domain/promocode/repository')
const inMemoryRepository = require('../infrastructure/persistence/in-memory')('store.txt')
const openWeatherMap = require('../infrastructure/weather/open-weather-map')

const openWeatherMapClient = openWeatherMap.initialize({
  apiKey: process.env.OPEN_WEATHER_MAP_API_KEY || '',
  endpoint: process.env.OPEN_WEATHER_MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5/'
})

const service = () => ({
  create: async ({name, percent, restrictions}) => {
    let newPromocode = promocode.initialize({name, percent})
    newPromocode = newPromocode.appendRestriction(restrictions)

    await promocodeRepository.save(newPromocode)(inMemoryRepository)

    return newPromocode
  },

  validate: async ({name, age, weather}) => {
    const currentPromocode = promocodeRepository.retrieveByName({name})(inMemoryRepository)
    if (currentPromocode === null) {
      throw new Error('Invalid promocode')
    }

    const currentWeather = await openWeatherMapClient.retrieveByCity({name: weather})
    console.log(currentPromocode)

    return promocode.validate(currentPromocode)({age, weather: currentWeather})
  }
})

module.exports = service
