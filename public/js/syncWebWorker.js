!function(e){var t={};function n(o){if(t[o])return t[o].exports;var s=t[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(o,s,function(t){return e[t]}.bind(null,s));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=57)}({1:function(e,t,n){"use strict";function o(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),o(n(11)),o(n(12)),o(n(13)),o(n(14))},11:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(1);class s extends Error{constructor(e,t,n,s){super(e),this.friendlyMsg=t,this.needsReAuth=n,this.payload={pause:void 0===s||s,error:this,friendlyMsg:this.friendlyMsg,type:o.SyncerPayloadType.ERROR}}}t.SyncerError=s},12:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.NONE=0]="NONE",e[e.AND=1]="AND",e[e.OR=2]="OR"}(t.SearchType||(t.SearchType={}))},13:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.OFF="0",e.WORKING="1",e.FAIL_GET_SPREADSHEET_SHEETS="2",e.FAIL_GET_RANGE="3",e.FAIL_UPDATE_RANGE="4",e.FAIL_DELETE_ROW="5",e.RETURN_ROWS="6",e.DEMO="DEMO-MODE"}(t.TestMode||(t.TestMode={}))},14:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.AUTH_UPDATE=0]="AUTH_UPDATE",e[e.DELETE_ROW=1]="DELETE_ROW",e[e.UPDATE_ROW=2]="UPDATE_ROW",e[e.GET_ROWS=3]="GET_ROWS",e[e.TEST_MODE_UPDATE=4]="TEST_MODE_UPDATE",e[e.UNPAUSE=5]="UNPAUSE",e[e.GET_SPREADSHEET=6]="GET_SPREADSHEET",e[e.EXTEND_SHEET=7]="EXTEND_SHEET",e[e.CREATE_ROW=8]="CREATE_ROW",e[e.MOVE_ROW=9]="MOVE_ROW",e[e.ERROR=10]="ERROR",e[e.TOKEN_REQUEST=11]="TOKEN_REQUEST",e[e.SYNC_STATE=12]="SYNC_STATE"}(t.SyncerPayloadType||(t.SyncerPayloadType={})),function(e){e[e.SYNCER_STATE=0]="SYNCER_STATE",e[e.ERROR=1]="ERROR",e[e.REAUTH=2]="REAUTH"}(t.SyncerResponseType||(t.SyncerResponseType={})),function(e){e.PAUSED="cloud_off",e.UPLOADING="cloud_upload",e.DOWNLOADING="cloud_download",e.SYNCED="cloud_done",e.INITIALIZING="cloud_queue"}(t.SyncerState||(t.SyncerState={}))},19:function(e,t,n){"use strict";function o(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),o(n(5)),o(n(59)),o(n(60)),o(n(61)),o(n(20)),o(n(62))},20:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function a(e){try{c(o.next(e))}catch(e){r(e)}}function i(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(6),r=n(5);class a extends r.BaseTask{constructor(e){super(e),this.async=!0}work(e){return o(this,void 0,void 0,(function*(){let t=new URL(`https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}:batchUpdate`),n={method:"POST",mode:"cors",cache:"no-cache",headers:{Authorization:"Bearer "+e},body:JSON.stringify({requests:[{appendDimension:{sheetId:this.payload.sheetId,dimension:"ROWS",length:100}}]})},o=yield fetch(t.toString(),n);if(!o.ok){let e=yield o.json();throw new s.SyncerError(JSON.stringify(e),"Failed to extend sheet",401===o.status)}return this.payload}))}}t.ExtendSheetTask=a},5:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(1),s=n(19);t.TaskFactory=class{createTask(e,t){switch(e.type){case o.SyncerPayloadType.GET_ROWS:return s.createGetRowsTask(e,t);case o.SyncerPayloadType.GET_SPREADSHEET:return s.createGetSpreadsheetTask(e,t);case o.SyncerPayloadType.DELETE_ROW:return s.createDeleteRowTask(e,t);case o.SyncerPayloadType.UPDATE_ROW:return s.createUpdateRowTask(e,t);default:return}}};t.BaseTask=class{constructor(e,t){this.testMode=o.TestMode.OFF,this.payload=e,this.testMode=void 0!==t?t:this.testMode}}},57:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function a(e){try{c(o.next(e))}catch(e){r(e)}}function i(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(6),r=n(1),a=n(19),i=n(63),c=n(1);let d=0;let u=c.TestMode.OFF;const l=new a.TaskFactory;let h=void 0,y=c.SyncerState.SYNCED;const p=new Map,f=[];function E(){return y!==c.SyncerState.PAUSED&&y!==c.SyncerState.SYNCED&&f.length+p.size+d===0}function T(e){void 0!==e&&y!==e&&(y=e,i.postSyncStateMessage(f.length,y))}function S(e,t){if(s.instanceOfSyncerError(e)&&e.needsReAuth)return i.postTokenRequestMessage(),void(h=void 0);{let n=s.instanceOfSyncerError(e)?e:new r.SyncerError(e.message,"Unknown Error",!1);n.payload.pause&&T(c.SyncerState.PAUSED),postMessage({id:t,error:n.payload})}}function _(){return o(this,void 0,void 0,(function*(){for(;0!==f.length&&h&&y!==c.SyncerState.PAUSED;){T(c.SyncerState.UPLOADING);let{id:e,task:t}=f[0],n=yield t.work(h);postMessage({id:e,payload:n}),f.shift()}}))}function w(){if(0!==p.size&&h&&y!==c.SyncerState.PAUSED){T(c.SyncerState.DOWNLOADING);for(let[e,t]of p.entries())d+=1,p.delete(e),t.work(h).then(t=>postMessage({id:e,payload:t})).catch(t=>S(t,e)).finally(()=>d-=1)}}function O(e){return new Promise(t=>setTimeout(t,e))}!function(){o(this,void 0,void 0,(function*(){for(;;){yield O(250),E()&&T(c.SyncerState.SYNCED);try{w(),yield _()}catch(e){S(e)}}}))}(),onmessage=e=>function(e){const{id:t,payload:n}=e.data;switch(n.type){case c.SyncerPayloadType.TEST_MODE_UPDATE:return console.log(n),u=n.testMode,void(u!==c.TestMode.OFF&&(h="mock"));case c.SyncerPayloadType.AUTH_UPDATE:return void(h=n.token);case c.SyncerPayloadType.UNPAUSE:return void T(c.SyncerState.PAUSED)}let o=l.createTask(n,u);if(void 0===o)return;o.async?p.set(t,o):f.push({id:t,task:o})}(e)},58:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.instanceOfSyncerError=function(e){return"needsReAuth"in e}},59:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function a(e){try{c(o.next(e))}catch(e){r(e)}}function i(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(6),r=n(5),a=n(1);t.createGetRowsTask=function(e,t){return t===a.TestMode.OFF?new i(e):new c(e,t)};class i extends r.BaseTask{constructor(e){super(e),this.async=!0}work(e){return o(this,void 0,void 0,(function*(){let t=this.payload.sheetTitle+"!A:A",n=`https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}/values/${t}`,o={method:"GET",cache:"no-cache",headers:{Authorization:"Bearer "+e}},r=yield fetch(n,o);if(!r.ok){let e=yield r.json();throw new s.SyncerError(JSON.stringify(e),"Failed to get sheet rows: "+t,401===r.status)}{let e=yield r.json();this.payload.rows=e.values?e.values.map(e=>e[0]):[]}return this.payload}))}}t.GetRowsTask=i;class c extends r.BaseTask{constructor(e,t){super(e,t),this.async=!0}work(e){return o(this,void 0,void 0,(function*(){if(this.testMode===a.TestMode.FAIL_GET_RANGE)throw new Error("mock fail");return this.testMode===a.TestMode.RETURN_ROWS&&(this.payload.rows=["aaa","bbb","ccc","@tag","@key:value"]),this.payload}))}}t.MockGetRowsTask=c},6:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(58));class o extends Error{constructor(e,t,n){super(e),this.friendlyMsg=t,this.needsReAuth=n}}t.SyncerError=o},60:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function a(e){try{c(o.next(e))}catch(e){r(e)}}function i(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(6),r=n(5),a=n(1),i=n(20);t.createUpdateRowTask=function(e,t){return t===a.TestMode.OFF?new c(e):new d(e,t)};class c extends r.BaseTask{constructor(e){super(e)}work(e){return o(this,void 0,void 0,(function*(){let t=`${this.payload.sheetTitle}!A${this.payload.idx+1}:A${this.payload.idx+1}`,n=new URL(`https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}/values/${t}`),o={Authorization:"Bearer "+e},r={valueInputOption:"RAW"};Object.keys(r).forEach(e=>n.searchParams.append(e,r[e]));let c={method:"PUT",cache:"no-cache",headers:o,body:JSON.stringify({range:t,majorDimension:"ROWS",values:[[this.payload.content]]})},d=yield fetch(n.toString(),c),u=yield d.json();if(!d.ok){if(u.error.message.includes("exceeds grid limits")){let o={type:a.SyncerPayloadType.EXTEND_SHEET,spreadsheetId:this.payload.spreadsheetId,sheetId:this.payload.sheetId};if(yield new i.ExtendSheetTask(o).work(e),(yield fetch(n.toString(),c)).ok)return this.payload;{let e=yield d.json();throw new s.SyncerError(JSON.stringify(e),"Failed to update row: "+t,401===d.status)}}throw new s.SyncerError(JSON.stringify(u),"Failed to update row: "+t,401===d.status)}return this.payload}))}}t.UpdateRowTask=c;class d extends r.BaseTask{constructor(e,t){super(e,t),this.async=!0}work(){return o(this,void 0,void 0,(function*(){if(this.testMode===a.TestMode.FAIL_UPDATE_RANGE)throw new Error("mock fail");return this.payload}))}}t.MockUpdateRowTask=d},61:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function a(e){try{c(o.next(e))}catch(e){r(e)}}function i(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(6),r=n(5),a=n(1);t.createDeleteRowTask=function(e,t){return t===a.TestMode.OFF?new i(e):new c(e,t)};class i extends r.BaseTask{constructor(e){super(e),this.async=!0}work(e){return o(this,void 0,void 0,(function*(){let t={sheetId:this.payload.sheetId,startRowIndex:this.payload.idx,endRowIndex:this.payload.idx+1,startColumnIndex:0},n=new URL(`https://sheets.googleapis.com/v4/spreadsheets/${this.payload.spreadsheetId}:batchUpdate`),o={method:"POST",cache:"no-cache",headers:{Authorization:"Bearer "+e},body:JSON.stringify({requests:[{deleteRange:{range:t,shiftDimension:"ROWS"}}]})},r=yield fetch(n.toString(),o);if(!r.ok){let e=yield r.json();throw new s.SyncerError(JSON.stringify(e),"Failed to delete row: "+this.payload.idx,401===r.status)}return this.payload}))}}t.DeleteRowTask=i;class c extends r.BaseTask{constructor(e,t){super(e,t),this.async=!0}work(e){return o(this,void 0,void 0,(function*(){if(this.testMode===a.TestMode.FAIL_DELETE_ROW)throw new Error("mock fail");return this.payload}))}}t.MockDeleteRowTask=c},62:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function a(e){try{c(o.next(e))}catch(e){r(e)}}function i(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(5),r=n(1);t.createGetSpreadsheetTask=function(e,t){return t===r.TestMode.OFF?new a(e):new i(e,t)};class a extends s.BaseTask{constructor(e){super(e),this.async=!0}work(e){return o(this,void 0,void 0,(function*(){let t="https://sheets.googleapis.com/v4/spreadsheets/"+this.payload.spreadsheetId,n={method:"GET",cache:"no-cache",headers:{Authorization:"Bearer "+e}},o=yield fetch(t,n);if(!o.ok){let e=yield o.json();throw new r.SyncerError(JSON.stringify(e),"Error: Could not download spreadsheet.",401===o.status,!1)}return this.payload.spreadsheet=yield o.json(),this.payload}))}}t.GetSpreadsheetTask=a;class i extends s.BaseTask{constructor(e,t){super(e,t),this.async=!0}work(e){return o(this,void 0,void 0,(function*(){if(this.testMode===r.TestMode.FAIL_GET_SPREADSHEET_SHEETS)throw new Error("mock fail");return this.payload.spreadsheet={spreadsheetId:this.payload.spreadsheetId,spreadsheetUrl:`https://docs.google.com/spreadsheets/d/${this.payload.spreadsheetId}/edit`,properties:{title:"Mock Journal"},sheets:[{properties:{sheetId:0,title:"Sheet1"}},{properties:{sheetId:1124780423,title:"Sheet2"}},{properties:{sheetId:1286561930,title:"Sheet3"}}]},this.payload}))}}t.MockGetSpreadsheetTask=i},63:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(1);t.postSyncStateMessage=function(e,t){var n;n={length:e,state:t,type:o.SyncerPayloadType.SYNC_STATE},postMessage({payload:n})},t.postTokenRequestMessage=function(){postMessage({type:o.SyncerPayloadType.TOKEN_REQUEST})}}});
//# sourceMappingURL=syncWebWorker.js.map