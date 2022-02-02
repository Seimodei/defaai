import { useEffect, useState } from "react";
import axios from 'axios';

//Components
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Styles
import './player.scss';



interface PlayerProps {
    type: string;
    sound: string;
    play: boolean;
};



const Player = (props: PlayerProps) => {
    const [play, setPlay] = useState(false);

    useEffect(() => {
        const NUMBER_OF_BUCKETS = 100;
        const SPACE_BETWEEN_BARS = 0.2; 
        let audioCtx = new(window.AudioContext)();

        axios({url: props.sound, responseType: "arraybuffer"}).then(response => {
            let audioData = response.data;

            audioCtx.decodeAudioData(audioData, buffer => {
                let decodedAudioData = buffer.getChannelData(0);
                let bucketDataSize = Math.floor(decodedAudioData.length / NUMBER_OF_BUCKETS);
                let buckets = [];
                for (var i = 0; i < NUMBER_OF_BUCKETS; i++) {
                    let startingPoint = i * bucketDataSize;
                    let endingPoint = i * bucketDataSize + bucketDataSize;
                    let max = 0;
                    for (var j = startingPoint; j < endingPoint; j++) {
                        if (decodedAudioData[j] > max) {
                            max = decodedAudioData[j];
                        }
                    }
                    let size = Math.abs(max);
                    buckets.push(size / 2);
                }

                document.getElementById('waveform-mask').innerHTML = buckets.map((bucket, i) => {
                    let bucketSVGWidth = 100.0 / buckets.length;
                    let bucketSVGHeight = bucket * 8;

                    return `<rect
                        x=${bucketSVGWidth * i + SPACE_BETWEEN_BARS / 2.0}
                        y=${ (100 - bucketSVGHeight) / 2.0}
                        width=${bucketSVGWidth - SPACE_BETWEEN_BARS}
                        height=${bucketSVGHeight} />`;
                }).join('');

                let audioElement: any = document.getElementById('audio-element');
                let waveformProgress: any = document.getElementById('waveform-progress');

                // every 100 milliseconds, update the waveform-progress SVG with a new width - the percentage of time elapsed on the audio file
                setInterval(() => {
                    waveformProgress.setAttribute('width', `${audioElement.currentTime / audioElement.duration * 100}`);
                }, 100);
            }, e => {
                // callback for any errors with decoding audio data
                console.log('Error with decoding audio data' + e.message);
            },);
        }).catch(err => {
            // catch any errors with fetching the audio
            console.log(err);
        });
    }, []);

    useEffect(() => {
        let audioElement: any = document.getElementById('audio-element');
        
        if (play) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    }, [play]);

    useEffect(() => {
        setPlay(props.play);
    }, [props])

    return (
        <div className={`player ${play ? "active" : ""}`}>
            <audio id="audio-element" hidden src={props.sound} controls></audio>
            <div className="controls">
                {play ? <FontAwesomeIcon icon={faPauseCircle} onClick={() => setPlay(false)} /> : <FontAwesomeIcon icon={faPlayCircle} onClick={() => setPlay(true)} />}
            </div>
            <div className="progress-bar">
                <div className="type">{props.type}</div>
                <svg viewBox="0 45 100 100" className="waveform-container">
                    <g>
                        <rect className="waveform-bg" x="0" y="0" height="100" width="100"/>
                        <rect id="waveform-progress" className="waveform-progress" x="0" y="0" height="100" width="0"/>
                    </g>
                </svg>

                <svg height="0" width="0">
                    <defs>
                        <clipPath id="waveform-mask"></clipPath>
                    </defs>
                </svg>
            </div>
        </div>
    )
};



export default Player;