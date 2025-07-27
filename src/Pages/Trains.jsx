import HeroSearch from '../Components/HeroSearch';
import { useState } from 'react';

const Trains = () => {
  const [activeTab, setActiveTab] = useState('trains');
  const [sortBy, setSortBy] = useState('departure');

  const trains = [
    {
      id: 1,
      name: 'Rajdhani Express',
      number: '12951',
      departure: '16:35',
      arrival: '08:25',
      from: 'NDLS',
      to: 'BCT',
      duration: '15h 50m',
      price: 1890,
      classes: ['1A', '2A', '3A']
    },
    {
      id: 2,
      name: 'Shatabdi Express',
      number: '12009',
      departure: '06:00',
      arrival: '13:25',
      from: 'NDLS',
      to: 'BCT',
      duration: '7h 25m',
      price: 1490,
      classes: ['CC', 'EC']
    },
    {
      id: 3,
      name: 'Duronto Express',
      number: '12215',
      departure: '23:00',
      arrival: '14:30',
      from: 'NDLS',
      to: 'BCT',
      duration: '15h 30m',
      price: 1750,
      classes: ['1A', '2A', '3A']
    },
    {
      id: 4,
      name: 'Garib Rath',
      number: '12933',
      departure: '21:45',
      arrival: '11:30',
      from: 'NDLS',
      to: 'BCT',
      duration: '13h 45m',
      price: 990,
      classes: ['3A']
    },
    {
      id: 5,
      name: 'August Kranti Rajdhani',
      number: '12953',
      departure: '17:00',
      arrival: '09:05',
      from: 'NDLS',
      to: 'BCT',
      duration: '16h 5m',
      price: 1950,
      classes: ['1A', '2A', '3A']
    }
  ];

  const sortedTrains = [...trains].sort((a, b) => {
    if (sortBy === 'departure') return a.departure.localeCompare(b.departure);
    if (sortBy === 'duration') return a.duration.localeCompare(b.duration);
    if (sortBy === 'price') return a.price - b.price;
    return 0;
  });

  return (
    <div>
      <HeroSearch activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Trains from Delhi to Mumbai</h1>
          <div className="flex items-center">
            <span className="mr-2">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded p-2"
            >
              <option value="departure">Departure Time</option>
              <option value="duration">Duration</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Train</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedTrains.map((train) => (
                <tr key={train.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{train.name}</div>
                    <div className="text-sm text-gray-500">{train.number}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{train.departure}</div>
                    <div className="text-sm text-gray-500">{train.from}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{train.arrival}</div>
                    <div className="text-sm text-gray-500">{train.to}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {train.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-1">
                      {train.classes.map((cls) => (
                        <span key={cls} className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                          {cls}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    ₹{train.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">
                      Book Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Trains;