import Joi from "joi";

export interface ILabourCreationDto {
  technician_id: string;
  price: number;
  description: string;
}

export interface ILabourUpdateDto {
  id: string;
  technician_id?: string;
  price?: number;
  description?: string;
}

export const labourCreationSchema = Joi.object({
  technician_id: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
});

export const labourUpdateSchema = Joi.object({
  technician_id: Joi.string(),
  price: Joi.number(),
  description: Joi.string(),
});
