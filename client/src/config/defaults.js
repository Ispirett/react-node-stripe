const host = import.meta.env.VITE_HOST || "http://localhost:4100"

const handleUpdateUser = (response, msg = "payment method added") => {
    if(response.status === 200){
        alert(msg);
    
        //* save updated user in local storage
        const updateUser = response.data.user 
        console.log("updateUser", updateUser);
        window.localStorage.removeItem('user');
        window.localStorage.setItem('user', JSON.stringify(updateUser));
        window.location.reload();
     }
}


export {host, handleUpdateUser};