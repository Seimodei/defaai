import { useState } from 'react';
import { Link } from 'react-router-dom';


//Component
import Input from 'components/input/Input';
import Button from 'components/button/Button';
import VideoPreview from 'components/videoPreview/VideoPreview';
import Player from 'components/player/Player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faUpload } from '@fortawesome/free-solid-svg-icons';

//Helpers
import { AppLinks } from 'shared/shared.models';

//Styles
import './videoCreation.scss';
import V1 from 'assets/v1.jpeg';
import V2 from 'assets/v2.jpeg';
import V3 from 'assets/v3.jpeg';
import V4 from 'assets/v4.jpeg';
import V5 from 'assets/v5.jpeg';
import V6 from 'assets/v6.jpeg';
import V7 from 'assets/v7.jpeg';
import bg1 from 'assets/bg1.jpeg';
import bg2 from 'assets/bg2.jpeg';
import bg3 from 'assets/bg3.jpeg';
import bg4 from 'assets/bg4.jpeg';
import bg5 from 'assets/bg5.jpeg';
import bg6 from 'assets/bg6.jpeg';


const sound = require('assets/sound.mp3');



const VideoCreation = () => {
    const [activeTab, setActiveTab] = useState("Actor");
    const [activeActor, setActiveActor] = useState({
        name: "Yoyo",
        thumbnail: V2
    });
    const [activeBg, setActiveBg] = useState({
        name: "Office",
        thumbnail: bg2
    });
    const [activeVoice, setActiveVoice] = useState(null);
    const [activeAlignment, setActiveAlignment] = useState("Center");
    const [openModal, setOpenModal] = useState(false);
    const [videoName, setVideoName] = useState("Saying Hi To My Customers");

    const tabs = [
        "Actor", "Voice", "Alignment", "Background"
    ];

    const tags = ["Email", "Marketing", "Greeting"];

    const allActors = [
        {
            name: "Anna",
            thumbnail: V1
        },
        {
            name: "Yoyo",
            thumbnail: V2
        },
        {
            name: "Skye",
            thumbnail: V3
        },
        {
            name: "Mike",
            thumbnail: V4
        },
        {
            name: "Vincent",
            thumbnail: V5
        },
        {
            name: "Peter",
            thumbnail: V6
        },
        {
            name: "May",
            thumbnail: V7
        }
    ];

    const allVoices = [
        {
            type: "Asian",
            sound: sound
        },
        {
            type: "British",
            sound: sound
        },
        {
            type: "American",
            sound: sound
        }
    ];

    const allAlignments = ["Left", "Center", "Right"];

    const allBackground = [
        {
            name: "Office",
            thumbnail: bg1
        },
        {
            name: "Space",
            thumbnail: bg2
        },
        {
            name: "Noise",
            thumbnail: bg3
        },
        {
            name: "Meeting Room",
            thumbnail: bg4
        },
        {
            name: "Books",
            thumbnail: bg5
        },
        {
            name: "Desk",
            thumbnail: bg6
        }
    ];


    const Actors = () => (
        <div className="actors">
            {allActors.map((actor, i) => (
                <div key={i} className={`actor ${activeActor.name === actor.name ? "active" : ""}`} onClick={() => setActiveActor(actor)}>
                    <img src={actor.thumbnail} alt={actor.name} />
                    <span>{actor.name}</span>
                </div>
            ))}
        </div>
    );

    const Voices = () => (
        <div className="voices">
            {allVoices.map((voice, i) => (
                <div key={i} onClick={() => setActiveVoice(voice.type)}>
                    <Player 
                        type={voice.type}
                        sound={voice.sound}
                        play={voice.type === activeVoice}
                    />
                </div>
            ))}
        </div>
    );

    const Alignments = () => (
        <div className="alignments">
            {allAlignments.map((algn, i) => (
                <span 
                    className={`alignment ${activeAlignment === algn ? "active" : ""}`}
                    key={i} 
                    onClick={() => setActiveAlignment(algn)}
                >{algn}</span>
            ))}
        </div>
    );

    const Background = () => (
        <div className="background">
            <div className="bg-images">
                <div className="dd">
                    <span className="title">Images</span>
                    <FontAwesomeIcon icon={faChevronUp} />
                </div>
                <div className="all-images">
                    <div className='upload'>
                        <div className="icon">
                            <FontAwesomeIcon icon={faUpload} />
                        </div>
                        <span>Upload</span>
                    </div>
                    {allBackground.map((bg, i) => (
                        <div key={i} className={`actor ${activeBg.name === bg.name ? "active" : ""}`} onClick={() => setActiveBg(bg)}>
                            <img src={bg.thumbnail} alt={bg.name} />
                            <span>{bg.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="dd">
                <span className="title">Solid Colours</span>
                <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <div className="dd">
                <span className="title">Videos</span>
                <FontAwesomeIcon icon={faChevronDown} />
            </div>
        </div>
    );


    const sections = {
        "Actor": <Actors />,
        "Voice": <Voices />,
        "Alignment": <Alignments />,
        "Background": <Background />
    };




    return (
        <div className="video-creation">
            <div className="video-creation-header">
                <div className="video-creation-modal">
                    <div className="trigger" onClick={() => setOpenModal(!openModal)}>
                        <h1>Saying Hi To My Customers</h1>
                        <FontAwesomeIcon icon={faChevronDown} className='h-icon' />
                    </div>
                    {openModal && (
                        <div className="modal">
                            <div className="modal-bg" onClick={() => setOpenModal(false)}></div>
                            <div className="modal-content">
                                <div className="input-group">
                                    <Input 
                                        value={videoName}
                                        hideOutline
                                        onChange={(val) => setVideoName(val)}
                                    />
                                </div>
                                <div className="description">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non massa purus. Ut malesuada pharetra sapien in hendrerit. Etiam rutrum sagittis porttitor 
                                </div>
                                <div className="tags">
                                    {tags.map((tag, i) => (
                                        <span className="tag" key={i}>{tag}</span>
                                    ))}
                                </div>
                                <div className="save">
                                    <Button 
                                        text='Save'
                                        onClick={() => setOpenModal(false)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="actions">
                    <Button 
                        text='cancel'
                        disabled
                    />
                    <Link to={AppLinks.BrowseVideos}>
                        <Button 
                            text='save'
                        />
                    </Link>
                </div>
            </div>

            <div className="video-creation-content">
                <VideoPreview {...activeActor} />
                <section>
                    <div className="video-creation-tabs">
                        {tabs.map((tab, i) => (
                            <span 
                                className={`tab ${activeTab === tab ? "active" : ""}`} 
                                key={i}
                                onClick={() => {
                                    setActiveTab(tab);
                                    setActiveVoice(null);
                                }}
                            >{tab}</span>
                        ))}
                    </div>
                    <div className="section-content">
                        {sections[activeTab]}
                    </div>
                </section>
            </div>
        </div>
    )
};


export default VideoCreation;