# JavaScript implementation of the Wackest video app

## A single page app that analyses youtube playlists

## goals

* single page and serverless
    * api key exposure be damned
* all vanilla javascript
    * maybe rewrite with a framework (vue or react) after
* easy playlist lookup
* easy channel lookup
* text sentiment analyses to bring back sample rude comments
* need some sort of rendering solution

## Usage

Use search bar to find channels
can paste urls into to target specific channels or playlist
look through the vids in the playlist and calculate wackness score
show the wackest videos and with their wackness score
additionally throw in some low sentiment comments, running them through some sentiment analysis api (much more worried about this key abuse)