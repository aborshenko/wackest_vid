console.log("ui.js loaded")

class UI {
    constructor() {
        this.vidList = document.getElementById('vidList')
        this.vidURL = "https://www.youtube.com/watch?v="
    }

    renderVids(vidObjList) {
        this.clearVids();
        console.log(vidObjList);
        for (let vidObj of vidObjList) {
            if (vidObj) {
                // console.log("appending vidObj " + vidObj.id);
                this.appendVid(vidObj);
            }
        }
    }

    clearVids() {
        console.warn('clearing vids')
        this.vidList.innerHTML = '';
    }

    appendVid (vidObj) {
        // console.log(vidObj);
        this.vidList.innerHTML += `
        <div class="card card-body mb-3" style="width: 18rem;">
            <div class="row">
                <div class="card">
                    <a href="${this.vidURL}${vidObj.id}">
                        <img class="img-fluid mb-2" src=${vidObj.snippet.thumbnails.standard.url}>
                    </a>
                </div>
            </div>
            <div class="row">
            <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center">Wackness Score (higher is wacker): ${vidObj.statistics.wackness}</li>
                <li class="list-group-item d-flex justify-content-between align-items-center">View Count: ${vidObj.statistics.viewCount}</li>
                <li class="list-group-item d-flex justify-content-between align-items-center">Dislike Count: ${vidObj.statistics.dislikeCount}</li>
                <li class="list-group-item d-flex justify-content-between align-items-center">Like Count: ${vidObj.statistics.likeCount}</li>
                <li class="list-group-item d-flex justify-content-between align-items-center">Comment Count: ${vidObj.statistics.commentCount}</li>
            </ul>
            </div>
        </div>
        `
    }
}