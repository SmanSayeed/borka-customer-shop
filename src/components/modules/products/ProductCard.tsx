'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Check, Copy, MessageCircle, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: any;
  isRelated?: boolean;
}

export default function ProductCard({ product, isRelated }: ProductCardProps) {
  const router = useRouter();
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

  // Conditional classes
  const containerClasses = `overflow-hidden group transition-all duration-500 ${
    product.is_highlight ? 'bg-primary/10 text-primary' : 'bg-white'
  }`;

  const titleClasses = `font-semibold sm:text-xl ${
    product.is_highlight ? 'text-primary' : isRelated ? 'text-sm' : 'text-sm'
  }`;

  const priceClasses = `font-semibold text-lg ${
    product.is_highlight ? 'text-primary' : 'text-gray-400'
  }`;

  const originalPriceClasses = `text-xs ml-2 line-through ${
    product.is_highlight ? 'text-primary/70' : 'text-gray-500'
  }`;

  const buttonBaseClasses =
    'flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:text-white transition text-sm duration-500';

  const addToCartClasses = `${buttonBaseClasses} ${
    product.is_highlight
      ? 'text-gray-700 border border-primary/20 hover:bg-primary'
      : 'text-primary hover:bg-primary'
  }`;

  const sendMessageClasses = `${buttonBaseClasses} ${
    product.is_highlight
      ? 'text-gray-700 border border-primary/20 hover:bg-green-500'
      : 'text-primary hover:bg-green-500'
  }`;

  return (
    <motion.div
      key={product.id}
      className={containerClasses}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Product Image */}
      <Link href={`/products/${product.id}`}>
        <div className='relative w-full aspect-3/4 overflow-hidden'>
          {product.is_highlight && (
            <span className='absolute top-3 left-3 z-10 bg-green-500 text-white px-3 py-2 rounded-sm text-xs font-medium'>
              Special
            </span>
          )}
          <Image
            src={product.thumbnail_url || '/placeholder.png'}
            alt={product.product_label || 'Product Image'}
            width={350}
            height={500}
            className='object-cover w-full h-full transition-transform duration-700 group-hover:scale-110'
          />
        </div>
      </Link>

      {/* Content Section */}
      <div
        className={`p-3 md:p-5 space-y-2 relative ${
          product.is_highlight ? 'text-primary' : ''
        }`}
      >
        {/* Title + Copy Button */}
        <div className='flex items-start justify-between gap-2'>
          <h4 className={titleClasses}>{product.product_label}</h4>

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
              <TooltipContent
                side='top'
                className='bg-primary text-white px-3 py-1 rounded-md'
              >
                <p>{copied ? 'Copied!' : 'Copy'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Price */}
        <p className={priceClasses}>
          ৳ {Number(product.sale_price ?? 0).toLocaleString()}
          {product.is_discount_active && (
            <span className={originalPriceClasses}>
              ৳ {Number(product.original_price ?? 0).toLocaleString()}
            </span>
          )}
        </p>

        {/* Buttons */}
        <div className='flex items-center justify-between gap-3 pt-3'>
          {/* Add To Cart */}
          <button
            className={addToCartClasses}
            onClick={() => router.push(`/products/${product.id}`)}
          >
            <ShoppingCart size={16} />
            {/* Button text conditional */}
            {isRelated ? (
              product.is_highlight && <span className='ml-1'>Add To Cart</span>
            ) : (
              <span className='hidden sm:inline'>Add To Cart</span>
            )}
          </button>

          {/* Send Message */}
          <a
            href={`https://wa.me/8801XXXXXXXXX?text=I am interested in: ${product.product_label}`}
            target='_blank'
            className={sendMessageClasses}
          >
            <MessageCircle size={16} />
            {isRelated ? (
              product.is_highlight && <span className='ml-1'>Send Message</span>
            ) : (
              <span className='hidden sm:inline'>Send Message</span>
            )}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
