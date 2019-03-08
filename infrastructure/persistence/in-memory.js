const save = file => data => {
  console.log(`Mock save in ${file}`, data)
}

const retrieve = id => {
  const state = retrieveByName('WeatherCode')
  if (!state || state.id !== id) {
    return null
  }

  return state
}

const retrieveByName = name => {
  if (name !== 'WeatherCode') {
    return null
  }

  return {
    id: 1234,
    name: 'WeatherCode',
    avantage: {
      percent: 20
    },
    restrictions: {
      '@or': [
        {
          age: {
            '@eq': 40
          }
        },
        {
          age: {
            '@lt': 30,
            '@gt': 15
          }
        }
      ],
      date: {
        '@gt': '2017-05-02',
        '@lt': '2018-05-02'
      },
      weather: {
        '@eq': 'clear',
        temp: {
          '@gt': '15' // Celsius here.
        }
      }
    }
  }
}

const repository = file => ({
  save: save(file),
  retrieve,
  retrieveByName
})

module.exports = repository
