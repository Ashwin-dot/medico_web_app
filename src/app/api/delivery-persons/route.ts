import { db } from "@/lib/db/db";
import { deliveryPersons, warehouses } from "@/lib/db/schemas";
import { deliveryPeronsSchema } from "@/lib/validators/deliveryPersonSchema";
import { eq,desc } from "drizzle-orm";
export async function POST (request : Request){
    const reqData = await request.json();
    let validateData;
    try {
        validateData = deliveryPeronsSchema.parse(reqData);
    } catch (error) {
        return Response.json({message: error}, {status: 400});
    }
    try {
        await db.insert(deliveryPersons).values(validateData);
        return Response.json({message: "OK"}, {status: 201});
    } catch (error) {
        return Response.json({message: "failed to insert into database", error}, {status: 500});
    }
}

export async function GET (){
    try {
        const allDeliveryPersons = await db.select({
            id : deliveryPersons.id,
            name : deliveryPersons.name,
            phone : deliveryPersons.phone,
            warehouses: warehouses.name
        }).from(deliveryPersons).leftJoin(warehouses, eq(deliveryPersons.warehouseId, warehouses.id)).orderBy(desc((deliveryPersons.id)))
        return Response.json(allDeliveryPersons);
    }
    catch (error) {
        return Response.json({message: "failed to get the delivery persons", error}, {status: 500});
    }
}