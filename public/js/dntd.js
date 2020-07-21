!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(9)),r(n(10)),r(n(11)),r(n(12))},function(e,t){e.exports=m},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(1)),s=n(16),i=n(7);t.serviceWorkerModel=new i.ServiceWorkerModel,t.googleModel=new i.GoogleModel,t.syncerModel=new i.SyncerModel,t.libraryModel=new i.LibraryModel;const l=document.getElementById("root");null!==l&&o.default.route(l,"/",{"/":s.signinView,"/signin":s.signinView,"/library":s.libraryView,"/library/:shelfId":s.shelfView,"/library/:shelfId/:journalId":s.journalView})},function(e,t,n){"use strict";function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(22)),r(n(23)),r(n(24)),r(n(25)),r(n(26))},,function(e,t,n){"use strict";function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(19)),r(n(27)),r(n(28))},,function(e,t,n){"use strict";function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(29)),r(n(30)),r(n(31)),r(n(32)),r(n(33)),r(n(34)),r(n(35)),r(n(37))},function(e,t,n){"use strict";function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(18)),r(n(38)),r(n(39)),r(n(40)),r(n(41)),r(n(42))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0);class o extends Error{constructor(e,t,n,o){super(e),this.friendlyMsg=t,this.needsReAuth=n,this.payload={pause:void 0===o||o,error:this,friendlyMsg:this.friendlyMsg,type:r.SyncerPayloadType.ERROR}}}t.SyncerError=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.NONE=0]="NONE",e[e.AND=1]="AND",e[e.OR=2]="OR"}(t.SearchType||(t.SearchType={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.OFF="0",e.WORKING="1",e.FAIL_GET_SPREADSHEET_SHEETS="2",e.FAIL_GET_RANGE="3",e.FAIL_UPDATE_RANGE="4",e.FAIL_DELETE_ROW="5",e.RETURN_ROWS="6",e.DEMO="7"}(t.TestMode||(t.TestMode={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.AUTH_UPDATE=0]="AUTH_UPDATE",e[e.DELETE_ROW=1]="DELETE_ROW",e[e.UPDATE_ROW=2]="UPDATE_ROW",e[e.GET_ROWS=3]="GET_ROWS",e[e.GET_SHEETS=4]="GET_SHEETS",e[e.TEST_MODE_UPDATE=5]="TEST_MODE_UPDATE",e[e.UNPAUSE=6]="UNPAUSE",e[e.GET_SPREADSHEET=7]="GET_SPREADSHEET",e[e.EXTEND_SHEET=8]="EXTEND_SHEET",e[e.CREATE_ROW=9]="CREATE_ROW",e[e.MOVE_ROW=10]="MOVE_ROW",e[e.ERROR=11]="ERROR",e[e.TOKEN_REQUEST=12]="TOKEN_REQUEST",e[e.SYNC_STATE=13]="SYNC_STATE"}(t.SyncerPayloadType||(t.SyncerPayloadType={})),function(e){e[e.SYNCER_STATE=0]="SYNCER_STATE",e[e.ERROR=1]="ERROR",e[e.REAUTH=2]="REAUTH"}(t.SyncerResponseType||(t.SyncerResponseType={})),function(e){e.PAUSED="cloud_off",e.UPLOADING="cloud_upload",e.DOWNLOADING="cloud_download",e.SYNCED="cloud_done"}(t.SyncerState||(t.SyncerState={}))},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(1)),s=n(2),i=n(3);t.breadcrumbController={getBreadcrumbTrail:function(){var e,t,n;let r=[],l=i.getHash().split("/").filter(e=>"#"!==e&&""!==e),a=void 0;for(let i=0;i<l.length;i++){let u=l[i],c="#/"+l.slice(0,i+1).join("/");1===i?(a=u,u=(null===(e=s.libraryModel.shelves.get(u))||void 0===e?void 0:e.title)||u):2===i&&void 0!==a&&(u=(null===(n=null===(t=s.libraryModel.shelves.get(a))||void 0===t?void 0:t.journals.get(parseInt(u)))||void 0===n?void 0:n.title)||u),r.push(o.default("span"," / ")),i===l.length-1?r.push(o.default("span",""+u)):r.push(o.default("a",{href:c},""+u))}return r}}},,,function(e,t,n){"use strict";function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(17)),r(n(43)),r(n(44)),r(n(45))},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(1)),s=n(8);t.shelfView=function(){return{view:function(){return o.default("#shelf",[o.default(s.breadcrumbComponent),o.default(s.googleComponent),o.default(s.syncStateComponent),o.default(s.journalsComponent)])}}}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(1)),s=n(2),i=n(5);t.googleComponent=function(){return{view:function(){return o.default("#googleApi",[void 0===s.googleModel.isSignedIn||s.googleModel.isSignedIn?null:o.default(".preamble","PREAMBLE MSG"),s.googleModel.isSignedIn?o.default("button",{onclick:()=>i.googleController.signOut(),class:"authButton"},"Sign Out"):o.default("button",{onclick:()=>i.googleController.signIn(),class:"authButton"},"Sign In"),o.default("script",{async:!0,defer:!0,src:s.googleModel.src,onload:()=>{s.googleModel.isSignedIn||i.googleController.initGapi()}})])}}}},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,s){function i(e){try{a(r.next(e))}catch(e){s(e)}}function l(e){try{a(r.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,l)}a((r=r.apply(e,t||[])).next())}))},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=o(n(1)),i=n(2),l=n(20),a=n(0),u=n(3),c=n(5);function d(e){return r(this,void 0,void 0,(function*(){i.googleModel.isSignedIn=e,i.googleModel.isSignedIn?(i.googleModel.user=i.googleModel.gapi_.auth2.getAuthInstance().currentUser.get(),c.syncerController.updateAuth(i.googleModel.token),c.libraryController.loadShelves()):c.libraryController.removeShelves(),s.default.redraw()}))}t.googleController={signIn:function(){i.googleModel.gapi_.auth2.getAuthInstance().signIn()},signOut:function(){i.googleModel.gapi_.auth2.getAuthInstance().signOut()},initGapi:function(){let e=u.getTestMode()===a.TestMode.OFF?gapi:new l.MockGapi;i.googleModel.gapi_=e,i.googleModel.gapi_.load("auth2",()=>{i.googleModel.gapi_.auth2.init({scope:i.googleModel.scope,client_id:i.googleModel.clientId}).then(()=>{i.googleModel.gapi_.auth2.getAuthInstance().isSignedIn.listen(d),d(i.googleModel.gapi_.auth2.getAuthInstance().isSignedIn.get())})})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(21))},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,s){function i(e){try{a(r.next(e))}catch(e){s(e)}}function l(e){try{a(r.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,l)}a((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});t.MockGapi=class{constructor(){this.auth2=new o}load(e,t){t()}};class o{getAuthInstance(){return new l}init(e){return r(this,void 0,void 0,(function*(){}))}}class s{get(){return new i}}class i{getAuthResponse(){return{expires_in:9999,access_token:"faketoken"}}reloadAuthResponse(){return r(this,void 0,void 0,(function*(){return{expires_in:9999,access_token:"faketoken"}}))}}t.MockGoogleUser=i;class l{constructor(){this.isSignedIn=new a,this.currentUser=new s}signOut(){}signIn(){}}class a{constructor(){this.listen=e=>{},this.get=()=>!0}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0);t.getHash=function(){return new URL(window.location.href).hash},t.getTestMode=function(){let e=new URL(window.location.href);if("#!demo"===e.hash)return r.TestMode.DEMO;let t=e.searchParams.get("test");return null!==t&&(n=t,Object.values(r.TestMode).includes(n))?t:r.TestMode.OFF;var n}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(1));class s extends Error{constructor(e,t){super(e),this.friendlyMsg=t,console.warn(e),o.default.redraw()}}t.FriendlyError=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.escapeHtml=function(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getCaretPosition=function(e){var t=window.getSelection(),n=[0,0];if(t.anchorNode==e)n=[t.anchorNode.innerText.length,t.extentNode.innerText.length];else{var r=[t.anchorNode,t.extentNode];if(!e.contains(t.anchorNode)||!e.contains(t.extentNode))return;var o,s=[0,0];!function e(t,n){var r=n(t);for(t=t.firstChild;!1!==r&&t;t=t.nextSibling)r=e(t,n)}(e,(function(e){for(o=0;o<2;o++)if(e==r[o]&&(s[o]=1,s[0==o?1:0]))return;if(e.textContent&&!e.firstChild)for(o=0;o<2;o++)s[o]||(n[o]+=e.textContent.length)})),n[0]+=t.anchorOffset,n[1]+=t.extentOffset}return n[0]<=n[1]?n:[n[1],n[0]]},t.setCaretPosition=function e(t,n){if(null!==t&&null!==n){for(var r of t.childNodes)if(3==r.nodeType){if(r.length>=n){let e=document.createRange(),t=window.getSelection();return e.setStart(r,n),e.collapse(!0),t.removeAllRanges(),t.addRange(e),-1}n-=r.length}else if(-1==(n=e(r,n)))return-1;return n}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.tagPattern=/(\@)([\w-']+)+(:)?([\w-'\*]+)?/g},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,s){function i(e){try{a(r.next(e))}catch(e){s(e)}}function l(e){try{a(r.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,l)}a((r=r.apply(e,t||[])).next())}))},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=o(n(1)),i=n(3),l=n(2),a=n(0),u=new Worker("./js/syncWebWorker.js");function c(e){if(void 0!==e)return l.syncerModel.pushSyncerTask({type:a.SyncerPayloadType.AUTH_UPDATE,token:e},u)}u.onmessage=e=>function(e){let{id:t,payload:n,error:r}=e.data;if(null!==t&&l.syncerModel.requests.has(t))l.syncerModel.requests.get(t)({payload:n,error:r}),l.syncerModel.requests.delete(t);else switch(n.type){case a.SyncerPayloadType.SYNC_STATE:l.syncerModel.state=n.state,s.default.redraw();break;case a.SyncerPayloadType.ERROR:new i.FriendlyError(n.error.message,n.friendlyMsg);break;case a.SyncerPayloadType.TOKEN_REQUEST:c(l.googleModel.token)}}(e),t.syncerController={unpause:function(){return r(this,void 0,void 0,(function*(){return yield l.syncerModel.pushSyncerTask({type:a.SyncerPayloadType.UNPAUSE},u)}))},getRows:function(e,t,n){return l.syncerModel.pushSyncerTask({type:a.SyncerPayloadType.GET_ROWS,spreadsheetId:e,sheetTitle:n,sheetId:t,rows:[]},u)},deleteRow:function(e,t,n){return r(this,void 0,void 0,(function*(){return yield l.syncerModel.pushSyncerTask({type:a.SyncerPayloadType.DELETE_ROW,spreadsheetId:t,sheetId:n,idx:e},u)}))},updateRow:function(e,t,n,o,s){return r(this,void 0,void 0,(function*(){return yield l.syncerModel.pushSyncerTask({type:a.SyncerPayloadType.UPDATE_ROW,spreadsheetId:t,sheetTitle:o,sheetId:n,content:s,idx:e},u)}))},getSheets:function(e){return l.syncerModel.pushSyncerTask({type:a.SyncerPayloadType.GET_SHEETS,spreadsheetId:e,sheets:[]},u)},updateAuth:c,updateTestMode:function(e){return r(this,void 0,void 0,(function*(){return yield l.syncerModel.pushSyncerTask({type:a.SyncerPayloadType.TEST_MODE_UPDATE,testMode:e},u)}))},getSpreadsheet:function(e){return l.syncerModel.pushSyncerTask({type:a.SyncerPayloadType.GET_SPREADSHEET,spreadsheetId:e,spreadsheet:void 0},u)}}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(1)),s=n(2),i=n(7),l=n(3),a=n(5),u=new i.ShelfFactory,c=/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/g;function d(e,t){console.log("LOAD"),void 0===t&&(t=Array.from(s.libraryModel.shelves.keys())),e&&(t.forEach(e=>s.libraryModel.shelves.set(e,void 0)),o.default.redraw()),t.filter(e=>!s.libraryModel.shelves.get(e)).forEach(e=>a.syncerController.getSpreadsheet(e).then(t=>{let n=u.createShelf(e,t.spreadsheet);s.libraryModel.shelves.set(n.id,n)}).catch(t=>{new l.FriendlyError(t.error.message,t.friendlyMsg);let n=u.createShelf(e,void 0,t.friendlyMsg);s.libraryModel.shelves.set(e,n)}).finally(()=>{o.default.redraw()}))}function f(e){let t=[];return e&&Array.from(e.matchAll(c)).forEach(e=>t.push(e[1])),t}t.libraryController={addShelves:function(e){let t=f(e);t=t.filter(e=>!s.libraryModel.shelves.has(e)),t.forEach(e=>s.libraryModel.shelves.set(e,void 0)),s.libraryModel.shelfIds=Array.from(s.libraryModel.shelves.keys()),d(!1,t)},loadShelves:d,removeShelves:function(e){void 0===e&&(e=Array.from(s.libraryModel.shelves.keys()));(e=e.filter(e=>s.libraryModel.shelves.has(e))).forEach(e=>s.libraryModel.shelves.delete(e)),s.libraryModel.shelfIds=Array.from(s.libraryModel.shelves.keys())},getSpreadsheetIdsFromUrls:f}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(3);t.TagModel=class{constructor(e,t,n,r,o){this.frq=1,this.raw=e,this.flag=t,this.key=n,this.separator=void 0!==r?r:null,this.val=void 0!==o?o:null,this.clean=this.cleanTagString(this.raw),this.cleanKey=this.cleanTagString(this.key),this.cleanVal=null!==this.val?this.cleanTagString(this.val):null}renderKey(){return"<span onclick=\"tagOnClick(event, '"+this.flag+this.cleanKey+(this.separator?this.separator:"")+'\')" class="'+(this.separator?"tagKey":null===this.val?"simpleTag":"roundTagVal")+'">'+this.flag+this.key+"</span>"}renderVal(e){var t;return"<span onclick=\"tagOnClick(event, '"+this.flag+this.cleanKey+this.separator+(null===(t=this.cleanVal)||void 0===t?void 0:t.replace(/'/,"\\'"))+'\')" class="'+(e?"roundTagVal":"tagVal")+'">'+(e?"":this.separator)+(this.val||"")+"</span>"}render(e){return this.separator?e?this.renderVal(e):this.renderKey()+this.renderVal(e):this.renderKey()}cleanTagString(e){return e=(e=(e=r.escapeHtml(e)).endsWith("'s")?e.substring(0,e.length-2):e).toLowerCase()}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(7),o=n(3);t.EntryModel=class{constructor(e,t){this.tags=new Map,this.hovered=!1,this.focused=!1,this.clean="",this.tokens=[],this.rendered="",this.savedClean="",this.tagMatches=[],this.readableRendered="",this.rawText="",this.savedText="",this.raw=e||"",this.saved=void 0!==t?t:this.raw}get saved(){return this.savedText}set saved(e){this.savedText=e,this.savedClean=e.toLowerCase(),this.tags=this.getTags(this.tagMatches)}get raw(){return this.rawText}set raw(e){this.rawText=e,this.clean=this.raw.toLowerCase();let t=o.escapeHtml(this.rawText);this.tokens=this.getTokens(this.clean),this.tagMatches=this.getTagMatches(t),this.rendered=this.render(t,this.tagMatches),this.readableRendered=this.render(t,this.tagMatches,!0)}render(e,t,n){for(let{tag:r,match:o}of t){let t=e.split("");t.splice(o.index,o[0].length,r.render(n)),e=t.join("")}return e}getTags(e){let t=new Map;for(let{tag:n}of e)t.has(n.clean)?t.get(n.clean).frq+=1:t.set(n.clean,n);return t}getTagMatches(e){let t=[],n=e.matchAll(o.tagPattern);for(let e of n){let n=new r.TagModel(e[0],e[1],e[2],e[3],e[4]);t.push({tag:n,match:e})}return t.sort((e,t)=>e.match.index>t.match.index?-1:1),t}getTokens(e){return e.split(" ").filter(e=>void 0!==e&&""!==e.trim()&&"-"!==e)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(7);t.ShelfFactory=class{constructor(){this.journalFactory=new r.JournalFactory}createShelf(e,t,n){if(void 0!==t&&void 0!==t.spreadsheetId&&void 0!==t.properties&&void 0!==t.properties.title&&void 0!==t.sheets){let e=this.getJournals(t.spreadsheetId,t.sheets);return new o(t.spreadsheetId,t.properties.title,e)}return new o(e,void 0,void 0,n)}getJournals(e,t){let n=[];return t.forEach(t=>{if(void 0!==t.properties&&void 0!==t.properties.title&&void 0!==t.properties.sheetId){let r=this.journalFactory.createJournal(t.properties.sheetId,e,t.properties.title);if(void 0===r)return;n.push(r)}}),n}};class o{constructor(e,t,n,r){this.journals=new Map,this.id=e,this.error=r,this.title=t,void 0!==n&&this.addJournals(n)}addJournals(e){e.filter(e=>!this.journals.has(e.id)).forEach(e=>this.journals.set(e.id,e))}}t.ShelfModel=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0);t.SyncerModel=class{constructor(){this.requestsCounter=0,this.requests=new Map,this.state=r.SyncerState.SYNCED}pushSyncerTask(e,t){let n="payload-"+this.requestsCounter++;return new Promise((r,o)=>{this.requests.set(n,({payload:e,error:t})=>{t?o(t):r(e)}),t.postMessage({id:n,payload:e})})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.GoogleModel=class{constructor(e){this.isSignedIn=e,this.src="https://apis.google.com/js/api.js",this.scope=["https://www.googleapis.com/auth/spreadsheets"].join(" "),this.clientId="893904323330-moo1k9s19qp40kr747pftdo29ejdef0o.apps.googleusercontent.com"}get token(){if(!this.user)return;return this.user.getAuthResponse().access_token}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(7);t.JournalFactory=class{createJournal(e,t,n){return new o(e,t,n)}};class o{constructor(e,t,n){this.entries=[],this.id=e,this.title=n,this.tags=new Map,this.shelfId=t}buildTags(){let e=new Map;for(let t of Array.from(this.entries.values()).reverse())for(let[n,o]of t.tags)e.has(n)?e.get(n).frq+=o.frq:e.set(n,new r.TagModel(o.raw,o.flag,o.key,o.separator,o.val));return e}addEntry(e,t){this.entries.splice(e,0,new r.EntryModel(t)),this.tags=this.buildTags()}updateEntry(e,t){let n=this.entries[e];n.saved!==t&&(n.saved=t,this.tags=this.buildTags())}deleteEntry(e){this.entries.splice(e,1)[0],this.tags=this.buildTags()}moveEntry(e,t){let n=this.entries[e];this.entries.splice(e,1),this.entries.splice(t,0,n)}}t.JournalModel=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.LibraryModel=class{constructor(){this.shelves=new Map,this.shelfIds.forEach(e=>this.shelves.set(e,void 0))}set shelfIds(e){localStorage.setItem("spreadsheetIds",e.join(","))}get shelfIds(){let e=localStorage.getItem("spreadsheetIds");return null===e?[]:e.split(",")}}},,function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,s){function i(e){try{a(r.next(e))}catch(e){s(e)}}function l(e){try{a(r.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,l)}a((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=n(3);t.ServiceWorkerModel=class{constructor(){if(!("serviceWorker"in navigator))throw new o.FriendlyError("serviceWorker not supported","Your browser is not supported.");window.addEventListener("load",()=>r(this,void 0,void 0,(function*(){yield navigator.serviceWorker.register("../serviceWorker.js")})))}}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(1)),s=n(2),i=n(5);t.shelvesComponent=function(){function e(e){return o.default("button",{class:"del",onclick:()=>i.libraryController.removeShelves([e])},"del")}function t(e){return o.default("button",{onclick:()=>i.libraryController.loadShelves(!0,[e])},"retry")}return{view:function(){let n=Array.from(s.libraryModel.shelves.entries());return o.default("#shelvesList",n.map(([n,r])=>function(n,r){return void 0===r?o.default("li",[e(n),o.default("span",n)]):void 0!==r.error?o.default("li",[e(n),o.default("span",`${n} ${r.error}`),t(n)]):o.default("li",[e(n),o.default("a",{href:"#/library/"+n},r.title)])}(n,r)))}}}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(1)),s=n(2);t.journalsComponent=function(){return{view:function(){return o.default("#journals",function(){let e=s.libraryModel.shelves.get(o.default.route.param("shelfId"));if(void 0===e)return;return Array.from(e.journals.values()).map(e=>{let t=`#/library/${e.shelfId}/${e.id}`;return o.default("li",o.default("a",{href:t},e.title))})}())}}}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(1)),s=n(2),i=n(0),l=n(5);t.syncStateComponent=function(){function e(){let e="",t="syncState "+r();switch(s.syncerModel.state){case i.SyncerState.DOWNLOADING:e="Downloading journal data from drive...";break;case i.SyncerState.PAUSED:e="Warning! - Syncing is paused.";break;case i.SyncerState.SYNCED:e="All changes saved.";break;case i.SyncerState.UPLOADING:e="Uploading changes to drive..."}return o.default("span",{id:"syncStateText",class:t},e)}function t(){let e="material-icons material-icons-outlined syncState "+r();return o.default("i",{id:"syncStateIcon",class:e},s.syncerModel.state)}function n(){if(s.syncerModel.state===i.SyncerState.PAUSED)return o.default("button",{id:"unpauseSync",class:"syncState",onclick:()=>l.syncerController.unpause()},"Unpause Syncing")}function r(){switch(s.syncerModel.state){case i.SyncerState.PAUSED:return"error";case i.SyncerState.SYNCED:return"okay";default:return"warn"}}return{view:function(){return o.default("#status",o.default("span",o.default("span",[t(),e(),n()])))}}}},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,s){function i(e){try{a(r.next(e))}catch(e){s(e)}}function l(e){try{a(r.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,l)}a((r=r.apply(e,t||[])).next())}))},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=o(n(1)),i=n(5);t.addShelvesComponent=function(){let e="",t=!1;function n(){return s.default("button",{id:"addShelvesButton",onclick:()=>r(this,void 0,void 0,(function*(){t&&i.libraryController.addShelves(e),e="",t=!t}))},t?" ✓ ":"+/-")}function o(){return t?s.default("textarea",{id:"addShelvesText",placeholder:"Enter list of Google Sheets Spreadsheet URLs here",oninput:t=>e=t.target.value}):null}return{view:function(){return s.default("#addShelves",[n(),o()])}}}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(1)),s=n(13);t.breadcrumbComponent=function(){return{view:function(){return o.default("#breadcrumb",s.breadcrumbController.getBreadcrumbTrail())}}}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(1)),s=n(2),i=n(8);t.signinView=function(){return{view:function(){return o.default("#auth",[o.default(i.googleComponent)])},onupdate:function(){s.googleModel.isSignedIn&&(window.location.hash="/library")}}}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(1)),s=n(8);t.libraryView=function(){return{view:function(){return o.default("#library",[o.default(s.googleComponent),o.default(s.syncStateComponent),o.default(s.addShelvesComponent),o.default(s.shelvesComponent)])}}}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(1)),s=n(2),i=n(8);t.journalView=function(){return{view:function(){let e=s.libraryModel.shelves.get(o.default.route.param("shelfId")),t=null==e?void 0:e.journals.get(parseInt(o.default.route.param("journalId")));return o.default("#shelf",[o.default(i.breadcrumbComponent),o.default(i.googleComponent),o.default("span",`Shelf: ${null==e?void 0:e.title}, Journal: ${null==t?void 0:t.title}`)])}}}}]);
//# sourceMappingURL=dntd.js.map