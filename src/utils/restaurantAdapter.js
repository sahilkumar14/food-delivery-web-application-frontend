const defaultImage =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'

const flattenMenu = (menu = []) =>
  menu.flatMap((section, sectionIndex) =>
    (section.items || []).map((item, itemIndex) => ({
      id: item._id || `${sectionIndex}-${itemIndex}-${item.itemName}`,
      name: item.itemName,
      price: item.price,
      description: item.description || 'Freshly prepared item',
      category: section.category || 'Menu',
    }))
  )

export const adaptRestaurant = (restaurant) => {
  const menuItems = flattenMenu(restaurant.menu)
  const firstPrice = menuItems[0]?.price

  return {
    ...restaurant,
    id: restaurant._id,
    restaurantId: restaurant._id,
    image: restaurant.image || defaultImage,
    cuisine: restaurant.location || 'Fresh menu',
    category: 'all',
    rating: restaurant.rating || 4.5,
    time: restaurant.time || '25-35 min',
    price: firstPrice ? `Rs.${firstPrice}` : 'Rs.199',
    menu: menuItems,
  }
}
