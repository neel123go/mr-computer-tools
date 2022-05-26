const { useState, useEffect } = require("react")

const useAdmin = (user) => {
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);

    useEffect(() => {
        const userEmail = user?.email;
        if (userEmail) {
            fetch(`https://aqueous-plateau-30085.herokuapp.com/admin/${userEmail}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setAdmin(data);
                    setAdminLoading(false);
                });
        }
    }, [user]);

    return [admin, adminLoading];
}

export default useAdmin;