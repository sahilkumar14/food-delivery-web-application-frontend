import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="block">
      <div className="bg-white border border-orange-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition hover:border-orange-500">

        <img
          src={restaurant.image}
          className="w-full h-40 object-cover"
        />

        <div className="p-4 space-y-2">

          <h3 className="text-lg font-medium text-gray-800">
            {restaurant.name}
          </h3>

          <p className="text-sm text-gray-600">
            {restaurant.cuisine}
          </p>

          <div className="flex justify-between text-sm text-gray-600">

            <span>⭐ {restaurant.rating}</span>

            <span>{restaurant.time}</span>

            <span>{restaurant.price}</span>

          </div>

        </div>

      </div>
    </Link>
  );
};

export default RestaurantCard;