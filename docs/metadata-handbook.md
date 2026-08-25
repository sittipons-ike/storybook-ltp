# สัญญาของ Component

> Lark Standard §3.7 — ฉบับทำความเข้าใจ
> ฉบับเว็บ (อ่านง่ายกว่า): แชร์ผ่าน Artifact · ฉบับนี้คือของที่ track ใน git

ทุก component ในระบบต้องแนบ metadata หนึ่งชุด ไม่ใช่พิธีกรรม — มันคือคำตอบล่วงหน้าของสามคำถามที่จะถูกถามแน่ๆ: **มันคืออะไร · ของใคร · อยู่ที่ไหน**

---

## ๑ · สามคำถามที่ metadata ตอบแทนเรา

ลองนึกภาพอีกหกเดือนข้างหน้า มีคนเปิดเจอ component ที่เราสร้างวันนี้ คำถามที่เขาจะถามมีอยู่สามข้อเสมอ:

| คำถาม | ช่องที่ตอบ | ถ้าไม่มีคำตอบ |
|---|---|---|
| **มันคืออะไร ประกอบจากอะไร** | `responsibility` · `composition_level` · `dependencies` | ต้องเปิดโค้ดอ่านเอง หรือเดา |
| **ของใคร ใครใช้บ้าง** | `scope` · `public` · `project` / `feature` | แก้แล้วพังที่อื่นโดยไม่รู้ตัว |
| **อยู่ที่ไหน** | `folder` | ของซ้ำงอกขึ้นเพราะหาของเดิมไม่เจอ |

ช่องแรกที่เขียนเสมอคือ `responsibility` — หน้าที่ของชิ้นนั้น **เป็นประโยคเดียว** ถ้าเขียนไม่จบในประโยคเดียว แปลว่าชิ้นนั้นทำหลายหน้าที่เกินไป ควรแตกก่อนจะตั้งชื่อ

---

## ๒ · composition_level — มันประกอบขึ้นจากอะไร

มีสามค่า ไล่จากชิ้นเดี่ยวไปถึงบล็อกใหญ่ ตัวอย่างทั้งหมดคือของจริงใน Lotteryplus:

| ระดับ | นิยาม | ตัวอย่างจริง |
|---|---|---|
| `atom` | ชิ้นเดี่ยว แตกย่อยต่อไม่ได้แล้ว | button · icon · divider · checkbox · avatar |
| `molecule` | atom หลายตัวประกอบกันเป็นชิ้นที่มีความหมายใหม่ | alert (icon + ข้อความ + ปุ่มปิด) · dropdown · toast |
| `organism` | บล็อกที่เป็นส่วนของหน้าได้ด้วยตัวเอง | navigation-bar · modal · lotto-board · header |

**วิธีตัดสินไม่ต้องเถียงกัน: ดูที่ dependencies**

```yaml
divider:     dependencies: []                    # ไม่พึ่งใคร → atom
button:      dependencies: [icon, text]          # พึ่งแค่ atom พื้นฐาน → atom
search-bar:  dependencies: [input, button, icon] # ประกอบจาก atom → molecule
```

> **ระดับเดียวกัน ไม่ได้แปลว่าที่เดียวกัน** — `search-bar` กับ `match-attribute-item` เป็น molecule ทั้งคู่ แต่ตัวแรกเป็นของกลาง ตัวหลังเป็นของ feature เดียว ระดับตอบว่า "ประกอบจากอะไร" ส่วนที่อยู่ตอบด้วย scope — คนละแกนกัน

---

## ๓ · type — ของที่ไม่ได้อยู่บนบันได

สามประเภทนี้**ไม่ใช้** `composition_level` เพราะมันไม่ได้เกิดจากการเอา atom มาต่อกัน — ใช้ช่อง `type` แทน:

| type | คืออะไร | ช่องพิเศษของมัน |
|---|---|---|
| `pattern` | กรอบที่มีช่องเสียบ เช่น app-shell — ตัวมันว่างเปล่า รอของมาเติม | `slots` |
| `page` | หน้าจริง มี route มีข้อมูล | `pattern` ที่ใช้ · `organisms` ที่วาง |
| `helper` | ตัวช่วยพฤติกรรม เช่น scroll-area — ไม่มีหน้าตาของตัวเอง | ไม่มี variant / state |

> **เคยพลาดจริงมาแล้ว:** `infinity-scroll` ถูกใส่ `composition_level: helper` อยู่พักหนึ่ง — ผิด เพราะ helper ไม่ใช่ชั้นที่สี่ของบันได มันคือคนละแกน ถ้าพบว่ากำลังจะเพิ่มค่าที่สี่ให้ `composition_level` ให้หยุดแล้วถามว่าจริงๆ มันควรเป็น `type` หรือเปล่า

---

## ๔ · scope — ของกลาง หรือของทีม

