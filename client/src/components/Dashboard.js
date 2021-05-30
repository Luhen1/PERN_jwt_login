import React, {Fragment, useState, useEffect } from "react";
import {toast} from "react-toastify";

const Dashboard = ({setAuth}) => {

    const [name, setName] = useState("")

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/home/dashboard",{
            method:"GET",
            headers:{token: localStorage.token }
            });

            const parseRes = await response.json();


            setName(parseRes.user_name);

        } catch (err) {
            console.error(err.message)
        }
    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logged out successfully!");
    };


    useEffect(() => {
        getName()
    },[]) // use [] to make sure that the useEffect does 1 request, not too many 



    return ( 
        <Fragment>
            <h1>Dashbaord {name}</h1>
            <button className="btn btn-primary" onClick ={e => logout(e)}>Logout</button>
        </Fragment>
    );
};

export default Dashboard;