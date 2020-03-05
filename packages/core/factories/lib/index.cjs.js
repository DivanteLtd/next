"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@vue-storefront/utils"),t=require("@vue/composition-api");function r(e,t){var r,n,o,u,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return u={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function i(u){return function(i){return function(u){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&u[0]?n.return:u[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,u[1])).done)return o;switch(n=0,o&&(u=[2&u[0],o.value]),u[0]){case 0:case 1:o=u;break;case 4:return a.label++,{value:u[1],done:!1};case 5:a.label++,n=u[1],u=[0];continue;case 7:u=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===u[0]||2===u[0])){a=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){a.label=u[1];break}if(6===u[0]&&a.label<o[1]){a.label=o[1],o=u;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(u);break}o[2]&&a.ops.pop(),a.trys.pop();continue}u=t.call(e,a)}catch(e){u=[6,e],n=0}finally{r=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,i])}}}exports.useCategoryFactory=function(n){return function(o){var u=this,a=e.usePersistedState(o),i=a.state,c=a.persistedResource,l=t.ref(i||[]),s=t.ref(!1);return{search:function(e){return t=u,o=void 0,f=function(){var t;return r(this,(function(r){switch(r.label){case 0:return i||(s.value=!0),t=l,[4,c(n.categorySearch,e)];case 1:return t.value=r.sent(),s.value=!1,[2]}}))},new((a=void 0)||(a=Promise))((function(e,r){function n(e){try{i(f.next(e))}catch(e){r(e)}}function u(e){try{i(f.throw(e))}catch(e){r(e)}}function i(t){t.done?e(t.value):new a((function(e){e(t.value)})).then(n,u)}i((f=f.apply(t,o||[])).next())}));
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var t,o,a,f},loading:t.computed((function(){return s.value})),categories:t.computed((function(){return l.value}))}}};
