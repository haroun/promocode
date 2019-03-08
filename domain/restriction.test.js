const test = require('tape')
const restriction = require('./restriction')

test('append to empty restriction', assert => {
  const initialState = restriction.initialize()

  const field = 'date'
  const operator = restriction.OPERATOR_LOWER_THAN
  const value = Date.parse('2018-05-02')

  const message = 'should return a new state'

  const actual = restriction.append(initialState)({field, operator, value})
  const expected = {
    date: {
      '@lt': Date.parse('2018-05-02')
    }
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('append to existing field in restriction', assert => {
  const initialState = restriction.append(restriction.initialize())({
    field: 'date',
    operator: restriction.OPERATOR_LOWER_THAN,
    value: Date.parse('2018-05-02')
  })

  const field = 'date'
  const operator = restriction.OPERATOR_GREATER_THAN
  const value = Date.parse('2017-05-02')

  const message = 'should return a new state'

  const actual = restriction.append(initialState)({field, operator, value})
  const expected = {
    date: {
      '@lt': Date.parse('2018-05-02'),
      '@gt': Date.parse('2017-05-02')
    }
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('append to existing field in restriction', assert => {
  const initialState = restriction.append(restriction.initialize())({
    field: 'date',
    operator: restriction.OPERATOR_LOWER_THAN,
    value: Date.parse('2018-05-02')
  })

  const field = 'date'
  const operator = restriction.OPERATOR_GREATER_THAN
  const value = Date.parse('2017-05-02')

  const message = 'should return a new state'

  const actual = restriction.append(initialState)({field, operator, value})
  const expected = {
    date: {
      '@lt': Date.parse('2018-05-02'),
      '@gt': Date.parse('2017-05-02')
    }
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('validate value against range', assert => {
  let initialState = restriction.append(restriction.initialize())({
    field: 'date',
    operator: restriction.OPERATOR_LOWER_THAN,
    value: Date.parse('2018-05-02')
  })
  initialState = restriction.append(initialState)({
    field: 'date',
    operator: restriction.OPERATOR_GREATER_THAN,
    value: Date.parse('2017-05-02')
  })

  const message = 'should see the value within the range as valid'

  const field = 'date'
  const value = Date.parse('2018-01-01')

  const actual = restriction.validate(initialState)({field, value})
  const expected = true

  assert.equal(actual, expected, message)

  assert.end()
})

test('fail to validate value against range', assert => {
  let initialState = restriction.append(restriction.initialize())({
    field: 'date',
    operator: restriction.OPERATOR_LOWER_THAN,
    value: Date.parse('2018-05-02')
  })
  initialState = restriction.append(initialState)({
    field: 'date',
    operator: restriction.OPERATOR_GREATER_THAN,
    value: Date.parse('2017-05-02')
  })

  const message = 'should see the value outside the range as invalid'

  const field = 'date'
  const value = Date.parse('2019-01-01')

  const actual = restriction.validate(initialState)({field, value})
  const expected = false

  assert.equal(actual, expected, message)

  assert.end()
})
