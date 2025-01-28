import z from "zod"

export const warehousesSchema = z.object({

    name: z.string({message: "warehouse name should be a string"}),
    pincode: z.string({message: "warehouse capacity should be a number"}).length(6, {message: "pincode should be of 6 digits"}) 

})