const querystring = require('querystring')
const request = require('request-promise-native')

const initialize = ({apiKey, endpoint}) => ({
  retrieveByCity: async ({name}) => {
    const options = {
      method: 'GET',
      uri: new URL(
        'weather?'.concat(querystring.stringify({q: name, appid: apiKey})),
        endpoint
      ),
      json: true,
      resolveWithFullResponse: true,
      simple: false
    }

    return request(options)
  }
})

module.exports.initialize = initialize
