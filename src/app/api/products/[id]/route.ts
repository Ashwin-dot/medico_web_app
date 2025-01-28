import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schemas";
import { eq } from "drizzle-orm";

export async function GET(request: Request, {params}: {params: {id: string}}) {
    const id = params.id;
 
 try {
    const product = await db.select().from(products).where(eq(products.id, Number(id))).limit(1)
    if(product){
        return Response.json(product[0])
    } else {
        return Response.json({message: "product not found"}, {status: 404})
    }
 } catch (error) {
    return Response.json({message: "failed to get the product", error}, {status: 500})
 }

}