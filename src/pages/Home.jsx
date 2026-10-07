import Hero from '../components/sections/Hero.jsx'
import AboutStore from '../components/sections/AboutStore.jsx'
import Categories from '../components/sections/Categories.jsx'
import FeaturedProducts from '../components/sections/FeaturedProducts.jsx'
import WeeklyOffers from '../components/sections/WeeklyOffers.jsx'
import NewVsUsed from '../components/sections/NewVsUsed.jsx'
import BrandSection from '../components/sections/BrandSection.jsx'
import BenefitsStrip from '../components/sections/BenefitsStrip.jsx'
import WhatsAppCTA from '../components/sections/WhatsAppCTA.jsx'
import Newsletter from '../components/sections/Newsletter.jsx'
export default function Home() {
  return (<main><Hero /><Categories /><FeaturedProducts /><WeeklyOffers /><NewVsUsed /><AboutStore /><BrandSection /><BenefitsStrip /><WhatsAppCTA /><Newsletter /></main>)
}
