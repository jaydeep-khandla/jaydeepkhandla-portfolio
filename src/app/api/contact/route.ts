import { NextRequest, NextResponse } from "next/server";
import { transporter, mailOptions } from "@/app/config/nodemailer";

export async function POST(request: NextRequest) {
  const { name, email, subject, message } = await request.json();
  console.log(name, email, subject, message);
  

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: subject,
      text: `${name} is trying to contact you. Message: ${message}`,
      html: `<p>${message}</p><br/><p>From: ${name} - ${email}</p>`
    });
    return NextResponse.json({ message: "Message sent successfully" });
  } catch (error: unknown) {
    return NextResponse.json({ message: (error as Error).message }, { status: 400 });
  }

}