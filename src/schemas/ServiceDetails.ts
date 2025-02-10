import Joi from "joi";

export interface IServiceDetailCreationDto {
  service_id: string;
  technician_id: string;
}

export interface IServiceDetailUpdateDto {
  id: string;
  service_id?: string;
  technician_id?: string;
}

export const serviceDetailCreationSchema = Joi.object({
  service_id: Joi.string().required(),
  technician_id: Joi.string().required(),
});

export const serviceDetailUpdateSchema = Joi.object({
  service_id: Joi.string(),
  technician_id: Joi.string(),
});
