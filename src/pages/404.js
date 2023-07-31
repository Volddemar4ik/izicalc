import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate()

    const goBack = () => navigate(-1)

    return (
        <div>
            not found. Go to main page <Link to='/'>Main page</Link>. Go to previos page <button onClick={goBack}>previos page</button>
        </div>
    )
}