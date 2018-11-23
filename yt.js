console.log("yt.js loaded")
class Youtube {
    constructor () {
        // youtube data v3 api key
        this.apiKey = atob('QUl6YVN5QlI0NFJJUUkzS0UyWGtwcy1YMW9OS0ZqSFBMLUhyOWxV')
        // api endpoints
        this.pliURL = "https://www.googleapis.com/youtube/v3/playlistItems"
        this.vidURL= "https://www.googleapis.com/youtube/v3/videos"
        this.commentTreadsURL = "https://www.googleapis.com/youtube/v3/commentThreads" 
    }

    async getPlaylistItems(playlistId, pageToken = "firstPage") {
        const params = {
            playlistId,
            key: this.apiKey,
            part: 'snippet',
            maxResults: 50
        }
        const query = this.buildURL(params)
        const response = await fetch(`${this.pliURL}?${query}`)

        const responseData = await response.json();
        const vidObjList = responseData.items.map(async item => {
            return this.getVid(item.snippet.resourceId.videoId)
        });
        return vidObjList
    }

    async getVid (v_id) {
        const params = {
            id: v_id,
            key: this.apiKey,
            part: 'snippet,statistics',
        }
        const query = this.buildURL(params)
        const response = await fetch(`${this.vidURL}?${query}`);
        const responseData = await response.json();
        const vid = responseData.items[0];
        vid.statistics.wackness = vid.statistics.dislikeCount / vid.statistics.viewCount * 1000.0
        return vid
    }

    buildURL(params) {
        return Object.keys(params)
            .map(k=> `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
            .join('&');
    }
}