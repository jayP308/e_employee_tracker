const express = require('express');


const PORT = process.env.DB_PORT;

const app = express();


app.listen(PORT, () => console.log(`App is connected to PORT http://localhost:${PORT}`));
