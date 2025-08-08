'use client'

import { WeddingData } from '../types'

interface FamiliesSectionProps {
  data: WeddingData
}

export default function FamiliesSection({ data }: FamiliesSectionProps) {
  // Don't render if no family data
  if (!data.families?.bride && !data.families?.groom) {
    return null
  }

  return (
    <section className="families-section py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-7xl mb-4" style={{ 
            fontFamily: 'var(--font-dancing)', 
            color: '#8B9A8C', 
            fontWeight: 400 
          }}>
            Our Families
          </h2>
          <p className="text-xl text-gray-600" style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>
            With the blessings of our beloved parents and family
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Bride's Family - Ladki Waale */}
          {data.families?.bride && (
            <div className="text-center">
              <div className="mb-8">
                <h3 className="text-3xl lg:text-4xl mb-6" style={{ 
                  fontFamily: 'var(--font-dancing)', 
                  color: '#D8A7A2', 
                  fontWeight: 400 
                }}>
                  Ladki Waale
                </h3>
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 shadow-lg">
                  <div className="space-y-6">
                    {data.families.bride.father && (
                      <div className="border-b border-pink-200 pb-4">
                        <p className="text-sm text-gray-500 mb-1">Father</p>
                        <p className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>
                          {data.families.bride.father}
                        </p>
                      </div>
                    )}
                    {data.families.bride.mother && (
                      <div className="border-b border-pink-200 pb-4">
                        <p className="text-sm text-gray-500 mb-1">Mother</p>
                        <p className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>
                          {data.families.bride.mother}
                        </p>
                      </div>
                    )}
                    {data.families.bride.siblings && data.families.bride.siblings.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500 mb-3">Siblings</p>
                        <div className="space-y-2">
                          {data.families.bride.siblings.map((sibling, index) => (
                            <div key={index}>
                              <p className="text-lg text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>
                                {sibling.name}
                              </p>
                              <p className="text-sm text-gray-500 italic">{sibling.relation}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Groom's Family - Ladka Waale */}
          {data.families?.groom && (
            <div className="text-center">
              <div className="mb-8">
                <h3 className="text-3xl lg:text-4xl mb-6" style={{ 
                  fontFamily: 'var(--font-dancing)', 
                  color: '#7C9885', 
                  fontWeight: 400 
                }}>
                  Ladka Waale
                </h3>
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8 shadow-lg">
                  <div className="space-y-6">
                    {data.families.groom.father && (
                      <div className="border-b border-blue-200 pb-4">
                        <p className="text-sm text-gray-500 mb-1">Father</p>
                        <p className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>
                          {data.families.groom.father}
                        </p>
                      </div>
                    )}
                    {data.families.groom.mother && (
                      <div className="border-b border-blue-200 pb-4">
                        <p className="text-sm text-gray-500 mb-1">Mother</p>
                        <p className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>
                          {data.families.groom.mother}
                        </p>
                      </div>
                    )}
                    {data.families.groom.siblings && data.families.groom.siblings.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500 mb-3">Siblings</p>
                        <div className="space-y-2">
                          {data.families.groom.siblings.map((sibling, index) => (
                            <div key={index}>
                              <p className="text-lg text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>
                                {sibling.name}
                              </p>
                              <p className="text-sm text-gray-500 italic">{sibling.relation}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Blessing Quote */}
        <div className="text-center mt-12">
          <p className="text-2xl text-gray-600 italic" style={{ fontFamily: 'var(--font-dancing)' }}>
            "Two families become one, united in love and celebration"
          </p>
        </div>
      </div>
    </section>
  )
}