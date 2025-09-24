import { Link } from "react-router";

const AboutPreview = () => {
    return (
        <section className="mt-12 p-10 flex flex-col md:flex-row items-center gap-8 bg-gray-900">
            <img src="/images/profile.jpg" alt="profile pic" className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md" />
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                    About me 🤘
                </h2>
                <p className="text-gray-200 mb-4 max-w-4xl">
                    I am Sergii - an experienced Business Analyst and aspiring Full-Stack Developer with a passion for creating innovative web applications. With a strong foundation in both business analysis and software development, I bring a unique perspective to every project I undertake.
                </p>
                <Link to={'/about'} className="inline-block text-blue-400 hover:underline text-sm">Learn More About Me</Link>
            </div>
        </section>
    );
}
export default AboutPreview;