

import { z } from "zod"
const noteSchema = z.object({
    title: z.string(),
    description: z.string()
});

export { noteSchema }