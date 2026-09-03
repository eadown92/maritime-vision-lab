#!/usr/bin/env node
/**
 * 成員資料一鍵匯入工具
 * ============================================================
 * 用途：把 Google 表單收集到的新成員資料（透過連結的 Google 試算表匯出/
 *       發布為 CSV）匯入 data/people.js，自動新增或更新成員資料。
 *
 * 用法：
 *   node scripts/import-members-csv.mjs <CSV路徑或已發布的Google試算表CSV網址>
 *
 * 範例：
 *   node scripts/import-members-csv.mjs "https://docs.google.com/spreadsheets/d/e/xxxx/pub?output=csv"
 *   node scripts/import-members-csv.mjs "C:\Users\CJSCOPE\Downloads\成員回覆.csv"
 *
 * 比對規則：以「Email」欄位為唯一鍵。
 *   - Email 已存在於 members 或 alumni → 更新該筆資料（不會清空既有的其他欄位，
 *     只覆寫這次 CSV 有提供值的欄位）。
 *   - Email 不存在 → 新增一筆。
 *   - 若「目前狀態」欄位填寫「已畢業/校友」等字樣，會歸類到 alumni，
 *     並自動從 members 移除（反之亦然），避免同一人同時出現在兩處。
 *
 * 表單欄位標題必須與下方 HEADER_MAP 的中文完全一致，才會被辨識；
 * 完整建表步驟請見 MEMBER_IMPORT_GUIDE.md。
 * ============================================================
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "..", "data", "people.js");

// Google 表單題目標題 -> data/people.js 欄位名稱
const HEADER_MAP = {
  "中文姓名": "name_zh",
  "英文姓名": "name_en",
  "身份/角色": "role_zh",
  "Email": "email",
  "辦公室/位置": "office",
  "簡介": "bio_zh",
  "個人網站或 Google Scholar 連結": "googleScholar",
  "大頭照網址": "photo",
  "目前狀態": "status",
};

function parseCSV(text) {
  // 支援欄位內含逗號、換行、雙引號的簡易 RFC4180 CSV 解析
  const rows = [];
  let row = [], field = "", inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field); field = "";
    } else if (c === "\n") {
      row.push(field); rows.push(row); row = []; field = "";
    } else if (c === "\r") {
      // skip
    } else {
      field += c;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((f) => f.trim() !== ""));
}

function slugify(nameEn, email) {
  const base = (nameEn || email || "member")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "member-" + Date.now();
}

async function loadCsvText(source) {
  if (/^https?:\/\//i.test(source)) {
    const res = await fetch(source);
    if (!res.ok) throw new Error("下載 CSV 失敗：HTTP " + res.status);
    return await res.text();
  }
  return fs.readFileSync(source, "utf8");
}

function readPeopleData() {
  const src = fs.readFileSync(DATA_FILE, "utf8");
  const start = src.indexOf("{");
  const end = src.lastIndexOf("}");
  const objLiteral = src.slice(start, end + 1);
  // data/people.js 內容是合法的物件字面量（目前也是合法 JSON），用 Function 還原成物件
  return new Function("return (" + objLiteral + ");")();
}

function writePeopleData(obj) {
  const body = JSON.stringify(obj, null, 2);
  fs.writeFileSync(DATA_FILE, "window.PEOPLE_DATA = " + body + "\n;\n", "utf8");
}

async function main() {
  const source = process.argv[2];
  if (!source) {
    console.error("用法：node scripts/import-members-csv.mjs <CSV路徑或已發布的Google試算表CSV網址>");
    process.exit(1);
  }

  const csvText = await loadCsvText(source);
  const rows = parseCSV(csvText);
  if (rows.length < 2) {
    console.log("CSV 中沒有資料列，未做任何變更。");
    return;
  }

  const headers = rows[0].map((h) => h.trim());
  const dataRows = rows.slice(1);

  const people = readPeopleData();
  people.members = people.members || [];
  people.alumni = people.alumni || [];

  let added = 0, updated = 0, skipped = 0;

  for (const row of dataRows) {
    const rec = {};
    headers.forEach((h, idx) => {
      const key = HEADER_MAP[h];
      if (key) rec[key] = (row[idx] || "").trim();
    });

    if (!rec.name_zh || !rec.email) { skipped++; continue; }

    const isAlumni = !!(rec.status && /畢業|校友|alumni/i.test(rec.status));
    const targetArr = isAlumni ? people.alumni : people.members;
    const otherArr = isAlumni ? people.members : people.alumni;

    const person = {
      id: slugify(rec.name_en, rec.email),
      name_zh: rec.name_zh,
      name_en: rec.name_en || "",
      role_zh: rec.role_zh || "",
      email: rec.email,
    };
    if (rec.office) person.office = rec.office;
    if (rec.bio_zh) person.bio_zh = rec.bio_zh;
    if (rec.googleScholar) person.googleScholar = rec.googleScholar;
    if (rec.photo) person.photo = rec.photo;

    // 若身份切換（成員<->校友），從另一個陣列移除舊紀錄
    const otherIdx = otherArr.findIndex((p) => p.email === rec.email);
    if (otherIdx !== -1) otherArr.splice(otherIdx, 1);

    const idx = targetArr.findIndex((p) => p.email === rec.email);
    if (idx === -1) {
      targetArr.push(person);
      added++;
    } else {
      targetArr[idx] = Object.assign({}, targetArr[idx], person);
      updated++;
    }
  }

  writePeopleData(people);
  console.log(`匯入完成：新增 ${added} 筆、更新 ${updated} 筆、略過(缺中文姓名或Email) ${skipped} 筆。`);
  console.log(`目前 members: ${people.members.length} 筆、alumni: ${people.alumni.length} 筆。`);
  console.log("請開啟 people.html 確認顯示無誤後，再提交/部署。");
}

main().catch((err) => {
  console.error("匯入失敗：", err.message);
  process.exit(1);
});
