import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, [])


    // Function for Showing Pre-Filled Data in the Form
    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            } 
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }


    // API Integration for Update Details of Product
    const updateProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "Put",
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        navigate("/");
        console.log(result);
    }


    return (
        <div className="product">
            <h1>Update Product Details</h1>
            <input className="inputBox" type="text" placeholder="Enter Product Name" onChange={(e) => setName(e.target.value)} value={name} />
            {error && !name && <span className="invalid-input" >Enter Valid Name</span>}

            <input className="inputBox" type="text" placeholder="Enter Product Price" onChange={(e) => setPrice(e.target.value)} value={price} />
            {error && !price && <span className="invalid-input" >Enter Valid Price</span>}

            <input className="inputBox" type="text" placeholder="Enter Product Category" onChange={(e) => setCategory(e.target.value)} value={category} />
            {error && !category && <span className="invalid-input" >Enter Valid Category</span>}

            <input className="inputBox" type="text" placeholder="Enter Product Companmy" onChange={(e) => setCompany(e.target.value)} value={company} />
            {error && !company && <span className="invalid-input" >Enter Valid Company</span>}

            <button onClick={updateProduct} className="appButton" type="button">Update Product</button>
        </div>
    )
}

export default UpdateProduct;