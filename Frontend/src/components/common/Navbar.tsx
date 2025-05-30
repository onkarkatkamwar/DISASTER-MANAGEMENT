import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import logo from '@/assets/logo.png';

// Define props type
interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={cn('sticky top-0 left-0 shadow-md bg-white z-50', className)}>
      <nav className='px-6 md:px-10 lg:px-20 py-4 flex justify-between items-center border-b border-gray-200'>
        <div className='flex gap-4 items-center font-semibold text-xl md:text-2xl'>
          <img src={logo} alt='Logo' className='w-[35px] h-[35px] md:w-[40px] md:h-[40px]' />
          <p className='tracking-wide text-gray-800'>RefferalHub</p>
        </div>
        <div className='hidden md:flex items-center gap-6 lg:gap-8'>
          <ul className='flex gap-6 text-base md:text-lg font-medium text-gray-700'>
            <Link to='/' className='hover:text-primary transition'><li>Features</li></Link>
            <Link to='/' className='hover:text-primary transition'><li>About Us</li></Link>
            <Link to='/' className='hover:text-primary transition'><li>How ReferralHub Works</li></Link>
            <Link to='/' className='hover:text-primary transition'><li>Pricing</li></Link>
          </ul>
          
            <Link to='/login'>
              <Button variant='default' className='px-4 py-2 text-sm md:text-lg rounded-lg shadow-md'>
                Get Started
              </Button>
            </Link>
        </div>
        <div className='md:hidden'>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant='ghost' className='text-gray-700 focus:outline-none'>☰</Button>
            </SheetTrigger>
            <SheetContent side='left' className='p-6'>
              <ul className='flex flex-col gap-4 text-lg font-medium text-gray-700'>
                <Link to='/' onClick={() => setIsOpen(false)} className='hover:text-primary transition'><li>Features</li></Link>
                <Link to='/why-us' onClick={() => setIsOpen(false)} className='hover:text-primary transition'><li>About Us</li></Link>
                <Link to='/features' onClick={() => setIsOpen(false)} className='hover:text-primary transition'><li>How ReferralHub Works</li></Link>
                <Link to='/faq' onClick={() => setIsOpen(false)} className='hover:text-primary transition'><li>Pricing</li></Link>
              </ul>
              
                <Link to='/login' onClick={() => setIsOpen(false)}>
                  <Button variant='default' className='mt-4 w-full'>
                    Get Started
                  </Button>
                </Link>

            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
