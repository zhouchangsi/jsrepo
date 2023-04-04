function hassPassword(password) {
    // using Bcrypt to hass password
    return password
}

// express callback  async function
app.get('/path', async (req, res) => {
    try {
        // await query function
    } catch (err) {
        // catch err
        res.status(500).send(err)
    }
})