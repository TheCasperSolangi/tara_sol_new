"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  MapPin,
  Phone,
  Mail,
  User,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Clock,
  Send,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useLocalization } from "../context/LocalizationContext";
import { WhatsappIcon } from "./icons/WhatsappIcon";

export default function ContactPage() {
  const { t } = useLocalization();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        setTimeout(() => {
          setSubmitStatus("idle");
        }, 5000);
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              {t("contactHeroTitle")}
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              {t("contactHeroDescription")}
            </p>
            <div className="flex items-center justify-center space-x-2 text-blue-200">
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
              <span>{t("responseTime")}</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* Contact Section */}
      <section className="py-20 -mt-8 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-all duration-500">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {t("getInTouch")}
                </h2>
                <p className="text-gray-600 mb-8">{t("getInTouchDescription")}</p>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                    <div className="bg-blue-100 p-3 rounded-2xl mr-4 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300">
                      <MapPin className="w-6 h-6 text-blue-600 group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t("ourOffice")}</h3>
                      <p className="text-gray-600 mt-1">{t("officeAddress")}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                    <div className="bg-green-100 p-3 rounded-2xl mr-4 group-hover:bg-green-500 group-hover:scale-110 transition-all duration-300">
                      <Phone className="w-6 h-6 text-green-600 group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t("phoneNumbers")}</h3>
                      <p className="text-gray-600 mt-1">{t("phoneDetails")}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                    <div className="bg-red-100 p-3 rounded-2xl mr-4 group-hover:bg-red-500 group-hover:scale-110 transition-all duration-300">
                      <Mail className="w-6 h-6 text-red-600 group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t("emailAddress")}</h3>
                      <p className="text-gray-600 mt-1">{t("emailDetails")}</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">{t("followUs")}</h3>
                  <div className="flex space-x-4">
                    {[
                      {
                        icon: Instagram,
                        color: "hover:bg-pink-500",
                        href: "https://instagram.com/tara_solutions?igshid=OGQ5ZDc2ODk2ZA==",
                      },
                      {
                        icon: Facebook,
                        color: "hover:bg-blue-500",
                        href: "https://www.facebook.com/profile.php?id=61552120787685&mibextid=LQQJ4d",
                      },
                      
                      {
                        icon: Linkedin,
                        color: "hover:bg-blue-700",
                        href: "https://www.linkedin.com/company/tarasolutions-cr/",
                      },
                    ].map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className={`bg-gray-100 p-3 rounded-2xl text-gray-600 hover:text-white transform hover:scale-110 transition-all duration-300 ${item.color}`}
                      >
                        <item.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{t("supportAvailable")}</div>
                  <div className="text-sm text-gray-600">{t("support")}</div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
                  <div className="text-2xl font-bold text-green-600 mb-1">{t("avgResponseTime")}</div>
                  <div className="text-sm text-gray-600">{t("responseTimeLabel")}</div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                  {t("sendMessage")}
                </h2>
                <p className="text-gray-600">{t("sendMessageDescription")}</p>
              </div>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start space-x-3 animate-in slide-in-from-top">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900">Message Sent Successfully!</h4>
                    <p className="text-sm text-green-700 mt-1">
                      We've received your message and sent a confirmation to your email. We'll get
                      back to you shortly!
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 animate-in slide-in-from-top">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-900">Error Sending Message</h4>
                    <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {/* Inputs */}
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {t("personalInformation")}
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-all duration-300 bg-gray-50/50"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder={t("fullName")}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-all duration-300 bg-gray-50/50"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t("emailAddress")}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-all duration-300 bg-gray-50/50"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={t("phoneNumber")}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-all duration-300 bg-gray-50/50"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder={t("subject")}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="group">
                  <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    {t("yourMessage")}
                  </h5>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t("messagePlaceholder")}
                    rows={6}
                    className="border-2 border-gray-200 rounded-xl focus:border-purple-500 transition-all duration-300 resize-none bg-gray-50/50 p-4"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                        {t("sendMessageButton")}
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t("visitOurCampus")}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t("campusDescription")}</p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 max-w-6xl mx-auto">
            <iframe
              className="w-full h-[500px]"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3124.0000000000005!2d-84.10800000000000!3d9.98200000000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0e85bb9f992dd%3A0x0000000000000000!2sAve%2013%20y%20Calle%207%2C%20San%20Jos%C3%A9%2C%20Costa%20Rica!5e0!3m2!1sen!2scr!4v0000000000000!5m2!1sen!2scr"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
