export const MONTHS_IN_YEAR = 12;

export const PERCENTAGE_DIVISOR = 100;
export const DEFAULT_FLAT_RATE_PERCENTAGE = 60;

export const HEALTH_BASE_RATIO = 0.5;
export const SOCIAL_BASE_RATIO = 0.55;
export const DEFAULT_HEALTH_RATE = 0.135;
export const DEFAULT_SOCIAL_RATE = 0.292;

export const MAX_CHILDREN = 20;
export const CHILD_CARE_AGE_LIMIT = 3;
export const CHILD_DISCOUNT_THRESHOLD_SECOND = 2;
export const CHILD_DISCOUNT_THRESHOLD_THIRD = 3;

export const FLAT_RATE_OPTIONS = [
  { value: 30, label: "30 %" },
  { value: 40, label: "40 %" },
  { value: 60, label: "60 %" },
  { value: 80, label: "80 %" },
] as const;