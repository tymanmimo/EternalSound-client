(()=>{var e={};e.id=931,e.ids=[931],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},9491:e=>{"use strict";e.exports=require("assert")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},5736:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>o.a,__next_app__:()=>p,originalPathname:()=>d,pages:()=>u,routeModule:()=>h,tree:()=>c});var a=r(482),s=r(9108),n=r(2563),o=r.n(n),i=r(8300),l={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>i[e]);r.d(t,l);let c=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,1136)),"D:\\Projects\\EternalSound\\client\\src\\app\\page.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,3881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,1086)),"D:\\Projects\\EternalSound\\client\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9361,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,3881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],u=["D:\\Projects\\EternalSound\\client\\src\\app\\page.tsx"],d="/page",p={require:r,loadChunk:()=>Promise.resolve()},h=new a.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},3898:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2583,23)),Promise.resolve().then(r.t.bind(r,6840,23)),Promise.resolve().then(r.t.bind(r,8771,23)),Promise.resolve().then(r.t.bind(r,3225,23)),Promise.resolve().then(r.t.bind(r,9295,23)),Promise.resolve().then(r.t.bind(r,3982,23))},9587:(e,t,r)=>{Promise.resolve().then(r.bind(r,9749)),Promise.resolve().then(r.bind(r,3360))},2288:(e,t,r)=>{Promise.resolve().then(r.bind(r,3148))},7434:(e,t,r)=>{"use strict";r.d(t,{Z:()=>o});var a=r(2295),s=r(2135),n=r.n(s);let o=()=>a.jsx("div",{className:n().container,children:a.jsx("h1",{children:"Loading..."})})},9749:(e,t,r)=>{"use strict";let a;r.r(t),r.d(t,{AudioContext:()=>i,default:()=>c,useAudioContext:()=>l});var s=r(2295),n=r(3608),o=r(3729);let i=(0,o.createContext)(void 0),l=()=>{let e=(0,o.useContext)(i);if(!e)throw Error("useAudioContext must be used within an AudioProvider");return e},c=({children:e})=>{let[t,r]=(0,o.useState)([]),[l,c]=(0,o.useState)(!1),[u,d]=(0,o.useState)({id:-1,videoId:"",preview:"",title:"",artist:"",duration:0}),[p,h]=(0,o.useState)(!0),[x,g]=(0,o.useState)(!1),[m,v]=(0,o.useState)(!1),[y,w]=(0,o.useState)("");a&&a.addEventListener("canplaythrough",()=>{a.play()});let j=async(e,r)=>{if(h(!1),""!=e.videoId){if(console.log(t),u.videoId!==e.videoId)try{let t=await n.Z.get("http://localhost:3001/mapi/getSong",{params:{videoId:e.videoId},withCredentials:!0});a.pause(),a.currentTime=0,a.src=t.data.url,v(!0),w(r),d(e);return}catch(e){console.error("Ошибка при выполнении запроса:",e)}m?(a.pause(),v(!1)):(v(!0),a.play())}},f=async()=>{if(a.pause(),x&&a.currentTime==a.duration){a.currentTime=0,a.play();return}if(u.id==t.length)try{let e=await n.Z.get("http://localhost:3001/mapi/getSong",{params:{videoId:t[0].videoId},withCredentials:!0});a.src=e.data.url,d(t[0])}catch(e){console.error("Ошибка при выполнении запроса:",e)}else try{let e=await n.Z.get("http://localhost:3001/mapi/getSong",{params:{videoId:t[u.id].videoId},withCredentials:!0});a.src=e.data.url,d(t[u.id])}catch(e){console.error("Ошибка при выполнении запроса:",e)}v(!0)},P=async()=>{-1!=u.id&&f()},_=async()=>{if(-1!=u.id){if(a.pause(),1==u.id)try{let e=await n.Z.get("http://localhost:3001/mapi/getSong",{params:{videoId:t[t.length-1].videoId},withCredentials:!0});a.src=e.data.url,d(t[t.length-1])}catch(e){console.error("Ошибка при выполнении запроса:",e)}else try{let e=await n.Z.get("http://localhost:3001/mapi/getSong",{params:{videoId:t[u.id-2].videoId},withCredentials:!0});a.src=e.data.url,d(t[u.id-2])}catch(e){console.error("Ошибка при выполнении запроса:",e)}v(!0)}};return s.jsx(i.Provider,{value:{audio:a,currentTrack:u,isPlaying:m,handleToggleAudio:j,handleToggleNextAudio:P,handleTogglePreviousAudio:_,nextTrack:f,trackList:t,setTrackList:r,repeat:x,setRepeat:g,playbarToggleAudio:()=>{m?(v(!1),a.pause()):(v(!0),a.play())},trackListId:y,setTrackListId:w,clearAudioContext:()=>{a.pause(),a.currentTime=0,a.volume=1,a.src="",r([]),h(!0),v(!1),w(""),g(!1),d({id:-1,videoId:"",preview:"",title:"",artist:"",duration:0})},disable:p,currentTrackListMenu:l,setCurrentTrackListMenu:c},children:e})}},3360:(e,t,r)=>{"use strict";r.r(t),r.d(t,{FavoriteContext:()=>o,default:()=>l,useFavoriteContext:()=>i});var a=r(2295),s=r(3608),n=r(3729);let o=(0,n.createContext)(void 0),i=()=>{let e=(0,n.useContext)(o);if(!e)throw Error("useAudioContext must be used within an AudioProvider");return e},l=({children:e})=>{let t=async(e,t)=>{try{let{data:r}=await s.Z.get("http://localhost:3001/api/checkFavorite",{params:{browseId:e,type:t},withCredentials:!0});return r}catch(e){console.error("Error:",e)}},r=async(e,t)=>{try{let{data:r}=await s.Z.delete("http://localhost:3001/api/removeFavorite",{data:{browseId:e,type:t},withCredentials:!0});return r}catch(e){console.error("Error:",e)}},n=async(e,t)=>{try{let{data:r}=await s.Z.put("http://localhost:3001/api/addFavorite",{browseId:e,type:t},{withCredentials:!0});return r}catch(e){console.error("Error:",e)}},i=async()=>{try{let{data:e}=await s.Z.get("http://localhost:3001/mapi/getFavoriteSongs",{withCredentials:!0});if(e.length>1)return e.shift(),e;return[]}catch(e){console.log(e)}},l=async()=>{try{let{data:e}=await s.Z.get("http://localhost:3001/mapi/getFavoriteAlbums",{withCredentials:!0});if(e.length>1)return e.shift(),e;return[]}catch(e){console.log(e)}},c=async()=>{try{let{data:e}=await s.Z.get("http://localhost:3001/mapi/getFavoriteArtists",{withCredentials:!0});if(e.length>1)return e.shift(),e;return[]}catch(e){console.log(e)}},u=async()=>{try{let{data:e}=await s.Z.get("http://localhost:3001/mapi/getFavoritePlaylists",{withCredentials:!0});if(e.length>1)return e.shift(),e;return[]}catch(e){console.log(e)}};return a.jsx(o.Provider,{value:{checkFavorite:t,addFavorite:n,removeFavorite:r,getFavoriteSongs:i,getFavoriteAlbums:l,getFavoriteArtists:c,getFavoritePlaylists:u},children:e})}},3148:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>x});var a=r(2295),s=r(8394),n=r.n(s),o=r(9773),i=r.n(o),l=r(3608),c=r(2254),u=r(3729);let d=({closeLoginPage:e,setLoading:t})=>{let r=(0,c.useRouter)(),[s,n]=(0,u.useState)(""),[o,d]=(0,u.useState)(""),[p,h]=(0,u.useState)(""),x=async()=>{t(!0),(await l.Z.post("http://localhost:3001/api/login",{username:s,password:o},{withCredentials:!0})).data.successfully?r.push("/eternalsound"):h("Incorrect login or password"),t(!1)};return a.jsx("div",{className:i().container,children:(0,a.jsxs)("div",{className:i().content,children:[(0,a.jsxs)("h1",{className:i().text,children:["Log in to",a.jsx("br",{}),"EternalSound"]}),(0,a.jsxs)("div",{children:[a.jsx("p",{className:i().label,children:"Login"}),a.jsx("input",{className:i().input,placeholder:"Login",value:s,onChange:e=>n(e.target.value)}),a.jsx("p",{className:i().label,children:"Password"}),a.jsx("input",{className:i().input,type:"password",placeholder:"Password",value:o,onChange:e=>d(e.target.value),onKeyPress:e=>{"Enter"===e.key&&x()}})]}),a.jsx("p",{className:i().attantion,children:p}),a.jsx("button",{className:i().button,onClick:x,children:"Log In"}),(0,a.jsxs)("p",{className:i().changer,onClick:e,children:["Sign up for",a.jsx("br",{}),"EternalSound"]})]})})},p=({setLoginPage:e,setLoading:t})=>{let r=(0,c.useRouter)(),[s,n]=(0,u.useState)(""),[o,d]=(0,u.useState)(""),[p,h]=(0,u.useState)(""),x=async()=>{if(s.length>12||s.length<5)h("The login length must be greater than 5 and less than 12.");else if(o.length<8||o.length>18)h("The password length must be greater than 8 and less than 18.");else{t(!0);try{(await l.Z.post("http://localhost:3001/api/register",{username:s,password:o},{withCredentials:!0})).data.successfully?(await l.Z.post("http://localhost:3001/api/login",{username:s,password:o},{withCredentials:!0})).data.successfully&&r.push("/eternalsound"):h("A user with this login already exists")}catch(e){console.log(e)}t(!1)}};return a.jsx("div",{className:i().container,children:(0,a.jsxs)("div",{className:i().content,children:[(0,a.jsxs)("h1",{className:i().text,children:["Sign up to",a.jsx("br",{}),"EternalSound"]}),(0,a.jsxs)("div",{children:[a.jsx("p",{className:i().label,children:"Create login"}),a.jsx("input",{className:i().input,placeholder:"Create login",value:s,onChange:e=>n(e.target.value)}),a.jsx("p",{className:i().label,children:"Create password"}),a.jsx("input",{className:i().input,type:"password",placeholder:"Create password",value:o,onChange:e=>d(e.target.value),onKeyPress:e=>{"Enter"===e.key&&x()}})]}),a.jsx("p",{className:i().attantion,children:p}),a.jsx("button",{className:i().button,onClick:x,children:"Sign Up"}),a.jsx("p",{className:i().changer,onClick:e,children:"Log in here"})]})})};var h=r(7434);function x(){let[e,t]=(0,u.useState)(!0),r=(0,c.useRouter)();(0,u.useEffect)(()=>{(async()=>{(await l.Z.get("http://localhost:3001/api/user",{withCredentials:!0})).data.authentification&&r.push("/eternalsound")})(),t(!1)},[]);let[s,o]=(0,u.useState)(!0),i=()=>{o(!s)};return(0,a.jsxs)("main",{className:n().container,children:[a.jsx("div",{className:n().content,children:s?a.jsx(d,{closeLoginPage:i,setLoading:t}):a.jsx(p,{setLoginPage:i,setLoading:t})}),e?a.jsx(h.Z,{}):""]})}},9773:e=>{e.exports={container:"auth_container__k201d",content:"auth_content__EbfwB",text:"auth_text__dRlB7",label:"auth_label__Bw7Ut",input:"auth_input__WHjl7",attantion:"auth_attantion__urqYE",button:"auth_button__1p8KY",changer:"auth_changer__Jec0M"}},2135:e=>{e.exports={container:"Loading_container__PUn27"}},8394:e=>{e.exports={container:"page_container__aoG4z",content:"page_content__kDoxQ"}},1086:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>m,metadata:()=>g});var a=r(5036),s=r(3640),n=r.n(s);r(5023);var o=r(6843);let i=(0,o.createProxy)(String.raw`D:\Projects\EternalSound\client\src\app\context\AudioContext.tsx`),{__esModule:l,$$typeof:c}=i,u=i.default;(0,o.createProxy)(String.raw`D:\Projects\EternalSound\client\src\app\context\AudioContext.tsx#AudioContext`),(0,o.createProxy)(String.raw`D:\Projects\EternalSound\client\src\app\context\AudioContext.tsx#useAudioContext`);let d=(0,o.createProxy)(String.raw`D:\Projects\EternalSound\client\src\app\context\FavoriteContext.tsx`),{__esModule:p,$$typeof:h}=d,x=d.default;(0,o.createProxy)(String.raw`D:\Projects\EternalSound\client\src\app\context\FavoriteContext.tsx#FavoriteContext`),(0,o.createProxy)(String.raw`D:\Projects\EternalSound\client\src\app\context\FavoriteContext.tsx#useFavoriteContext`);let g={title:"EternalSound"};function m({children:e}){return a.jsx("html",{lang:"en",children:a.jsx("body",{className:n().className,children:a.jsx(x,{children:a.jsx(u,{children:e})})})})}},1136:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>n,__esModule:()=>s,default:()=>o});let a=(0,r(6843).createProxy)(String.raw`D:\Projects\EternalSound\client\src\app\page.tsx`),{__esModule:s,$$typeof:n}=a,o=a.default},3881:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var a=r(337);let s=e=>[{type:"image/x-icon",sizes:"16x16",url:(0,a.fillMetadataSegment)(".",e.params,"favicon.ico")+""}]},5023:()=>{}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[638,785,898],()=>r(5736));module.exports=a})();