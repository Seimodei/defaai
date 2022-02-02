import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

//Styles
import './browseVideos.scss';
import V2 from 'assets/v2.jpeg';



const SIngleVideo = () => {
    const tags = ["Email", "Marketing", "Greeting"];

    return (
        <div className="single-video">
            <div className="top">
                <img src={V2} alt="Thumbnail" />
                <FontAwesomeIcon icon={faEllipsisH} className='more-icon' />
            </div>
            <span className="title">Saying Hi To Users!</span>
            <div className="tags">
                {tags.map((tag, i) => (
                    <span className="tag" key={i}>{tag}</span>
                ))}
            </div>
        </div>
    )
};


export default SIngleVideo;