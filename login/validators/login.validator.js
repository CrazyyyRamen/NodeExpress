const {body} = require("express-validator");

exports.loginUserValidator = [
    body('userName','User name is required').not().isEmpty().bail()
                                            .isEmail().withMessage('User name is not valid. It should be your email'),
    body('password','Password is required').not().isEmpty()
]