function bulkImportCSV () {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var folder = DriveApp.getFolderById("YOUR_ID_HERE");
  // copy the gibberish in the URL of your Google Drive folder where the csv files are located
  // each Google Spreadsheet can only contain up to 200 sheets, that means you can only import a maximum of 199 csv files
  console.log(`using folder: ${folder.getName()}, id: ${folder.getId()}`);

  var files = folder.getFiles();
  var fileList = new Array();
  var file;
  while (files.hasNext()){
    file = files.next();
    fileList.push(file.getId());
  }

  console.log(`number of files: ${fileList.length}`);
  console.log(`list of files: ${fileList}`);
  ss.toast(`Found ${fileList.length} files`, '', 3);

  if (fileList.length > 199) {
    SpreadsheetApp.getUi().alert(`Total number of files to import (${fileList.length}) exceeds limit (199), please remove some files and run function again`);
  }
  else {
    for (var i = 0; i < fileList.length; i++) {
      importCSV(fileList[i]);
      ss.toast(`This is gonna take some time ⏰...`,`importing ${i+1} of ${fileList.length} files`, -1);
    }
    SpreadsheetApp.flush();
    ss.toast(`Import complete`,``,-1);
  }
}

function importCSV(fileId) {
  var file = DriveApp.getFileById(fileId);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var contents = Utilities.parseCsv(file.getBlob().getDataAsString());
  sheet = ss.insertSheet(`${(file.getName().split(".csv"))[0]}`);
  sheet.getRange(1, 1, contents.length, contents[0].length).setValues(contents);
  SpreadsheetApp.flush();
}
