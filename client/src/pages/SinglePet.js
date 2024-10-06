import React from 'react';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Basic Swiper styles
import 'swiper/css/navigation'; // Navigation buttons
import 'swiper/css/pagination'; // Pagination dots
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';

// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules';

import './SinglePet.css'


import axios from 'axios';

const SinglePet = () => {
    const {id}=useParams()
    const [singlePet,setSinglePet]=useState({})
    const [imagesArr,setImagesArr]=useState([])

    useEffect(()=>{
      const token=localStorage.getItem("token");
      const url=`https://petlink.onrender.com/pets/${id}`;
      axios.get(url, {
        headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' }
    })
        .then((res)=>{
            setSinglePet(res.data);
            setImagesArr(res.data.images)
        })
        .catch((err)=>{
            console.log(err+'while getting single pet');
            
        })
    },[id])
  return (
    <div className='single-pet'>
        <div className='pet-div'>
             <div className='left'>
              <Swiper style={{ width: '80%', margin: '0 auto' }}
                  modules={[Navigation, Pagination]} // Add the modules you want to use
                  navigation // Enables navigation buttons (arrows)
                  pagination={{ clickable: true }} // Enables pagination dots
                  loop={false} // Enable loop mode
                  spaceBetween={30} // Space between slides
                  slidesPerView={1} >
                  {imagesArr.map((single, index) => (
                    <SwiperSlide key={index}>
                        <img src={single} alt={`Slide ${index}`} style={{ width: '100%', height: '400px' }} />
                    </SwiperSlide>
                  ))}
            </Swiper>
             </div>
             <div className='right'>
                <p className='right-p'><b>Name: </b>{singlePet.name}</p>
                <p className='right-p'><b>Type: </b>{singlePet.type}</p>
                <p className='right-p'><b>Age: </b>{singlePet.age} Years</p>
                <p className='right-p'><b>Breed: </b>{singlePet.breed}</p>
                <p className='right-p'><b>Location: </b>{singlePet.location}</p>
                {singlePet.status=='For Sale'&&<p className='right-p'><b>Price: </b>{singlePet.price}</p>}
                 
                <AwesomeButton type="primary" className='aws-btn' >{singlePet.status=='For Sale'?'BUY NOW':'ADOPT NOW'}</AwesomeButton>
             </div>
        </div>
    </div>
  )
}

export default SinglePet;