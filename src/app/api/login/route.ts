import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
  const body = await request.json(); // Properly parse request body
  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({ status: 400, message: "Invalid email or password" });
  } else if (process.env.ADMIN_EMAIL !== email) {
    return NextResponse.json({ status: 400, message: "Invalid email" });
  } else if (process.env.ADMIN_PASSWORD !== password) {
    return NextResponse.json({ status: 400, message: "Invalid password" });
  } else {
    return NextResponse.json({ status: 200, message: "Login success" });
  }
}
