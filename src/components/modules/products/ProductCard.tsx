'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { motion } from 'framer-motion';
import { Check, Copy, MessageCircle, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductCard({ product }: any) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `
${product.product_label}
Price: ৳${product.sale_price}
${
  product.is_discount_active ? `Original Price: ৳${product.original_price}` : ''
}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      key={product.id}
      className={`overflow-hidden group transition-all duration-500 
        ${product.is_highlight ? 'bg-primary/10 text-primary' : 'bg-white'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Link href={`/products/${product.id}`}>
        <div className='relative w-full aspect-3/4 overflow-hidden'>
          {product.is_highlight && (
            <span
              className='absolute top-3 left-3 z-10 bg-green-500 text-white 
              px-3 py-2 rounded-sm text-xs font-medium'
            >
              Special
            </span>
          )}

          <Image
            src={product.thumbnail_url || '/placeholder.png'}
            alt={product.product_label || 'Product Image'}
            height={500}
            width={350}
            className='object-cover w-full h-full transition-transform duration-700 group-hover:scale-110'
          />
        </div>
      </Link>

      <div
        className={`p-3 md:p-5 space-y-2 relative
            ${product.is_highlight ? 'text-primary' : ''}`}
      >
        <div className='flex items-start justify-between gap-2'>
          <h4
            className={`font-semibold sm:text-xl 
        ${product.is_highlight ? 'text-primary' : 'text-sm'}`}
          >
            {product.product_label}
          </h4>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className='p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition text-xs'
                  onClick={handleCopy}
                >
                  {copied ? (
                    <span className='text-green-500 font-medium gap-1 flex items-center'>
                      <Check size={12} /> Copied
                    </span>
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </TooltipTrigger>

              <TooltipContent side='top'>
                <p>{copied ? 'Copied!' : 'Copy'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Price Section */}
        <p
          className={`font-semibold text-lg 
            ${product.is_highlight ? 'text-primary' : 'text-gray-400'}`}
        >
          ৳ {Number(product.sale_price ?? 0).toLocaleString()}
          {product.is_discount_active && (
            <span
              className={`text-xs ml-2 line-through 
              ${product.is_highlight ? 'text-primary/70' : 'text-gray-500'}`}
            >
              ৳ {Number(product.original_price ?? 0).toLocaleString()}
            </span>
          )}
        </p>

        <div
          className={`${
            product.is_highlight
              ? 'flex items-center justify-between gap-3 pt-3'
              : 'pt-3 flex items-center justify-between gap-3'
          }`}
        >
          {/* ADD TO CART */}
          <button
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 
      hover:bg-primary hover:text-white transition text-sm duration-500
      ${
        product.is_highlight
          ? 'text-gray-700 border border-primary/20'
          : 'text-primary'
      }`}
          >
            <ShoppingCart size={16} />

            {/* Desktop → Always show text  
        Mobile → text only if is_highlight */}
            <span className='hidden sm:inline'>Add To Cart</span>

            {!product.is_highlight && (
              <span className='sm:hidden hidden'>Add To Cart</span>
            )}

            {product.is_highlight && (
              <span className='sm:hidden'>Add To Cart</span>
            )}
          </button>

          {/* SEND MESSAGE */}
          <a
            href={`https://wa.me/8801XXXXXXXXX?text=I am interested in: ${product.product_label}`}
            target='_blank'
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 
      hover:bg-green-500 hover:text-white transition text-sm duration-500
      ${
        product.is_highlight
          ? 'text-gray-700 border border-primary/20'
          : 'text-primary'
      }`}
          >
            <MessageCircle size={16} />

            {/* Desktop → Always show full text */}
            <span className='hidden sm:inline'>Send Message</span>

            {/* 
      Mobile → 
      - highlight = true  → Send Message
      - highlight = false → Only Icon
    */}
            {product.is_highlight && (
              <span className='sm:hidden'>Send Message</span>
            )}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
