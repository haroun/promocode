const save = state => repository => repository.save(state)

const retrieve = id => repository => repository.retrieve(id)

const retrieveByName = name => repository => repository.retrieveByName(name)

module.exports.save = save
module.exports.retrieve = retrieve
module.exports.retrieveByName = retrieveByName
