

const init = async () => {
    //load available songs
    let response = await axios.get('/api/songs');
    const songs = response.data.map((song) => {
        return `<li data-id=${song.id}>${song.name} : ${song.Artist.name}</li>`
    }).join('');
    document.querySelector('#song_list').innerHTML = songs;

    //load currently playing songs
    response = await axios.get('/api/current');
    const currentlyPlaying = response.data.map((current) => {
        return `<li data-id=${current.id}>${current.Song.name}</li>`
    }).join('');
    document.querySelector('#playing').innerHTML = currentlyPlaying;

    //load select
    response = await axios.get('/api/artists');
    const artists = response.data.map((artist) => {
        return `<option value='${artist.name}'>${artist.name}</option>`
    }).join('');
    console.log(artists);
    document.querySelector('#artists').innerHTML = artists;
}
init();

document.querySelector('#song_list').addEventListener('click', async (event) => {
    if (event.target.tagName === 'UL')
        return;
    await axios.post(`/api/current/${event.target.dataset.id}`);
    init();

})

document.querySelector('#playing').addEventListener('click', async (event) => {
    if (event.target.tagName === 'UL')
        return;
    await axios.delete(`/api/current/${event.target.dataset.id}`);
    init();
})

document.querySelector('#new_artist_button').addEventListener('click', async (event) => {
    const nameBox = document.querySelector('input')
    const artist = {name: nameBox.value};
    nameBox.value = '';
    await axios.post(`/api/artist/`, artist);
    init();
})