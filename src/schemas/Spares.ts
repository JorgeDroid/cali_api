import Joi from "joi";

export interface ISpareCreationDto {
  name: string;
  model_id: string;
  sku: string;
  code: string;
  price: number;
}

export interface ISpareUpdateDto {
  id: string;
  name?: string;
  model_id?: string;
  sku?: string;
  code?: string;
  price?: number;
}

export const spareCreationSchema = Joi.object({
  name: Joi.string().required(),
  model_id: Joi.string().required(),
  sku: Joi.string().required(),
  code: Joi.string().required(),
  price: Joi.number().required(),
});

export const spareUpdateSchema = Joi.object({
  name: Joi.string(),
  model_id: Joi.string(),
  sku: Joi.string(),
  code: Joi.string(),
  price: Joi.number(),
});
