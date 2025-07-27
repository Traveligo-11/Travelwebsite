import HeroSearch from '../Components/HeroSearch';
import { useState } from 'react';

const Cabs = () => {
  const [activeTab, setActiveTab] = useState('cabs');
  const [sortBy, setSortBy] = useState('price');

  const cabs = [
    {
      id: 1,
      type: 'Sedan',
      name: 'Swift Dzire',
      capacity: 4,
      price: 12,
      priceUnit: 'per km',
      estimatedPrice: 1200,
      image: 'https://images.unsplash.com/photo-1549317661-bd32b8e9f7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 2,
      type: 'SUV',
      name: 'Toyota Innova',
      capacity: 7,
      price: 18,
      priceUnit: 'per km',
      estimatedPrice: 1800,
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 3,
      type: 'Luxury',
      name: 'Mercedes E-Class',
      capacity: 4,
      price: 30,
      priceUnit: 'per km',
      estimatedPrice: 3000,
      image: 'https://images.unsplash.com/photo-1547038577-da80abbc4f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 4,
      type: 'Mini',
      name: 'Alto',
      capacity: 3,
      price: 10,
      priceUnit: 'per km',
      estimatedPrice: 1000,
      image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 5,
      type: 'Prime Sedan',
      name: 'Honda City',
      capacity: 4,
      price: 15,
      priceUnit: 'per km',
      estimatedPrice: 1500,
      image: 'https://images.unsplash.com/photo-1547038577-da80abbc4f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  const sortedCabs = [...cabs].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'capacity') return b.capacity - a.capacity;
    return 0;
  });

  return (
    <div>
      <HeroSearch activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Cabs in Delhi</h1>
          <div className="flex items-center">
            <span className="mr-2">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded p-2"
            >
              <option value="price">Price</option>
              <option value="capacity">Capacity</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCabs.map((cab) => (
            <div key={cab.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src={cab.image}
                  alt={cab.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{cab.name}</h3>
                    <p className="text-gray-600">{cab.type}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {cab.capacity} Seater
                  </span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-gray-700 font-bold">₹{cab.price} <span className="text-gray-500 font-normal">{cab.priceUnit}</span></p>
                    <p className="text-sm text-gray-500">Approx ₹{cab.estimatedPrice} for 100km</p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cabs;