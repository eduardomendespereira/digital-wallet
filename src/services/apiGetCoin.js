import axios from "axios"

export default{
    get($coin){
        return axios.get('http://economia.awesomeapi.com.br/json/last/' + $coin + '-BRL')
    },
}