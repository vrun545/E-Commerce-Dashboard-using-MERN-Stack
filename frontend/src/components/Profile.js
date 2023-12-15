import React, { useEffect, useState } from "react";

const Profile = () => {
    
    const [user, setUser] = useState([]);

    useEffect(() => {
        getUserDetails();
    }, [])

    // Getting User Details from Browser's localStrorage
    const getUserDetails = () => {
        let result = localStorage.getItem("user");
        result = JSON.parse(result);
        setUser(result);
    }

    return (
        <div className="card">
            <h1>User Details</h1>
            <p className="detail">
                <strong>Name:</strong> &nbsp; {user.name}
            </p>
            <p className="detail">
                <strong>Email ID:</strong> &nbsp; {user.email}
            </p>
        </div>
    )
}

export default Profile;