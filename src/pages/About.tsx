const AboutPage = () => {
  return (
    <section className="flex flex-col items-center justify-center  px-4 py-16 sm:px-6 lg:px-8">
      <div className="container">
        <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">
          About Us
        </h1>
        <p className="mt-4 text-xl text-gray-600 sm:text-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec
          ultricies congue leo eget malesuada. Vivamus sagittis lacus vel augue
          laoreet rutrum faucibus dolor auctor.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              vitae elit libero, a pharetra augue. Donec id elit non mi porta
              gravida at eget metus. Integer posuere erat a ante posuere. Etiam
              porta sem malesuada magna mollis euismod. Donec sed odio dui.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Our Values</h2>
            <ul className="list-disc text-gray-600">
              <li>Integrity</li>
              <li>Client Focus</li>
              <li>Expertise</li>
              <li>Innovation</li>
              <li>Collaboration</li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800">Meet Our Team</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {/* Team member cards here */}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800">Get in Touch</h2>
          <p className="text-gray-600">
            If you have any questions or would like to discuss your real estate
            needs, please don't hesitate to contact us.
          </p>
          {/* Contact form or information here */}
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
