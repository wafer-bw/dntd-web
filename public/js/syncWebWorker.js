!function(e){var t={};function n(o){if(t[o])return t[o].exports;var s=t[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(o,s,function(t){return e[t]}.bind(null,s));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=41)}([function(e,t,n){"use strict";function o(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),o(n(8)),o(n(9)),o(n(10)),o(n(11))},,,function(e,t,n){"use strict";function o(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),o(n(42)),o(n(43));class s extends Error{constructor(e,t,n){super(e),this.friendlyMsg=t,this.needsReAuth=n}}t.SyncerError=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(0),s=n(13);t.TaskFactory=class{createTask(e,t){switch(e.type){case o.SyncerPayloadType.GET_ROWS:return s.createGetRowsTask(e,t);case o.SyncerPayloadType.GET_SPREADSHEET:return s.createGetSpreadsheetTask(e,t);case o.SyncerPayloadType.GET_SHEETS:return s.createGetSheetsTask(e,t);case o.SyncerPayloadType.DELETE_ROW:return s.createDeleteRowTask(e,t);case o.SyncerPayloadType.UPDATE_ROW:return s.createUpdateRowTask(e,t);default:return}}};t.BaseTask=class{constructor(e,t){this.testMode=o.TestMode.OFF,this.payload=e,this.testMode=void 0!==t?t:this.testMode}}},,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.NONE=0]="NONE",e[e.AND=1]="AND",e[e.OR=2]="OR"}(t.SearchType||(t.SearchType={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.OFF="0",e.WORKING="1",e.FAIL_GET_SPREADSHEET_SHEETS="2",e.FAIL_GET_RANGE="3",e.FAIL_UPDATE_RANGE="4",e.FAIL_DELETE_ROW="5",e.RETURN_ROWS="6",e.DEMO="7"}(t.TestMode||(t.TestMode={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.AUTH_UPDATE=0]="AUTH_UPDATE",e[e.DELETE_ROW=1]="DELETE_ROW",e[e.UPDATE_ROW=2]="UPDATE_ROW",e[e.GET_ROWS=3]="GET_ROWS",e[e.GET_SHEETS=4]="GET_SHEETS",e[e.TEST_MODE_UPDATE=5]="TEST_MODE_UPDATE",e[e.UNPAUSE=6]="UNPAUSE",e[e.GET_SPREADSHEET=7]="GET_SPREADSHEET",e[e.EXTEND_SHEET=8]="EXTEND_SHEET",e[e.CREATE_ROW=9]="CREATE_ROW",e[e.MOVE_ROW=10]="MOVE_ROW"}(t.SyncerPayloadType||(t.SyncerPayloadType={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.ROWS=0]="ROWS",e[e.SHEETS=1]="SHEETS",e[e.SYNCER_STATE=2]="SYNCER_STATE",e[e.ERROR=3]="ERROR",e[e.REAUTH=4]="REAUTH"}(t.SyncerResponseType||(t.SyncerResponseType={})),function(e){e.PAUSED="cloud_off",e.UPLOADING="cloud_upload",e.DOWNLOADING="cloud_download",e.SYNCED="cloud_done"}(t.SyncerState||(t.SyncerState={}))},,function(e,t,n){"use strict";function o(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),o(n(4)),o(n(44)),o(n(45)),o(n(46)),o(n(14)),o(n(47)),o(n(48))},function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function a(e){try{c(o.next(e))}catch(e){r(e)}}function i(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(3),r=n(4);class a extends r.BaseTask{constructor(e){super(e)}work(e){return o(this,void 0,void 0,(function*(){let t=new URL(`https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}:batchUpdate`),n={method:"POST",mode:"cors",cache:"no-cache",headers:{Authorization:"Bearer "+e},body:JSON.stringify({requests:[{appendDimension:{sheetId:this.payload.sheetId,dimension:"ROWS",length:100}}]})},o=yield fetch(t.toString(),n);if(!o.ok){let e=yield o.json();throw new s.SyncerError(JSON.stringify(e),"Failed to extend sheet",401===o.status)}return this.payload}))}}t.ExtendSheetTask=a},,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function a(e){try{c(o.next(e))}catch(e){r(e)}}function i(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(0),r=n(3),a=n(13);let i=!1,c=s.TestMode.OFF;const u=new a.TaskFactory;let d=void 0,l=s.SyncerState.SYNCED;const h=new Map,y=[];function f(){return o(this,void 0,void 0,(function*(){for(;0!==y.length&&d&&!i;){let{id:e,task:t}=y[0],n=yield t.work(d);postMessage({id:e,payload:n}),y.shift()}}))}function p(){if(0!==h.size&&d&&!i)for(let[e,t]of h.entries())console.log("About to work task "+e),h.delete(e),t.work(d).then(t=>{postMessage({id:e,payload:t})}).catch(n=>{throw h.set(e,t),n})}function T(e){return new Promise(t=>setTimeout(t,e))}!function(){o(this,void 0,void 0,(function*(){for(;;){yield T(250),i||l===s.SyncerState.SYNCED||0!==y.length||0!==h.size||(l=s.SyncerState.SYNCED,r.postQueueState(y.length,l));try{p(),yield f()}catch(e){r.instanceOfSyncerError(e)&&e.needsReAuth?(r.postReAuthRequest(),d=void 0):(i=!0,l=s.SyncerState.PAUSED,r.postQueueState(y.length,l),r.postError(r.instanceOfSyncerError(e)?e:new r.SyncerError(e.message,"Unknown Error",!1)))}}}))}(),onmessage=e=>function(e){const{id:t,payload:n}=e.data;if(n.type===s.SyncerPayloadType.TEST_MODE_UPDATE)return c=n.testMode,void(c!==s.TestMode.OFF&&(d="mock"));if(n.type===s.SyncerPayloadType.AUTH_UPDATE)return void(d=n.token);if(n.type===s.SyncerPayloadType.UNPAUSE)return void(i=!1);let o=u.createTask(n,c);if(void 0===o)return;o.async?h.set(t,o):y.push({id:t,task:o})}(e)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.instanceOfSyncerError=function(e){return"needsReAuth"in e}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(0);function s(e){postMessage(e)}t.postQueueState=function(e,t){s({length:e,state:t,type:o.SyncerResponseType.SYNCER_STATE})},t.postError=function(e){s({friendlyMsg:e.friendlyMsg,error:e,type:o.SyncerResponseType.ERROR})},t.postReAuthRequest=function(){postMessage({type:o.SyncerResponseType.REAUTH})}},function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function a(e){try{c(o.next(e))}catch(e){r(e)}}function i(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(3),r=n(4),a=n(0);t.createGetRowsTask=function(e,t){return t===a.TestMode.OFF?new i(e):new c(e,t)};class i extends r.BaseTask{constructor(e){super(e),this.async=!0}work(e){return o(this,void 0,void 0,(function*(){let t=this.payload.sheetTitle+"!A:A",n=`https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}/values/${t}`,o={method:"GET",cache:"no-cache",headers:{Authorization:"Bearer "+e}},r=yield fetch(n,o);if(!r.ok){let e=yield r.json();throw new s.SyncerError(JSON.stringify(e),"Failed to get sheet rows: "+t,401===r.status)}{let e=yield r.json();this.payload.rows=e.values?e.values.map(e=>e[0]):[]}return this.payload}))}}t.GetRowsTask=i;class c extends r.BaseTask{constructor(e,t){super(e,t),this.async=!0}work(e){return o(this,void 0,void 0,(function*(){if(this.testMode===a.TestMode.FAIL_GET_RANGE)throw new Error("mock fail");return this.testMode===a.TestMode.RETURN_ROWS&&(this.payload.rows=["aaa","bbb","ccc","@tag","@key:value"]),this.payload}))}}t.MockGetRowsTask=c},function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function a(e){try{c(o.next(e))}catch(e){r(e)}}function i(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(3),r=n(4),a=n(0);t.createGetSheetsTask=function(e,t){return t===a.TestMode.OFF?new i(e):void 0};class i extends r.BaseTask{constructor(e){super(e),this.async=!0}work(e){return o(this,void 0,void 0,(function*(){let t="https://sheets.googleapis.com/v4/spreadsheets/"+this.payload.spreadsheetId,n={method:"GET",cache:"no-cache",headers:{Authorization:"Bearer "+e}},o=yield fetch(t,n);if(!o.ok){let e=yield o.json();throw new s.SyncerError(JSON.stringify(e),"Failed to get spreadsheet details for spreadsheet: "+this.payload.spreadsheetId,401===o.status)}{let e=yield o.json();this.payload.sheets=e.sheets?e.sheets:[]}return this.payload}))}}t.GetSheetsTask=i},function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function a(e){try{c(o.next(e))}catch(e){r(e)}}function i(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(3),r=n(4),a=n(0),i=n(14);t.createUpdateRowTask=function(e,t){return t===a.TestMode.OFF?new c(e):void 0};class c extends r.BaseTask{constructor(e){super(e)}work(e){return o(this,void 0,void 0,(function*(){let t=`${this.payload.sheetTitle}!A${this.payload.idx+1}:A${this.payload.idx+1}`,n=new URL(`https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}/values/${t}`),o={Authorization:"Bearer "+e},r={valueInputOption:"RAW"};Object.keys(r).forEach(e=>n.searchParams.append(e,r[e]));let c={method:"PUT",cache:"no-cache",headers:o,body:JSON.stringify({range:t,majorDimension:"ROWS",values:[[this.payload.content]]})},u=yield fetch(n.toString(),c),d=yield u.json();if(!u.ok){if(d.error.message.includes("exceeds grid limits")){let o={type:a.SyncerPayloadType.EXTEND_SHEET,spreadsheetId:this.payload.spreadsheetId,sheetId:this.payload.sheetId};if(yield new i.ExtendSheetTask(o).work(e),(yield fetch(n.toString(),c)).ok)return this.payload;{let e=yield u.json();throw new s.SyncerError(JSON.stringify(e),"Failed to update row: "+t,401===u.status)}}throw new s.SyncerError(JSON.stringify(d),"Failed to update row: "+t,401===u.status)}return this.payload}))}}t.UpdateRowTask=c},function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function a(e){try{c(o.next(e))}catch(e){r(e)}}function i(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(3),r=n(4),a=n(0);t.createDeleteRowTask=function(e,t){return t===a.TestMode.OFF?new i(e):void 0};class i extends r.BaseTask{constructor(e){super(e)}work(e){return o(this,void 0,void 0,(function*(){let t={sheetId:this.payload.sheetId,startRowIndex:this.payload.idx,endRowIndex:this.payload.idx+1,startColumnIndex:0},n=new URL(`https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}:batchUpdate`),o={method:"POST",cache:"no-cache",headers:{Authorization:"Bearer "+e},body:JSON.stringify({requests:[{deleteRange:{range:t,shiftDimension:"ROWS"}}]})},r=yield fetch(n.toString(),o);if(!r.ok){let e=yield r.json();throw new s.SyncerError(JSON.stringify(e),"Failed to delete row: "+this.payload.idx,401===r.status)}return this.payload}))}}t.DeleteRowTask=i},function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function a(e){try{c(o.next(e))}catch(e){r(e)}}function i(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(3),r=n(4),a=n(0);t.createGetSpreadsheetTask=function(e,t){return t===a.TestMode.OFF?new i(e):void 0};class i extends r.BaseTask{constructor(e){super(e),this.async=!0}work(e){return o(this,void 0,void 0,(function*(){let t="https://sheets.googleapis.com/v4/spreadsheets/"+this.payload.spreadsheetId,n={method:"GET",cache:"no-cache",headers:{Authorization:"Bearer "+e}},o=yield fetch(t,n);if(!o.ok){let e=yield o.json();throw new s.SyncerError(JSON.stringify(e),"Failed to get spreadsheet details for spreadsheet: "+this.payload.spreadsheetId,401===o.status)}return this.payload.spreadsheet=yield o.json(),this.payload}))}}t.GetSpreadsheetTask=i}]);
//# sourceMappingURL=syncWebWorker.js.map