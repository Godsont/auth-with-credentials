// Definimos la estructura de los clientes dados de alta en nuestra aplicación
// Estos clientes tienen permiso para acceder la app

// Importa mongoose
import mongoose, { Schema, models } from "mongoose";


// Define el esquema para los documentos de la colección clients
const clientSchema = new Schema({
  client_name: {
    type: String,
    required: true
  },
  client_contact: {
    type: String,
    required: true
  },
  project_id: {
    type: [String],
    default: []
  },
  business_id: {
    type: Number,
    required: true
  }
});



const Client = models.Client || mongoose.model("Client", clientSchema); // import the models from moongoose in case they exist
// or creates the user model with the user schema
export default Client;