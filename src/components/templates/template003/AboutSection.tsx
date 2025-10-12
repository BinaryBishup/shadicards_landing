"use client";

import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import type { AboutData } from '@/types/wedding-template';

interface AboutSectionProps {
  data: AboutData;
  primaryColor?: string;
}

export default function AboutSection({ data, primaryColor = '#c084fc' }: AboutSectionProps) {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600&family=Poppins:wght@300;400;500&display=swap');

        .elegant-script {
          font-family: 'Cormorant Garamond', serif;
        }

        .serif-heading {
          font-family: 'Playfair Display', serif;
        }

        .body-text {
          font-family: 'Poppins', sans-serif;
        }

        @keyframes pulse-gentle {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }

        .pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }
      `}</style>

      <section className="relative py-20 md:py-32 px-4 bg-gradient-to-b from-white via-pink-50/20 to-white overflow-hidden">
        {/* Background Floral Decorations */}
        <div className="absolute top-20 left-0 w-64 h-64 opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="20" fill="#c084fc" />
            <circle cx="70" cy="80" r="30" fill="#e9d5ff" />
            <circle cx="130" cy="80" r="30" fill="#f8e7f5" />
            <circle cx="80" cy="120" r="25" fill="#fce7f3" />
            <circle cx="120" cy="120" r="25" fill="#e9d5ff" />
          </svg>
        </div>

        <div className="absolute bottom-20 right-0 w-64 h-64 opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="20" fill="#ec4899" />
            <circle cx="70" cy="80" r="30" fill="#f8e7f5" />
            <circle cx="130" cy="80" r="30" fill="#e9d5ff" />
            <circle cx="80" cy="120" r="25" fill="#fce7f3" />
            <circle cx="120" cy="120" r="25" fill="#f8e7f5" />
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
              <Heart className="w-5 h-5 text-pink-400" fill="currentColor" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent via-purple-300 to-transparent" />
            </div>
            <h2 className="elegant-script text-4xl md:text-5xl lg:text-6xl text-gray-700 mb-3">
              The Happy Couple
            </h2>
            <p className="body-text text-gray-500 text-sm tracking-wider">
              Two hearts, one beautiful journey
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-24">
            {/* Bride */}
            <div className="text-center max-w-md">
              <div className="relative mx-auto w-72 h-72 md:w-80 md:h-80 mb-8">
                {/* Floral Border Ring */}
                <div className="absolute -inset-6">
                  <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
                    <circle cx="200" cy="200" r="180" stroke="#f8e7f5" strokeWidth="2" fill="none" />
                    <circle cx="200" cy="200" r="190" stroke="#fce7f3" strokeWidth="1" fill="none" opacity="0.5" />
                    {/* Decorative flowers around border */}
                    {[...Array(8)].map((_, i) => {
                      const angle = (i * 45) * Math.PI / 180;
                      const x = 200 + Math.cos(angle) * 185;
                      const y = 200 + Math.sin(angle) * 185;
                      return (
                        <g key={i}>
                          <circle cx={x} cy={y} r="12" fill="#ec4899" opacity="0.4" />
                          <circle cx={x} cy={y} r="6" fill="#fce7f3" opacity="0.8" />
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Profile Image */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  {data.bride.image ? (
                    <Image
                      src={data.bride.image}
                      alt={data.bride.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-100 via-rose-100 to-pink-50 flex items-center justify-center">
                      <Heart className="w-24 h-24 text-pink-200" fill="currentColor" />
                    </div>
                  )}
                </div>

                {/* Decorative corner flowers */}
                <div className="absolute -top-4 -right-4 w-16 h-16 pulse-gentle">
                  <svg viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="5" fill="#ec4899" />
                    <circle cx="20" cy="25" r="8" fill="#fce7f3" opacity="0.9" />
                    <circle cx="25" cy="35" r="7" fill="#f8e7f5" opacity="0.85" />
                    <circle cx="40" cy="25" r="6" fill="#e9d5ff" opacity="0.8" />
                  </svg>
                </div>
              </div>

              <h3 className="elegant-script text-3xl md:text-4xl lg:text-5xl text-gray-700 mb-4">
                {data.bride.name}
              </h3>

              {(data.bride.profession || data.bride.education) && (
                <div className="body-text text-sm text-gray-600 mb-4 space-y-1">
                  {data.bride.profession && <p className="font-medium">{data.bride.profession}</p>}
                  {data.bride.education && <p className="text-gray-500">{data.bride.education}</p>}
                </div>
              )}

              {/* Social Media Icons */}
              {data.bride.socials && (
                <div className="flex justify-center gap-4 mb-6">
                  {data.bride.socials.instagram && (
                    <a
                      href={`https://instagram.com/${data.bride.socials.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-pink-500 hover:text-pink-600 hover:shadow-lg transition-all duration-300 hover:scale-110"
                    >
                      <FaInstagram className="w-5 h-5" />
                    </a>
                  )}
                  {data.bride.socials.facebook && (
                    <a
                      href={`https://facebook.com/${data.bride.socials.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-pink-500 hover:text-pink-600 hover:shadow-lg transition-all duration-300 hover:scale-110"
                    >
                      <FaFacebook className="w-5 h-5" />
                    </a>
                  )}
                  {data.bride.socials.twitter && (
                    <a
                      href={`https://twitter.com/${data.bride.socials.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-pink-500 hover:text-pink-600 hover:shadow-lg transition-all duration-300 hover:scale-110"
                    >
                      <FaTwitter className="w-5 h-5" />
                    </a>
                  )}
                  {data.bride.socials.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${data.bride.socials.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-pink-500 hover:text-pink-600 hover:shadow-lg transition-all duration-300 hover:scale-110"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}

              {data.bride.description && (
                <p className="body-text text-gray-600 leading-relaxed text-sm md:text-base max-w-sm mx-auto italic">
                  {data.bride.description}
                </p>
              )}
            </div>

            {/* Decorative Heart Divider - Only on large screens */}
            <div className="hidden lg:flex flex-col items-center gap-3">
              <div className="w-px h-20 bg-gradient-to-b from-transparent via-purple-300 to-transparent" />
              <div className="relative">
                <Heart className="w-12 h-12 text-pink-400" fill="currentColor" />
                <div className="absolute inset-0 w-12 h-12">
                  <Heart className="w-12 h-12 text-purple-400 opacity-30 animate-ping" fill="currentColor" />
                </div>
              </div>
              <div className="w-px h-20 bg-gradient-to-t from-transparent via-purple-300 to-transparent" />
            </div>

            {/* Groom */}
            <div className="text-center max-w-md">
              <div className="relative mx-auto w-72 h-72 md:w-80 md:h-80 mb-8">
                {/* Floral Border Ring */}
                <div className="absolute -inset-6">
                  <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
                    <circle cx="200" cy="200" r="180" stroke="#e9d5ff" strokeWidth="2" fill="none" />
                    <circle cx="200" cy="200" r="190" stroke="#c084fc" strokeWidth="1" fill="none" opacity="0.5" />
                    {/* Decorative flowers around border */}
                    {[...Array(8)].map((_, i) => {
                      const angle = (i * 45 + 22.5) * Math.PI / 180;
                      const x = 200 + Math.cos(angle) * 185;
                      const y = 200 + Math.sin(angle) * 185;
                      return (
                        <g key={i}>
                          <circle cx={x} cy={y} r="12" fill="#a78bfa" opacity="0.4" />
                          <circle cx={x} cy={y} r="6" fill="#e9d5ff" opacity="0.8" />
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Profile Image */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  {data.groom.image ? (
                    <Image
                      src={data.groom.image}
                      alt={data.groom.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 via-indigo-100 to-purple-50 flex items-center justify-center">
                      <Heart className="w-24 h-24 text-purple-200" fill="currentColor" />
                    </div>
                  )}
                </div>

                {/* Decorative corner flowers */}
                <div className="absolute -bottom-4 -left-4 w-16 h-16 pulse-gentle" style={{ animationDelay: '1s' }}>
                  <svg viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="5" fill="#c084fc" />
                    <circle cx="40" cy="35" r="8" fill="#e9d5ff" opacity="0.9" />
                    <circle cx="35" cy="25" r="7" fill="#f8e7f5" opacity="0.85" />
                    <circle cx="20" cy="35" r="6" fill="#fce7f3" opacity="0.8" />
                  </svg>
                </div>
              </div>

              <h3 className="elegant-script text-3xl md:text-4xl lg:text-5xl text-gray-700 mb-4">
                {data.groom.name}
              </h3>

              {(data.groom.profession || data.groom.education) && (
                <div className="body-text text-sm text-gray-600 mb-4 space-y-1">
                  {data.groom.profession && <p className="font-medium">{data.groom.profession}</p>}
                  {data.groom.education && <p className="text-gray-500">{data.groom.education}</p>}
                </div>
              )}

              {/* Social Media Icons */}
              {data.groom.socials && (
                <div className="flex justify-center gap-4 mb-6">
                  {data.groom.socials.instagram && (
                    <a
                      href={`https://instagram.com/${data.groom.socials.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-purple-500 hover:text-purple-600 hover:shadow-lg transition-all duration-300 hover:scale-110"
                    >
                      <FaInstagram className="w-5 h-5" />
                    </a>
                  )}
                  {data.groom.socials.facebook && (
                    <a
                      href={`https://facebook.com/${data.groom.socials.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-purple-500 hover:text-purple-600 hover:shadow-lg transition-all duration-300 hover:scale-110"
                    >
                      <FaFacebook className="w-5 h-5" />
                    </a>
                  )}
                  {data.groom.socials.twitter && (
                    <a
                      href={`https://twitter.com/${data.groom.socials.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-purple-500 hover:text-purple-600 hover:shadow-lg transition-all duration-300 hover:scale-110"
                    >
                      <FaTwitter className="w-5 h-5" />
                    </a>
                  )}
                  {data.groom.socials.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${data.groom.socials.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-purple-500 hover:text-purple-600 hover:shadow-lg transition-all duration-300 hover:scale-110"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}

              {data.groom.description && (
                <p className="body-text text-gray-600 leading-relaxed text-sm md:text-base max-w-sm mx-auto italic">
                  {data.groom.description}
                </p>
              )}
            </div>
          </div>

          {/* Bottom Decorative Element */}
          <div className="flex justify-center mt-20">
            <div className="flex items-center gap-4">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-300 to-purple-200" />
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="3" fill="#ec4899" />
                <circle cx="13" cy="16" r="5" fill="#fce7f3" opacity="0.8" />
                <circle cx="27" cy="16" r="5" fill="#e9d5ff" opacity="0.8" />
                <circle cx="16" cy="24" r="4" fill="#f8e7f5" opacity="0.9" />
                <circle cx="24" cy="24" r="4" fill="#fce7f3" opacity="0.9" />
              </svg>
              <div className="w-24 h-px bg-gradient-to-l from-transparent via-purple-300 to-purple-200" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
