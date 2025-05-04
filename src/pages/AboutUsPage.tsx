import './AboutUsPage.css';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import SchoolIcon from '@mui/icons-material/School';

const AboutUsPage = () => {
    return (
        <div className="about-page">
            <section className="hero">
                <h1>About us</h1>
                <p>Welcome to our digital library — where every shelf opens a world of imagination, learning, and growth.</p>
            </section>

            <section className="section highlight">
                <h2>Turning stories into experiences worth remembering</h2>
                <div className="text-row">
                    <p>In our library, every book is more than just text. We strive to convey the authors’ ideas to the reader with care, accuracy, and attention to detail.
                        Our team works to ensure that each digital copy is accessible, easy to read, and retains the original content.</p>
                    <p>We believe that quality knowledge transfer is the key to inspiration. That's why we constantly improve the platform, provide technical support, and update the collection so that every user gets the most out of reading.</p>
                </div>
            </section>

            <section className="section two-columns">
                <div className="video-box">
                    <img src="https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Founder" />
                    <blockquote>
                        <p>“Reading is essential for those who seek to rise above the ordinary.”</p>
                        <small>— Jim Rohn</small>
                    </blockquote>
                </div>
                <div className="text-box">
                    <h2>We support curious minds and lifelong learning</h2>
                    <p>Reading opens minds, builds empathy, and strengthens our communities. Through our library, we connect people with ideas that shape the future.</p>
                    <p className="quote">“A room without books is like a body without a soul.” — <em>Cicero</em></p>
                </div>
            </section>

            <section className="section center">
                <h2>We help minds grow through stories and knowledge</h2>
                <p>Books have the power to inspire, educate, and transform lives.</p>
                <div className="trios">
                    <div className="trio">
                        <LocalLibraryIcon style={{ fontSize: '48px', color: 'var(--text-color)' }} />
                        <h3>Dedicated Librarians</h3>
                        <p>Our team is always ready to guide you to the next great read.</p>
                    </div>
                    <div className="trio">
                        <CollectionsBookmarkIcon style={{ fontSize: '48px', color: 'var(--text-color)' }} />
                        <h3>Curated Collections</h3>
                        <p>Every genre, every interest — all in one place.</p>
                    </div>
                    <div className="trio">
                        <SchoolIcon style={{ fontSize: '48px', color: 'var(--text-color)' }} />
                        <h3>Lifelong Learning</h3>
                        <p>Empowering readers of all ages to keep learning and growing.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUsPage;
