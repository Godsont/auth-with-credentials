"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function RegisterForm() {
  const [business_id, setBusiness] = useState(""); // Correpond to business_id in clients and acceso collections
  const [name, setName] = useState(""); // Correpond to business_id in clients and acceso collections
  const [email, setEmail] = useState(""); // Correspond to client_contact in clients collection for users db
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => { // Create the function handleSubmit to load the data/save 
    e.preventDefault(); //stops the reload of the page - potential attack

    if (!business_id || !email || !password ||!name) {  // if any of these values is missing we will print a mesasage
      setError("Debes rellenar todos los campos correctamente");
      return;
    }
    // Verificar si el business_id tiene exactamente 4 dígitos y si son números
    if (!/^\d{4}$/.test(business_id)) {
      setError("El código de empresa debe ser un número de 4 dígitos."); // si no lo tiene imprimir por pantalla el error
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", { // almacenamos la entrada del usuario
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json(); // provide the result from the API
      

      if (user) {
        setError("Parece que ya existe ese usuario."); // set the error to user already exist
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          business_id,
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const {message} = await res.json();
        const form = e.target;
        form.reset();
        router.push("/"); // Rdirects the user when successfully regsitered to the log in page (or the verificationPage)
        //router.push("/verifyRequest")
      } else {
        const {message} = await res.json();
        setError(message); //
        console.log("Registro de usuario fallido");
      }
    } catch (error) {
      console.log("Error durante el registro: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-10 rounded-3xl border-t-4  border-blue-200">
      <img src="/B_W_logo.jpg" alt="Logo de la empresa" className="mt-5" style={{ width: '125px', height: 'auto', margin: 'auto' }} /> 
        <h1 className="text-xl font-bold my-10">Regístrate</h1>
        <h6 className="text-sm my-4"> Utiliza el código de empresa proporcionado por STR</h6> 
        <form onSubmit={handleSubmit} className="flex flex-col gap-3"> {/** handle the data submission */}
        
          <input 
            // onChange={(e) => setBusiness(e.target.value)} // Nos indica que si cambia de valor asigne a setName el valor
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,4}$/.test(value)) { // Verifica si el valor es un número de hasta 4 dígitos
                  setBusiness(value);
              }
            }}
            type="number"
            placeholder="Código Empresa" //Valor por defecto que aparece en el campo a rellenar
            className="rounded-3xl"
          />
          <input 
            onChange={(e) => setName(e.target.value)} // Nos indica que si cambia de valor asigne a setName el valor
            type="text"
            placeholder="Nombre Usuario" //Valor por defecto que aparece en el campo a rellenar
            className="rounded-3xl"
          />
          <input
            onChange={(e) => setEmail(e.target.value)} // Nos indica que si cambia de valor asigne a setEmail el valor
            type="text"
            placeholder="Email" //Valor por defecto que aparece en el campo a rellenar
            className="rounded-3xl"
          />
          <input
            onChange={(e) => setPassword(e.target.value)} // Nos indica que si cambia de valor asigne a setPassword el valor
            type="password"
            placeholder="Contraseña" //Valor por defecto que aparece en el campo a rellenar como contraseña
            className="rounded-3xl"
          />
          <button className="bg-blue-500 bg-opacity-40  border border-blue-600 text-blue-600 font-bold cursor-pointer rounded-3xl px-6 py-2">
            ¡Vamos!
          </button>

          {error && ( // Previous code will only run if we don't have any errors
            <div className="bg-red-500 bg-opacity-20 border border-red-600 text-red-600 text-xs py-2 px-4 rounded-md mt-2 flex items-center">
            
            {error}
          </div>
          )}

          <Link className="text-xs mt-3 text-right" href={"/"}>
            Ya tengo cuenta y quiero <span className="underline"> acceder</span>
          </Link>

        </form>
      </div>
    </div>
  );
}
