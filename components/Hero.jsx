"use client";
import { useEffect } from "react"
import ParticlesCanvas from "./ParticlesCanvas"

import gsap from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";

const Hero = () => {
  useEffect(() => {
    gsap.registerPlugin(CSSRulePlugin);

    const content = CSSRulePlugin.getRule('.content::before');
    const h1 = document.querySelector('h1');
    const p = document.querySelector('p');
    const timeline = gsap.timeline();

    timeline.to(content, { delay: .5, duration: 4, cssRule: { scaleX: 1 } });
    timeline.to(h1, {duration: 2, clipPath: 'polygon(0 0, 100% 0, 100% 100% ,0 100%)', y: '30px'}, '-=3');
    timeline.to(p, {duration: 4, clipPath: 'polygon(0 0, 100% 0, 100% 100% ,0 100%)', y: '30px'}, '-=2');
  }, []);

  return (
    <div className="w-full h-full">
      <div className="relative z-[1] w-full h-full flex items-center justify-center">
        <div className="content flex flex-col md:flex-row items-center md:items-start">
          <h1 className="sm:text-[3.5rem] text-[2rem] md:w-[50%] w-[80%] leading-[97%] md:text-right text-center font-[700]">
            The Next<br />Dimensions
          </h1>
          <p className="sm:text-[1.3rem] text-[1rem] md:w-[40%] w-[80%] md:text-left text-center">
            Journey into the next dimension with this crazy particle effect.
          </p>
        </div>
      </div>

      <ParticlesCanvas />
    </div>
  )
}

export default Hero