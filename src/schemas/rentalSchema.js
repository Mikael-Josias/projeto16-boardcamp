import Joi from "joi";

export const rentalSchema = Joi.object({
    customerId: Joi.number().positive().integer().required(),
    gameId: Joi.number().positive().integer().required(),
    rentDate: Joi.date().required(),
    daysRented: Joi.number().positive().integer().required(),
    returnDate: Joi.date(),
    originalPrice: Joi.number().positive().required(),
    delayFee: Joi.number().positive(),
});

export const insertRentalSchema = Joi.object({
    customerId: Joi.number().positive().integer().required(),
    gameId: Joi.number().positive().integer().required(),
    daysRented: Joi.number().positive().integer().required(),
});