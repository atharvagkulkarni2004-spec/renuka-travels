import React, { useState } from 'react'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Form State (Yahan default selection update kiya hai)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    selection: 'Toyota Innova Crysta (Outstation Trip)',
    date: ''
  });

  // Validation Errors State
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle');

  // Form Validation Logic
  const validateForm = () => {
    let newErrors = {};

    if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    if (!formData.date) {
      newErrors.date = "Please select a travel date";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
      if (selectedDate < today) {
        newErrors.date = "Travel date cannot be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Backend API par data bhejne wala function
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return; 
    }

    setSubmitStatus('loading'); 
    
    try {
      const response = await fetch('http://127.0.0.1:5000/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        // Form clear karte waqt wapas default combo set karna
        setFormData({ name: '', phone: '', selection: 'Toyota Innova Crysta (Outstation Trip)', date: '' });
        setErrors({});
        
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Backend connect nahi ho paya:", error);
      setSubmitStatus('error');
    }
  };

  // Fleet Data
  const fleet = [
    { name: "Toyota Innova Crysta", type: "Premium SUV", seats: "6+1 Seats", luggage: "Large Luggage", img: "/innovacrystajpg.jpg", alt: "Toyota Innova Crysta for rent in Chhatrapati Sambhajinagar" },
    { name: "Suzuki Dzire", type: "Executive Sedan", seats: "4+1 Seats", luggage: "Medium Luggage", img: "/dzire.jpg", alt: "Suzuki Dzire cab service for Ajanta Caves" },
    { name: "Innova Hycross", type: "Premium SUV", seats: "6+1 Seats", luggage: "Large Luggage", img: "/hycross.jpg", alt: "Innova Hycross premium outstation rental" }
  ];
  // Packages Data with Images
  const packages = [
    { id: 1, title: "Ajanta & Ellora Heritage Tour", duration: "1 to 2 Days", desc: "Complete guided tour of the world-famous UNESCO heritage sites. Comfortable ride with AC and experienced local driver.", img: "/ellora.jpg" },
    { id: 2, title: "Chhatrapati Sambhajinagar Darshan", duration: "Full Day", desc: "Local sightseeing including Bibi Ka Maqbara, Daulatabad Fort, Panchakki, and Grishneshwar Temple.", img: "/bibikamaqbara.jpg" },
    { id: 3, title: "Outstation & Airport Drops", duration: "Flexible", desc: "One-way and round trips to Pune, Mumbai, Shirdi, or anywhere in India with our premium fleet.", img: "/outstation.jpg" }
  ];

  return (
    <main className="bg-gray-50 min-h-screen font-sans">
      
      {/* ================= NAVBAR ================= */}
      <nav className="fixed w-full z-50 bg-black/40 backdrop-blur-lg border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white tracking-wide cursor-pointer">
            Renuka <span className="text-blue-400">Travels</span>
          </div>
          <div className="hidden md:flex space-x-8 text-gray-200 font-medium items-center">
            <a href="#" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#fleet" className="hover:text-blue-400 transition-colors">Fleet</a>
            <a href="#packages" className="hover:text-blue-400 transition-colors">Packages</a>
            <a href="#contact-info" className="hover:text-blue-400 transition-colors">Contact</a>
            <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all shadow-lg shadow-blue-500/30">Book Now</a>
          </div>
          <button className="md:hidden text-white text-3xl focus:outline-none pb-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-xl border-b border-white/10 absolute top-full left-0 w-full shadow-2xl transition-all">
            <div className="flex flex-col items-center py-6 space-y-6 text-lg font-medium text-gray-200">
              <a href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-400 w-full text-center">Home</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-400 w-full text-center">About</a>
              <a href="#fleet" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-400 w-full text-center">Fleet</a>
              <a href="#packages" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-400 w-full text-center">Packages</a>
              <a href="#contact-info" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-400 w-full text-center">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* ================= HERO SECTION & ENQUIRY FORM ================= */}
      <header className="min-h-screen bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-screen px-8 md:px-24 py-12 pt-28">
          
          <div className="text-white lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Best Cab Service in <br/>
              <span className="text-blue-400">Chhatrapati Sambhajinagar</span>
            </h1>
            <p className="text-base md:text-lg text-gray-300 md:w-4/5 font-medium mx-auto lg:mx-0">
              Renuka Tours And Travels offers premium car rentals from <strong className="text-white">Chhatrapati Sambhajinagar to all over Maharashtra and India</strong>. Specialized tour packages also available for Ellora Caves and Ajanta Caves.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <a href="#packages" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-blue-500/30 text-center">View Packages</a>
              <a href="#contact-info" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center">Contact Details</a>
            </div>
          </div>

          <div className="lg:w-1/3 w-full mt-12 lg:mt-0" id="contact">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 md:p-8 rounded-2xl shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Enquire For Your Trip</h2>
              
              <form className="space-y-4" onSubmit={handleFormSubmit} noValidate>
                
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Your Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={`w-full bg-white/10 border ${errors.name ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all`} placeholder="Enter your name" />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Phone Number</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className={`w-full bg-white/10 border ${errors.phone ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all`} placeholder="10-digit mobile number" />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
                
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Select Car/Package</label>
                 <div>
                  
                  <select value={formData.selection} onChange={(e) => setFormData({...formData, selection: e.target.value})} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400 [&>option]:text-black">
                    
                    {/* --- TOYOTA INNOVA CRYSTA OPTIONS --- */}
                    <option value="Toyota Innova Crysta (Outstation Trip)">Toyota Innova Crysta (Outstation Trip)</option>
                    <option value="Toyota Innova Crysta (Ajanta & Ellora Package)">Toyota Innova Crysta (Ajanta & Ellora Package)</option>
                    <option value="Toyota Innova Crysta (Chhatrapati Sambhajinagar Darshan)">Toyota Innova Crysta (Chhatrapati Sambhajinagar Darshan)</option>
                    <option value="Toyota Innova Crysta (Shirdi Darshan)">Toyota Innova Crysta (Shirdi Darshan)</option>
                    
                    {/* --- SUZUKI DZIRE OPTIONS --- */}
                    <option value="Suzuki Dzire (Outstation Trip)">Suzuki Dzire (Outstation Trip)</option>
                    <option value="Suzuki Dzire (Ajanta & Ellora Package)">Suzuki Dzire (Ajanta & Ellora Package)</option>
                    <option value="Suzuki Dzire (Chhatrapati Sambhajinagar Darshan)">Suzuki Dzire (Chhatrapati Sambhajinagar Darshan)</option>
                    <option value="Suzuki Dzire (Shirdi Darshan)">Suzuki Dzire (Shirdi Darshan)</option>
                    
                    {/* --- INNOVA HYCROSS OPTIONS --- */}
                    <option value="Innova Hycross (Outstation Trip)">Innova Hycross (Outstation Trip)</option>
                    <option value="Innova Hycross (Ajanta & Ellora Darshan)">Innova Hycross (Ajanta & Ellora Darshan)</option>
                    <option value="Innova Hycross (Chhatrapati Sambhajinagar Darshan)">Innova Hycross (Chhatrapati Sambhajinagar Darshan)</option>
                    <option value="Innova Hycross (Shirdi Darshan)">Innova Hycross (Shirdi Darshan)</option>
                    
                  </select>
                </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Travel Date</label>
                  <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className={`w-full bg-white/10 border ${errors.date ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all [color-scheme:dark]`} />
                  {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
                </div>
                
                <button 
                  type="submit" 
                  disabled={submitStatus === 'loading' || submitStatus === 'success'}
                  className={`w-full font-bold py-3 rounded-lg transition-all mt-6 shadow-lg flex items-center justify-center gap-2
                    ${submitStatus === 'idle' ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30' : ''}
                    ${submitStatus === 'loading' ? 'bg-blue-400 text-white cursor-not-allowed' : ''}
                    ${submitStatus === 'success' ? 'bg-green-500 text-white shadow-green-500/30' : ''}
                    ${submitStatus === 'error' ? 'bg-red-500 text-white shadow-red-500/30' : ''}
                  `}
                >
                  {submitStatus === 'idle' && 'Get a Free Quote'}
                  {submitStatus === 'loading' && 'Sending Request...'}
                  {submitStatus === 'success' && '✓ Enquiry Sent!'}
                  {submitStatus === 'error' && '✕ Server Error, Try Again'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">About Renuka Travels</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">Based in the historical city of Chhatrapati Sambhajinagar, Renuka Tours And Travels has been a trusted name in premium car rentals and curated tour packages for years.</p>
            <p className="text-lg text-gray-600 leading-relaxed">Whether you are planning a local sightseeing trip, a heritage tour to the world-famous Ajanta & Ellora Caves, or a long-distance outstation journey anywhere in Maharashtra or India, our well-maintained fleet and highly professional drivers ensure your journey is safe, comfortable, and memorable.</p>
          </div>
          <div className="md:w-1/2 w-full">
            <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070" alt="Premium cab driving on highway" className="rounded-2xl shadow-2xl w-full h-80 object-cover" />
          </div>
        </div>
      </section>

      {/* ================= OUR FLEET SECTION ================= */}
      <section id="fleet" className="bg-gray-50 max-w-7xl mx-auto px-6 md:px-8 py-20 scroll-mt-20">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Our Premium Fleet</h2>
          <p className="text-base md:text-lg text-gray-600">Reliable and comfortable cabs for local sightseeing and pan-India outstation trips.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {fleet.map((car, index) => (
            <article key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">
              <div className="h-56 md:h-64 overflow-hidden"><img src={car.img} alt={car.alt} className="w-full h-full object-cover" /></div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{car.name}</h3>
                <p className="text-blue-600 font-semibold mb-6">{car.type}</p>
                <div className="space-y-3 mb-8 flex-1">
                  <div className="flex items-center text-gray-600"><span className="text-xl mr-3">👤</span> <span className="font-medium">{car.seats}</span></div>
                  <div className="flex items-center text-gray-600"><span className="text-xl mr-3">🧳</span> <span className="font-medium">{car.luggage}</span></div>
                </div>
                <a href="#contact" className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3.5 rounded-xl transition-all shadow-md mt-auto text-center block">Book {car.name.split(' ').pop()}</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= PACKAGES SECTION ================= */}
      <section id="packages" className="bg-white py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Popular Tour Packages</h2>
            <p className="text-base md:text-lg text-gray-600">Specially curated trips to give you the best experience of Maharashtra.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-gray-50 rounded-2xl shadow-lg border border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col">
                <div className="h-48 overflow-hidden"><img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /></div>
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{pkg.title}</h3>
                  <div className="mb-4"><span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">⏱️ {pkg.duration}</span></div>
                  <p className="text-gray-600 mb-8 leading-relaxed flex-1">{pkg.desc}</p>
                  <a href="#contact" className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-2 mt-auto">Enquire Now <span>→</span></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT INFO SECTION ================= */}
      <section id="contact-info" className="bg-gray-100 py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600">We are available 24/7 for your local and outstation travel needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition-all border border-gray-100">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Office</h3>
              <p className="text-gray-600">Chhatrapati Sambhajinagar,<br/> Maharashtra, India</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition-all border border-gray-100">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Phone Number</h3>
              <p className="text-gray-600 font-medium">+91 8421496211<br/><span className="text-sm font-normal">(Call or WhatsApp)</span></p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition-all border border-gray-100">
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Address</h3>
              <p className="text-gray-600 font-medium">atharvagkulkarni2004@gmail.com<br/><span className="text-sm font-normal">24/7 Online Support</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MEGA FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-white text-2xl font-bold mb-6">Renuka <span className="text-blue-400">Travels</span></h3>
            <p className="text-sm leading-relaxed mb-6">Your most reliable and comfortable travel partner. Specializing in Ajanta & Ellora heritage tours and pan-India outstation cab services.</p>
          </div>
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#fleet" className="hover:text-blue-400 transition-colors">Our Premium Fleet</a></li>
              <li><a href="#packages" className="hover:text-blue-400 transition-colors">Tour Packages</a></li>
              <li><a href="#contact-info" className="hover:text-blue-400 transition-colors">Contact Details</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Popular Services</h3>
            <ul className="space-y-3">
              <li>Ajanta & Ellora Caves Tour</li>
              <li>Local City Darshan</li>
              <li>Airport Drop & Pickup</li>
              <li>Maharashtra Outstation Cabs</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:items-center">
          <p className="text-sm text-gray-500">© 2026 Renuka Tours And Travels. All rights reserved.</p>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">Based in Chhatrapati Sambhajinagar, Maharashtra</p>
        </div>
      </footer>
      {/* ================= WHATSAPP FLOATING BUTTON ================= */}
      <a 
        href="https://wa.me/918421496211?ext=Hi%20Renuka%20Travels,%20I%20visited%20your%20website.%20I%20want%20to%20book%20a%20cab/package.%20Can%20we%20discuss%20the%20details?"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl z-50 flex items-center justify-center transition-transform hover:scale-110 animate-bounce border-2 border-white"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.015c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>

    </main>
  )
}

export default App 