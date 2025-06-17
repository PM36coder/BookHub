import  { useState } from 'react';
import { NavLink} from 'react-router-dom';
import {useAuth} from '../store/AuthContext'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });
//* useNavigate hook 
const navigator = useNavigate()
 const {storeToken} = useAuth()

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';

    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formErrors = validate();
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    return;
  }
try {
  const response = await fetch('https://bookhub-backend.onrender.com/user/register',{
    method: 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    credentials: "include", 
    body : JSON.stringify(formData)
  })

  const data = await response.json();
if(response.ok){
  //!token save
  storeToken(data.token)
  toast.success('Registration successful')
  navigator('/login')
}

  if(!response.ok){
    toast.error(data.msg)
  }
} catch (error) {
  console.error('Registration failed:', error)
}
 
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4 py-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              id='username'
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              autoComplete='off'
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id='email'
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>


        {/* phone number*/}
            <div>
                <label className="block text-gray-700">Phone Number</label>
                <input
                type="number"
                name="phone"
                id='phone'
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-gray-500 cursor-pointer"
              >
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-600 mt-2">
            Already have an account? <NavLink to="/login" className="text-blue-500 hover:underline">Login</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};


