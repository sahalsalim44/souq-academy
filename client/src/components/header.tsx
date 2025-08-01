import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Scale } from "lucide-react";
import logoPath from "@assets/logomain_1752768540366.jpg";

interface HeaderProps {
  onEnrollClick: () => void;
  onBrochureClick: () => void;
}

export function Header({ onEnrollClick, onBrochureClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const NavLinks = () => (
    <>
      <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-primary transition">
        Home
      </button>
      <button onClick={() => scrollToSection('courses')} className="text-gray-700 hover:text-primary transition">
        Courses
      </button>
      <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-primary transition">
        About
      </button>
      <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 hover:text-primary transition">
        Testimonials
      </button>
      <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-primary transition">
        Contact
      </button>
      <button onClick={() => scrollToSection('hire')} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
        Hire Through Us
      </button>
    </>
  );

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src={logoPath} alt="CODE SOUQ Academy"  className="h-16 w-16 mr-3 rounded-full transform scale-150" />
            <div className="text-xl font-bold text-primary">CODE SOUQ ACADEMY</div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>
          
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
