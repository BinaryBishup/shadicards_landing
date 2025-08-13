// Demo chat messages generator for AutoInvitationsSection

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  timestamp: string;
}

function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${displayHours}:${displayMinutes} ${ampm}`;
}

export function generateDemoMessages(language?: string): ChatMessage[] {
  const messages: any = {
    en: [
      {
        id: '1',
        sender: 'bot',
        message: '💐 *Priya & Rahul\'s Wedding Invitation* 💐\n\nDear Guest,\n\nWe joyfully invite you to celebrate our wedding on *15th March 2025* at The Grand Palace, Mumbai.\n\n📅 *Events:*\n• Mehendi - 13th March, 4 PM\n• Sangeet - 14th March, 7 PM\n• Wedding - 15th March, 7 PM\n\n*Click here to view full invitation:*\nwww.shadicards.in/priya-rahul',
        timestamp: formatTime(new Date(Date.now() - 120000)),
        hasImage: true
      },
      {
        id: '2',
        sender: 'bot',
        message: 'Please confirm your attendance by replying:\n1️⃣ for Yes, I\'ll attend\n2️⃣ for Sorry, can\'t make it',
        timestamp: formatTime(new Date(Date.now() - 100000))
      },
      {
        id: '3',
        sender: 'user',
        message: '1',
        timestamp: formatTime(new Date(Date.now() - 80000))
      },
      {
        id: '4',
        sender: 'bot',
        message: 'Wonderful! 🎉 We\'re excited to have you join us!\n\nTo send you a physical wedding card, please share your complete postal address.',
        timestamp: formatTime(new Date(Date.now() - 60000))
      },
      {
        id: '5',
        sender: 'user',
        message: 'B-204, Sunshine Apartments\nAndheri West, Mumbai - 400058',
        timestamp: formatTime(new Date(Date.now() - 30000))
      },
      {
        id: '6',
        sender: 'bot',
        message: 'Thank you! 📮 Your wedding card will be delivered to this address within 3-5 days.\n\nWe look forward to celebrating with you! 💕',
        timestamp: formatTime(new Date())
      }
    ],
    hi: [
      {
        id: '1',
        sender: 'bot',
        message: '💐 *प्रिया और राहुल की शादी का निमंत्रण* 💐\n\nप्रिय अतिथि,\n\nहमारी शादी में आपको सादर आमंत्रित करते हैं।\n*15 मार्च 2025*, द ग्रैंड पैलेस, मुंबई\n\n📅 *कार्यक्रम:*\n• मेहंदी - 13 मार्च, शाम 4 बजे\n• संगीत - 14 मार्च, शाम 7 बजे\n• विवाह - 15 मार्च, शाम 7 बजे',
        timestamp: formatTime(new Date(Date.now() - 120000)),
        hasImage: true
      },
      {
        id: '2',
        sender: 'bot',
        message: 'कृपया अपनी उपस्थिति की पुष्टि करें:\n1️⃣ हाँ, मैं आऊंगा\n2️⃣ क्षमा करें, नहीं आ सकता',
        timestamp: formatTime(new Date(Date.now() - 100000))
      },
      {
        id: '3',
        sender: 'user',
        message: '1',
        timestamp: formatTime(new Date(Date.now() - 80000))
      },
      {
        id: '4',
        sender: 'bot',
        message: 'बहुत बढ़िया! 🎉 आपका स्वागत है!\n\nशादी का कार्ड भेजने के लिए कृपया अपना पूरा पता भेजें।',
        timestamp: formatTime(new Date(Date.now() - 60000))
      },
      {
        id: '5',
        sender: 'user',
        message: 'बी-204, सनशाइन अपार्टमेंट्स\nअंधेरी वेस्ट, मुंबई - 400058',
        timestamp: formatTime(new Date(Date.now() - 30000))
      },
      {
        id: '6',
        sender: 'bot',
        message: 'धन्यवाद! 📮 आपका शादी का कार्ड 3-5 दिनों में इस पते पर भेज दिया जाएगा।\n\nआपसे मिलने की प्रतीक्षा है! 💕',
        timestamp: formatTime(new Date())
      }
    ]
    ],
    ta: [ // Tamil
      {
        id: '1',
        sender: 'bot',
        message: '💐 *பிரியா & ராகுல் திருமண அழைப்பிதழ்* 💐\n\nஅன்புள்ள விருந்தினரே,\n\nஎங்கள் திருமணத்திற்கு உங்களை அன்புடன் அழைக்கிறோம்.\n*மார்ச் 15, 2025*, கிராண்ட் பேலஸ், மும்பை',
        timestamp: formatTime(new Date(Date.now() - 120000)),
        hasImage: true
      },
      {
        id: '2',
        sender: 'bot',
        message: '1️⃣ வருகிறேன்\n2️⃣ வர முடியவில்லை',
        timestamp: formatTime(new Date(Date.now() - 100000))
      },
      {
        id: '3',
        sender: 'user',
        message: '1',
        timestamp: formatTime(new Date(Date.now() - 80000))
      },
      {
        id: '4',
        sender: 'bot',
        message: 'மகிழ்ச்சி! 🎉\n\nதிருமண அட்டை அனுப்ப உங்கள் முகவரியை பகிரவும்.',
        timestamp: formatTime(new Date(Date.now() - 60000))
      },
      {
        id: '5',
        sender: 'user',
        message: 'பி-204, சன்ஷைன் அபார்ட்மெண்ட்ஸ்\nஅந்தேரி வெஸ்ட், மும்பை',
        timestamp: formatTime(new Date(Date.now() - 30000))
      },
      {
        id: '6',
        sender: 'bot',
        message: 'நன்றி! 📮 3-5 நாட்களில் அனுப்பப்படும்! 💕',
        timestamp: formatTime(new Date())
      }
    ],
    gu: [ // Gujarati
      {
        id: '1',
        sender: 'bot',
        message: '💐 *પ્રિયા અને રાહુલનું લગ્ન નિમંત્રણ* 💐\n\nપ્રિય મહેમાન,\n\nઅમારા લગ્નમાં આપનું હાર્દિક સ્વાગત છે.\n*15 માર્ચ 2025*, ગ્રાન્ડ પેલેસ, મુંબઈ',
        timestamp: formatTime(new Date(Date.now() - 120000)),
        hasImage: true
      },
      {
        id: '2',
        sender: 'bot',
        message: '1️⃣ હા, આવીશ\n2️⃣ માફી, ના આવી શકીશ',
        timestamp: formatTime(new Date(Date.now() - 100000))
      },
      {
        id: '3',
        sender: 'user',
        message: '1',
        timestamp: formatTime(new Date(Date.now() - 80000))
      },
      {
        id: '4',
        sender: 'bot',
        message: 'અદ્ભુત! 🎉\n\nલગ્ન કાર્ડ મોકલવા માટે સરનામું આપો.',
        timestamp: formatTime(new Date(Date.now() - 60000))
      },
      {
        id: '5',
        sender: 'user',
        message: 'બી-204, સનશાઈન એપાર્ટમેન્ટ્સ\nઅંધેરી વેસ્ટ, મુંબઈ',
        timestamp: formatTime(new Date(Date.now() - 30000))
      },
      {
        id: '6',
        sender: 'bot',
        message: 'આભાર! 📮 3-5 દિવસમાં મોકલવામાં આવશે! 💕',
        timestamp: formatTime(new Date())
      }
    ]
  };

  return messages[language] || messages.en;
}