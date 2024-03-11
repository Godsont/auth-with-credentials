"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react"; // import the useSession data
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests

export default function UserInfo() {
  const { data: session , status} = useSession(); // rename the session data from useSession
  // this only provides the name and email from nextauth 
  // Create a state to store teh document count
  //const [documentCount, setDocumentCount] = useState(null)
  const [clientData, setClientData] = useState(null)

  
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.post("/api/userExists", { email: session?.user?.email });
        console.log("Client data response:", response);
        setClientData(response.data.clientData);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    if (session) {
      fetchClientData();
    }
  }, [session]);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="absolute top-0 right-0 m-4">
        <div className="flex flex-col gap-2">
          <div>
            Usuario: <span className="font-bold">{session?.user?.name}</span>
          </div>
          <div>
            Email: <span className="font-bold">{session?.user?.email}</span>
          </div>
          <button
        onClick={() =>
          signOut({
            callbackUrl: "/", // Indica a donde nos redirige al clickar logout button
          })
        }
        className="bg-red-500 bg-opacity-20 border border-red-600 text-red-600 text-RED font-bold rounded-3xl px-6 py-2 mt-3"
      >
        Log Out
      </button>
        </div>
      </div>
      
      

      <div>
        {clientData ? (
          <>
            <div> Cuenta: {clientData.client_name}</div>
            <div> Correo: {clientData.client_contact}</div>
            <div> Código de empresa: {clientData.business_id}</div>
            <div> Proyectos activos: {clientData.project_id[0]} h {clientData.project_id[1]}</div>
            <div> Administrador: {clientData.admin}</div>
          </>
        ) : (
          <div>Loading client data...</div>
        )}
      </div>

    </div>
  );
}