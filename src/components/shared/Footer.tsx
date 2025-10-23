import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Youtube,
  Instagram,
  Music2,
} from 'lucide-react';
import { Logo } from './assets';
import Link from 'next/link';
import { categoryLinks } from '@/constants/category';
import { quickLinks } from '@/constants/footer';

const Footer = () => {
  return (
    <footer className='bg-secondary text-gray-200'>
      <div className='container mx-auto py-14'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Logo & About section*/}
          <div className='space-y-6 '>
            <Logo height={150} width={150} />
            <p className='text-sm text-gray-300 leading-relaxed'>
              Faith Journey is your go-to online destination for elegant and
              modest women's wear. We specialize in premium-quality borqas and
              abayas that blend style, comfort, and grace. Our mission is to
              empower women with fashionable choices while honoring tradition.
            </p>
          </div>

          {/* Categories */}
          <div className='space-y-4 lg:ml-20'>
            <h3 className='font-bold text-sm uppercase tracking-wide'>
              Categories
            </h3>
            <ul className='space-y-2'>
              {categoryLinks.slice(0, 6).map(({ name, path }) => (
                <li key={path}>
                  <Link
                    href={path}
                    className='text-sm hover:text-primary transition-colors'
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h3 className='font-bold text-sm uppercase tracking-wide'>
              Quick Links
            </h3>
            <ul className='space-y-2'>
              {quickLinks.map(({ name, path }) => (
                <li key={path}>
                  <Link
                    href={path}
                    className='text-sm hover:text-primary transition-colors'
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className='space-y-4'>
            <h3 className='font-bold text-sm uppercase tracking-wide'>
              Contact
            </h3>
            <div className='space-y-3'>
              <div className='flex items-start gap-2'>
                <Mail className='w-4 h-4 mt-0.5 shrink-0' />
                <a
                  href='mailto:info@anzaarlifestyle.com'
                  className='text-sm hover:text-primary transition-colors break-all'
                >
                  faithjourney0077@gmail.com
                </a>
              </div>

              <div className='flex items-start gap-2'>
                <Phone className='w-4 h-4 mt-0.5 shrink-0' />
                <div className='text-sm'>01819-491091</div>
              </div>

              <div className='flex items-start gap-2'>
                <MapPin className='w-4 h-4 mt-0.5 shrink-0' />
                <div className='text-sm'>
                  Shop# 117, Ground Floor, Prokousholi Bhaban, Rajbari Road,
                  Joydebpur,, Gazipur, Bangladesh
                </div>
              </div>
            </div>
            <div className='flex gap-4 mt-8'>
              <Link
                href='#'
                className='size-9 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors'
              >
                <Facebook className='w-5 h-5 text-gray-700' />
              </Link>
              <Link
                href='#'
                className='size-9 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors'
              >
                <Youtube className='w-5 h-5 text-gray-700' />
              </Link>
              <Link
                href='#'
                className='size-9 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors'
              >
                <Instagram className='w-5 h-5 text-gray-700' />
              </Link>
              <Link
                href='#'
                className='size-9 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors'
              >
                <Music2 className='w-5 h-5 text-gray-700' />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className='py-10'>
        <p className='text-sm text-center'>
          Copyright @ 2025 Faith Journey. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
