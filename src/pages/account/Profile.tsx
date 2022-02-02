import { useState, useEffect } from "react";

//Redux
import { StateModel } from 'store/store';
import { useSelector } from 'react-redux';

//Components
import Input from "components/input/Input";
import Button from 'components/button/Button';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Styles
import './account.scss';
import Pic from 'assets/pic.jpeg';



const Profile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const user = useSelector((state: StateModel) => state.authState.user);



    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
        }
    }, [user]);

    return (
        <div className="profile">
            <div className="profile-image">
                <div className="image"><img src={Pic} alt="User" /></div>
                <div className="icon"><FontAwesomeIcon icon={faPen} /></div>
            </div>

            <div className="user-info">
                <div className="info-row">
                    <Input 
                        label="First Name"
                        value={firstName}
                        onChange={(val) => setFirstName(val)}
                    />
                    <Input 
                        label="Last Name"
                        value={lastName}
                        onChange={(val) => setLastName(val)}
                    />
                </div>
                <div className="info-row">
                    <Input 
                        label="Email"
                        value={email}
                        onChange={(val) => setEmail(val)}
                    />
                </div>
                <div className="info-row">
                    <Button 
                        text="Save Changes"
                    />
                </div>
            </div>
            
        </div>
    )
};


export default Profile;