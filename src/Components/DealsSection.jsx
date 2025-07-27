const DealsSection = ({ title, deals }) => {
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {deals.map((deal, index) => (
          <div key={index} className="deal-card bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative h-48">
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-full object-cover"
              />
              {deal.discount && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                  {deal.discount} OFF
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{deal.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{deal.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-blue-600">₹{deal.price}</span>
                <span className="text-sm text-gray-500 line-through">₹{deal.originalPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DealsSection;