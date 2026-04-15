const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-orange-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-7">
          
          {/* Logo + Name */}
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 text-white px-3 py-2 rounded-lg font-bold">
              🍔
            </div>
            <h2 className="text-lg text-orange-600 font-semibold">FoodieHub</h2>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-gray-600 text-sm">
            <a href="#" className="hover:text-orange-600 transition">About</a>
            <a href="#" className="hover:text-orange-600 transition">Contact</a>
            <a href="#" className="hover:text-orange-600 transition">Privacy</a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 text-orange-600">
            <a href="#" className="hover:text-blue-500 transition">👍 Facebook</a>
            <a href="#" className="hover:text-pink-500 transition">📷 Instagram</a>
            <a href="#" className="hover:text-sky-500 transition">🐦 Twitter</a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-orange-600 text-sm mt-6 border-t border-orange-100 pt-4">
          © {new Date().getFullYear()} FoodieHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;