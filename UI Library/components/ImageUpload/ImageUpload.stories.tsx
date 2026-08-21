import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import { sys } from '../../foundations/tokens';

// ═══════════════════════════════════════════
//  ImageUpload — no Figma component. From the Frontend's common/image-upload
//  (KYC, profile, issue report — 5 call sites), stripped of its API coupling.
// ═══════════════════════════════════════════

const meta: Meta<typeof ImageUpload> = {
  title: 'Molecules/ImageUpload',
  component: ImageUpload,
  parameters: { layout: 'padded' },
};
export default meta;

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/** A 3x2 gradient as a data URI, so the preview state needs no network. */
const SAMPLE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320">
       <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
         <stop offset="0%" stop-color="#E32321"/><stop offset="100%" stop-color="#262626"/>
       </linearGradient></defs>
       <rect width="480" height="320" fill="url(#g)"/>
     </svg>`,
  );

const Caption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: mono, fontSize: 11, color: sys('color-text-tertiary-default'), marginBottom: 8 }}>
    {children}
  </div>
);

export const States: StoryObj = {
  name: 'สี่สถานะ',
  render: () => (
    <div style={{ fontFamily: sans }}>
      <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>image-upload</h2>
      <p style={{ margin: '0 0 24px', maxWidth: 620, fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default') }}>
        ไม่มีใน Figma — ตรวจแล้ว 2026-08-20 สร้างจาก FE ตามกฎที่แก้ไว้ แต่<strong>เล็กกว่าของ FE ตั้งใจ</strong>:
        ของ FE ถือ upload ทั้งเส้น (<code style={{ fontFamily: mono }}>getUploadUrl</code> → PUT →
        poll <code style={{ fontFamily: mono }}>getUploadStatus</code> ใน while loop → DialogModal ตอนพัง)
        ซึ่งเป็น API contract ของ product ไม่ใช่งานของ design system — ตัวนี้วาดสี่สถานะแล้วบอกผู้เรียกว่า
        ผู้ใช้ทำอะไร ส่วนการรับส่งไฟล์ผู้เรียกถือเอง
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 320px))', gap: 32 }}>
        <div>
          <Caption>empty</Caption>
          <ImageUpload title="แนบรูปบัตรประชาชน" />
        </div>
        <div>
          <Caption>uploading</Caption>
          <ImageUpload title="แนบรูปบัตรประชาชน" fileName="id-card.jpg" uploading />
        </div>
        <div>
          <Caption>preview</Caption>
          <ImageUpload title="แนบรูปบัตรประชาชน" fileName="id-card.jpg" previewSrc={SAMPLE} />
        </div>
        <div>
          <Caption>error</Caption>
          <ImageUpload
            title="แนบรูปบัตรประชาชน"
            errorMessage="นามสกุลไฟล์ที่รองรับ : JPG, JPEG, PNG, WEBP"
          />
        </div>
      </div>
    </div>
  ),
};

export const Interactive: StoryObj = {
  name: 'ลองเลือกไฟล์จริง',
  render: () => {
    const Inner = () => {
      const [fileName, setFileName] = useState<string>();
      const [previewSrc, setPreviewSrc] = useState<string>();
      const [uploading, setUploading] = useState(false);
      const [errorMessage, setErrorMessage] = useState<string>();

      const onSelect = (file: File) => {
        setErrorMessage(undefined);
        setUploading(true);
        const reader = new FileReader();
        reader.onload = () => {
          setFileName(file.name);
          setPreviewSrc(reader.result as string);
          setUploading(false);
        };
        reader.onerror = () => {
          setErrorMessage('อ่านไฟล์ไม่สำเร็จ');
          setUploading(false);
        };
        reader.readAsDataURL(file);
      };

      const onRemove = () => {
        setFileName(undefined);
        setPreviewSrc(undefined);
      };

      return (
        <div style={{ fontFamily: sans, maxWidth: 320 }}>
          <Caption>onSelect / onRemove — state อยู่ที่ผู้เรียกทั้งหมด</Caption>
          <ImageUpload
            title="แนบสลิปโอนเงิน"
            fileName={fileName}
            previewSrc={previewSrc}
            uploading={uploading}
            errorMessage={errorMessage}
            onSelect={onSelect}
            onRemove={onRemove}
          />
        </div>
      );
    };
    return <Inner />;
  },
};
