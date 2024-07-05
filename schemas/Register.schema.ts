
import { z } from 'zod'

import { LoginSchema } from './Login.schema'

 const RegisterSchema = LoginSchema.extend({
    name: z.string().min(3).max(50),
})

export { RegisterSchema }