const express = require('express');
const path = require('path');
const app = express();

const lessonRoute = require('./routes/api/v1');
app.use(lessonRoute)

app.use(express.static(path.join(__dirname, '../public')))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.info('Listening on port 3000...');
})