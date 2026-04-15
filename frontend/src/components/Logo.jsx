import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to='/' className='flex items-center gap-2 text-xl font-bold text-orange-600'>
      <span className='bg-orange-500 text-white px-2 py-1 rounded-lg'>??</span>
      <span>FoodExpress</span>
    </Link>
  );
};

export default Logo;
