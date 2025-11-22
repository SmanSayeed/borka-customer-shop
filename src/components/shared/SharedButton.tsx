const SharedButton = ({ text, icon }) => {
  return (
    <button className='group relative inline-flex h-12 items-center justify-center rounded-full bg-[#bda752] py-1 pl-6 pr-14 font-medium text-neutral-50'>
      <span className='z-10 pr-2'>{text}</span>
      <div className='absolute right-1 inline-flex h-10 w-10 items-center justify-end rounded-full bg-[#af9545] transition-[width] group-hover:w-[calc(100%-8px)]'>
        <div className='mr-3.5 flex items-center justify-center'>{icon}</div>
      </div>
    </button>
  );
};

export default SharedButton;
