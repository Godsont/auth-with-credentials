import { connectMongoDB } from "@/lib/mongodb"; // Importamos nuestra función de conexión a MongoDB
import User from "@/models/user";
//import Client from "@/models/client"; // Si queremos definir nuestro propio  cliente, tenemos que crear el modelo y esquema
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = { // Proporcionamos los valores para NextAuth 
  providers: [
    CredentialsProvider({
      name: "credentials", // contains the cluster name information
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB(); // DB connection
          const user = await User.findOne({ email }); // definimos nuestro usuario y lo buscamos por el correo electronico en la BBDD
          //const user = await Client.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password); // Comprobación de las contraseñas hasheadass

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET, // Pasamos el valor de  la clave secreta que generamos en .env para encryptar y desencriptar
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
