import { useState } from 'react';

//Redux
import { actions } from 'store/store';
import { useDispatch } from 'react-redux';

//Components
import Profile from './Profile';
import Plan from './Plan';
import Billing from './Billing';

//Styles
import './account.scss';





const Account = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("Profile");


    const tabs = [
        "Profile", "My Plan", "Billing"
    ];

    const sections = {
        "Profile": <Profile />,
        "My Plan": <Plan />,
        "Billing": <Billing />
    };

    return (
        <div className="account">
            <div className="account-header">
                <h1>My Account</h1>
                <span className="sign-out" onClick={() => dispatch(actions.auth.signoutAsync())}>Logout</span>
            </div>

            <div className="account-tabs">
                {tabs.map((tab, i) => (
                    <span 
                        className={`tab ${activeTab === tab ? "active" : ""}`} 
                        key={i}
                        onClick={() => setActiveTab(tab)}
                    >{tab}</span>
                ))}
            </div>

            <section>
                {sections[activeTab]}
            </section>
        </div>
    )
};


export default Account;