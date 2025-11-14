import CertificationsSection from "../components/CertificationSection";
import Courses from "../components/Courses";
import FAQSection from "../components/FAQSection";
import FeaturesSection from "../components/FeaturesSection";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import PartnersSection from "../components/PartnersSection";
import { SecurePaymentSection } from "../components/SecurePaymentSection";
import StepsSection from "../components/StepsSection";
import FeedbackSection from "../components/VideoSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <HeroSection />
    <FeaturesSection />
    <FeedbackSection />
    <PartnersSection />
    <CertificationsSection />
    <StepsSection />
    <FAQSection />
    <SecurePaymentSection />
  
    </>
  );
}
