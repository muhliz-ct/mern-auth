import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Header() {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to="/">
            <h1 className='font-bold'>My App</h1>
            </Link>
            <ul className='flex gap-4'>
                <Link to="/Home">
                <li>Home</li>
                </Link>
                <Link to="/About">
                <li>About</li>
                </Link>
                <Link to="/profile">
                <li>{currentUser ? (
                  <img src={currentUser.profilePicture} alt="Profile" className="h-7 w-7 rounded-full object-cover" />
                ) : (
                  <li>Sign in</li>
                )}</li>
                </Link>
                {currentUser?.isAdmin&&<Link to="/admin">Admin</Link>}
            </ul>
        </div>
    </div>
  )
}
