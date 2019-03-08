const initialize = ({name, percent}) => {
  const id = ''

  return {
    id,
    name,
    avantage: {
      percent
    },
    restrictions: []
  }
}

const appendRestriction = state => restriction => ({
  ...state,
  restrictions: state.restrictions.concat(restriction)
})

const validate = state => parameters => state.restrictions.reduce(
  (accumulator, restriction) => ({
    ...accumulator,
    ...restriction.validate(parameters)
  }),
  {}
)

module.exports.initialize = initialize
module.exports.appendRestriction = appendRestriction
module.exports.validate = validate
