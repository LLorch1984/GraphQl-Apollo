const moongose = require('mongoose')
const Schema = moongose.Schema

const BookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String

});

module.exports = moongose.model('Book', BookSchema)