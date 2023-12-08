
const LandingPage = () => {
  return (
    <section className="relative py-10">
      <div className="text-2xl md:text-5xl font-medium max-w-full flex flex-col w-fit mx-auto mb-4">
        <span>Opening Doors to</span>
        <div className="flex gap-8">
          <img
            src="https://gemsparkstudio.com/wp-content/uploads/2022/05/Gem-2.png"
            width={70}
          ></img>
          <span>Your Dream Home</span>
        </div>
      </div>
      <div className=" mx-auto w-[85%]">
        <img
          src="https://aianewengland.org/wp-content/uploads/2023/11/U8A1733-Pano-scaled.jpg"
          alt="landing"
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-col text-center gap-4 md:flex-row items-center justify-around mt-8 mx-12">
        <p className="max-w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
          excepturi esse veritatis doloribus officiis veniam?
        </p>
        <button className=" py-2 px-4 bg-[#223f39] text-white text-lg transition-transform hover:scale-110">Get Started</button>
      </div>
      {/* <div className="absolute h-full w-full top-0 left-0 bg-black/70 "></div> */}
      <div className="absolute h-1/2 w-full bottom-0 left-0  -z-10 bg-[#bdc3b4]"></div>
    </section>
  );
};

export default LandingPage;
