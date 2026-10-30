import { z } from "zod";
import 'dotenv/config';






export const headerSchema = z.object({

  "x-owner-id": z.string(),

});
