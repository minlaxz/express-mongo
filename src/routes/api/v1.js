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

router.post('/api/lessons', (req, res) => {
    const { error } = validateLesson(req.body.name)
    if (error) {
        badRequest(res, error)
    }

    const lesson = {
        id: lessons.length + 1,
        name: req.body.name
    }

    lessons.push(lesson)
    res.send(lesson)

})

router.put('/api/lessons/:id', (req, res) => {
    const lesson = findLesson(req.params.id)
    if (!lesson) notFound(res)
    else {
        const { error } = validateLesson(req.body.name)
        if (error) {
            badRequest(res, error)
        }

        lesson.name = req.body.name;
        res.send(lesson)
    }

})

router.delete('/api/lessons/:id', (req, res) => {
    const lesson = findLesson(req.params.id)
    if (!lesson) notFound(res)
    else {
        const index = lessons.indexOf(lesson)
        lessons.splice(index, 1)
    }
    res.send(lesson)

})

const validateLesson = (lessonName) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required()
    })
    return schema.validate({ // error , value
        name: lessonName
    })
}

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