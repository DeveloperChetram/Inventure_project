import {app} from "./src/app.js";

const PORT = process.env.PORT || 3001;
app.listen(process.env.PORT, () => {  
console.log(`Server is running on port  http://localhost:${PORT}`);

 })