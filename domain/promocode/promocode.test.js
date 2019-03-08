// @or: [
//   {
//     @age: {
//       eq: 40
//     }
//   },
//   {
//     @age: {
//       lt: 30,
//       gt: 15
//     },
//   }
// ],
// @date: {
//   after: '2017-05-02',
//   before: '2018-05-02',
// },
// @meteo: {
//   is: 'clear',
//   temp: {
//     gt: '15', // Celsius here.
//   }
// }
const test = require('tape')
const promocode = require('./promocode')

test('initialize', assert => {
  const name = 'WeatherCode'
  const percent = 20

  const message = 'should return a promocode'

  const actual = promocode.initialize({name, percent})
  const expected = {
    id: '',
    name,
    avantage: {
      percent
    },
    restrictions: []
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('appendRestriction', assert => {
  const name = 'WeatherCode'
  const percent = 20

  const initialState = promocode.initialize({name, percent})
  const restriction = {}

  const message = 'should append the restriction to the existing promocode'

  const actual = promocode.appendRestriction(initialState)(restriction)
  const expected = {
    id: '',
    name,
    avantage: {
      percent
    },
    restrictions: [restriction]
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('save', assert => {
  let isSaveCalled = false
  const name = 'WeatherCode'
  const percent = 20

  const initialState = promocode.initialize({name, percent})
  const repository = {
    save: () => {
      isSaveCalled = true
    }
  }

  const message = 'should call save'

  promocode.save(initialState)(repository)

  const actual = isSaveCalled
  const expected = true

  assert.equal(actual, expected, message)

  assert.end()
})

test('retrieve', assert => {
  const name = 'WeatherCode'
  const percent = 20

  const initialState = promocode.initialize({name, percent})
  const repository = {
    retrieve: () => initialState
  }

  const message = 'should retrieve existing promocode'

  const actual = promocode.retrieve(initialState)(repository)
  const expected = initialState

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('validate', assert => {
  const name = 'WeatherCode'
  const percent = 20

  let initialState = promocode.initialize({name, percent})
  const ageRestriction = {
    validate: () => ({
      age: true
    })
  }
  const weatherRestriction = {
    validate: () => ({
      weather: {
        meteo: 'isNotClear'
      }
    })
  }
  initialState = promocode.appendRestriction(initialState)([weatherRestriction, ageRestriction])

  const parameters = {}

  const message = 'should validate existing promocode against parameters'

  const actual = promocode.validate(initialState)(parameters)
  const expected = {
    age: true,
    weather: {
      meteo: 'isNotClear'
    }
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})
