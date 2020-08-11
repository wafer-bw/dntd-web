!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=3)}([function(e,t){e.exports=m},function(e,t,r){"use strict";function n(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}Object.defineProperty(t,"__esModule",{value:!0}),n(r(10)),n(r(11)),n(r(12)),n(r(13))},function(e,t,r){"use strict";function n(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}Object.defineProperty(t,"__esModule",{value:!0}),n(r(14)),n(r(23)),n(r(15)),n(r(37)),n(r(38)),n(r(39)),n(r(42)),n(r(43)),n(r(17))},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(r(0)),s=r(20),l=r(8);t.serviceWorkerModel=new l.ServiceWorkerModel,t.googleModel=new l.GoogleModel,t.syncerModel=new l.SyncerModel,t.libraryModel=new l.LibraryModel,t.urlModel=new l.UrlModel,t.searchModel=new l.SearchModel;const i=document.getElementById("root");null!==i&&o.default.route(i,"/",{"/":s.signinView,"/signin":s.signinView,"/library":s.libraryView,"/library/:shelfId":s.shelfView,"/library/:shelfId/:journalId":s.journalView})},,function(e,t,r){"use strict";function n(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}Object.defineProperty(t,"__esModule",{value:!0}),n(r(24)),n(r(35)),n(r(36))},,function(e,t,r){"use strict";function n(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}Object.defineProperty(t,"__esModule",{value:!0}),n(r(22)),n(r(44)),n(r(45)),n(r(46)),n(r(47)),n(r(48)),n(r(49)),n(r(50)),n(r(51))},function(e,t,r){"use strict";function n(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}Object.defineProperty(t,"__esModule",{value:!0}),n(r(25)),n(r(26)),n(r(27)),n(r(28)),n(r(29)),n(r(16)),n(r(30)),n(r(16)),n(r(31)),n(r(32)),n(r(33))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}(r(34))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(1);class o extends Error{constructor(e,t,r,o){super(e),this.friendlyMsg=t,this.needsReAuth=r,this.payload={pause:void 0===o||o,error:this,friendlyMsg:this.friendlyMsg,type:n.SyncerPayloadType.ERROR}}}t.SyncerError=o},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.NONE=0]="NONE",e[e.AND=1]="AND",e[e.OR=2]="OR"}(t.SearchType||(t.SearchType={}))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.OFF="0",e.WORKING="1",e.FAIL_GET_SPREADSHEET_SHEETS="2",e.FAIL_GET_RANGE="3",e.FAIL_UPDATE_RANGE="4",e.FAIL_DELETE_ROW="5",e.RETURN_ROWS="6",e.DEMO="7"}(t.TestMode||(t.TestMode={}))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.AUTH_UPDATE=0]="AUTH_UPDATE",e[e.DELETE_ROW=1]="DELETE_ROW",e[e.UPDATE_ROW=2]="UPDATE_ROW",e[e.GET_ROWS=3]="GET_ROWS",e[e.GET_SHEETS=4]="GET_SHEETS",e[e.TEST_MODE_UPDATE=5]="TEST_MODE_UPDATE",e[e.UNPAUSE=6]="UNPAUSE",e[e.GET_SPREADSHEET=7]="GET_SPREADSHEET",e[e.EXTEND_SHEET=8]="EXTEND_SHEET",e[e.CREATE_ROW=9]="CREATE_ROW",e[e.MOVE_ROW=10]="MOVE_ROW",e[e.ERROR=11]="ERROR",e[e.TOKEN_REQUEST=12]="TOKEN_REQUEST",e[e.SYNC_STATE=13]="SYNC_STATE"}(t.SyncerPayloadType||(t.SyncerPayloadType={})),function(e){e[e.SYNCER_STATE=0]="SYNCER_STATE",e[e.ERROR=1]="ERROR",e[e.REAUTH=2]="REAUTH"}(t.SyncerResponseType||(t.SyncerResponseType={})),function(e){e.PAUSED="cloud_off",e.UPLOADING="cloud_upload",e.DOWNLOADING="cloud_download",e.SYNCED="cloud_done",e.INITIALIZING="cloud_queue"}(t.SyncerState||(t.SyncerState={}))},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(r(0)),s=r(3);function l(){let e=s.urlModel.shelfId;if(void 0!==e)return s.libraryModel.shelves.get(e)}t.urlController={redirect:function(e){s.urlModel.hash=e},getActiveShelf:l,getActiveJournal:function(){let e=s.urlModel.journalId,t=l();return void 0===e||void 0===t?void 0:t.journals.get(e)},getBreadcrumbTrail:function(){var e,t,r;let n=[],l=s.urlModel.hash.split("/").filter(e=>"#"!==e&&""!==e),i=void 0;for(let a=0;a<l.length;a++){let u=l[a],c="#/"+l.slice(0,a+1).join("/");1===a?(i=u,u=(null===(e=s.libraryModel.shelves.get(u))||void 0===e?void 0:e.title)||u):2===a&&void 0!==i&&(u=(null===(r=null===(t=s.libraryModel.shelves.get(i))||void 0===t?void 0:t.journals.get(parseInt(u)))||void 0===r?void 0:r.title)||u),0!==a&&n.push(o.default("span"," / ")),a===l.length-1?n.push(o.default("span",""+u)):n.push(o.default("a",{href:c},""+u))}return n}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(5),o=r(2),s=/(\@)([\w-']+)+(:)?([\w-'\*]+)?/g;t.entryController={save:function(e,t,r,n,s){(e.saved!==r||s)&&(e.saved=r,e.savedClean=o.textController.clean(e.saved),e.tags=function(e){let t=new Map;for(let{tag:r}of e)t.has(r.clean)?t.get(r.clean).frq+=1:t.set(r.clean,r);return t}(e.tagMatches),n&&o.syncerController.updateRow(e.shelf.id,e.journal.id,e.journal.title,t,r))},update:function(e,t){e.raw=t,e.clean=o.textController.clean(t),e.safe=o.textController.escape(e.raw),e.tokens=(r=e.clean,r.split(" ").filter(e=>void 0!==e&&""!==e.trim()&&"-"!==e)),e.tagMatches=function(e){let t=[],r=e.matchAll(s);for(let e of r){let r=n.tagFactory.createTag(e[0],e[1],e[2],e[3],e[4]);t.push({tag:r,match:e})}return t.sort((e,t)=>e.match.index>t.match.index?-1:1),t}(e.safe),e.rendered=function(e,t){for(let{tag:r,match:n}of t){let t=e.split("");t.splice(n.index,n[0].length,r.rendered),e=t.join("")}return e}(e.safe,e.tagMatches);var r}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(1),o=r(5);t.SearchModel=class{constructor(){this.searchType=n.SearchType.NONE,this.simpleRefines=new Map,this.complexRefines=new Map,this.barQuery=o.entryFactory.createBaseEntry(),this.refinesQuery={keys:new Set,vals:new Map,simpleKeys:new Map}}get query(){return o.entryFactory.createBaseEntry([this.barQuery.raw,...Array.from(this.refinesQuery.keys.values()),...Array.from(this.refinesQuery.vals.keys()),...Array.from(this.refinesQuery.simpleKeys.keys())].join(" "))}}},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(r(0)),s=r(3),l=r(5),i=r(9),a=r(2);function u(e){let t=new Map,r=Array.from(e.entries.values());for(let{entry:e}of r.reverse())for(let[r,n]of e.tags)t.has(r)?t.get(r).frq+=n.frq:t.set(r,l.tagFactory.createTag(n.raw,n.flag,n.key,n.separator,n.val));e.tags=t,a.searchController.buildRefines(e)}t.journalController={addEntry:function(e,t,r){e.addEntry(t,r),u(e)},moveEntry:function(e,t,r){if(t===r)return;e.moveEntry(t,r),u(e)},updateEntry:function(e,t,r){if(e.entries[t].entry.saved===r)return;e.updateEntry(t,r),u(e)},deleteEntry:function(e,t){e.deleteEntry(t),u(e)},loadEntries:function(e){if(void 0===e)return;t=e,s.libraryModel.shelves.forEach(e=>{void 0!==e&&e.journals.forEach(e=>{t.shelf.id===e.shelf.id&&t.id===e.id||function(e){void 0!==e&&(e.entries=[],e.loaded=!1)}(e)})}),a.syncerController.getRows(e.shelf.id,e.id,e.title).then(t=>{t.rows.forEach((t,r)=>e.addEntry(r,t)),u(e),e.loaded=!0}).catch(e=>{new i.FriendlyError(e.error.message,e.friendlyMsg)}).finally(()=>{o.default.redraw()});var t}}},,,function(e,t,r){"use strict";function n(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}Object.defineProperty(t,"__esModule",{value:!0}),n(r(21)),n(r(52)),n(r(53)),n(r(54))},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(r(0)),s=r(7);t.shelfView=function(){return{view:function(){return o.default("#shelf",[o.default(s.googleComponent),o.default(s.syncStateComponent),o.default(s.breadcrumbComponent),o.default(s.journalsComponent)])}}}},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(r(0)),s=r(3),l=r(2);t.googleComponent=function(){return{view:function(){return o.default("#googleApi",[void 0===s.googleModel.isSignedIn||s.googleModel.isSignedIn?null:o.default(".preamble","PREAMBLE MSG"),s.googleModel.isSignedIn?o.default("button",{onclick:()=>l.googleController.signOut(),class:"authButton"},"Sign Out"):o.default("button",{onclick:()=>l.googleController.signIn(),class:"authButton"},"Sign In"),o.default("script",{async:!0,defer:!0,src:s.googleModel.src,onload:()=>{s.googleModel.isSignedIn||l.googleController.initGapi()}})])}}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.textController={escape:function(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},clean:function(e){return e.toLowerCase()}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(2),o=r(8);function s(e){return e=(e=(e=n.textController.escape(e)).endsWith("'s")?e.substring(0,e.length-2):e).toLowerCase()}t.tagFactory={createTag:function(e,t,r,n,l){n=void 0!==n?n:null,l=void 0!==l?l:null;let i=s(e),a=s(r),u=null!==l?s(l):null,c="<span onclick=\"tagOnClick(event, '"+t+a+(null!==n?n:"")+'\')" class="'+(null!==n?"tagKey":null===l?"simpleTag":"roundTagVal")+'">'+t+r+"</span>",d="";null!=n&&(d="<span onclick=\"tagOnClick(event, '"+t+a+n+(null!==u?u.replace(/'/,"\\'"):"")+'\')" class="tagVal">'+n+(null!==l?l:"")+"</span>");return new o.TagModel(e,t,r,n,l,i,a,u,c+d)}}},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(r(0)),s=r(1);t.UrlModel=class{get hash(){return new URL(window.location.href).hash}set hash(e){window.location.hash=e}get testMode(){if("#!demo"===this.hash)return s.TestMode.DEMO;let e=o.default.route.param("test");return null!==e&&this.instanceOfTestMode(e)?e:s.TestMode.OFF}instanceOfTestMode(e){return Object.values(s.TestMode).includes(e)}get shelfId(){let e=o.default.route.param("shelfId");return""===e?void 0:e}get journalId(){let e=o.default.route.param("journalId");return""===e?void 0:parseInt(e)}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.TagModel=class{constructor(e,t,r,n,o,s,l,i,a){this.raw=e,this.flag=t,this.key=r,this.separator=n,this.val=o,this.clean=s,this.cleanKey=l,this.cleanVal=i,this.rendered=a,this.frq=1}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class n{constructor(){this.raw="",this.safe="",this.clean="",this.tokens=[],this.rendered="",this.tags=new Map,this.tagMatches=[]}}t.BaseEntryModel=n;t.JournalEntryModel=class extends n{constructor(e,t,r){super(),this.saved="",this.savedClean="",this.id=r,this.shelf=e,this.journal=t}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.ShelfModel=class{constructor(e,t,r){this.journals=new Map,this.id=e,this.error=r,this.title=t}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(1);t.SyncerModel=class{constructor(){this.requestsCounter=0,this.requests=new Map,this.state=n.SyncerState.INITIALIZING}pushSyncerTask(e,t){let r="payload-"+this.requestsCounter++;return new Promise((n,o)=>{this.requests.set(r,({payload:e,error:t})=>{t?o(t):n(e)}),t.postMessage({id:r,payload:e})})}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.GoogleModel=class{constructor(e){this.isSignedIn=e,this.src="https://apis.google.com/js/api.js",this.scope=["https://www.googleapis.com/auth/spreadsheets"].join(" "),this.clientId="893904323330-moo1k9s19qp40kr747pftdo29ejdef0o.apps.googleusercontent.com"}get token(){if(!this.user)return;return this.user.getAuthResponse().access_token}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(5);t.JournalModel=class{constructor(e,t,r){this.entries=[],this.shelf=e,this.loaded=!1,this.id=t,this.tags=new Map,this.entryCounter=0,this.title=r}addEntry(e,t){let r=this.entryCounter+=1,o=n.entryFactory.createJournalEntry(this.shelf,this,r,e,t);this.entries.splice(e,0,{id:r,entry:o})}updateEntry(e,t){this.entries[e].entry.saved=t}deleteEntry(e){this.entries.splice(e,1)[0]}moveEntry(e,t){let r=this.entries.splice(e,1)[0];this.entries.splice(t,0,r)}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.LibraryModel=class{constructor(){this.shelves=new Map,this.shelfIds.forEach(e=>this.shelves.set(e,void 0))}set shelfIds(e){localStorage.setItem("spreadsheetIds",e.join(","))}get shelfIds(){let e=localStorage.getItem("spreadsheetIds");return null===e?[]:e.split(",")}}},function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,s){function l(e){try{a(n.next(e))}catch(e){s(e)}}function i(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(l,i)}a((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=r(9);t.ServiceWorkerModel=class{constructor(){if(!("serviceWorker"in navigator))throw new o.FriendlyError("serviceWorker not supported","Your browser is not supported.");window.addEventListener("load",()=>n(this,void 0,void 0,(function*(){yield navigator.serviceWorker.register("../serviceWorker.js")})))}}},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(r(0));class s extends Error{constructor(e,t){super(e),this.friendlyMsg=t,console.warn(e),o.default.redraw()}}t.FriendlyError=s},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(8);t.shelfFactory={createShelf:function(e,t,r){if(void 0!==t&&void 0!==t.spreadsheetId&&void 0!==t.properties&&void 0!==t.properties.title&&void 0!==t.sheets){let e=new n.ShelfModel(t.spreadsheetId,t.properties.title);return function(e,t){let r=[];return t.forEach(t=>{if(void 0!==t.properties&&void 0!==t.properties.title&&void 0!==t.properties.sheetId){let o=new n.JournalModel(e,t.properties.sheetId,t.properties.title);if(void 0===o)return;r.push(o)}}),r}(e,t.sheets).forEach(t=>e.journals.set(t.id,t)),e}return new n.ShelfModel(e,void 0,r)}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(2),o=r(8);t.entryFactory={createBaseEntry:function(e){let t=new o.BaseEntryModel;return n.entryController.update(t,e||""),t},createJournalEntry:function(e,t,r,s,l){let i=new o.JournalEntryModel(e,t,r);return n.entryController.update(i,l),n.entryController.save(i,s,l,!1,!0),i}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.caretController={getCaretPosition:function(e){var t=window.getSelection(),r=[0,0];if(t.anchorNode==e)r=[t.anchorNode.innerText.length,t.extentNode.innerText.length];else{var n=[t.anchorNode,t.extentNode];if(!e.contains(t.anchorNode)||!e.contains(t.extentNode))return;var o,s=[0,0];!function e(t,r){var n=r(t);for(t=t.firstChild;!1!==n&&t;t=t.nextSibling)n=e(t,r);return}(e,(function(e){for(o=0;o<2;o++)if(e==n[o]&&(s[o]=1,s[0==o?1:0]))return;if(e.textContent&&!e.firstChild)for(o=0;o<2;o++)s[o]||(r[o]+=e.textContent.length)})),r[0]+=t.anchorOffset,r[1]+=t.extentOffset}if(r[0]<=r[1])return r;return[r[1],r[0]]},setCaretPosition:function e(t,r){if(null!==t&&null!==r){for(var n of t.childNodes)if(3==n.nodeType){if(n.length>=r){let e=document.createRange(),t=window.getSelection();return e.setStart(n,r),e.collapse(!0),t.removeAllRanges(),t.addRange(e),-1}r-=n.length}else if(-1==(r=e(n,r)))return-1;return r}}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(3),o=r(1),s=r(5),l=r(15);function i(e){let t=n.searchModel.query,r=e,s=[];for(let{entry:e}of r)switch(n.searchModel.searchType){case o.SearchType.AND:t.tokens.every(t=>a(t,e))&&s.push(e);break;case o.SearchType.OR:t.tokens.some(t=>a(t,e))&&s.push(e)}return s}function a(e,t){return e.startsWith("-@")&&!e.endsWith(":")?void 0===t.tags.get(e.substring(1)):e.startsWith("-")?!t.savedClean.includes(e.substring(1)):e.startsWith("@")&&!e.endsWith(":")?void 0!==t.tags.get(e):t.savedClean.includes(e)}t.searchController={reset:function(){n.searchModel.searchType=o.SearchType.NONE,n.searchModel.barQuery=s.entryFactory.createBaseEntry(),n.searchModel.refinesQuery={keys:new Set,vals:new Map,simpleKeys:new Map}},buildRefines:function(e){let t=new Map,r=new Map;for(let n of e.tags.values())if(null===n.val){let e=`${n.flag}${n.cleanKey}`;t.has(e)||t.set(e,n)}else{let e=`${n.flag}${n.cleanKey}${n.separator}`;r.has(e)||r.set(e,[]),r.get(e).push(n)}n.searchModel.simpleRefines=new Map([...t.entries()]),n.searchModel.complexRefines=new Map([...r.entries()].sort()),function(){for(let[e]of n.searchModel.refinesQuery.simpleKeys)n.searchModel.simpleRefines.has(e)||n.searchModel.refinesQuery.simpleKeys.delete(e);for(let e of n.searchModel.refinesQuery.keys)n.searchModel.complexRefines.has(e)||n.searchModel.refinesQuery.keys.delete(e);for(let[e]of n.searchModel.refinesQuery.vals)Array.from(n.searchModel.complexRefines.values()).some(t=>t.some(t=>t.clean===e))||n.searchModel.refinesQuery.vals.delete(e)}()},filteredEntries:function(e){let t=[];0===n.searchModel.query.tokens.length?(n.searchModel.searchType=o.SearchType.NONE,t=e.map(({entry:e})=>e)):(n.searchModel.searchType=o.SearchType.AND,t=i(e),0===t.length&&(n.searchModel.searchType=o.SearchType.OR,t=i(e)));return t},updateSearchbar:function(e){l.entryController.update(n.searchModel.barQuery,e)}}},function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,s){function l(e){try{a(n.next(e))}catch(e){s(e)}}function i(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(l,i)}a((n=n.apply(e,t||[])).next())}))},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=o(r(0)),l=r(40),i=r(1),a=r(3),u=r(2);function c(e){return n(this,void 0,void 0,(function*(){a.googleModel.isSignedIn=e,a.googleModel.isSignedIn?(a.googleModel.user=a.googleModel.gapi_.auth2.getAuthInstance().currentUser.get(),u.syncerController.updateAuth(a.googleModel.token),u.libraryController.loadShelves()):u.libraryController.removeShelves(),s.default.redraw()}))}t.googleController={signIn:function(){a.googleModel.gapi_.auth2.getAuthInstance().signIn()},signOut:function(){a.googleModel.gapi_.auth2.getAuthInstance().signOut()},initGapi:function(){let e=a.urlModel.testMode===i.TestMode.OFF?gapi:new l.MockGapi;a.googleModel.gapi_=e,a.googleModel.gapi_.load("auth2",()=>{a.googleModel.gapi_.auth2.init({scope:a.googleModel.scope,client_id:a.googleModel.clientId}).then(()=>{a.googleModel.gapi_.auth2.getAuthInstance().isSignedIn.listen(c),c(a.googleModel.gapi_.auth2.getAuthInstance().isSignedIn.get())})})}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}(r(41))},function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,s){function l(e){try{a(n.next(e))}catch(e){s(e)}}function i(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(l,i)}a((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});t.MockGapi=class{constructor(){this.auth2=new o}load(e,t){t()}};class o{getAuthInstance(){return new i}init(e){return n(this,void 0,void 0,(function*(){}))}}class s{get(){return new l}}class l{getAuthResponse(){return{expires_in:9999,access_token:"faketoken"}}reloadAuthResponse(){return n(this,void 0,void 0,(function*(){return{expires_in:9999,access_token:"faketoken"}}))}}t.MockGoogleUser=l;class i{constructor(){this.isSignedIn=new a,this.currentUser=new s}signOut(){}signIn(){}}class a{constructor(){this.listen=e=>{},this.get=()=>!0}}},function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,s){function l(e){try{a(n.next(e))}catch(e){s(e)}}function i(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(l,i)}a((n=n.apply(e,t||[])).next())}))},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=o(r(0)),l=r(9),i=r(3),a=r(1),u=new Worker("./js/syncWebWorker.js");function c(e){if(void 0!==e)return i.syncerModel.pushSyncerTask({type:a.SyncerPayloadType.AUTH_UPDATE,token:e},u)}u.onmessage=e=>function(e){let{id:t,payload:r,error:n}=e.data;if(null!==t&&i.syncerModel.requests.has(t))i.syncerModel.requests.get(t)({payload:r,error:n}),i.syncerModel.requests.delete(t);else switch(r.type){case a.SyncerPayloadType.SYNC_STATE:i.syncerModel.state=r.state,s.default.redraw();break;case a.SyncerPayloadType.ERROR:new l.FriendlyError(r.error.message,r.friendlyMsg);break;case a.SyncerPayloadType.TOKEN_REQUEST:c(i.googleModel.token)}}(e),t.syncerController={unpause:function(){return n(this,void 0,void 0,(function*(){return yield i.syncerModel.pushSyncerTask({type:a.SyncerPayloadType.UNPAUSE},u)}))},getRows:function(e,t,r){return i.syncerModel.pushSyncerTask({type:a.SyncerPayloadType.GET_ROWS,spreadsheetId:e,sheetTitle:r,sheetId:t,rows:[]},u)},deleteRow:function(e,t,r){return n(this,void 0,void 0,(function*(){return yield i.syncerModel.pushSyncerTask({type:a.SyncerPayloadType.DELETE_ROW,spreadsheetId:t,sheetId:r,idx:e},u)}))},updateRow:function(e,t,r,o,s){return n(this,void 0,void 0,(function*(){return yield i.syncerModel.pushSyncerTask({type:a.SyncerPayloadType.UPDATE_ROW,spreadsheetId:e,sheetTitle:r,sheetId:t,content:s,idx:o},u)}))},getSheets:function(e){return i.syncerModel.pushSyncerTask({type:a.SyncerPayloadType.GET_SHEETS,spreadsheetId:e,sheets:[]},u)},updateAuth:c,updateTestMode:function(e){return n(this,void 0,void 0,(function*(){return yield i.syncerModel.pushSyncerTask({type:a.SyncerPayloadType.TEST_MODE_UPDATE,testMode:e},u)}))},getSpreadsheet:function(e){return i.syncerModel.pushSyncerTask({type:a.SyncerPayloadType.GET_SPREADSHEET,spreadsheetId:e,spreadsheet:void 0},u)}}},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(r(0)),s=r(3),l=r(9),i=r(5),a=r(2),u=r(14),c=r(17),d=/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/g;function f(e,t){void 0===t&&(t=Array.from(s.libraryModel.shelves.keys())),e&&(t.forEach(e=>s.libraryModel.shelves.set(e,void 0)),o.default.redraw()),t.filter(e=>!s.libraryModel.shelves.get(e)).forEach(e=>a.syncerController.getSpreadsheet(e).then(t=>{let r=i.shelfFactory.createShelf(e,t.spreadsheet);s.libraryModel.shelves.set(r.id,r);let n=u.urlController.getActiveJournal();n&&n.shelf===r&&c.journalController.loadEntries(n)}).catch(t=>{new l.FriendlyError(t.error.message,t.friendlyMsg);let r=i.shelfFactory.createShelf(e,void 0,t.friendlyMsg);s.libraryModel.shelves.set(e,r)}).finally(()=>{o.default.redraw()}))}function h(e){let t=[];return e&&Array.from(e.matchAll(d)).forEach(e=>t.push(e[1])),t}t.libraryController={addShelves:function(e){let t=h(e);t=t.filter(e=>!s.libraryModel.shelves.has(e)),t.forEach(e=>s.libraryModel.shelves.set(e,void 0)),s.libraryModel.shelfIds=Array.from(s.libraryModel.shelves.keys()),f(!1,t)},loadShelves:f,removeShelves:function(e){void 0===e&&(e=Array.from(s.libraryModel.shelves.keys()));(e=e.filter(e=>s.libraryModel.shelves.has(e))).forEach(e=>s.libraryModel.shelves.delete(e)),s.libraryModel.shelfIds=Array.from(s.libraryModel.shelves.keys())},getSpreadsheetIdsFromUrls:h}},function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,s){function l(e){try{a(n.next(e))}catch(e){s(e)}}function i(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(l,i)}a((n=n.apply(e,t||[])).next())}))},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=o(r(0)),l=r(2);t.entriesComponent=function(){const e={pos:null,el:null};function t(e){return l.searchController.filteredEntries(e.entries).map((e,t)=>function(e,t){return s.default(".entryWrap",{id:"entry-"+e.id},[o(e,t),r(e,t)])}(e,t))}function r(e,t){return s.default("button",{class:"del",onclick:()=>n(this,void 0,void 0,(function*(){return l.journalController.deleteEntry(e.journal,t)}))},"del")}function o(t,r){return s.default("div",function(t,r){return{id:`entry-${r}-content`,contenteditable:"true",class:"entry breakwrap column",onkeydown:e=>function(e){e.redraw=!1,13!=e.keyCode||e.shiftKey||(e.preventDefault(),e.target.blur())}(e),oninput:r=>function(t,r){let n=l.caretController.getCaretPosition(t.target);e.pos=n?n[1]:null,e.el=t.target,l.entryController.update(r,t.target.innerText)}(r,t),onupdate:t=>function(t){t.redraw=!1,l.caretController.setCaretPosition(e.el,e.pos),e.pos=null,e.el=null}(t),onblur:e=>function(e,t,r){return n(this,void 0,void 0,(function*(){e.redraw=!1,l.entryController.save(t,r,e.target.innerText,!0)}))}(e,t,r)}}(t,r),s.default.trust(t.rendered))}return{view:function(){let e=l.urlController.getActiveShelf(),r=l.urlController.getActiveJournal();return e&&r?s.default("#entriesWrap",s.default("#entries",[s.default(".tempguidancePre","Entries"),t(r)])):null}}}},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(r(0)),s=r(3),l=r(2);t.shelvesComponent=function(){function e(e){return o.default("button",{class:"del",onclick:()=>l.libraryController.removeShelves([e])},"del")}function t(e){return o.default("button",{onclick:()=>l.libraryController.loadShelves(!0,[e])},"retry")}return{view:function(){let r=Array.from(s.libraryModel.shelves.entries());return o.default("#shelvesList",r.map(([r,n])=>function(r,n){return void 0===n?o.default("li",[e(r),o.default("span",r)]):void 0!==n.error?o.default("li",[e(r),o.default("span",`${r} ${n.error}`),t(r)]):o.default("li",[e(r),o.default("a",{href:"#/library/"+r},n.title)])}(r,n)))}}}},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(r(0)),s=r(3),l=r(2);t.refinesComponent=function(){const e=new Set;function t(){if(0!==s.searchModel.simpleRefines.size)return o.default(".tagRefineWrap",[r("Simple Tags",s.searchModel.simpleRefines.size),Array.from(s.searchModel.simpleRefines,([e,t])=>[n(e,t)])])}function r(t,r){return o.default("span",function(t){return{class:"roundTagKey",onclick:r=>function(t,r){if(t.metaKey||t.ctrlKey){if("Simple Tags"===r)return;s.searchModel.refinesQuery.keys.has(r)?s.searchModel.refinesQuery.keys.delete(r):s.searchModel.refinesQuery.keys.add(r)}else e.has(r)?e.delete(r):e.add(r)}(r,t)}}(t),["Simple Tags"===t?[]:o.default("input",{type:"checkbox",checked:s.searchModel.refinesQuery.keys.has(t)}),e.has(t)?o.default("span","▾ "):o.default("span","▿ "),o.default("span",t),o.default("span",` (${r})`)])}function n(e,t){return o.default("div",{class:"tagRefineValWrap"},[o.default("span",i(e,t),[o.default("input",{type:"checkbox",checked:null===t.val?s.searchModel.refinesQuery.simpleKeys.has(t.clean):s.searchModel.refinesQuery.vals.has(t.clean)}),null!==t.val?o.default("span",""+t.cleanVal):o.default("span",`${t.flag}${t.cleanKey}`),o.default("span",` (${t.frq})`)])])}function i(t,r){let n=null===r.val?"simpleTag":"roundTagVal",o="hide";return(null===r.val&&e.has("Simple Tags")||e.has(t)||s.searchModel.refinesQuery.vals.has(r.clean))&&(o=""),{class:`${n} ${o}`,onclick:()=>function(e){null===e.val?s.searchModel.refinesQuery.simpleKeys.has(e.clean)?s.searchModel.refinesQuery.simpleKeys.delete(e.clean):s.searchModel.refinesQuery.simpleKeys.set(e.clean,e):s.searchModel.refinesQuery.vals.has(e.clean)?s.searchModel.refinesQuery.vals.delete(e.clean):s.searchModel.refinesQuery.vals.set(e.clean,e)}(r)}}return{view:function(){let e=l.urlController.getActiveJournal();if(void 0!==e&&!1!==e.loaded)return o.default("#tagsWrap",o.default("#tags",[o.default(".tempguidancePre","Tags"),t(),Array.from(s.searchModel.complexRefines,([e,t])=>o.default(".tagRefineWrap",[r(e,t.length),t.map(t=>[n(e,t)])]))]))}}}},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(r(0)),s=r(2);t.journalsComponent=function(){return{view:function(){return o.default("#journals",function(){let e=s.urlController.getActiveShelf();if(void 0===e)return void s.urlController.redirect("/library");return Array.from(e.journals.values()).map(e=>{let t=`#/library/${e.shelf.id}/${e.id}`;return o.default("li",o.default("a",{href:t},e.title+" "+e.loaded))})}())}}}},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(r(0)),s=r(3),l=r(1),i=r(2);t.syncStateComponent=function(){function e(){let e="",t="syncState "+n();switch(s.syncerModel.state){case l.SyncerState.DOWNLOADING:e="Downloading journal data from drive...";break;case l.SyncerState.PAUSED:e="Warning! - Syncing is paused.";break;case l.SyncerState.SYNCED:e="Cloud synced.";break;case l.SyncerState.UPLOADING:e="Uploading changes to drive...";break;case l.SyncerState.INITIALIZING:e="Initializing..."}return o.default("span",{id:"syncStateText",class:t},e)}function t(){let e="material-icons material-icons-outlined syncState "+n();return o.default("i",{id:"syncStateIcon",class:e},s.syncerModel.state)}function r(){if(s.syncerModel.state===l.SyncerState.PAUSED)return o.default("button",{id:"unpauseSync",class:"syncState",onclick:()=>i.syncerController.unpause()},"Unpause Syncing")}function n(){switch(s.syncerModel.state){case l.SyncerState.PAUSED:return"error";case l.SyncerState.SYNCED:return"okay";default:return"warn"}}return{view:function(){return o.default("#status",o.default("span",o.default("span",[t(),e(),r()])))}}}},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(r(0)),s=r(3),l=r(2);t.searchbarComponent=function(){const e={pos:null,el:null};return{view:function(){let t=l.urlController.getActiveJournal();if(void 0!==t&&!1!==t.loaded)return o.default("#search",[o.default("#searchQuery",{placeholder:"Search for text or tags",contenteditable:"true",class:"entry breakwrap",oninput:t=>function(t){let r=l.caretController.getCaretPosition(t.target);e.pos=r?r[1]:null,e.el=t.target,l.searchController.updateSearchbar(l.textController.escape(t.target.innerText))}(t),onupdate:()=>(l.caretController.setCaretPosition(e.el,e.pos),e.pos=null,void(e.el=null)),onkeydown:e=>function(e){13!=e.keyCode||e.shiftKey||(e.preventDefault(),e.target.blur())}(e)},o.default.trust(s.searchModel.barQuery.rendered)),o.default("button",{id:"clearSearch",class:"del",onclick:()=>l.searchController.updateSearchbar("")},"x")])}}}},function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,s){function l(e){try{a(n.next(e))}catch(e){s(e)}}function i(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(l,i)}a((n=n.apply(e,t||[])).next())}))},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=o(r(0)),l=r(2);t.addShelvesComponent=function(){let e="",t=!1;function r(){return s.default("button",{id:"addShelvesButton",onclick:()=>n(this,void 0,void 0,(function*(){t&&l.libraryController.addShelves(e),e="",t=!t}))},t?" ✓ ":"+/-")}function o(){return t?s.default("textarea",{id:"addShelvesText",placeholder:"Enter list of Google Sheets Spreadsheet URLs here",oninput:t=>e=t.target.value}):null}return{view:function(){return s.default("#addShelves",[r(),o()])}}}},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(r(0)),s=r(2);t.breadcrumbComponent=function(){return{view:function(){return o.default("#breadcrumb",s.urlController.getBreadcrumbTrail())}}}},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(r(0)),s=r(3),l=r(7);t.signinView=function(){return{view:function(){return o.default("#auth",[o.default(l.googleComponent)])},onupdate:function(){s.googleModel.isSignedIn&&(window.location.hash="/library")}}}},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(r(0)),s=r(7);t.libraryView=function(){return{view:function(){return o.default("#library",[o.default(s.googleComponent),o.default(s.syncStateComponent),o.default(s.addShelvesComponent),o.default(s.shelvesComponent)])}}}},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(r(0)),s=r(2),l=r(7);t.journalView=function(){return{view:function(){return o.default("#shelf",[o.default(l.googleComponent),o.default(l.syncStateComponent),o.default(l.breadcrumbComponent),o.default(l.searchbarComponent),o.default(l.refinesComponent),o.default(l.entriesComponent)])},oninit:function(){let e=s.urlController.getActiveJournal();void 0===e||e.loaded||s.journalController.loadEntries(e)}}}}]);
//# sourceMappingURL=dntd.js.map