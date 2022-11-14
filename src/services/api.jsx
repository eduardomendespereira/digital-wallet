import axios from 'axios'

const api = axios.create({
    baseURL: 'https://economia.awesomeapi.com.br/json/all'
})

export const getCoins = () => {
    return axios.get('https://economia.awesomeapi.com.br/json/all')
}

export default api;