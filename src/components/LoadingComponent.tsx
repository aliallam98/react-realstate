import { PulseLoader } from "react-spinners";



const LoadingComponent = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/50 flex justify-center items-center z-10 ">
        <PulseLoader/>
    </div>
  )
}

export default LoadingComponent