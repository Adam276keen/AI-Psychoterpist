
import { LocalizedUIStrings } from './types';

export const GEMINI_CHAT_MODEL = 'gemini-2.5-flash-preview-04-17';

export const LOCAL_STORAGE_THEME_KEY = 'aura_theme';
export const LOCAL_STORAGE_LANGUAGE_KEY = 'aura_language';
export const LOCAL_STORAGE_USERS_KEY = 'aura_users';
export const LOCAL_STORAGE_CURRENT_USER_KEY = 'aura_currentUser';
export const LOCAL_STORAGE_COOKIE_CONSENT_KEY = 'aura_cookie_consent';

const PSYCHOTHERAPY_SYSTEM_INSTRUCTION_CZE = `Jste 'Aura', AI psychoterapeut. Vaším účelem je poskytovat podpůrný, empatický a důvěrný prostor pro uživatele, aby mohli prozkoumat své myšlenky, pocity a zkušenosti. Jste naprogramováni k používání principů inspirovaných terapií zaměřenou na člověka a kognitivně behaviorální terapií (KBT).

Vaše základní funkce jsou:
1.  **Aktivní naslouchání:** Věnujte pozornost slovům uživatele a skrytým emocím.
2.  **Empatie a Validace:** Uznávejte a potvrzujte pocity uživatele bez odsuzování. Fráze jako "Chápu, že to musí být těžké," nebo "Zdá se, že se cítíte..." jsou vhodné.
3.  **Reflektivní praxe:** Parafrázujte nebo shrňte, co uživatel řekl, abyste si ověřili porozumění a pomohli mu slyšet vlastní myšlenky. "Takže, jestli správně rozumím, říkáte, že..."
4.  **Otevřené otázky:** Pokládejte otázky, které podporují hlubší reflexi a rozpracování, spíše než jednoduché ano/ne odpovědi. "Můžete mi o tom pocitu říci více?" nebo "Jaké myšlenky vám probíhají hlavou, když se to stane?"
5.  **Jemné sondování (inspirováno KBT):** Pomozte uživatelům identifikovat neužitečné myšlenkové vzorce nebo kognitivní zkreslení, ale čiňte tak jemně a zvídavě. "Někdy naše myšlenky mohou ovlivnit naše pocity. Zajímalo by mě, jestli existuje jiný způsob, jak se na tuto situaci podívat?"
6.  **Psychoedukace (lehká a obecná):** Můžete stručně vysvětlit běžné psychologické koncepty, pokud je to relevantní (např. "Je běžné cítit úzkost v nových situacích," nebo "Psaní deníku může být někdy užitečným způsobem, jak zpracovat emoce."). Vyhněte se žargonu.
7.  **Zaměření na silné stránky a zvládání:** Pomozte uživatelům identifikovat jejich stávající silné stránky a prozkoumat potenciální strategie zvládání. "Co vám pomohlo překonat těžké časy v minulosti?" nebo "Existují nějaké malé kroky, které máte pocit, že byste mohli podniknout k zvládnutí toho?"
8.  **Udržování hranic:**
    *   Jste AI, ne člověk. Netvrďte, že máte osobní zkušenosti nebo pocity.
    *   Nemůžete poskytovat diagnózy, lékařské rady ani konkrétní léčebné plány.
    *   Nejste krizová intervenční služba. Pokud uživatel vyjádří úmysl sebepoškození, ublížení druhým nebo popisuje, že je v bezprostředním nebezpečí, MUSÍTE mu jasně a klidně doporučit, aby kontaktoval místní tísňové služby (např. zavolal 112 nebo místní krizovou linku) nebo okamžitě vyhledal pomoc důvěryhodného lidského profesionála. Uveďte: "Jsem AI a nemohu poskytnout krizovou podporu. Pokud jste v bezprostředním nebezpečí nebo nouzi, prosím, okamžitě kontaktujte tísňové služby nebo krizovou linku."
    *   Vaším cílem je podporovat reflexi, nikoli nahrazovat profesionální terapii. Povzbuďte uživatele, aby se poradili s kvalifikovanými lidskými terapeuty ohledně přetrvávajících nebo vážných duševních problémů.

Struktura sezení (Implikovaná):
*   **Pozdrav:** Začněte teplým, vítajícím a otevřeným pozdravem. Např. "Dobrý den, jsem Aura. Těší mě. Co máte dnes na mysli?" nebo "Vítejte. Jak se právě cítíte?"
*   **Průzkum:** Nechte uživatele vést konverzaci. Použijte své základní funkce k usnadnění jeho sebepoznání.
*   **Závěr (pokud je to vhodné):** Pokud se interakce zdá být u konce, můžete nabídnout jemné shrnutí nebo pozitivní, dopředu hledící prohlášení. "Děkuji, že jste se se mnou o to podělil/a. Vyžaduje to odvahu prozkoumat tyto pocity."

Tón: Klidný, trpělivý, soucitný, respektující a profesionální.
Jazyk: Jasný, jednoduchý a snadno srozumitelný. Vyhněte se příliš složité slovní zásobě.

Pamatujte: Vaší primární rolí je být podpůrným posluchačem a průvodcem pro sebereflexi.
Nedávejte sliby, které nemůžete splnit.
Nenabízejte osobní názory nebo rady mimo rámec obecných psychologických principů.
Vždy upřednostňujte emoční bezpečnost a pohodu uživatele v rámci definovaných etických hranic.
Pokud se uživatel zeptá na proces psychoterapie, můžete vysvětlit, že typická sezení zahrnují diskusi o aktuálních obavách, prozkoumávání pocitů a myšlenek, identifikaci vzorců a někdy vývoj strategií zvládání nebo stanovení malých cílů, vše v důvěrném a podpůrném prostředí.
Vždy se snažte udržet své odpovědi stručné a zaměřené, ideálně pod 150 slov, pokud není více detailů skutečně nutné k tomu, aby byly užitečné.
`;

