import React, { useState } from 'react';
import axios from 'axios';
// import { PhotoIcon } from '@heroicons/react/24/solid'

const AddPet = () => {
  const [type, setType] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [description, setDescription] = useState('');
  const [selectop, setSelectop] = useState('');
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('age', age);
    formData.append('breed', breed);
    formData.append('type', type);
    formData.append('status', selectop);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('ownerphn', phone);
  
    // Get the file input element
    const fileInput = document.getElementById('file-upload');
    
    // Loop through the selected files and append them to formData
    if (fileInput && fileInput.files.length > 0) {
      for (let i = 0; i < fileInput.files.length; i++) {
        formData.append('images', fileInput.files[i]); // Append each photo
      }
    }
  
    try {
      const token = JSON.parse(localStorage.getItem('token')); 
  
      const response = await axios.post(
        'https://petlink.onrender.com/pets',
        formData, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
  
      console.log('Pet created:', response.data); // Handle successful response
    } catch (error) {
      console.error('Error creating pet:', error.response ? error.response.data : error); // Handle error
    }
  };
  

  return (
    <div className='w-100 flex items-center flex-col bg-[rgba(237,232,208,.3)]'>
      <div className='flex flex-col  w-[80vw] rounded-[10px] text-left mx-20  pl-20 pr-10 shadow-xl '>
        <form onSubmit={handleSubmit} className='pb-0'>
          {/* Form fields */}
          <div className='form-grp'>
            <label className='test-sm font-medium leading 6 text-gray-900 py-1.5'>Pet Type:</label>
            <input type='text' 
              className='flex-1 rounded-md border-0 py-1.5 text-grey-900 shadow-sm ring-1 ring-inset ring-gray-300 '
              value={type} onChange={(e) => setType(e.target.value)} required />
          </div>

          <div className='form-grp'>
            <label className='test-sm font-medium leading 6 text-gray-900 py-1.5'>Age:</label>
            <input type='text' value={age} onChange={(e) => setAge(e.target.value)} required 
              className='flex-1 rounded-md border-0 py-1.5 text-grey-900 shadow-sm ring-1 ring-inset ring-gray-300 '
            />
          </div>

          <div className='form-grp'>
            <label className='test-sm font-medium leading 6 text-gray-900 py-1.5'>Breed:</label>
            <input 
              className='flex-1 rounded-md border-0 py-1.5 text-grey-900 shadow-sm ring-1 ring-inset ring-gray-300 '
              type='text' value={breed} onChange={(e) => setBreed(e.target.value)} required />
          </div>

          <div className='form-grp'>
            <label className='test-sm font-medium leading 6 text-gray-900 py-1.5'>Description:</label>
            <input
              className='flex-1 rounded-md border-0 py-1.5 text-grey-900 shadow-sm ring-1 ring-inset ring-gray-300 ' 
              type='text' value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>

          <div className='form-grp'>
            <label className='test-sm font-medium leading 6 text-gray-900 py-1.5'>Status: </label>
            <select className='p-10 m-5  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6' value={selectop} onChange={(e) => setSelectop(e.target.value)} required>
              <option value="">Select an option</option>
              <option value="For Adoption">For Adoption</option>
              <option value="For Sale">For Sale</option>
            </select>
          </div>

          {selectop === "For Sale" && (
            <div className='form-grp pr-5'>
              <label className='test-sm font-medium leading 6 text-gray-900 py-1.5'>Price:</label>
              <input 
                className='flex-1 rounded-md border-0 py-1.5 text-grey-900 shadow-sm ring-1 ring-inset ring-gray-300 '
                type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          )}



          <div className='form-grp'>
            <label className='test-sm font-medium leading 6 text-gray-900 py-1.5'>Location:</label>
            <input 
              className='flex-1 rounded-md border-0 py-1.5 text-grey-900 shadow-sm ring-1 ring-inset ring-gray-300 '
              type='text' value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>

          <div className='form-grp'>
            <label className='test-sm font-medium leading 6 text-gray-900 py-1.5'>Phone Number:</label>
            <input 
              className='flex-1 rounded-md border-0 py-1.5 text-grey-900 shadow-sm ring-1 ring-inset ring-gray-300 '
              type='text' placeholder='Enter 10 Digit Number' value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>

          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  {/* <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" /> */}
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-amber-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload photos</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple/>
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                </div>
              </div>
          
          <button className="px-4 mt-10 py-2 bg-amber-600 text-white text-lg backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200">
  Add pet
</button>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
