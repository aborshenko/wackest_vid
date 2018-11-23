console.info('sentiment.js loaded')
class Sentiment {
    constructor () {
        this.sentimentURL = 'https://language.googleapis.com/v1/documents:analyzeSentiment'
        this.$ = atob('QUl6YVN5QlI0NFJJUUkzS0UyWGtwcy1YMW9OS0ZqSFBMLUhyOWxV')
    }
    
    async analyze(text) {
        const params = {
            key: this.$,
        }
        const data = {
            document : {
                content: text,
                type: "PLAIN_TEXT"
            }
        }
        const query = this.buildURL(params)
        const response = await fetch(`${this.sentimentURL}?${query}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        return resData.documentSentiment.score
    }

    buildURL(params) {
        return Object.keys(params)
            .map(k=> `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
            .join('&');
    }
}