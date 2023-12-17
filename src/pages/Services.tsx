import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

const details = [
  {
    title: "Personalized consultation",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
  },
  {
    title: "Exclusive Listings",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
  },
  {
    title: "Confidentiality And Discretion",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
  },
  {
    title: "After-Sales Support",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
  },
];

const Services = () => {
  return (
    <section className="py-10">
      <h3 className="text-center text-3xl my-2">Services Page</h3>
      <div className="container flex flex-col md:flex-row gap-10 mt-10">
        <div className="w-full md:w-[50%]">
          <Accordion allowMultiple>
            {details.map((item) => (
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      py={5}
                      className="text-2xl"
                    >
                      {item.title}
                    </Box>
                    <button
                      className="block w-10 h-10 bg-[#223f39] text-white rounded-full"
                      type="button"
                    >
                      <AccordionIcon />
                    </button>
                  </AccordionButton>
                </h2>
                <AccordionPanel py={10}>{item.text}</AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="w-full  md:w-[40%]">
          <img
            src="https://iamgeorgiana.com/wp-content/uploads/2018/09/Heritage-Trip-Alba-2.jpg"
            alt="image"
            width={400}
            className="mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
