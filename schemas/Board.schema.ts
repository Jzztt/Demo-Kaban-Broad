import {z} from 'zod'

export const BoardSchema = z.object({
    name: z.string().min(3).max(50),
    is_public: z.boolean(),
})