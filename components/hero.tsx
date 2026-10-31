import { Star } from "./star";

import { HeroInterests } from "./hero-interests";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="hero-composition page-container">
      <div className="hero-title-wrap">
        <h1 id="hero-heading" className="hero-title"><span>Hi. I’m Yousuf.</span><span>An AI Engineer.</span></h1>
        <Star className="hero-spark hero-spark-right" />
        <Star className="hero-spark hero-spark-left" />
      </div>
      <HeroInterests />
      <div className="hero-actions"><a href="#work" className="button">Explore Work <span aria-hidden="true">↗</span></a><a href="/YousufAbdullahBorna_Resume.pdf" download="YousufAbdullahBorna_Resume.pdf" className="button button-outline resume-download"><span>Download Resume</span><span className="resume-download-arrow" aria-hidden="true">↓</span></a></div>
    </section>
  );
}
