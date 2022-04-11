const express = require("express");
const app = express();
const port = 5000;

app.get("/api/clients", (req, res) => {
    const customers = [
        { id: 1, firstName: "John", lastName: "Doe" },
        { id: 2, firstName: "Abass", lastName: "Ben" },
        { id: 3, firstName: "Toto", lastName: "Tata" }
    ];

    res.json(customers);
});
app.listen(port, () => {
    console.log(`listen on port ${port}`);
});