const OPERATOR_OR = '@or'
const OPERATOR_AND = '@and'
const OPERATOR_EQUAL = '@eq'
const OPERATOR_LOWER_THAN = '@lt'
const OPERATOR_GREATER_THAN = '@gt'

const initialize = () => ({})

const append = state => ({field, operator, value}) => ({
  ...state,
  [field]: {
    ...state[field],
    [operator]: value
  }
})

const validate = state => ({field, value}) => {
  const operators = Object.keys(state[field])

  return operators.reduce(
    (accumulator, operator) => {
      const right = state[field][operator]

      const current = operator === OPERATOR_EQUAL
        ? value === right
        : operator === OPERATOR_LOWER_THAN
        ? value < right
        : operator === OPERATOR_GREATER_THAN
        ? value > right
        : operator === OPERATOR_OR
        ? 'or'
        : operator === OPERATOR_AND
        ? 'and'
        : 'error'

      return accumulator === true && current === true
    },
    true
  )
}

module.exports.initialize = initialize
module.exports.append = append
module.exports.validate = validate
module.exports.OPERATOR_OR = OPERATOR_OR
module.exports.OPERATOR_AND = OPERATOR_AND
module.exports.OPERATOR_EQUAL = OPERATOR_EQUAL
module.exports.OPERATOR_LOWER_THAN = OPERATOR_LOWER_THAN
module.exports.OPERATOR_GREATER_THAN = OPERATOR_GREATER_THAN
