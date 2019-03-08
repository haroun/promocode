const test = require('tape')
const promocode = require('./promocode')

test('accepted promocode', assert => {
  const name = 'WeatherCode'
  const args = {
    age: 25,
    meteo: {
      town: 'Paris'
    }
  }

  const message = 'the promocode should be accepted'

  const actual = promocode().retrieve({name, args})
  const expected = {
    name: 'WeatherCode',
    status: 'accepted',
    avantage: {
      percent: 20
    }
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('denied promocode', assert => {
  const name = 'WeatherCode'
  const args = {
    age: 25,
    meteo: {
      town: 'Paris'
    }
  }

  const message = 'the promocode should be denied'

  const actual = promocode().retrieve({name, args})
  const expected = {
    name: 'WeatherCode',
    status: 'denied',
    reasons: {
      meteo: 'isNotClear'
    }
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})
