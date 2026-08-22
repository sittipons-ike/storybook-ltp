// ═══════════════════════════════════════════
// ImageUpload Design Tokens
//
// No values here. Figma has no upload component (verified absent 2026-08-20); authored in
// design-library/lotteryplus/components/image-upload.json from the Frontend's
// common/image-upload, per the amended authority rule.
//
// Regenerate: python3 tools/gen-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('upload');

/** What the picker is showing right now. Derived, never passed in isolation. */
export type UploadState = 'empty' | 'uploading' | 'preview' | 'error';

export const UPLOAD = {
  gap: t.ref('gap'),
  stackGap: t.ref('stack-gap'),
  fieldHeight: t.ref('field-height'),
  fieldRadius: t.ref('field-radius'),
  fieldPadding: t.ref('field-padding'),
  fieldBorderWidth: t.ref('field-border-width'),
  fieldBorderColor: t.ref('field-border-color'),
  fieldBorderError: t.ref('field-border-error'),
  fieldPlaceholderColor: t.ref('field-placeholder-color'),
  fieldValueColor: t.ref('field-value-color'),
  buttonBackground: t.ref('button-background'),
  buttonForeground: t.ref('button-foreground'),
  dropzoneMinHeight: t.ref('dropzone-min-height'),
  dropzoneBorderColor: t.ref('dropzone-border-color'),
  dropzoneBackground: t.ref('dropzone-background'),
  dropzoneHintColor: t.ref('dropzone-hint-color'),
  chipBackground: t.ref('chip-background'),
  chipRadius: t.ref('chip-radius'),
  errorColor: t.ref('error-color'),
  titleColor: t.ref('title-color'),
  textSize: t.ref('text-size'),
  textLineHeight: t.ref('text-line-height'),
  textWeight: t.ref('text-weight'),
} as const;
