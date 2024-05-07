import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KnowMore = () => {
    // State to track which section is currently active
    const [activeSection, setActiveSection] = useState(null);
    const navigate = useNavigate(); // Access the navigate function

    const handleHome = () => {
        navigate('/'); // Navigate to the Knowmore page
    };

    const handleLoginClick = () => {
        navigate('/login'); // Navigate to the Login page
    };

    const handleSignupClick = () => {
        navigate('/signup'); // Navigate to the Signup page
    };



    // Function to handle link clicks and scroll to the corresponding section
    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return (
        <div className="know-more-container">
            {/* Navigation links */}
            <div className="navigation-links">
                <a href="#overview" onClick={() => scrollToSection("overview")}>Overview Of Features</a><br /><br />
                <a href="#how-it-works" onClick={() => scrollToSection("how-it-works")}>How It Works</a><br /><br />
                <a href="#benefits" onClick={() => scrollToSection("benefits")}>Benefits of Mindfulness</a><br /><br />
                <a href="#testimonials" onClick={() => scrollToSection("testimonials")}>Testimonials</a><br /><br />
                <a href="#meet-the-team" onClick={() => scrollToSection("meet-the-team")}>Meet The Team</a><br /><br />
                <a href="#faqs" onClick={() => scrollToSection("faqs")}>FAQs</a><br /><br />
                <a href="#community-resources" onClick={() => scrollToSection("community-resources")}>Community Resources</a><br /><br />
                <a href="#contact" onClick={() => scrollToSection("contact")}>Contact Information</a><br /><br />
            </div>
            <section id="overview" className={activeSection === "overview" ? "active" : ""}>
                <h2>Overview Of Features</h2><br /><br />
                <p>Welcome to MindfulMe, your all-in-one platform for mindfulness and well-being. <br /><br /> MindfulMe offers a comprehensive set of features designed to help you cultivate mindfulness, manage stress, and enhance your overall quality of life.<br /><br />

                    Personalized Meditation Sessions: MindfulMe provides a wide range of guided meditation sessions tailored to your specific needs and preferences. Whether you're looking to reduce stress, improve focus, or promote better sleep, our meditation library has something for everyone.<br /><br />

                    Mood Tracking and Journaling: With MindfulMe, you can track your mood and emotions over time, gaining valuable insights into your mental well-being. Our intuitive journaling feature allows you to reflect on your thoughts and feelings, fostering greater self-awareness and emotional resilience.<br /><br />

                    Goal Setting and Progress Tracking: Set meaningful goals for yourself and track your progress towards achieving them. Whether it's developing healthier habits, cultivating gratitude, or enhancing your relationships, MindfulMe empowers you to take actionable steps towards your personal growth and development.<br /><br />

                    Community Support and Resources: Connect with like-minded individuals in our vibrant community and access a wealth of resources, including articles, podcasts, and expert advice on mindfulness, meditation, and holistic living. Share your experiences, ask questions, and support one another on your journey towards greater well-being.<br /><br />

                    Experience the transformative power of mindfulness with MindfulMe today!

                </p>
            </section>
            <section id="how-it-works" className={activeSection === "how-it-works" ? "active" : ""}>
                <h2>How It Works</h2><br /><br />
                <p>Our application, MindfulMe, is designed to help users cultivate mindfulness and improve their mental well-being. Here's how it works:</p><br /><br />
                <ul>
                    <li><strong>User Registration:</strong> Users can sign up for an account to access all features of MindfulMe.</li><br /><br />
                    <li><strong>Mood Tracking:</strong> Users can log their daily mood and track their emotional well-being over time.</li><br /><br />
                    <li><strong>Meditation Sessions:</strong> MindfulMe offers guided meditation sessions tailored to different needs and preferences.</li><br /><br />
                    <li><strong>Journaling:</strong> Users can maintain a journal to record their thoughts, reflections, and gratitude moments.</li><br /><br />
                    <li><strong>Goal Setting:</strong> MindfulMe allows users to set personal goals related to mindfulness and track their progress.</li><br /><br />
                    <li><strong>Community Support:</strong> Users can connect with like-minded individuals, share experiences, and support each other in their mindfulness journey.</li><br /><br />
                </ul>
                <p>By incorporating these features into their daily routine, users can develop a greater sense of self-awareness, reduce stress, and enhance their overall quality of life.</p>
            </section>
            <section id="benefits" className={activeSection === "benefits" ? "active" : ""}>
                <h2>Benefits of Mindfulness</h2><br /><br />
                <p>Mindfulness practices offer a wide range of benefits for both mental and physical well-being. Here are some of the key benefits:</p><br /><br />
                <ul>
                    <li><strong>Stress Reduction:</strong> Mindfulness techniques can help individuals manage stress more effectively and develop resilience in the face of challenges.</li><br /><br />
                    <li><strong>Improved Focus and Concentration:</strong> Regular mindfulness practice can enhance attention span and cognitive function, leading to better focus and concentration.</li><br /><br />
                    <li><strong>Emotional Regulation:</strong> Mindfulness cultivates awareness of one's thoughts and emotions, allowing for greater emotional regulation and control.</li><br /><br />
                    <li><strong>Enhanced Self-Awareness:</strong> By practicing mindfulness, individuals gain insight into their thoughts, feelings, and behaviors, leading to increased self-awareness and personal growth.</li><br /><br />
                    <li><strong>Better Sleep:</strong> Mindfulness techniques promote relaxation and stress reduction, which can improve sleep quality and help alleviate insomnia.</li><br /><br />
                    <li><strong>Increased Resilience:</strong> Mindfulness fosters a mindset of acceptance and non-judgment, enabling individuals to adapt more effectively to life's challenges and setbacks.</li><br /><br />
                </ul>
                <p>By incorporating mindfulness into their daily lives, individuals can experience these benefits and cultivate a greater sense of well-being and fulfillment.</p>
            </section>
            <section id="testimonials" className={activeSection === "testimonials" ? "active" : ""}>
                <h2>Testimonials</h2>
                <div className="testimonial">
                    <blockquote>
                        <p>"MindfulMe has been an invaluable tool in my journey towards better mental health. The meditation sessions are incredibly calming, and I've noticed a significant reduction in my stress levels since incorporating mindfulness into my daily routine."</p>
                    </blockquote>
                    <cite>- David, 35</cite>
                </div>
                <div className="testimonial">
                    <blockquote>
                        <p>"I never realized how much I needed mindfulness in my life until I started using MindfulMe. It's helped me become more present, less reactive, and overall happier. I can't imagine my life without it now."</p>
                    </blockquote>
                    <cite>- Sophia, 28</cite>
                </div>
                <div className="testimonial">
                    <blockquote>
                        <p>"MindfulMe has been a game-changer for my productivity. The focus exercises have helped me concentrate better at work, and the mindfulness reminders throughout the day keep me grounded and focused on what truly matters."</p>
                    </blockquote>
                    <cite>- Michael, 40</cite>
                </div>
                <div className="testimonial">
                    <blockquote>
                        <p>"I've struggled with anxiety for years, but MindfulMe has given me the tools to manage it more effectively. The breathing exercises and guided meditations help calm my racing thoughts, and I feel more in control of my emotions than ever before."</p>
                    </blockquote>
                    <cite>- Jessica, 30</cite>
                </div>
                <div className="testimonial">
                    <blockquote>
                        <p>"As a busy parent, finding time for self-care can be challenging, but MindfulMe makes it easy. I love the short mindfulness exercises I can do throughout the day, and they've made a huge difference in my overall well-being."</p>
                    </blockquote>
                    <cite>- Alex, 42</cite>
                </div>
            </section>

            <section id="meet-the-team" className={activeSection === "meet-the-team" ? "active" : ""}>
                <h2>Meet The Team</h2>
                <div className="team-member">
                    <img src="/images/jairaj.jpg" alt="Team Member 1" />
                    <h3>Jairaj Rachuri</h3>
                    <p>Co-Founder & CEO</p>
                </div>
                <div className="team-member">
                    <img src="/images/remy.jpg" alt="Team Member 2" />
                    <h3>Remy Fernandez</h3>
                    <p>Co-Founder & CTO</p>
                </div>
                <div className="team-member">
                    <img src="/images.michael.jpg" alt="Team Member 3" />
                    <h3>Michael Johnson</h3>
                    <p>Lead Developer</p>
                </div>
                <div className="team-member">
                    <img src="/images/sarah.jpg" alt="Team Member 4" />
                    <h3>Sarah Johnson</h3>
                    <p>UX/UI Designer</p>
                </div>
            </section>
            <section id="faqs" className={activeSection === "faqs" ? "active" : ""}>
                <h2>FAQs</h2>
                <div className="faq-item">
                    <h3>Q: How do I get started with the app?</h3>
                    <p>A: To get started, simply sign up for an account and log in to access all the features.</p>
                </div>
                <div className="faq-item">
                    <h3>Q: Can I use the app on multiple devices?</h3>
                    <p>A: Yes, you can use the app on multiple devices by logging in with the same account credentials.</p>
                </div>
                <div className="faq-item">
                    <h3>Q: Is my data secure?</h3>
                    <p>A: Yes, we take data security seriously and use encryption to protect your personal information.</p>
                </div>
                <div className="faq-item">
                    <h3>Q: How do I reset my password?</h3>
                    <p>A: You can reset your password by clicking on the "Forgot Password" link on the login page.</p>
                </div>
                <div className="faq-item">
                    <h3>Q: Can I cancel my subscription?</h3>
                    <p>A: Yes, you can cancel your subscription at any time by going to your account settings.</p>
                </div>
                <div className="faq-item">
                    <h3>Q: How often are updates released?</h3>
                    <p>A: We release updates regularly to improve the app's performance and add new features.</p>
                </div>
                <div className="faq-item">
                    <h3>Q: Do you offer customer support?</h3>
                    <p>A: Yes, we offer customer support via email and live chat during business hours.</p>
                </div>
                <div className="faq-item">
                    <h3>Q: Can I customize my profile?</h3>
                    <p>A: Yes, you can customize your profile settings to update your personal information and preferences.</p>
                </div>
                <div className="faq-item">
                    <h3>Q: Is the app available in multiple languages?</h3>
                    <p>A: Currently, the app is available in English only, but we plan to add support for additional languages in the future.</p>
                </div>
                <div className="faq-item">
                    <h3>Q: How do I report a bug or provide feedback?</h3>
                    <p>A: You can report bugs or provide feedback by contacting our support team or using the feedback form in the app.</p>
                </div>
                <div className="faq-item">
                    <h3>Q: Are there any tutorials available?</h3>
                    <p>A: Yes, we provide tutorials and user guides to help you get the most out of the app's features.</p>
                </div>
                <div className="faq-item">
                    <h3>Q: Can I share my progress with friends?</h3>
                    <p>A: Yes, you can share your progress and achievements with friends by connecting your account to social media platforms.</p>
                </div>
            </section>

            <section id="community-resources">
                <h2>Community Resources</h2>
                <p>Provide resources and links to the community for further support.</p>
            </section>
            <section id="contact">
                <h2>Contact Information</h2>
                <p>Display contact information for users to reach out for support or inquiries.</p>
            </section>
            <div style={{ margin: '10px 0' }}>
                <button onClick={handleHome}>Home</button>
            </div>
            <div style={{ margin: '10px 0' }}>
                <button onClick={handleLoginClick}>Login</button>
            </div>
            <div style={{ margin: '10px 0' }}>
                <button onClick={handleSignupClick}>Signup</button>
            </div>
        </div>
    );
};

export default KnowMore;