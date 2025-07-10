
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../context/AuthContext';
import { Stethoscope, User, LogOut, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  const { state, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gray-900">MedConnect</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/doctors"
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              All Doctors
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {state.isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{state.user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  {state.user?.role === 'admin' && (
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => navigate('/login')}
                  className="hidden sm:inline-flex"
                >
                  Login
                </Button>
                <Button onClick={() => navigate('/register')}>Sign Up</Button>
              </div>
            )}

            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate('/')}>
                  Home
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/doctors')}>
                  All Doctors
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/about')}>
                  About Us
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/contact')}>
                  Contact
                </DropdownMenuItem>
                {!state.isAuthenticated && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/login')}>
                      Login
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/register')}>
                      Sign Up
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
