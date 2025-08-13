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
        message: '💐 *Priya & Rahul\'s Wedding*\n\n📅 15th March 2025\n📍 The Grand Palace, Mumbai\n🕰️ 7:00 PM onwards',
        timestamp: formatTime(new Date(Date.now() - 180000)),
        hasImage: true
      },
      {
        id: '2',
        sender: 'bot',
        message: 'We request you to share your location so we can send you a physical wedding card! 📮',
        timestamp: formatTime(new Date(Date.now() - 160000)),
        hasButton: true,
        buttonText: 'View Invitation & Share Address'
      },
      {
        id: '3',
        sender: 'user',
        message: 'Address shared via website',
        timestamp: formatTime(new Date(Date.now() - 140000))
      },
      {
        id: '4',
        sender: 'bot',
        message: 'Perfect! Your wedding card will arrive soon 💕',
        timestamp: formatTime(new Date(Date.now() - 120000))
      },
      {
        id: '5',
        sender: 'bot',
        message: '🔔 *Reminder: Tomorrow\'s Wedding!*\n\nHi! Just a friendly reminder about Priya & Rahul\'s wedding tomorrow at The Grand Palace.\n\n⏰ Don\'t forget - ceremony starts at 7 PM!',
        timestamp: formatTime(new Date(Date.now() - 30000)),
        isReminder: true,
        hasButton: true,
        buttonText: 'View Event Details'
      }
    ],
    hi: [
      {
        id: '1',
        sender: 'bot',
        message: '💐 *प्रिया और राहुल की शादी*\n\n📅 15 मार्च 2025\n📍 द ग्रैंड पैलेस, मुंबई\n🕰️ शाम 7 बजे से',
        timestamp: formatTime(new Date(Date.now() - 180000)),
        hasImage: true
      },
      {
        id: '2',
        sender: 'bot',
        message: 'कृपया अपना पता शेयर करें ताकि हम आपको शादी का कार्ड भेज सकें! 📮',
        timestamp: formatTime(new Date(Date.now() - 160000)),
        hasButton: true,
        buttonText: 'निमंत्रण देखें और पता शेयर करें'
      },
      {
        id: '3',
        sender: 'user',
        message: 'वेबसाइट के माध्यम से पता शेयर किया',
        timestamp: formatTime(new Date(Date.now() - 140000))
      },
      {
        id: '4',
        sender: 'bot',
        message: 'बहुत बढ़िया! आपका शादी का कार्ड जल्दी पहुंचेगा 💕',
        timestamp: formatTime(new Date(Date.now() - 120000))
      },
      {
        id: '5',
        sender: 'bot',
        message: '🔔 *रिमाइंडर: कल की शादी!*\n\nनमस्ते! प्रिया और राहुल की कल द ग्रैंड पैलेस में होने वाली शादी की याद दिलाना चाहते हैं।\n\n⏰ मत भूलिए - समारोह शाम 7 बजे शुरू होता है!',
        timestamp: formatTime(new Date(Date.now() - 30000)),
        isReminder: true,
        hasButton: true,
        buttonText: 'इवेंट विवरण देखें'
      }
    ],
    ta: [ // Tamil
      {
        id: '1',
        sender: 'bot',
        message: '💐 *பிரியா & ராகுல் திருமணம்*\n\n📅 மார்ச் 15, 2025\n📍 கிராண்ட் பேலஸ், மும்பை\n🕰️ மாலை 7 மணி முதல்',
        timestamp: formatTime(new Date(Date.now() - 180000)),
        hasImage: true
      },
      {
        id: '2',
        sender: 'bot',
        message: 'திருமண அட்டை அனுப்ப உங்கள் முகவரியை பகிரவும்! 📮',
        timestamp: formatTime(new Date(Date.now() - 160000)),
        hasButton: true,
        buttonText: 'அழைப்பிதழ் பார்க்க & முகவரி பகிர'
      },
      {
        id: '3',
        sender: 'user',
        message: 'வலைதளம் மூலம் முகவரி பகிரப்பட்டது',
        timestamp: formatTime(new Date(Date.now() - 140000))
      },
      {
        id: '4',
        sender: 'bot',
        message: 'சிறப்பு! உங்கள் திருமண அட்டை விரைவில் வரும் 💕',
        timestamp: formatTime(new Date(Date.now() - 120000))
      },
      {
        id: '5',
        sender: 'bot',
        message: '🔔 *நினைவூட்டல்: நாளைய திருமணம்!*\n\nவணக்கம்! நாளை கிராண்ட் பேலஸில் பிரியா & ராகுல் திருமணம்.\n\n⏰ மறக்காதீர்கள் - மாலை 7 மணிக்கு தொடங்கும்!',
        timestamp: formatTime(new Date(Date.now() - 30000)),
        isReminder: true,
        hasButton: true,
        buttonText: 'நிகழ்வு விவரங்கள்'
      }
    ],
    gu: [ // Gujarati
      {
        id: '1',
        sender: 'bot',
        message: '💐 *પ્રિયા અને રાહુલનું લગ્ન*\n\n📅 15 માર્ચ 2025\n📍 ગ્રાન્ડ પેલેસ, મુંબઈ\n🕰️ સાંજે 7 વાગ્યાથી',
        timestamp: formatTime(new Date(Date.now() - 180000)),
        hasImage: true
      },
      {
        id: '2',
        sender: 'bot',
        message: 'લગ્ન કાર્ડ મોકલવા માટે કૃપા કરીને સરનામું શેર કરો! 📮',
        timestamp: formatTime(new Date(Date.now() - 160000)),
        hasButton: true,
        buttonText: 'આમંત્રણ જુઓ અને સરનામું શેર કરો'
      },
      {
        id: '3',
        sender: 'user',
        message: 'વેબસાઇટ દ્વારા સરનામું શેર કર્યું',
        timestamp: formatTime(new Date(Date.now() - 140000))
      },
      {
        id: '4',
        sender: 'bot',
        message: 'બહુ સરસ! તમારું લગ્ન કાર્ડ જલદી આવશે 💕',
        timestamp: formatTime(new Date(Date.now() - 120000))
      },
      {
        id: '5',
        sender: 'bot',
        message: '🔔 *યાદાપત્ર: કાલનું લગ્ન!*\n\nનમસ્તે! કાલે ગ્રાન્ડ પેલેસમાં પ્રિયા અને રાહુલના લગ્નની યાદ અપાવવા માગીએ છીએ.\n\n⏰ ભૂલશો નહીં - સાંજે 7 વાગ્યે શરૂ થાય છે!',
        timestamp: formatTime(new Date(Date.now() - 30000)),
        isReminder: true,
        hasButton: true,
        buttonText: 'ઇવેન્ટ વિગતો જુઓ'
      }
    ]
  };

  return messages[language] || messages.en;
}