"use client";

import { SessionProvider } from "next-auth/react"; // This line imports the SessionProvider component from the next-auth/react package. 
//SessionProvider is a component provided by NextAuth that wraps your application and provides session information to the Next.js pages

export const AuthProvider = ({ children }) => { // This defines a functional component named AuthProvider which takes a single prop called children
  // The children prop represents the components that will be wrapped by the AuthProvider
  return <SessionProvider>{children}</SessionProvider>;
};

// {children}: This is a special prop in React that represents the child elements passed to the component.
// By wrapping the children components with SessionProvider, the AuthProvider ensures that the session information provided by NextAuth is available to all components rendered within it.