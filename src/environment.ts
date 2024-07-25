export const env = {
    GC_CREDENTIALS_API_KEY: process.env.API_KEY,
    GC_CLIENT_ID: process.env.CLIENT_ID,
    GC_CLIENT_SECRET: process.env.CLIENT_SECRET,
    GC_REDIRECT_URI: process.env.REDIRECT_URI,
    APP_PORT: process.env.PORT || 8000,
    GC_SCOPES: ["https://www.googleapis.com/auth/contacts"]
}
