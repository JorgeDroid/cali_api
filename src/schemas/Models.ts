import Joi from "joi";

export interface IModelCreationDto {
  name: string;
  brand_id: string;
}

export interface IModelUpdateDto {
  id: string;
  name: string;
  brand_id: string;
}

export const modelCreationSchema = Joi.object({
  name: Joi.string().required(),
  brand_id: Joi.string().required(),
});

export const modelUpdateSchema = Joi.object({
  name: Joi.string(),
  brand_id: Joi.string(),
});
