!function(e){var t={};function s(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=t,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(r,n,function(t){return e[t]}.bind(null,n));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}([function(e,t,s){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(s(1)),i=s(2),a=s(4),o=s(27),u=s(36);t.serviceWorker=new a.ServiceWorker,t.testMode=i.getTestMode(),t.syncer=new a.Syncer(t.testMode),t.search=new a.Search,t.refines=new u.Refines,t.journal=new a.Journal,null!==document.getElementById("dntd")&&n.default.mount(document.getElementById("dntd"),(function(){return{view:function(){return[n.default(o.spinner),n.default(o.googleAPI),n.default("#errorsWrap",n.default(o.errors)),t.journal.isActive?[n.default("#searchWrap",[n.default(o.searchbar),n.default(o.toggles)]),n.default(o.refinesPane),n.default("#entriesWrap",{class:t.journal.hideTagRefines?"fullWidth":""},[n.default(o.entries),n.default(o.compose)])]:[]]}}}))},function(e,t){e.exports=m},function(e,t,s){"use strict";function r(e){for(var s in e)t.hasOwnProperty(s)||(t[s]=e[s])}Object.defineProperty(t,"__esModule",{value:!0}),r(s(14)),r(s(15)),r(s(16)),r(s(17)),r(s(18)),r(s(19))},function(e,t,s){"use strict";function r(e){for(var s in e)t.hasOwnProperty(s)||(t[s]=e[s])}Object.defineProperty(t,"__esModule",{value:!0}),r(s(5)),r(s(6)),r(s(7)),r(s(8))},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(12);t.Tag=r.Tag;var n=s(20);t.Entry=n.Entry;var i=s(21);t.Sheet=i.Sheet;var a=s(22);t.Syncer=a.Syncer;var o=s(23);t.Search=o.Search;var u=s(24);t.Journal=u.Journal;var l=s(25);t.Spreadsheet=l.Spreadsheet;var d=s(26);t.ServiceWorker=d.ServiceWorker},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.NONE=0]="NONE",e[e.AND=1]="AND",e[e.OR=2]="OR"}(t.SearchType||(t.SearchType={}))},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.OFF="0",e.WORKING="1",e.FAIL_GET_SPREADSHEET_SHEETS="2",e.FAIL_GET_RANGE="3",e.FAIL_UPDATE_RANGE="4",e.FAIL_DELETE_ROW="5",e.RETURN_ROWS="6",e.DEMO="7"}(t.TestMode||(t.TestMode={}))},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.AUTH_UPDATE=0]="AUTH_UPDATE",e[e.DELETE_ROW=1]="DELETE_ROW",e[e.UPDATE_ROW=2]="UPDATE_ROW",e[e.GET_ROWS=3]="GET_ROWS",e[e.GET_SHEETS=4]="GET_SHEETS",e[e.TEST_MODE_UPDATE=5]="TEST_MODE_UPDATE",e[e.UNPAUSE=6]="UNPAUSE"}(t.SyncerTaskType||(t.SyncerTaskType={}))},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.ROWS=0]="ROWS",e[e.SHEETS=1]="SHEETS",e[e.SYNCER_STATE=2]="SYNCER_STATE",e[e.ERROR=3]="ERROR",e[e.REAUTH=4]="REAUTH"}(t.SyncerResponseType||(t.SyncerResponseType={})),function(e){e.PAUSED="cloud_off",e.UPLOADING="cloud_upload",e.DOWNLOADING="cloud_download",e.SYNCED="cloud_done"}(t.SyncerState||(t.SyncerState={}))},function(e,t,s){"use strict";function r(e){for(var s in e)t.hasOwnProperty(s)||(t[s]=e[s])}Object.defineProperty(t,"__esModule",{value:!0}),r(s(10)),r(s(11))},function(e,t,s){"use strict";var r=this&&this.__awaiter||function(e,t,s,r){return new(s||(s=Promise))((function(n,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function o(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(a,o)}u((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});t.MockGapi=class{constructor(){this.auth2=new n}load(e,t){t()}};class n{getAuthInstance(){return new o}init(e){return r(this,void 0,void 0,(function*(){}))}}class i{get(){return new a}}class a{getAuthResponse(){return{expires_in:9999,access_token:"faketoken"}}reloadAuthResponse(){return r(this,void 0,void 0,(function*(){return{expires_in:9999,access_token:"faketoken"}}))}}t.MockGoogleUser=a;class o{constructor(){this.isSignedIn=new u,this.currentUser=new i}signOut(){}signIn(){}}class u{constructor(){this.listen=e=>{},this.get=()=>!0}}},function(e,t,s){"use strict";var r=this&&this.__awaiter||function(e,t,s,r){return new(s||(s=Promise))((function(n,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function o(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(a,o)}u((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const n=s(3);t.SyncerTasksMock=class{constructor(e){this.testMode=e,this.extendSheetLength=100}getSheets(e,t){return r(this,void 0,void 0,(function*(){if(this.testMode===n.TestMode.FAIL_GET_SPREADSHEET_SHEETS)throw new Error("mock fail");return[{properties:{sheetId:0,title:"Sheet1",index:0,sheetType:"GRID",gridProperties:{rowCount:100,columnCount:26}}},{properties:{sheetId:1,title:"Sheet2",index:0,sheetType:"GRID",gridProperties:{rowCount:100,columnCount:26}}}]}))}getRows(e,t){return r(this,void 0,void 0,(function*(){if(this.testMode===n.TestMode.FAIL_GET_RANGE)throw new Error("mock fail");return this.testMode===n.TestMode.RETURN_ROWS?["aaa","bbb","ccc","@tag","@key:value"]:[]}))}updateRow(e,t){return r(this,void 0,void 0,(function*(){if(this.testMode===n.TestMode.FAIL_UPDATE_RANGE)throw new Error("mock fail")}))}deleteRow(e,t){return r(this,void 0,void 0,(function*(){if(this.testMode===n.TestMode.FAIL_DELETE_ROW)throw new Error("mock fail")}))}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=s(2);t.Tag=class{constructor(e,t,s,r,n){this.frq=1,this.raw=e,this.flag=t,this.key=s,this.separator=void 0!==r?r:null,this.val=void 0!==n?n:null,this.clean=this.cleanTagString(this.raw),this.cleanKey=this.cleanTagString(this.key),this.cleanVal=null!==this.val?this.cleanTagString(this.val):null}renderKey(){return"<span onclick=\"tagOnClick(event, '"+this.flag+this.cleanKey+(this.separator?this.separator:"")+'\')" class="'+(this.separator?"tagKey":null===this.val?"simpleTag":"roundTagVal")+'">'+this.flag+this.key+"</span>"}renderVal(e){var t;return"<span onclick=\"tagOnClick(event, '"+this.flag+this.cleanKey+this.separator+(null===(t=this.cleanVal)||void 0===t?void 0:t.replace(/'/,"\\'"))+'\')" class="'+(e?"roundTagVal":"tagVal")+'">'+(e?"":this.separator)+(this.val||"")+"</span>"}render(e){return this.separator?e?this.renderVal(e):this.renderKey()+this.renderVal(e):this.renderKey()}cleanTagString(e){return e=(e=(e=r.escapeHtml(e)).endsWith("'s")?e.substring(0,e.length-2):e).toLowerCase()}}},,function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=s(3);t.getTestMode=function(){let e=new URL(window.location.href);if("/demo"===e.pathname)return r.TestMode.DEMO;let t=e.searchParams.get("test");return null!==t&&(s=t,Object.values(r.TestMode).includes(s))?t:r.TestMode.OFF;var s}},function(e,t,s){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(s(1)),i=s(0);class a extends Error{constructor(e,t){super(e),this.friendlyMsg=t,i.journal.errors.push(t),console.warn(e),n.default.redraw()}}t.FriendlyError=a},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.escapeHtml=function(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getCaretPosition=function(e){var t=window.getSelection(),s=[0,0];if(t.anchorNode==e)s=[t.anchorNode.innerText.length,t.extentNode.innerText.length];else{var r=[t.anchorNode,t.extentNode];if(!e.contains(t.anchorNode)||!e.contains(t.extentNode))return;var n,i=[0,0];!function e(t,s){var r=s(t);for(t=t.firstChild;!1!==r&&t;t=t.nextSibling)r=e(t,s)}(e,(function(e){for(n=0;n<2;n++)if(e==r[n]&&(i[n]=1,i[0==n?1:0]))return;if(e.textContent&&!e.firstChild)for(n=0;n<2;n++)i[n]||(s[n]+=e.textContent.length)})),s[0]+=t.anchorOffset,s[1]+=t.extentOffset}return s[0]<=s[1]?s:[s[1],s[0]]},t.setCaretPosition=function e(t,s){if(null!==t&&null!==s){for(var r of t.childNodes)if(3==r.nodeType){if(r.length>=s){let e=document.createRange(),t=window.getSelection();return e.setStart(r,s),e.collapse(!0),t.removeAllRanges(),t.addRange(e),-1}s-=r.length}else if(-1==(s=e(r,s)))return-1;return s}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.tagPattern=/(\@)([\w-']+)+(:)?([\w-'\*]+)?/g,t.spreadsheetIdPattern=/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/g},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.setStoredSpreadsheetId=function(e){localStorage.setItem("spreadsheetId",e)},t.getStoredSpreadsheetId=function(){return localStorage.getItem("spreadsheetId")||void 0},t.setStoredSpreadsheetUrls=function(e){localStorage.setItem("spreadsheetUrls",e)},t.getStoredSpreadsheetUrls=function(){return localStorage.getItem("spreadsheetUrls")||void 0},t.setStoredHideEntriesKeys=function(e){localStorage.setItem("hideEntriesKeys",e?"1":"0")},t.getStoredHideEntriesKeys=function(){return"1"===localStorage.getItem("hideEntriesKeys")},t.setStoredHideTagRefines=function(e){localStorage.setItem("hideTagRefines",e?"1":"0")},t.getStoredHideTagRefines=function(){return"1"===localStorage.getItem("hideTagRefines")},t.getStoredSpreadsheetSheetId=function(e){let t=localStorage.getItem(e+"-sheetId")||void 0;return void 0!==t?parseInt(t):void 0},t.setStoredSpreadsheetSheetId=function(e,t){localStorage.setItem(e+"-sheetId",t.toString())},t.delStoredSpreadsheetSheetId=function(e){localStorage.removeItem(e+"-sheetId")}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=s(12),n=s(2);t.Entry=class{constructor(e,t){this.tags=new Map,this.hovered=!1,this.focused=!1,this.clean="",this.tokens=[],this.rendered="",this.savedClean="",this.tagMatches=[],this.readableRendered="",this.rawText="",this.savedText="",this.raw=e||"",this.saved=void 0!==t?t:this.raw}get saved(){return this.savedText}set saved(e){this.savedText=e,this.savedClean=e.toLowerCase(),this.tags=this.getTags(this.tagMatches)}get raw(){return this.rawText}set raw(e){this.rawText=e,this.clean=this.raw.toLowerCase();let t=n.escapeHtml(this.rawText);this.tokens=this.getTokens(this.clean),this.tagMatches=this.getTagMatches(t),this.rendered=this.render(t,this.tagMatches),this.readableRendered=this.render(t,this.tagMatches,!0)}render(e,t,s){for(let{tag:r,match:n}of t){let t=e.split("");t.splice(n.index,n[0].length,r.render(s)),e=t.join("")}return e}getTags(e){let t=new Map;for(let{tag:s}of e)t.has(s.clean)?t.get(s.clean).frq+=1:t.set(s.clean,s);return t}getTagMatches(e){let t=[],s=e.matchAll(n.tagPattern);for(let e of s){let s=new r.Tag(e[0],e[1],e[2],e[3],e[4]);t.push({tag:s,match:e})}return t.sort((e,t)=>e.match.index>t.match.index?-1:1),t}getTokens(e){return e.split(" ").filter(e=>void 0!==e&&""!==e.trim()&&"-"!==e)}}},function(e,t,s){"use strict";var r=this&&this.__awaiter||function(e,t,s,r){return new(s||(s=Promise))((function(n,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function o(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(a,o)}u((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const n=s(4),i=s(0);t.Sheet=class{constructor(e,t,s){this.entries=[],this.id=e,this.title=t,this.spreadsheet=s,s.sheets.set(this.id,this),i.syncer.getRows(this.spreadsheet.id,this.id,this.title)}load(e){return r(this,void 0,void 0,(function*(){e.map(e=>this.entries.push(new n.Entry(e))),i.journal.switch(),null!==i.journal.spreadsheet&&null!==i.journal.spreadsheet.sheet&&i.journal.spreadsheet.sheet.id===this.id&&i.refines.build()}))}get tags(){let e=new Map;for(let t of Array.from(this.entries.values()).reverse())for(let[s,r]of t.tags)e.has(s)?e.get(s).frq+=r.frq:e.set(s,new n.Tag(r.raw,r.flag,r.key,r.separator,r.val));return e}}},function(e,t,s){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(s(1)),i=s(0),a=s(2),o=s(3);t.Syncer=class{constructor(e){this.state=o.SyncerState.DOWNLOADING,this.user=null,this.worker=new Worker("./js/syncWebWorker.js"),this.updateTestMode(e),this.worker.onmessage=e=>this.onMessage(e)}updateTestMode(e){this.pushSyncerTask({testMode:e,type:o.SyncerTaskType.TEST_MODE_UPDATE})}updateAuth(e){this.pushSyncerTask({token:e,type:o.SyncerTaskType.AUTH_UPDATE})}getSheets(e){this.pushSyncerTask({spreadsheetId:e,type:o.SyncerTaskType.GET_SHEETS})}getRows(e,t,s){this.pushSyncerTask({spreadsheetId:e,sheetId:t,sheetTitle:s,type:o.SyncerTaskType.GET_ROWS})}deleteRow(e,t,s){this.pushSyncerTask({idx:e,spreadsheetId:t,sheetId:s,type:o.SyncerTaskType.DELETE_ROW})}updateRow(e,t,s,r,n){this.pushSyncerTask({idx:e,spreadsheetId:t,sheetId:s,sheetTitle:r,content:n,type:o.SyncerTaskType.UPDATE_ROW})}unpause(){this.pushSyncerTask({type:o.SyncerTaskType.UNPAUSE})}pushSyncerTask(e){this.worker.postMessage(e)}onMessage(e){let t=e.data;switch(t.type){case o.SyncerResponseType.SYNCER_STATE:t.state!==i.syncer.state&&(i.syncer.state=t.state,n.default.redraw());break;case o.SyncerResponseType.SHEETS:i.journal.spreadsheets.has(t.spreadsheetId)&&i.journal.spreadsheets.get(t.spreadsheetId).load(t.sheets);break;case o.SyncerResponseType.ROWS:i.journal.spreadsheets.has(t.spreadsheetId)&&i.journal.spreadsheets.get(t.spreadsheetId).sheets.has(t.sheetId)&&i.journal.spreadsheets.get(t.spreadsheetId).sheets.get(t.sheetId).load(t.rows);break;case o.SyncerResponseType.ERROR:new a.FriendlyError(t.error.message,"Sync Error - "+t.friendlyMsg);break;case o.SyncerResponseType.REAUTH:null!==i.syncer.user&&i.syncer.user.reloadAuthResponse().then(e=>{i.syncer.updateAuth(e.access_token)}).catch(e=>{new a.FriendlyError(e,"You're signed out and need to sign back in.")})}}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=s(0),n=s(4),i=s(3);t.Search=class{constructor(){this.barQuery=new n.Entry(""),this.searchType=i.SearchType.NONE,this.refinesQuery={keys:new Set,vals:new Map,simpleKeys:new Map}}get query(){return new n.Entry([this.barQuery.raw,...Array.from(this.refinesQuery.keys.values()),...Array.from(this.refinesQuery.vals.keys()),...Array.from(this.refinesQuery.simpleKeys.keys())].join(" "))}reset(){this.barQuery=new n.Entry(""),this.searchType=i.SearchType.NONE,this.refinesQuery={keys:new Set,vals:new Map,simpleKeys:new Map}}entries(){let e=null;return 0===this.query.tokens.length?this.searchType=i.SearchType.NONE:(this.searchType=i.SearchType.AND,e=this.search(),0===e.length&&(this.searchType=i.SearchType.OR,e=this.search())),e}search(){let e=this.query,t=[],s=r.journal.spreadsheet.sheet.entries;for(let[r,n]of s.entries())switch(this.searchType){case i.SearchType.AND:e.tokens.every(e=>this.match(e,n))&&t.push({idx:r,entry:n});break;case i.SearchType.OR:e.tokens.some(e=>this.match(e,n))&&t.push({idx:r,entry:n})}return t}match(e,t){return e.startsWith("-@")&&!e.endsWith(":")?void 0===t.tags.get(e.substring(1)):e.startsWith("-")?!t.savedClean.includes(e.substring(1)):e.startsWith("@")&&!e.endsWith(":")?void 0!==t.tags.get(e):t.savedClean.includes(e)}}},function(e,t,s){"use strict";var r=this&&this.__awaiter||function(e,t,s,r){return new(s||(s=Promise))((function(n,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function o(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(a,o)}u((r=r.apply(e,t||[])).next())}))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(s(1)),a=s(4),o=s(0),u=s(2);t.Journal=class{constructor(){this.errors=[],this.isSignedIn=!1,this.entryInFocus=!1,this.hideTagRefines=!1,this.hideEntriesKeys=!1,this.spreadsheet=null,this.showAddSpreadsheetTextbox=!1,this.spreadsheets=new Map}load(e){return r(this,void 0,void 0,(function*(){this.hideTagRefines=u.getStoredHideTagRefines(),this.hideEntriesKeys=u.getStoredHideEntriesKeys();let t=this.getSpreadsheetIdsFromUrls(e);yield this.loadNewSpreadsheets(t),yield this.removeOldSpreadsheets(t)}))}unload(){this.removeOldSpreadsheets([]),this.errors=[],this.isSignedIn=!1,this.entryInFocus=!1,this.hideTagRefines=!1,this.hideEntriesKeys=!1,this.spreadsheet=null,this.showAddSpreadsheetTextbox=!1,this.spreadsheets=new Map}get isActive(){return null!==this.spreadsheet&&null!==this.spreadsheet.sheet&&this.isSignedIn}switch(e,t){var s,r,n;void 0!==e&&void 0!==t&&(null===(s=this.spreadsheet)||void 0===s?void 0:s.id)===e&&(null===(n=null===(r=this.spreadsheet)||void 0===r?void 0:r.sheet)||void 0===n?void 0:n.id)===t||(void 0===e&&void 0===t&&(e=u.getStoredSpreadsheetId(),t=u.getStoredSpreadsheetSheetId(e)),o.search.reset(),this.spreadsheet=void 0!==e&&this.spreadsheets.has(e)?this.spreadsheets.get(e):Array.from(this.spreadsheets.values())[0]||null,null!==this.spreadsheet&&(u.setStoredSpreadsheetId(this.spreadsheet.id),this.spreadsheet.sheet=void 0!==t&&this.spreadsheet.sheets.has(t)?this.spreadsheet.sheets.get(t):Array.from(this.spreadsheet.sheets.values())[0]||null,null!==this.spreadsheet.sheet&&u.setStoredSpreadsheetSheetId(this.spreadsheet.id,this.spreadsheet.sheet.id)),i.default.redraw())}loadNewSpreadsheets(e){return r(this,void 0,void 0,(function*(){for(let t of e.filter(e=>!this.spreadsheets.get(e)).sort(e=>e===u.getStoredSpreadsheetId()?-1:1))new a.Spreadsheet(t)}))}removeOldSpreadsheets(e){return r(this,void 0,void 0,(function*(){for(let[t]of Array.from(this.spreadsheets).filter(([t])=>!e.includes(t)))if(u.delStoredSpreadsheetSheetId(t),this.spreadsheet===this.spreadsheets.get(t)&&(this.spreadsheet=null),this.spreadsheets.has(t)){for(let[e]of this.spreadsheets.get(t).sheets)this.spreadsheets.get(t).sheets.delete(e);this.spreadsheets.delete(t)}}))}getSpreadsheetIdsFromUrls(e){if(!e)return[];let t=[],s=e.matchAll(u.spreadsheetIdPattern);for(let e of s)e&&t.push(e[1]);return t}deleteEntry(e){return r(this,void 0,void 0,(function*(){o.syncer.deleteRow(e,this.spreadsheet.id,this.spreadsheet.sheet.id),this.spreadsheet.sheet.entries.splice(e,1)[0],o.refines.build(),i.default.redraw()}))}saveEntry(e){return r(this,void 0,void 0,(function*(){let t=this.spreadsheet.sheet.entries[e];t.raw!==t.saved&&(o.syncer.updateRow(e,this.spreadsheet.id,this.spreadsheet.sheet.id,this.spreadsheet.sheet.title,t.raw),t.saved=t.raw,o.refines.build(),i.default.redraw())}))}}},function(e,t,s){"use strict";var r=this&&this.__awaiter||function(e,t,s,r){return new(s||(s=Promise))((function(n,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function o(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(a,o)}u((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const n=s(4),i=s(0),a=s(2);t.Spreadsheet=class{constructor(e){this.id=e,this.sheet=null,this.sheets=new Map,i.journal.spreadsheets.set(e,this),i.syncer.getSheets(e)}load(e){return r(this,void 0,void 0,(function*(){for(let t of e.sort(e=>{var t;return(null===(t=e.properties)||void 0===t?void 0:t.sheetId)===a.getStoredSpreadsheetSheetId(this.id)?-1:1}))void 0!==t.properties&&void 0!==t.properties.title&&void 0!==t.properties.sheetId&&new n.Sheet(t.properties.sheetId,t.properties.title,this)}))}}},function(e,t,s){"use strict";var r=this&&this.__awaiter||function(e,t,s,r){return new(s||(s=Promise))((function(n,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function o(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(a,o)}u((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const n=s(2);t.ServiceWorker=class{constructor(){if(!("serviceWorker"in navigator))throw new n.FriendlyError("serviceWorker not supported","Your browser is not supported.");window.addEventListener("load",()=>r(this,void 0,void 0,(function*(){yield navigator.serviceWorker.register("../serviceWorker.js")})))}}},function(e,t,s){"use strict";function r(e){for(var s in e)t.hasOwnProperty(s)||(t[s]=e[s])}Object.defineProperty(t,"__esModule",{value:!0}),r(s(28)),r(s(29)),r(s(30)),r(s(31)),r(s(32)),r(s(33)),r(s(34)),r(s(35))},function(e,t,s){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(s(1)),i=s(0);t.errors=function(){function e(e){return{class:"dismissErrorButton",onclick:()=>i.journal.errors.splice(e,1)}}return{view:function(){return 0===i.journal.errors.length?[]:n.default("#errors",i.journal.errors.map((t,s)=>[n.default(".error",[n.default("span",t),n.default("button",e(s),"dismiss")])]))}}}},function(e,t,s){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(s(1)),i=s(0),a=s(3);t.spinner=function(){function e(){if(i.syncer.state===a.SyncerState.PAUSED)return n.default("button",{id:"unpauseSync",onclick:()=>i.syncer.unpause()},"Unpause Syncing")}return{view:function(){return n.default("#status",n.default("span",[n.default("i",{id:"syncState",class:"material-icons material-icons-outlined md-dark"},i.syncer.state),e()]))}}}},function(e,t,s){"use strict";var r=this&&this.__awaiter||function(e,t,s,r){return new(s||(s=Promise))((function(n,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function o(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(a,o)}u((r=r.apply(e,t||[])).next())}))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(s(1)),a=s(0),o=s(4),u=s(2);t.compose=function(){var e={el:null,pos:null};const t=new o.Entry(""),s=new o.Entry(""),n=new o.Entry(""),l={placeholder:"Static Entry Prefix"},d={placeholder:"Entry Content"},c={placeholder:"Static Entry Suffix"};function h(t,n){let l={contenteditable:"true",class:"entry breakwrap column",onkeydown:e=>r(this,void 0,void 0,(function*(){return yield function(e){return r(this,void 0,void 0,(function*(){if(13==e.keyCode&&!e.shiftKey){e.preventDefault();let t=[document.getElementById("prefix"),document.getElementById("content"),document.getElementById("suffix")].map(e=>e.innerText).join("");s.raw="";let r=new o.Entry(t,""),n=a.journal.spreadsheet.sheet.entries.length;a.journal.spreadsheet.sheet.entries.push(r),i.default.redraw(),yield a.journal.saveEntry(n)}}))}(e)})),oninput:s=>function(t,s){let r=u.getCaretPosition(t.target);e=r?{pos:r[1],el:t.target}:{pos:null,el:null},s.raw=t.target.innerText}(s,t),onupdate:()=>(u.setCaretPosition(e.el,e.pos),void(e={el:null,pos:null}))};return Object.assign(l,n)}return{view:function(){return i.default("#compose",[i.default("#prefix",h(t,l),i.default.trust(t.rendered)),i.default("#content",h(s,d),i.default.trust(s.rendered)),i.default("#suffix",h(n,c),i.default.trust(n.rendered))])}}}},function(e,t,s){"use strict";var r=this&&this.__awaiter||function(e,t,s,r){return new(s||(s=Promise))((function(n,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function o(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(a,o)}u((r=r.apply(e,t||[])).next())}))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(s(1)),a=s(0),o=s(2);t.entries=function(){var e={pos:null,el:null};function t(){let e=a.search.entries();return null!==e?e.map(({idx:e,entry:t})=>s(e,t)):Array.from(a.journal.spreadsheet.sheet.entries.entries()).map(([e,t])=>s(e,t))}function s(e,t){return i.default(".entryWrap",{id:"entry-"+e},[u(t,e),n(e)])}function n(e){return i.default("button",{class:"del",onclick:()=>r(this,void 0,void 0,(function*(){return yield a.journal.deleteEntry(e)}))},"del")}function u(t,s){return i.default("div",function(t,s){return{id:`entry-${s}-content`,contenteditable:"true",class:"entry breakwrap column",onkeydown:e=>function(e){13!=e.keyCode||e.shiftKey||(e.preventDefault(),e.target.blur())}(e),oninput:s=>function(t,s){let r=o.getCaretPosition(t.target);e={pos:r?r[1]:null,el:t.target},s.raw=t.target.innerText}(s,t),onupdate:()=>(o.setCaretPosition(e.el,e.pos),void(e={pos:null,el:null})),onblur:()=>function(e,t){return r(this,void 0,void 0,(function*(){e.focused=!1,yield a.journal.saveEntry(t)}))}(t,s),onmouseover:()=>function(e){e.hovered=!0}(t),onmouseout:()=>function(e){e.hovered=!1}(t),onfocus:()=>function(e){e.focused=!0}(t)}}(t,s),i.default.trust(t.hovered||t.focused||!a.journal.hideEntriesKeys?t.rendered:t.readableRendered))}return{view:function(){return i.default("#entries",[i.default(".tempguidancePre","Entries"),t()])}}}},function(e,t,s){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(s(1)),i=s(0),a=s(2);t.toggles=function(){return{view:function(){return[n.default("#hideEntriesKeysToggle",[n.default("label",{for:"hideEntriesCheckbox"},"Tag keys:"),n.default("input#hideEntriesCheckbox",{type:"checkbox",checked:!a.getStoredHideEntriesKeys(),disabled:i.journal.entryInFocus,onclick:()=>{i.journal.hideEntriesKeys=!i.journal.hideEntriesKeys,a.setStoredHideEntriesKeys(i.journal.hideEntriesKeys)}})]),n.default("#hideTagRefinesToggle",[n.default("label",{for:"hideTagRefinesCheckbox"},"Tag refines:"),n.default("input#hideTagRefinesCheckbox",{type:"checkbox",checked:!i.journal.hideTagRefines,onclick:()=>{i.journal.hideTagRefines=!i.journal.hideTagRefines,a.setStoredHideTagRefines(i.journal.hideTagRefines)}})])]}}}},function(e,t,s){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(s(1)),i=s(0),a=s(2);t.searchbar=function(){var e={el:null,pos:null};return{view:function(){return n.default("#search",[n.default("#searchQuery",{placeholder:"Search for text or tags",contenteditable:"true",class:"entry breakwrap",oninput:t=>function(t){let s=a.getCaretPosition(t.target);e=s?{pos:s[1],el:t.target}:{pos:null,el:null},i.search.barQuery.raw=a.escapeHtml(t.target.innerText)}(t),onupdate:()=>(a.setCaretPosition(e.el,e.pos),void(e={el:null,pos:null})),onkeydown:e=>function(e){13!=e.keyCode||e.shiftKey||(e.preventDefault(),e.target.blur())}(e)},n.default.trust(i.search.barQuery.rendered)),n.default("button",{id:"clearSearch",class:"del",onclick:()=>i.search.barQuery.raw=""},"x")])}}}},function(e,t,s){"use strict";var r=this&&this.__awaiter||function(e,t,s,r){return new(s||(s=Promise))((function(n,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function o(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(a,o)}u((r=r.apply(e,t||[])).next())}))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(s(1)),a=s(9),o=s(3),u=s(0),l=s(2),d=["https://www.googleapis.com/auth/spreadsheets"].join(" ");t.googleAPI=function(){var e;function t(){e.auth2.init({scope:d,client_id:"893904323330-moo1k9s19qp40kr747pftdo29ejdef0o.apps.googleusercontent.com"}).then(()=>{e.auth2.getAuthInstance().isSignedIn.listen(s),s(e.auth2.getAuthInstance().isSignedIn.get())})}function s(t){return r(this,void 0,void 0,(function*(){if(u.journal.isSignedIn=t,i.default.redraw(),u.journal.isSignedIn){let t=e.auth2.getAuthInstance().currentUser.get();u.syncer.user=t;let s=t.getAuthResponse();u.syncer.updateAuth(s.access_token),yield function(){return r(this,void 0,void 0,(function*(){let e=l.getStoredSpreadsheetUrls();yield u.journal.load(e)}))}()}else u.journal.unload()}))}function n(){return i.default("button",{id:"addSpreadsheet",onclick:()=>r(this,void 0,void 0,(function*(){if(u.journal.showAddSpreadsheetTextbox=!u.journal.showAddSpreadsheetTextbox,!u.journal.showAddSpreadsheetTextbox){let e=l.getStoredSpreadsheetUrls();yield u.journal.load(e)}}))},u.journal.showAddSpreadsheetTextbox?" ✓ ":"+/-")}return{view:function(){return u.testMode===o.TestMode.DEMO?(u.journal.isSignedIn=!0,u.journal.load("https://docs.google.com/spreadsheets/d/demo/edit"),[]):i.default("#googleApi",[u.journal.showAddSpreadsheetTextbox?[i.default("textarea",{id:"spreadsheetURLs",placeholder:"Enter list of Google Sheets Spreadsheet URLs here",value:l.getStoredSpreadsheetUrls(),oninput:e=>l.setStoredSpreadsheetUrls(e.target.value)}),i.default("br")]:[],u.journal.isSignedIn?n():[],null!==u.journal.spreadsheet?i.default("select",{onchange:e=>{let t=e.target.value;u.journal.switch(t,l.getStoredSpreadsheetSheetId(t))},id:"spreadsheetSelect"},[Array.from(u.journal.spreadsheets).map(([e])=>[i.default("option",{value:e,selected:u.journal.spreadsheet.id===e},e.substr(e.length-6))])]):[],u.journal.isActive?i.default("select",{onchange:e=>{u.journal.switch(u.journal.spreadsheet.id,parseInt(e.target.value)),i.default.redraw()},id:"sheetSelect"},[Array.from(u.journal.spreadsheet.sheets).map(([e,t])=>[i.default("option",{value:e,selected:u.journal.isActive&&u.journal.spreadsheet.sheet.id===e},t.title)])]):[],u.journal.isSignedIn?i.default("button",{onclick:()=>{u.testMode===o.TestMode.RETURN_ROWS&&u.journal.unload(),e.auth2.getAuthInstance().signOut()},class:"authButton"},"Sign Out"):i.default("button",{onclick:()=>e.auth2.getAuthInstance().signIn(),class:"authButton"},"Sign In"),i.default("script",{async:!0,defer:!0,src:"https://apis.google.com/js/api.js",onload:()=>{(e=u.testMode===o.TestMode.OFF?gapi:new a.MockGapi).load("auth2",t)}})])}}}},function(e,t,s){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(s(1)),i=s(0);t.refinesPane=function(){const e=new Set;function t(t,s){return n.default("span",function(t){return{class:"roundTagKey",onclick:s=>function(t,s){if(t.metaKey||t.ctrlKey){if("Simple Tags"===s)return;i.search.refinesQuery.keys.has(s)?i.search.refinesQuery.keys.delete(s):i.search.refinesQuery.keys.add(s)}else e.has(s)?e.delete(s):e.add(s)}(s,t)}}(t),["Simple Tags"===t?[]:n.default("input",{type:"checkbox",checked:i.search.refinesQuery.keys.has(t)}),e.has(t)?n.default("span","▾ "):n.default("span","▿ "),n.default("span",t),n.default("span",` (${s})`)])}function s(e,t){return n.default("div",{class:"tagRefineValWrap"},[n.default("span",r(e,t),[n.default("input",{type:"checkbox",checked:null===t.val?i.search.refinesQuery.simpleKeys.has(t.clean):i.search.refinesQuery.vals.has(t.clean)}),null!==t.val?n.default("span",""+t.cleanVal):n.default("span",`${t.flag}${t.cleanKey}`),n.default("span",` (${t.frq})`)])])}function r(t,s){let r=null===s.val?"simpleTag":"roundTagVal",n="hide";return(null===s.val&&e.has("Simple Tags")||e.has(t)||i.search.refinesQuery.vals.has(s.clean))&&(n=""),{class:`${r} ${n}`,onclick:()=>function(e){null===e.val?i.search.refinesQuery.simpleKeys.has(e.clean)?i.search.refinesQuery.simpleKeys.delete(e.clean):i.search.refinesQuery.simpleKeys.set(e.clean,e):i.search.refinesQuery.vals.has(e.clean)?i.search.refinesQuery.vals.delete(e.clean):i.search.refinesQuery.vals.set(e.clean,e)}(s)}}return{view:function(){return i.journal.hideTagRefines?[]:n.default("#tagsWrap",n.default("#tags",[n.default(".tempguidancePre","Tags"),n.default(".tagRefineWrap",0===i.refines.simple.size?[]:[t("Simple Tags",i.refines.simple.size),Array.from(i.refines.simple,([e,t])=>[s(e,t)])]),Array.from(i.refines.complex,([e,r])=>n.default(".tagRefineWrap",[t(e,r.length),r.map(t=>[s(e,t)])]))]))}}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=s(0);t.Refines=class{constructor(){this.simple=new Map,this.complex=new Map}build(){let e=new Map,t=new Map;for(let s of r.journal.spreadsheet.sheet.tags.values())if(null===s.val){let t=`${s.flag}${s.cleanKey}`;e.has(t)||e.set(t,s)}else{let e=`${s.flag}${s.cleanKey}${s.separator}`;t.has(e)||t.set(e,[]),t.get(e).push(s)}this.simple=new Map([...e.entries()]),this.complex=new Map([...t.entries()].sort()),this.cleanRefines()}cleanRefines(){for(let[e]of r.search.refinesQuery.simpleKeys)this.simple.has(e)||r.search.refinesQuery.simpleKeys.delete(e);for(let e of r.search.refinesQuery.keys)this.complex.has(e)||r.search.refinesQuery.keys.delete(e);for(let[e]of r.search.refinesQuery.vals)Array.from(this.complex.values()).some(t=>t.some(t=>t.clean===e))||r.search.refinesQuery.vals.delete(e)}}}]);
//# sourceMappingURL=dntd.js.map