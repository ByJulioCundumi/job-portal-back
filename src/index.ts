import app from "./server.js";
import { PORT, HOST } from "./config/config.js";
import { AppDataSource } from "./db/db.js";

const main = async ()=>{
    app.listen(PORT, HOST, ()=>{console.log(`Server started on http://${HOST}:${PORT}`)})

    try {
        await AppDataSource.initialize();
        console.log("Database conection started")
    } catch (error) {
        console.log(error)
    }
}
main()