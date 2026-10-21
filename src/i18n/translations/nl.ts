import type { en } from "./en";

// Nederlandse vertaling van de.ts (zelfde structuur en volgorde als de.ts/en.ts).
// De portaalsecties (portal, investorPortal, manufacturerPortal, clinicPortal, partnerPortal,
// adminPortal, mockData) zijn bewust weggelaten: ze vallen via LanguageContext terug op Engels.
// Alle andere secties moeten volledig zijn; dat controleert het type hieronder.
type PortalSections =
  | "portal"
  | "investorPortal"
  | "manufacturerPortal"
  | "clinicPortal"
  | "partnerPortal"
  | "adminPortal"
  | "mockData";

export const nl = {
  // Navbar
  nav: {
    clinics: "Tandartspraktijken",
    manufacturers: "Fabrikanten",
    investors: "Investeerders",
    strategicPartners: "Partners",
    login: "Inloggen",
    logout: "Uitloggen",
    contact: "Contact",
    backToHome: "Naar de homepage",
    contactTitle: "Contact",
    contactDesc: "Neem contact op met DentoPoint",
    email: "E-mail",
    address: "Adres",
    clinicsItems: {
      overview: "Overzicht",
      revenue: "Voordelen voor de praktijk",
      implementation: "Zo gaat u van start",
      workflow: "Werkwijze in de praktijk",
      compliance: "Privacy & veiligheid",
      portal: "Praktijkportaal",
    },
    manufacturersItems: {
      overview: "Overzicht",
      integration: "Opname in het assortiment",
      data: "Verkoopcijfers & telemetrie",
      performance: "Huidige stand van zaken",
      distribution: "Logistiek & bijvullen",
      portal: "Fabrikantenportaal",
    },
    investorsItems: {
      overview: "Overzicht",
      market: "Markt",
      scaling: "Roadmap",
      kpis: "Kerncijfers",
      expansion: "Regio's",
      portal: "Investeerdersportaal",
    },
    partnersItems: {
      tech: "Techniek",
      healthcare: "Praktijken & netwerken",
      academic: "Wetenschap & bijscholing",
      industry: "Industrie",
      global: "Regio's",
      portal: "Partnerportaal",
    },
  },

  // Hero
  hero: {
    kicker: "De dental-care-automaat voor tandartspraktijken",
    title: "Aanbevolen mondverzorgingsproducten direct verkrijgbaar in de praktijk",
    subtitle: "DentoPoint plaatst een dental-care-automaat in uw tandartspraktijk. Patiënten kopen daar de producten die hun tandarts aanbeveelt. Uw team vult de automaat bij, uw praktijk verdient mee aan de verkoop.",
    marketNote: "DentoPoint start momenteel met de eerste partnerpraktijken in Duitsland.",
    ctaClinics: "Informatie voor tandartspraktijken",
    ctaConsult: "Adviesgesprek aanvragen",
    ctaManufacturers: "Voor fabrikanten",
    forClinics: "Voor tandartspraktijken",
    forManufacturers: "Voor fabrikanten",
    forInvestors: "Voor investeerders",
    strategicPartners: "Partners",
  },

  // Infrastructure
  infrastructure: {
    label: "De automaat",
    title: "Wat er in uw praktijk staat",
    smartCareTitle: "De DentoPoint-automaat",
    smartCareDesc: "Een staand apparaat met een touchscreen van 32 inch voor de wachtruimte of de receptie van een tandartspraktijk. Daarin: mondverzorgingsproducten en voedingssupplementen van onze partnerfabrikanten. Patiënten betalen met pinpas of creditcard direct aan het apparaat. Uitvoering in zwart.",
    whiteEdition: "White Edition",
    blackEdition: "Black Edition",
    aiImageAlt: "Visualisatie van de DentoPoint-automaat (Zhongda ZD-C-32) met de DentoPoint-interface op het scherm",
    aiImageNote: "Visualisatie op basis van een productfoto van de fabrikant (Zhongda). De interface op het scherm is echt; de kaartterminal en het uitgiftevak kunnen er op het apparaat anders uitzien.",
    tags: ["Kaartbetaling aan het apparaat", "Producten op aanbeveling van de tandarts", "Vulniveau en telemetrie via de operatorsoftware", "Productinformatie, video's en QR-codes op het touchscreen"],
    features: [
      { title: "Past in de praktijk", description: "Een staand apparaat dat een stopcontact en een internetaansluiting nodig heeft. De praktijk zorgt voor de ruimte, DentoPoint regelt de rest." },
      { title: "Kaartbetaling aan het apparaat", description: "Patiënten betalen direct aan de automaat. De praktijk heeft niets te maken met contant geld, facturen of boekhouding." },
      { title: "Bijvullen door uw team", description: "Uw praktijkteam vult de automaat bij. De beheeromgeving toont de voorraad en wat er nabesteld moet worden. Bij onderhoud en storingen helpt DentoPoint." },
      { title: "Producten op aanbeveling", description: "Het assortiment wordt samen met de praktijk samengesteld uit de producten van onze partnerfabrikanten. De tandarts adviseert, de patiënt beslist." },
    ],
  },

  // Locator
  locator: {
    label: "Locaties",
    title: "Onze eerste locatie",
    locationName: "Zahnarztpraxis Olga Henriette Seifert",
    locationAddress: "Clarenbachstraße 2, 50931 Köln",
    locationNote: "Hier staat de eerste DentoPoint-automaat.",
    viewProducts: "Bekijk de producten in deze automaat",
    moreSoon: "Meer locaties volgen.",
    mapNote: "Kaart: OpenStreetMap",
  },

  // Partners (landing page section)
  partnersSection: {
    label: "Samenwerking",
    title: "Voor tandartspraktijken en fabrikanten",
    types: [
      { title: "Tandartspraktijken", desc: "Wilt u een DentoPoint-automaat in uw praktijk plaatsen? Wij adviseren u persoonlijk over de locatie, het assortiment en de werkwijze. De praktijk zorgt voor de ruimte, meer niet." },
      { title: "Fabrikanten", desc: "Produceert u mondverzorgingsproducten of voedingssupplementen die tandartsen aanbevelen? Samen bekijken we of uw producten in het assortiment van de automaat passen." },
    ],
    benefits: ["Uw praktijk verdient mee", "Assortiment op aanbeveling van de tandarts", "Persoonlijk aanspreekpunt", "Start in Duitsland"],
  },

  // Manufacturers Section
  manufacturersSection: {
    label: "Onze partners",
    title: "Deze fabrikanten doen al mee",
    dataLabel: "Gegevens",
  },

  // Categories
  categories: {
    label: "Assortiment",
    title: "Wat patiënten in de automaat vinden",
    items: [
      { name: "Therapeutische tandpasta's", desc: "Voor gevoelige tanden, bescherming tegen cariës en tandvleesverzorging." },
      { name: "Mondspoelingen", desc: "Antibacteriële en therapeutische mondspoelingen voor de dagelijkse mondhygiëne." },
      { name: "Tandenborstels", desc: "Ultrazachte en chirurgische tandenborstels voor voorzichtig poetsen." },
      { name: "Voedingssupplementen", desc: "Vitaminen en mineralen ter ondersteuning van tanden, tandvlees en mondgezondheid." },
      { name: "Sensitive Care", desc: "Milde producten voor gevoelige tanden en gevoelig tandvlees, bijvoorbeeld na een behandeling." },
      { name: "Verzorging van aligners & bitjes", desc: "Reiniging en verzorging van aligners, retainers en knarsbitjes." },
    ],
  },

  // Footer
  contactDialog: {
    defaultTitle: "Contact opnemen",
    defaultDescription: "Neem contact met ons op",
    demoTitle: "Demo plannen",
    partnerTitle: "Partner worden",
    name: "Naam *",
    email: "E-mail *",
    company: "Bedrijf / kliniek",
    role: "Rol",
    rolePlaceholder: "Maak een keuze",
    roleClinic: "Kliniek",
    roleManufacturer: "Fabrikant",
    rolePartner: "Partner",
    roleOther: "Overig",
    phone: "Telefoon (optioneel)",
    message: "Bericht *",
    copyEmail: "{email} kopiëren",
    sending: "Wordt verzonden …",
    send: "Aanvraag versturen",
    thanks: "Hartelijk dank!",
    thanksDesc: "Uw aanvraag is naar ons team verstuurd. U ontvangt binnenkort een bevestiging per e-mail.",
    close: "Sluiten",
    copied: "E-mailadres gekopieerd",
    copyFailed: "Kopiëren mislukt",
    sendFailed: "Verzenden mislukt",
    sendFailedDesc: "Probeer het opnieuw of schrijf direct naar info@dentopoint.care.",
    errName: "Vul uw naam in",
    errEmail: "Vul een geldig e-mailadres in",
    errMessage: "Schrijf een kort bericht (min. 10 tekens)",
  },
  footer: {
    description: "Dental-care-automaten voor tandartspraktijken. Start met de eerste partnerpraktijken in Duitsland.",
    platform: "Overzicht",
    legal: "Juridisch",
    impressum: "Colofon",
    privacyPolicy: "Privacyverklaring",
    contactLabel: "Contact",
    language: "Taal",
    copyright: "© {year} DentoPoint GbR, Köln. Alle rechten voorbehouden.",
    tagline: "Dental-care-automaten · Duitsland",
  },

  // De zin "Deze vertaling is bedoeld ter informatie; de Duitse versie is juridisch bindend."
  // staat in src/pages/Datenschutz.tsx, zodat de structuur gelijk blijft aan de.ts/en.ts.
  privacy: {
    title: "Privacyverklaring",
    sections: [
      { h: "1. Verwerkingsverantwoordelijke", p: "DentoPoint GbR, vertegenwoordigd door de vennoten Olga Henriette Seifert, Michael Kassig en Peter Corovic. Clarenbachstraße 6, 50931 Köln, Duitsland. Telefoon: +49 173 5108172. E-mail: info@dentopoint.care" },
      { h: "2. Algemeen", p: "Wij verwerken persoonsgegevens alleen voor zover dat nodig is voor een goed werkende website, het beantwoorden van uw aanvragen en de portalen. De rechtsgronden zijn art. 6, lid 1, sub b AVG (overeenkomst en aanvraag), sub c (wettelijke verplichtingen) en sub f (gerechtvaardigd belang bij een veilig en goed werkend aanbod). Wij verwijderen gegevens zodra het doel vervalt en er geen wettelijke bewaartermijnen aan in de weg staan. Dienstverleners die in onze opdracht gegevens verwerken, zijn op grond van art. 28 AVG aan onze instructies gebonden." },
      { h: "3. Beschikbaarstelling van de website en serverlogs", p: "De website wordt geleverd via het netwerk van Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA. Daarbij worden verbindingsgegevens verwerkt: IP-adres, datum en tijd, opgevraagde pagina, browser en besturingssysteem, verwijzende pagina. Cloudflare gebruikt deze gegevens voor de levering en ter bescherming tegen aanvallen. De website zelf wordt aangeboden door Lovable (Stockholm, Zweden) of op een eigen server van DentoPoint GbR in Duitsland. De rechtsgrond is art. 6, lid 1, sub f AVG. Logs worden slechts zo lang bewaard als nodig is voor de werking en de beveiliging." },
      { h: "4. Doorgifte naar de VS", p: "Cloudflare is gecertificeerd onder het EU-US Data Privacy Framework. Voor de VS geldt daarmee een adequaatheidsbesluit van de Europese Commissie (art. 45 AVG)." },
      { h: "5. Contactformulier en e-mail", p: "Als u via het contactformulier of per e-mail contact met ons opneemt, verwerken wij uw gegevens (naam, e-mailadres, bedrijf, eventueel telefoonnummer, bericht) om uw aanvraag te behandelen. Het formulier stuurt de aanvraag per e-mail naar DentoPoint en een bevestiging naar u. Voor de verzending staat de aanvraag kort in een wachtrij in onze database; daarna blijft alleen een verzendlog over (ontvanger, tijdstip, status). De verzending verloopt via de e-maildienst van Lovable. De rechtsgrond is art. 6, lid 1, sub b en f AVG. De gegevens worden verwijderd zodra uw aanvraag volledig is afgehandeld, tenzij wettelijke bewaartermijnen gelden, bijvoorbeeld voor zakelijke correspondentie." },
      { h: "6. E-mails van ons en afmelden", p: "Wij sturen alleen e-mails die verband houden met uw aanvraag of uw account, bijvoorbeeld de ontvangstbevestiging. Reclame-e-mails en nieuwsbrieven versturen wij niet. Elke e-mail bevat een afmeldlink naar de pagina dentopoint.care/unsubscribe. Als u zich afmeldt, zetten wij uw e-mailadres op een blokkeerlijst, zodat u geen e-mails meer ontvangt. De rechtsgrond is art. 6, lid 1, sub c en f AVG. Deze vermelding bewaren wij zolang die nodig is om uw afmelding te respecteren." },
      { h: "7. Gebruikersaccounts en portalen", p: "Voor geregistreerde gebruikers (tandartspraktijken, fabrikanten, partners, beheerders) verwerken wij de bij de registratie opgegeven gegevens om de portalen beschikbaar te stellen. Inloggen en gegevensopslag verlopen via een backenddienst op basis van Supabase. De rechtsgrond is art. 6, lid 1, sub b AVG. De gegevens worden verwijderd wanneer het account wordt opgeheven en er geen bewaartermijnen aan in de weg staan." },
      { h: "8. Kaartweergave", p: "Voor de weergave van onze locaties gebruiken wij kaartmateriaal van OpenStreetMap (OpenStreetMap Foundation, Cambridge, Verenigd Koninkrijk). Bij het laden van de kaart wordt uw IP-adres naar hun servers verzonden. Voor het Verenigd Koninkrijk geldt een adequaatheidsbesluit van de Europese Commissie. De rechtsgrond is art. 6, lid 1, sub f AVG." },
      { h: "9. Lettertypen", p: "De lettertypen van deze website worden van onze eigen server geladen. Er is geen verbinding met Google of andere aanbieders van lettertypen." },
      { h: "10. Cookies en lokale opslag", p: "Wij slaan in uw browser alleen op wat technisch nodig is voor de website: uw taalkeuze en, als u inlogt, de inlogsessie (§ 25, lid 2, TDDDG). Wij gebruiken geen analyse-, tracking- of marketingtools. Daarom is er ook geen cookiebanner." },
      { h: "11. Uw rechten", p: "U hebt recht op inzage (art. 15 AVG), rectificatie (art. 16), wissing (art. 17), beperking van de verwerking (art. 18) en overdraagbaarheid van gegevens (art. 20). Voor zover wij gegevens verwerken op grond van een gerechtvaardigd belang, kunt u daar op elk moment bezwaar tegen maken (art. 21). Verzoeken kunt u richten aan info@dentopoint.care." },
      { h: "12. Recht om een klacht in te dienen", p: "U kunt een klacht indienen bij een toezichthoudende autoriteit voor gegevensbescherming, bijvoorbeeld bij de voor ons bevoegde toezichthouder van de deelstaat Noordrijn-Westfalen, de Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW), Kavalleriestraße 2–4, 40213 Düsseldorf." },
      { h: "13. Verplichting tot verstrekking", p: "U bent niet verplicht ons gegevens te verstrekken. Zonder de gegevens in het contactformulier kunnen wij uw aanvraag echter niet beantwoorden, en zonder registratie kunnen wij geen portaal beschikbaar stellen. Wij nemen geen geautomatiseerde besluiten en stellen geen profielen op." },
      { h: "14. Wijzigingen", p: "Wij passen deze privacyverklaring aan wanneer de wetgeving of de functies veranderen. De hier gepubliceerde versie is van toepassing. Versie: oktober 2026." },
    ],
  },

  clinicsPage: {
    hero: { label: "Voor tandartspraktijken", title1: "De dental-care-automaat", title2: "voor uw praktijk", desc: "Uw patiënten krijgen de mondverzorgingsproducten die u aanbeveelt direct in de praktijk. Uw team vult de automaat bij, uw praktijk verdient mee aan de verkoop. DentoPoint start momenteel met de eerste partnerpraktijken in Duitsland." },
    revenue: {
      label: "Voordelen", title: "Wat de praktijk eraan heeft",
      items: [
        { title: "Aanbevelingen die aankomen", desc: "Patiënten krijgen het aanbevolen product direct na de afspraak, in plaats van het later te moeten zoeken of het helemaal niet te kopen." },
        { title: "Weinig werk voor het team", desc: "Geen kassa en geen betalingen aan de balie. Het team geeft advies en vult bij wanneer dat nodig is. De beheeromgeving laat zien wat er ontbreekt." },
        { title: "Uw praktijk verdient mee", desc: "Er zijn twee modellen waarmee uw praktijk aan de verkoop deelneemt. Welk model bij u past, bespreken we in het adviesgesprek." },],
    },
    implementation: {
      label: "Start", title: "Zo gaat u van start",
      items: [
        { title: "Adviesgesprek", desc: "We praten over uw praktijk, de beschikbare ruimte en de producten die u het vaakst aanbeveelt.", duration: "Stap 1" },
        { title: "Locatie en assortiment", desc: "Samen bepalen we waar de automaat komt te staan en welke producten erin komen.", duration: "Stap 2" },
        { title: "Plaatsing en instructie", desc: "De automaat wordt geleverd en aangesloten, en uw team krijgt instructie.", duration: "Stap 3" },
        { title: "Gebruik en service", desc: "Uw team vult de automaat bij. Bij nabestellingen, onderhoud en storingen helpt DentoPoint. U hebt een persoonlijk aanspreekpunt.", duration: "Doorlopend" },
      ],
    },
    workflow: {
      label: "Werkwijze", title: "Werkwijze in de praktijk",
      benefits: [
        "De tandarts beveelt tijdens het behandelgesprek een product aan",
        "De patiënt koopt het bij de automaat in de praktijk, betaalt met pinpas of creditcard en kan de bon via een QR-code op zijn telefoon downloaden",
        "Geen contant geld en geen kassa aan de balie",
        "Het praktijkteam vult de automaat bij, de beheeromgeving toont de voorraad en wat er nabesteld moet worden",
        "Storingen worden per telefoon of e-mail gemeld, DentoPoint regelt de rest",
        "Op het scherm: productvideo's, patiënteninformatie en behandelthema's van de praktijk",
      ],
      cardTitle: "Persoonlijk advies",
      cardDesc: "Wij beantwoorden uw vragen over locatie, assortiment, voorwaarden en werkwijze. Persoonlijk en vrijblijvend.",
      cardCta: "Adviesgesprek aanvragen",
    },
    compliance: {
      label: "Privacy & veiligheid", title: "Waar we op letten",
      items: [
        { title: "Geen patiëntgegevens", desc: "De automaat registreert geen patiëntgegevens. Aankopen zijn anonieme kaartbetalingen." },
        { title: "Betaling via een betaaldienstverlener", desc: "Kaartbetalingen worden afgehandeld door een betaaldienstverlener, niet door de praktijk." },
        { title: "Producten van gevestigde fabrikanten", desc: "Alle producten zijn afkomstig van partnerfabrikanten en zijn geëtiketteerd volgens de geldende voorschriften." },
        { title: "Duidelijke afspraken", desc: "Locatie, assortiment, service en voorwaarden worden schriftelijk vastgelegd met DentoPoint GbR." },
      ],
    },
  },

  manufacturersPage: {
    hero: { label: "Voor fabrikanten", title1: "Uw producten", title2: "direct in de tandartspraktijk", desc: "DentoPoint plaatst dental-care-automaten in tandartspraktijken. Producten die tandartsen aanbevelen, worden daar direct aan patiënten verkocht. We starten met de eerste partnerpraktijken in Duitsland." },
    integration: {
      label: "Opname", title: "Zo komen uw producten in de automaat",
      items: [
        { title: "Assortimentscheck", desc: "Samen bekijken we of uw producten aansluiten bij de aanbevelingen van de partnerpraktijken." },
        { title: "Productinformatie", desc: "U levert productteksten, afbeeldingen en, indien beschikbaar, video's. Wij bereiden ze voor op het scherm en de website." },
        { title: "Aanbeveling in de praktijk", desc: "Tandartsen bevelen de producten aan tijdens het behandelgesprek. Patiënten kopen ze bij de automaat." },
        { title: "Start in Duitsland", desc: "De eerste automaat staat in Köln. Meer partnerpraktijken in Duitsland zijn gepland." },
      ],
    },
    data: {
      label: "Gegevens", title: "Verkoopcijfers en telemetrie",
      items: [
        { label: "Verkopen per automaat", value: "DentoPoint-beheeromgeving" },
        { label: "Voorraad per vak", value: "Beheeromgeving" },
        { label: "Rapportages voor fabrikanten", value: "Gepland" },
        { label: "Gegevensexport", value: "Gepland" },
      ],
    },
    performance: {
      label: "Stand van zaken", title: "Waar we vandaag staan",
      items: [
        { label: "Actieve locaties", value: "1", sub: "Köln, pilotpraktijk" },
        { label: "Markt", value: "Duitsland", sub: "Start 2026" },
        { label: "Productcategorieën", value: "6", sub: "Mondverzorging en voedingssupplementen" },
        { label: "Meer locaties", value: "Gepland", sub: "Partnerpraktijken in Duitsland" },
      ],
    },
    distribution: {
      label: "Logistiek", title: "Logistiek en bijvullen",
      benefits: [
        "Levering van de producten aan DentoPoint of direct aan de praktijk",
        "Bijvullen door het praktijkteam, nabestellingen gebundeld per fabrikant",
        "Verkoopcijfers per automaat in de DentoPoint-beheeromgeving",
        "Productinformatie en video's op het touchscreen van 32 inch",
        "Productpagina's met QR-codes voor patiënten",
        "Persoonlijk aanspreekpunt bij DentoPoint",
      ],
      cardTitle: "Partnerfabrikant worden",
      cardDesc: "Stuur ons een kort overzicht van uw producten. Wij nemen contact met u op en bespreken of en hoe opname in het assortiment past.",
      cardCta: "Contact opnemen",
    },
  },


  partnersPage: {
    hero: { label: "Partners", title1: "Samenwerken", title2: "aan de dental-care-automaat", desc: "DentoPoint is een jong bedrijf uit Köln. Wij zoeken partners die samen met ons aanbevolen mondverzorgingsproducten naar tandartspraktijken willen brengen: praktijken, fabrikanten, technologie- en bijscholingspartners." },
    technology: {
      label: "Techniek", title: "Techniek",
      items: [
        { title: "Automaat en operatorsoftware", desc: "De automaat werkt met de operatorsoftware van de fabrikant: telemetrie, vulniveaus en verkoopcijfers." },
        { title: "Scherm en productvideo's", desc: "De DentoPoint-weergave op het touchscreen van 32 inch toont productinformatie, video's en QR-codes in het Duits, Engels en Nederlands. De praktijk kan daar ook eigen behandelthema's presenteren." },
        { title: "Website en productpagina's", desc: "Productpagina's met informatie en video's die patiënten via een QR-code kunnen openen." },
        { title: "Eigen beheeromgeving", desc: "Verkopen, voorraad en nabestelbehoefte per automaat in de DentoPoint-beheeromgeving. Rapportages voor praktijken en fabrikanten zijn gepland." },
      ],
    },
    healthcare: {
      label: "Praktijken", title: "Tandartspraktijken en netwerken",
      items: [
        { title: "Partnerpraktijken", desc: "We starten met afzonderlijke tandartspraktijken in Duitsland. De eerste automaat staat in Köln." },
        { title: "Praktijkgroepen", desc: "Groepen met meerdere locaties zijn van harte welkom om met ons te praten over een gezamenlijke start." },
        { title: "Beroepsverenigingen", desc: "We staan open voor uitwisseling met tandheelkundige beroepsverenigingen over productaanbevelingen." },
        { title: "Instructie", desc: "De instructie van het praktijkteam over de automaat en de producten hoort bij elke plaatsing." },
      ],
    },
    academic: {
      label: "Wetenschap", title: "Wetenschap en bijscholing",
      items: [
        { title: "Uitwisseling met universiteiten", desc: "We zijn geïnteresseerd in uitwisseling met tandheelkundige faculteiten over mondverzorging na de behandeling." },
        { title: "Analyses", desc: "Anonieme verkoopcijfers per locatie kunnen in de toekomst laten zien welke aanbevelingen patiënten opvolgen." },
        { title: "Bijscholing", desc: "Productscholing voor praktijkteams, samen met partnerfabrikanten." },
        { title: "Publicaties", desc: "Gepland zodra er voldoende locaties en gegevens zijn." },
      ],
    },
    industry: {
      label: "Industrie", title: "Industrie",
      benefits: [
        "Partnerfabrikanten van mondverzorgingsproducten en voedingssupplementen",
        "Leveranciers van automaten en betaalterminals",
        "Logistieke partners voor de belevering van de praktijken",
        "Bureaus voor productvideo's en scherminhoud",
        "Distributiepartners voor meer regio's in Duitsland",
        "Adviseurs voor vragen over regelgeving",
      ],
      cardTitle: "Partner worden",
      cardDesc: "Vertel ons kort wie u bent en hoe u met DentoPoint wilt samenwerken. Wij nemen persoonlijk contact met u op.",
      cardCta: "Contact opnemen",
    },
    global: {
      label: "Regio's", title: "Waar DentoPoint actief is",
      tableHeaders: { region: "Regio", status: "Status", description: "Beschrijving" },
      items: [
        { region: "Duitsland", status: "Live", desc: "Eerste partnerpraktijk in Köln, meer praktijken gepland" },
        { region: "Oostenrijk, Zwitserland", status: "Later", desc: "Pas als er partners en aanspreekpunten ter plaatse zijn" },
        { region: "Overige EU-landen", status: "Later", desc: "Momenteel geen concrete plannen" },
      ],
    },
  },

  loginPage: {
    checkEmail: "Controleer uw e-mail",
    magicLinkSent: "We hebben een magic link gestuurd naar",
    clickToSignIn: "Klik op de link om in te loggen.",
    signInTitle: "Inloggen op uw portaal",
    signInDesc: "Voer uw e-mailadres in om een magic link te ontvangen.",
    emailLabel: "E-mail",
    emailPlaceholder: "naam@praktijk.nl",
    sending: "Wordt verzonden...",
    sendMagicLink: "Magic link versturen",
    backToPlatform: "← Terug naar het platform",
  },

  notFoundPage: {
    title: "404",
    message: "Pagina niet gevonden",
    backLink: "Terug naar de homepage",
  },

  heroSignup: {
    dialogDesc: "Meld u aan met uw zakelijke e-mailadres om toegang tot het portaal te krijgen.",
    emailSent: "E-mail verzonden",
    magicLinkSentTo: "We hebben een magic link gestuurd naar",
    clickToSignIn: "Klik op de link om in te loggen.",
    businessEmail: "Zakelijk e-mailadres",
    placeholder: "naam@bedrijf.nl",
    confirmCheckbox: "Ik bevestig dat ik handel namens een rechtspersoon (bedrijf).",
    confirmError: "Bevestig dat u een rechtspersoon vertegenwoordigt.",
    sending: "Wordt verzonden...",
    sendMagicLink: "Magic link versturen",
  },

  // Wordt gebruikt op de openbare inlogpagina (/login), daarom wel vertaald
  loginExtended: {
    registrationSuccess: "Registratie geslaagd",
    confirmEmail: "Bevestig uw e-mailadres via de link die we hebben gestuurd naar",
    createAccount: "Account aanmaken",
    portalAccess: "Toegang tot het fabrikantenportaal",
    login: "Inloggen",
    register: "Registreren",
    password: "Wachtwoord",
    forgotPassword: "Wachtwoord vergeten?",
    signIn: "Inloggen",
    enterEmailFirst: "Voer eerst uw e-mailadres in.",
  },

  faq: {
    label: "Veelgestelde vragen",
    title: "Vragen van tandartspraktijken",
    items: [
      { q: "Wat staat er precies in de praktijk?", a: "Een staande automaat met een touchscreen van 32 inch. Daarin mondverzorgingsproducten en voedingssupplementen van onze partnerfabrikanten. Hij heeft een stopcontact, een internetaansluiting en ongeveer één vierkante meter vloeroppervlak nodig." },
      { q: "Wie vult de automaat bij?", a: "Het praktijkteam. De producten liggen in de praktijk. De beheeromgeving toont de voorraad per vak en stelt de nabestellijst op, zodat het team kan bijvullen voordat producten op raken. Daarvoor verdient de praktijk mee aan de verkoop." },
      { q: "Wie kiest de producten uit?", a: "Het assortiment wordt samen met de praktijk samengesteld uit de producten van onze partnerfabrikanten. De tandarts bepaalt wat de patiënten wordt aanbevolen." },
      { q: "Moet de praktijk de automaat kopen of huren?", a: "De voorwaarden bespreken we persoonlijk met elke praktijk. Voor de pilotpraktijken geldt geen aankoopverplichting." },
      { q: "Hoe betalen de patiënten?", a: "Met pinpas of creditcard, direct aan de automaat. De praktijk handelt geen betalingen af. Na de aankoop toont het scherm een QR-code waarmee de patiënt de bon op zijn telefoon kan openen, bijvoorbeeld voor de verzekering." },
      { q: "Heeft de praktijk er werk aan?", a: "Weinig. Het praktijkteam beveelt tijdens het behandelgesprek een product aan en verwijst naar de automaat. Af en toe vult het team bij. Er wordt betaald bij de automaat, niet aan de balie." },
      { q: "Wat gebeurt er bij een storing?", a: "De praktijk meldt de storing per telefoon of e-mail aan DentoPoint. Wij zorgen ervoor dat die wordt verholpen. De automaat wordt bovendien op afstand bewaakt." },
      { q: "Welke producten zijn verkrijgbaar?", a: "Therapeutische tandpasta's, mondspoelingen, tandenborstels, voedingssupplementen, Sensitive Care en alignerverzorging van partnerfabrikanten zoals APOrtha, SDS Swiss Biohealth en bluem." },
      { q: "Wat is het voordeel voor de praktijk?", a: "Patiënten krijgen de aanbevolen producten direct en betrouwbaar, en de praktijk verdient mee aan de verkoop. Het team hoeft niet meer uit te leggen waar het product te koop is." },
      { q: "Wat is het voordeel voor de patiënten?", a: "Ze krijgen precies de producten die hun tandarts aanbeveelt, direct na de afspraak, zonder zoeken en vergelijken." },
      { q: "Is er een provisie of winstdeling?", a: "Ja. Er zijn twee modellen waarmee de praktijk aan de verkoop deelneemt. Welk model bij uw praktijk past, bespreken we in het adviesgesprek." },
      { q: "Hoe snel kan een apparaat worden geplaatst?", a: "Na een adviesgesprek stemmen we de locatie, het assortiment en de plaatsingsdatum af met de praktijk. Daarna noemen we een concrete datum." },
    ],
  },

  status: {
    label: "Transparantie",
    title: "Wat er nu is en wat er gepland is",
    intro: "We beloven alleen wat werkt. Al het andere is gemarkeerd als gepland.",
    availableLabel: "Beschikbaar",
    inProgressLabel: "In voorbereiding",
    plannedLabel: "Gepland",
    items: [
      { title: "Automaat in Köln geplaatst", desc: "De eerste DentoPoint-automaat staat in de tandartspraktijk van Olga Henriette Seifert. Het scherm werkt; de verkoop start zodra de kaartterminal en de productuitgifte zijn aangesloten.", state: "available" },
      { title: "Kaartbetaling", desc: "Patiënten betalen met pinpas of creditcard direct aan het apparaat. De kaartterminal wordt op dit moment aangesloten.", state: "inProgress" },
      { title: "Scherm met productinformatie, video's en QR-codes", desc: "Op het touchscreen van 32 inch: productinformatie, video's, patiënteninformatie en QR-codes, in het Duits, Engels en Nederlands.", state: "available" },
      { title: "Bon via QR-code", desc: "Na de aankoop verschijnt een QR-code. Daarmee opent de patiënt de bon op zijn telefoon, bijvoorbeeld voor de verzekering.", state: "available" },
      { title: "Behandelthema's van de praktijk", desc: "De praktijk presenteert op het scherm eigen behandelingen, bijvoorbeeld ozontherapie (OzoneDTA), keramische implantaten van SDS Swiss Dental Solutions en de vitamine D-sneltest met het AFIAS-apparaat.", state: "available" },
      { title: "Verkopen en voorraad in de DentoPoint-beheeromgeving", desc: "Elke aankoop wordt geregistreerd. De beheeromgeving toont verkopen, voorraad en nabestelbehoefte per automaat. Vulniveaus worden daarnaast gemeld door de operatorsoftware van het apparaat.", state: "available" },
      { title: "Analyses voor praktijken en fabrikanten", desc: "Eenvoudige rapportages per locatie, bijvoorbeeld verkopen per product.", state: "planned" },
      { title: "Meer locaties", desc: "Meer partnerpraktijken in Duitsland.", state: "planned" },
    ],
  },
  seo: {
    home: { title: "DentoPoint – De dental-care-automaat voor tandartspraktijken", desc: "DentoPoint plaatst dental-care-automaten in tandartspraktijken. Patiënten kopen daar de mondverzorgingsproducten die hun tandarts aanbeveelt. Het praktijkteam vult bij, de praktijk verdient mee. Start met de eerste partnerpraktijken in Duitsland." },
    clinics: { title: "Dental-care-automaat voor uw tandartspraktijk | DentoPoint", desc: "Aanbevolen mondverzorgingsproducten direct in de praktijk: weinig werk, de praktijk verdient mee. Werkwijze, voordelen en privacy voor tandartspraktijken." },
    manufacturers: { title: "Voor fabrikanten: producten direct in de tandartspraktijk | DentoPoint", desc: "Mondverzorgingsproducten en voedingssupplementen die tandartsen aanbevelen, in de dental-care-automaat van de partnerpraktijken. Zo komen uw producten in het assortiment." },
    partners: { title: "Partner worden | DentoPoint uit Köln", desc: "DentoPoint is een jong bedrijf uit Köln. Wij zoeken tandartspraktijken, fabrikanten, technologie- en bijscholingspartners voor de dental-care-automaat." },
    impressum: { title: "Colofon | DentoPoint GbR", desc: "Colofon van DentoPoint GbR, Clarenbachstraße 6, 50931 Köln." },
    privacy: { title: "Privacyverklaring | DentoPoint", desc: "Hoe DentoPoint GbR persoonsgegevens op deze website verwerkt." },
    login: { title: "Inloggen | DentoPoint" },
    notFound: { title: "Pagina niet gevonden | DentoPoint" },
  },
} satisfies Omit<typeof en, PortalSections>;
