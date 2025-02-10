import Joi from "joi";

export interface IServiceCreationDto {
  vehicle_id: string;
  technician_id: string;
  status: string;
}

export interface IServiceUpdateDto {
  id: string;
  vehicle_id?: string;
  technician_id?: string;
  status?: string;
}

export const serviceCreationSchema = Joi.object({
  vehicle_id: Joi.string().required(),
  technician_id: Joi.string().required(),
  status: Joi.string().required(),
});

export const serviceUpdateSchema = Joi.object({
  vehicle_id: Joi.string(),
  technician_id: Joi.string(),
  status: Joi.string(),
});
