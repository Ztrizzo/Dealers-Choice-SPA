

const init = async () => {
    let response = await axios.get('/api/songs');
    const songs = response.data.map((song) => {
        return `<li data-id=${song.id}>${song.name} : ${song.Artist.name}</li>`
    }).join('');
    document.querySelector('#song_list').innerHTML = songs;

    response = await axios.get('/api/current');
    const currentlyPlaying = response.data.map((current) => {
        return `<li data-id=${current.id}>${current.Song.name}</li>`
    }).join('');
    document.querySelector('#playing').innerHTML = currentlyPlaying;
}
init();

document.querySelector('#song_list').addEventListener('click', async (event) => {
    if (event.target.tagName === 'UL')
        return;
    await axios.post(`/api/current/${event.target.dataset.id}`);
    init();

})

document.querySelector('#playing').addEventListener('click', async (event) => {
    console.log('test');
    if (event.target.tagName === 'UL')
        return;
    await axios.delete(`/api/current/${event.target.dataset.id}`);
    init();
})