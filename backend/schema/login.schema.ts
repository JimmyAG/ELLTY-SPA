import Joi from 'joi'

export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(5).required(),
})

export const signUpSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(5).required(),
    confirmPassword: Joi.string().min(5).required(),
})
