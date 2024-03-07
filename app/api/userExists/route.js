import { connectMongoDB } from "@/lib/mongodb"; //
import User from "@/models/user";
//import Client from "@/models/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    //const user = await Client.findOne({ email }).select("_id");
    console.log("user: ", user);
    return NextResponse.json({ user, message: "User created"});
  } catch (error) {
    console.log(error);
  }
}

