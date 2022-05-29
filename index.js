const express=require("express");
let cors=require("cors");
const ContactRouter=require("./routes/Contactts");
require("./db/mongoose");
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors())
app.use(ContactRouter)
app.listen(port, () => {
    console.log("server running on port "+port);
  });