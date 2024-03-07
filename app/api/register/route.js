// This JS file provides information to the API in form of name/email/business code
import { connectMongoDB } from "@/lib/mongodb"; //
import User from "@/models/user"; //import Client from "@/models/client";
import Client from "@/models/client"; // Importa el modelo de cliente 

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // Used to hashed password
//import Client from "@/models/client";

export async function POST(req) {
  try { // Uses a try/catch block
    const { business_id, name, email, password } = await req.json(); // this is the data defined in Registerform that will be passed to the DB
    const hashedPassword = await bcrypt.hash(password, 10); //hash the password for login and a number of hashings that will be performed

    await connectMongoDB(); // This will connect to our .env db and collection

    //verifica si existe un business_id existe en la colección clients
    const client = await Client.findOne({business_id})
    // si no existe reporta el siguiente código de error
    if (!client) {
      return NextResponse.json(
        { message: "Código de empresa introducido no es válido." },
        { status: 400 }
      );
    }

    await User.create({ business_id, name, email, password: hashedPassword }); // this pass the information to our database (included hashed password)
    //await Client.create({ name, email, password: hashedPassword }); // this pass the information to our database (included hashed password)

    return NextResponse.json({ message: "Usuario registrado correctamente" }, { status: 201 }); // User is successfully created and inserted in the database
  } catch (error) { 
    return NextResponse.json(
      { message: "Código de empresa introducido no es válido." }, // User is not created correctly
      { status: 500 }
    );
  }
}
