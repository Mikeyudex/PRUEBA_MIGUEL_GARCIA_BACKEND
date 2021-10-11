const PublicMessage = require('../services/sendMessage')


const sendMessage = async (req:any, res:any) => {

    try {
        
        PublicMessage(req.body)
        .then(message => {
            res.status(200).send('Mensaje enviado')
        })
        .catch(e => res.status(500).json({message:'Ha ocurrido un error al enviar el mensaje', errorMessage: e}))

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Ha ocurrido un error interno"})
    }
     
}

module.exports = sendMessage
