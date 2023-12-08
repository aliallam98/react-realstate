import { LiaLongArrowAltRightSolid } from "react-icons/lia";

const Section = () => {
  return (
    <section className="h-screen relative py-10">
      <div className="container flex p-8 gap-4 md:gap-8">
        <div className="w-[60%] flex flex-col justify-between">
          <div className="space-y-4 mb-4">
            <h3 className="text-3xl font-medium">Explore From Anywhere Anytime</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              impedit dignissimos soluta cupiditate quasi suscipit et nostrum,
              quam rem quae dolores fuga qui alias ut!{" "}
            </p>
            <button className="flex items-center gap-2 border-b-2 border-[#223f39] py-2 px-4 hover:scale-110 transition-transform">
              <span>See More</span>
              <LiaLongArrowAltRightSolid size={20}/>
            </button>
          </div>
          <img
          className=""
            src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1018&h=584"
            alt=""
          />
        </div>
        <div className="w-[35%]">
          <img
            className="h-[600px] object-contain mx-auto"
            src="https://get.pxhere.com/photo/house-property-home-building-architecture-real-estate-tree-residential-area-cottage-rural-area-sky-estate-facade-grass-farmhouse-window-historic-house-villa-roof-yard-landscape-plant-siding-lawn-mansion-1521967.jpg"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default Section;
