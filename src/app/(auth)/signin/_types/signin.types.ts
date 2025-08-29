import {z} from 'zod';
import { signinSchema } from './signin.schema';

export type Signin = z.infer<typeof signinSchema>