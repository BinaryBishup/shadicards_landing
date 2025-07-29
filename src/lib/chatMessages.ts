export interface ChatScript {
  [key: string]: {
    greeting: string;
    askAddress: string;
    confirmAddress: string;
    askRSVP: string;
    askDietaryPreference: string;
    thankYou: string;
    guestReplies: {
      location: string;
      address: string;
      rsvp: string;
      dietary: string;
    };
    religionSpecific?: {
      [key: string]: {
        greeting: string;
        weddingImage?: string;
        events?: string[];
      };
    };
  };
}

export const chatScripts: ChatScript = {
  en: {
    greeting: "Hello! 🙏 You're invited to Rahul & Priya's wedding on March 15, 2024! I'm here to help you with all the details.",
    askAddress: "To send you the physical invitation card, could you please share your delivery address?",
    confirmAddress: "Perfect! I've noted your address. The invitation will be delivered within 3-5 days. 📮",
    askRSVP: "Will you be able to join us for the celebration? Please let me know how many people will be attending from your family.",
    askDietaryPreference: "Do you have any dietary preferences we should know about? (Veg/Non-veg/Jain/Vegan)",
    thankYou: "Thank you! We're excited to have you at our wedding. You'll receive updates and reminders as we get closer to the date. 🎉",
    guestReplies: {
      location: "📍 Location shared",
      address: "House 42, Green Park, New Delhi 110016",
      rsvp: "Yes, 4 people will be attending",
      dietary: "Vegetarian"
    },
    religionSpecific: {
      hindu: {
        greeting: "Namaste! 🙏 You're invited to Arjun & Meera's wedding! Join us for the Sangeet on March 14, Haldi on March 15 morning, and the Wedding ceremony on March 15 evening.",
        events: ["Sangeet Night", "Haldi Ceremony", "Baraat", "Pheras", "Reception"]
      },
      muslim: {
        greeting: "Assalam Alaikum! 🌙 You're invited to Ahmed & Fatima's Nikah ceremony on March 15, 2024, followed by the Walima reception.",
        events: ["Mehndi", "Nikah Ceremony", "Walima Reception"]
      },
      christian: {
        greeting: "Hello! ✝️ You're invited to David & Sarah's wedding ceremony at St. Mary's Church on March 15, 2024, followed by the reception.",
        events: ["Church Ceremony", "Reception", "First Dance"]
      },
      sikh: {
        greeting: "Sat Sri Akal! 🙏 You're invited to Harpreet & Simran's Anand Karaj at the Gurudwara on March 15, 2024.",
        events: ["Kirtan", "Anand Karaj", "Langar", "Reception"]
      },
      jain: {
        greeting: "Jai Jinendra! 🙏 You're invited to Amit & Kavya's wedding ceremony on March 15, 2024.",
        events: ["Tilak", "Wedding Ceremony", "Reception"]
      },
      buddhist: {
        greeting: "Hello! ☸️ You're invited to Tenzin & Maya's wedding ceremony on March 15, 2024.",
        events: ["Traditional Ceremony", "Reception"]
      }
    }
  },
  hi: {
    greeting: "नमस्ते! 🙏 आपको राहुल और प्रिया की शादी में आमंत्रित किया गया है जो 15 मार्च 2024 को है! मैं आपकी सभी जानकारी में मदद करने के लिए यहाँ हूँ।",
    askAddress: "आपको शादी का कार्ड भेजने के लिए, कृपया अपना डिलीवरी पता साझा करें?",
    confirmAddress: "बहुत बढ़िया! मैंने आपका पता नोट कर लिया है। निमंत्रण कार्ड 3-5 दिनों में पहुंच जाएगा। 📮",
    askRSVP: "क्या आप समारोह में शामिल हो सकेंगे? कृपया बताएं कि आपके परिवार से कितने लोग आएंगे।",
    askDietaryPreference: "क्या आपकी कोई खाने की प्राथमिकता है जिसके बारे में हमें पता होना चाहिए? (शाकाहारी/मांसाहारी/जैन/वीगन)",
    thankYou: "धन्यवाद! हम आपको अपनी शादी में पाकर खुश हैं। जैसे-जैसे तारीख नजदीक आएगी, आपको अपडेट मिलते रहेंगे। 🎉",
    guestReplies: {
      location: "📍 स्थान साझा किया गया",
      address: "हाउस 42, ग्रीन पार्क, नई दिल्ली 110016",
      rsvp: "हाँ, 4 लोग आएंगे",
      dietary: "शाकाहारी"
    },
    religionSpecific: {
      hindu: {
        greeting: "नमस्ते! 🙏 आपको अर्जुन और मीरा की शादी में आमंत्रित किया गया है! 14 मार्च को संगीत, 15 मार्च सुबह हल्दी और शाम को विवाह समारोह में शामिल हों।"
      },
      muslim: {
        greeting: "अस्सलाम अलैकुम! 🌙 आपको अहमद और फातिमा के निकाह समारोह में 15 मार्च 2024 को आमंत्रित किया गया है, इसके बाद वलीमा रिसेप्शन होगा।"
      },
      christian: {
        greeting: "नमस्ते! ✝️ आपको डेविड और सारा की शादी के लिए 15 मार्च 2024 को सेंट मैरी चर्च में आमंत्रित किया गया है।"
      },
      sikh: {
        greeting: "सत श्री अकाल! 🙏 आपको हरप्रीत और सिमरन के अनंद कारज में 15 मार्च 2024 को गुरुद्वारे में आमंत्रित किया गया है।"
      }
    }
  },
  ta: {
    greeting: "வணக்கம்! 🙏 மார்ச் 15, 2024 அன்று நடைபெறும் ராகுல் & பிரியாவின் திருமணத்திற்கு உங்களை அழைக்கிறோம்! அனைத்து விவரங்களுக்கும் நான் உங்களுக்கு உதவ இங்கே இருக்கிறேன்.",
    askAddress: "திருமண அழைப்பிதழை அனுப்ப, உங்கள் விநியோக முகவரியை பகிர்ந்து கொள்ள முடியுமா?",
    confirmAddress: "அருமை! உங்கள் முகவரியை குறித்துக்கொண்டேன். அழைப்பிதழ் 3-5 நாட்களில் வந்துவிடும். 📮",
    askRSVP: "நீங்கள் விழாவில் கலந்து கொள்ள முடியுமா? உங்கள் குடும்பத்திலிருந்து எத்தனை பேர் வருவார்கள் என்று தெரிவிக்கவும்.",
    askDietaryPreference: "உங்களுக்கு ஏதேனும் உணவு விருப்பங்கள் உள்ளதா? (சைவம்/அசைவம்/ஜைன்/வீகன்)",
    thankYou: "நன்றி! எங்கள் திருமணத்தில் உங்களை சந்திக்க ஆவலாக உள்ளோம். தேதி நெருங்கும்போது புதுப்பிப்புகள் கிடைக்கும். 🎉",
    guestReplies: {
      location: "📍 இடம் பகிரப்பட்டது",
      address: "வீடு 42, கிரீன் பார்க், புது தில்லி 110016",
      rsvp: "ஆம், 4 பேர் வருவார்கள்",
      dietary: "சைவம்"
    }
  },
  te: {
    greeting: "నమస్తే! 🙏 మార్చి 15, 2024న జరిగే రాహుల్ & ప్రియ వివాహానికి మిమ్మల్ని ఆహ్వానిస్తున్నాము! అన్ని వివరాలతో మీకు సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను.",
    askAddress: "పెళ్లి పత్రికను పంపడానికి, దయచేసి మీ డెలివరీ చిరునామాను పంచుకోగలరా?",
    confirmAddress: "అద్భుతం! మీ చిరునామాను నోట్ చేసుకున్నాను. ఆహ్వాన పత్రిక 3-5 రోజుల్లో చేరుతుంది. 📮",
    askRSVP: "మీరు వేడుకలో పాల్గొనగలరా? మీ కుటుంబం నుండి ఎంత మంది హాజరవుతారో దయచేసి తెలియజేయండి.",
    askDietaryPreference: "మేము తెలుసుకోవలసిన ఏదైనా ఆహార ప్రాధాన్యతలు ఉన్నాయా? (శాకాహారం/మాంసాహారం/జైన్/వీగన్)",
    thankYou: "ధన్యవాదాలు! మా పెళ్లిలో మిమ్మల్ని కలుసుకోవడానికి ఆసక్తిగా ఉన్నాము. తేదీ దగ్గర పడుతున్న కొద్దీ అప్‌డేట్‌లు అందుతాయి. 🎉",
    guestReplies: {
      location: "📍 స్థానం పంచుకోబడింది",
      address: "హౌస్ 42, గ్రీన్ పార్క్, న్యూ ఢిల్లీ 110016",
      rsvp: "అవును, 4 మంది హాజరవుతారు",
      dietary: "శాకాహారం"
    }
  },
  mr: {
    greeting: "नमस्कार! 🙏 15 मार्च 2024 रोजी राहुल आणि प्रियाच्या लग्नासाठी तुम्हाला आमंत्रित केले आहे! सर्व तपशीलांसाठी मी तुमची मदत करण्यासाठी येथे आहे.",
    askAddress: "लग्नपत्रिका पाठवण्यासाठी, कृपया तुमचा पत्ता शेअर करा?",
    confirmAddress: "छान! मी तुमचा पत्ता नोंदवला आहे. आमंत्रणपत्रिका 3-5 दिवसांत पोहोचेल. 📮",
    askRSVP: "तुम्ही समारंभात सहभागी होऊ शकाल का? कृपया सांगा की तुमच्या कुटुंबातून किती जण येणार आहेत.",
    askDietaryPreference: "तुमच्या काही खाण्याच्या पसंती आहेत का? (शाकाहारी/मांसाहारी/जैन/वेगन)",
    thankYou: "धन्यवाद! आमच्या लग्नात तुम्हाला भेटायला आम्ही उत्सुक आहोत. तारीख जवळ येत असताना अपडेट्स मिळत राहतील. 🎉",
    guestReplies: {
      location: "📍 स्थान शेअर केले",
      address: "घर 42, ग्रीन पार्क, नवी दिल्ली 110016",
      rsvp: "होय, 4 जण येणार आहेत",
      dietary: "शाकाहारी"
    }
  },
  gu: {
    greeting: "નમસ્તે! 🙏 15 માર્ચ 2024ના રોજ રાહુલ અને પ્રિયાના લગ્નમાં તમને આમંત્રણ છે! બધી વિગતો માટે હું તમારી મદદ કરવા અહીં છું.",
    askAddress: "લગ્ન કાર્ડ મોકલવા માટે, કૃપા કરીને તમારું ડિલિવરી સરનામું શેર કરો?",
    confirmAddress: "બહુ સરસ! મેં તમારું સરનામું નોંધ્યું છે. આમંત્રણ કાર્ડ 3-5 દિવસમાં પહોંચશે. 📮",
    askRSVP: "શું તમે ઉજવણીમાં જોડાઈ શકશો? કૃપા કરીને જણાવો કે તમારા પરિવારમાંથી કેટલા લોકો આવશે.",
    askDietaryPreference: "શું તમારી કોઈ ખાવાની પસંદગી છે જે વિશે અમને જાણવું જોઈએ? (શાકાહારી/માંસાહારી/જૈન/વેગન)",
    thankYou: "આભાર! અમારા લગ્નમાં તમને મળવા માટે અમે ઉત્સાહિત છીએ. તારીખ નજીક આવતાં અપડેટ્સ મળતા રહેશે. 🎉",
    guestReplies: {
      location: "📍 સ્થાન શેર કર્યું",
      address: "ઘર 42, ગ્રીન પાર્ક, નવી દિલ્હી 110016",
      rsvp: "હા, 4 લોકો આવશે",
      dietary: "શાકાહારી"
    }
  },
  bn: {
    greeting: "নমস্কার! 🙏 ১৫ মার্চ ২০২৪ তারিখে রাহুল ও প্রিয়ার বিয়েতে আপনাকে আমন্ত্রণ জানানো হচ্ছে! সমস্ত বিবরণে সাহায্য করতে আমি এখানে আছি।",
    askAddress: "বিয়ের কার্ড পাঠাতে, দয়া করে আপনার ডেলিভারি ঠিকানা শেয়ার করুন?",
    confirmAddress: "চমৎকার! আমি আপনার ঠিকানা নোট করেছি। আমন্ত্রণপত্র ৩-৫ দিনের মধ্যে পৌঁছে যাবে। 📮",
    askRSVP: "আপনি কি উৎসবে যোগ দিতে পারবেন? দয়া করে জানান আপনার পরিবার থেকে কতজন আসবেন।",
    askDietaryPreference: "আপনার কি কোন খাদ্য পছন্দ আছে যা আমাদের জানা উচিত? (নিরামিষ/আমিষ/জৈন/ভেগান)",
    thankYou: "ধন্যবাদ! আমাদের বিয়েতে আপনাকে পেয়ে আমরা উৎসাহিত। তারিখ কাছে আসার সাথে সাথে আপডেট পাবেন। 🎉",
    guestReplies: {
      location: "📍 অবস্থান শেয়ার করা হয়েছে",
      address: "বাড়ি ৪২, গ্রীন পার্ক, নয়া দিল্লি ১১০০১৬",
      rsvp: "হ্যাঁ, ৪ জন আসবে",
      dietary: "নিরামিষ"
    }
  },
  pa: {
    greeting: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! 🙏 15 ਮਾਰਚ 2024 ਨੂੰ ਰਾਹੁਲ ਅਤੇ ਪ੍ਰਿਯਾ ਦੇ ਵਿਆਹ ਲਈ ਤੁਹਾਨੂੰ ਸੱਦਾ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ! ਸਾਰੇ ਵੇਰਵਿਆਂ ਲਈ ਮੈਂ ਤੁਹਾਡੀ ਮਦਦ ਕਰਨ ਲਈ ਇੱਥੇ ਹਾਂ।",
    askAddress: "ਵਿਆਹ ਦਾ ਕਾਰਡ ਭੇਜਣ ਲਈ, ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਡਿਲੀਵਰੀ ਪਤਾ ਸਾਂਝਾ ਕਰੋ?",
    confirmAddress: "ਬਹੁਤ ਵਧੀਆ! ਮੈਂ ਤੁਹਾਡਾ ਪਤਾ ਨੋਟ ਕਰ ਲਿਆ ਹੈ। ਸੱਦਾ ਪੱਤਰ 3-5 ਦਿਨਾਂ ਵਿੱਚ ਪਹੁੰਚ ਜਾਵੇਗਾ। 📮",
    askRSVP: "ਕੀ ਤੁਸੀਂ ਸਮਾਰੋਹ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋ ਸਕੋਗੇ? ਕਿਰਪਾ ਕਰਕੇ ਦੱਸੋ ਕਿ ਤੁਹਾਡੇ ਪਰਿਵਾਰ ਤੋਂ ਕਿੰਨੇ ਲੋਕ ਆਉਣਗੇ।",
    askDietaryPreference: "ਕੀ ਤੁਹਾਡੀ ਕੋਈ ਖਾਣੇ ਦੀ ਪਸੰਦ ਹੈ ਜਿਸ ਬਾਰੇ ਸਾਨੂੰ ਪਤਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ? (ਸ਼ਾਕਾਹਾਰੀ/ਮਾਸਾਹਾਰੀ/ਜੈਨ/ਵੀਗਨ)",
    thankYou: "ਧੰਨਵਾਦ! ਅਸੀਂ ਸਾਡੇ ਵਿਆਹ ਵਿੱਚ ਤੁਹਾਨੂੰ ਮਿਲਣ ਲਈ ਉਤਸ਼ਾਹਿਤ ਹਾਂ। ਤਾਰੀਖ ਨੇੜੇ ਆਉਣ ਤੇ ਅੱਪਡੇਟ ਮਿਲਦੇ ਰਹਿਣਗੇ। 🎉",
    guestReplies: {
      location: "📍 ਸਥਾਨ ਸਾਂਝਾ ਕੀਤਾ",
      address: "ਘਰ 42, ਗ੍ਰੀਨ ਪਾਰਕ, ਨਵੀਂ ਦਿੱਲੀ 110016",
      rsvp: "ਹਾਂ, 4 ਲੋਕ ਆਉਣਗੇ",
      dietary: "ਸ਼ਾਕਾਹਾਰੀ"
    }
  }
};

