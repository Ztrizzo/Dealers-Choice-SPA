const {Sequelize, STRING, UUID, UUIDV4} = require('sequelize');
const sequelize = new Sequelize('postgres://localhost/dealers_choice_SPA');

const Song = sequelize.define('Song', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING
    }
})

const Artist = sequelize.define('Artist', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING
    }
})

const CurrentlyPlaying = sequelize.define('Current', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    }
})

Song.belongsTo(Artist);
Artist.hasMany(Song);
CurrentlyPlaying.belongsTo(Song);

const syncAndSeed = async () => {
    try{
        await sequelize.sync({force: true});

        const beatles = await Artist.create({name: 'The Beatles'});
        const ledZeppelin = await Artist.create({name: 'Led Zeppelin'});
        const pinkFloyd = await Artist.create({name: 'Pink Floyd'});

        await Song.create({name: 'Here Comes the Sun', ArtistId: beatles.id});
        await Song.create({name: 'Come Together', ArtistId: beatles.id});
        await Song.create({name: 'Strawberry Fields Forever', ArtistId: beatles.id});
        
        await Song.create({name: 'Stairway to Heaven', ArtistId: ledZeppelin.id});
        await Song.create({name: 'Immigrant Song', ArtistId: ledZeppelin.id});
        await Song.create({name: 'Black Dog', ArtistId: ledZeppelin.id});

        await Song.create({name: 'Comfortably Numb', ArtistId: pinkFloyd.id});
        await Song.create({name: 'Shine On You Crazy Diamond', ArtistId: pinkFloyd.id});
        await Song.create({name: 'Money', ArtistId: pinkFloyd.id});
    }
    catch(error){
        console.log(error);
    }

}

module.exports = {
    syncAndSeed,
    Song,
    Artist,
    CurrentlyPlaying
}