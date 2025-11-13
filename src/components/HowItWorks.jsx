import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const HowItWorks = () => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://eco-track-nu-one.vercel.app/how_it_works_steps')
      .then(data => {
        setSteps(data.data);
        setLoading(false);
      })
  }, [])

  return (
    <section className="py-12 px-6 md:px-8 xl:px-25 text-center">
      <div className="max-w-6xl mx-auto text-center mb-15">
        <h2 className="text-3xl md:text-4xl font-bold text-accent">How It Works</h2>
      </div>
      {
        loading
          ? <Loading></Loading>
          : <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            {
              steps.map((step, index) => (
                <div key={step._id} className="flex flex-col items-center md:w-1/3 px-4 mb-8 md:mb-0 group">
                  <h1 className="flex items-center justify-center w-20 h-20 rounded-full bg-primary text-white text-3xl mb-4 group-hover:animate-bounce">{index + 1}</h1>
                  <h3 className="text-primary text-2xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))
            }
          </div>
      }
    </section>
  );
};

export default HowItWorks;
