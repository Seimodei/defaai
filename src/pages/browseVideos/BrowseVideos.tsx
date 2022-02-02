import { Link } from 'react-router-dom';

//Component
import Button from 'components/button/Button';
import SIngleVideo from './SingleVideo';

//Styles
import './browseVideos.scss';
import { AppLinks } from 'shared/shared.models';




const BrowseVideos = () => {
    return (
        <div className="browse-videos">
            <div className="browse-videos-header">
                <h1>Saved Videos</h1>
                <div className="actions">
                    <Link to={AppLinks.VideoCreation}>
                        <Button 
                            text='create new'
                        />
                    </Link>
                </div>
            </div>

            <div className="all-videos">
                <SIngleVideo />
            </div>
        </div>
    )
};


export default BrowseVideos;