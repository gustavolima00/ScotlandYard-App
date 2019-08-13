export const API_URL = 'http://scotland.herokuapp.com'
//export const API_URL = 'http://192.168.0.108:8001'

export default signIn = async (data, func, err) => {
    this.setState({ spinner: true });
    const login_path = `${API_URL}/auth/registration/`;
    var self = this;
    axios.post(login_path ,data)
    .then (function (response) {
        self.setState({ spinner: false });
        console.log('response.data', response.data)
        console.log('response.status', response.status)
        if(response.status>= 200 && response.status<300){
            func(response.data)
        }
    })
    .catch(function (error) {
        self.setState({ spinner: false });
        console.log(error)
        err(error)
    })
}