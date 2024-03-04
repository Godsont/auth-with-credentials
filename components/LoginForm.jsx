"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";





export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Usuario o Contraseña incorrectos");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // Utiliza la imagen importada como fondo
    <div className="flex h-screen">
      <div className="w-7/12 relative" style={{ backgroundImage: `url("/imagen_1.jpg")`, backgroundSize: 'cover', backgroundPosition: 'right' }}>
          {/* Agrega el logo de tu empresa */}
        
        </div>
        <div className="w-5/12 flex items-center justify-center bg-black bg-opacity-90">
        
        <div className="p-10 rounded-3xl border-t-4 border-blue-300 bg-white">
        <img src="/B&W_logo.jpg" alt="Logo de la empresa" className="mt-5" style={{ width: '125px', height: 'auto', margin: 'auto' }} /> 
        {/* Logo con Letras "/str_logo_letras_transparente_negro.png" */}

          <h1 className="text-xl font-bold my-10">¡Bienvenido!</h1>
          
          <h6 className="text-sm my-10">Utiliza tus credenciales para acceder de nuevo</h6>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className="rounded-3xl" // Apply rounded-lg class to input elements
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Contraseña"
              className="rounded-3xl"
            />
            <button className="bg-blue-500 bg-opacity-40 border border-blue-600 text-blue-600 font-bold cursor-pointer px-6 py-2 rounded-3xl" href={`/dashboard`}>
              Iniciar sesión {/* If successful this should redirectionate to User Landing Page href={/LandingPage} */}
            </button>
            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-600 text-red-600 text-xs py-2 px-4 rounded-md mt-2 flex items-center">
                {error}
              </div>
            )}

            <Link className="text-xs mt-3 text-right" href={"/register"}>
              ¿Todavía no tienes tu cuenta? <span className="underline">Regístrate aquí</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}