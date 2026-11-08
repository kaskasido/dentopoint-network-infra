import type { Language } from "@/i18n/LanguageContext";

/**
 * Partnerprodukte der Startseite (Abschnitt „Unsere Partner“): Kurztext, Produktvideo und Anhören je Produkt.
 * Videos und Standbilder sind DentoPoints eigene Bildschirm-Clips aus der Produktdatenbank (Speicher kiosk-media,
 * dieselben wie am Automaten). Kurztexte bewusst ohne Gesundheitsversprechen.
 *
 * Anhören: Sobald die Aufnahmen aus ElevenLabs da sind, je Sprache die Datei unter public/audio/produkte/ ablegen
 * und hier eintragen, z. B. audio: { DE: "/audio/produkte/sds-boost-de.mp3" }. Ohne Eintrag liest der Browser vor.
 */
const MEDIEN = "https://jokjtlnvjaeakxspftkj.supabase.co/storage/v1/object/public/kiosk-media/produkte/";

export type PartnerProdukt = {
  id: string;
  text: Record<Language, string>;
  audio?: Partial<Record<Language, string>>;
};

export const PARTNER_PRODUKTE: Record<string, PartnerProdukt> = {
  "sds-boost": {
    id: "5c564eb8-2cb9-4a8e-8125-1755447f0a3a",
    text: {
      DE: "Ergänzt BASELINE in Phasen mit mehr Bedarf. Zusätzliche Vitamine und Mineralstoffe als magensaftresistent beschichtete Nutrabeads, vordosiert in 30 Sachets. 1 Sachet täglich nach dem Frühstück mit einem Glas Wasser.",
      EN: "Complements BASELINE in phases of higher demand. Additional vitamins and minerals as enteric-coated Nutrabeads, pre-dosed in 30 sachets. 1 sachet a day after breakfast with a glass of water.",
      NL: "Vult BASELINE aan in periodes met een hogere behoefte. Extra vitaminen en mineralen als maagsapresistente Nutrabeads, voorgedoseerd in 30 sachets. Dagelijks 1 sachet na het ontbijt met een glas water.",
    },
  },
  "sds-baseline": {
    id: "0e197322-7b81-4bc6-955b-2f4a051d8caf",
    text: {
      DE: "Grundversorgung mit 12 aufeinander abgestimmten Mikronährstoffen. Magensaftresistent beschichtete Nutrabeads, ohne Zusatz-, Konservierungs- und Süßungsmittel. 30 Sachets, 1 Sachet täglich nach dem Frühstück.",
      EN: "Basic supply of 12 coordinated micronutrients. Enteric-coated Nutrabeads, without additives, preservatives or sweeteners. 30 sachets, 1 sachet a day after breakfast.",
      NL: "Basisvoorziening met 12 op elkaar afgestemde micronutriënten. Maagsapresistente Nutrabeads, zonder toevoegingen, conserveermiddelen en zoetstoffen. 30 sachets, dagelijks 1 sachet na het ontbijt.",
    },
  },
  "sds-big5": {
    id: "33a1c774-c9e7-4c08-8274-6955d7fbdfc6",
    text: {
      DE: "Fünf Mikronährstoffe in einem Sachet: Magnesium, Vitamin C, Omega 3, Vitamin D3 und K2. Leicht schluckbare Nutrabeads mit Fruchtaroma, 30 Sachets. 1 Sachet täglich nach dem Essen, unzerkaut.",
      EN: "Five micronutrients in one sachet: magnesium, vitamin C, omega 3, vitamin D3 and K2. Easy-to-swallow Nutrabeads with fruit flavour, 30 sachets. 1 sachet a day after a meal, without chewing.",
      NL: "Vijf micronutriënten in één sachet: magnesium, vitamine C, omega 3, vitamine D3 en K2. Gemakkelijk te slikken Nutrabeads met fruitsmaak, 30 sachets. Dagelijks 1 sachet na het eten, zonder te kauwen.",
    },
  },
  "aportha-d3-5000": {
    id: "6ceb411a-394f-48f1-adad-5a4358a5eb9a",
    text: {
      DE: "5.000 I.E. veganes Vitamin D3 aus Flechten mit 200 µg Vitamin K2 MK-7. 120 vegane Kapseln, Clean Label. Jeden 5. Tag 1 Kapsel mit reichlich Wasser.",
      EN: "5,000 IU vegan vitamin D3 from lichen with 200 µg vitamin K2 MK-7. 120 vegan capsules, clean label. 1 capsule every 5th day with plenty of water.",
      NL: "5.000 IE veganistische vitamine D3 uit korstmos met 200 µg vitamine K2 MK-7. 120 veganistische capsules, clean label. Elke 5e dag 1 capsule met ruim water.",
    },
  },
  "aportha-d3-spray": {
    id: "39c7e935-2b0b-4cad-ae28-ebf338692856",
    text: {
      DE: "Vitamin D3 und K2 als Mundspray: 4.000 I.E. Vitamin D3 und 40 µg K2 MK-7 pro Sprühstoß. Alkohol- und zuckerfrei, 25 ml. 1 Sprühstoß täglich auf die Zunge, vorher schütteln.",
      EN: "Vitamin D3 and K2 as an oral spray: 4,000 IU vitamin D3 and 40 µg K2 MK-7 per spray. Alcohol- and sugar-free, 25 ml. 1 spray a day onto the tongue, shake first.",
      NL: "Vitamine D3 en K2 als mondspray: 4.000 IE vitamine D3 en 40 µg K2 MK-7 per spray. Alcohol- en suikervrij, 25 ml. Dagelijks 1 spray op de tong, eerst schudden.",
    },
  },
  "aportha-magnesium": {
    id: "b267c2fd-d526-48a3-a276-aa96723f47ff",
    text: {
      DE: "250 mg Magnesium pro Tagesdosis aus 12 Magnesium-Verbindungen. 120 vegane Kapseln, Clean Label. 2 × täglich 1 Kapsel mit reichlich Wasser.",
      EN: "250 mg magnesium per daily dose from 12 magnesium compounds. 120 vegan capsules, clean label. 1 capsule twice a day with plenty of water.",
      NL: "250 mg magnesium per dagdosis uit 12 magnesiumverbindingen. 120 veganistische capsules, clean label. 2 × per dag 1 capsule met ruim water.",
    },
  },
  "bluem-zahnbuerste": {
    id: "438b1b03-fd48-4141-8487-a18d8c27840c",
    text: {
      DE: "Handzahnbürste mit ultraweichen, besonders feinen Borsten für sehr sanftes Putzen. „Chirurgische Zahnbürste ultra soft“ ist die Bezeichnung des Herstellers.",
      EN: "Manual toothbrush with ultra-soft, extra-fine bristles for very gentle brushing. “Surgical toothbrush ultra soft” is the manufacturer's name for it.",
      NL: "Handtandenborstel met ultrazachte, extra fijne haren voor zeer zacht poetsen. „Chirurgische tandenborstel ultra soft” is de naam van de fabrikant.",
    },
  },
  "bluem-mundspuelung": {
    id: "d6ff55d7-1dbd-43e3-af2e-54d2bd5c9b77",
    text: {
      DE: "Mundspülung mit Aktivsauerstoff im 250-ml-Format. Laut Hersteller fluoridfrei, alkoholfrei und pH-neutral, mit Bio-Honig und Xylit. Mindestens 30 Sekunden spülen und ausspucken.",
      EN: "Mouthwash with active oxygen in a 250 ml bottle. According to the manufacturer fluoride-free, alcohol-free and pH-neutral, with organic honey and xylitol. Rinse for at least 30 seconds and spit out.",
      NL: "Mondspoeling met actieve zuurstof in een fles van 250 ml. Volgens de fabrikant fluoridevrij, alcoholvrij en pH-neutraal, met biologische honing en xylitol. Minstens 30 seconden spoelen en uitspugen.",
    },
  },
  "bluem-mundschaum": {
    id: "230ddaf4-a805-4351-8a93-17b8fcbcc4c0",
    text: {
      DE: "Zahnpflege-Schaum mit Aktivsauerstoff, 100 ml. Eine kleine Menge auf die feuchte Zahnbürste geben und zwei Minuten sanft putzen. Reinigt außerdem Aligner und Schienen.",
      EN: "Oral care foam with active oxygen, 100 ml. Put a small amount on a damp toothbrush and brush gently for two minutes. Also cleans aligners and splints.",
      NL: "Verzorgingsschuim met actieve zuurstof, 100 ml. Een kleine hoeveelheid op een vochtige tandenborstel doen en twee minuten zacht poetsen. Reinigt ook aligners en beugels.",
    },
  },
  "bluem-mundgel": {
    id: "ede51415-72ee-4d40-805d-aff6e399d407",
    text: {
      DE: "Sauerstoff-Gel in der 15-ml-Tube zum punktuellen Auftragen. Laut Hersteller das Produkt mit der höchsten Sauerstoffkonzentration der Serie. Höchstens 5 ml pro Tag.",
      EN: "Oxygen gel in a 15 ml tube for applying to specific spots. According to the manufacturer the product with the highest oxygen concentration in the range. No more than 5 ml a day.",
      NL: "Zuurstofgel in een tube van 15 ml om plaatselijk aan te brengen. Volgens de fabrikant het product met de hoogste zuurstofconcentratie van de serie. Maximaal 5 ml per dag.",
    },
  },
  "bluem-sauerstoff": {
    id: "91ba1ac6-8d3d-4e35-bf7f-42e92910f796",
    text: {
      DE: "Milde Spezialspülung mit verstärkter Aktivsauerstoff-Formel, 250 ml. Laut Etikett ohne Fluorid, Alkohol, künstliche Aromen und Sulfate. Nach dem Zähneputzen 60 Sekunden spülen, nicht nachspülen.",
      EN: "Mild special rinse with an enhanced active-oxygen formula, 250 ml. According to the label without fluoride, alcohol, artificial flavours or sulphates. Rinse for 60 seconds after brushing, do not rinse with water afterwards.",
      NL: "Milde speciale spoeling met versterkte actieve-zuurstofformule, 250 ml. Volgens het etiket zonder fluoride, alcohol, kunstmatige aroma's en sulfaten. Na het tandenpoetsen 60 seconden spoelen, niet naspoelen.",
    },
  },
};

export const produktVideo = (p: PartnerProdukt) => `${MEDIEN}${p.id}.mp4`;
export const produktPoster = (p: PartnerProdukt) => `${MEDIEN}${p.id}-poster.jpg`;
