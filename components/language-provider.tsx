"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "zh" | "hi" | "ne" | "bo" | "es" | "fr" | "de" | "ja" | "ko"

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations object
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.tours": "Virtual Tours",
    "nav.map": "Map",
    "nav.archives": "Archives",
    "nav.events": "Events",
    "nav.learning": "Learning",
    "nav.guide": "AI Guide",
    "nav.emergency": "Emergency",
    "nav.community": "Community",
    "nav.rewards": "Rewards",
    "nav.admin": "Admin",
    
    // Common
    "common.loading": "Loading...",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.close": "Close",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.view": "View",
    "common.share": "Share",
    "common.download": "Download",
    
    // Home page
    "home.title": "Discover Sacred Monasteries Through Virtual Journeys",
    "home.subtitle": "Immerse yourself in the spiritual heritage of Buddhist and Tibetan monasteries",
    "home.cta.tour": "Start Virtual Tour",
    "home.cta.map": "Explore Map",
    
    // Auth
    "auth.signin": "Sign In",
    "auth.signup": "Sign Up",
    "auth.logout": "Logout",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.name": "Name",
    
    // Features
    "features.virtualTours": "360° Virtual Tours",
    "features.archives": "Digital Archives",
    "features.events": "Cultural Events",
    "features.aiGuide": "AI Monk Guide",
    "features.emergency": "Emergency Contacts",
    
    // AI Guide
    "guide.title": "AI Monk Guide",
    "guide.subtitle": "Your personal spiritual guide for monastery wisdom",
    "guide.placeholder": "Ask about monastery culture, rituals, meditation...",
    "guide.quickQuestions": "Quick Questions",
    
    // Emergency
    "emergency.title": "Emergency & Local Contacts",
    "emergency.subtitle": "Quick access to emergency services and local assistance",
    "emergency.call": "Call",
    "emergency.sms": "SMS",
    "emergency.location": "Location",
    
    // Gamification
    "rewards.title": "Rewards & Achievements",
    "rewards.level": "Level",
    "rewards.coins": "Sacred Coins",
    "rewards.badges": "Badges",
    "rewards.achievements": "Achievements",
  },
  
  zh: {
    // Navigation
    "nav.home": "首页",
    "nav.tours": "虚拟游览",
    "nav.map": "地图",
    "nav.archives": "档案",
    "nav.events": "活动",
    "nav.learning": "学习",
    "nav.guide": "AI向导",
    "nav.emergency": "紧急联系",
    "nav.community": "社区",
    "nav.rewards": "奖励",
    "nav.admin": "管理",
    
    // Common
    "common.loading": "加载中...",
    "common.search": "搜索",
    "common.filter": "筛选",
    "common.close": "关闭",
    "common.save": "保存",
    "common.cancel": "取消",
    "common.delete": "删除",
    "common.edit": "编辑",
    "common.view": "查看",
    "common.share": "分享",
    "common.download": "下载",
    
    // Home page
    "home.title": "通过虚拟之旅探索神圣寺院",
    "home.subtitle": "沉浸在佛教和藏传佛教寺院的精神遗产中",
    "home.cta.tour": "开始虚拟游览",
    "home.cta.map": "探索地图",
    
    // Auth
    "auth.signin": "登录",
    "auth.signup": "注册",
    "auth.logout": "登出",
    "auth.email": "邮箱",
    "auth.password": "密码",
    "auth.name": "姓名",
    
    // Features
    "features.virtualTours": "360°虚拟游览",
    "features.archives": "数字档案",
    "features.events": "文化活动",
    "features.aiGuide": "AI僧侣向导",
    "features.emergency": "紧急联系",
    
    // AI Guide
    "guide.title": "AI僧侣向导",
    "guide.subtitle": "您的个人精神向导，了解寺院智慧",
    "guide.placeholder": "询问寺院文化、仪式、冥想...",
    "guide.quickQuestions": "快速问题",
    
    // Emergency
    "emergency.title": "紧急和本地联系",
    "emergency.subtitle": "快速获取紧急服务和本地协助",
    "emergency.call": "呼叫",
    "emergency.sms": "短信",
    "emergency.location": "位置",
    
    // Gamification
    "rewards.title": "奖励与成就",
    "rewards.level": "等级",
    "rewards.coins": "神圣金币",
    "rewards.badges": "徽章",
    "rewards.achievements": "成就",
  },
  
  hi: {
    // Navigation
    "nav.home": "होम",
    "nav.tours": "वर्चुअल टूर",
    "nav.map": "नक्शा",
    "nav.archives": "अभिलेखागार",
    "nav.events": "कार्यक्रम",
    "nav.learning": "सीखना",
    "nav.guide": "AI गाइड",
    "nav.emergency": "आपातकाल",
    "nav.community": "समुदाय",
    "nav.rewards": "पुरस्कार",
    "nav.admin": "व्यवस्थापक",
    
    // Common
    "common.loading": "लोड हो रहा है...",
    "common.search": "खोजें",
    "common.filter": "फिल्टर",
    "common.close": "बंद करें",
    "common.save": "सहेजें",
    "common.cancel": "रद्द करें",
    "common.delete": "हटाएं",
    "common.edit": "संपादित करें",
    "common.view": "देखें",
    "common.share": "साझा करें",
    "common.download": "डाउनलोड",
    
    // Home page
    "home.title": "वर्चुअल यात्राओं के माध्यम से पवित्र मठों की खोज करें",
    "home.subtitle": "बौद्ध और तिब्बती मठों की आध्यात्मिक विरासत में डूब जाएं",
    "home.cta.tour": "वर्चुअल टूर शुरू करें",
    "home.cta.map": "मानचित्र देखें",
    
    // Auth
    "auth.signin": "साइन इन",
    "auth.signup": "साइन अप",
    "auth.logout": "लॉगआउट",
    "auth.email": "ईमेल",
    "auth.password": "पासवर्ड",
    "auth.name": "नाम",
    
    // Features
    "features.virtualTours": "360° वर्चुअल टूर",
    "features.archives": "डिजिटल अभिलेखागार",
    "features.events": "सांस्कृतिक कार्यक्रम",
    "features.aiGuide": "AI भिक्षु गाइड",
    "features.emergency": "आपातकालीन संपर्क",
    
    // AI Guide
    "guide.title": "AI भिक्षु गाइड",
    "guide.subtitle": "मठ की बुद्धिमत्ता के लिए आपका व्यक्तिगत आध्यात्मिक गाइड",
    "guide.placeholder": "मठ संस्कृति, अनुष्ठान, ध्यान के बारे में पूछें...",
    "guide.quickQuestions": "त्वरित प्रश्न",
    
    // Emergency
    "emergency.title": "आपातकालीन और स्थानीय संपर्क",
    "emergency.subtitle": "आपातकालीन सेवाओं और स्थानीय सहायता तक त्वरित पहुंच",
    "emergency.call": "कॉल करें",
    "emergency.sms": "SMS",
    "emergency.location": "स्थान",
    
    // Gamification
    "rewards.title": "पुरस्कार और उपलब्धियां",
    "rewards.level": "स्तर",
    "rewards.coins": "पवित्र सिक्के",
    "rewards.badges": "बैज",
    "rewards.achievements": "उपलब्धियां",
  },
  
  bo: {
    // Navigation - Tibetan
    "nav.home": "ཁྱིམ།",
    "nav.tours": "རྟོག་གེ་ལམ་སྟོན།",
    "nav.map": "ས་བཀྲ།",
    "nav.archives": "ཡིག་ཆ།",
    "nav.events": "མཛད་སྒོ།",
    "nav.learning": "སློབ་སྦྱོང་།",
    "nav.guide": "ཀླད་པ་ལམ་སྟོན།",
    "nav.emergency": "གཏུག་ཁྲིད།",
    "nav.community": "སྤྱི་ཚོགས།",
    "nav.rewards": "རྗེས་སུ་ཡི་རང་།",
    "nav.admin": "དོ་དམ།",
    
    // Common
    "common.loading": "འགེལ་བ་བཞིན་པ།",
    "common.search": "འཚོལ་བ།",
    "common.filter": "འདེམས་པ།",
    "common.close": "ཁ་རྒྱབ།",
    "common.save": "ཉར་ཚགས།",
    "common.cancel": "དོར་བ།",
    "common.delete": "བསུབ་པ།",
    "common.edit": "རྩོམ་སྒྲིག",
    "common.view": "མཐོང་བ།",
    "common.share": "བགོ་བཤུས།",
    "common.download": "ཕབ་ལེན།",
    
    // Home page
    "home.title": "རྟོག་གེ་ལམ་སྟོན་ནས་དམ་པའི་དགོན་པ་ཚུལ།",
    "home.subtitle": "ནང་པ་དང་བོད་ཀྱི་དགོན་པའི་སེམས་ཀྱི་རིང་ལུགས་ལ་ཞུགས།",
    "home.cta.tour": "རྟོག་གེ་ལམ་སྟོན་འགོ་ཚུགས།",
    "home.cta.map": "ས་བཀྲ་ལྟ་བ།",
    
    // Auth
    "auth.signin": "ནང་འཇུག",
    "auth.signup": "མིང་ཐོ་བཀོད།",
    "auth.logout": "ཕྱིར་འབུད།",
    "auth.email": "གློག་བརྙན།",
    "auth.password": "གསང་ཨང་།",
    "auth.name": "མིང་།",
    
    // Features
    "features.virtualTours": "༣༦༠° རྟོག་གེ་ལམ་སྟོན།",
    "features.archives": "གློག་རིག་ཡིག་ཆ།",
    "features.events": "རིག་གནས་མཛད་སྒོ།",
    "features.aiGuide": "ཀླད་པ་གྲྭ་པ་ལམ་སྟོན།",
    "features.emergency": "གཏུག་ཁྲིད་འབྲེལ་གཏུགས།",
    
    // AI Guide
    "guide.title": "ཀླད་པ་གྲྭ་པ་ལམ་སྟོན།",
    "guide.subtitle": "དགོན་པའི་ཤེས་རབ་ཀྱི་ཁྱེད་ཀྱི་གང་ཟག་སེམས་ཀྱི་ལམ་སྟོན།",
    "guide.placeholder": "དགོན་པའི་རིག་གནས་ཆོས་སྤྱོད་བསམ་གཏན་སྐོར་དྲི་བ།",
    "guide.quickQuestions": "མགྱོགས་པོ་དྲི་བ།",
    
    // Emergency
    "emergency.title": "གཏུག་ཁྲིད་དང་ས་གནས་འབྲེལ་གཏུགས།",
    "emergency.subtitle": "གཏུག་ཁྲིད་ཞབས་ཏོག་དང་ས་གནས་རོགས་རམ་མགྱོགས་འབྲེལ།",
    "emergency.call": "ཁ་པར།",
    "emergency.sms": "གསར་འགྱུར།",
    "emergency.location": "གནས་ས།",
    
    // Gamification
    "rewards.title": "རྗེས་སུ་ཡི་རང་དང་གྲུབ་འབྲས།",
    "rewards.level": "རིམ་པ།",
    "rewards.coins": "དམ་པའི་སྒོར་མོ།",
    "rewards.badges": "རྟགས་རིས།",
    "rewards.achievements": "གྲུབ་འབྲས།",
  },
  
  // Simplified versions for other languages
  ne: {
    "nav.home": "गृहपृष्ठ",
    "nav.tours": "भर्चुअल भ्रमण",
    "nav.map": "नक्सा",
    "common.loading": "लोड गर्दै...",
    "home.title": "भर्चुअल यात्राहरूमार्फत पवित्र गुम्बाहरू खोज्नुहोस्",
    "auth.signin": "साइन इन",
    "features.virtualTours": "360° भर्चुअल भ्रमण",
  },
  
  es: {
    "nav.home": "Inicio",
    "nav.tours": "Tours Virtuales", 
    "nav.map": "Mapa",
    "common.loading": "Cargando...",
    "home.title": "Descubre Monasterios Sagrados a través de Viajes Virtuales",
    "auth.signin": "Iniciar Sesión",
    "features.virtualTours": "Tours Virtuales 360°",
  },
  
  fr: {
    "nav.home": "Accueil",
    "nav.tours": "Visites Virtuelles",
    "nav.map": "Carte", 
    "common.loading": "Chargement...",
    "home.title": "Découvrez les Monastères Sacrés à travers des Voyages Virtuels",
    "auth.signin": "Se Connecter",
    "features.virtualTours": "Visites Virtuelles 360°",
  },
  
  de: {
    "nav.home": "Startseite",
    "nav.tours": "Virtuelle Touren",
    "nav.map": "Karte",
    "common.loading": "Laden...",
    "home.title": "Entdecken Sie Heilige Klöster durch Virtuelle Reisen",
    "auth.signin": "Anmelden",
    "features.virtualTours": "360° Virtuelle Touren",
  },
  
  ja: {
    "nav.home": "ホーム",
    "nav.tours": "バーチャルツアー",
    "nav.map": "地図",
    "common.loading": "読み込み中...",
    "home.title": "バーチャルジャーニーで神聖な僧院を発見",
    "auth.signin": "サインイン",
    "features.virtualTours": "360°バーチャルツアー",
  },
  
  ko: {
    "nav.home": "홈",
    "nav.tours": "가상 투어", 
    "nav.map": "지도",
    "common.loading": "로딩 중...",
    "home.title": "가상 여행을 통해 신성한 수도원을 발견하세요",
    "auth.signin": "로그인",
    "features.virtualTours": "360° 가상 투어",
  }
}

const languageNames = {
  en: "English",
  zh: "中文",
  hi: "हिन्दी", 
  ne: "नेपाली",
  bo: "བོད་ཡིག",
  es: "Español",
  fr: "Français",
  de: "Deutsch", 
  ja: "日本語",
  ko: "한국어"
}

const rtlLanguages: Language[] = [] // Add RTL languages if needed

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("preferred-language") as Language
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage)
    } else {
      // Detect browser language
      const browserLang = navigator.language.split("-")[0] as Language
      if (translations[browserLang]) {
        setCurrentLanguage(browserLang)
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang)
    localStorage.setItem("preferred-language", lang)
    
    // Update document direction and lang attribute
    document.documentElement.lang = lang
    document.documentElement.dir = rtlLanguages.includes(lang) ? "rtl" : "ltr"
  }

  const t = (key: string): string => {
    const langTranslations = translations[currentLanguage] || translations.en
    return (langTranslations as any)[key] || (translations.en as any)[key] || key
  }

  const isRTL = rtlLanguages.includes(currentLanguage)

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        t,
        isRTL
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export { languageNames, type Language }