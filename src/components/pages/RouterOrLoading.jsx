import WebAppRouter from "../../WebAppRouter";

import {useState, useEffect} from "react";
import Loading from "./Loading";


const RouterOrLoading = () => {



    useEffect(() => {
        setTimeout(() => {
            setShowRouter(true);
        }, 500);
    }, []);

    const [showRouter, setShowRouter] = useState(false);

    return ( <div>
        {showRouter ? <WebAppRouter /> : <Loading/>}

    </div> );
}
 
export default RouterOrLoading