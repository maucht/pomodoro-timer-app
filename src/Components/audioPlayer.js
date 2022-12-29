import React from 'react'

const AudioPlayer = (props) => {
    const track = props.track
    switch(track){
        case(null):
            return(null)
            break
        default:
            return(
                <audio src ={track.source} autoPlay loop/>
            )
    }


    }
export default AudioPlayer
