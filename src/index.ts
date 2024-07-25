import express, { Request, Response } from "express";
import { env } from "./environment";
import {
  createContact,
  doesContactExistByPhoneNumber,
} from "./service/contact.service";
import { googleAuthUrl, googleOAuth2Client } from "./settings";

const app = express();

app.use(express.json());

app.get("/auth/google", async (_: Request, res: Response) =>
  res.redirect(googleAuthUrl)
);

app.get("/auth/google/redirect", async (req: Request, res: Response) => {
  const { code } = req.query;
  const { tokens } = await googleOAuth2Client.getToken(code as string);

  googleOAuth2Client.setCredentials(tokens);

  res.send({
    msg: "Listo, ya puedes interactuar con Google Contacts",
  });
});

app.post(
  "/google/contacts/create-contact",
  async (req: Request, res: Response) => {
    console.log(req.body);

    try {
      const exists = await doesContactExistByPhoneNumber(req.body.phoneNumber);

      if (exists) {
        return res
          .status(409)
          .send({ msg: "El contacto ya existe en Google Contacts" });
      }

      const response = await createContact(req.body);
      res.send(response);
    } catch (error) {
      console.error("Error:", error);
      res.status(503).send({ error: "Error al crear el contacto" });
    }
  }
);

app.listen(env.APP_PORT, () => {
  console.log(`Server is running on http://localhost:${env.APP_PORT}`);
});
