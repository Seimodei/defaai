import { useState } from 'react';

//Components
import Input from 'components/input/Input';
import Button from 'components/button/Button';

//Styles
import './videoPreview.scss';





interface VideoPreviewProps {
    name?: string;
    thumbnail?: string;
};


const VideoPreview = (props: VideoPreviewProps) => {
    const [script, setScript] = useState("");

    return (
        <div className="video-preview">
            <div className="thumbnail-group">
                <img src={props.thumbnail} alt="Chosen Video" />
                <div className="btn-wrap">
                    <span className="preview-button">Preview</span>
                </div>
            </div>
            <div className="script-group">
                <div className="input-wrapper">
                    <Input 
                        textArea
                        width="750px"
                        rows={4}
                        value={script}
                        placeholder='Type or paste your videoscript here. You can also request a translation of an English script to any of 27 other languages'
                        onChange={(val) => setScript(val)}
                    />
                </div>
                <div className="bottom">
                    <Button 
                        text='Listen'
                        disabled
                    />
                    <span className="count">{script.length} char</span>
                </div>
            </div>
        </div>
    )
};


export default VideoPreview;