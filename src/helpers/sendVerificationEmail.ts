import VerificationEmail from "../../emails/VerificationEmail";
import { resend } from "../lib/resend";
import { ApiResponse } from "../types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        console.log("Tried sending email");
        await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: email,
            subject: "Mystery Message | Verification code",
            react: VerificationEmail({ username, otp: verifyCode }),
        });
        console.log("Email sent successfully");
        return {
            success: true,
            message: "Verification email send successfully",
        };
    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return {
            success: false,
            message: "Failed to send verification email",
        };
    }
}
