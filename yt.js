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

    async getPlaylistItems(playlistId, pageToken) {
        const params = {
            playlistId,
            key: this.apiKey,
            part: 'snippet',
            maxResults: 50
        }
        if (pageToken) {
            params["pageToken"] = pageToken
        }
        const query = this.buildURL(params)
        const response = await fetch(`${this.pliURL}?${query}`)
        const responseData = await response.json();
        const nextPageToken = responseData.nextPageToken;
        const vidObjList = responseData.items.map(async item => {
            return this.getVid(item.snippet.resourceId.videoId)
        });
        // console.log(vidObjList);
        if (nextPageToken) {
            let nextPageVids = await this.getPlaylistItems(playlistId, nextPageToken);
            // console.log(nextPageVids);
            vidObjList.push(...nextPageVids);
        }
        return vidObjList
    }

    async getVid (v_id) {
        const params = {
            id: v_id,
            key: this.apiKey,
            part: 'snippet,statistics',
        }
        const query = this.buildURL(params)
        try {
            const response = await fetch(`${this.vidURL}?${query}`);
            const responseData = await response.json();
            const vid = responseData.items[0];
            if (vid) {
                vid.statistics.wackness = vid.statistics.dislikeCount / vid.statistics.viewCount * 1000.0
            }
            return vid
        } catch (e) {
            console.warn(e)
        }
    }

    buildURL(params) {
        return Object.keys(params)
            .map(k=> `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
            .join('&');
    }
}