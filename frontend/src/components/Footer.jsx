const Footer = () => {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo + Name */}
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 text-white px-3 py-2 rounded-lg font-bold">
              🍔
            </div>
            <h2 className="text-lg font-semibold">FoodieHub</h2>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-gray-600 text-sm">
            <a href="#" className="hover:text-blue-500">About</a>
            <a href="#" className="hover:text-blue-500">Contact</a>
            <a href="#" className="hover:text-blue-500">Privacy</a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 text-gray-500">
            <a href="#" className="hover:text-blue-500">👍 Facebook</a>
            <a href="#" className="hover:text-pink-500">📷 Instagram</a>
            <a href="#" className="hover:text-sky-500">🐦 Twitter</a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-gray-400 text-sm mt-6 border-t pt-4">
          © {new Date().getFullYear()} FoodieHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;