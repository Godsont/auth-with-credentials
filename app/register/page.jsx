import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth"; // import getSession will enable  server side session verification whther we are logged in or not
import { redirect } from "next/navigation"; // impor redirect will prevent from redirecting to certain pages
import { authOptions } from "../api/auth/[...nextauth]/route"; // import the authentication options/provider

export default async function Register() {
  const session = await getServerSession(authOptions); // query whther we are logged in or not
  // when using await we need to use async functions

  if (session) redirect("/dashboard");  // condition that if we are logged in we will be redirected to /dashboard page when trying to access other sessions
  //"/dashboard" anomaly-detection

  return <RegisterForm />; // condition that if we are NOT logged in we will be returned to the register Page
}
