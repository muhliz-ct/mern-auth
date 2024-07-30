import {Link} from 'react-router-dom'

export default function Signup() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form action="" className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' id='username' className='bg-slate-100 rounded-lg box-border h-10' />
        <input type="text" placeholder='Email' id='email' className='bg-slate-100 rounded-lg box-border h-10' />
        <input type="text" placeholder='Password' id='password' className='bg-slate-100 rounded-lg box-border h-10' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account ?</p>
        <Link to='/sign-in'>
        <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}
