function CheckHealth(req, res) {
    // Logic to check for the health of the database connection could be added here
    res.status(200).send('OK');
}

module.exports = CheckHealth;
