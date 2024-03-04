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
        className="bg-red-500 bg-opacity-20 border border-red-600 text-red-600 text-xs py-2 px-4 rounded-md mt-2 flex items-center"
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-10 rounded-3xl border-t-4 border-blue-200">

        <h1 className="text-xl font-bold my-10">¡Bienvenido!</h1>
        <h6 className="text-sm my-10">Utiliza tus credenciales para acceder de nuevo</h6>
        

        <form onSubmit={handleSubmit} className=" flex flex-col gap-3 ">
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
          <button className="bg-blue-500 bg-opacity-40 border border-blue-600 text-blue-600 font-bold cursor-pointer px-6 py-2 rounded-3xl" href={`/dasboard`}>
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
  );
}
