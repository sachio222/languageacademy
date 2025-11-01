import '../styles/Landing.css'

function Testimonials() {
  return (
    <section className="landing-section testimonials-section">
      <div className="landing-container">
        <div className="testimonials-row">
          <div className="testimonial-card">
            <p className="testimonial-text">
              Other apps give the illusion of learning through dopamine kicks. I like that it's actually challenging, because I really want to learn the language, not earn points.
            </p>
            <div className="testimonial-rating">
              <span className="stars">★★★★★</span>
            </div>
            <div className="testimonial-name">— Charles</div>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">
              I tried learning French multiple times and kept giving up. Without structure, it felt hopeless I was memorizing random words with no clear path forward. This finally gives me a roadmap.
            </p>
            <div className="testimonial-rating">
              <span className="stars">★★★★★</span>
            </div>
            <div className="testimonial-name">— Sarah J.</div>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">
              I like that I get to use the language from the first lesson, and build on it, not just focus on impossible memorization.
            </p>
            <div className="testimonial-rating">
              <span className="stars">★★★★★</span>
            </div>
            <div className="testimonial-name">— Khazan</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

