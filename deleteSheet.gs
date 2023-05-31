function deleteSheet () {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  for (i = 0; i < sheets.length; i++) {
    switch(sheets[i].getSheetName()) {
    case "Sheet1":
    // ^ Sheet1 will be spared from deletion, repeat this line and change "Sheet1" to name of each sheet you want to keep
    break;
    default:
    ss.deleteSheet(sheets[i]);
    }
  }
}
