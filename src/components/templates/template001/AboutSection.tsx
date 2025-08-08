"use client";

import { Briefcase, GraduationCap } from 'lucide-react';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import type { AboutData } from '@/types/wedding-template';

interface AboutSectionProps {
  data: AboutData;
  primaryColor?: string;
}

export default function AboutSection({ data, primaryColor = '#ec4899' }: AboutSectionProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-16" style={{ color: primaryColor }}>
          Meet The Couple
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Bride */}
          <div className="group">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
              <div className="relative h-96 bg-gradient-to-br from-pink-100 to-rose-100">
                {data.bride.image && (
                  <Image
                    src={data.bride.image}
                    alt={data.bride.name}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-white text-2xl font-bold">
                  {data.bride.name}
                </h3>
              </div>
              
              <div className="p-6">
                {data.bride.description && (
                  <p className="text-gray-600 mb-4">{data.bride.description}</p>
                )}
                
                <div className="space-y-2 mb-4">
                  {data.bride.profession && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Briefcase className="w-4 h-4" />
                      <span>{data.bride.profession}</span>
                    </div>
                  )}
                  {data.bride.education && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <GraduationCap className="w-4 h-4" />
                      <span>{data.bride.education}</span>
                    </div>
                  )}
                </div>

                {data.bride.socials && (
                  <div className="flex gap-3">
                    {data.bride.socials.instagram && (
                      <a href={`https://instagram.com/${data.bride.socials.instagram}`} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="p-2 bg-gray-100 rounded-full hover:bg-pink-100 transition-colors">
                        <FaInstagram className="w-4 h-4" />
                      </a>
                    )}
                    {data.bride.socials.facebook && (
                      <a href={`https://facebook.com/${data.bride.socials.facebook}`} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="p-2 bg-gray-100 rounded-full hover:bg-pink-100 transition-colors">
                        <FaFacebook className="w-4 h-4" />
                      </a>
                    )}
                    {data.bride.socials.twitter && (
                      <a href={`https://twitter.com/${data.bride.socials.twitter}`} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="p-2 bg-gray-100 rounded-full hover:bg-pink-100 transition-colors">
                        <FaTwitter className="w-4 h-4" />
                      </a>
                    )}
                    {data.bride.socials.linkedin && (
                      <a href={`https://linkedin.com/in/${data.bride.socials.linkedin}`} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="p-2 bg-gray-100 rounded-full hover:bg-pink-100 transition-colors">
                        <FaLinkedin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Groom */}
          <div className="group">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
              <div className="relative h-96 bg-gradient-to-br from-blue-100 to-indigo-100">
                {data.groom.image && (
                  <Image
                    src={data.groom.image}
                    alt={data.groom.name}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-white text-2xl font-bold">
                  {data.groom.name}
                </h3>
              </div>
              
              <div className="p-6">
                {data.groom.description && (
                  <p className="text-gray-600 mb-4">{data.groom.description}</p>
                )}
                
                <div className="space-y-2 mb-4">
                  {data.groom.profession && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Briefcase className="w-4 h-4" />
                      <span>{data.groom.profession}</span>
                    </div>
                  )}
                  {data.groom.education && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <GraduationCap className="w-4 h-4" />
                      <span>{data.groom.education}</span>
                    </div>
                  )}
                </div>

                {data.groom.socials && (
                  <div className="flex gap-3">
                    {data.groom.socials.instagram && (
                      <a href={`https://instagram.com/${data.groom.socials.instagram}`} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors">
                        <FaInstagram className="w-4 h-4" />
                      </a>
                    )}
                    {data.groom.socials.facebook && (
                      <a href={`https://facebook.com/${data.groom.socials.facebook}`} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors">
                        <FaFacebook className="w-4 h-4" />
                      </a>
                    )}
                    {data.groom.socials.twitter && (
                      <a href={`https://twitter.com/${data.groom.socials.twitter}`} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors">
                        <FaTwitter className="w-4 h-4" />
                      </a>
                    )}
                    {data.groom.socials.linkedin && (
                      <a href={`https://linkedin.com/in/${data.groom.socials.linkedin}`} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors">
                        <FaLinkedin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}