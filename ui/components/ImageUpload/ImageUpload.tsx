import React, { useId, useRef } from 'react';
import '../../foundations/tokens.css';
import Icon from '../../icons/Icon';
import '../../icons/icon-data';
import Loading from '../Loading/Loading';
import { UPLOAD } from './tokens';
import './ImageUpload.css';

export interface ImageUploadProps {
  /** Label above the field. */
  title?: React.ReactNode;
  /** Name of the file the user picked, shown in the field. */
  fileName?: string;
  /** A `src` for the chosen image — a data URL, an object URL, or a remote one. */
  previewSrc?: string;
  /** Draw the spinner instead of the dropzone while the caller uploads. */
  uploading?: boolean;
  /** Red border plus this message under the field. */
  errorMessage?: string;
  /** The user picked a file. The caller reads, uploads and reports back through props. */
  onSelect?: (file: File) => void;
  /** The user cleared the current image. */
  onRemove?: () => void;
  /** Which types the picker offers. Matches the Frontend's accept list. */
  accept?: string;
  className?: string;
}

const HINT = 'กดเพื่อเพิ่มรูปภาพ';
const PLACEHOLDER = 'แนบรูปภาพ';

/**
 * ImageUpload — Lotteryplus Design System
 *
 * No Figma component exists (verified absent 2026-08-20). Built from the Frontend's
 * `common/image-upload` — KYC, profile and issue-report flows, 5 call sites — per the
 * amended authority rule.
 *
 * Deliberately smaller than the Frontend's version. That one owns the whole upload:
 * it calls `getUploadUrl`, PUTs the file, polls `getUploadStatus` in a `while` loop, and
 * opens a DialogModal when the poll fails. None of that is design-system work — it is
 * one product's API contract. This component draws the four states and tells the caller
 * what the user did; the caller owns the transfer.
 */
const ImageUpload: React.FC<ImageUploadProps> = ({
  title,
  fileName,
  previewSrc,
  uploading = false,
  errorMessage,
  onSelect,
  onRemove,
  accept = 'image/jpeg, image/jpg, image/png, image/webp',
  className = '',
}) => {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Cleared so picking the same file twice in a row still fires a change.
    event.target.value = '';
    if (file) onSelect?.(file);
  };

  const text = {
    fontSize: UPLOAD.textSize,
    lineHeight: UPLOAD.textLineHeight,
    fontWeight: UPLOAD.textWeight as unknown as React.CSSProperties['fontWeight'],
  };

  return (
    <div
      className={`ltp-upload ${className}`}
      style={{ display: 'flex', flexDirection: 'column', gap: UPLOAD.gap }}
    >
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        hidden
        disabled={uploading}
        onChange={handleChange}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: UPLOAD.stackGap }}>
        {title && <span style={{ ...text, color: UPLOAD.titleColor }}>{title}</span>}

        {/* Name box + picker button, joined into one control: the box rounds on the
            left, the button on the right, and the box drops its right border so the
            two meet on a single line rather than a doubled one. */}
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <span
            style={{
              ...text,
              flex: 1,
              minWidth: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: UPLOAD.fieldPadding,
              height: UPLOAD.fieldHeight,
              padding: UPLOAD.fieldPadding,
              borderRadius: `${UPLOAD.fieldRadius} 0 0 ${UPLOAD.fieldRadius}`,
              border: `${UPLOAD.fieldBorderWidth} solid ${
                errorMessage ? UPLOAD.fieldBorderError : UPLOAD.fieldBorderColor
              }`,
              borderRight: 'none',
              color: fileName ? UPLOAD.fieldValueColor : UPLOAD.fieldPlaceholderColor,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {fileName || PLACEHOLDER}
            {/* The Frontend draws this at 22, which is not a stop on the icon scale
                (12/16/20/24/32/…). Snapped to 20 — the same size Alert gives the same
                glyph — rather than adding an off-scale stop for one call site. */}
            {errorMessage && (
              <Icon name="filled-Warning-2" size="sm" customColor={UPLOAD.fieldBorderError} />
            )}
          </span>
          <label
            htmlFor={inputId}
            style={{
              ...text,
              display: 'inline-flex',
              alignItems: 'center',
              flex: 'none',
              height: UPLOAD.fieldHeight,
              padding: `0 ${UPLOAD.fieldPadding}`,
              borderRadius: `0 ${UPLOAD.fieldRadius} ${UPLOAD.fieldRadius} 0`,
              background: UPLOAD.buttonBackground,
              color: UPLOAD.buttonForeground,
              cursor: uploading ? 'not-allowed' : 'pointer',
            }}
          >
            เลือกรูปภาพ
          </label>
        </div>

        {errorMessage && <span style={{ ...text, color: UPLOAD.errorColor }}>{errorMessage}</span>}
      </div>

      <label
        htmlFor={inputId}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          width: '100%',
          minHeight: UPLOAD.dropzoneMinHeight,
          borderRadius: UPLOAD.fieldRadius,
          border: `${UPLOAD.fieldBorderWidth} dashed ${UPLOAD.dropzoneBorderColor}`,
          background: UPLOAD.dropzoneBackground,
          overflow: 'hidden',
          cursor: uploading ? 'not-allowed' : 'pointer',
        }}
      >
        {uploading ? (
          <Loading />
        ) : previewSrc ? (
          <>
            <img src={previewSrc} alt="" style={{ display: 'block', width: '100%' }} />
            <span
              style={{
                ...text,
                position: 'absolute',
                left: UPLOAD.stackGap,
                top: UPLOAD.stackGap,
                display: 'inline-flex',
                alignItems: 'center',
                gap: UPLOAD.stackGap,
                padding: `${UPLOAD.fieldPadding} ${UPLOAD.gap}`,
                borderRadius: UPLOAD.chipRadius,
                background: UPLOAD.chipBackground,
                color: UPLOAD.buttonForeground,
              }}
            >
              <Icon name="filled-gallery" size={24} color="inherit" />
              แก้ไขรูปภาพ
            </span>
            <button
              type="button"
              aria-label="ลบรูปภาพ"
              onClick={(event) => {
                // The whole dropzone is a <label>; without this the click re-opens the picker.
                event.preventDefault();
                onRemove?.();
              }}
              style={{
                position: 'absolute',
                right: UPLOAD.stackGap,
                top: UPLOAD.stackGap,
                display: 'inline-flex',
                padding: UPLOAD.fieldPadding,
                borderRadius: UPLOAD.chipRadius,
                border: 'none',
                background: UPLOAD.chipBackground,
                color: UPLOAD.buttonForeground,
                cursor: 'pointer',
              }}
            >
              <Icon name="filled-close" size={24} color="inherit" />
            </button>
          </>
        ) : (
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: UPLOAD.stackGap,
              color: UPLOAD.dropzoneHintColor,
              textAlign: 'center',
            }}
          >
            <Icon name="filled-gallery" size={40} color="inherit" />
            {HINT}
          </span>
        )}
      </label>
    </div>
  );
};

export default ImageUpload;
