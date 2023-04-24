import React from "react";
import logo2 from "../../assets/l2.png";

const Home = () => {
  return (
    <div>
      <div className="rounded-xl pb-8 container mx-auto flex justify-center mb-10 mt-10 ">
        <img src={logo2} alt="cse" />
      </div>

      <div className="pl-5 pr-5 ">
        <div
          id="modal"
          className="rounded-xl pb-8 container mx-auto flex justify-center border-3 mb-3 shadow-2xl "
        >
          <p className="mt-4 light:text-black dark:text-white text-justify">
            <strong>UIET Kanpur</strong>,{" "}
            <b>UNIVERSITY INSTITUTE OF ENGINEERING AND TECHNOLOGY</b>, a
            department of <b>CSJM UNIVERSITY</b> has prospered by leaps and
            bounds over the years achieving great academic heights besides
            foraying into the top 50 finest engineering colleges of the country.
            Having been taught by one of the best faculties of the region, the
            students of UIET Kanpur have been empowered and groomed to take on
            the rigorous challenges in their upcoming lives. The sincere efforts
            made by our glorious alumni in the progress of the institute has
            further strengthened its fundamentals in a short span of time. The
            atmosphere of creativity and the enterprising attitude of the
            students has promoted a spirit of innovation. The recent
            achievements of the students in myriad fields including software,
            mechanical, electronics has set a new trend in the road to
            establishing a brand name for UIET Kanpur.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
