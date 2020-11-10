const express = require('express');
const Records = require('../models/Records');
const recordsRouter = express.Router();

recordsRouter.post('/', (req, res) => {
    const record = req.body.record;
    const artist = req.body.artist;
    const year = req.body.year;
    const style = req.body.style;
    const added = req.body.added;
    const image = req.body.image;
    const date = req.body.date;

    const records = new Records();

    records.record = record;
    records.artist = artist;
    records.year = year;
    records.style = style;
    records.added = added;
    records.image = image;
    records.date = date;

    records.save()
        .then((newRecord) => {
            res.json(newRecord)
        }).catch((error) => {
            res.status(500).send(error)
        })
})

recordsRouter.get('/', (req, res) => {
    Records.find({}, { __v: 0, createdAt: 0, updatedAt: 0 })
        .then((records) => {
            res.set("Content-type", "application/json; charset=utf-8")
                .send(JSON.stringify({ records }, null, 2));
        }).catch((error) => {
            res.status(500).send(error)
        })
})

recordsRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    Records.findById(id, { __v: 0, createdAt: 0, updatedAt: 0 })
        .then((record) => {
            res.json(record)
        }).catch((error) => {
            res.status(500).send(error)
        })
})

recordsRouter.delete('/', (req, res) => {
    Records.deleteMany({}, { __v: 0, createdAt: 0, updatedAt: 0 })
        .then((allRecordsDeleted) => {
            res.send({ message: 'All records were deleted successfully' })
        })
})


recordsRouter.delete('/:id', (req, res) => {
    const id = req.params.id;

    Records.findByIdAndDelete(id)
        .then((recordDeleted) => {
            res.send({ message: `deleted by id : ${id} successfully` })
        }).catch((error) => {
            res.status(500).send(error)
        })
})

recordsRouter.put('/:id', (req, res) => {

    const id = req.params.id;

    const record = req.body.record;
    const artist = req.body.artist;
    const year = req.body.year;
    const style = req.body.style;
    const added = req.body.added;
    const image = req.body.image;
    const date = req.body.date;

    Records.findByIdAndUpdate(id, {
        record: record,
        artist: artist,
        year: year,
        style: style,
        added: added,
        image: image,
        date: date
    })

        .then(() => {
            return Records.findById(id)
        }).then((recordUpdated) => {
            res.send(recordUpdated)
        }).catch((error) => {
            res.status(500).send(error)
        })

})

module.exports = recordsRouter