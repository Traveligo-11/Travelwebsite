import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
// Main Pages
import Home from './Pages/Home';
import Flights from './Pages/Flights';
import Hotels from './Pages/Hotels';
import Holidays from './Pages/Holidays';
import Trains from './Pages/Trains'
import Cabs from './Pages/Cabs';


// Components
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

// Footer Pages (all renamed to PascalCase)
import About from './Footer/about.jsx';
import Careers from './Footer/careers.jsx';
import Blog from './Footer/blog.jsx';
import Investors from './Footer/investors.jsx';
import TravelAgents from './Footer/travelagents.jsx';
import FAQs from './Footer/faqs.jsx';
import PrivacyPolicy from './Footer/privacy.jsx';
import TermsOfUse from './Footer/terms.jsx';
import Feedback from './Footer/feedback.jsx';
import InternationalHotels from './Footer/internationalhotels.jsx';
import HolidayPackages from './Footer/HolidayPackages.jsx';
import DealsOffers from './Footer/DealsOffers.jsx';
import BusinessTravel from './Footer/BusinessTravel.jsx';
import GiftCards from './Footer/giftcards.jsx';
import TravelGuide from './Footer/travelguide.jsx';
import CorporateTravel from './Footer/corporatetravel.jsx';
import ContactUs from './Footer/contact.jsx';
import BookingPolicy from './Footer/policy.jsx';
import HimachalManaliPackages from './Footer/Himachal.jsx'
import RajasthanPackages from './Footer/Rajasthan.jsx'
import Goa from './Footer/Goa.jsx'
import Kerala from './Footer/Kerala.jsx'
import Dubai from './Footer/Dubai.jsx'
import Bali from './Footer/Bali.jsx'
import ThailandPackages from './Footer/Thailand.jsx'
import KashmirPackage from './Footer/kashmir.jsx'
import LadakhAdventures from './Footer/ladkah.jsx'
import HoneymoonSpecials from './Footer/honeymoon.jsx'
import GangtokDargelling from './Footer/GangtokDargelling.jsx'
import Ourteam from './Footer/team.jsx'
import Testimonials from './Footer/Testimonials.jsx'
import LoginModal from './Components/LoginModal.jsx';
import Gallery from './Footer/Gallery.jsx'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Main Routes */}
             <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/holidays" element={<Holidays />} />
            <Route path="/Trains" element={<Trains />} />
            <Route path="/Cabs" element={<Cabs />} />
         
            {/* Footer Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/Gallery" element={<Gallery />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/travel-agents" element={<TravelAgents />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/internationalhotels" element={<InternationalHotels />} />
            <Route path="/holiday-packages" element={<HolidayPackages />} />
            <Route path="/deals-offers" element={<DealsOffers />} />
            <Route path="/business-travel" element={<BusinessTravel />} />
            <Route path="/gift-cards" element={<GiftCards />} />
            <Route path="/travel-guide" element={<TravelGuide />} />
            <Route path="/corporate-travel" element={<CorporateTravel />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/policy" element={<BookingPolicy />} />
            <Route path="/Himachal" element={<HimachalManaliPackages />} />
            <Route path="/Rajasthan" element={<RajasthanPackages />} />
            <Route path="/Goa" element={<Goa />} />
            <Route path="/Kerala" element={<Kerala />} />
            <Route path="/Dubai" element={<Dubai/>} />
            <Route path="/Bali" element={<Bali />} />
            <Route path="/Thailand" element={<ThailandPackages />} />
            <Route path="/kashmir" element={<KashmirPackage />} />
            <Route path="/ladakh" element={<LadakhAdventures />} />
            <Route path="/honeymoon" element={<HoneymoonSpecials />} />
            <Route path="/team" element={<Ourteam />} />
            <Route path="/GangtokDargelling" element={<GangtokDargelling />} />
            <Route path="/Testimonials" element={<Testimonials />} /> 
            <Route path="/LoginModal" element={<LoginModal />} />
       
           

          </Routes>
          
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;