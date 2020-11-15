!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=18)}({10:function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.OFF="0",e.WORKING="1",e.FAIL_GET_SPREADSHEET_SHEETS="2",e.FAIL_GET_RANGE="3",e.FAIL_UPDATE_RANGE="4",e.FAIL_DELETE_ROW="5",e.RETURN_ROWS="6",e.DEMO="demomode"}(r=t.TestMode||(t.TestMode={})),t.instanceOfTestMode=function(e){return Object.values(r).includes(e)}},11:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.AUTH_UPDATE=0]="AUTH_UPDATE",e[e.DELETE_ROW=1]="DELETE_ROW",e[e.UPDATE_ROW=2]="UPDATE_ROW",e[e.GET_ROWS=3]="GET_ROWS",e[e.TEST_MODE_UPDATE=4]="TEST_MODE_UPDATE",e[e.UNPAUSE=5]="UNPAUSE",e[e.GET_SPREADSHEET=6]="GET_SPREADSHEET",e[e.EXTEND_SHEET=7]="EXTEND_SHEET",e[e.CREATE_ROW=8]="CREATE_ROW",e[e.MOVE_ROW=9]="MOVE_ROW",e[e.ERROR=10]="ERROR",e[e.TOKEN_REQUEST=11]="TOKEN_REQUEST",e[e.SYNC_STATE=12]="SYNC_STATE"}(t.SyncerPayloadType||(t.SyncerPayloadType={})),function(e){e[e.SYNCER_STATE=0]="SYNCER_STATE",e[e.ERROR=1]="ERROR",e[e.REAUTH=2]="REAUTH"}(t.SyncerResponseType||(t.SyncerResponseType={})),function(e){e.PAUSED="cloud_off",e.UPLOADING="cloud_upload",e.DOWNLOADING="cloud_download",e.SYNCED="cloud_done",e.INITIALIZING="cloud_queue"}(t.SyncerState||(t.SyncerState={}))},12:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(2);class o extends Error{constructor(e,t,n,o,s){super(e),this.friendlyMsg=t,this.needsReAuth=n,this.payload={pause:void 0===o||o,error:this,friendlyMsg:this.friendlyMsg,type:r.SyncerPayloadType.ERROR,rejects:void 0!==s&&s}}}t.SyncerError=o},13:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class r extends Error{constructor(e,t){super(e),this.msg=e,this.friendlyMsg=t}}t.FriendlyError=r},18:function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,s){function a(e){try{c(r.next(e))}catch(e){s(e)}}function i(e){try{c(r.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=n(66),s=n(4),a=n(19),i=n(73),c=n(2);t.syncRate=250;const d=new a.TaskFactory,u=new Map,l=[];let h=0,y=c.TestMode.OFF,p=void 0,f=c.SyncerState.SYNCED;function T(){return f!==c.SyncerState.PAUSED&&f!==c.SyncerState.SYNCED&&l.length+u.size+h===0}function E(e){void 0!==e&&f!==e&&(f=e,i.postSyncStateMessage(l.length,f))}function S(e,t){let n=o.instanceOfSyncerError(e)?e:new s.SyncerError(e.message,"Unknown Error",!1);if(n.needsReAuth)return i.postTokenRequestMessage(),void(p=void 0);n.payload.pause&&E(c.SyncerState.PAUSED),postMessage({id:t,error:n.payload})}function w(){return r(this,void 0,void 0,(function*(){for(;0!==l.length&&p&&f!==c.SyncerState.PAUSED;){E(c.SyncerState.UPLOADING);let{id:e,task:t}=l[0];try{let n=yield t.work(p);postMessage({id:e,payload:n}),l.shift()}catch(t){S(t,e)}}}))}function _(){if(0!==u.size&&p&&f!==c.SyncerState.PAUSED){E(c.SyncerState.DOWNLOADING);for(let[e,t]of u.entries())h+=1,u.delete(e),t.work(p).then(t=>postMessage({id:e,payload:t})).catch(t=>S(t,e)).finally(()=>h-=1)}}function O(e){return new Promise(t=>setTimeout(t,e))}!function(){r(this,void 0,void 0,(function*(){for(;;)yield O(t.syncRate),T()&&E(c.SyncerState.SYNCED),_(),yield w()}))}(),onmessage=e=>function(e){const{id:t,payload:n}=e.data;switch(n.type){case c.SyncerPayloadType.TEST_MODE_UPDATE:return y=n.testMode,void(y!==c.TestMode.OFF&&(p="mock"));case c.SyncerPayloadType.AUTH_UPDATE:return void(p=n.token);case c.SyncerPayloadType.UNPAUSE:return void E(c.SyncerState.UPLOADING)}let r=d.createTask(n,y);if(void 0===r)return;r.async?u.set(t,r):l.push({id:t,task:r})}(e)},19:function(e,t,n){"use strict";function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(5)),r(n(68)),r(n(69)),r(n(70)),r(n(71)),r(n(20)),r(n(72))},2:function(e,t,n){"use strict";function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(9)),r(n(10)),r(n(11))},20:function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,s){function a(e){try{c(r.next(e))}catch(e){s(e)}}function i(e){try{c(r.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=n(5),s=n(4);class a extends o.BaseTask{constructor(e){super(e)}work(e){return r(this,void 0,void 0,(function*(){let t=new URL(`https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}:batchUpdate`),n={method:"POST",mode:"cors",cache:"no-cache",headers:{Authorization:"Bearer "+e},body:JSON.stringify({requests:[{appendDimension:{sheetId:this.payload.sheetId,dimension:"ROWS",length:100}}]})},r=yield fetch(t.toString(),n);if(!r.ok){let e=yield r.json();throw new s.SyncerError(JSON.stringify(e),"Failed to extend Google Sheet",401===r.status)}return this.payload}))}}t.ExtendSheetTask=a},4:function(e,t,n){"use strict";function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(12)),r(n(13))},5:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(2),o=n(19);t.TaskFactory=class{createTask(e,t){switch(e.type){case r.SyncerPayloadType.CREATE_ROW:return o.createCreateRowTask(e,t);case r.SyncerPayloadType.GET_ROWS:return o.createGetRowsTask(e,t);case r.SyncerPayloadType.GET_SPREADSHEET:return o.createGetSpreadsheetTask(e,t);case r.SyncerPayloadType.UPDATE_ROW:return o.createUpdateRowTask(e,t);case r.SyncerPayloadType.DELETE_ROW:return o.createDeleteRowTask(e,t);default:return void console.warn("Task factory told to build unsupported task")}}};t.BaseTask=class{constructor(e,t){this.testMode=r.TestMode.OFF,this.payload=e,this.testMode=void 0!==t?t:this.testMode}}},66:function(e,t,n){"use strict";function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(67)),r(n(18))},67:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.instanceOfSyncerError=function(e){return"needsReAuth"in e}},68:function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,s){function a(e){try{c(r.next(e))}catch(e){s(e)}}function i(e){try{c(r.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=n(5),s=n(2),a=n(4);t.createGetRowsTask=function(e,t){return t===s.TestMode.OFF?new i(e):new c(e,t)};class i extends o.BaseTask{constructor(e){super(e),this.async=!0}work(e){return r(this,void 0,void 0,(function*(){let t=this.payload.sheetTitle+"!A:A",n=`https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}/values/${t}`,r={method:"GET",cache:"no-cache",headers:{Authorization:"Bearer "+e}},o=yield fetch(n,r);if(!o.ok){let e=yield o.json();throw new a.SyncerError(JSON.stringify(e),"Failed to load entries from "+this.payload.spreadsheetId,401===o.status,!0,!0)}{let e=yield o.json();this.payload.rows=e.values?e.values.map(e=>e[0]):[]}return this.payload}))}}t.GetRowsTask=i;class c extends o.BaseTask{constructor(e,t){super(e,t),this.async=!0}work(e){return r(this,void 0,void 0,(function*(){if(this.testMode===s.TestMode.FAIL_GET_RANGE){let e=new Error("mock fail");throw new a.SyncerError(JSON.stringify(e),"Failed to load entries from "+this.payload.spreadsheetId,!1,!0,!0)}return this.testMode===s.TestMode.RETURN_ROWS&&(this.payload.rows=["aaa","bbb","ccc","@tag","@key:value"]),this.payload}))}}t.MockGetRowsTask=c},69:function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,s){function a(e){try{c(r.next(e))}catch(e){s(e)}}function i(e){try{c(r.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=n(5),s=n(2),a=n(4);t.createCreateRowTask=function(e,t){return t===s.TestMode.OFF?new i(e):new c(e,t)};class i extends o.BaseTask{constructor(e){super(e)}work(e){return r(this,void 0,void 0,(function*(){let t={sheetId:this.payload.sheetId,startIndex:this.payload.idx,endIndex:this.payload.idx+1,dimension:"ROWS"},n=new URL(`https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}:batchUpdate`),r={method:"POST",cache:"no-cache",headers:{Authorization:"Bearer "+e},body:JSON.stringify({requests:[{insertDimension:{range:t}}]})},o=yield fetch(n.toString(),r);if(!o.ok){let e=yield o.json();throw new a.SyncerError(JSON.stringify(e),"Failed to create new entry",401===o.status)}return this.payload}))}}t.CreateRowTask=i;class c extends o.BaseTask{constructor(e,t){super(e,t)}work(e){return r(this,void 0,void 0,(function*(){if(this.testMode===s.TestMode.FAIL_DELETE_ROW){let e=new Error("mock fail");throw new a.SyncerError(JSON.stringify(e),"Failed to create new entry",!1)}return this.payload}))}}t.MockCreateRowTask=c},70:function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,s){function a(e){try{c(r.next(e))}catch(e){s(e)}}function i(e){try{c(r.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=n(5),s=n(20),a=n(4),i=n(2);t.createUpdateRowTask=function(e,t){return t===i.TestMode.OFF?new c(e):new d(e,t)};class c extends o.BaseTask{constructor(e){super(e)}work(e){return r(this,void 0,void 0,(function*(){let t=`${this.payload.sheetTitle}!A${this.payload.idx+1}:A${this.payload.idx+1}`,n=new URL(`https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}/values/${t}`),r={Authorization:"Bearer "+e},o={valueInputOption:"RAW"};Object.keys(o).forEach(e=>n.searchParams.append(e,o[e]));let c={method:"PUT",cache:"no-cache",headers:r,body:JSON.stringify({range:t,majorDimension:"ROWS",values:[[this.payload.content]]})},d=yield fetch(n.toString(),c),u=yield d.json();if(!d.ok){if(u.error.message.includes("exceeds grid limits")){let t={type:i.SyncerPayloadType.EXTEND_SHEET,spreadsheetId:this.payload.spreadsheetId,sheetId:this.payload.sheetId,rejects:!1};if(yield new s.ExtendSheetTask(t).work(e),(yield fetch(n.toString(),c)).ok)return this.payload;{let e=yield d.json();throw new a.SyncerError(JSON.stringify(e),"Failed to update entry",401===d.status)}}throw new a.SyncerError(JSON.stringify(u),"Failed to update entry",401===d.status)}return this.payload}))}}t.UpdateRowTask=c;class d extends o.BaseTask{constructor(e,t){super(e,t)}work(){return r(this,void 0,void 0,(function*(){if(this.testMode===i.TestMode.FAIL_UPDATE_RANGE){let e=new Error("mock fail");throw new a.SyncerError(JSON.stringify(e),"Failed to update entry",!1)}return this.payload}))}}t.MockUpdateRowTask=d},71:function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,s){function a(e){try{c(r.next(e))}catch(e){s(e)}}function i(e){try{c(r.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=n(5),s=n(2),a=n(4);t.createDeleteRowTask=function(e,t){return t===s.TestMode.OFF?new i(e):new c(e,t)};class i extends o.BaseTask{constructor(e){super(e)}work(e){return r(this,void 0,void 0,(function*(){let t={sheetId:this.payload.sheetId,startRowIndex:this.payload.idx,endRowIndex:this.payload.idx+1,startColumnIndex:0},n=new URL(`https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}:batchUpdate`),r={method:"POST",cache:"no-cache",headers:{Authorization:"Bearer "+e},body:JSON.stringify({requests:[{deleteRange:{range:t,shiftDimension:"ROWS"}}]})},o=yield fetch(n.toString(),r);if(!o.ok){let e=yield o.json();throw new a.SyncerError(JSON.stringify(e),"Failed to delete entry",401===o.status)}return this.payload}))}}t.DeleteRowTask=i;class c extends o.BaseTask{constructor(e,t){super(e,t)}work(e){return r(this,void 0,void 0,(function*(){if(this.testMode===s.TestMode.FAIL_DELETE_ROW){let e=new Error("mock fail");throw new a.SyncerError(JSON.stringify(e),"Failed to delete entry",!1)}return this.payload}))}}t.MockDeleteRowTask=c},72:function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,s){function a(e){try{c(r.next(e))}catch(e){s(e)}}function i(e){try{c(r.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=n(5),s=n(2),a=n(4);t.createGetSpreadsheetTask=function(e,t){return t===s.TestMode.OFF?new i(e):new c(e,t)};class i extends o.BaseTask{constructor(e){super(e),this.async=!0}work(e){return r(this,void 0,void 0,(function*(){let t="https://sheets.googleapis.com/v4/spreadsheets/"+this.payload.spreadsheetId,n={method:"GET",cache:"no-cache",headers:{Authorization:"Bearer "+e}},r=yield fetch(t,n);if(!r.ok){let e=yield r.json();throw new a.SyncerError(JSON.stringify(e),"Could not get spreadsheet information for "+this.payload.spreadsheetId,401===r.status,!1,!0)}return this.payload.spreadsheet=yield r.json(),this.payload}))}}t.GetSpreadsheetTask=i;class c extends o.BaseTask{constructor(e,t){super(e,t),this.async=!0}work(e){return r(this,void 0,void 0,(function*(){if(this.testMode===s.TestMode.FAIL_GET_SPREADSHEET_SHEETS){let e=new Error("mock fail");throw new a.SyncerError(JSON.stringify(e),"Could not get spreadsheet information for "+this.payload.spreadsheetId,!1,!1,!0)}return this.payload.spreadsheet={spreadsheetId:this.payload.spreadsheetId,spreadsheetUrl:`https://docs.google.com/spreadsheets/d/${this.payload.spreadsheetId}/edit`,properties:{title:"Mock Journal"},sheets:[{properties:{sheetId:0,title:"Sheet1"}},{properties:{sheetId:1124780423,title:"Sheet2"}},{properties:{sheetId:1286561930,title:"Sheet3"}}]},this.payload}))}}t.MockGetSpreadsheetTask=c},73:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(2);function o(e){postMessage({payload:e})}t.postSyncStateMessage=function(e,t){o({length:e,state:t,type:r.SyncerPayloadType.SYNC_STATE,rejects:!1})},t.postTokenRequestMessage=function(){o({type:r.SyncerPayloadType.TOKEN_REQUEST,rejects:!1})}},9:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.NONE=0]="NONE",e[e.AND=1]="AND",e[e.OR=2]="OR"}(t.SearchType||(t.SearchType={}))}});
//# sourceMappingURL=syncWebWorker.js.map