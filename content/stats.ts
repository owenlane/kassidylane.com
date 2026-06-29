export type Stat = {
  value: number | null;
  prefix?: string;
  suffix?: string;
  display?: string; // used when the stat is not a number to count up
  label: string;
};

// Numbers are drawn from the client report. No dollar volume is shown because
// the report does not contain one (the blueprint forbids estimating it).
export const stats: Stat[] = [
  { value: 9, label: "Years licensed in Las Vegas" },
  { value: 117, label: "Transactions closed" },
  { value: 5, suffix: ".0\u2605", label: "Every published review" },
  { value: null, display: "Se Habla Espa\u00F1ol", label: "Bilingual service" },
  { value: 20, suffix: "+", label: "Years in sales & business" },
];
