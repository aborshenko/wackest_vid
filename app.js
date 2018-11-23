console.log("app.js loaded")

const yt = new Youtube();
const samplePlaylistId = 'PLjOsBJoP38YgUE671J98dHrUIB08degA7'


yt.getPlaylistItems(samplePlaylistId)
    .then(data => logVidStats(data))
    .catch(err => console.warn(err));

function logVidStats (vid_list) {
    vid_list.forEach(vid => {
        vid.then(data => {
            console.log(data) // render the vids
        })    
    })
}