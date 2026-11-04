import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.join(process.cwd(), ".env") })

const config = {
    connectection_str: process.env.DATABASE_STR,
    port: process.env.PORT || 8000,
}

export default config;