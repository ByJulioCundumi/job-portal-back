import app from "./server.js";
import { PORT, HOST } from "./config/config.js";

const main = async ()=>{
    app.listen(PORT, HOST, ()=>{console.log(`Server started on http://${HOST}:${PORT}`)})

    try {
        
    } catch (error) {
        console.log(error)
    }
}
main()