import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const databaseConfig = () =>
  registerAs('database', () => {
    const values = {
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      name: process.env.DB_NAME,
      synchronize: process.env.DB_SYNC,
    };
    const schema = Joi.object({
      type: Joi.string().required(),
      host: Joi.string().required(),
      port: Joi.number().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
      synchronize: Joi.boolean(),
    }).required();
    const { error } = schema.validate(values, { abortEarly: false });
    if (error) {
      throw new Error(error.message);
    }
    return values;
  });
