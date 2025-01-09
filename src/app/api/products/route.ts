import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schemas";
import { productSchema } from "@/lib/validators/productSchema";
import { unlink } from "node:fs/promises";
import { writeFile } from "node:fs/promises";
import path from "node:path";

export async function POST (request : Request){
    const data = await request.formData()

    let validateData;
     try {
        validateData = productSchema.parse({
            name: data.get('name'),
            description: data.get('description'),
            image: data.get('image'),
            price: Number( data.get('price'))
        })
     } catch (error) {
        return Response.json({message: error}, {status: 400})
     }

     const fileName = `${Date.now()}.${validateData.image.name.split('.').slice(-1)}`

     try {
        const buffer  = Buffer.from(await validateData.image.arrayBuffer());
        await writeFile(path.join(process.cwd(), "public/assets", fileName), buffer);


     } catch (error) {

         try {
            await unlink(path.join(process.cwd(), "public/assets", fileName))
         }
         catch (err){
            Response.json({message: "failed to delete the image of proudcts file while saving if something goes wrong", err} ,{  status : 500 })
         }
        Response.json({message: "failed to save the image of proudcts file", error} ,{  status : 500 })
     }

     //saving in a database 

     try {
      
      await db.insert(products).values({ ...validateData, image: fileName});


     } catch (error) {
      return Response.json({ message: "failed to insert into database", error}, {status: 500})
     }

     return Response.json({message :"OK"},{status: 201})

}