(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{5644:function(e,t,n){Promise.resolve().then(n.bind(n,429))},4433:function(e,t,n){"use strict";var a=n(7437),s=n(7627),l=n.n(s);t.Z=()=>(0,a.jsx)("div",{className:l().container,children:(0,a.jsx)("h1",{children:"Loading..."})})},429:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return g}});var a=n(7437),s=n(345),l=n.n(s),i=n(7581),o=n.n(i),r=n(2173),c=n(4033),u=n(2265),h=e=>{let{closeLoginPage:t,setLoading:n}=e,s=(0,c.useRouter)(),[l,i]=(0,u.useState)(""),[h,d]=(0,u.useState)(""),[p,g]=(0,u.useState)(""),x=async()=>{n(!0),(await r.Z.post("http://localhost:3001/api/login",{username:l,password:h},{withCredentials:!0})).data.successfully?s.push("/eternalsound"):g("Incorrect login or password"),n(!1)};return(0,a.jsx)("div",{className:o().container,children:(0,a.jsxs)("div",{className:o().content,children:[(0,a.jsxs)("h1",{className:o().text,children:["Log in to",(0,a.jsx)("br",{}),"EternalSound"]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:o().label,children:"Login"}),(0,a.jsx)("input",{className:o().input,placeholder:"Login",value:l,onChange:e=>i(e.target.value)}),(0,a.jsx)("p",{className:o().label,children:"Password"}),(0,a.jsx)("input",{className:o().input,type:"password",placeholder:"Password",value:h,onChange:e=>d(e.target.value),onKeyPress:e=>{"Enter"===e.key&&x()}})]}),(0,a.jsx)("p",{className:o().attantion,children:p}),(0,a.jsx)("button",{className:o().button,onClick:x,children:"Log In"}),(0,a.jsxs)("p",{className:o().changer,onClick:t,children:["Sign up for",(0,a.jsx)("br",{}),"EternalSound"]})]})})},d=e=>{let{setLoginPage:t,setLoading:n}=e,s=(0,c.useRouter)(),[l,i]=(0,u.useState)(""),[h,d]=(0,u.useState)(""),[p,g]=(0,u.useState)(""),x=async()=>{if(l.length>12||l.length<5)g("The login length must be greater than 5 and less than 12.");else if(h.length<8||h.length>18)g("The password length must be greater than 8 and less than 18.");else{n(!0);try{(await r.Z.post("http://localhost:3001/api/register",{username:l,password:h},{withCredentials:!0})).data.successfully?(await r.Z.post("http://localhost:3001/api/login",{username:l,password:h},{withCredentials:!0})).data.successfully&&s.push("/eternalsound"):g("A user with this login already exists")}catch(e){console.log(e)}n(!1)}};return(0,a.jsx)("div",{className:o().container,children:(0,a.jsxs)("div",{className:o().content,children:[(0,a.jsxs)("h1",{className:o().text,children:["Sign up to",(0,a.jsx)("br",{}),"EternalSound"]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:o().label,children:"Create login"}),(0,a.jsx)("input",{className:o().input,placeholder:"Create login",value:l,onChange:e=>i(e.target.value)}),(0,a.jsx)("p",{className:o().label,children:"Create password"}),(0,a.jsx)("input",{className:o().input,type:"password",placeholder:"Create password",value:h,onChange:e=>d(e.target.value),onKeyPress:e=>{"Enter"===e.key&&x()}})]}),(0,a.jsx)("p",{className:o().attantion,children:p}),(0,a.jsx)("button",{className:o().button,onClick:x,children:"Sign Up"}),(0,a.jsx)("p",{className:o().changer,onClick:t,children:"Log in here"})]})})},p=n(4433);function g(){let[e,t]=(0,u.useState)(!0),n=(0,c.useRouter)();(0,u.useEffect)(()=>{(async()=>{(await r.Z.get("http://localhost:3001/api/user",{withCredentials:!0})).data.authentification&&n.push("/eternalsound")})(),t(!1)},[]);let[s,i]=(0,u.useState)(!0),o=()=>{i(!s)};return(0,a.jsxs)("main",{className:l().container,children:[(0,a.jsx)("div",{className:l().content,children:s?(0,a.jsx)(h,{closeLoginPage:o,setLoading:t}):(0,a.jsx)(d,{setLoginPage:o,setLoading:t})}),e?(0,a.jsx)(p.Z,{}):""]})}},7581:function(e){e.exports={container:"auth_container__k201d",content:"auth_content__EbfwB",text:"auth_text__dRlB7",label:"auth_label__Bw7Ut",input:"auth_input__WHjl7",attantion:"auth_attantion__urqYE",button:"auth_button__1p8KY",changer:"auth_changer__Jec0M"}},7627:function(e){e.exports={container:"Loading_container__PUn27"}},345:function(e){e.exports={container:"page_container__aoG4z",content:"page_content__kDoxQ"}},4033:function(e,t,n){e.exports=n(5313)}},function(e){e.O(0,[580,971,938,744],function(){return e(e.s=5644)}),_N_E=e.O()}]);