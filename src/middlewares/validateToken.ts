

//Valida si el usuario ingresa Token 
const ValidarToken = (req:any, res:any, next:any) => {
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        req.token = bearer[1];
        next();
    } else {
        res.status(403).json({message: 'Se debe proporcionar un token.'});
    }
};

module.exports = ValidarToken