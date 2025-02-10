import Joi from "joi";

export interface IBrandCreationDto {
  name: string;
}

export interface IBrandUpdateDto {
  id: string;
  name: string;
}

export const brandCreationSchema = Joi.object({
  name: Joi.string().required(),
});

export const brandUpdateSchema = Joi.object({
  name: Joi.string(),
});
