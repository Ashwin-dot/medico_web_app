import { z } from "zod";

export const deliveryPeronsSchema = z.object({
    name: z.string({message: "name should be a string"}),
    phone: z.string({message: "phone should be a string"}).length(13, {message: "phone should be of 13 digits"}),
    warehouseId: z.number({message: "warehouseId should be a number"}),
});