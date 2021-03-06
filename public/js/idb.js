//using 18.4.4 module as template.


let db;

//connects to indexed db
const request = indexedDB.open('budget-tracker', 1);

//from module 18.4.4 creates on object store
request.onupgradeneeded = function(event) {
  const db = event.target.result;
  db.createObjectStore('new_trans', { autoIncrement: true });
};

request.onsuccess = function(event) {
  
  db = event.target.result;

  
  if (navigator.onLine) {
    uploadTrans();
  }
};

request.onerror = function(event) {
 
  console.log(event.target.errorCode);
};

//save
function saveTransRecord(record) {
 
  const trans = db.transaction(['new_trans'], 'readwrite');

  const transObjStore = trans.objectStore('new_trans');

  
  transObjStore.add(record);
}


//upload
function uploadTrans() {

  const trans = db.transaction(['new_trans'], 'readwrite');

 
  const transObjStore = trans.objectStore('new_trans');

  // get all records from store and set to a variable
  const getAllRecords = transObjStore.getAll();

  getAllRecords.onsuccess = function() {
    
    if (getAllRecords.result.length > 0) {
      fetch('/api/transactions/bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(serverResponse => {
          if (serverResponse.message) {
            throw new Error(serverResponse);
          }

          const trans = db.transaction(['new_trans'], 'readwrite');
          const transObjStore = trans.objectStore('new_trans');
          
          transObjStore.clear();
        })
        .catch(err => {
         
          console.log(err);
        });
    }
  };
}


window.addEventListener('online', uploadTrans);