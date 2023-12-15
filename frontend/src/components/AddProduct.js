import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    
    let navigate = useNavigate();

    // API Integration
    const addProduct = async () => {

        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem("user"))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
        });
        result = await result.json();
        navigate("/");
    }


    return (
        <div className="product">
            <h1>Add Product Details</h1>
            <input className="inputBox" type="text" placeholder="Enter Product Name" onChange={(e) => setName(e.target.value)} value={name} />
            {error && !name && <span className="invalid-input" >Enter Valid Name</span>}

            <input className="inputBox" type="text" placeholder="Enter Product Price" onChange={(e) => setPrice( e.target.value)} value={price} />
            {error && !price && <span className="invalid-input" >Enter Valid Price</span>}

            <input className="inputBox" type="text" placeholder="Enter Product Category" onChange={(e) => setCategory(e.target.value)} value={category} />
            {error && !category && <span className="invalid-input" >Enter Valid Category</span>}

            <input className="inputBox" type="text" placeholder="Enter Product Companmy" onChange={(e) => setCompany(e.target.value)} value={company} />
            { error && !company && <span className="invalid-input" >Enter Valid Company</span>}

            <button onClick={addProduct} className="appButton" type="button">Add Product</button>
        </div>
    )
}

export default AddProduct;