(this.webpackJsonpnookdata_v2=this.webpackJsonpnookdata_v2||[]).push([[1],{131:function(e,t,a){},133:function(e,t,a){},135:function(e,t,a){},136:function(e,t,a){"use strict";a.r(t);var n,r=a(0),c=a.n(r),i=a(13),o=a.n(i),l=a(55),u=a(18),s=a(19),f=a(183),m=a(184),p=a(176),b=a(9),d=a(45),v=a(72),h=a(91),g="0.1.0";function E(){if(window.localStorage.settings||(window.localStorage.settings=JSON.stringify({theme:"dark",hemisphere:"north",islandName:"ISLAND",playerName:"PLAYER",timeOffset:0,useSystemTime:!0,useTwelveHourTime:!1})),!window.localStorage.critterpedia){for(var e={bugs:[],fish:[]},t=0;t<80;t++)e.bugs.push({obtained:!1,modelled:!1}),e.fish.push({obtained:!1,modelled:!1});window.localStorage.critterpedia=JSON.stringify(e)}window.localStorage.turnips||(window.localStorage.turnips=JSON.stringify({buy:null,mon:{am:null,pm:null},tue:{am:null,pm:null},wed:{am:null,pm:null},thu:{am:null,pm:null},fri:{am:null,pm:null},sat:{am:null,pm:null},previousPattern:h.a.UNKNOWN,firstBuy:!1})),window.localStorage.dataVersion=g}function x(){}!function(e){var t,a;(t||(t=e.PreNumber||(e.PreNumber={}))).upgrade=E,(a||(a=e.ND_0_1_0||(e.ND_0_1_0={}))).upgrade=x}(n||(n={}));var k=a(36),O=Object(r.lazy)((function(){return Promise.all([a.e(0),a.e(5)]).then(a.bind(null,324))})),w=Object(r.lazy)((function(){return Promise.all([a.e(0),a.e(4),a.e(6)]).then(a.bind(null,331))})),j=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function y(e){if("serviceWorker"in navigator){if(new URL("/nookdata_v2",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/nookdata_v2","/service-worker.js");j?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):S(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):S(t,e)}))}}function S(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var N=a(106),A={MuiTextField:{variant:"filled"},MuiSelect:{variant:"filled"},MuiFormControl:{variant:"filled"},MuiDialogTitle:{style:{textAlign:"center"}}},G=(a(85),Object(N.a)({palette:{type:"dark",opacity:.3,elevations:{0:{main:"#1e1e1e"},1:{main:"#292929"},2:{main:"#2e2e2e"},3:{main:"#303030"},4:{main:"#323232"},6:{main:"#373737"},8:{main:"#393939"},12:{main:"#3e3e3e"},16:{main:"#404040"},24:{main:"#424242"}},modelled:{main:"gold",transparent:"rgba(255, 215, 0, 0.3)"},winter:{main:"#3c84c6",transparent:"rgba(60, 132, 198, 0.3)",contrastText:"rgba(0,0,0,87%)"},spring:{main:"#38761c",transparent:"rgba(56, 118, 28, 0.3)",contrastText:"rgba(0,0,0,87%)"},summer:{main:"#e69038",transparent:"rgba(230, 144, 56, 0.3)",contrastText:"rgba(0,0,0,87%)"},autumn:{main:"#b45f04",transparent:"rgba(180, 95, 4, 0.3)",contrastText:"rgba(0,0,0,87%)"},primary:{main:"#bb86fc",contrastText:"rgba(0,0,0,87%)",transparent:"rgba(187, 134, 252, 0.3)"},secondary:{main:"#03dac6",contrastText:"rgba(0,0,0,87%)"},error:{main:"#cf6679",transparent:"rgba(207, 102, 121, 0.3)"},background:{paper:"#1e1e1e",default:"#121212"},text:{primary:"rgba(255,255,255,87%)",secondary:"rgba(255,255,255,60%)",hint:"rgba(255,255,255,60%)",disabled:"rgba(255,255,255,38%)"}},zIndex:{appBar:1250},props:A}));G.overrides={MuiAppBar:{colorPrimary:{backgroundColor:G.palette.background.paper,color:G.palette.primary.main},colorSecondary:{backgroundColor:G.palette.background.paper,color:G.palette.secondary.main},colorDefault:{backgroundColor:G.palette.background.paper,color:G.palette.text.primary}},MuiDrawer:{paper:{width:240}},MuiCard:{root:{borderWidth:1,borderColor:"rgba(255, 255, 255, 8%)",borderStyle:"solid"}},MuiCardHeader:{root:{paddingBottom:0,textAlign:"center"}},MuiListItemIcon:{root:{color:G.palette.text.secondary}}};var T=G,C=Object(N.a)({palette:{type:"light",opacity:.6,elevations:{0:{main:"#ffffff"},1:{main:"#ffffff"},2:{main:"#ffffff"},3:{main:"#ffffff"},4:{main:"#ffffff"},6:{main:"#ffffff"},8:{main:"#ffffff"},12:{main:"#ffffff"},16:{main:"#ffffff"},24:{main:"#ffffff"}},modelled:{main:"#fbc02d",transparent:"rgba(251, 192, 45, 0.5)"},winter:{main:"#3c84c6",transparent:"rgba(60, 132, 198, 0.6)",contrastText:"rgba(0,0,0,87%)"},spring:{main:"#38761c",transparent:"rgba(56, 118, 28, 0.6)",contrastText:"rgba(0,0,0,87%)"},summer:{main:"#e69038",transparent:"rgba(230, 144, 56, 0.6)",contrastText:"rgba(0,0,0,87%)"},autumn:{main:"#b45f04",transparent:"rgba(180, 95, 4, 0.6)",contrastText:"rgba(0,0,0,87%)"},primary:{main:"#6200ee",contrastText:"rgba(255,255,255,87%)",transparent:"rgba(98, 0, 238, 0.5)"},secondary:{main:"#03dac6",contrastText:"rgba(0,0,0,87%)"},error:{main:"#b00020",transparent:"rgba(176, 0, 32, 0.5)"},background:{paper:"#ffffff",default:"#eeeeee"},text:{primary:"rgba(0,0,0,87%)",secondary:"rgba(0,0,0,60%)",hint:"rgba(0,0,0,60%)",disabled:"rgba(0,0,0,38%)"}},zIndex:{appBar:1250},props:A});C.overrides={MuiDrawer:{paper:{width:240}},MuiCard:{root:{borderWidth:1,borderColor:"transparent",borderStyle:"solid"}},MuiCardHeader:{root:{paddingBottom:0,textAlign:"center"}}};var L=C;T.name="dark",L.name="light";var I={light:L,dark:T};function P(){!function(){if(window.localStorage.dataVersion!==g)switch(window.localStorage.dataVersion){case void 0:n.PreNumber.upgrade();break;default:console.log("Please do not mess with your data!")}}();var e=c.a.useState((function(){return JSON.parse(window.localStorage.settings)})),t=Object(s.a)(e,2),a=t[0],i=t[1];function o(e){window.localStorage.settings=JSON.stringify(e),i(e)}var l=c.a.useMemo((function(){return function(e){return I[e]}(a.theme)}),[a]),h=c.a.useState(!1),E=Object(s.a)(h,2),x=E[0],j=E[1],S=c.a.useState(!1),N=Object(s.a)(S,2),A=N[0],G=N[1],T=c.a.useState(!1),C=Object(s.a)(T,2),L=C[0],P=C[1],_=c.a.useState(!1),U=Object(s.a)(_,2),R=U[0],M=U[1];function K(e){console.log("setUpdateReady:",e),j(e),P(e)}function W(e){console.log("setWorksOffline:",e),G(e),M(e)}return c.a.useEffect((function(){y({onUpdate:function(e){return K(!0)},onSuccess:function(e){return W(!0)}})}),[]),c.a.createElement(f.a,{theme:l},c.a.createElement(v.b,null,c.a.createElement(v.a,{settings:a},c.a.createElement(m.a,null),c.a.createElement(d.b,{setTheme:function(e){document.body.classList.add("no-transition"),o(Object(u.a)(Object(u.a)({},a),{},{theme:e})),setTimeout((function(){return document.body.classList.remove("no-transition")}),10)},updateReady:x,worksOffline:A,setWorksOffline:W},c.a.createElement(r.Suspense,{fallback:c.a.createElement(d.f,null)},c.a.createElement(b.d,null,c.a.createElement(b.b,{path:"/critterpedia/:type/:index",render:function(e){var t=e.match,a=t.params.type,n=Object(k.h)(t.params.index,-1);return"bug"!==a&&"fish"!==a||n<0||n>79?c.a.createElement(b.a,{to:"/critterpedia"}):c.a.createElement(O,{load:{type:a,index:n}})}}),c.a.createElement(b.b,{path:"/critterpedia",exact:!0},c.a.createElement(O,null)),c.a.createElement(b.b,{path:"/critterpedia"},c.a.createElement(b.a,{to:"/critterpedia"})),c.a.createElement(b.b,{path:"/turnips"},c.a.createElement(w,null)),c.a.createElement(b.b,{path:"/loading"},c.a.createElement(d.f,null)),c.a.createElement(b.b,{path:"/test"},c.a.createElement(p.a,{onClick:function(){return K(!x)}},"Toggle ",c.a.createElement("code",null,"updateReady")," (currently ",c.a.createElement("code",null,""+x),")"),c.a.createElement(p.a,{onClick:function(){return W(!A)}},"Toggle ",c.a.createElement("code",null,"worksOffline")," (currently ",c.a.createElement("code",null,""+A),")"))))),c.a.createElement(d.i,{open:R,setOpen:M}),c.a.createElement(d.h,{open:L,setOpen:P}))))}var _=a(107),U=a(103),R=a(104),M=a(41);_.a.use(R.a).use(U.a).use(M.e).init({backend:{loadPath:"/nookdata_v2/assets/i18n/{{lng}}/{{ns}}.json"},fallbackLng:"en",debug:!1,interpolation:{escapeValue:!1},supportedLngs:["en","fr"],ns:"core",defaultNS:"core"});a(135);o.a.render(c.a.createElement(r.Suspense,{fallback:c.a.createElement(d.f,null)},c.a.createElement(l.a,{basename:k.g},c.a.createElement(P,null))),document.getElementById("root"))},36:function(e,t,a){"use strict";a.d(t,"e",(function(){return l})),a.d(t,"g",(function(){return u})),a.d(t,"d",(function(){return s})),a.d(t,"h",(function(){return f})),a.d(t,"f",(function(){return m})),a.d(t,"a",(function(){return p})),a.d(t,"b",(function(){return b})),a.d(t,"i",(function(){return d})),a.d(t,"c",(function(){return v}));var n,r=a(14),c=a(10),i=a.n(c),o=i.a.mark(d);function l(e){var t,a=null!==(t=n)&&void 0!==t?t:((n=document.createElement("div")).style.position="absolute",n.style.top="-9999px",n.style.left="-9999px",document.body.appendChild(n),n);return a.innerText=e,a.clientWidth}var u="/nookdata_v2";function s(e,t){return void 0!==e?JSON.parse(e):t}function f(e,t){var a=e?+e:t;return isNaN(a)?t:a}function m(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return void 0===t&&(t=e,e=0,1==a)?Array.from(Array(t).keys()):Array(Math.ceil((t-e)/a)).fill(e).map((function(e,t){return e+t*a}))}function p(e){return e.reduce((function(e,t){return e&&t}),!0)}function b(e){return JSON.parse(JSON.stringify(e))}function d(){var e,t,a,n,r,c=arguments;return i.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:for(e=c.length,t=new Array(e),a=0;a<e;a++)t[a]=c[a];if(!(t.length<1)){o.next=3;break}return o.abrupt("return");case 3:n=i.a.mark((function e(a){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.map((function(e){return e[a]}));case 2:case"end":return e.stop()}}),e)})),r=0;case 5:if(!(r<t.reduce((function(e,t){var a=t.length;return Math.min(e,a)}),1/0))){o.next=10;break}return o.delegateYield(n(r),"t0",7);case 7:r++,o.next=5;break;case 10:case"end":return o.stop()}}),o)}function v(e){var t,a=0,n=0,c=Object(r.a)(e);try{for(c.s();!(t=c.n()).done;){var i=t.value,o=a+i;Math.abs(a)>=Math.abs(i)?n+=a-o+i:n+=i-o+a,a=o}}catch(l){c.e(l)}finally{c.f()}return a+n}},45:function(e,t,a){"use strict";a.d(t,"a",(function(){return h})),a.d(t,"b",(function(){return z})),a.d(t,"c",(function(){return V})),a.d(t,"d",(function(){return $})),a.d(t,"e",(function(){return Q})),a.d(t,"f",(function(){return X})),a.d(t,"g",(function(){return te})),a.d(t,"h",(function(){return ae})),a.d(t,"i",(function(){return ne}));var n=a(166),r=a(167),c=a(163),i=a(99),o=a.n(i),l=a(0),u=a.n(l),s=a(20),f=a(188),m=a(164),p=a(158);function b(){var e=Object(p.a)("service").t,t=Object(s.a)();return u.a.createElement(f.a,{title:e("service:available_update.frame_button"),"aria-label":e("service:available_update.title")},u.a.createElement(c.a,{onClick:function(){return window.location.replace(window.location.href)}},u.a.createElement(m.a,{style:{color:t.palette.success.main}})))}var d=a(165);function v(e){var t=e.setStatus,a=Object(p.a)("service").t;return u.a.createElement(f.a,{title:a("service:available_offline.frame_button")},u.a.createElement(c.a,{onClick:function(){return t(!1)}},u.a.createElement(d.a,null)))}var h=function(e){return u.a.createElement(u.a.Fragment,null,u.a.createElement(n.a,{position:"fixed"},u.a.createElement(r.a,null,u.a.createElement(c.a,{edge:"start",color:"inherit","aria-label":"menu",style:{marginRight:16},onClick:function(){return e.setDrawerOpen(!e.drawerOpen)}},u.a.createElement(o.a,null)),u.a.createElement("div",{style:{flexGrow:1}},e.title),e.updateReady&&u.a.createElement(b,null),e.worksOffline&&u.a.createElement(v,{setStatus:e.setWorksOffline}))),u.a.createElement(r.a,null))},g=a(19),E=a(179),x=a(58),k=a(174),O=a(168),w=a(180),j=a(170),y=a(177),S=a(178),N=a(181),A=a(182),G=a(101),T=a.n(G),C=a(102),L=a.n(C),I=a(169),P=a(189),_=a(171),U=a(172),R=a(173),M=a(175),K=a(176),W=a(187),D={branch:"master",tags:[],commit:{shortHash:"ef0299c",hash:"ef0299cc30422ff05454ef1c68a41dbf105f35ad",date:"2021-06-06T22:24:44+01:00",message:"Drop Graph into its own component, data table comes soon\nALL PATTERNS :D"}};function F(e){var t=e.name,a=e.avatarUrl,n=e.t;return u.a.createElement(f.a,{title:n("core:info.contrib.tooltip",{name:t})},u.a.createElement(O.a,{style:{padding:"8px 32px"},button:!0,component:"a",href:"https://github.com/Starwort/nookdata_v2/commits?author=".concat(t),target:"_blank"},u.a.createElement(I.a,null,u.a.createElement(P.a,{alt:n("core:alt.avatar",{name:t}),src:a})),u.a.createElement(j.a,{primary:t,secondary:n("core:info.contrib.".concat(t.toLowerCase()))})))}function Y(e){var t=Object(p.a)("core").t,a=Object(s.a)();return u.a.createElement(_.a,{open:e.open,onClose:function(){return e.setOpen(!1)}},u.a.createElement(U.a,null,t("core:info.title")),u.a.createElement(R.a,null,u.a.createElement(W.a,{i18nKey:"core:info.description",t:t},"You are currently viewing NookData revision",u.a.createElement("a",{href:"https://github.com/Starwort/nookdata_v2/commit/".concat(D.commit.hash),style:{color:a.palette.primary.main,textUnderlineOffset:2}},{gitRevision:D.commit.shortHash}),"."),u.a.createElement("br",null),u.a.createElement("br",null),u.a.createElement(V,null,u.a.createElement(x.a,{variant:"subtitle1"},t("core:info.contrib.title"))),u.a.createElement(V,null,u.a.createElement(x.a,{variant:"subtitle2"},t("core:info.contrib.subtitle")))),u.a.createElement(k.a,null,u.a.createElement(F,{name:"Starwort",avatarUrl:"https://avatars.githubusercontent.com/u/16487249",t:t}),u.a.createElement(F,{name:"EloLeChan",avatarUrl:"https://avatars.githubusercontent.com/u/83836335",t:t})),u.a.createElement(M.a,null,u.a.createElement(K.a,{onClick:function(){return e.setOpen(!1)}},t("core:ui.dismiss"))))}function J(e){var t=Object(p.a)("core").t;return u.a.createElement(_.a,{"aria-labelledby":"lang-dialogue-title",open:e.open,PaperProps:{style:{width:250}}},u.a.createElement(U.a,{style:{textAlign:"center"},id:"lang-dialogue-title"},t("core:lang.choose")),u.a.createElement(k.a,null,u.a.createElement(O.a,{style:{textAlign:"center"},button:!0,onClick:function(){return e.setLang("en")}},u.a.createElement(j.a,{primary:t("core:lang.en")})),u.a.createElement(O.a,{style:{textAlign:"center"},button:!0,onClick:function(){return e.setLang("fr")}},u.a.createElement(j.a,{primary:t("core:lang.fr")}))))}var B={"/critterpedia":{title:"core:pages.critterpedia",icon:u.a.createElement(y.a,null)},"/turnips":{title:"core:pages.turnips",icon:u.a.createElement(S.a,null)}},H=10;function z(e){var t=Object(s.a)(),a=Object(E.a)(t.breakpoints.up("lg")),n=u.a.useState(!1),r=Object(g.a)(n,2),c=r[0],i=r[1];H&&(console.log(H,a),a&&!c?(H=0,i(!0)):H--);var o=Object(p.a)("core"),l=o.t,f=o.i18n,m=u.a.useState(!1),b=Object(g.a)(m,2),d=b[0],v=b[1],y=u.a.useState(!1),S=Object(g.a)(y,2),G=S[0],C=S[1],I="dark"===t.name?"light":"dark";return u.a.createElement(u.a.Fragment,null,u.a.createElement(h,{setDrawerOpen:i,drawerOpen:c,title:u.a.createElement(x.a,{variant:"h6"},u.a.createElement("div",{style:{color:t.palette.winter.main,display:"inline"}},l("title.a")),u.a.createElement("div",{style:{color:t.palette.summer.main,display:"inline"}},l("title.b"))),updateReady:e.updateReady,worksOffline:e.worksOffline,setWorksOffline:e.setWorksOffline}),u.a.createElement(te,{open:c,setOpen:i},u.a.createElement(k.a,null,Object.entries(B).map((function(e){var t=Object(g.a)(e,2),a=t[0],n=t[1];return u.a.createElement(Q,{key:a,to:a,icon:n.icon,primary:l(n.title)})}))),u.a.createElement("div",{style:{flexGrow:1}}),u.a.createElement(O.a,{button:!0,onClick:function(){return C(!0)}},u.a.createElement(w.a,null,u.a.createElement(N.a,null)),u.a.createElement(j.a,{primary:l("core:sidebar.about")})),u.a.createElement(O.a,{button:!0,onClick:function(){return v(!0)}},u.a.createElement(w.a,null,u.a.createElement(A.a,null)),u.a.createElement(j.a,{primary:l("core:sidebar.lang")})),u.a.createElement(O.a,{button:!0,onClick:function(){return e.setTheme(I)}},u.a.createElement(w.a,null,"dark"===I?u.a.createElement(T.a,null):u.a.createElement(L.a,null)),u.a.createElement(j.a,{primary:l("core:sidebar.theme")}))),u.a.createElement(J,{open:d,setLang:function(e){f.changeLanguage(e),v(!1)}}),u.a.createElement(Y,{open:G,setOpen:C}),u.a.createElement($,{active:c},e.children))}a(131);function V(e){return u.a.createElement("div",{className:"centred"},e.children)}function $(e){var t=Object(s.a)(),a=Object(E.a)(t.breakpoints.up("sm"));return u.a.createElement("div",{style:{paddingLeft:240*+e.active*+a,transition:"padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms"}},e.children)}var q=a(55);function Q(e){var t=e.icon,a=e.primary,n=e.to,r=e.exact,c=u.a.useMemo((function(){return u.a.forwardRef((function(e,t){return u.a.createElement(q.b,Object.assign({to:n,ref:t},e,{activeClassName:"Mui-selected",exact:r}))}))}),[n]);return u.a.createElement(O.a,{button:!0,component:c},t?u.a.createElement(w.a,null,t):null,u.a.createElement(j.a,{primary:a}))}a(133);function X(){var e=Object(s.a)();return u.a.createElement("video",{autoPlay:!0,loop:!0,muted:!0,playsInline:!0,className:"loader ".concat(e.name)},u.a.createElement("source",{src:"assets/shared/loading.gif.webm",type:"video/webm"}),u.a.createElement("source",{src:"assets/shared/loading.gif.mp4",type:"video/mp4"}))}var Z=a(186),ee=a(190);var te=function(e){var t=Object(s.a)(),a=void 0!==window?function(){return window.document.body}:void 0;return u.a.createElement(u.a.Fragment,null,u.a.createElement(Z.a,{smUp:!0},u.a.createElement(ee.a,{variant:"temporary",container:a,anchor:"rtl"===t.direction?"right":"left",open:e.open,onClose:function(){return e.setOpen(!1)}},e.children)),u.a.createElement(Z.a,{xsDown:!0},u.a.createElement(ee.a,{variant:"persistent",anchor:"rtl"===t.direction?"right":"left",open:e.open},u.a.createElement(r.a,null),e.children)))};function ae(e){var t=Object(p.a)(["service","core"]).t;return u.a.createElement(_.a,{open:e.open,onClose:function(){return e.setOpen(!1)}},u.a.createElement(U.a,null,t("service:available_update.title")),u.a.createElement(R.a,null,t("service:available_update.content")),u.a.createElement(M.a,null,u.a.createElement(K.a,{variant:"text",onClick:function(){return window.location.replace(window.location.href)}},t("service:available_update.reload")),u.a.createElement(K.a,{variant:"text",onClick:function(){return e.setOpen(!1)}},t("core:ui.dismiss"))))}function ne(e){var t=Object(p.a)(["service","core"]).t;return u.a.createElement(_.a,{open:e.open,onClose:function(){return e.setOpen(!1)}},u.a.createElement(U.a,null,t("service:available_offline.title")),u.a.createElement(R.a,null,t("service:available_offline.content")),u.a.createElement(M.a,null,u.a.createElement(K.a,{variant:"text",onClick:function(){return e.setOpen(!1)}},t("core:ui.dismiss"))))}},72:function(e,t,a){"use strict";a.d(t,"b",(function(){return s})),a.d(t,"a",(function(){return f})),a.d(t,"c",(function(){return m}));var n=a(19),r=a(0),c=a.n(r),i={theme:"dark",hemisphere:"north",islandName:"Gloverboia",playerName:"Starwort",timeOffset:0,useSystemTime:!0,useTwelveHourTime:!0},o=new Date,l=c.a.createContext(i),u=c.a.createContext(o);function s(e){var t=e.interval,a=e.children,r=c.a.useState(o),i=Object(n.a)(r,2),l=i[0],s=i[1];return c.a.useEffect((function(){var e=window.setInterval((function(){return s(new Date)}),null!==t&&void 0!==t?t:500);return function(){window.clearInterval(e)}}),[t]),c.a.createElement(u.Provider,{value:l},a)}function f(e){var t=e.settings,a=e.children;return c.a.createElement(l.Provider,{value:t},a)}function m(){return{time:Object(r.useContext)(u),settings:Object(r.useContext)(l)}}},85:function(e,t,a){"use strict";String.prototype.capitalise=function(){return this.charAt(0).toUpperCase()+this.slice(1)},Array.prototype.rotated=function(e){return e%=this.length,this.slice(e,this.length).concat(this.slice(0,e))},Array.prototype.rotate=function(e){for(e%=this.length;this.length&&e<0;)e+=this.length;return this.push.apply(this,this.splice(0,e)),this}},91:function(e,t,a){"use strict";a.d(t,"a",(function(){return u})),a.d(t,"c",(function(){return Q})),a.d(t,"b",(function(){return X})),a.d(t,"e",(function(){return Z})),a.d(t,"d",(function(){return ee})),a.d(t,"f",(function(){return te}));var n,r,c,i,o,l,u,s=a(18),f=a(19),m=a(21),p=a(14),b=a(10),d=a.n(b),v=a(6),h=a(36),g=d.a.mark(_),E=d.a.mark(U),x=d.a.mark(K),k=d.a.mark(W),O=d.a.mark(D),w=d.a.mark(F),j=d.a.mark(Y),y=d.a.mark(J),S=d.a.mark(B),N=d.a.mark(H),A=d.a.mark(z);function G(e,t,a){var n=(e+t)/2*a+.5;return{min:e=Math.ceil(e*a),max:t=Math.ceil(t*a),avg:n}}function T(e,t){return null===t||e.min<=t&&t<=e.max}!function(e){e[e.FLUCTUATING=0]="FLUCTUATING",e[e.LARGE_SPIKE=1]="LARGE_SPIKE",e[e.DECREASING=2]="DECREASING",e[e.SMALL_SPIKE=3]="SMALL_SPIKE",e[e.UNKNOWN=4]="UNKNOWN",e[e.AGGREGATE=5]="AGGREGATE"}(u||(u={}));var C=(n={},Object(v.a)(n,u.FLUCTUATING,.2),Object(v.a)(n,u.LARGE_SPIKE,.5),Object(v.a)(n,u.DECREASING,.25),Object(v.a)(n,u.SMALL_SPIKE,.45),Object(v.a)(n,u.UNKNOWN,.25),Object(v.a)(n,u.AGGREGATE,.25),n),L=(r={},Object(v.a)(r,u.FLUCTUATING,.3),Object(v.a)(r,u.LARGE_SPIKE,.05),Object(v.a)(r,u.DECREASING,.45),Object(v.a)(r,u.SMALL_SPIKE,.25),Object(v.a)(r,u.UNKNOWN,.25),Object(v.a)(r,u.AGGREGATE,.25),r),I=(c={},Object(v.a)(c,u.FLUCTUATING,.15),Object(v.a)(c,u.LARGE_SPIKE,.2),Object(v.a)(c,u.DECREASING,.05),Object(v.a)(c,u.SMALL_SPIKE,.15),Object(v.a)(c,u.UNKNOWN,.25),Object(v.a)(c,u.AGGREGATE,.25),c),P=(i={},Object(v.a)(i,u.FLUCTUATING,.35),Object(v.a)(i,u.LARGE_SPIKE,.25),Object(v.a)(i,u.DECREASING,.25),Object(v.a)(i,u.SMALL_SPIKE,.15),Object(v.a)(i,u.UNKNOWN,.25),Object(v.a)(i,u.AGGREGATE,.25),i);function _(e,t,a,n){var r;return d.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:if(T(r=G(a,n,e),t)){c.next=3;break}return c.abrupt("return");case 3:return c.next=5,t?{min:t,max:t,avg:t}:r;case 5:case"end":return c.stop()}}),g)}function U(e,t,a,n,r,c){var i,o;return d.a.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:if(i=G(r,c,e),o=t.slice(a,a+n),Object(h.a)(o.map((function(e){return T(i,e)})))){l.next=4;break}return l.abrupt("return");case 4:return l.next=6,o.map((function(e){return e?{min:e,max:e,avg:e}:i}));case 6:case"end":return l.stop()}}),E)}function R(e,t){return(t-1)/e}function M(e,t){return t/e}function K(e,t,a,n,r,c,i,o){var l,u,s,f,m,p,b,v,h,g;return d.a.wrap((function(d){for(;;)switch(d.prev=d.next){case 0:l=t.slice(a,a+n),u=[],s=[r],f=[c],m=!1,p=0;case 6:if(!(p<n)){d.next=25;break}if(!(b=l[p])){d.next=19;break}if(v=R(e,b),!((h=M(e,b))<s[p]||v>f[p])){d.next=13;break}return d.abrupt("return");case 13:u.push({min:b,max:b,avg:b}),s[p]=v,f[p]=h,m=!0,d.next=20;break;case 19:u.push(G(s[p],f[p],e));case 20:s.push(s[p]-o),f.push(f[p]-i);case 22:p++,d.next=6;break;case 25:if(m)for(g=n-2;g>=0;g--)s[g]<s[g+1]&&(s[g]=s[g+1]+i,u[g].min=Math.ceil(s[g]*e),u[g].avg=(s[g]+f[g])/2*e+.5);return d.next=28,u;case 28:case"end":return d.stop()}}),x)}function W(e,t,a){var n,r,c,i,o,l,s,f,b,v,h,g,E,x,O,w,j,y,S,N,A,G,T;return d.a.wrap((function(d){for(;;)switch(d.prev=d.next){case 0:n=e/14,r=0;case 2:if(!(r<=6)){d.next=96;break}c=7-r,i=Object(p.a)(U(t,a,1,r,.9,1.4)),d.prev=5,i.s();case 7:if((o=i.n()).done){d.next=85;break}l=o.value,s=0,f=[2,3];case 10:if(!(s<f.length)){d.next=83;break}b=f[s],v=5-b,h=Object(p.a)(K(t,a,1+r,b,.6,.8,.04,.1)),d.prev=14,h.s();case 16:if((g=h.n()).done){d.next=72;break}E=g.value,x=0;case 19:if(!(x<c)){d.next=70;break}O=Object(p.a)(U(t,a,1+r+b,c-x,.9,1.4)),d.prev=21,O.s();case 23:if((w=O.n()).done){d.next=59;break}j=w.value,y=Object(p.a)(K(t,a,8+b-x,v,.6,.8,.04,.1)),d.prev=26,y.s();case 28:if((S=y.n()).done){d.next=49;break}N=S.value,A=Object(p.a)(U(t,a,13-x,x,.9,1.4)),d.prev=31,A.s();case 33:if((G=A.n()).done){d.next=39;break}return T=G.value,d.next=37,{pattern:u.FLUCTUATING,chance:n/c,hours:[{min:t,max:t,avg:t}].concat(Object(m.a)(l),Object(m.a)(E),Object(m.a)(j),Object(m.a)(N),Object(m.a)(T))};case 37:d.next=33;break;case 39:d.next=44;break;case 41:d.prev=41,d.t0=d.catch(31),A.e(d.t0);case 44:return d.prev=44,A.f(),d.finish(44);case 47:d.next=28;break;case 49:d.next=54;break;case 51:d.prev=51,d.t1=d.catch(26),y.e(d.t1);case 54:return d.prev=54,y.f(),d.finish(54);case 57:d.next=23;break;case 59:d.next=64;break;case 61:d.prev=61,d.t2=d.catch(21),O.e(d.t2);case 64:return d.prev=64,O.f(),d.finish(64);case 67:x++,d.next=19;break;case 70:d.next=16;break;case 72:d.next=77;break;case 74:d.prev=74,d.t3=d.catch(14),h.e(d.t3);case 77:return d.prev=77,h.f(),d.finish(77);case 80:s++,d.next=10;break;case 83:d.next=7;break;case 85:d.next=90;break;case 87:d.prev=87,d.t4=d.catch(5),i.e(d.t4);case 90:return d.prev=90,i.f(),d.finish(90);case 93:r++,d.next=2;break;case 96:case"end":return d.stop()}}),k,null,[[5,87,90,93],[14,74,77,80],[21,61,64,67],[26,51,54,57],[31,41,44,47]])}function D(e,t){var a;return d.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(null===t[0]){n.next=4;break}return n.delegateYield(W(e,t[0],t),"t0",2);case 2:n.next=10;break;case 4:a=90;case 5:if(!(a<=110)){n.next=10;break}return n.delegateYield(W(e/21,a,t),"t1",7);case 7:a++,n.next=5;break;case 10:case"end":return n.stop()}}),O)}function F(e,t,a){var n,r,c,i,o,l,s,f,b,v,h,g,E,x,k,O,j,y,S,N,A,G;return d.a.wrap((function(d){for(;;)switch(d.prev=d.next){case 0:n=1;case 1:if(!(n<=7)){d.next=112;break}r=Object(p.a)(K(t,a,1,n,.85,.9,.03,.05)),d.prev=3,r.s();case 5:if((c=r.n()).done){d.next=101;break}i=c.value,o=Object(p.a)(_(t,a[1+n],.9,1.4)),d.prev=8,o.s();case 10:if((l=o.n()).done){d.next=91;break}s=l.value,f=Object(p.a)(_(t,a[2+n],1.4,2)),d.prev=13,f.s();case 15:if((b=f.n()).done){d.next=81;break}v=b.value,h=Object(p.a)(_(t,a[3+n],2,6)),d.prev=18,h.s();case 20:if((g=h.n()).done){d.next=71;break}E=g.value,x=Object(p.a)(_(t,a[4+n],1.4,2)),d.prev=23,x.s();case 25:if((k=x.n()).done){d.next=61;break}O=k.value,j=Object(p.a)(_(t,a[5+n],.9,1.4)),d.prev=28,j.s();case 30:if((y=j.n()).done){d.next=51;break}S=y.value,N=Object(p.a)(U(t,a,6+n,7-n,.4,.9)),d.prev=33,N.s();case 35:if((A=N.n()).done){d.next=41;break}return G=A.value,d.next=39,{pattern:u.LARGE_SPIKE,chance:e/7,hours:[{min:t,max:t,avg:t}].concat(Object(m.a)(i),[s,v,E,O,S],Object(m.a)(G))};case 39:d.next=35;break;case 41:d.next=46;break;case 43:d.prev=43,d.t0=d.catch(33),N.e(d.t0);case 46:return d.prev=46,N.f(),d.finish(46);case 49:d.next=30;break;case 51:d.next=56;break;case 53:d.prev=53,d.t1=d.catch(28),j.e(d.t1);case 56:return d.prev=56,j.f(),d.finish(56);case 59:d.next=25;break;case 61:d.next=66;break;case 63:d.prev=63,d.t2=d.catch(23),x.e(d.t2);case 66:return d.prev=66,x.f(),d.finish(66);case 69:d.next=20;break;case 71:d.next=76;break;case 73:d.prev=73,d.t3=d.catch(18),h.e(d.t3);case 76:return d.prev=76,h.f(),d.finish(76);case 79:d.next=15;break;case 81:d.next=86;break;case 83:d.prev=83,d.t4=d.catch(13),f.e(d.t4);case 86:return d.prev=86,f.f(),d.finish(86);case 89:d.next=10;break;case 91:d.next=96;break;case 93:d.prev=93,d.t5=d.catch(8),o.e(d.t5);case 96:return d.prev=96,o.f(),d.finish(96);case 99:d.next=5;break;case 101:d.next=106;break;case 103:d.prev=103,d.t6=d.catch(3),r.e(d.t6);case 106:return d.prev=106,r.f(),d.finish(106);case 109:n++,d.next=1;break;case 112:case"end":return d.stop()}}),w,null,[[3,103,106,109],[8,93,96,99],[13,83,86,89],[18,73,76,79],[23,63,66,69],[28,53,56,59],[33,43,46,49]])}function Y(e,t){var a;return d.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(null===t[0]){n.next=4;break}return n.delegateYield(F(e,t[0],t),"t0",2);case 2:n.next=10;break;case 4:a=90;case 5:if(!(a<=110)){n.next=10;break}return n.delegateYield(F(e/21,a,t),"t1",7);case 7:a++,n.next=5;break;case 10:case"end":return n.stop()}}),j)}function J(e,t,a){var n,r,c;return d.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:n=Object(p.a)(K(t,a,1,12,.85,.9,.03,.05)),i.prev=1,n.s();case 3:if((r=n.n()).done){i.next=9;break}return c=r.value,i.next=7,{pattern:u.DECREASING,chance:e,hours:[{rawMin:t,rawMax:t,min:t,max:t,avg:t}].concat(Object(m.a)(c))};case 7:i.next=3;break;case 9:i.next=14;break;case 11:i.prev=11,i.t0=i.catch(1),n.e(i.t0);case 14:return i.prev=14,n.f(),i.finish(14);case 17:case"end":return i.stop()}}),y,null,[[1,11,14,17]])}function B(e,t){var a;return d.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(null===t[0]){n.next=4;break}return n.delegateYield(J(e,t[0],t),"t0",2);case 2:n.next=10;break;case 4:a=90;case 5:if(!(a<=110)){n.next=10;break}return n.delegateYield(J(e/21,a,t),"t1",7);case 7:a++,n.next=5;break;case 10:case"end":return n.stop()}}),S)}function H(e,t,a){var n,r,c,i,o,l,s,b,v,h,g,E,x,k,O,w,j;return d.a.wrap((function(d){for(;;)switch(d.prev=d.next){case 0:n=0;case 1:if(!(n<=7)){d.next=74;break}r=Object(p.a)(K(t,a,1,n,.4,.9,.03,.05)),d.prev=3,r.s();case 5:if((c=r.n()).done){d.next=63;break}i=c.value,o=Object(p.a)(U(t,a,1+n,2,.9,1.4)),d.prev=8,o.s();case 10:if((l=o.n()).done){d.next=53;break}s=l.value,b=Object(p.a)(U(t,a,3+n,3,1.4,2)),d.prev=13,b.s();case 15:if((v=b.n()).done){d.next=43;break}h=v.value,g=Object(f.a)(h,3),E=g[0],x=g[1],k=g[2],E.min-=1,E.max-=1,E.avg-=1,k.min-=1,k.max-=1,k.avg-=1,O=Object(p.a)(K(t,a,6+n,7-n,.4,.9,.03,.05)),d.prev=25,O.s();case 27:if((w=O.n()).done){d.next=33;break}return j=w.value,d.next=31,{pattern:u.SMALL_SPIKE,chance:e/8,hours:[{min:t,max:t,avg:t}].concat(Object(m.a)(i),Object(m.a)(s),[E,x,k],Object(m.a)(j))};case 31:d.next=27;break;case 33:d.next=38;break;case 35:d.prev=35,d.t0=d.catch(25),O.e(d.t0);case 38:return d.prev=38,O.f(),d.finish(38);case 41:d.next=15;break;case 43:d.next=48;break;case 45:d.prev=45,d.t1=d.catch(13),b.e(d.t1);case 48:return d.prev=48,b.f(),d.finish(48);case 51:d.next=10;break;case 53:d.next=58;break;case 55:d.prev=55,d.t2=d.catch(8),o.e(d.t2);case 58:return d.prev=58,o.f(),d.finish(58);case 61:d.next=5;break;case 63:d.next=68;break;case 65:d.prev=65,d.t3=d.catch(3),r.e(d.t3);case 68:return d.prev=68,r.f(),d.finish(68);case 71:n++,d.next=1;break;case 74:case"end":return d.stop()}}),N,null,[[3,65,68,71],[8,55,58,61],[13,45,48,51],[25,35,38,41]])}function z(e,t){var a;return d.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(null===t[0]){n.next=4;break}return n.delegateYield(H(e,t[0],t),"t0",2);case 2:n.next=10;break;case 4:a=90;case 5:if(!(a<=110)){n.next=10;break}return n.delegateYield(H(e/21,a,t),"t1",7);case 7:a++,n.next=5;break;case 10:case"end":return n.stop()}}),A)}function V(e){return[e.buy,e.mon.am,e.mon.pm,e.tue.am,e.tue.pm,e.wed.am,e.wed.pm,e.thu.am,e.thu.pm,e.fri.am,e.fri.pm,e.sat.am,e.sat.pm]}var $=[90,36,32,27,23,18,14,9,27,23,18,14,9],q=[110,154,154,220,660,660,660,660,660,660,660,220,219];function Q(e){var t,a=Object(p.a)(Object(h.i)($,q,V(e)));try{for(a.s();!(t=a.n()).done;){var n=Object(f.a)(t.value,3),r=n[0],c=n[1],i=n[2];if(null!==i&&(i<r||i>c))return!1}}catch(o){a.e(o)}finally{a.f()}return!0}function X(e){if(!Q(e))return[];var t=C[e.previousPattern],a=L[e.previousPattern],n=I[e.previousPattern],r=P[e.previousPattern],c=V(e);return function(e){if(!e.length)return e;var t=Object(h.c)(e.map((function(e){return e.chance}))),a=e.map((function(e){return Object(s.a)(Object(s.a)({},e),{},{chance:e.chance/t})})),n=a.reduce((function(e,t){var a,n=[],r=Object(p.a)(Object(h.i)(e,t.hours));try{for(r.s();!(a=r.n()).done;){var c=Object(f.a)(a.value,2),i=c[0],o=c[1];n.push({min:Math.min(i.min,o.min),max:Math.max(i.max,o.max),sum:i.sum+o.avg*t.chance})}}catch(l){r.e(l)}finally{r.f()}return n}),Object(h.f)(13).map((function(e){return{min:1/0,max:0,sum:0}})));return a.push({pattern:u.AGGREGATE,chance:1,hours:n.map((function(e){return{min:e.min,max:e.max,avg:e.sum,rawMin:0,rawMax:0}}))}),a.sort((function(e,t){return t.chance-e.chance}))}([].concat(Object(m.a)(D(t,c)),Object(m.a)(Y(a,c)),Object(m.a)(B(n,c)),Object(m.a)(z(r,c))))}function Z(e){if(!Q(e))return u.UNKNOWN;var t=C[e.previousPattern],a=C[e.previousPattern],n=C[e.previousPattern],r=C[e.previousPattern],c=V(e);switch([!D(t,c).next().done,!Y(a,c).next().done,!B(n,c).next().done,!z(r,c).next().done]){case[!0,!1,!1,!1]:return u.FLUCTUATING;case[!1,!0,!1,!1]:return u.LARGE_SPIKE;case[!1,!1,!0,!1]:return u.DECREASING;case[!1,!1,!1,!0]:return u.SMALL_SPIKE;default:return u.UNKNOWN}}var ee={buy:null,mon:{am:null,pm:null},tue:{am:null,pm:null},wed:{am:null,pm:null},thu:{am:null,pm:null},fri:{am:null,pm:null},sat:{am:null,pm:null},previousPattern:u.UNKNOWN,firstBuy:!1},te={dark:(o={},Object(v.a)(o,u.AGGREGATE,(function(e){return"rgba(255, 255, 255, ".concat(e,")")})),Object(v.a)(o,u.FLUCTUATING,(function(e){return"rgba(255, 0, 0, ".concat(e,")")})),Object(v.a)(o,u.LARGE_SPIKE,(function(e){return"rgba(0, 255, 0, ".concat(e,")")})),Object(v.a)(o,u.DECREASING,(function(e){return"rgba(0, 255, 255, ".concat(e,")")})),Object(v.a)(o,u.SMALL_SPIKE,(function(e){return"rgba(127, 0, 255, ".concat(e,")")})),Object(v.a)(o,u.UNKNOWN,(function(e){throw new Error("wtf")})),o),light:(l={},Object(v.a)(l,u.AGGREGATE,(function(e){return"rgba(0, 0, 0, ".concat(e,")")})),Object(v.a)(l,u.FLUCTUATING,(function(e){return"rgba(255, 0, 0, ".concat(e,")")})),Object(v.a)(l,u.LARGE_SPIKE,(function(e){return"rgba(0, 255, 0, ".concat(e,")")})),Object(v.a)(l,u.DECREASING,(function(e){return"rgba(0, 255, 255, ".concat(e,")")})),Object(v.a)(l,u.SMALL_SPIKE,(function(e){return"rgba(127, 0, 255, ".concat(e,")")})),Object(v.a)(l,u.UNKNOWN,(function(e){throw new Error("wtf")})),l)}}},[[136,2,3]]]);
//# sourceMappingURL=main.f0a4c24d.chunk.js.map