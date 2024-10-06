import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Profile.css"
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userid,setId]=useState();
  const [allPets,setAllPets]=useState([]);
  const [noPets,setNoPets]=useState(true);
  const [editUsername,setEditUsername]=useState(false);
  const [editPass,setEditPass]=useState(false);
  const [newUsername,setNewUsername]=useState('');
  const [oldPass,setOldPass]=useState('');
  const [newPass,setNewPass]=useState('');


  const navigate = useNavigate();
  const getDetails = async () => {
    const token = JSON.parse(localStorage.getItem('token')); 
    
    if (!token) {
      console.error('No token found');
      navigate('/login'); // Redirect to login if token is missing
      return;
    }

    try {
      const response = await axios.get(
        'http://localhost:5000/users/current',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

        const { username, email,id } = response.data.user.user;
        
        setId(id);
        setUsername(username);
        setEmail(email);

    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.error('Unauthorized access - Token may be invalid');
         // Redirect to login on unauthorized access
      } else {
        console.error('Error fetching details:', err);
      }
    }
  };


  const upadteChanges=async ()=>{
    const res = await axios.put('http://localhost:5000/users/update',
      {
        "oldUsername":username,
          newUsername,
          oldPass,
          newPass
      }
    )
    if(res.status==401){
      console.log("cannot update");
    }
    else{
      alert("updated successfull");
      setEditPass(false);
      setEditUsername(false);
    }
  }

  const getPets = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pets/user/${userid}`);
      console.log(res.data);
      if (res.data.length === 0) {
        setNoPets(true);
      } else {
        setNoPets(false);
        setAllPets(res.data);
      }
    } catch (err) {
      console.error('Error fetching pets:', err);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    if (userid) { 
      getPets();
    }
  }, [userid]);

  const usernameFunc=()=>{
    setEditUsername(true);
  }
  const passFunc=()=>{
    setEditPass(true);
  }

  return (
<div className='bg-[rgba(237,232,208,.5)] h-screen m-0 flex flex-col items-center'>

<div class=" shadow-md border-2 rounded-lg w-5/6   mx-20 my-5">
    <h1 className='text-xl pt-10 mb-10'>{username}'s Profile</h1>
    <div className='flex md:flex-row justify-evenly px-20 pb-20 items-evenly sm:flex-col sm:gap-10 '>
    <div class="flex items-center flex-col  mb-4">
      <img src="profile-pic-url" alt="" class="w-32 mb-4 h-32 rounded-full shadow-lg object-cover" />
      <button class="text-sm  text-[#d99462] font-medium hover:underline">Edit Profile Picture</button>
    </div>
    <div className='flex flex-col items-center justify-center'>
    <div class="mb-4 flex items-center gap-2">
      <label for="username" class="text-m font-medium text-gray-700">Username</label>
      
      { editUsername && <input
        type="text"
        id="username"
        class="mt-1 p-2 border-gray-300 border-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        placeholder="Your Username"
        onChange={(e)=>{setNewUsername(e.target.value)}}
      />}
      <FaEdit className='text-2xl text-[#d99462]' onClick={usernameFunc} />
    </div>
    <div class="mb-6 flex gap-2 items-center">
      <label for="password" class="block text-m font-medium text-gray-700">Password</label>
      {editPass && <div><input
        type="password"
        id="password"
        class="border-2 p-2 mt-1 block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        placeholder="Enter Old Password"
        onChange={(e)=>{setOldPass(e.target.value)}}
      />
        <input type='text' placeholder='Enter new PassWord'
          className="border-2 p-2 mt-1 block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          onChange={(e)=>{setNewPass(e.target.value)}}
        />
      </div>
      }
      <FaEdit className='text-2xl text-[#d99462]' onClick={passFunc} />
    </div>
    <div class="text-center">
      <button onClick={upadteChanges}
        class="w-full bg-[#d99462] text-white p-3 rounded-md shadow-md hover:bg-[#c57841] focus:outline-none">
        Save Changes
      </button>
    </div>
    </div>
    </div>
  </div>
    <div>
        <h1 className="text-2xl">Your Listings</h1>
        <div className='petList shadow-md border-2 w-5/6 rounded-md mx-20 my-10'>
        {allPets.map((single,index)=>{
            return(
                <div key={index} className='singlePet-card'>
                    <div className='img-div'><img src={single.images[0]} alt={'single'+index}/></div>
                    
                    <div className='details'>
                        <p className='status'>{single.status}</p>
                        <h3>{single.location}</h3>
                        <p>{single.description.slice(0,60)}</p>
                    </div>
                </div>
            )
        })}  
    </div>
    </div>
</div>
  );
};

export default Profile;
