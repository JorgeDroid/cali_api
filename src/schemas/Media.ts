import Joi from "joi";

export interface IMediaCreationDto {
  url: string;
  name: string;
}

export interface IMediaUpdateDto {
  id: string;
  url?: string;
  name?: string;
}

export const mediaCreationSchema = Joi.object({
  url: Joi.string().required(),
  name: Joi.string().required(),
});

export const mediaUpdateSchema = Joi.object({
  url: Joi.string(),
  name: Joi.string(),
});
