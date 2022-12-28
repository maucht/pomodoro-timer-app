import React from 'react'

const AudioPlayer = (props) => {
    const track = props.track
    return(
        <audio src ={track.source} autoPlay loop/>
    )

    }
export default AudioPlayer
