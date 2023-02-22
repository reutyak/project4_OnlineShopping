import "./Information.css";

function Information(): JSX.Element {
    const numProd = ()=>{
        let num = 0;
        return num

    };

    const numOrd = ()=>{
        let num = 0;
        return num

    };

    const cart = ()=>{
    };

    return (
        <div className="Information">
			<div>{numProd()} available products in our store</div>
            <div>{numOrd()} of orders in our store</div>
			<div>Notification:notification you have open cart from 23/2/23 your last purchase was on 1/2/22 </div>

        </div>
    );
}

export default Information;
