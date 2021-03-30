const express = require('express')
const axios = require('axios')
const router = express.Router()
const { parseString } = require('xml2js')



router.get('/', (req, res, next) => {
    res.render('index')
})

router.get('/feed', async (req, res, next) => {
    const url = req.query.url
    const { data } = await axios({
        url,
        method: 'get',
    })

    parseString(data, (err, json) => {
        if (err) {
            console.log('parseString error')
            return
        }
        const { rss } = json
        const { channel } = rss
        const payload = channel[0]
        res.json(payload)
    })
})

// res.json({
//     data:'this is the feed endpoint : ' + url
// })

router.get('/search', async (req, res, next) => {

    const url = 'https://itunes.Apple.com/search?term=jeux&country=FR&media=podcast'
    const { data } = await axios({
        url,
        method: 'get',
        options: {
            headers: { Accept: 'application/json' }
        }
    })

    const { results } = data
    const podcasts = results.map(podcast => {
        return {
            artistName: podcast.artistName,
            trackName: podcast.trackName,
            icon: podcast.artworkUrl600,
            genres: podcast.genres,
            feed: podcast.feedUrl
        }
    })
    res.json({
        podcasts
    })
})

router.post('/search', async (req, res, next) => {
    const searchTerm = req.body.term
    const url = `https://itunes.Apple.com/search?term=${searchTerm}&country=FR&media=podcast`
    const { data } = await axios({
        url,
        method: 'post',
        options: {
            headers: { Accept: 'application/json' }
        }
    })

    const { results } = data
    const podcasts = results.map((podcast, index) => {
        return {
            id: index,
            name: podcast.artistName,
            image: podcast.artworkUrl600,
            categories: podcast.genres,
            trackName: podcast.trackName,
            feed: podcast.feedUrl

        }
    })
    res.json({
        podcasts
    })
})

// router.get('/react', (req, res, next) => {
//     res.render('index')
//})

module.exports = router