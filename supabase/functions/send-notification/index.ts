
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: 'item_claimed' | 'new_item';
  recipientEmail: string;
  recipientName?: string;
  itemTitle: string;
  claimantName?: string;
  claimMessage?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, recipientEmail, recipientName, itemTitle, claimantName, claimMessage }: NotificationRequest = await req.json();

    let subject = "";
    let html = "";

    if (type === 'item_claimed') {
      subject = `Someone claims your lost item: ${itemTitle}`;
      html = `
        <h1>Good news! Someone may have found your item</h1>
        <p>Hi ${recipientName || 'there'},</p>
        <p><strong>${claimantName}</strong> has claimed your lost item: <strong>${itemTitle}</strong></p>
        ${claimMessage ? `<p><strong>Their message:</strong> ${claimMessage}</p>` : ''}
        <p>Please log in to your Lostify account to contact them and arrange the return.</p>
        <p>Best regards,<br>The Lostify Team</p>
      `;
    } else if (type === 'new_item') {
      subject = `New item reported: ${itemTitle}`;
      html = `
        <h1>New Item Alert</h1>
        <p>A new item has been reported: <strong>${itemTitle}</strong></p>
        <p>Check the Lostify app to see if this might be yours!</p>
        <p>Best regards,<br>The Lostify Team</p>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "Lostify <onboarding@resend.dev>",
      to: [recipientEmail],
      subject,
      html,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
