import { FaEnvelope } from 'react-icons/fa';  // Импорт иконки для почты

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-8">
            <div className="container mx-auto text-center">
                <p className="text-lg font-semibold">&copy; 2025 Product Catalog. All rights reserved.</p>
                <div className="mt-4 flex justify-center items-center space-x-2">
                    <FaEnvelope className="text-gray-400" />
                    <p>Contact us:
                        <a href="mailto:eugene.deadron@gmail.com" className="text-blue-400 underline hover:text-blue-600 transition duration-200 ml-1">
                            eugene.deadron@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
