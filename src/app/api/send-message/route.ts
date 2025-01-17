import nodemailer from "nodemailer";
import { NextResponse, NextRequest } from "next/server";


const sendContactMail = async (
  message: string
)=> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kavnish1245@gmail.com",
      pass: "btak njvp mqfl pyps",
    },
  });

  const mailOptions = {
    from: "avnishgupta1245@gmail.com", // The sender's email address
    to: "avnishgupta1245@gmail.com", // Your email address
    subject: "New message from website contact form",
    text: `
      You have received a new message from your website contact form.
      
      Here are the details:
      
      Message:
      ${message}
    `,
  };

  try {
    await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
      if (error) {
        console.error("Error sending email", error);
        reject(error);
      } else {
        console.log("Email sent: " + info?.response);
        resolve(info);
      }
    });
    });
    return { success: true, message: `Email sent successfully` };
  } catch (error) {
    console.error("Error sending email", error);
    return { success: false, message: "Failed to send email" };
  }
};

export async function POST (req: NextRequest){
    try {
        const {message} = await req.json();
        const response = await sendContactMail(message);
        if (response.success) {
            return NextResponse.json({ success: true, message: "Email sent successfully" });

        }else{
            return NextResponse.json({ success: false, message: "Failed to send email" });
        }
        
    } catch (error) {
        console.error("Error sending email", error);
        return NextResponse.json( { success: false, message: "Failed to send email" });
        
    }
}
