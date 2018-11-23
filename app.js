console.log("app.js loaded")

const yt = new Youtube();
const ui = new UI();
const searchURL = document.getElementById('searchURL');
searchURL.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        yt.getPlaylistItems(searchURL.value)
            .then(data => getVids(data));
    }
})

const samplePlaylistId = 'PLjOsBJoP38YgUE671J98dHrUIB08degA7'


// yt.getPlaylistItems(samplePlaylistId)
//     .then(data => getVids(data))
//     .catch(err => console.warn(err));

function getVids (vid_list) {
    Promise.all(vid_list)
        .then(data => {
            console.log(data)
            data.sort((a,b) => b.statistics.wackness - a.statistics.wackness);
            console.log(data);
            ui.renderVids(data)
        })
}

