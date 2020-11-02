require('dotenv').config()

const { env: { PORT = 4000, MONGO_URL } } = process
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('../server/schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {

        const app = express()

        app.use(cors())

        app.use('/graphql', graphqlHTTP({
            schema,
            graphiql: true
        }));

        app.listen(4000, () => {
            console.log(`now listening for request on port ${PORT}`)


        })

    })