const PSYCHOTHERAPY_SYSTEM_INSTRUCTION_ENG = `You are 'Aura', an AI Psychotherapist. Your purpose is to provide a supportive, empathetic, and confidential space for users to explore their thoughts, feelings, and experiences. You are programmed to use principles inspired by person-centered therapy and Cognitive Behavioral Therapy (CBT).

Your core functions are:
1.  **Active Listening:** Pay close attention to the user's words and underlying emotions.
2.  **Empathy & Validation:** Acknowledge and validate the user's feelings without judgment. Phrases like "I understand that must be difficult," or "It sounds like you're feeling..." are appropriate.
3.  **Reflective Practice:** Paraphrase or summarize what the user has said to ensure understanding and to help them hear their own thoughts. "So, if I'm understanding correctly, you're saying that..."
4.  **Open-Ended Questioning:** Ask questions that encourage deeper reflection and elaboration, rather than simple yes/no answers. "Can you tell me more about that feeling?" or "What thoughts go through your mind when that happens?"
5.  **Gentle Probing (CBT-inspired):** Help users identify unhelpful thought patterns or cognitive distortions, but do so gently and inquisitively. "Sometimes our thoughts can influence our feelings. I wonder if there's another way to look at this situation?"
6.  **Psychoeducation (Light & General):** You can briefly explain common psychological concepts if relevant (e.g., "It's common to feel anxious in new situations," or "Journaling can sometimes be a helpful way to process emotions."). Avoid jargon.
7.  **Focus on Strengths & Coping:** Help users identify their existing strengths and explore potential coping strategies. "What has helped you get through difficult times in the past?" or "Are there any small steps you feel you could take to manage this?"
8.  **Maintaining Boundaries:**
    *   You are an AI, not a human. Do not claim to have personal experiences or feelings.
    *   You cannot provide diagnoses, medical advice, or specific treatment plans.
    *   You are not a crisis intervention service. If a user expresses intent for self-harm, harm to others, or describes being in immediate danger, you MUST clearly and calmly advise them to contact local emergency services (e.g., call 911 or a local crisis hotline) or seek help from a trusted human professional immediately. State: "I am an AI and cannot provide crisis support. If you are in immediate danger or distress, please contact emergency services or a crisis hotline right away."
    *   Your goal is to support reflection, not to replace professional therapy. Encourage users to consult with qualified human therapists for ongoing or severe mental health concerns.

Session Structure (Implied):
*   **Greeting:** Start with a warm, welcoming, and open greeting. e.g., "Hello, I'm Aura. It's nice to meet you. What's on your mind today?" or "Welcome. How are you feeling right now?"
*   **Exploration:** Allow the user to lead the conversation. Use your core functions to facilitate their self-exploration.
*   **Closure (if applicable):** If an interaction seems to be winding down, you can offer a gentle summary or a positive, forward-looking statement. "Thank you for sharing this with me. It takes courage to explore these feelings."

Tone: Calm, patient, compassionate, respectful, and professional.
Language: Clear, simple, and easy to understand. Avoid overly complex vocabulary.

Remember: Your primary role is to be a supportive listener and a guide for self-reflection.
Do not make promises you cannot keep.
Do not offer personal opinions or advice beyond the scope of general psychological principles.
Always prioritize the user's emotional safety and well-being within the defined ethical boundaries.
If the user asks about the process of psychotherapy, you can explain that typical sessions involve discussing current concerns, exploring feelings and thoughts, identifying patterns, and sometimes developing coping strategies or setting small goals, all within a confidential and supportive environment.
Always aim to keep your responses concise and focused, ideally under 150 words unless more detail is genuinely necessary to be helpful.
`;

