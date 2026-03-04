/**
 * Agent 2 – Translation Coverage Test
 *
 * Ensures every non-English language file covers at least MINIMUM_COVERAGE
 * of the keys defined in the English reference translation.
 *
 * Run: npm test
 * Auto-triggered by: .github/workflows/i18n-check.yml on any i18n change.
 */
import { describe, it, expect } from "vitest";
import { en } from "@/i18n/translations/en";
import { de } from "@/i18n/translations/de";
import { tr } from "@/i18n/translations/tr";
import { cn } from "@/i18n/translations/cn";
import { fr } from "@/i18n/translations/fr";
import { it as itLang } from "@/i18n/translations/it";
import { es } from "@/i18n/translations/es";
import { ko } from "@/i18n/translations/ko";
import { ar } from "@/i18n/translations/ar";
import { nl } from "@/i18n/translations/nl";
import { sr } from "@/i18n/translations/sr";

/** Minimum fraction of English keys that must be present in every language. */
const MINIMUM_COVERAGE = 0.75;

type TranslationObject = Record<string, unknown>;

/**
 * Returns all dot-separated leaf key paths in a (possibly nested) object.
 * Arrays are treated as leaf values — we check that the key exists, not the
 * contents of the array.
 */
function getLeafKeys(obj: TranslationObject, prefix = ""): string[] {
  const keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      keys.push(...getLeafKeys(value as TranslationObject, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

/** Returns true if `obj` contains a value (even undefined) at `keyPath`. */
function hasKey(obj: TranslationObject, keyPath: string): boolean {
  const parts = keyPath.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (
      typeof current !== "object" ||
      current === null ||
      !(part in (current as TranslationObject))
    ) {
      return false;
    }
    current = (current as TranslationObject)[part];
  }
  return true;
}

const enKeys = getLeafKeys(en as unknown as TranslationObject);

const languages: { code: string; translation: unknown }[] = [
  { code: "DE", translation: de },
  { code: "TR", translation: tr },
  { code: "CN", translation: cn },
  { code: "FR", translation: fr },
  { code: "IT", translation: itLang },
  { code: "ES", translation: es },
  { code: "KO", translation: ko },
  { code: "AR", translation: ar },
  { code: "NL", translation: nl },
  { code: "SR", translation: sr },
];

describe("i18n translation coverage (Agent 2)", () => {
  it("English reference has translation keys", () => {
    expect(enKeys.length).toBeGreaterThan(100);
  });

  for (const { code, translation } of languages) {
    it(`${code}: coverage ≥ ${MINIMUM_COVERAGE * 100}%`, () => {
      const obj = translation as TranslationObject;
      const missingKeys = enKeys.filter((key) => !hasKey(obj, key));
      const coverage = (enKeys.length - missingKeys.length) / enKeys.length;

      if (missingKeys.length > 0) {
        console.warn(
          `[i18n/${code}] ${missingKeys.length} missing key(s) ` +
            `(coverage: ${(coverage * 100).toFixed(1)}%):\n` +
            missingKeys.slice(0, 30).join("\n") +
            (missingKeys.length > 30 ? `\n… and ${missingKeys.length - 30} more` : "")
        );
      }

      expect(coverage).toBeGreaterThanOrEqual(MINIMUM_COVERAGE);
    });
  }
});
