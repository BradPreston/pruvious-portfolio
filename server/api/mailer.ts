import postmark from "postmark";

const client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN!);

export default defineEventHandler(async (event) => {
  try {
    const formData = await readFormData(event);

    if (!formData.get("email"))
      throw new Error("No email");
    const formValues = Array.from(formData.entries().map(([key, value]) => `${key}: ${value}`)).join("<br>");

    const body = `
    <p>New form submission</p>
    <p>${formValues}</p>
    <p>Sent from ${process.env.POSTMARK_TO_ADDRESS}</p>
  `;

    client.sendEmail({
      From: formData.get("email") as string,
      To: process.env.POSTMARK_TO_ADDRESS,
      Subject: "Test",
      HtmlBody: body,
    });
  }
  catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("could not send email");
  }
});