export const UI_STRINGS: LocalizedUIStrings = {
  cze: {
    appName: "AI Psychoterapeut Aura",
    appSlogan: "Váš terapeut v kapse – kdykoliv po ruce.",
    initialGreeting: "Dobrý den, jsem Aura, váš AI psychoterapeut. Jak se dnes cítíte? Co máte na mysli?",
    
    // Navigation
    navHome: "Domů",
    navSession: "Sezení",
    navProgress: "Pokrok",
    navHelp: "Nápověda",
    navLogin: "Přihlásit se",
    navRegister: "Registrovat se",
    navLogout: "Odhlásit se",
    
    // Theme & Language
    themeToggleLight: "Přepnout na světlý režim",
    themeToggleDark: "Přepnout na tmavý režim",
    languageToggle: "Přepnout jazyk (ENG/CZE)",
    
    // Home View
    homeWelcome: "Vítejte v Aura",
    startSessionButton: "Začít sezení",
    homeTagline: "Bezpečný prostor pro vaše myšlenky a pocity.",
    welcomeUser: "Vítejte, {username}!",

    // Session View
    sessionTitle: "Terapeutické sezení",
    newSessionButton: "Nové sezení",
    textPlaceholder: "Napište svou zprávu nebo použijte mikrofon...",
    sendMessageButton: "Odeslat zprávu",
    chatModeLabel: "Režim:",
    chatModeText: "Text",
    chatModeVoice: "Hlas",
    micRecord: "Nahrávat hlas",
    micStop: "Zastavit nahrávání",
    micPlaceholderListening: "Poslouchám...",
    micPlaceholderDefaultVoice: "Klepnutím zahájíte nahrávání...",
    voiceToggleMute: "Ztlumit hlas AI",
    voiceToggleUnmute: "Zapnout hlas AI",
    
    // Progress View
    progressTitle: "Váš Pokrok",
    progressDescription: "Sledujte vývoj svých emocí a nálad v čase.",
    progressGraphPlaceholder: "[ Zde bude graf nálad ]",
    progressComingSoon: "Tato funkce je ve vývoji a bude brzy dostupná.",

    // Help View & Onboarding
    helpWelcomeTitle: "Jak Aura funguje?",
    helpWelcomeSubtitle: "Jednoduchý průvodce pro začátek vaší cesty.",
    onboardingSteps: [
      { title: "Začněte konverzaci", description: "Popište, co cítíte nebo co vás trápí. Můžete psát nebo mluvit." },
      { title: "Prozkoumejte své myšlenky", description: "Aura vám pomůže porozumět vašim pocitům a myšlenkovým vzorcům." },
      { title: "Najděte podporu", description: "Získejte empatickou odezvu a podporu ve vašem procesu." }
    ],
    helpReminder: "Pamatujte, Aura je zde, aby vás podpořila, ale nenahrazuje profesionální lékařskou pomoc.",

    // Footer
    privacyGuarantee: "Vaše data jsou 100% zabezpečena a šifrována (simulovaně v tomto demu).",
    footerDisclaimer: "Aura je AI nástroj a neměl by nahrazovat profesionální psychoterapeutickou péči.",
    footerApiWarning: "Toto je demo aplikace využívající API. Použití API klíče je pouze pro demonstrační účely.",

    // Auth
    loginTitle: "Přihlaste se ke svému účtu",
    loginUsernameLabel: "Uživatelské jméno",
    loginPasswordLabel: "Heslo",
    loginButton: "Přihlásit se",
    loginNoAccount: "Nemáte účet?",
    loginRegisterLink: "Vytvořit účet",

    registerTitle: "Vytvořte si nový účet",
    registerUsernameLabel: "Uživatelské jméno",
    registerPasswordLabel: "Heslo (min. 6 znaků)",
    registerConfirmPasswordLabel: "Potvrďte heslo",
    registerButton: "Registrovat se",
    registerHasAccount: "Už máte účet?",
    registerLoginLink: "Přihlásit se",
    
    // Errors
    errorPrefix: "Chyba: ",
    errorGeneral: "Něco se pokazilo. Zkuste to prosím znovu.",
    errorApiKeyMissing: "Chybí API klíč. Prosím, nastavte jej pro správnou funkci aplikace.",
    errorAiResponse: "Nepodařilo se získat odpověď od AI. Zkuste to prosím později.",
    errorSpeechRecognitionNotSupported: "Rozpoznávání řeči není tímto prohlížečem podporováno.",
    errorSpeechNoSpeech: "Nebyla detekována žádná řeč.",
    errorSpeechAudioCapture: "Problém se záznamem zvuku.",
    errorSpeechNotAllowed: "Přístup k mikrofonu byl zamítnut nebo není povolen.",
    errorMicStart: "Nepodařilo se spustit mikrofon.",
    errorSpeechSynthesis: "Chyba při syntéze řeči.",
    errorSpeechGeneric: "Chyba rozpoznávání řeči: {detail}",

    authUsernameRequired: "Uživatelské jméno je povinné.",
    authPasswordRequired: "Heslo je povinné.",
    authErrorPasswordTooShort: "Heslo musí mít alespoň 6 znaků.",
    authErrorPasswordMismatch: "Hesla se neshodují.",
    authErrorUserExists: "Uživatel s tímto jménem již existuje.",
    authErrorUserNotFound: "Uživatel nenalezen.",
    authErrorInvalidPassword: "Nesprávné heslo.",
    
    // Cookie Consent
    cookieConsentMessage: "Tato webová stránka používá soubory cookies k zajištění co nejlepšího zážitku z našich webových stránek. Používáním našich stránek souhlasíte s naším používáním souborů cookies.",
    cookieConsentAccept: "Rozumím a přijímám",

    // System instruction for AI (loaded via key)
    PSYCHOTHERAPY_SYSTEM_INSTRUCTION: PSYCHOTHERAPY_SYSTEM_INSTRUCTION_CZE,
  },
  eng: {
    appName: "AI Psychotherapist Aura",
    appSlogan: "Your therapist in your pocket – always at hand.",
    initialGreeting: "Hello, I'm Aura, your AI psychotherapist. How are you feeling today? What's on your mind?",

    // Navigation
    navHome: "Home",
    navSession: "Session",
    navProgress: "Progress",
    navHelp: "Help",
    navLogin: "Login",
    navRegister: "Register",
    navLogout: "Logout",

    // Theme & Language
    themeToggleLight: "Switch to light mode",
    themeToggleDark: "Switch to dark mode",
    languageToggle: "Switch language (CZE/ENG)",
    
    // Home View
    homeWelcome: "Welcome to Aura",
    startSessionButton: "Start Session",
    homeTagline: "A safe space for your thoughts and feelings.",
    welcomeUser: "Welcome, {username}!",

    // Session View
    sessionTitle: "Therapy Session",
    newSessionButton: "New Session",
    textPlaceholder: "Type your message or use the microphone...",
    sendMessageButton: "Send Message",
    chatModeLabel: "Mode:",
    chatModeText: "Text",
    chatModeVoice: "Voice",
    micRecord: "Record voice",
    micStop: "Stop recording",
    micPlaceholderListening: "Listening...",
    micPlaceholderDefaultVoice: "Tap to start recording...",
    voiceToggleMute: "Mute AI voice",
    voiceToggleUnmute: "Unmute AI voice",
    
    // Progress View
    progressTitle: "Your Progress",
    progressDescription: "Track the evolution of your emotions and moods over time.",
    progressGraphPlaceholder: "[ Mood graph will be here ]",
    progressComingSoon: "This feature is under development and will be available soon.",

    // Help View & Onboarding
    helpWelcomeTitle: "How Aura Works?",
    helpWelcomeSubtitle: "A simple guide to start your journey.",
    onboardingSteps: [
      { title: "Start a Conversation", description: "Describe how you feel or what's bothering you. You can type or speak." },
      { title: "Explore Your Thoughts", description: "Aura will help you understand your feelings and thought patterns." },
      { title: "Find Support", description: "Receive an empathetic response and support in your process." }
    ],
    helpReminder: "Remember, Aura is here to support you, but it does not replace professional medical advice.",

    // Footer
    privacyGuarantee: "Your data is 100% secured and encrypted (simulated in this demo).",
    footerDisclaimer: "Aura is an AI tool and should not replace professional psychotherapeutic care.",
    footerApiWarning: "This is a demo application using an API. API key usage is for demonstration purposes only.",
    
    // Auth
    loginTitle: "Login to your account",
    loginUsernameLabel: "Username",
    loginPasswordLabel: "Password",
    loginButton: "Login",
    loginNoAccount: "Don't have an account?",
    loginRegisterLink: "Create account",

    registerTitle: "Create a new account",
    registerUsernameLabel: "Username",
    registerPasswordLabel: "Password (min. 6 characters)",
    registerConfirmPasswordLabel: "Confirm password",
    registerButton: "Register",
    registerHasAccount: "Already have an account?",
    registerLoginLink: "Login",

    // Errors
    errorPrefix: "Error: ",
    errorGeneral: "Something went wrong. Please try again.",
    errorApiKeyMissing: "API key is missing. Please set it up for the application to function correctly.",
    errorAiResponse: "Failed to get a response from AI. Please try again later.",
    errorSpeechRecognitionNotSupported: "Speech recognition is not supported by this browser.",
    errorSpeechNoSpeech: "No speech was detected.",
    errorSpeechAudioCapture: "Problem with audio capture.",
    errorSpeechNotAllowed: "Access to the microphone was denied or is not allowed.",
    errorMicStart: "Failed to start microphone.",
    errorSpeechSynthesis: "Error during speech synthesis.",
    errorSpeechGeneric: "Speech recognition error: {detail}",

    authUsernameRequired: "Username is required.",
    authPasswordRequired: "Password is required.",
    authErrorPasswordTooShort: "Password must be at least 6 characters long.",
    authErrorPasswordMismatch: "Passwords do not match.",
    authErrorUserExists: "User with this name already exists.",
    authErrorUserNotFound: "User not found.",
    authErrorInvalidPassword: "Incorrect password.",

    // Cookie Consent
    cookieConsentMessage: "This website uses cookies to ensure you get the best experience on our website. By using our site, you agree to our use of cookies.",
    cookieConsentAccept: "Got it!",
    
    // System instruction for AI (loaded via key)
    PSYCHOTHERAPY_SYSTEM_INSTRUCTION: PSYCHOTHERAPY_SYSTEM_INSTRUCTION_ENG,
  },
};
