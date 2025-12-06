'use client';

import { getInvoicePDF, getOrderSummary } from '@/actions/order';
import { Button } from '@/components/ui/button';
import { Confetti, type ConfettiRef } from '@/components/ui/confetti';
import { Eye, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order_number');
  const phoneNumber = searchParams.get('phone_number');

  const confettiRef = useRef<ConfettiRef>(null);
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  useEffect(() => {
    confettiRef.current?.fire({});

    const fetchOrder = async () => {
      if (!orderNumber || !phoneNumber) {
        setLoading(false);
        return;
      }

      try {
        const res = await getOrderSummary({
          order_number: orderNumber,
          phone_number: phoneNumber,
        });

        if (res?.success) {
          setOrderData(res.data);
        } else {
          toast.error(res?.message || 'Failed to fetch order summary');
        }
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber, phoneNumber]);

  // const handleDownloadInvoice = async () => {
  //   if (!orderNumber || !phoneNumber) return;

  //   try {
  //     setIsDownloading(true);

  //     const pdfBlob = await downloadInvoice({
  //       order_number: orderNumber,
  //       phone_number: phoneNumber,
  //     });

  //     if (!pdfBlob) {
  //       toast.error('Failed to download invoice');
  //       return;
  //     }

  //     const pdfUrl = URL.createObjectURL(pdfBlob);
  //     const a = document.createElement('a');
  //     a.href = pdfUrl;
  //     a.download = `invoice-${orderNumber}.pdf`;
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //     URL.revokeObjectURL(pdfUrl);
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('Something went wrong');
  //   } finally {
  //     setIsDownloading(false);
  //   }
  // };

  const handleViewInvoice = async () => {
    if (!orderNumber || !phoneNumber) return;

    try {
      setIsViewing(true);

      const pdfBlob = await getInvoicePDF({
        order_number: orderNumber,
        phone_number: phoneNumber,
      });

      if (!pdfBlob) {
        toast.error('Failed to view invoice');
        return;
      }

      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setIsViewing(false);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <Loader2 className='w-10 h-10 animate-spin text-primary' />
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] space-y-4'>
        <h1 className='text-2xl font-bold text-destructive'>
          Order Not Found!
        </h1>
        <Link href='/products'>
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const { order, items } = orderData;

  return (
    <div className='relative flex items-center justify-center px-4 py-8 overflow-hidden'>
      <div className='relative z-10 max-w-4xl w-full text-center space-y-6 bg-white p-4 sm:p-10 rounded-xl'>
        <Confetti
          ref={confettiRef}
          className='absolute inset-0 z-0 pointer-events-none'
        />

        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-2xl text-green-500 md:text-4xl font-bold text-foreground'>
            Order Successful
          </h1>
          <span className='text-muted-foreground text-sm'>
            Thank you for your purchase! Your order has been received.
          </span>
        </div>

        {/* Order Details */}
        <div className='space-y-6 mt-8 text-left'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='border rounded-lg p-4 space-y-2'>
              <h3 className='font-semibold text-lg border-b pb-2 mb-2'>
                Order Info
              </h3>
              <p className='text-sm'>
                <span className='font-medium'>Order Number:</span>{' '}
                {order.order_number}
              </p>
              <p className='text-sm'>
                <span className='font-medium'>Date:</span>{' '}
                {new Date(order.created_at).toLocaleDateString()}
              </p>
              <p className='text-sm'>
                <span className='font-medium'>Payment Status:</span>{' '}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    order.payment_status === 1
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {order.payment_status_label}
                </span>
              </p>
            </div>

            <div className='border rounded-lg p-4 space-y-2'>
              <h3 className='font-semibold text-lg border-b pb-2 mb-2'>
                Shipping Address
              </h3>
              <p className='text-sm font-medium'>
                {order.shipping_address.name}
              </p>
              <p className='text-sm text-muted-foreground'>
                {order.shipping_address.address}
              </p>
              <p className='text-sm text-muted-foreground'>
                {order.shipping_address.area}
              </p>
              <p className='text-sm text-muted-foreground'>
                {order.phone_number}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className='border rounded-lg overflow-hidden'>
            <div className='bg-gray-50 p-3 border-b font-medium grid grid-cols-12 text-sm'>
              <div className='col-span-6'>Product</div>
              <div className='col-span-2 text-center'>Qty</div>
              <div className='col-span-4 text-right'>Price</div>
            </div>
            <div className='divide-y'>
              {items.map((item: any) => (
                <div
                  key={item.id}
                  className='p-3 grid grid-cols-12 text-sm items-center gap-2 sm:gap-0'
                >
                  {/* Product Image */}
                  <div className='col-span-2 sm:col-span-1 h-16 w-14 relative'>
                    {item.product.thumbnail_url && (
                      <Image
                        src={item.product.thumbnail_url}
                        alt={item.product.product_label}
                        height={24}
                        width={20}
                        className='object-cover rounded'
                      />
                    )}
                  </div>

                  <div className='col-span-10 sm:col-span-5 pl-2 text-left'>
                    <p className='font-medium'>{item.product.product_label}</p>
                    <p className='text-xs text-muted-foreground'>
                      Size: {item.size.name}
                    </p>
                  </div>
                  <div className='col-span-6 sm:col-span-2 text-center'>
                    Qty: {item.quantity}
                  </div>
                  <div className='col-span-6 sm:col-span-4 text-right'>
                    ৳ {item.total_paybale_amnt}
                  </div>
                </div>
              ))}
            </div>
            <div className='bg-gray-50 p-4 space-y-2'>
              <div className='flex justify-between text-sm'>
                <span>Subtotal</span>
                <span>৳{order.order_total_amnt}</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span>Delivery Charge</span>
                <span>৳{order.dlv_charge}</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span>Discount</span>
                <span>-৳{order.discount_amount}</span>
              </div>
              <div className='flex justify-between font-bold text-lg border-t pt-2 mt-2'>
                <span>Total</span>
                <span className='text-primary'>
                  ৳{order.total_payable_amnt}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className='flex flex-col sm:flex-row flex-wrap justify-center gap-3 pt-4'>
          {/* <Button
            className='bg-green-500 w-full sm:w-auto'
            onClick={handleDownloadInvoice}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <Loader2 className='w-4 h-4 mr-2 animate-spin' />
            ) : (
              <Download className='w-4 h-4 mr-2' />
            )}
            Download Invoice
          </Button> */}

          <Button
            className='bg-purple-500 w-full sm:w-auto'
            onClick={handleViewInvoice}
            disabled={isViewing}
          >
            {isViewing ? (
              <Loader2 className='w-4 h-4 mr-2 animate-spin' />
            ) : (
              <Eye className='w-4 h-4 mr-2' />
            )}
            View Invoice
          </Button>

          <Link prefetch={true} href='/products'>
            <Button className='w-full sm:w-auto'>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className='flex items-center justify-center min-h-screen'>
          <Loader2 className='w-10 h-10 animate-spin text-primary' />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
