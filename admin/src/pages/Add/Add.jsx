import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {

     const [image,setImage] = useState(false)
     const [data,setData] = useState({
          name:"",
          description:"",
          price:"",
          category:"Select"
     })

     const onChangeHandler = (event) =>{
          const name = event.target.name;
          const value = event.target.value;
          setData(data=>({...data,[name]:value}))
     }

     const resizeImage = (file, width, height) => {
          return new Promise((resolve) => {
               const reader = new FileReader();
               reader.readAsDataURL(file);
               reader.onload = (event) => {
                    const img = new Image();
                    img.src = event.target.result;
                    img.onload = () => {
                         const canvas = document.createElement('canvas');
                         const ctx = canvas.getContext('2d');
                         canvas.width = width;
                         canvas.height = height;
                         ctx.drawImage(img, 0, 0, width, height);
                         canvas.toBlob((blob) => {
                              resolve(blob);
                         }, file.type);
                    };
               };
          });
     }

     const onSubmitHandler = async (event) => {
          event.preventDefault();
          const formData = new FormData();
          formData.append("name",data.name)
          formData.append("description",data.description)
          formData.append("price",Number(data.price))
          formData.append("category",data.category)

          const resizedImage = await resizeImage(image, 360, 280);
          formData.append("image", resizedImage);

          const response = await axios.post(`${url}/api/food/add`,formData)
          if(response.data.success){
               setData({
                    name:"",
                    description:"",
                    price:"",
                    category:"Select"
               })
               setImage(false)
               toast.success(response.data.message)
          }else{
               toast.error(response.data.message)
          }
     }

  return (
    <div className='add'>
     <form className='flex-col' onSubmit={onSubmitHandler}>
          <div className="add-img-upload flex-col">
               <p>Upload Image</p>
               <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
               </label>
               <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required/>
          </div>
          <div className="add-product-name flex-col">
               <p>Product Name</p>
               <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here'/>
          </div>
          <div className="add-product-description flex-col">
               <p>Product Description</p>
               <textarea onChange={onChangeHandler} value={data.description} name='description' rows="6" placeholder='Write Content Here' required></textarea>
          </div>
          <div className="add-category-price">
               <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select onChange={onChangeHandler} name="category">
                         <option value="Select">Select</option>
                         <option value="Salad">Salad</option>
                         <option value="Rolls">Rolls</option>
                         <option value="Desert">Deserts</option>
                         <option value="Sandwhich">Sandwich</option>
                         <option value="Cake">Cake</option>
                         <option value="Pure Veg">Pure Veg</option>
                         <option value="Pasta">Pasta</option>
                         <option value="Noodles">Noodles</option>
                    </select>
               </div>
               <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input onChange={onChangeHandler} value={data.price} type="text" name='price' placeholder='Enter Price here' />
               </div>
          </div>
          <button type='submit' className='add-btn'>Add</button>
     </form>
    </div>
  )
}

export default Add