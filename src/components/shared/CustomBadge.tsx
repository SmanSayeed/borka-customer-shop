const CustomBadge = ({ text }: { text: string }) => {
  return (
    <div className='flex items-center gap-2 mb-3'>
      <span>✨</span>
      <h3 className='text-primary text-lg font-semibold'>{text}</h3>
    </div>
  );
};

export default CustomBadge;
