console.log("app.js loaded")
// const samplePlaylistId = 'PLjOsBJoP38YgUE671J98dHrUIB08degA7'

const yt = new Youtube();
const ui = new UI();
const sent = new Sentiment();
const searchURL = document.getElementById('searchURL');

// add event listener on enter key
searchURL.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        yt.getPlaylistItems(queryParse(searchURL.value))
            .then(data => resolveVids(data, addListenersToCards))
            .catch(err => console.warn(err));
    }
})

// able to parse urls or playlistIds directly
function queryParse (query) {
    const re = /list=/gi;
    if (query.search(re) == -1) {
        return query;
    } else {
        result = query.substring(query.search(re) + 5, query.length);
        return result
    }
}

// resolve vid Promises and sort by wackness and render
function resolveVids (vid_list, callback) {
    // console.log(vid_list);
    Promise.all(vid_list)
        .then(data => {
            data.sort((a,b) => b.statistics.wackness - a.statistics.wackness);
            // console.log(data);
            ui.renderVids(data);
            callback();
        })
}
// handler to add click listeners to cards, gets fired after vids render

function addListenersToCards() {
    elements = document.getElementsByClassName('list-group')
    for (let elem of elements) { elem.addEventListener('click', (e) => {
            resolveComments(e.target.parentElement.id)
        })
    }
}

// finds rude comment and updates a card element with one
function resolveComments(v_id) {
    yt.getComments(v_id)
        .then(data => {
            Promise.all(data)
                .then(comments => {
                   comments.sort((a,b) => a.rudeness - b.rudeness)
                   rudest_comments = comments.filter(com => com.rudeness <= -0.4)
                   sample_rude_comment = rudest_comments[Math.floor(Math.random() * rudest_comments.length)];
                   ui.addComment(document.getElementById(v_id),sample_rude_comment)
                })
        })
}
