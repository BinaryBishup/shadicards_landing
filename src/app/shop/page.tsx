"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import {
  Star,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  Nfc,
  Package
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

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

export default function ShopPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    {/* Card Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      {card.images && card.images.length > 0 ? (
                        <Image
                          src={card.images[0]}
                          alt={card.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-16 h-16 text-gray-300" />
                        </div>
                      )}

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

                      {/* CTA Button */}
                      <a
                        href="https://dashboard.shadicards.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn w-full bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full font-medium text-center transition-all flex items-center justify-center gap-2"
                      >
                        Order This Card
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
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

      <Footer />
    </>
  );
}
