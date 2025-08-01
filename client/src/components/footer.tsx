import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import logoPath from "@assets/logomain_1752768540366.jpg";

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img src={logoPath} alt="SOUQ Academy" className="h-8 w-8 mr-3 rounded-full" />
              <div className="text-xl font-bold">CODE SOUQ ACADEMY</div>
            </div>
            <p className="text-gray-400">Empowering careers through quality education and industry-relevant training.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => scrollToSection('home')} className="hover:text-white transition">Home</button></li>
              <li><button onClick={() => scrollToSection('courses')} className="hover:text-white transition">Courses</button></li>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition">About</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition">Contact</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Courses</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => scrollToSection('courses')} className="hover:text-white transition">Java Fullstack</button></li>
              <li><button onClick={() => scrollToSection('courses')} className="hover:text-white transition">Python Fullstack</button></li>
              <li><button onClick={() => scrollToSection('courses')} className="hover:text-white transition">Digital Marketing</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/codesouqacademy/" className="text-gray-400 hover:text-white transition">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 CODE SOUQ ACADEMY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
