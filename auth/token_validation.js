const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7); //bearer
            verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: "Token invalido."
                    });
                } else {
                    next();
                }
            });
        } else {
            return res.json({
                success: 0,
                message: "Acesso Negado! Usuário não logado."
            });
        }
    }
};