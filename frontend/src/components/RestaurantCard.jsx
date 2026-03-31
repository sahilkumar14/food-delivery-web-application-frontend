const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">

      <img
        src={restaurant.image}
        className="w-full h-40 object-cover"
      />

      <div className="p-4 space-y-2">

        <h3 className="text-lg font-medium">
          {restaurant.name}
        </h3>

        <p className="text-sm text-muted-foreground">
          {restaurant.cuisine}
        </p>

        <div className="flex justify-between text-sm">

          <span>⭐ {restaurant.rating}</span>

          <span>{restaurant.time}</span>

          <span>{restaurant.price}</span>

        </div>

      </div>

    </div>
  );
};

export default RestaurantCard;