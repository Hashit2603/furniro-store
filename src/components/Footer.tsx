export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4"><div className="bg-orange-600 text-white w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"><span className="font-serif font-bold text-xl leading-none">S</span></div><h3 className="text-white text-xl font-bold">Satguru <span className="text-orange-500">Industries</span></h3></div>
          <p className="text-sm">Premium furniture for modern homes.</p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Links</h4>
          <ul className="space-y-2 text-sm">
            <li>Home</li>
            <li>Shop</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Help</h4>
          <ul className="space-y-2 text-sm">
            <li>Payment Options</li>
            <li>Returns</li>
            <li>Privacy Policies</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Newsletter</h4>
          <div className="flex gap-2">
            <input type="email" placeholder="Enter Your Email Address" className="bg-transparent border-b border-stone-500 pb-1 text-sm outline-none focus:border-white transition-colors" />
            <button className="border-b border-stone-500 pb-1 text-sm uppercase font-medium hover:text-white transition-colors">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-stone-800 text-sm text-center">
        <p>&copy; 2026 Satguru Industries. All rights reverved.</p>
      </div>
    </footer>
  );
}

