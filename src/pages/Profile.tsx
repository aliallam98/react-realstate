import { useDispatch,useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { BeatLoader } from "react-spinners";
import {ChangeEvent, useEffect, useRef,useState} from 'react'
import { Link, Navigate } from "react-router-dom";
import {userUpdateStart,userUpdateSuccess,userUpdateFailure} from '../redux/user/userSlice'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase";
import { v4 as uuidv4 } from 'uuid';

interface IFormData {
  userName?:string
  email?:string
  password?:string
  profileImage?:{
    downloadURL:string
    fileName:string
  }

}

const Profile = () => {
  const dispatch = useDispatch()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser, loading,error }: any = useSelector(
    (state: RootState) => state.user
  );
    
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [formData,setFormData] = useState<IFormData>()
  const [file,setFile] = useState<File | undefined>(undefined)
  const [filePres,setFilePres] = useState<number>(0)
  const [fileUploadError,setFileUploadError] = useState<boolean>(false)
  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const onSubmitHandler = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try {
      dispatch(userUpdateStart())
    const res = await fetch(`http://localhost:5000/api/user/${currentUser.id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "authorization" : `Test${localStorage.getItem('token')}`
      },
      body:JSON.stringify(formData)
    })
    const data = await res.json()
    console.log(data);
    
    if(res.status !== 200) return dispatch(userUpdateFailure(data.message))
    dispatch(userUpdateSuccess(data.data))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      dispatch(userUpdateFailure(error.message))
    }
  }

  
// eslint-disable-next-line react-hooks/exhaustive-deps
const handleFileUpload = (file:File)=>{
  const storage = getStorage(app)
  const fileName = file.name + uuidv4()
  const storageRef = ref(storage,`Profile-Images/${fileName}`) 
  const uploadTask = uploadBytesResumable(storageRef,file)

  uploadTask.on('state_changed',
  (snapshot)=>{
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    setFilePres(Math.round(progress))
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_error)=>{ setFileUploadError(true)},
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
      setFormData({
        ...formData,
        profileImage: {downloadURL,fileName},
      })
    })
  })
  
}




useEffect(() => {
  if (file) {
    handleFileUpload(file);
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [file]);




  return currentUser ? (
    <section className="p-20">
      <h3 className="text-center text-4xl mb-6">Hello, {currentUser.name}</h3>
      <img className="w-20 h-20 rounded-full mx-auto my-4 object-contain" src={formData?.profileImage?.downloadURL || currentUser.profileImage} alt="profileImage"
      onClick={()=> fileRef?.current?.click()}
      />
      {error && <p className="text-center text-red-600">{error}</p>}
      <div className={`text-center ${fileUploadError ? "text-red-600":"text-green-600"}`}>
      {fileUploadError ? (<p>There Is Something Wrong With uploading Image</p>)
       : filePres > 0 && filePres < 100 ? (<p>{`Uploading .. ${filePres}%`}</p>)
       : filePres === 100 ? (<p>Uploaded ..</p>)
       : ""
      }
      </div>
      

      <form className="max-w-lg mx-auto space-y-4" onSubmit={onSubmitHandler}>
        <input type="file" name="profileImage" accept="image/*" ref={fileRef} hidden
          onChange={(e:ChangeEvent<HTMLInputElement>)=> setFile(e.target.files?.[0])}
        />
        <input
          className="block w-full p-2 border border-gray-400 outline-none disabled:bg-transparent/10"
          type="text"
          name="userName"
          placeholder="Enter Your username"
          defaultValue={currentUser.name}
          onChange={onChangeHandler}
          disabled={loading}
        />
        <input
          className="block w-full p-2 border border-gray-400 outline-none disabled:bg-transparent/10"
          type="text"
          name="email"
          placeholder="Enter Your Email"
          defaultValue={currentUser.email}
          disabled
          // disabled={loading}
        />
        <input
          className="block w-full p-2 border border-gray-400 outline-none disabled:bg-transparent/10"
          type="text"
          name="password"
          placeholder="password"
          onChange={onChangeHandler}
          disabled={loading}
        />

        <button
          type="submit"
          className="block py-2  max-w-md w-full mx-auto border border-neutral-200 "
          disabled={loading}
        >
          {loading ? <BeatLoader size={10} margin={1} /> : "Save"}
        </button>
      </form>
      <button type="button" className="py-2 px-4 block mx-auto mt-2"><Link to={'/my-listings'}>My Listings</Link></button>
    </section>
  ) : <Navigate to={'/login'}/>
};

export default Profile;
