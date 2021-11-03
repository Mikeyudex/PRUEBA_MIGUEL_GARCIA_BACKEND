 const options = {
    definition: {
        openapi: "3.0.0",
        info: {
           title: "Projectify",
           version: "1.0.0",
           description: "Projectify"
        },
        servers: [
            {
                url: "http://localhost:5050"
            }
        ]
    },
    apis: ["./dist/routes/*.js", "./dist/index.js", "./build/routes/*.js", "./build/index.js"]
}

module.exports = options