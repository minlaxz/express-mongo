const express = require('express');
const router = express.Router();

router.use(express.json())

const lessons = [
    { id: 1, name: "Lesson 1" },
    { id: 2, name: "Lesson 2" },
    { id: 3, name: "Lesson 3" },

]

router.get('/api', (req, res) => {
    res.send('Api Docs');
})

router.get('/api/lessons', (req, res) => {
    res.send(`lessons route is called from => ${req.hostname}`)
})

router.get('/api/lessons/:id', (req, res) => {
    const lesson = findLesson(req.params.id)
    if (!lesson) notFound(res)
    else res.send(lesson)
})

const badRequest = (res, err) => {
    return res.status(400).send(`This is a bad request\nReason : ${err.details[0].message}`)
}

const notFound = (res) => {
    return res.status(404).send('Resource not found.')
}

const findLesson = (id) => {
    return lessons.find(l => l.id === parseInt(id))
}

module.exports = router;