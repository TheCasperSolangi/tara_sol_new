// app/components/SecurePaymentSection.jsx
"use client";

import { useLocalization } from "../context/LocalizationContext";
import Image from "next/image";

const paymentLogos = [
  { src: "/assets/brands/AMEX_logo.png", alt: "American Express" },
  { src: "/assets/brands/Mastercard_logo.png", alt: "Mastercard" },
  { src: "/assets/brands/Visa_logo.png", alt: "Visa" },
  { src: "/assets/brands/BAC_logo.png", alt: "BAC" },
  { src: "/assets/brands/Diners_Club_Logo3.svg", alt: "Diners Club" },
  { src: "/assets/brands/Discover_logo.jpg", alt: "Discover" },
];

export function SecurePaymentSection() {
  const { t } = useLocalization();

  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-4">{t('securePaymentTitle')}</h2>
        <p className="text-center mb-6">
          {t('securePaymentDesc')}
        </p>

        <div className="flex justify-center items-center flex-wrap gap-8">
          {paymentLogos.map((logo, index) => (
            <div 
              key={index}
              className="transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={100}
                height={50}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}