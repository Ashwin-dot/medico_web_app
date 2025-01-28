import {z} from 'zod';

export const inventoriesSchema = z.object({

    sku : z.string({message:" sku should be a string"}).length(8, "SkU should be of 8 characters"),
    warehouseId: z.number({message: "warehouseId should be a number"}).int(),
    productId: z.number({message: "productId should be a pordict"}).int(),

});