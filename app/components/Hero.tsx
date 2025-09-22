import {Link} from "react-router";

const Hero = ({name = '[NAME]', text = 'Trying to figure out my ways around web dev and analysis' }) => {
    return (
        <header className="text-center py-20 px-4 bg-gray-900 text-white transition-colors duration-300">
            <h2 className="text-4xl font-bold mb-4">
                Hello, I am {name}!
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
                {text}
            </p>
            <div className="flex justify-center gap-4">
                <Link to='/projects' className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition'>My Projects</Link>
                <Link to='/contact' className='border border-blue-500 text-blue-400 px-6 py-2 rounded hover:bg-blue-600 hover:text-white transition'>Contact Me</Link>
            </div>
        </header>
    )
}
export default Hero;