"use strict";(self.webpackChunkweb_shop=self.webpackChunkweb_shop||[]).push([[349],{349:(e,l,t)=>{t.r(l),t.d(l,{default:()=>I});var a=t(5043),s=t(239),i=t(6497),n=t(4460),r=t(9029),o=t(9800),d=t(1645),c=t(7021),u=t(5041),v=t(5712),p=t(7230),h=t(3063),m=t(3516),x=t(899),j=t(6048),y=t(579);const g=["Mobi","Android","iPhone","iPad","Windows Phone"],f=["iPad","Tablet","Android"],b={location:"",qty:"1",laps:"0"},S={stores:[b]};function A(e){let{initialValues:l,handleUpdate:t,loading:s}=e;const i=(0,a.useRef)(null),n=(0,a.useRef)(null),r=(0,a.useRef)(null===l||void 0===l||!l.stores||!l.stores[0]),{userAgent:o}=window.navigator,d=g.some((e=>o.includes(e))),u=f.some((e=>o.includes(e))),[v,A]=(0,a.useState)(!1),N=x.Ik().shape({stores:x.YO().of(x.Ik().shape({location:x.Yj().required("Location is required"),qty:x.Yj().required("Quantity is required")}))});return(0,a.useEffect)((()=>{r.current||(r.current=!0,n.current.push(b))}),[n]),(0,a.useEffect)((()=>{if(r.current){const e=document.querySelector('input[name="stores.0.location"]');e&&e.focus()}}),[r]),(0,y.jsx)(y.Fragment,{children:(0,y.jsx)(m.l1,{initialValues:null!==l&&void 0!==l&&l.stores&&l.stores[0]?l:S,validationSchema:N,onSubmit:e=>t({id:l._id,stores:e.stores}),children:e=>{let{handleChange:l,handleBlur:t,handleSubmit:a,values:o,setFieldValue:x}=e;return(0,y.jsxs)(y.Fragment,{children:[console.log(o.stores," values "),(0,y.jsx)(m.ED,{name:"stores",children:e=>{var l;let{remove:t,push:a}=e;return n.current={remove:t,push:a},(0,y.jsxs)("div",{children:[o.stores.length>0&&(null===o||void 0===o||null===(l=o.stores)||void 0===l?void 0:l.map(((e,l)=>(0,y.jsxs)("div",{className:"row",children:[(0,y.jsx)("div",{className:"col-4",children:(0,y.jsx)(h.cl,{required:!0,autoFocus:r.current,name:"stores.".concat(l,".location"),label:"Store Location",placeholder:"Store Location"})}),(0,y.jsx)("div",{className:"col-3",children:(0,y.jsx)(h.cl,{required:!0,type:"number",name:"stores.".concat(l,".qty"),label:"Quantity",placeholder:"Quantity"})}),(0,y.jsx)("div",{className:"col-3",children:(0,y.jsx)(h.cl,{readOnly:!0,name:"stores.".concat(l,".laps"),placeholder:"Stock Out",value:e.laps})}),(0,y.jsx)("div",{className:"col-2 d-flex align-items-center",children:(0,y.jsx)(c.Ay,{type:"primary",danger:!0,onClick:()=>t(l),children:"X"})})]},l)))),(0,y.jsx)(c.Ay,{type:"primary",onClick:()=>a(b),className:"mb-3",children:"ADD"})]})}}),(0,y.jsx)(h.o6,{type:"submit",value:"Update",loading:s,onClick:a}),v&&(0,y.jsx)(p.A,{open:!0,onCancel:()=>A(!1),footer:null,children:(0,y.jsx)(j.f,{scanDelay:!1,onResult:e=>{if(e){let l=null===o||void 0===o?void 0:o.stores;l[null===v||void 0===v?void 0:v.index]={...l[null===v||void 0===v?void 0:v.index],location:null===e||void 0===e?void 0:e.text},x("stores",l),A(!1)}},style:{width:"100%"},ref:i,facingMode:d||u?"environment":"user"})})]})}})})}const N={stores:[{location:"",qty:"1",laps:"0"}]};function k(e){let{initialValues:l,handleUpdate:t,loading:a}=e;const s=x.Ik().shape({stores:x.YO().of(x.Ik().shape({location:x.Yj().required("Location is required"),qty:x.Yj().required("Quantity is required")}))});return(0,y.jsx)(m.l1,{initialValues:null!==l&&void 0!==l&&l.stores&&l.stores[0]?l:N,validationSchema:s,onSubmit:e=>t({id:l._id,stores:e.stores}),children:e=>{let{handleChange:l,handleBlur:t,handleSubmit:s,values:i,errors:n,setFieldValue:r}=e;return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(m.ED,{name:"stores",children:e=>{var l;let{remove:t,push:a}=e;return(0,y.jsx)("div",{children:i.stores.length>0&&(null===i||void 0===i||null===(l=i.stores)||void 0===l?void 0:l.map(((e,l)=>(0,y.jsxs)("div",{className:"row",children:[(0,y.jsx)("div",{className:"col-5",children:(0,y.jsx)(h.cl,{readOnly:!0,name:"stores.".concat(l,".location"),placeholder:"Store Location"})}),(0,y.jsx)("div",{className:"col-2",children:(0,y.jsx)(h.cl,{readOnly:!0,name:"stores.".concat(l,".qty"),placeholder:"QTY",value:Number(e.qty)-Number(e.laps)})}),(0,y.jsxs)("div",{className:"col-5 d-flex align-items-center",children:[(0,y.jsx)(c.Ay,{type:"primary",onClick:()=>{let e=null===i||void 0===i?void 0:i.stores;Number(e[l].laps)>0&&(e[l]={...e[l],laps:String(Number(e[l].laps)-1)},r("stores",e))},children:"-"}),(0,y.jsx)("div",{className:"mx-2",children:(0,y.jsx)(h.cl,{type:"number",name:"stores.".concat(l,".laps"),label:"Stock Out",placeholder:"Stock Out",onChange:e=>{let t=null===i||void 0===i?void 0:i.stores;Number(e.target.value)>=0&&Number(t[l].qty)>Number(e.target.value)&&(t[l]={...t[l],laps:String(e.target.value)},r("stores",t))}})}),(0,y.jsx)(c.Ay,{type:"primary",onClick:()=>{let e=null===i||void 0===i?void 0:i.stores;Number(e[l].qty)>Number(e[l].laps)&&(e[l]={...e[l],laps:String(Number(e[l].laps)+1)},r("stores",e))},children:"+"})]})]},l))))})}}),(0,y.jsx)(h.o6,{type:"submit",value:"Update",loading:a,onClick:s})]})}})}var C=t(5332),w=t(9748),q=t(2513),O=t(3727);const{Option:D}=i.A,F="products";function I(){var e,l,t;const{fetch:p,data:h,loading:m}=(0,u.LV)(),{edit:x,data:j,loading:g}=(0,u.eJ)(),[f,b]=(0,a.useState)(null),[S,N]=(0,a.useState)(null),[I,L]=(0,a.useState)(!1),[E,V]=(0,a.useState)([{value:"Out",label:"Out"},{value:"Not available",label:"Not available"},{value:"available in week.......",label:"available in week......."}]),[R,_]=(0,a.useState)(""),[Y,T]=(0,a.useState)(""),Q=h&&h.data?null===(e=h.data[0])||void 0===e||null===(l=e.platform)||void 0===l?void 0:l.split(","):[],[U,W]=(0,a.useState)(Q);(0,a.useEffect)((()=>{const e=localStorage.getItem("inputValue"),l=localStorage.getItem("selectedOption");e&&l&&(_(e),T(l))}),[]);let P=(0,a.useRef)(void 0);(0,a.useEffect)((()=>{(null===h||void 0===h?void 0:h.count)>0&&N(null)}),[h]);const B=e=>{clearTimeout(P.current),P.current=window.setTimeout((()=>{p({url:F,query:JSON.stringify({search:e})})}),500)},z=()=>{b(null),B(S)};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(s.A,{pageName:"Scanner"}),(0,y.jsxs)("div",{className:"viewDetails",children:[(0,y.jsx)(n.A,{autoFocus:!0,placeholder:"title / barcode / scancode / supplierref / brand / supplier",value:S||"",onChange:e=>{const l=e.target.value;N(l),B(l)}}),m&&(0,y.jsx)("div",{className:"viewDetails",style:{textAlign:"center"},children:(0,y.jsx)(r.A,{})}),h&&h.data&&h.data[0]?(0,y.jsxs)("div",{className:"viewDetails",children:[(0,y.jsx)(o.A,{gutter:[16,16],align:"middle",justify:"center",children:(0,y.jsx)(d.A,{xs:24,children:(0,y.jsxs)("div",{style:{display:"flex",flexWrap:"wrap",justifyContent:"start"},children:[(0,y.jsx)(w.A.Item,{style:{margin:"10px"},children:(0,y.jsxs)(q.A.Group,{onChange:e=>{var l;x(F,{platform:e.join(","),_id:null===h||void 0===h||null===(l=h.data[0])||void 0===l?void 0:l._id}),W(e)},value:U,children:[(0,y.jsx)(q.A,{value:"amazon",style:{marginRight:"10px"},children:"Amazon"}),(0,y.jsx)(q.A,{value:"bol.com",children:"Bol.com"}),(0,y.jsx)(q.A,{value:"Webshop",children:"Webshop"})]})}),(0,y.jsx)(c.Ay,{type:"primary",onClick:()=>b({...null===h||void 0===h?void 0:h.data[0],edit:!0}),style:{margin:"10px"},children:"Enter Store Location"}),(0,y.jsx)(c.Ay,{type:"primary",onClick:()=>b({...null===h||void 0===h?void 0:h.data[0],editLaps:!0}),style:{margin:"10px"},children:"Enter Stock Out"}),I?(0,y.jsx)(c.Ay,{type:"primary",style:{backgroundColor:"#ff4d4f",borderColor:"#ff4d4f",margin:"10px"},icon:(0,y.jsx)(O.A,{}),children:"Sold out"}):(0,y.jsx)(c.Ay,{type:"primary",onClick:()=>L(!0),style:{margin:"10px"},children:"Sold out"}),I&&(0,y.jsxs)("div",{style:{marginLeft:"10px",margin:"10px",display:"flex",flexWrap:"wrap",alignItems:"center"},children:[(0,y.jsx)(n.A,{placeholder:"Enter details here...",onChange:e=>{_(e.target.value)},style:{width:"150px",marginRight:"10px"}}),(0,y.jsxs)(i.A,{value:Y,style:{width:"150px",marginRight:"10px"},onChange:e=>T(e),children:[(0,y.jsx)(D,{value:"",children:"Select Option"}),E.map((e=>(0,y.jsx)(D,{value:e.value,children:e.label},e.value)))]}),(0,y.jsx)(c.Ay,{type:"primary",onClick:()=>{_(Y),T(Y),localStorage.setItem("inputValue",R),localStorage.setItem("selectedOption",Y),(()=>{var e;x(F,{stockedOutStatment:R,_id:null===h||void 0===h||null===(e=h.data[0])||void 0===e?void 0:e._id})})()},children:"Update"})]})]})})}),(0,y.jsx)("h3",{children:null===(t=h.data[0])||void 0===t?void 0:t.stockedOutStatment}),(0,y.jsx)(v.m,{data:h.data[0]})]}):(0,y.jsx)("div",{children:(0,y.jsx)("h3",{className:"viewDetails",children:"No data found!"})}),f&&f.edit&&(0,y.jsx)(C.OT,{resource:F,close:z,FormData:A,data:f}),f&&f.editLaps&&(0,y.jsx)(C.OT,{resource:F,close:z,FormData:k,data:f})]})]})}}}]);
//# sourceMappingURL=349.d5e444db.chunk.js.map