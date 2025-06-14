import React from 'react';
import { Button } from 'antd';
import './Header.css';

interface HeaderProps {
  onLogoClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="site-header">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={onLogoClick}>
            <img
              src="https://readdy.ai/api/search-image?query=A%2520professional%2520sleek%2520modern%2520logo%2520for%2520Cooling%2520Maestro%2520featuring%2520a%2520stylized%2520snowflake%2520or%2520cooling%2520symbol%2520with%2520blue%2520gradient%2520colors.%2520The%2520logo%2520should%2520be%2520minimalist%2520corporate%2520and%2520suitable%2520for%2520an%2520industrial%2520cooling%2520calculation%2520software.%2520Clean%2520background%2520high%2520contrast.&width=60&height=60&seq=1&orientation=squarish"
              alt="Cooling Maestro Logo"
              className="h-12 w-12 object-contain mr-3"
            />
            <div>
              <h1 className="text-2xl font-bold">Cooling Maestro</h1>
              <p className="text-sm text-blue-100">Endüstriyel Soğutma Çözümleri</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Button type="link" className="text-white hover:text-blue-200 !rounded-button whitespace-nowrap">
              Ana Sayfa
            </Button>
            <Button type="link" className="text-white hover:text-blue-200 !rounded-button whitespace-nowrap">
              Özellikler
            </Button>
            <Button type="link" className="text-white hover:text-blue-200 !rounded-button whitespace-nowrap">
              Fiyatlandırma
            </Button>
            <Button type="link" className="text-white hover:text-blue-200 !rounded-button whitespace-nowrap">
              Hakkımızda
            </Button>
            <Button type="link" className="text-white hover:text-blue-200 !rounded-button whitespace-nowrap">
              İletişim
            </Button>
          </nav>
          <div className="flex items-center space-x-3">
            <a href="https://readdy.ai/home/84d37ea6-8d87-4400-af1f-ae44e7bfe1be/0674a79d-811c-4d71-8b47-fa17e6678894" data-readdy="true">
              <Button type="default" className="border-white text-blue !rounded-button whitespace-nowrap">
                Giriş Yap
              </Button>
            </a>
            <Button type="primary" className="bg-blue-500 border-blue-500 hover:bg-blue-600 !rounded-button whitespace-nowrap">
              Kayıt Ol
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;