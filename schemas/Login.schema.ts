import { z } from 'zod'

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Must be at least 8 characters"),
})


export { LoginSchema };