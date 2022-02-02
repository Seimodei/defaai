//Components
import PlanType from "components/planType/PlanType";

//Helpers
import { PlanTypes } from "shared/shared.models";

//Styles
import './account.scss';



const Plan = () => {
    const allPlans = [
        {
            name: PlanTypes.Free,
            isActive: false
        },
        {
            name: PlanTypes.Pro,
            isActive: false
        },
        {
            name: PlanTypes.Team,
            isActive: true
        },
        {
            name: PlanTypes.Agency,
            isActive: false
        }
    ];

    return (
        <div className="plan">
            {allPlans.map((plan, i) => (
                <PlanType 
                    key={i}
                    type={plan.name} 
                    isActive={plan.isActive}
                />  
            ))}          
        </div>
    )
};


export default Plan;