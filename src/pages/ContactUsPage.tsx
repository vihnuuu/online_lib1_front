import './ContactUsPage.css';

const ContactUsPage = () => {
    return (
        <div className="contact-page">
            <section className="hero-contact">
                <h1>Contact Us</h1>
                <p>Home / Contact Us</p>
            </section>

            <section className="contact-section">
                <div className="contact-form">
                    <h2>Send Us a Message</h2>
                    <form>
                        <input type="text" placeholder="Your Name" name="name" required />
                        <input type="email" placeholder="Your Email" name="email" required />
                        <input type="text" placeholder="Subject" name="subject" required />
                        <textarea placeholder="Your Message" name="message" required></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>

                <div className="contact-info">
                    <h2>Get In Touch</h2>
                    <p>We’re happy to answer your questions and hear your feedback. Feel free to contact us through any of the options below.</p>

                    <div className="info-block">
                        <p><strong>Call Us:</strong> +123 456 7890</p>
                        <p><strong>Email Us:</strong> vi.hnuuu@gmail.com</p>
                        <p><strong>Website:</strong> www.elib.com</p>
                        <p><strong>Address:</strong> Ukraine</p>
                    </div>

                    <div className="social-media">
                        <p>Follow Us On:</p>
                        <div className="social-icons">
                            <a href="#" aria-label="Facebook">FB</a>
                            <a href="#" aria-label="Telegram">TG</a>
                            <a href="#" aria-label="Instagram">INST</a>
                            <a href="#" aria-label="LinkedIn">LN</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUsPage;
