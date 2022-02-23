const express = require('express');
const app = express();
const {syncAndSeed, Song, Artist, CurrentlyPlaying} = require('./db/db.js');
const path = require('path');

app.use(express.static('./src'));
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`listening on port: ${PORT}`)})

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

syncAndSeed();

app.get('/api/songs', async (req, res, next) => {
    try{
        const songs = await Song.findAll({
            include:[Artist]
        })
        res.send(songs);
    }
    catch(error){
        next(error);
    }

})

app.get('/api/current', async (req, res, next) => {
    try{
        const currentlyPlaying = await CurrentlyPlaying.findAll({
            include: [Song]
        })
        res.send(currentlyPlaying)
    }
    catch(error){
        next(error);
    }
})

app.get('/api/artists', async (req, res, next) => {
    try{
        res.send(await Artist.findAll());
    }
    catch(error){
        next(error);
    }
})

app.post('/api/current/:id', async (req, res, next) => {
    try{
        await CurrentlyPlaying.create({SongId: req.params.id});
        res.sendStatus(200);
    }
    catch(error){
        next(error);
    }
})

app.delete('/api/current/:id', async (req, res, next) => {
    try{
        const song = await CurrentlyPlaying.findByPk(req.params.id);
        song.destroy();
        
        res.sendStatus(204);
    }
    catch(error){
        next(error);
    }
})

app.post('/api/artist', async (req, res, next) => {
    try{
        await Artist.create({name: req.body.name});
        res.sendStatus(201);
    }
    catch(error){
        next(error);
    }
})

app.post('/api/song', async (req, res, next) => {
    try{
        await Song.create({name: req.body.name, ArtistId: req.body.ArtistId});
        
        res.sendStatus(201);
    }
    catch(error){
        next(error);
    }
})