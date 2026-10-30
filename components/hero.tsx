import { Star } from "./star";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="hero-composition page-container">
      <div className="hero-title-wrap">
        <h1 id="hero-heading" className="hero-title"><span>Hi. I’m Yousuf.</span><span>An AI Engineer.</span></h1>
        <Star className="hero-spark hero-spark-right" />
        <Star className="hero-spark hero-spark-left" />
      </div>
      <p className="hero-description">I build reliable software, intelligent applications, and thoughtful digital experiences.</p>
      <div className="hero-actions"><a href="#work" className="button">Explore Work <span aria-hidden="true">↗</span></a><a href="#contact" className="button button-outline">Get in Touch <span aria-hidden="true">↗</span></a></div>
    </section>
  );
}
