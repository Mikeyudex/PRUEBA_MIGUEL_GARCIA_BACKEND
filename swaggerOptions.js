 const options = {
    definition: {
        openapi: "3.0.0",
        info: {
           title: "Backend Users API",
           version: "1.0.0",
           description: "Backend Users API"
        },
        servers: [
            {
                url: "http://localhost:5050"
            }
        ]
    },
    apis: ["./dist/routes/*.js", "./dist/index.js"]
}

module.exports = options