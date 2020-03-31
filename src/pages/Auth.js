class Auth{
    constructor(){
        this.authenticated=false;
    }

    login(cb){
        this.authenticated=true;
        console.log('Auth login clicked')
        cb();
    }

    logout(cb){
        this.authenticated=false;
        cb();
    }

    isAuthenticated(){
        return this.authenticated;
    }
}


export default new Auth()