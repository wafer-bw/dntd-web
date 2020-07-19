!function(e){var t={};function n(o){if(t[o])return t[o].exports;var s=t[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(o,s,function(t){return e[t]}.bind(null,s));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=44)}([function(e,t,n){"use strict";function o(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),o(n(9)),o(n(10)),o(n(11)),o(n(12))},,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(0),s=n(13);t.TaskFactory=class{createTask(e,t){switch(e.type){case o.SyncerPayloadType.GET_ROWS:return s.createGetRowsTask(e,t);case o.SyncerPayloadType.GET_SPREADSHEET:return s.createGetSpreadsheetTask(e,t);case o.SyncerPayloadType.GET_SHEETS:return s.createGetSheetsTask(e,t);case o.SyncerPayloadType.DELETE_ROW:return s.createDeleteRowTask(e,t);case o.SyncerPayloadType.UPDATE_ROW:return s.createUpdateRowTask(e,t);default:return}}};t.BaseTask=class{constructor(e,t){this.testMode=o.TestMode.OFF,this.payload=e,this.testMode=void 0!==t?t:this.testMode}}},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(45));class o extends Error{constructor(e,t,n){super(e),this.friendlyMsg=t,this.needsReAuth=n}}t.SyncerError=o},,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(0);class s extends Error{constructor(e,t,n,s){super(e),this.friendlyMsg=t,this.needsReAuth=n,this.payload={pause:void 0===s||s,error:this,friendlyMsg:this.friendlyMsg,type:o.SyncerPayloadType.ERROR}}}t.SyncerError=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.NONE=0]="NONE",e[e.AND=1]="AND",e[e.OR=2]="OR"}(t.SearchType||(t.SearchType={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.OFF="0",e.WORKING="1",e.FAIL_GET_SPREADSHEET_SHEETS="2",e.FAIL_GET_RANGE="3",e.FAIL_UPDATE_RANGE="4",e.FAIL_DELETE_ROW="5",e.RETURN_ROWS="6",e.DEMO="7"}(t.TestMode||(t.TestMode={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.AUTH_UPDATE=0]="AUTH_UPDATE",e[e.DELETE_ROW=1]="DELETE_ROW",e[e.UPDATE_ROW=2]="UPDATE_ROW",e[e.GET_ROWS=3]="GET_ROWS",e[e.GET_SHEETS=4]="GET_SHEETS",e[e.TEST_MODE_UPDATE=5]="TEST_MODE_UPDATE",e[e.UNPAUSE=6]="UNPAUSE",e[e.GET_SPREADSHEET=7]="GET_SPREADSHEET",e[e.EXTEND_SHEET=8]="EXTEND_SHEET",e[e.CREATE_ROW=9]="CREATE_ROW",e[e.MOVE_ROW=10]="MOVE_ROW",e[e.ERROR=11]="ERROR",e[e.TOKEN_REQUEST=12]="TOKEN_REQUEST",e[e.SYNC_STATE=13]="SYNC_STATE"}(t.SyncerPayloadType||(t.SyncerPayloadType={})),function(e){e[e.SYNCER_STATE=0]="SYNCER_STATE",e[e.ERROR=1]="ERROR",e[e.REAUTH=2]="REAUTH"}(t.SyncerResponseType||(t.SyncerResponseType={})),function(e){e.PAUSED="cloud_off",e.UPLOADING="cloud_upload",e.DOWNLOADING="cloud_download",e.SYNCED="cloud_done"}(t.SyncerState||(t.SyncerState={}))},function(e,t,n){"use strict";function o(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),o(n(4)),o(n(46)),o(n(47)),o(n(48)),o(n(14)),o(n(49)),o(n(50))},function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function a(e){try{c(o.next(e))}catch(e){r(e)}}function i(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(6),r=n(4);class a extends r.BaseTask{constructor(e){super(e)}work(e){return o(this,void 0,void 0,(function*(){let t=new URL(`https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}:batchUpdate`),n={method:"POST",mode:"cors",cache:"no-cache",headers:{Authorization:"Bearer "+e},body:JSON.stringify({requests:[{appendDimension:{sheetId:this.payload.sheetId,dimension:"ROWS",length:100}}]})},o=yield fetch(t.toString(),n);if(!o.ok){let e=yield o.json();throw new s.SyncerError(JSON.stringify(e),"Failed to extend sheet",401===o.status)}return this.payload}))}}t.ExtendSheetTask=a},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function a(e){try{c(o.next(e))}catch(e){r(e)}}function i(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(6),r=n(0),a=n(13),i=n(51),c=n(0);let d=c.TestMode.OFF;const u=new a.TaskFactory;let l=void 0,h=c.SyncerState.SYNCED;const y=new Map,f=[];function p(){return h!==c.SyncerState.PAUSED&&h!==c.SyncerState.SYNCED&&f.length+y.size===0}function E(e){void 0!==e&&h!==e&&(h=e,i.postSyncStateMessage(f.length,h))}function S(e,t){if(s.instanceOfSyncerError(e)&&e.needsReAuth)return i.postTokenRequestMessage(),void(l=void 0);{let n=s.instanceOfSyncerError(e)?e:new r.SyncerError(e.message,"Unknown Error",!1);n.payload.pause&&E(c.SyncerState.PAUSED),postMessage({id:t,error:n.payload})}}function T(){return o(this,void 0,void 0,(function*(){for(;0!==f.length&&l&&h!==c.SyncerState.PAUSED;){E(c.SyncerState.UPLOADING);let{id:e,task:t}=f[0],n=yield t.work(l);postMessage({id:e,payload:n}),f.shift()}}))}function _(){if(0!==y.size&&l&&h!==c.SyncerState.PAUSED){E(c.SyncerState.DOWNLOADING);for(let[e,t]of y.entries())t.work(l).then(t=>postMessage({id:e,payload:t})).catch(t=>S(t,e)).finally(()=>y.delete(e))}}function v(e){return new Promise(t=>setTimeout(t,e))}!function(){o(this,void 0,void 0,(function*(){for(;;){yield v(250),p()&&E(c.SyncerState.SYNCED);try{_(),yield T()}catch(e){S(e)}}}))}(),onmessage=e=>function(e){const{id:t,payload:n}=e.data;switch(n.type){case c.SyncerPayloadType.TEST_MODE_UPDATE:return d=n.testMode,void(d!==c.TestMode.OFF&&(l="mock"));case c.SyncerPayloadType.AUTH_UPDATE:return void(l=n.token);case c.SyncerPayloadType.UNPAUSE:return void E(c.SyncerState.PAUSED)}let o=u.createTask(n,d);if(void 0===o)return;o.async?y.set(t,o):f.push({id:t,task:o})}(e)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.instanceOfSyncerError=function(e){return"needsReAuth"in e}},function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function a(e){try{c(o.next(e))}catch(e){r(e)}}function i(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(6),r=n(4),a=n(0);t.createGetRowsTask=function(e,t){return t===a.TestMode.OFF?new i(e):new c(e,t)};class i extends r.BaseTask{constructor(e){super(e),this.async=!0}work(e){return o(this,void 0,void 0,(function*(){let t=this.payload.sheetTitle+"!A:A",n=`https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}/values/${t}`,o={method:"GET",cache:"no-cache",headers:{Authorization:"Bearer "+e}},r=yield fetch(n,o);if(!r.ok){let e=yield r.json();throw new s.SyncerError(JSON.stringify(e),"Failed to get sheet rows: "+t,401===r.status)}{let e=yield r.json();this.payload.rows=e.values?e.values.map(e=>e[0]):[]}return this.payload}))}}t.GetRowsTask=i;class c extends r.BaseTask{constructor(e,t){super(e,t),this.async=!0}work(e){return o(this,void 0,void 0,(function*(){if(this.testMode===a.TestMode.FAIL_GET_RANGE)throw new Error("mock fail");return this.testMode===a.TestMode.RETURN_ROWS&&(this.payload.rows=["aaa","bbb","ccc","@tag","@key:value"]),this.payload}))}}t.MockGetRowsTask=c},function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function a(e){try{c(o.next(e))}catch(e){r(e)}}function i(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(6),r=n(4),a=n(0);t.createGetSheetsTask=function(e,t){return t===a.TestMode.OFF?new i(e):void 0};class i extends r.BaseTask{constructor(e){super(e),this.async=!0}work(e){return o(this,void 0,void 0,(function*(){let t="https://sheets.googleapis.com/v4/spreadsheets/"+this.payload.spreadsheetId,n={method:"GET",cache:"no-cache",headers:{Authorization:"Bearer "+e}},o=yield fetch(t,n);if(!o.ok){let e=yield o.json();throw new s.SyncerError(JSON.stringify(e),"Failed to get spreadsheet details for spreadsheet: "+this.payload.spreadsheetId,401===o.status)}{let e=yield o.json();this.payload.sheets=e.sheets?e.sheets:[]}return this.payload}))}}t.GetSheetsTask=i},function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function a(e){try{c(o.next(e))}catch(e){r(e)}}function i(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(6),r=n(4),a=n(0),i=n(14);t.createUpdateRowTask=function(e,t){return t===a.TestMode.OFF?new c(e):void 0};class c extends r.BaseTask{constructor(e){super(e)}work(e){return o(this,void 0,void 0,(function*(){let t=`${this.payload.sheetTitle}!A${this.payload.idx+1}:A${this.payload.idx+1}`,n=new URL(`https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}/values/${t}`),o={Authorization:"Bearer "+e},r={valueInputOption:"RAW"};Object.keys(r).forEach(e=>n.searchParams.append(e,r[e]));let c={method:"PUT",cache:"no-cache",headers:o,body:JSON.stringify({range:t,majorDimension:"ROWS",values:[[this.payload.content]]})},d=yield fetch(n.toString(),c),u=yield d.json();if(!d.ok){if(u.error.message.includes("exceeds grid limits")){let o={type:a.SyncerPayloadType.EXTEND_SHEET,spreadsheetId:this.payload.spreadsheetId,sheetId:this.payload.sheetId};if(yield new i.ExtendSheetTask(o).work(e),(yield fetch(n.toString(),c)).ok)return this.payload;{let e=yield d.json();throw new s.SyncerError(JSON.stringify(e),"Failed to update row: "+t,401===d.status)}}throw new s.SyncerError(JSON.stringify(u),"Failed to update row: "+t,401===d.status)}return this.payload}))}}t.UpdateRowTask=c},function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function a(e){try{c(o.next(e))}catch(e){r(e)}}function i(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(6),r=n(4),a=n(0);t.createDeleteRowTask=function(e,t){return t===a.TestMode.OFF?new i(e):void 0};class i extends r.BaseTask{constructor(e){super(e)}work(e){return o(this,void 0,void 0,(function*(){let t={sheetId:this.payload.sheetId,startRowIndex:this.payload.idx,endRowIndex:this.payload.idx+1,startColumnIndex:0},n=new URL(`https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}:batchUpdate`),o={method:"POST",cache:"no-cache",headers:{Authorization:"Bearer "+e},body:JSON.stringify({requests:[{deleteRange:{range:t,shiftDimension:"ROWS"}}]})},r=yield fetch(n.toString(),o);if(!r.ok){let e=yield r.json();throw new s.SyncerError(JSON.stringify(e),"Failed to delete row: "+this.payload.idx,401===r.status)}return this.payload}))}}t.DeleteRowTask=i},function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function a(e){try{c(o.next(e))}catch(e){r(e)}}function i(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(4),r=n(0);t.createGetSpreadsheetTask=function(e,t){return t===r.TestMode.OFF?new a(e):void 0};class a extends s.BaseTask{constructor(e){super(e),this.async=!0}work(e){return o(this,void 0,void 0,(function*(){let t="https://sheets.googleapis.com/v4/spreadsheets/"+this.payload.spreadsheetId,n={method:"GET",cache:"no-cache",headers:{Authorization:"Bearer "+e}},o=yield fetch(t,n);if(!o.ok){let e=yield o.json();throw new r.SyncerError(JSON.stringify(e),"Error: Could not download spreadsheet.",401===o.status,!1)}return this.payload.spreadsheet=yield o.json(),this.payload}))}}t.GetSpreadsheetTask=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(0);t.postSyncStateMessage=function(e,t){var n;n={length:e,state:t,type:o.SyncerPayloadType.SYNC_STATE},postMessage({payload:n})},t.postTokenRequestMessage=function(){postMessage({type:o.SyncerPayloadType.TOKEN_REQUEST})}}]);
//# sourceMappingURL=syncWebWorker.js.map