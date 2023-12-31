import {BeatLoader} from 'react-spinners'
import{ ChangeEvent, SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {signInStart,signInSuccess,signInFailure} from '../redux/user/userSlice'
import {Navigate } from "react-router-dom";



function Register() {
  const [userData,setUserData] = useState({
    userName:'',
    email:'',
    password:'',
  })  
  const {error,loading,currentUser} = useSelector((state: RootState) => state.user)
  const dispatch  = useDispatch()

  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> {
    const {name,value} = e.target
    setUserData({...userData,[name]:value})    
  }

  const handleOnSubmit = async(e:SyntheticEvent)=>{
    e.preventDefault()
    dispatch(signInStart())
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res : any = await fetch('http://localhost:5000/api/auth/signup',{
      method:"POST",
      body:JSON.stringify(userData),
      headers:{
        "Content-Type":"application/json",
      }
    })
    
    const data= await res.json
    if(res.status !== 201){
      return dispatch(signInFailure(data.message))
    }
     dispatch(signInSuccess(data))
  }

  return (
    <>
    {currentUser ?(
      <Navigate to={"/"}/>
    ) : (
      <div className="h-screen flex justify-center p-10 ">
      <form className="flex flex-col w-[400px] shadow-lg p-10 h-fit mt-20 space-y-4"
      onSubmit={handleOnSubmit}
      >
        <p className="text-center font-medium mb-4">Sign up to continue</p>
        {error && (<p className="text-center font-medium mb-4 text-red-400">{error}</p>)}
        <input
          className="p-2 border border-gray-400 outline-none disabled:bg-transparent/10"
          type="text"
          name="userName"
          placeholder="Enter Your username"
          onChange={onChangeHandler}
          disabled = {loading}
        />
        <input
          className="p-2 border border-gray-400 outline-none disabled:bg-transparent/10"
          type="text"
          name="email"
          placeholder="Enter Your Email"
          onChange={onChangeHandler}
          disabled = {loading}
        />
        <input
          className="p-2 border border-gray-400 outline-none disabled:bg-transparent/10"
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChangeHandler}
          disabled = {loading}
        />
        <p className="text-xs my-4">
          By signing up, I accept the Atlassian Cloud Terms of Service and
          acknowledge the Privacy Policy.
        </p>
        <button className="p-2 border border-neutral-200 shadow-md" onClick={handleOnSubmit}
        disabled = {loading}
        >{loading ? <BeatLoader size={10} margin={1}/>:"Sign Up "}</button>
        <span className="text-center text-sm mt-2">OR</span>

        <button className="flex items-center justify-center p-2 shadow-md font-medium text-sm mb-4 border border-neutral-200
        "
        disabled={loading}
        >
          {/* <Image src={''} alt="Google Icon" width={16} height={16} /> */}
          <span className="w-11/12">Continue with Google</span>
        </button>


      </form>
    </div>
    )}
    </>
  );
}

export default Register;
