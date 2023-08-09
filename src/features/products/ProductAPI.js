import axios from "../../AXIOS/axios.config";


//Simple method to fetch data (No axios)
export const fetchProducts = async () => {
    const res = await fetch('http://localhost:5000/products');
    const data = await res.json();
    return data
}


//fetching data using axios
// export const fetchProducts = async () => {
//     const data = await axios.get('/products');
//     console.log("Axios data:", data.data);
//     return data.data
// }


//post product data using axios
export const postProduct = async (product) => {
    await axios.post('/addProduct', product)
}

//delete product data using axios
export const deleteProduct = async (id) => {
    await axios.delete(`/product/${id}`)
}



//get a specific product for update using axios
export const getSpecificProduct = async (id) => {
    const response = await axios.get(`/allProducts/product/${id}`);

     //axios use korle amra response resolve er por amra response er moddhe data er moddhe jei object or array ta fetch korchi sheita pai. tai return response.data likha holo
    return response.data
}



//update a specific product using axios
export const updateProduct = async (product) => {
    const response = await axios.put(`/updateProduct/${product.id}`, product);
    
    //axios use korle amra response resolve er por amra response er moddhe data er moddhe jei object or array ta fetch korchi sheita pai. tai return response.data likha holo

    return response.data;
}