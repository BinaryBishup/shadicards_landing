"use client";

import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import Image from 'next/image';
import type { AboutData } from '@/types/wedding-template';

interface AboutSectionProps {
  data: AboutData;
  primaryColor?: string;
  socialHandles?: {
    bride?: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
    };
    groom?: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
    };
  };
}

export default function AboutSection({ data, primaryColor = '#ec4899', socialHandles }: AboutSectionProps) {
  // Extract social handles from socialHandles prop or use defaults
  const brideSocialHandles = socialHandles?.bride || {};
  const groomSocialHandles = socialHandles?.groom || {};
  
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=Poppins:wght@300;400;500&display=swap');
        .cursive-heading {
          font-family: 'Dancing Script', cursive;
        }
        .body-font {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
      
      <section className="relative py-20 md:py-24 px-4 bg-white overflow-hidden mt-12 md:mt-16">
        {/* Desktop - Left Peacock Feather Decoration */}
        <div className="hidden md:block absolute left-0 top-1/4 w-32 md:w-48 lg:w-64 h-64 md:h-80 lg:h-96 pointer-events-none z-0">
          <Image
            src="/templates/assets/flower_left_shape.png"
            alt="Peacock Feather Decoration"
            width={256}
            height={384}
            className="w-full h-full object-contain object-left opacity-40"
          />
        </div>

        {/* Desktop - Right Peacock Feather Decoration */}
        <div className="hidden md:block absolute right-0 top-1/4 w-32 md:w-48 lg:w-64 h-64 md:h-80 lg:h-96 pointer-events-none z-0">
          <Image
            src="/templates/assets/flower_right_shape.png"
            alt="Peacock Feather Decoration"
            width={256}
            height={384}
            className="w-full h-full object-contain object-right opacity-40"
          />
        </div>

        {/* Mobile - First Row Peacock Feathers */}
        <div className="md:hidden absolute left-0 top-20 w-24 h-32 pointer-events-none z-0">
          <Image
            src="/templates/assets/flower_left_shape.png"
            alt="Peacock Feather Decoration"
            width={96}
            height={128}
            className="w-full h-full object-contain object-left opacity-30"
          />
        </div>
        <div className="md:hidden absolute right-0 top-20 w-24 h-32 pointer-events-none z-0">
          <Image
            src="/templates/assets/flower_right_shape.png"
            alt="Peacock Feather Decoration"
            width={96}
            height={128}
            className="w-full h-full object-contain object-right opacity-30"
          />
        </div>

        {/* Mobile - Second Row Peacock Feathers */}
        <div className="md:hidden absolute left-0 bottom-32 w-24 h-32 pointer-events-none z-0">
          <Image
            src="/templates/assets/flower_left_shape.png"
            alt="Peacock Feather Decoration"
            width={96}
            height={128}
            className="w-full h-full object-contain object-left opacity-30"
          />
        </div>
        <div className="md:hidden absolute right-0 bottom-32 w-24 h-32 pointer-events-none z-0">
          <Image
            src="/templates/assets/flower_right_shape.png"
            alt="Peacock Feather Decoration"
            width={96}
            height={128}
            className="w-full h-full object-contain object-right opacity-30"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="cursive-heading text-4xl md:text-5xl text-center mb-20 text-gray-600">
            Meet The Couple
          </h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
            {/* Bride */}
            <div className="text-center">
              <div className="relative mx-auto w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg mb-8">
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
              
              <h3 className="text-2xl md:text-3xl mb-3 text-gray-700 body-font font-medium">
                {data.bride.name}
              </h3>
              
              {/* Social Media Handles with Icons */}
              <div className="flex justify-center gap-3 mb-4">
                {brideSocialHandles.facebook && (
                  <a 
                    href={`https://facebook.com/${brideSocialHandles.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title={`@${brideSocialHandles.facebook}`}
                  >
                    <FaFacebook className="w-4 h-4" />
                    <span className="text-xs">@{brideSocialHandles.facebook}</span>
                  </a>
                )}
                {brideSocialHandles.instagram && (
                  <a 
                    href={`https://instagram.com/${brideSocialHandles.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title={`@${brideSocialHandles.instagram}`}
                  >
                    <FaInstagram className="w-4 h-4" />
                    <span className="text-xs">@{brideSocialHandles.instagram}</span>
                  </a>
                )}
                {brideSocialHandles.twitter && (
                  <a 
                    href={`https://twitter.com/${brideSocialHandles.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title={`@${brideSocialHandles.twitter}`}
                  >
                    <FaTwitter className="w-4 h-4" />
                    <span className="text-xs">@{brideSocialHandles.twitter}</span>
                  </a>
                )}
              </div>
              
              {data.bride.description && (
                <p className="text-gray-500 max-w-xs mx-auto body-font font-light text-sm leading-relaxed">
                  {data.bride.description}
                </p>
              )}
            </div>

            {/* Groom */}
            <div className="text-center">
              <div className="relative mx-auto w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg mb-8">
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
              
              <h3 className="text-2xl md:text-3xl mb-3 text-gray-700 body-font font-medium">
                {data.groom.name}
              </h3>
              
              {/* Social Media Handles with Icons */}
              <div className="flex justify-center gap-3 mb-4">
                {groomSocialHandles.facebook && (
                  <a 
                    href={`https://facebook.com/${groomSocialHandles.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title={`@${groomSocialHandles.facebook}`}
                  >
                    <FaFacebook className="w-4 h-4" />
                    <span className="text-xs">@{groomSocialHandles.facebook}</span>
                  </a>
                )}
                {groomSocialHandles.instagram && (
                  <a 
                    href={`https://instagram.com/${groomSocialHandles.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title={`@${groomSocialHandles.instagram}`}
                  >
                    <FaInstagram className="w-4 h-4" />
                    <span className="text-xs">@{groomSocialHandles.instagram}</span>
                  </a>
                )}
                {groomSocialHandles.twitter && (
                  <a 
                    href={`https://twitter.com/${groomSocialHandles.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title={`@${groomSocialHandles.twitter}`}
                  >
                    <FaTwitter className="w-4 h-4" />
                    <span className="text-xs">@{groomSocialHandles.twitter}</span>
                  </a>
                )}
              </div>
              
              {data.groom.description && (
                <p className="text-gray-500 max-w-xs mx-auto body-font font-light text-sm leading-relaxed">
                  {data.groom.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}