export type Quality = 'high' | 'low' | 'static';

export interface QualityEnv {
  reducedMotion: boolean;
  webgl: boolean;
  coarsePointer: boolean;
  width: number;
  cores: number; // navigator.hardwareConcurrency, 모르면 0 또는 NaN
}

export function pickQuality(env: QualityEnv): Quality {
  if (env.reducedMotion || !env.webgl) return 'static';
  if (env.coarsePointer || env.width < 768) return 'low';
  if (env.cores > 0 && env.cores <= 4) return 'low';
  return 'high';
}
