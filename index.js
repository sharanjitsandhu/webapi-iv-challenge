require("dotenv").config(); //reads .env and merges it into process.env

const server = require("./server.js");

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n*** Server is running on http://localhost:${port} ***\n`);
});

// Environment variables are system wide.
// A hosting service might assign port dynamically.
