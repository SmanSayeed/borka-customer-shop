'use client';

import { useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchableSelectProps {
  value: string;
  onChange: (value: string) => void;
  items: string[];
  placeholder?: string;
}

export default function SearchableSelect({
  value,
  onChange,
  items,
  placeholder = 'Select item',
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className='w-full flex items-center justify-between border rounded-md px-3 py-2 text-sm'>
        {value ? value : <span className='text-gray-500'>{placeholder}</span>}
        <ChevronsUpDown size={16} />
      </PopoverTrigger>

      <PopoverContent className='p-0 w-[var(--radix-popover-trigger-width)]'>
        <Command>
          <CommandInput placeholder='Search…' />

          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup className='max-h-[200px] overflow-y-auto'>
            {items.map((item) => (
              <CommandItem
                key={item}
                onSelect={() => {
                  onChange(item);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === item ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {item}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
