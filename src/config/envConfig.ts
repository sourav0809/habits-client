import Joi from 'joi';

const envSchema = Joi.object({
  VITE_API_ROOT: Joi.string().uri().required(),
  VITE_ENVIRONMENT: Joi.string().valid('development', 'staging', 'production').optional(),
  VITE_GOOGLE_AUTH_CLIENT_ID: Joi.string().required()
}).unknown();

const envVars = {
  VITE_API_ROOT: import.meta.env.VITE_API_ROOT,
  VITE_ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT,
  VITE_GOOGLE_AUTH_CLIENT_ID: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
  VITE_GOOGLE_AUTH_CLIENT_SECRET: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_SECRET,
};

// Validate the environment variables against the schema
const { error, value: validatedEnv } = envSchema.validate(envVars);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envConfig = {
  api: {
    url: validatedEnv.VITE_API_ROOT
  },
  environment: validatedEnv.VITE_ENVIRONMENT,
  googleAuth: {
    clientId: validatedEnv.VITE_GOOGLE_AUTH_CLIENT_ID,
    clientSecret: validatedEnv.VITE_GOOGLE_AUTH_CLIENT_SECRET,
  },
};
