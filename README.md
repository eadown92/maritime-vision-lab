# 海上智慧視覺感知實驗室網站（輕量版）

純靜態網站，不需要 Node.js、不需要 build 工具。所有可更新內容都集中在 `data/` 資料夾，
維護者只要編輯 `data/` 內的 `.js` 檔案即可更新網站內容，不需要碰版面（HTML/CSS）程式碼。

## 目錄結構

```
02_網站原始碼/
├── index.html          首頁
├── about.html           關於實驗室
├── research.html        研究方向
├── publications.html    論文著作 + 專利
├── people.html          成員
├── projects.html        計畫
├── awards.html           獎項榮譽
├── contact.html         聯絡我們
├── assets/
│   ├── css/style.css     版面樣式（一般不需修改）
│   ├── img/pi.jpg         PI 大頭照
│   └── js/                版面渲染邏輯（一般不需修改）
└── data/                  ★ 內容資料，日常更新只改這裡
    ├── site.js            實驗室名稱、導覽列、首頁文案、聯絡資訊
    ├── research.js         研究方向（Phase 2 已由負責人確認之文字，勿隨意更動）
    ├── publications.js    19 篇論文（期刊/會議/專書/專書論文）
    ├── patents.js          7 項專利（獨立列示，不算入論文/計畫）
    ├── people.js           PI 與成員名單
    ├── projects.js         計畫清單
    └── awards.js           獎項榮譽清單
```

## 如何新增一篇論文

打開 `data/publications.js`，在對應的陣列（`journalArticles` / `conferencePapers` /
`books` / `bookChapters`）中新增一筆物件，例如：

```js
{
  "id": "j-2027-example",
  "year": "2027.03",
  "authors": "Yi-Tung Chan",
  "title": "論文標題",
  "venue": "期刊或會議名稱",
  "volume": "1",
  "pages": "1-10",
  "doi": null,
  "doiStatus": "待確認",
  "authorRole": "單一作者"
}
```

存檔後重新整理網頁即可看到更新，不需要任何建置指令。

## 如何新增成員

**推薦方式**：使用 Google 表單收集新成員資料，再一鍵匯入，不需手動編輯 JS 檔案。
詳見 [MEMBER_IMPORT_GUIDE.md](MEMBER_IMPORT_GUIDE.md)，指令為：

```bash
node scripts/import-members-csv.mjs "已發布的Google試算表CSV網址"
```

**手動方式**：也可以直接編輯 `data/people.js` 的 `members` 陣列，格式與 `pi` 陣列相同。

## 如何補上聯絡資訊

編輯 `data/site.js` 的 `contact` 區塊，填入 `email`、`phone`、`address_zh` 等欄位。
目前為空白佔位，**正式對外發布前請務必補齊**。

## 本機預覽

直接用瀏覽器開啟 `index.html` 即可（所有資料以 `<script>` 載入，不需要伺服器）。
若要之後部署到正式網址，把整個 `02_網站原始碼/` 資料夾內容上傳到任何靜態網站空間即可
（校內網頁空間、GitHub Pages、Netlify 等皆可）。

## 資料來源與注意事項

- **所屬單位**：義守大學資訊工程學系（I-Shou University, Dept. of Computer Science and
  Information Engineering）。**注意**：`個人教師表現.pdf` 的頁首雖印有「資訊工程學系 詹益東」，
  但未直接列出校名；早期版本誤用專利受讓人「海軍軍官學校」推斷所屬單位，已於 2026/09 依
  義守大學資訊工程學系教師名錄頁面（https://csie.isu.edu.tw/teachers/faculty）與 PI 履歷更正。
  海軍軍官學校為 PI 先前（2017–約2025）任職單位，非現職。
- **PI 職稱**：副教授（Associate Professor）。同上，已依教師名錄頁面更正（原先誤植為助理教授）。
- 19 篇論文 + 7 項專利資料來源：`個人教師表現.pdf`（教師著作列表，2026/08/31 匯出）。
- 研究方向文案沿用前一階段已由實驗室負責人確認（A4_AUTHOR_CONFIRMED）之版本，未經改寫。
- **DOI**：8 篇期刊論文的 DOI 已於 2026/09 全數透過 CrossRef（api.crossref.org REST API）
  逐篇查詢核實，論文標題已加上超連結指向 `https://doi.org/<DOI>`。其中 2017 年
  Information Fusion 論文，機構紀錄（`個人教師表現.pdf`）登記的標題「A novel ensemble method
  to integrate with different technologies for moving foreground detection」實為其 2015 年
  會議論文（ICGIP）同名之早期版本；正式出版之期刊標題為「Real-time foreground detection
  approach based on adaptive ensemble learning with arbitrary algorithms for changing
  environments」，已依 CrossRef 與 PI CV 更正並直接呈現於網頁；原始機構紀錄標題保留於該筆
  記錄的 `titleNote` 欄位供內部查考，不在頁面上顯示提示圖示（避免造成使用者困惑）。
