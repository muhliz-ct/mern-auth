import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"
import {getStorage , getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {app} from '../Firebase';
import { useDispatch } from "react-redux";
import { updateUserStart , updateUserSuccess , updateUserFailure, deleteUserStart, deleteUserFailure, deleteUserSuccess, signOut } from "../redux/user/userSlice";
export default function Profile() {
  const fileRef = useRef();
  const dispatch = useDispatch();
  const [image ,setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({}); 
  const [updateSuccess, setUpdateSuccess] = useState(false);
  // console.log(formData);
  const {currentUser , loading , error} = useSelector((state) => state.user);
  useEffect(() => {
    if(image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
      },
    
    (error)=>{
      setImageError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>setFormData({...formData , profilePicture:downloadURL })
      );
    }
  );
};

const handleChange = (e) => {
  setFormData({...formData, [e.target.id]: e.target.value});
}

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    dispatch(updateUserStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    });
    console.log(res);
    const data = await res.json();
    if(data.success === false) {
      console.log('working if');
      dispatch(updateUserFailure(data));
      return;
    }
    // console.log(data);
    dispatch(updateUserSuccess(data));
    setUpdateSuccess(true);
    // console.log(currentUser);
  } catch (error) {
    dispatch(updateUserFailure(error));
  }
}


const handleDeleteAccount = async () =>{
  try {
    dispatch(deleteUserStart)
    const res = await fetch(`/api/user/delete/${currentUser._id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if(data.success === false){
      dispatch(deleteUserFailure(data))
      return
    }
    dispatch(deleteUserSuccess(data))
  } catch (error) {
    dispatch(deleteUserFailure(error))
  }
}


const handleSignOut =async () => {
  try {
    await fetch('/api/auth/signout');
    dispatch(signOut())
  } catch (error) {
    console.log(error);
  }
}

  // console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7 '>Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e)=>setImage(e.target.files[0])} />
          <img src={formData.profilePicture || currentUser.profilePicture} alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover" onClick={() => fileRef.current.click()} />
          <p className="text-sm self-center">{imageError ? (
            <span className="text-red-600">Error uploading image</span>) : imagePercentage > 0 && 
            imagePercentage < 100 ? (
              <span className="text-slate-700">{`Uploading: ${imagePercentage} '%'`}</span> ): imagePercentage === 100 ? (
                <span className="text-green-500">Image  uploaded successfully</span>) : ''
              
            }</p>
          <input defaultValue={currentUser.username} type="text" id="username"
          placeholder="Username" className="bg-slate-100 roundeld-lg p-3" onChange={handleChange}/>
          <input defaultValue={currentUser.email} type="email" id="email"
          placeholder="Email" className="bg-slate-100 roundeld-lg p-3" onChange={handleChange}/>
          <input type="password" id="password"
          placeholder="" className="bg-slate-100 roundeld-lg p-3" onChange={handleChange}/>

          <button type="submit" className="bg-slate-700 text-white p-3 rounded-lg uppercase active:scale-95 transition-all ease-in duration-75 hover:opacity-95 disabled:opacity-80">{loading ? 'Loading...' : 'Update'}</button>
          
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteAccount} className="text-red-600 cursor-pointer">Delete account</span>
        <span onClick={handleSignOut} className="text-red-600 cursor-pointer">Sign Out </span>
      </div>
      <p className="text-red-600 mt-5">{error && 'something went wrong!'}</p>
      <p className="text-green-600 mt-5">{updateSuccess && 'User is updated successfully'}</p>
    </div>
  )
}
