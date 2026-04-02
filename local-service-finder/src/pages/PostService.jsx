// Instruction: Build a form for providers to post a new service.
// Instruction: Fields: title, category, location, price, description, contact.
// Instruction: Add simple client-side validation and a submit button (UI only).

import {useState} from "react";

export default function PostService() {
    const [formData,setFormData]=useState({
        title:"",
        category:"",
        location:"",
        price:"",
        description:"",
        contact:""
    });

    const [errors,setErrors]= useState({});

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
  e.preventDefault();

  const newErrors = {};
  if (!formData.title) newErrors.title = "Title is required";
  if (!formData.category) newErrors.category = "Category is required";
  if (!formData.location) newErrors.location = "Location is required";
  if (!formData.price) newErrors.price = "Price is required";
  if (!formData.description) newErrors.description = "Description is required";
  if (!formData.contact) newErrors.contact = "Contact info is required";

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
  onAddService(formData);   
  alert("Service submitted!");
  setFormData({ title:"", category:"", location:"", price:"", description:"", contact:"" });
}

    alert("Service submitted!");
    setFormData({
      title: "",
      category: "",
      location: "",
      price: "",
      description: "",
      contact: ""
    });
  }
};

    return (
        <main className="post-service">
                 <h2>Post a New Service</h2>
                <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input name="title" value={formData.title} onChange={handleChange} />
                {errors.title && <span className="error">{errors.title}</span>}
            </label>
            <label>
            Category:
                <input name="category" value={formData.category} onChange={handleChange} />
                {errors.category && <span className="error">{errors.category}</span>}
            </label>

            <label>
            Location:
                <input name="location" value={formData.location} onChange={handleChange} />
                {errors.location && <span className="error">{errors.location}</span>}
            </label>

            <label>
            Price:
                <input type="number" name="price" value={formData.price} onChange={handleChange} />
                {errors.price && <span className="error">{errors.price}</span>}
            </label>

            <label>
            Description:
                <textarea name="description" value={formData.description} onChange={handleChange} />
                {errors.description && <span className="error">{errors.description}</span>}
            </label>

            <label>
            Contact:
                <input name="contact" value={formData.contact} onChange={handleChange} />
                {errors.contact && <span className="error">{errors.contact}</span>}
            </label>

        <button type="submit">Submit Service</button>
        </form>
        </main>
    );



