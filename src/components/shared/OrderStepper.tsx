'use client';

import Link from 'next/link';

interface Step {
  label: string;
  route: string;
}

interface OrderStepperProps {
  currentStep: number;
  steps?: Step[];
}

export default function OrderStepper({
  currentStep,
  steps = [
    { label: 'Your Cart', route: '/cart' },
    { label: 'Checkout Details', route: '/checkout' },
    { label: 'Order Complete', route: '/success' },
  ],
}: OrderStepperProps) {
  return (
    <div className='flex items-center justify-between mb-14 max-w-4xl mx-auto'>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={index} className='flex items-center w-full'>
            {/* Step Item */}
            <div className='flex-1 text-center'>
              <Link href={step.route}>
                <div
                  className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center 
                  ${
                    isActive || isCompleted
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 text-white'
                  }`}
                >
                  {stepNumber}
                </div>
              </Link>

              <p className='mt-2 text-sm font-medium'>{step.label}</p>
            </div>

            {/* Line Between Steps */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 border-t-2 relative top-4 
                ${isCompleted ? 'border-green-600' : 'border-gray-300'}`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
