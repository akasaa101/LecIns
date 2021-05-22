import axios from 'axios';
import { setAuthorizationToken } from '../helpers/setAuthorizationToken';

const login = (email, password) => {
    return axios.post("http://localhost:3000/user/login", { email, password })
        .then(user => {
            //eğer kullanıcı bulunursa (user.data.status = true) 
            if (user.data.message === 'Auth successful') {
                const { token } = user.data;
                localStorage.setItem("jwtToken", token);
                setAuthorizationToken(token);
            }
            return user.data;
        })
        .catch(err => console.log(err));
}

const logout = () => {
    localStorage.removeItem("jwtToken");
    setAuthorizationToken(false);
}

export default { login, logout };