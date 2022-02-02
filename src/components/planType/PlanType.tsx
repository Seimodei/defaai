import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Helpers
import { PlanTypes } from "shared/shared.models";

//Styles
import './planType.scss';



interface PlanTypeProps {
    type?: PlanTypes;
    isActive?: boolean;
}



const PlanType = (props: PlanTypeProps) => {
    const features = [
        {
            value: "All core features (listed below)",
            free: true,
            pro: true,
            team: true,
            agency: true
        },
        {
            value: "Unlimited users & API requests",
            free: true,
            pro: true,
            team: true,
            agency: true
        },
        {
            value: "Community support",
            free: true,
            pro: true,
            team: true,
            agency: true
        },
        {
            value: "Some advanced features (listed below)",
            free: false,
            pro: true,
            team: false,
            agency: false
        },
        {
            value: "Most advanced features (listed below)",
            free: false,
            pro: false,
            team: true,
            agency: false
        },
        {
            value: "Email support (during business hours, 24-48 hour response time)",
            free: false,
            pro: false,
            team: true,
            agency: false
        },
        {
            value: "All advanced features (listed below)",
            free: false,
            pro: false,
            team: false,
            agency: true
        },
        {
            value: "24x7x365 phone/email support (1-2 hour response time)",
            free: false,
            pro: false,
            team: false,
            agency: true
        },
        {
            value: "Private Slack channel",
            free: false,
            pro: false,
            team: false,
            agency: true
        }
    ];

    const planPrice = {
        free: {
            price: 0
        },
        pro: {
            price: 12
        },
        team: {
            price: 23
        },
        agency: {
            price: 43
        }
    }

    return (
        <div className="plan-type">
            <div className={`feature ${props.isActive ? "active" : ""}`}>
                <div className="plan-name">{props.type}</div>
                {features.filter(f => f[props.type]).map((f, i) => (
                    <div className="point" key={i}>
                        <FontAwesomeIcon className="f-icon" icon={faCheck} />
                        <span>{f.value}</span>
                    </div>
                ))}
                <div className="plan-price">$<span>{planPrice[props.type].price}</span></div>
                <div className="plan-action">
                    {props.isActive ?
                        <span className="text">Current Plan</span> :
                        <span className="btn">Downgrade</span>
                    }
                </div>
            </div>
        </div>
    )
};


export default PlanType;