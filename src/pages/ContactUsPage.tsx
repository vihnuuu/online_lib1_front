import './ContactUsPage.css';
import React from "react";

const ContactUsPage = () => {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const subject = (document.getElementById("subject") as HTMLInputElement).value;
        const message = (document.getElementById("message") as HTMLTextAreaElement).value;

        const text = `
         *Нове повідомлення з сайту:*
*Ім’я:* ${name}
*Email:* ${email}
*Тема:* ${subject}
*Повідомлення:* ${message}
         `;

        const TOKEN = '8018773908:AAGgoeaA5rWo7x3QPE80q-SeaHvHcOb08mU';
        const CHAT_ID = '515781858';

        try {
            await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "Markdown" }),
            });

            alert("Повідомлення надіслано!");
        } catch (error) {
            console.error("Помилка при відправці:", error);
            alert("Сталася помилка при відправці.");
        }
    };

    return (
        <div className="contact-page">
            <section className="hero-contact">
                <h1>Contact Us</h1>
                <p>Home / Contact Us</p>
            </section>

            <section className="contact-section">
                <div className="contact-form">
                    <h2>Send Us a Message</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Your Name" name="name" id="name" required />
                        <input type="email" placeholder="Your Email" name="email" id="email" required />
                        <input type="text" placeholder="Subject" name="subject" id="subject" required />
                        <textarea placeholder="Your Message" name="message" id="message" required></textarea>
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
