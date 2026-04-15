import React from 'react'

const cards = [
  {
    title: 'Easy Ordering',
    description: 'Search, select, and checkout in seconds. Our website makes finding your favorite meals effortless.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
  },
  {
    title: 'Real-Time Tracking',
    description: 'Track your order from kitchen to doorstep with live updates and estimated arrival time.',
    image: 'https://plus.unsplash.com/premium_photo-1681487829842-2aeff98f8b63?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJlYWwlMjB0aW1lJTIwdHJhY2tpbmclMjBvcmRlcnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    title: 'Top Restaurants',
    description: 'Partnered with the best local restaurants to bring you diverse cuisine and top-quality food.',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D',
  },
]

const Section02 = () => {
  return (
    <section className='w-full min-h-[120vh] bg-white flex items-center py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
        <div className='text-center mb-10'>
          <h2 className='text-4xl md:text-5xl font-extrabold text-gray-800'>Experience the Best</h2>
          <p className='mt-4 text-gray-600 max-w-2xl mx-auto'>From browsing to delivery, this site is built to give you a fast, trustworthy, and delightful food ordering journey.</p>
        </div>

        <div className='flex md:grid md:grid-cols-3 gap-6 md:overflow-visible overflow-x-auto pb-2 scroll-smooth -mx-4 px-4 md:px-0 snap-x snap-mandatory'>
          {cards.map((card) => (
            <article key={card.title} className='snap-center min-w-[280px] md:min-w-0 group relative rounded-3xl border border-orange-100 bg-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 hover:scale-102 flex-shrink-0 hover:border-orange-500'>
              <div className='h-52 overflow-hidden'>
                <img
                  src={`${card.image}?auto=format&fit=crop&w=800&q=80`}
                  alt={card.title}
                  className='w-full h-full object-cover transition duration-700 ease-in-out group-hover:scale-110'
                />
              </div>
              <div className='p-6'>
                <h3 className='text-xl font-bold text-orange-600'>{card.title}</h3>
                <p className='mt-3 text-gray-600 leading-relaxed'>{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Section02