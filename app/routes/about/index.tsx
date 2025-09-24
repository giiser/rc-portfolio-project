const AboutPage = () => {
    return (
        <div className="max-w-5xl mx-auto px-6 py-16 bg-gray-900">
            {/*intro section*/}
            <div className="flex flex-col md:flex-row md:items-start itemscenter gap-10 mb-12">
                <img src="/images/profile.jpg" alt="profile" className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-md" />
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Hey, I am Sergii 🤘
                    </h1>
                    <p className="text-gray-300 text-lg">
                        An experienced Business Analyst and aspiring Full-Stack Developer with a passion for creating innovative web applications. With a strong foundation in both business analysis and software development, I bring a unique perspective to every project I undertake.
                    </p>
                </div>
            </div>

            {/*bio section*/}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">My mission</h2>
                <p className="text-gray-300 leading-relaxed">
                    My mission is to leverage my analytical skills and technical expertise to build user-centric applications that solve real-world problems. I am committed to continuous learning and growth, staying updated with the latest industry trends and technologies to deliver high-quality solutions.
                </p>
            </div>

            {/*tech stack*/}
            <h2 className="text-2xl font-semibold text-white mb-4">
                What I use
            </h2>
            <ul className="flex flex-wrap gap-4 text-sm text-gray-300">
                {
                    ['JS',
                    'React',
                    'TypeScript',
                    'Tailwind CSS',
                    'Less CSS',
                    'SCSS'].map((tech) => (
                        <li key={tech} className="bg-gray-800 px-3 py-1 rounded-full border border-gray-700">{tech}</li>
                    ))
                }
            </ul>
        </div>
    )
}
export default AboutPage;