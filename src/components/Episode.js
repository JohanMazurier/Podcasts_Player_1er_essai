import React, {useEffect, useRef } from 'react'

const Episode = ({ title, image, author, pubDate, trackUrl }) => {
    //const [trackUrl2, setTrack] = useState([]);
    const audioRef = useRef();
    useEffect(() => {
        // Met à jour le titre du document via l’API du navigateur
        audioRef.current.load();
    });

    const bgImage = `url("${image}")`
    return (
        <div className="d-block d-md-flex podcast-entry bg-white mb-5">
            <div className="image" style={{ backgroundImage: bgImage }}></div>
            <div className="text">
                <h3 className="font-weight-light"><a href="single-post.html">{title}</a></h3>
                <div className="text-white mb-3"><span className="text-black-opacity-05"><small>{author}
                    <span className="sep"></span>{pubDate}<span className="sep"></span></small></span>
                </div>
                <div className="player">

                    <div>
                        <audio ref={audioRef} className="player2" preload="none" controls controlsList="nodownload" style={{ width: '100%' }}>
                            <source
                                src={trackUrl}
                                type="audio/mp3" />
                        </audio>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Episode