import Joi from "joi";

export interface IVehicleCreationDto {
  client_id: string;
  model_id: string;
  year: string;
  plate: string;
  color: string;
  name: string;
}

export interface IVehicleUpdateDto {
  id: string;
  client_id?: string;
  model_id?: string;
  year?: string;
  plate?: string;
  color?: string;
  name?: string;
}

export const vehicleCreationSchema = Joi.object({
  client_id: Joi.string().required(),
  model_id: Joi.string().required(),
  year: Joi.string().required(),
  plate: Joi.string().required(),
  color: Joi.string().required(),
  name: Joi.string().required(),
});

export const vehicleUpdateSchema = Joi.object({
  client_id: Joi.string(),
  model_id: Joi.string(),
  year: Joi.string(),
  plate: Joi.string(),
  color: Joi.string(),
  name: Joi.string(),
});
