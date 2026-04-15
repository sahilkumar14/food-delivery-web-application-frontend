import React from 'react'

const highlights = [
  {
    title: 'Fast Delivery',
    text: 'Get your food in under 30 minutes with real-time router optimization and priority dispatch.',
    icon: '🚚',
  },
  {
    title: 'Fresh Quality',
    text: 'All meals are prepared to order with premium ingredients and strict quality checks.',
    icon: '🥗',
  },
  {
    title: 'Curated Choices',
    text: 'Personalized recommendations powered by your taste profile and order history.',
    icon: '✨',
  },
  {
    title: 'Secure Payments',
    text: 'Encrypted checkout with multiple payment methods and instant receipt tracking.',
    icon: '🔒',
  },
]

const Section03 = () => {
  return (
    <section className="w-full min-h-[110vh] bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800">Why Customers Love Us</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We combine speed, trust and variety to make food delivery a delightful experience for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm hover:shadow-xl transition-transform duration-500 hover:-translate-y-2 hover:border-orange-500"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-bold text-orange-600">{item.title}</h3>
              <p className="mt-2 text-gray-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Section03