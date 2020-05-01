import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://build-my-burger-bea8c.firebaseio.com/'
});

export default instance;