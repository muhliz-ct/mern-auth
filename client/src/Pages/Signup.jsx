import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import OAuth from '../Components/OAuth';

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [error ,setError] = useState('');
  const [loading ,setLoading] = useState(false);
  const navigate = useNavigate
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]:e.target.value});
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body:  JSON.stringify(formData),
      });
      const data = await res.json();

      if(data.success === false){
        setError(data.message);
      }
      setLoading(false);
      console.log(data);
      navigate('/sign-in')

    } catch (error) {
      setLoading(false);
      setError(true);
    }
    
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        
        <input 
        type="text" 
        placeholder='Username' 
        id='username' 
        className='bg-slate-100 rounded-lg box-border h-10' 
        onChange={handleChange}
        />

        <input 
        type="text" 
        placeholder='Email' 
        id='email' 
        className='bg-slate-100 rounded-lg box-border h-10' 
        onChange={handleChange}
        />

        <input 
        type="text" 
        placeholder='Password' 
        id='password' 
        className='bg-slate-100 rounded-lg box-border h-10' 
        onChange={handleChange}
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading....' : 'Sign up'}</button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account ?</p>
        <Link to='/sign-in'>
        <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
      <p className='text-red-600 mt-5'>{error}</p>
    </div>
  )
}
