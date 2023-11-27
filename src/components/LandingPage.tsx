const LandingPage = () => {
  return (
    <section
      className="relative h-[92.9vh]
      bg-[url('https://wallpapers.com/images/hd/modern-home-lights-jt9r232cm7pv44qw.webp')]
      bg-cover  bg-no-repeat bg-center "
    >
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 text-white text-center space-y-4">
        <h2 className="text-4xl font-medium ">Heading</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis,
          perferendis.
        </p>
        <button className="py-2 px-6 border border-neutral-500 hover:scale-105 transition-transform">
          More ..
        </button>
      </div>
      <div className="absolute h-full w-full top-0 left-0 bg-black/70 "></div>
    </section>
  );
};

export default LandingPage;
