"use strict";(self.webpackChunkweb_shop=self.webpackChunkweb_shop||[]).push([[349],{349:(e,s,l)=>{l.r(s),l.d(s,{default:()=>k});var t=l(5043),a=l(239),r=l(4460),n=l(9029),i=l(7021),o=l(5041),d=l(5851),c=l(7230),u=l(3063),v=l(3516),m=l(899),h=l(6048),p=l(579);const x=["Mobi","Android","iPhone","iPad","Windows Phone"],j=["iPad","Tablet","Android"],y={location:"",qty:"1",laps:"0"},g={stores:[y]};function f(e){let{initialValues:s,handleUpdate:l,loading:a}=e;const r=(0,t.useRef)(null),n=(0,t.useRef)(null),o=(0,t.useRef)(null===s||void 0===s||!s.stores||!s.stores[0]),{userAgent:d}=window.navigator,f=x.some((e=>d.includes(e))),N=j.some((e=>d.includes(e))),[b,S]=(0,t.useState)(!1),q=m.Ik().shape({stores:m.YO().of(m.Ik().shape({location:m.Yj().required("Location is required"),qty:m.Yj().required("Quantity is required")}))});return(0,t.useEffect)((()=>{o.current||(o.current=!0,n.current.push(y))}),[n]),(0,t.useEffect)((()=>{if(o.current){const e=document.querySelector('input[name="stores.0.location"]');e&&e.focus()}}),[o]),(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(v.l1,{initialValues:null!==s&&void 0!==s&&s.stores&&s.stores[0]?s:g,validationSchema:q,onSubmit:e=>l({id:s._id,stores:e.stores}),children:e=>{let{handleChange:s,handleBlur:l,handleSubmit:t,values:d,setFieldValue:m}=e;return(0,p.jsxs)(p.Fragment,{children:[console.log(d.stores," values "),(0,p.jsx)(v.ED,{name:"stores",children:e=>{var s;let{remove:l,push:t}=e;return n.current={remove:l,push:t},(0,p.jsxs)("div",{children:[d.stores.length>0&&(null===d||void 0===d||null===(s=d.stores)||void 0===s?void 0:s.map(((e,s)=>(0,p.jsxs)("div",{className:"row",children:[(0,p.jsx)("div",{className:"col-4",children:(0,p.jsx)(u.cl,{required:!0,autoFocus:o.current,name:"stores.".concat(s,".location"),label:"Store Location",placeholder:"Store Location"})}),(0,p.jsx)("div",{className:"col-3",children:(0,p.jsx)(u.cl,{required:!0,type:"number",name:"stores.".concat(s,".qty"),label:"Quantity",placeholder:"Quantity"})}),(0,p.jsx)("div",{className:"col-3",children:(0,p.jsx)(u.cl,{readOnly:!0,name:"stores.".concat(s,".laps"),placeholder:"Stock Out",value:e.laps})}),(0,p.jsx)("div",{className:"col-2 d-flex align-items-center",children:(0,p.jsx)(i.Ay,{type:"primary",danger:!0,onClick:()=>l(s),children:"X"})})]},s)))),(0,p.jsx)(i.Ay,{type:"primary",onClick:()=>t(y),className:"mb-3",children:"ADD"})]})}}),(0,p.jsx)(u.o6,{type:"submit",value:"Update",loading:a,onClick:t}),b&&(0,p.jsx)(c.A,{open:!0,onCancel:()=>S(!1),footer:null,children:(0,p.jsx)(h.f,{scanDelay:!1,onResult:e=>{if(e){let s=null===d||void 0===d?void 0:d.stores;s[null===b||void 0===b?void 0:b.index]={...s[null===b||void 0===b?void 0:b.index],location:null===e||void 0===e?void 0:e.text},m("stores",s),S(!1)}},style:{width:"100%"},ref:r,facingMode:f||N?"environment":"user"})})]})}})})}const N={stores:[{location:"",qty:"1",laps:"0"}]};function b(e){let{initialValues:s,handleUpdate:l,loading:t}=e;const a=m.Ik().shape({stores:m.YO().of(m.Ik().shape({location:m.Yj().required("Location is required"),qty:m.Yj().required("Quantity is required")}))});return(0,p.jsx)(v.l1,{initialValues:null!==s&&void 0!==s&&s.stores&&s.stores[0]?s:N,validationSchema:a,onSubmit:e=>l({id:s._id,stores:e.stores}),children:e=>{let{handleChange:s,handleBlur:l,handleSubmit:a,values:r,errors:n,setFieldValue:o}=e;return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(v.ED,{name:"stores",children:e=>{var s;let{remove:l,push:t}=e;return(0,p.jsx)("div",{children:r.stores.length>0&&(null===r||void 0===r||null===(s=r.stores)||void 0===s?void 0:s.map(((e,s)=>(0,p.jsxs)("div",{className:"row",children:[(0,p.jsx)("div",{className:"col-5",children:(0,p.jsx)(u.cl,{readOnly:!0,name:"stores.".concat(s,".location"),placeholder:"Store Location"})}),(0,p.jsx)("div",{className:"col-2",children:(0,p.jsx)(u.cl,{readOnly:!0,name:"stores.".concat(s,".qty"),placeholder:"QTY",value:Number(e.qty)-Number(e.laps)})}),(0,p.jsxs)("div",{className:"col-5 d-flex align-items-center",children:[(0,p.jsx)(i.Ay,{type:"primary",onClick:()=>{let e=null===r||void 0===r?void 0:r.stores;Number(e[s].laps)>0&&(e[s]={...e[s],laps:String(Number(e[s].laps)-1)},o("stores",e))},children:"-"}),(0,p.jsx)("div",{className:"mx-2",children:(0,p.jsx)(u.cl,{type:"number",name:"stores.".concat(s,".laps"),label:"Stock Out",placeholder:"Stock Out",onChange:e=>{let l=null===r||void 0===r?void 0:r.stores;Number(e.target.value)>=0&&Number(l[s].qty)>Number(e.target.value)&&(l[s]={...l[s],laps:String(e.target.value)},o("stores",l))}})}),(0,p.jsx)(i.Ay,{type:"primary",onClick:()=>{let e=null===r||void 0===r?void 0:r.stores;Number(e[s].qty)>Number(e[s].laps)&&(e[s]={...e[s],laps:String(Number(e[s].laps)+1)},o("stores",e))},children:"+"})]})]},s))))})}}),(0,p.jsx)(u.o6,{type:"submit",value:"Update",loading:t,onClick:a})]})}})}var S=l(1154);const q="products";function k(){const{fetch:e,data:s,loading:l}=(0,o.LV)(),[c,u]=(0,t.useState)(null),[v,m]=(0,t.useState)(null);let h=(0,t.useRef)(null);const x=s=>{clearTimeout(h.current),h.current=setTimeout((()=>{e({url:q,query:JSON.stringify({search:s})})}),500)};return(0,t.useEffect)((()=>{(null===s||void 0===s?void 0:s.count)>0&&m(null)}),[s]),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(a.A,{pageName:"Scanner"}),(0,p.jsxs)("div",{className:"viewDetails",children:[(0,p.jsx)("div",{className:"viewDetails",children:(0,p.jsx)(r.A,{autoFocus:!0,placeholder:"title / barcode / scancode / supplierref / brand / supplier",value:v,onChange:e=>{m(e.target.value),x(e.target.value)}})}),l&&(0,p.jsx)("div",{className:"viewDetails",style:{textAlign:"center"},children:(0,p.jsx)(n.A,{})}),s&&null!==s&&void 0!==s&&s.data&&null!==s&&void 0!==s&&s.data[0]?(0,p.jsxs)("div",{className:"viewDetails",children:[(0,p.jsxs)("div",{className:"viewDetails",style:{textAlign:"center",display:"flex",justifyContent:"center"},children:[(0,p.jsx)(i.Ay,{type:"primary",onClick:()=>u({...null===s||void 0===s?void 0:s.data[0],edit:!0}),children:"Enter Store Location"}),(0,p.jsx)(i.Ay,{type:"primary",onClick:()=>u({...null===s||void 0===s?void 0:s.data[0],editLaps:!0}),className:"mx-4",children:"Enter Stock Out"})]}),(0,p.jsx)(d.m,{data:s.data[0]})]}):(0,p.jsx)("div",{children:(0,p.jsx)("h3",{className:"viewDetails",children:"No data found!"})}),c&&c.edit&&(0,p.jsx)(S.OT,{resource:q,close:()=>{u(null),x(v)},FormData:f,data:c}),c&&c.editLaps&&(0,p.jsx)(S.OT,{resource:q,close:()=>{u(null),x(v)},FormData:b,data:c})]})]})}}}]);
//# sourceMappingURL=349.80ca94f0.chunk.js.map