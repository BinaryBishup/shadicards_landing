import type { WeddingTemplateData } from '@/types/wedding-template';

export const mockWeddingData: WeddingTemplateData = {
  hero: {
    brideName: "Priya",
    groomName: "Arjun",
    coupleImage: "/couple_image.jpg",
    weddingDate: "2024-12-15",
    weddingTime: "7:00 PM",
    venue: "The Grand Palace, Mumbai",
    tagline: "Two hearts, one journey"
  },
  about: {
    bride: {
      name: "Priya Sharma",
      image: "/bride_photo.jpg",
      description: "A software engineer with a passion for dance and travel. Priya brings light and laughter wherever she goes.",
      profession: "Senior Software Engineer",
      education: "B.Tech from IIT Mumbai",
      socials: {
        instagram: "priya_sharma",
        linkedin: "priya-sharma",
        facebook: "priya.sharma"
      }
    },
    groom: {
      name: "Arjun Patel",
      image: "/groom_photo.jpg",
      description: "An entrepreneur and fitness enthusiast who loves cooking and adventure sports.",
      profession: "Startup Founder & CEO",
      education: "MBA from IIM Ahmedabad",
      socials: {
        instagram: "arjun_patel",
        linkedin: "arjun-patel",
        twitter: "arjunp"
      }
    }
  },
  story: [
    {
      title: "Our Love Story",
      items: [
        {
          id: "1",
          title: "First Meeting",
          date: "March 2020",
          description: "We first met at a mutual friend's wedding. Little did we know that we'd be planning our own wedding soon!",
          image: "/story1.jpg",
          icon: "💕"
        },
        {
          id: "2",
          title: "First Date",
          date: "April 2020",
          description: "Our first official date was at a cozy café in Bandra. We talked for hours about everything and nothing.",
          image: "/story2.jpg",
          icon: "☕"
        },
        {
          id: "3",
          title: "The Proposal",
          date: "December 2023",
          description: "Arjun proposed at sunset on the beaches of Goa, with our families secretly watching from afar.",
          image: "/story3.jpg",
          icon: "💍"
        },
        {
          id: "4",
          title: "Engagement",
          date: "February 2024",
          description: "We celebrated our engagement with close family and friends in a beautiful ceremony.",
          image: "/story4.jpg",
          icon: "🎉"
        }
      ]
    }
  ],
  family: {
    brideSide: {
      title: "Bride's Family",
      members: [
        {
          id: "b1",
          name: "Mr. Rajesh Sharma",
          relation: "Father",
          image: "/family_b1.jpg",
          description: "A loving father and successful businessman"
        },
        {
          id: "b2",
          name: "Mrs. Sunita Sharma",
          relation: "Mother",
          image: "/family_b2.jpg",
          description: "A caring mother and renowned doctor"
        },
        {
          id: "b3",
          name: "Rohit Sharma",
          relation: "Brother",
          image: "/family_b3.jpg",
          description: "The protective elder brother"
        },
        {
          id: "b4",
          name: "Neha Sharma",
          relation: "Sister",
          image: "/family_b4.jpg",
          description: "The fun-loving younger sister"
        }
      ]
    },
    groomSide: {
      title: "Groom's Family",
      members: [
        {
          id: "g1",
          name: "Mr. Vikram Patel",
          relation: "Father",
          image: "/family_g1.jpg",
          description: "A respected engineer and mentor"
        },
        {
          id: "g2",
          name: "Mrs. Kavita Patel",
          relation: "Mother",
          image: "/family_g2.jpg",
          description: "A talented artist and homemaker"
        },
        {
          id: "g3",
          name: "Aditya Patel",
          relation: "Brother",
          image: "/family_g3.jpg",
          description: "The supportive younger brother"
        }
      ]
    }
  },
  gallery: {
    title: "Our Memories",
    categories: ["Pre-Wedding", "Engagement", "Family", "Friends"],
    images: [
      {
        id: "img1",
        url: "/gallery1.jpg",
        caption: "Pre-wedding shoot in Udaipur",
        category: "Pre-Wedding"
      },
      {
        id: "img2",
        url: "/gallery2.jpg",
        caption: "Ring ceremony moments",
        category: "Engagement"
      },
      {
        id: "img3",
        url: "/gallery3.jpg",
        caption: "Family gathering",
        category: "Family"
      },
      {
        id: "img4",
        url: "/gallery4.jpg",
        caption: "With our college friends",
        category: "Friends"
      },
      {
        id: "img5",
        url: "/gallery5.jpg",
        caption: "Sunset moments",
        category: "Pre-Wedding"
      },
      {
        id: "img6",
        url: "/gallery6.jpg",
        caption: "Traditional ceremony",
        category: "Engagement"
      }
    ]
  },
  weddingParty: {
    bridesmaids: {
      title: "Bridesmaids",
      members: [
        {
          id: "bm1",
          name: "Ananya Verma",
          role: "Maid of Honor",
          image: "/bridesmaid1.jpg",
          description: "Best friend since childhood"
        },
        {
          id: "bm2",
          name: "Sneha Gupta",
          role: "Bridesmaid",
          image: "/bridesmaid2.jpg",
          description: "College roommate and partner in crime"
        },
        {
          id: "bm3",
          name: "Riya Singh",
          role: "Bridesmaid",
          image: "/bridesmaid3.jpg",
          description: "Cousin and confidante"
        }
      ]
    },
    groomsmen: {
      title: "Groomsmen",
      members: [
        {
          id: "gm1",
          name: "Karan Mehta",
          role: "Best Man",
          image: "/groomsman1.jpg",
          description: "Brother from another mother"
        },
        {
          id: "gm2",
          name: "Rahul Kumar",
          role: "Groomsman",
          image: "/groomsman2.jpg",
          description: "School buddy and adventure partner"
        },
        {
          id: "gm3",
          name: "Vivek Joshi",
          role: "Groomsman",
          image: "/groomsman3.jpg",
          description: "Business partner and friend"
        }
      ]
    }
  }
};