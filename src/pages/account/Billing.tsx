//Components
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Styles
import './account.scss';



const Billing = () => {
    const tHead = [
        "Reference ID", "Date", "Amount", "Invoice"
    ];

    const tBody = [
        {
            id: "45712222f6rthswfg9981fr55",
            date: "7/12/2020",
            amount: "$28"
        },
        {
            id: "45712222f6rthswfg9981fr55",
            date: "7/12/2020",
            amount: "$36"
        },
        {
            id: "45712222f6rthswfg9981fr55",
            date: "7/12/2020",
            amount: "$14"
        }
    ];

    return (
        <div className="billing">
            <div className="t-head">
                {tHead.map((h, i) => (
                    <span key={i}>{h}</span>
                ))}
            </div>
            <div className="t-body">
                {tBody.map((row, i) => (
                    <div className="row" key={i}>
                        {Object.keys(row).map((item, j) => (
                            <span key={j}>{row[item]}</span>
                        ))}
                        <FontAwesomeIcon icon={faFilePdf} size='lg' />
                    </div>
                ))}
            </div>
        </div>
    )
};


export default Billing;