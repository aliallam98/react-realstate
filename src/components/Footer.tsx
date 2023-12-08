import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";

const Footer = () => {
  const socialMediaLinks = [
    {
      icon: <FaFacebook />,
      link: "https://www.facebook.com/example",
    },
    {
      icon: <IoLogoInstagram />,
      link: "https://www.twitter.com/example",
    },
    {
      icon: <FaTwitter />,
      link: "https://www.instagram.com/example",
    },
  ];

  const renderSocialMediaLinks = () =>
    socialMediaLinks.map((link, i) => (
      <Link to={link.link} key={i} className="text-gray-700 hover:text-gray-900">
        {link.icon}
      </Link>
    ));

  return (
    <footer className="border-t border-neutral-200-200 py-8  ">
      <div className="container">
        <div className="flex  items-center justify-around mb-4 ">
          <h3 className="text-gray-800 font-bold">EcoHaven Realty</h3>
          <div className="flex gap-4">{renderSocialMediaLinks()}</div>
        </div>


        
        <div className="flex flex-wrap justify-around gap-4 ">
          <div className="w-full md:w-[24%] ">
            <h3 className="text-gray-800 font-bold">EcoHaven Realty</h3>
            <p className="text-gray-600 mt-2">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga.
            </p>
          </div>
          <div className="w-full md:w-[24%] ">
            <h3 className="text-gray-800 font-bold">Contact Info</h3>
            <ul className="text-gray-600 mt-2">
              <li>
                <i className="fas fa-phone mr-2" />
                (00) 123 456 7890
              </li>
              <li>
                <i className="fas fa-fax mr-2" />
                (1) 888 637-7260
              </li>
              <li>
                <i className="fas fa-envelope mr-2" />
                info@styleixthemes.com
              </li>
              <li>
                <i className="fas fa-map-marker-alt mr-2" />
                180 E Garvey Avenue Street, West Covina, CA 91791, U.S
              </li>
            </ul>
          </div>
          <div className="w-full md:w-[24%] ">
            <h3 className="text-gray-800 font-bold">Contact Info</h3>
            <ul className="text-gray-600 mt-2">
              <li>
                <i className="fas fa-phone mr-2" />
                (00) 123 456 7890
              </li>
              <li>
                <i className="fas fa-fax mr-2" />
                (1) 888 637-7260
              </li>
              <li>
                <i className="fas fa-envelope mr-2" />
                info@styleixthemes.com
              </li>
              <li>
                <i className="fas fa-map-marker-alt mr-2" />
                180 E Garvey Avenue Street, West Covina, CA 91791, U.S
              </li>
            </ul>
          </div>
          <div className="w-full md:w-[24%] ">
            <h3 className="text-gray-800 font-bold">Contact Info</h3>
            <ul className="text-gray-600 mt-2">
              <li>
                <i className="fas fa-phone mr-2" />
                (00) 123 456 7890
              </li>
              <li>
                <i className="fas fa-fax mr-2" />
                (1) 888 637-7260
              </li>
              <li>
                <i className="fas fa-envelope mr-2" />
                info@styleixthemes.com
              </li>
              <li>
                <i className="fas fa-map-marker-alt mr-2" />
                180 E Garvey Avenue Street, West Covina, CA 91791, U.S
              </li>
            </ul>
          </div>




        </div>
        <div className="mt-4 pt-4 text-center text-gray-600  border-t border-neutral-200-200">
          <p>
            &copy;2023 EcoHaven Realty Real Estate . All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



{/* <ul className="text-gray-600 text-right">
<li>
  <Link to="/privacy-policy">Privacy Policy</Link>
</li>
<li>
  <Link to="/terms-of-service">Terms of Service</Link>
</li>
</ul> */}