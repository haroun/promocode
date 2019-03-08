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
const repository = require('./repository')

test('save', assert => {
  let isSaveCalled = false
  const name = 'WeatherCode'
  const percent = 20

  const initialState = promocode.initialize({name, percent})
  const currentRepository = {
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
