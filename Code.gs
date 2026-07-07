/*
  DO'KON HISOB-KITOB — Google Sheets backend
  ------------------------------------------
  1. Google Drive'da yangi Google Sheet (jadval) yarating.
  2. Yuqoridagi menyudan: Kengaytmalar (Extensions) -> Apps Script.
  3. Ochilgan oynadagi barcha standart kodni o'chirib, shu faylning
     hammasini o'rniga joylashtiring.
  4. Yuqori o'ng burchakdan "Deploy" -> "New deployment" ni bosing.
  5. Type sifatida "Web app" ni tanlang.
     - Execute as: Me
     - Who has access: Anyone
  6. "Deploy" tugmasini bosing, Google ruxsat so'raydi - ruxsat bering.
  7. Chiqqan "Web app URL" manzilini nusxalab, index.html faylidagi
     SCRIPT_URL o'zgaruvchisiga joylashtiring.

  Har safar kodni o'zgartirsangiz, "Deploy" -> "Manage deployments" ->
  qalam belgisi -> "New version" -> Deploy qilishni unutmang.
*/

const SHEET_NAME = 'Data';

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify(getAllData()))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  // LockService: bir vaqtda ikkita xodim saqlasa ham, yozuvlar
  // bir-birini bosib qolmasligi (race condition) uchun navbatga qo'yadi.
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // eng ko'pi bilan 10 soniya navbat kutadi
    const body = JSON.parse(e.postData.contents);
    setData(body.key, body.value);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['key', 'value']);
  }
  return sheet;
}

function getAllData() {
  const sheet = getSheet_();
  const rows = sheet.getDataRange().getValues();
  const result = {};
  for (let i = 1; i < rows.length; i++) {
    const key = rows[i][0];
    const value = rows[i][1];
    if (!key) continue;
    result[key] = value;
  }
  return result;
}

function setData(key, value) {
  const sheet = getSheet_();
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === key) {
      sheet.getRange(i + 1, 2).setValue(value);
      return;
    }
  }
  sheet.appendRow([key, value]);
}