นี่คือช่องที่สำคัญที่สุดในเชิงการดูแล เพราะมันตอบว่า **ใครมีสิทธิ์แก้ และแก้แล้วกระทบใคร**

| scope | หมายถึง | folder |
|---|---|---|
| `global` | ของกลาง — ทุกโปรเจกต์หยิบใช้ได้ | `global/components/…` |
| `project` | ใช้ทั่วทั้งโปรเจกต์เดียว แต่โปรเจกต์อื่นไม่เกี่ยว | `projects/<ชื่อ>/shared/components/…` |
| `feature` | ใช้ใน feature เดียว | `projects/<ชื่อ>/features/<feature>/components/…` |

> **กฎเลื่อนชั้น (§3.3 — share by evidence):** component เกิดที่ feature ก่อนเสมอ จะเลื่อนขึ้นเป็นของกลางได้ต่อเมื่อครบ 3 ข้อ — มีที่ใช้จริง **อย่างน้อย 2 ที่** (ไม่นับแผนในอนาคต) · ไม่ต้องแก้หน้าที่ของมันเพื่อให้ใช้ร่วมกันได้ · มีเจ้าของดูแลต่อ
>
> ไลบรารีกลางที่รับของเข้าง่าย จะบวมด้วยของที่ไม่มีใครใช้และไม่มีใครกล้าลบ

---

## ๕ · สองคำถาม ตอนมี component ใหม่

```
มี component ใหม่เข้ามา
        ↓
คำถามที่ 1 — มันประกอบขึ้นจากอะไร?
   ชิ้นเดี่ยว → atom · ประกอบจาก atom → molecule · เป็นบล็อกของหน้า → organism
   (ไม่มีหน้าตา / เป็นกรอบ / เป็นหน้า → ใช้ type แทน)
        ↓
คำถามที่ 2 — ใครใช้มันบ้าง วันนี้ ไม่ใช่ในฝัน?
   feature เดียว → feature · ทั้งโปรเจกต์ → project · มีหลักฐานใช้ซ้ำ ≥2 ที่ → global
        ↓
สองคำตอบนี้กำหนด folder ให้เอง — ไม่ต้องคิดเพิ่ม ไม่ต้องประชุม
```

**ไม่มีขั้นตอนไหนต้องเถียงกัน** — คำถามที่ 1 ดูจาก dependencies คำถามที่ 2 ดูจากหลักฐานการใช้จริง ทั้งคู่เป็นข้อเท็จจริง ไม่ใช่รสนิยม

---

## ๖ · ตัวอย่างเทียบคู่ — ระดับเท่ากัน คนละ scope

**ของกลาง**

```yaml
name: search-bar
type: component
responsibility: "Search for information"

composition_level: molecule
dependencies: [input, icon-button, icon]
slots: []
pattern: null
organisms: []

scope: global
project: null
feature: null
public: true

folder: global/components/search-bar
```

**ของ feature**

```yaml
name: match-attribute-item
type: component
responsibility: "บอกคุณสมบัติการแมตช์ 1 ข้อ"

composition_level: molecule
dependencies: [icon, text]
slots: []
pattern: null
organisms: []

scope: feature
project: dating
feature: matching
public: false

folder: projects/dating/features/matching/components/match-attribute-item
```

molecule ทั้งคู่ — แต่ metadata บันทึกความต่างที่สำคัญกว่าระดับ: ตัวแรกพังแล้วกระทบทุกคน ตัวหลังพังแล้วกระทบทีมเดียว และตัวหลังไม่ต้องขออนุญาตใครตอนอยากแก้

---

## ๗ · สิ่งที่ห้ามทำ — และเหตุผล

- **ห้ามตั้งโฟลเดอร์จริงเป็น `atoms/` `molecules/` `organisms/`** — ระดับเป็นแค่ป้ายใน metadata โฟลเดอร์จริงจัดตามชื่อชิ้นงานและ scope เพราะเวลาหาของ คนค้นด้วยหน้าที่ ("date picker") ไม่มีใครค้นคำว่า "molecule"
- **ห้ามเสียเวลาเถียงว่าชิ้นนี้ชั้นไหน** — ถ้า dependencies ตอบไม่ได้ใน 1 นาที เลือกไปก่อนแล้วจดไว้ ไม่เคยมีงานไหน ship ดีขึ้นเพราะจัดชั้นถูก
- **ห้ามเอาของเข้าไลบรารีกลางเพราะ "เผื่อได้ใช้"** — ต้องมีหลักฐานใช้ซ้ำ ≥2 ที่ก่อนเสมอ ของกำพร้าในไลบรารีกลางอันตรายกว่าของที่อยู่กับทีมแต่มีเจ้าของชัด
- **ห้ามข้ามช่อง `responsibility`** — เขียนก่อนช่องอื่นเสมอ เพราะถ้าหน้าที่ยังสรุปเป็นประโยคเดียวไม่ได้ ช่องที่เหลือจะตอบผิดหมด

---

