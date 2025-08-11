"use client";

import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import Image from 'next/image';
import type { AboutData } from '@/types/wedding-template';

interface AboutSectionProps {
  data: AboutData;
  primaryColor?: string;
}

export default function AboutSection({ data, primaryColor = '#ec4899' }: AboutSectionProps) {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Left Peacock Feather Decoration */}
      <div className="absolute left-0 top-0 bottom-0 w-64 md:w-96 lg:w-[500px] pointer-events-none z-0">
        <Image
          src="/templates/assets/flower_left_shape.png"
          alt="Peacock Feather Decoration"
          width={500}
          height={800}
          className="h-full w-full object-cover object-right opacity-90"
        />
      </div>

      {/* Right Peacock Feather Decoration */}
      <div className="absolute right-0 top-0 bottom-0 w-64 md:w-96 lg:w-[500px] pointer-events-none z-0">
        <Image
          src="/templates/assets/flower_right_shape.png"
          alt="Peacock Feather Decoration"
          width={500}
          height={800}
          className="h-full w-full object-cover object-left opacity-90"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-16 text-gray-800">
          Meet The Couple
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Bride */}
          <div className="text-center">
            <div className="relative mx-auto w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl mb-6">
              {data.bride.image ? (
                <Image
                  src={data.bride.image}
                  alt={data.bride.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-pink-100 to-rose-200" />
              )}
            </div>
            
            <h3 className="text-2xl md:text-3xl font-serif mb-3 text-gray-800">
              {data.bride.name}
            </h3>
            
            {data.bride.description && (
              <p className="text-gray-600 mb-4 max-w-sm mx-auto">
                {data.bride.description}
              </p>
            )}

            {/* Social Media Icons */}
            <div className="flex justify-center gap-4">
              {data.bride.socialMedia?.instagram && (
                <a 
                  href={data.bride.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-500 transition-colors"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
              )}
              {data.bride.socialMedia?.facebook && (
                <a 
                  href={data.bride.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
              )}
              {data.bride.socialMedia?.twitter && (
                <a 
                  href={data.bride.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-400 transition-colors"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Groom */}
          <div className="text-center">
            <div className="relative mx-auto w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl mb-6">
              {data.groom.image ? (
                <Image
                  src={data.groom.image}
                  alt={data.groom.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-200" />
              )}
            </div>
            
            <h3 className="text-2xl md:text-3xl font-serif mb-3 text-gray-800">
              {data.groom.name}
            </h3>
            
            {data.groom.description && (
              <p className="text-gray-600 mb-4 max-w-sm mx-auto">
                {data.groom.description}
              </p>
            )}

            {/* Social Media Icons */}
            <div className="flex justify-center gap-4">
              {data.groom.socialMedia?.instagram && (
                <a 
                  href={data.groom.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-500 transition-colors"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
              )}
              {data.groom.socialMedia?.facebook && (
                <a 
                  href={data.groom.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
              )}
              {data.groom.socialMedia?.twitter && (
                <a 
                  href={data.groom.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-400 transition-colors"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}