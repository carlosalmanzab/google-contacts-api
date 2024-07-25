import { google } from "googleapis";
import { env } from "./environment";

export const googleOAuth2Client = new google.auth.OAuth2(
  env.GC_CLIENT_ID,
  env.GC_CLIENT_SECRET,
  env.GC_REDIRECT_URI
);

export const googleAuthUrl = googleOAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: env.GC_SCOPES
  });


export const googlePeople = google.people({
  version: "v1",
  auth: env.GC_CREDENTIALS_API_KEY,
}).people;