## ๘ · แม่แบบ 13 ฟิลด์ — ใส่ครบเสมอ

> **ฟิลด์ทุกตัวต้องมีหัวข้ออยู่เสมอ** ถึงจะไม่มีค่าก็ให้ใส่ `null` หรือ `[]` ไว้ — **ห้ามลบหัวข้อทิ้ง**

เหตุผลไม่ใช่ความเรียบร้อย: ถ้าแต่ละไฟล์รูปร่างต่างกัน **diff จะอ่านเหมือนมีอะไรเปลี่ยน ทั้งที่ต่างแค่รูปร่าง** · เขียน script ตรวจไม่ได้เพราะไม่รู้ว่าฟิลด์จะมีอยู่ไหม · และฟิลด์ที่หายไปจะดูเหมือน "ไม่เกี่ยว" ทั้งที่จริงคือ **ลืม**

*(repo นี้เคยมี 35 components ใน 4 รูปร่าง และ `public` หายไปทั้งหมดโดยไม่มีใครสังเกตอยู่หลายสัปดาห์ — เพราะฟิลด์ที่ไม่มี หน้าตาเหมือนฟิลด์ที่ไม่เกี่ยวเป๊ะ)*

copy อันนี้ไปตั้งต้นทุกครั้ง:

```yaml
name: ""                 # kebab-case ตรงกับชื่อโฟลเดอร์
type: ""                 # component | pattern | page | helper
responsibility: ""       # หน้าที่ประโยคเดียว เขียนก่อนเสมอ

composition_level: null  # atom | molecule | organism · null ถ้าไม่ใช่ component
dependencies: []         # component: ประกอบจากตัวไหน
slots: []                # pattern: ช่องให้เสียบ
pattern: null            # page: ใช้ pattern ตัวไหน
organisms: []            # page: ประกอบ organism อะไร

scope: ""                # global | project | feature
project: null            # ใส่เมื่อ scope เป็น project/feature
feature: null            # ใส่เมื่อ scope เป็น feature
public: false            # เปิดให้คนอื่นใช้แล้วหรือยัง

folder: ""               # path จริง ต้องขึ้นต้นตรงกับ scope
```

---

## ๙ · public — ฟิลด์ที่คนมองข้ามบ่อยสุด

`scope` กับ `public` **คนละเรื่องกัน** หลายคนคิดว่า `scope: global` แปลว่าใครก็หยิบไปใช้ได้ — ไม่ใช่

| ฟิลด์ | ตอบคำถาม |
|---|---|
| `scope` | **ขอบเขตกว้างสุดที่อนุญาต**ให้ใช้ — global / project / feature |
| `public` | ในขอบเขตนั้น **เปิดให้ใช้จริงแล้วหรือยัง** และผูกสัญญาว่าห้ามแก้แบบ breaking |

| scope | `public: true` | `public: false` |
|---|---|---|
| `global` | ทุกโปรเจกต์ import ได้ · แก้ API ต้องทำ deprecation | อยู่ใน global แล้วแต่ยัง draft — **ยังห้ามเอาไปใช้** |
| `project` | ทุก feature ในโปรเจกต์นั้นใช้ได้ | ใช้ได้เฉพาะที่ที่มันถูกสร้างมาให้ |
| `feature` | ทุกที่ใน feature นั้นใช้ได้ | ยังเป็นของ local ของหน้าเดียว |

> **ตั้ง `public: true` แล้วต้องมี** — เจ้าของดูแล · story/doc ให้คนอื่นอ่านเองได้ · แก้ props แบบ breaking ต้อง deprecate และบอกทาง migrate · ห้ามฝัง business logic ของ feature ใดลงไป
>
> **ยังทำสามข้อนี้ไม่ได้ = ยังเป็น `false`** ไม่ใช่ค่าที่ตั้งไว้ให้ดูดี

---

## ๑๐ · ด่านตรวจอัตโนมัติ

repo นี้บังคับด้วยเครื่อง ไม่ใช่ด้วยความจำ:

```bash
npm run check
```

ด่านที่ 5 (`tools/check-metadata.py`) ปฏิเสธ:

- ฟิลด์ขาด แม้ค่าจะเป็น `null` หรือ `[]`
- ฟิลด์เรียงผิดลำดับ
- ค่านอกลิสต์ของ `type` / `composition_level` / `scope`
- `composition_level` บนสิ่งที่ไม่ใช่ component หรือหายไปจาก component
- `project` / `feature` ที่ขัดกับ `scope`
- `folder` ที่ไม่ได้ขึ้นต้นตรงกับ `scope`

กรอกครบตั้งแต่แรกถูกกว่ามาแก้ทีหลังเสมอ

---

*อ้างอิง: Lark Standard — Structure · Design System §3.3, §3.7 · ตัวอย่างทั้งหมดมาจาก repo `storybook-ltp` ของจริง · UXUI Team — 7 Solutions*
