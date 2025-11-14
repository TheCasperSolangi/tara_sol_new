// app/components/SecurePaymentSection.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocalization } from "../context/LocalizationContext";

const paymentLogos = [
  { src: "/assets/brands/AMEX_logo.png", alt: "American Express" },
  { src: "/assets/brands/Mastercard_logo.png", alt: "Mastercard" },
  { src: "/assets/brands/Visa_logo.png", alt: "Visa" },
  { src: "/assets/brands/BAC_logo.png", alt: "BAC" },
  { src: "/assets/brands/Diners_Club_Logo3.svg", alt: "Diners Club" },
  { src: "/assets/brands/Discover_logo.jpg", alt: "Discover" },
];

export function SecurePaymentSection() {
    const {t} = useLocalization();
  const containerRef = useRef(null);
  const [numDuplicates, setNumDuplicates] = useState(2);

  useEffect(() => {
    const calculateDuplicates = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const logoWidth = 100;
        const marginX = 16; // Tailwind mx-4
        const perLogoSpace = logoWidth + 2 * marginX;
        const setWidth = paymentLogos.length * perLogoSpace;
        const minCopies = Math.ceil((containerWidth + setWidth) / setWidth);
        setNumDuplicates(Math.max(minCopies, 2));
      }
    };

    calculateDuplicates();
    window.addEventListener("resize", calculateDuplicates);
    return () => window.removeEventListener("resize", calculateDuplicates);
  }, []);

  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-4">{t('securePaymentTitle')}</h2>
        <p className="text-center mb-6">
         {t('securePaymentDesc')}
        </p>

        <div ref={containerRef} className="overflow-hidden relative h-16">
          <div
            className="flex animate-marquee whitespace-nowrap"
            style={{ "--translate-end": `-${100 / numDuplicates}%` }}
          >
            {Array.from({ length: numDuplicates }).map((_, dupIndex) =>
              paymentLogos.map((logo, index) => (
                <div key={`${dupIndex}-${index}`} className="mx-4 flex-shrink-0">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={100}
                    height={50}
                    className="object-contain"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
