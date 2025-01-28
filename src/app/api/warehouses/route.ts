import { db } from "@/lib/db/db";
import { warehouses } from "@/lib/db/schemas";
import { warehousesSchema } from "@/lib/validators/warehousesSchema";

export async function POST (request: Request){ 
    
    const data = await request.json()
    let validateData;
    
    try {
        validateData = warehousesSchema.parse(data);

    } catch (error) {
        return Response.json({message: "Validation failed", error}, {status: 400})
    }
    try {
        
        await db.insert(warehouses).values(validateData);
        return Response.json({message: "OK"}, {status: 201});

    } catch (error) {
        return Response.json({message: "failed to insert into database", error}, {status: 500})
    }

    
}

export async function GET (){
    try {
        const allWarehouses = await db.select().from(warehouses)
        return Response.json(allWarehouses);
    } catch (error) {
        return Response.json({message: "failed to get the warehouses", error}, {status: 500})
    }
}