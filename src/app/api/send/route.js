import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

export async function POST(req, res) {
    try {
        const { email, subject, message } = await req.body;
        console.log(email, subject, message);

        // Construct the email content as a plain string
        const emailContent = `
            ${subject}
            
            Thank you for contacting us!
            New message submitted:
            ${message}
        `;

        const emailData = {
            from: "saqo.harutyunyan.ait@gmail.com>",
            to: ["saqo.harutyunyan.ait@gmail.com"],
            subject: subject,
            text: emailContent, // Use 'text' instead of 'react'
        };

        const data = await resend.emails.send(emailData);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.error("Failed to send email", 500); // Provide more meaningful error response
    }
}
