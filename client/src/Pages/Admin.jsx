import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import {useNavigate} from "react-router-dom"

const Admin = () => {
    const [data , setData] = useState([]);
    const navigete=useNavigate()

    const dataHandler = async()=>{
       const {data}= await axios.get('/api/auth/admin');
      setData(data.map(e=>({...e,edting:false})))
    }

    useEffect(()=>{
        dataHandler()
    },[])

    const handleDeleteAccount = async(id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                await axios.delete(`/api/auth/userDelete/${id}`);
                dataHandler()
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
       
    }
  return (
 

<div className="relative overflow-x-auto p-10">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                     name
                </th>
                <th scope="col" className="px-6 py-3">
                    email
                </th>
                <th scope="col" className="px-6 py-3">
                    profile image
                </th>
                <th scope="col" className="px-6 py-3">
                    status
                </th>
            </tr>
        </thead>
        <tbody>
        {data.map((e)=>{
            return (
                !e?.isAdmin&&(
                    <tr key={e._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {e.username}
                    </th>
                    <td className="px-6 py-4">
                        {e.email}
                    </td>
                    <td className="px-6 py-4">
                        <div className="w-[2rem] h-[2rem] rounded-full overflow-hidden">
                            <img className='w-full h-full object-cover' src={e.profilePicture} alt="" />
                        </div>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                        <button onClick={()=>{navigete(`/user/${e._id}`)}} className='bg-green-600  p-2 text-white rounded-md active:scale-75 transition-all ease-in duration-[.3]'>Edit</button>
                        <button onClick={()=>handleDeleteAccount(e._id)} className='bg-red-600  p-2 text-white rounded-md active:scale-75 transition-all ease-in duration-[.3]'>Delete</button>
                    </td>
                </tr>
              
                )
            )
        })}
        </tbody>
    </table>
    
</div>

  )
}

export default Admin
