import { connectMongoDB } from "@/lib/mongodb"; //
import Client from "@/models/client";
import User from "@/models/user";
//import Client from "@/models/client";
import { NextResponse } from "next/server";
import { useSession } from "next-auth/react"; // Importamos useSession de next-auth/react
import mongoose from 'mongoose';

// Función para obtener los datos del usuario
async function getUserData(req) { // la constante req nos devuelve 
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("email");
    console.log("user info: ", user); //usernos devuelve el email con el que nos hemos logeado
    console.log("user _id: ", user._id);
    console.log("user mail: ", user.email);  
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Error fetching user");
  }
}

{/*// Función para obtener el conteo de documentos
async function getDocumentCount() {
  try {
    //await connectMongoDB(process.env.STATS_MONGODB_URI);
    await connectMongoDB();
    //const documentCount = await db.collection('detections_dataframe').countDocuments();
    const documentCount = await Client.findOne({email}).countDocuments();
    console.log("Document count: ", documentCount);
    return documentCount;
  } catch (error) {
    console.error("Error fetching document count:", error);
    throw new Error("Error fetching document count");
  }
}
{*/}

// Función para obtener los datos del cliente basados en el email del usuario
// Función para obtener los datos del cliente basados en el email del usuario
async function getClientData(req) {
  try {
    //const session = useSession(); // This iis only for the client side
    //const userEmail = session?.data?.user?.email;

    //const clientData = await Client.findOne({ client_contact: "jamateoslu@gmail.com"});
    const clientData = await Client.findOne({ client_contact: req.email}); // nos coge de la colección client los datos en base al email
    console.log("Client data: ", clientData);
    console.log("Req Data: ", req);
    return clientData;
  } catch (error) {
    console.error("Error fetching client data:", error);
    throw new Error("Error fetching client data");
  }
}


// Controlador principal
export async function POST(req) {
  try {
    const user = await getUserData(req);
    const clientData = await getClientData(user);
    return NextResponse.json({ user, clientData, message: "Data retrieved successfully" });
  } catch (error) {
    return NextResponse.error("Error retrieving data", { status: 500 });
  }
}

