import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

if (process.env.NODE_ENV === 'production') dotenv.config();
else dotenvExpand.expand(dotenv.config());
