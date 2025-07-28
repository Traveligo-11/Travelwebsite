import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Main Pages
import Home from './Pages/Home';
import Flights from './Pages/Flights';
import Hotels from './Pages/Hotels';
import Holidays from './Pages/Holidays';
import Trains from './Pages/Trains';
import Cabs from './Pages/Cabs';


// Components
import Navbar from './Components/Navbar';
import About from "./Footer/About.jsx";

// Footer Pages (all renamed to PascalCase)
import About from './Footer/About';
import Careers from './Footer/Careers';
import Blog from './Footer/Blog';
import Investors from './Footer/Investors';
import TravelAgents from './Footer/TravelAgents';
import FAQs from './Footer/FAQs';
import PrivacyPolicy from './Footer/privacy';
import TermsOfUse from './Footer/terms';
import Feedback from './Footer/Feedback';
import InternationalFlights from './Footer/internationalflights';
import InternationalHotels from './Footer/Internationalhotels';
import HolidayPackages from './Footer/HolidayPackages';
import DealsOffers from './Footer/DealsOffers';
import BusinessTravel from './Footer/BusinessTravel';
import GiftCards from './Footer/GiftCards';
import TravelGuide from './Footer/TravelGuide';
import CorporateTravel from './Footer/CorporateTravel';
import ContactUs from './Footer/contact';
import BookingPolicy from './Footer/policy';
import HimachalManaliPackages from './Footer/Himachal'
import RajasthanPackages from './Footer/Rajasthan'
import GoaPackages from './Footer/Goa'
import KeralaPackages from './Footer/Kerala'
import DubaiPackages from './Footer/Dubai'
import BaliPackages from './Footer/Bali'
import ThailandPackages from './Footer/Thailand'
import KashmirPackage from './Footer/kashmir'
import LadakhAdventures from './Footer/ladkah'
import HoneymoonSpecials from './Footer/honeymoon'
import GangtokDargelling from './Footer/GangtokDargelling'
import Ourteam from './Footer/team'
import Testimonials from './Footer/Testimonials'
import LoginModal from './Components/LoginModal';
import Gallery from './Footer/Gallery'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Main Routes */}
            <Route path="/Home" element={<Home />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/holidays" element={<Holidays />} />
            <Route path="/trains" element={<Trains />} />
            <Route path="/cabs" element={<Cabs />} />
         
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
            <Route path="/internationalflights" element={<InternationalFlights />} />
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
            <Route path="/Goa" element={<GoaPackages />} />
            <Route path="/Kerala" element={<KeralaPackages />} />
            <Route path="/Dubai" element={<DubaiPackages />} />
            <Route path="/Bali" element={<BaliPackages />} />
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