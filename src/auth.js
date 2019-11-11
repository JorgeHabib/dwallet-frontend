const isAuthenticated = () => {
    const token = localStorage.getItem('dwalletToken');
    
    if (token !== undefined) {
        return true;
    }else{
        return false;
    }
};

export default isAuthenticated;