export const generateDemoMessages = (language: string) => {
  const script = chatScripts[language] || chatScripts.en;
  const now = new Date();
  
  const getTime = (offset: number) => {
    const time = new Date(now.getTime() + offset * 1000);
    return `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
  };

  return [
    {
      id: `msg-1-${language}`,
      text: script.greeting,
      sender: "ai" as const,
      timestamp: getTime(0),
      status: "read" as const,
      hasImage: true // Always show wedding image
    },
    {
      id: `msg-2-${language}`,
      text: script.askAddress,
      sender: "ai" as const,
      timestamp: getTime(5),
      status: "read" as const
    },
    {
      id: `msg-3-${language}`,
      text: script.guestReplies.location,
      sender: "guest" as const,
      timestamp: getTime(15),
      status: "read" as const
    },
    {
      id: `msg-4-${language}`,
      text: script.guestReplies.address,
      sender: "guest" as const,
      timestamp: getTime(20),
      status: "read" as const
    },
    {
      id: `msg-5-${language}`,
      text: script.confirmAddress,
      sender: "ai" as const,
      timestamp: getTime(25),
      status: "read" as const
    },
    {
      id: `msg-6-${language}`,
      text: script.askRSVP,
      sender: "ai" as const,
      timestamp: getTime(30),
      status: "read" as const
    },
    {
      id: `msg-7-${language}`,
      text: script.guestReplies.rsvp,
      sender: "guest" as const,
      timestamp: getTime(40),
      status: "read" as const
    },
    {
      id: `msg-8-${language}`,
      text: script.askDietaryPreference,
      sender: "ai" as const,
      timestamp: getTime(45),
      status: "read" as const
    },
    {
      id: `msg-9-${language}`,
      text: script.guestReplies.dietary,
      sender: "guest" as const,
      timestamp: getTime(55),
      status: "delivered" as const
    },
    {
      id: `msg-10-${language}`,
      text: script.thankYou,
      sender: "ai" as const,
      timestamp: getTime(60),
      status: "sent" as const
    }
  ];
};