import Joi from "joi";

export interface IServiceNoteCreationDto {
  note: string;
}

export interface IServiceNoteUpdateDto {
  id: string;
  note?: string;
}

export const serviceNoteCreationSchema = Joi.object({
  note: Joi.string().required(),
});

export const serviceNoteUpdateSchema = Joi.object({
  note: Joi.string(),
});
