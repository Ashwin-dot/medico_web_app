import { db } from "@/lib/db/db";
import { inventories, products, warehouses } from "@/lib/db/schemas";
import { inventoriesSchema } from "@/lib/validators/inventoriesSchema";
import { eq } from "drizzle-orm";

export async function POST (request : Request){

    const reqData = await request.json();
    let validateData
    try{
         validateData =  await inventoriesSchema.parse(reqData);
    }catch(e){
    return Response.json({message: e}, {status: 400});
    }
    // code to insert data into database
    try {
        await db.insert(inventories).values(validateData);
        return Response.json({message: "OK"}, {status: 201});
    } catch (error) {
        return Response.json({message: "failed to insert into database", error}, {status: 500});
    }
}

export async function GET (){

    try {
        const data = await db.select({
            id : inventories.id,
            sku : inventories.sku,
            warehouse: warehouses.name,
            product: products.name,
            
        }).from(inventories).leftJoin(warehouses, eq(inventories.warehouseId, warehouses.id)).leftJoin(products, eq(inventories.productId, products.id))
        return Response.json(data);
    } catch (error) {
        return Response.json({message: "failed to fetch data", error}, {status: 500});
        
    }
}