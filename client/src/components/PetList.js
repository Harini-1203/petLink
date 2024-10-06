import React from 'react'
import '../components/PetList.css'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



const PetList = () => {
    const navigate=useNavigate();
    const [allPets,setAllPets]=useState([])   

useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
        console.log("No token found");
    }
    axios.get('https://petlink.onrender.com/pets', {
        headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' }
    })
    .then((res) => {
        setAllPets(res.data);
    })
    .catch((err) => {
        console.log('while get method', err.response ? err.response.data : err);
    });
}, []);


    const handlePetClick=(id)=>{
        navigate(`/pets/${id}`);
        console.log(id);
    }
  return (
    
    <div className='petList text-s'>
        {allPets.map((single,index)=>{
            return(
                <div key={index} className='singlePet-card' onClick={
                    ()=>{handlePetClick(single._id)}
                }>
                    <div className='img-div'><img src={single.images[0]} alt={'single'+index}/></div>
                    
                    <div className='details'>
                        <p className='status'>{single.status}</p>
                        <h3>{single.location}</h3>
                        {single.status=="For Sale" && <p>₹{single.price}</p>}
                    </div>
                </div>
            )
        })}  
    </div>
  )
}

export default PetList