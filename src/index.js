import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
import PodcastRow from './components/PodcastRow'
import Episode from './components/Episode'
import axios from 'axios'

const App = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [podcasts, setPodcasts] = useState([])
    const [episodes, setEpisodes] = useState([])
    const [selectedPodcast, setSelectedPodcast] = useState(null)


    // const podcasts = [
    //     { id: 0, name: 'podcast 1', image: '/images/person_1.jpg', categories: ['sports', 'entertainment'] },
    //     { id: 1, name: 'podcast 2', image: '/images/person_2.jpg', categories: ['news', 'politics'] },
    //     { id: 2, name: 'podcast 3', image: '/images/person_3.jpg', categories: ['business', 'economys'] },
    // ]

    // const episodes = [
    //     { id: 0, title: 'track 1', image: '/images/img_1.jpg', trackUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    //     { id: 1, title: 'track 2', image: '/images/img_2.jpg', trackUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    //     { id: 2, title: 'track 3', image: '/images/img_3.jpg', trackUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    //     { id: 3, title: 'track 4', image: '/images/img_4.jpg', trackUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    //     { id: 4, title: 'track 5', image: '/images/img_5.jpg', trackUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    //]

    const onInputTyped = (event) => {
        console.log("onInputTyped " + event.target.value);
        //document.onkeypress = function (e) {
        //e = e || window.event;
        //console.log(e);
        //}
        setSearchTerm(event.target.value)
        //console.log(event.target.value)
    }

    const onSearchButtonClicked = (event) => {
        console.log('onSearchButtonClicked : ' + searchTerm)

        axios({
            url: '/search',
            method: 'post',
            data: {
                term: searchTerm.trim().toLocaleLowerCase()
            },
            options: {
                headers: { Accept: 'application/json' }
            }
        })
            .then(({ data }) => {
                //console.log("PODCASTS : " + JSON.stringify(data))
                setPodcasts(data.podcasts)
                //setEpisodes(data.episodes)
            })
            .catch(err => {
            })
    }

    const selectPodcast = (podcast, event) => {
        event.preventDefault()
        console.log('selectPodcast :' + JSON.stringify(podcast))
        setSelectedPodcast(podcast)
    }

    useEffect(() => {
        console.log('Selected podcast changed : ' + JSON.stringify(selectedPodcast))
        if (selectedPodcast == null)
            return

        const url = `/feed?url=${selectedPodcast.feed}`
        axios({
            url: url,
            method: 'get',
        })
            .then(({ data }) => {
                console.log("/feed " + JSON.stringify(data))
                const { item } = data
                const tracks = item.map((t, index) => {
                    return {
                        id: index,
                        title: t.title,
                        author: t.author,
                        pubDate: t.pubDate,
                        image: selectedPodcast.image,
                        trackUrl: t.enclosure[0]['$'].url
                    }
                })

                setEpisodes(tracks)

            })
            .catch(err => {
            })
    }, [selectedPodcast])

    const pressEnterButton = (e) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            document.getElementById('pressEnter').click()
            console.log(e.code)
        }
    }



    return (
        <div className="site-wrap">
            <Header />

            <div className="site-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="featured-user  mb-5 mb-lg-0">

                                <h3 className="mb-2 text-capitalize">rechercher des podcasts</h3>
                                <div style={{ display: "flex" }}>
                                    <input onKeyUp={ pressEnterButton } onChange={ onInputTyped } type="text" style={{ height: 32 }} className="form-control mb-4" />
                                    <button onClick={ onSearchButtonClicked } id="pressEnter" className="btn btn-info p-1 ml-2" style={{ height: 32 }}>GO!</button>
                                </div>

                                <ul className="list-unstyled">
                                    {podcasts.map(podcast => <PodcastRow key={podcast.id}{...podcast} onSelect={(e) => selectPodcast(podcast, e)} />)}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            {episodes.map(episode => <Episode key={episode.id}{...episode} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))