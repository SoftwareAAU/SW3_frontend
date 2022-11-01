import Axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function login() {
        console.log(username, password);
        Axios.post("http://130.225.39.66:8080/login", {
            username: username,
            password: password
        }).then((res) => {
            
            const {status, token} = res.data;

            if(status == true) {
                Cookies.set('token', token);
                window.location.href = "/";
                return;
            }

            alert("Wrong username or password");
            
        });
    };

    //handle change for username
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    
    //handle change for password
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return ( 
        <div>
            <h1>Not logged in Niggers</h1>
            
            <input type="text" placeholder="Username" onChange={handleUsernameChange} />
            <input type="text" placeholder="Password" onChange={handlePasswordChange} />

            <button onClick={login}>Login</button>
        </div>
     );
}
 
export default Login;