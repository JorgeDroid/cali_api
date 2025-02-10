import Joi from "joi";

export interface IClientCreationDto {
  name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
}

export interface IClientUpdateDto {
  id: string;
  name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export const clientCreationSchema = Joi.object({
  name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

export const clientUpdateSchema = Joi.object({
  name: Joi.string(),
  last_name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  password: Joi.string().min(8),
});

export const brandCreationSchema = Joi.object({
  name: Joi.string().required(),
});
