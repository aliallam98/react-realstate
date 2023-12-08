const Newsletter = () => {
  return (
    <section className="h-[600px] sm:p-20">
      <div className="container  relative  h-full text-center bg-[url(https://kronosceramiche.com/src/uploads/sites/3/2021/08/hotel-hilton.jpg)] bg-no-repeat bg-cover">
        <div className="absolute top-0 left-0 h-full w-full bg-black/60 "></div>
        <div className="absolute top-[40%] text-center left-1/2 -translate-x-1/2  -translate-y-1/2 w-full p-4">
          <h3 className="text-white text-2xl md:text-4xl mb-10 font-medium">
            Subscribe To Our <br />
            Newsletter
          </h3>
          <div className="flex flex-col lg:flex-row justify-center px-4 md:px-20 gap-4 lg:gap-0">
            <input
              type="text"
              className="lg:w-[40%] py-2 px-4 text-black focus:outline-none border border-neutral-200"
            />
            <button className="py-2 px-6 bg-black text-white">Submit</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
