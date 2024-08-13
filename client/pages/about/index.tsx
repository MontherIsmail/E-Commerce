import React from "react";
import { Footer, Navbar } from "../../components";

const About = () => {
  return (
    <>
      <Navbar />
      <div
        className="lg:p-20 p-3 flex justify-center items-center flex-col"
        style={{ marginTop: "70px" }}
      >
        <h3 className="text-5xl	text-center p-10">About</h3>

        <p className="text-center p-5 pb-5 text-gray-900 font-bold lg:w-1/2">
          Proin eu ante vel mauris molestie dignissim non eget nunc. Integer ac
          massa orci. Suspendisse vulputate semper nunc eget rhoncus.
        </p>
        <p className="text-center text-gray-400 lg:w-1/2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu ante
          vel mauris molestie dignissim non eget nunc. Integer ac massa orci.
          Suspendisse vulputate semper nunc eget rhoncus. Ut sit amet porta sem,
          interdum tincidunt libero. Nulla vel quam lobortis, varius est
          scelerisque, dapibus nisl.
        </p>
      </div>
      <div className="for-tap-responsive"></div>
      <Footer />
      <style jsx>{`
        @media (min-width: 768px) and (max-width: 1180px) {
          .for-tap-responsive {
            height: 250px;
          }
        }
      `}</style>
    </>
  );
};

export default About;
