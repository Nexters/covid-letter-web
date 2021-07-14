/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const next = require('next')
const port = 3000
const dev = process.env.REACT_APP_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()
        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(port, (error) => {
            if (error) throw error
            console.log(`Server started on http://localhost:${port}`)
        })
    })
    .catch((err) => {
        console.log(err.stack)
        process.exit(1)
    })
