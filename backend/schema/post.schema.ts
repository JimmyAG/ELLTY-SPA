import Joi from 'joi'

export const createNewPostSchema = Joi.object({
    parentId: Joi.number().optional(),
    operation: Joi.string().optional(),
    value: Joi.number(),
    requiredInfo: Joi.object(),
})
export default createNewPostSchema