- **PI 大頭照**：來自 `PI個人資料/PI照片.jpg`，已縮圖存放於 `assets/img/pi.jpg`。
- **成員 / 聯絡資訊**：PI 聯絡方式（email、電話、傳真、辦公室）已依系網頁核實填入。
  完整郵寄地址（840301 高雄市大樹區學城路一段1號 資訊工程學系）由負責人提供。
  其他實驗室成員（研究生、專題生、助理）尚無資料，待新增。
- **計畫（`projects.js`）**：2 筆國科會計畫（107、108 年度）已依國家科學及技術委員會
  補助研究計畫查詢系統（https://wsts.nstc.gov.tw）查詢畫面核實；另 2 筆國防部計畫僅見於 PI
  自陳履歷，未見於公開資料庫，已於各筆 `source` 欄位標註區別（`NSTC_VERIFIED` vs
  `CV_SELF_REPORTED`）。
  （原國科會 109 年度「應用於自主船舶之智慧視覺技術開發」與國防部 2024 年度「軍民合一之高敏感度
  氣體感測器元件開發」兩筆計畫已依負責人指示自清單移除；如需恢復請參考上一版 `projects.js`
  或本文件的 git 歷史。）若要新增計畫，請比照既有筆數的欄位與來源標註方式。
- **指導大專生研究計畫（`projects.js` 的 `studentProjects`）**：5 筆，資料來源為國科會
  「大專學生研究計畫」查詢系統（執行機關限定：海軍軍官學校電機系），2026/09 查閱畫面截圖核實。
  同一查詢結果中另有 1 筆 107 年度計畫（學生：雷傑茗）指導教授為李仁軍，非本實驗室 PI，
  已依規則排除、不予收錄。
- **專利國別**：`patents.js` 每筆已補上 `country` 欄位（現有 7 項皆為「中華民國」），
  `publications.html` 專利表格新增「國別」欄。
- **研究方向頁的「近期研究成果」**：`data/research.js` 的 `recentHighlights` 陣列，收錄 6 篇
  有提供論文電子檔的期刊論文（2026 PGME、2026 EETS、2024 CVIU、2021 SPIC、2021 CVIU、
  2019 JEI）。每篇的 `summary_zh` 皆由 Claude 讀取 `01_建置中實驗室網站資料/期刊論文/` 下對應
  資料夾的論文 PDF 全文後，以 250 字內繁體中文摘寫；正式引用請以論文原文摘要為準。另有 2 篇期刊
  論文（2017 JEI「Extracting foreground ensemble features…」、2017 Information Fusion）該
  資料夾內尚無 PDF 電子檔，故未列入本區塊，亦未摘寫。
  - **每篇僅呈現單一媒體**（`media` 欄位），以縮短版面：
    - `{"type": "video", "youtubeId": null, "src": "...", "poster": "..."}` — 有 VGA 影片的論文
      （目前僅 PGME、Energy-Efficient…／T-ATFD 兩篇）。`youtubeId` 設定後優先以 YouTube 內嵌
      播放；未設定時退回播放本機 `src` 影片檔（`assets/video/vga/{pgme,eets}.mp4`，各約 12.8MB），
      `poster` 為影片縮圖（`assets/img/ga/{pgme,eets}.png`，即原廠提供的 GA 靜態圖）。
    - `{"type": "image", "src": "...", "caption_zh": "..."}` — 其餘 4 篇沒有製作 GA/VGA，改由
      Claude 從論文 PDF 中挑選一張最具代表性的圖表（多為方法流程圖或系統架構圖）另存至
      `assets/img/ga/{cviu2024,spic2021,cviu2021,jei2019}.png`，並附簡短中文圖說。
  - **已改用 YouTube 託管影片（降低維護成本）**：兩部影片已上傳 YouTube 並設定
    `media.youtubeId`：PGME → `ZVuSZk5NJL4`、Energy-Efficient…（T-ATFD）→ `5LPdGUydFfg`，
    畫面已改為 YouTube 內嵌播放器（`youtube-nocookie.com/embed/`）。本機
    `assets/video/vga/{pgme,eets}.mp4`（各約 12.8MB）目前仍保留在專案內、未被引用，
    可視情況刪除以節省空間；`poster` 縮圖（`assets/img/ga/{pgme,eets}.png`）建議保留，
    若日後 `youtubeId` 被清空會自動退回顯示縮圖。之後新增其他論文的 VGA，比照這個模式：
    先設 `"src"`/`"poster"` 顯示本機影片，上傳 YouTube 後再補上 `"youtubeId"` 即可切換。
- **獎項榮譽（`awards.js`）**：24 筆資料，來源為 PI 履歷 `MOST CV_20250503.pdf` 之
  「AWARD AND HONOR」章節（英文原文），中文為輔助翻譯。國科會「獎勵」查詢系統
  （AwardMultiQuery.aspx）為互動式 ASP.NET 表單，無法用網址直接帶姓名查詢，尚未逐筆比對核實，
  如需公部門資料庫核實，需人工至該系統手動查詢。
- 此版本為「輕量重建」，未沿用前一版交接文件中複雜的 Phase/Authority 治理框架，
  但保留了其中已由負責人確認過、確實有價值的內容（研究方向文案、論文清單）。
