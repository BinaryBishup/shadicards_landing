"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Star,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  Nfc,
  Package,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Card {
  id: string;
  name: string;
  category: string;
  price: number;
  original_price: number | null;
  images: string[];
  features: string[];
  min_order: number;
  rating: number | null;
  reviews_count: number | null;
  is_new: boolean;
  has_nfc: boolean;
  description: string | null;
  is_active: boolean;
}

// Image Carousel Component for Card Images
function ImageCarousel({ images, cardName }: { images: string[], cardName: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <Package className="w-16 h-16 text-gray-300" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full group">
      <img
        src={images[currentIndex]}
        alt={`${cardName} - Image ${currentIndex + 1}`}
        className="w-full h-full object-cover"
      />

      {images.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.preventDefault();
              goToPrevious();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              goToNext();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>

          {/* Image Counter */}
          <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}

// Card Details Modal Component
function CardDetailsModal({ card, isOpen, onClose }: { card: Card | null, isOpen: boolean, onClose: () => void }) {
  if (!card) return null;

  const discount = card.original_price && card.original_price > card.price
    ? Math.round(((card.original_price - card.price) / card.original_price) * 100)
    : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {card.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 mt-4">
          {/* Left: Image Carousel */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
            <ImageCarousel images={card.images || []} cardName={card.name} />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {card.is_new && (
                <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  NEW
                </span>
              )}
              {card.has_nfc && (
                <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Nfc className="w-3 h-3" />
                  NFC
                </span>
              )}
              {discount && (
                <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">{card.category}</p>
                {card.rating && (
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{card.rating}</span>
                    {card.reviews_count && (
                      <span className="text-gray-500">({card.reviews_count} reviews)</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {card.description && (
              <p className="text-gray-600 mb-6">{card.description}</p>
            )}

            {/* Features */}
            {card.features && card.features.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Features:</h3>
                <div className="space-y-2">
                  {card.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{card.price}
                </span>
                {card.original_price && card.original_price > card.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ₹{card.original_price}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Minimum order: {card.min_order} {card.min_order === 1 ? 'card' : 'cards'}
              </p>
            </div>

            {/* CTA */}
            <a
              href="https://dashboard.shadicards.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-600 hover:text-rose-700 underline text-sm font-medium"
            >
              Order this card →
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ShopPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredCards(cards);
    } else {
      setFilteredCards(cards.filter(card => card.category === selectedCategory));
    }
  }, [selectedCategory, cards]);

  const fetchCards = async () => {
    try {
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .eq('is_active', true)
        .order('is_new', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setCards(data);
        setFilteredCards(data);

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map(card => card.category)));
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateDiscount = (price: number, originalPrice: number | null) => {
    if (!originalPrice || originalPrice <= price) return null;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-rose-500 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Premium Wedding Cards Collection</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Discover Your Perfect Wedding Card
          </h1>

          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            From traditional elegance to modern smart cards - explore our curated collection
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>

            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-rose-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              All Cards ({cards.length})
            </button>

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-rose-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category} ({cards.filter(c => c.category === category).length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
              <p className="mt-4 text-gray-600">Loading wedding cards...</p>
            </div>
          ) : filteredCards.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600">No cards found in this category</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredCards.map((card) => {
                const discount = calculateDiscount(card.price, card.original_price);

                return (
                  <div
                    key={card.id}
                    onClick={() => {
                      setSelectedCard(card);
                      setIsModalOpen(true);
                    }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    {/* Card Image Carousel */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <ImageCarousel images={card.images || []} cardName={card.name} />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {card.is_new && (
                          <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            NEW
                          </span>
                        )}
                        {card.has_nfc && (
                          <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                            <Nfc className="w-3 h-3" />
                            NFC
                          </span>
                        )}
                        {discount && (
                          <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            {discount}% OFF
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {card.name}
                          </h3>
                          <p className="text-sm text-gray-500">{card.category}</p>
                        </div>
                        {card.rating && (
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{card.rating}</span>
                            {card.reviews_count && (
                              <span className="text-gray-500">({card.reviews_count})</span>
                            )}
                          </div>
                        )}
                      </div>

                      {card.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {card.description}
                        </p>
                      )}

                      {/* Features */}
                      {card.features && card.features.length > 0 && (
                        <div className="mb-4 space-y-2">
                          {card.features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                              <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span className="line-clamp-1">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Price */}
                      <div className="mb-4 pb-4 border-b border-gray-200">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-gray-900">
                            ₹{card.price}
                          </span>
                          {card.original_price && card.original_price > card.price && (
                            <span className="text-lg text-gray-500 line-through">
                              ₹{card.original_price}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Minimum order: {card.min_order} {card.min_order === 1 ? 'card' : 'cards'}
                        </p>
                      </div>

                      {/* Subtle CTA */}
                      <a
                        href="https://dashboard.shadicards.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-rose-600 hover:text-rose-700 underline text-sm font-medium inline-block"
                      >
                        Order this card →
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-600 via-rose-700 to-rose-800">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-rose-100 mb-8">
              Our design team can create custom wedding cards tailored to your vision
            </p>

            <a
              href="https://dashboard.shadicards.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-rose-600 hover:text-rose-700 px-8 py-4 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Start Creating Your Card
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Card Details Modal */}
      <CardDetailsModal
        card={selectedCard}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCard(null);
        }}
      />

      <Footer />
    </>
  );
}
