import {app} from "./src/app.js";
import {connectDB} from "./src/db/db.js";

//db connection
connectDB();

//server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {  
console.log(`Server is running on port  http://localhost:${PORT}`);

 })