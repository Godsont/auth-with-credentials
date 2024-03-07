import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions); // query whther we are logged in or not
  // when using await we need to use async functions

  if (session) redirect("/dashboard"); // // condition that if we are logged in we will be redirected to /dashboard page when trying to access other sessions 
  // "/dashboard" shoudl be our landing page for the logged in users
 
  return ( // condition that if we are NOT logged in we will be returned to the register Pag
    <main>
      <LoginForm /> 
    </main>
  );
}
