(this["webpackJsonptodo-list"]=this["webpackJsonptodo-list"]||[]).push([[0],{198:function(e,t,a){},214:function(e,t,a){},215:function(e,t,a){},216:function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"fetchListTask",(function(){return D})),a.d(n,"Task_Editing",(function(){return I})),a.d(n,"EditTask",(function(){return R})),a.d(n,"AddNewTask",(function(){return M})),a.d(n,"Delete_Task",(function(){return L})),a.d(n,"SearchTask",(function(){return F}));var c={};a.r(c),a.d(c,"ShowModal",(function(){return q})),a.d(c,"HideModal",(function(){return G}));var r=a(0),s=a.n(r),o=a(27),i=a.n(o),l=a(30),j=(a(180),a(70)),d=a(28),u=a(26),b=a.n(u),p=a(44),O=a(149),h=a.n(O).a.create({baseURL:"".concat("https://api.truyenmai.com/api")}),m="FETCH_TASK_REQUEST",x="FETCH_TASK_SUCCESS",v="FETCH_TASK_FAILURE",f="TASK_EDITING",g="TASK_EDIT_REQUEST",k="TASK_EDIT_SUCCESS",y="TASK_EDIT_FAILURE",T="TASK_ADD_NEW_REQUEST",C="TASK_ADD_NEW_SUCCESS",N="TASK_ADD_NEW_FAILURE",S="TASK_DELETE_REQUEST",A="TASK_DELETE_SUCCESS",w="TASK_DELETE_FAILURE",E="TASK_SEARCH_REQUEST",_=[{value:0,label:"To do"},{value:1,label:"In progress"},{value:2,label:"Done"}],D=function(){return function(){var e=Object(p.a)(b.a.mark((function e(t){var a,n,c,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:m}),e.next=3,h.get("/initialdata");case 3:200===(a=e.sent).status?(n=a.data,c=n.tasks,r=n.project,t({type:x,payload:{tasks:c,project:r}})):t({type:v,payload:{message:"L\u1ed7i network, vui l\xf2ng th\u1eed l\u1ea1i sau !"}});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},I=function(e){return console.log(e),function(){var t=Object(p.a)(b.a.mark((function t(a){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a({type:f,payload:{task:e}});case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},R=function(e){return function(){var t=Object(p.a)(b.a.mark((function t(a){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a({type:g}),t.next=3,h.post("/task/update",e);case 3:201===(n=t.sent).status?a({type:k,payload:{task:n.data.task}}):a({type:y,payload:{message:"L\u1ed7i network, vui l\xf2ng th\u1eed l\u1ea1i sau !"}});case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},M=function(e){return function(){var t=Object(p.a)(b.a.mark((function t(a){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a({type:T}),t.next=3,h.post("/task/create",e);case 3:n=t.sent,console.log(n),201===n.status?a({type:C,payload:{data:n.data}}):a({type:N,payload:{message:"L\u1ed7i network, vui l\xf2ng th\u1eed l\u1ea1i sau !"}});case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},L=function(e){return function(){var t=Object(p.a)(b.a.mark((function t(a){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a({type:S}),t.next=3,h.post("/task/delete",e);case 3:n=t.sent,console.log(n),200===n.status?a({type:A,payload:{data:e}}):a({type:w,message:"Something went wrong"});case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},F=function(e){return function(){var t=Object(p.a)(b.a.mark((function t(a){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a({type:E}),t.next=3,h.get("/tasks?q=".concat(e));case 3:n=t.sent,console.log(n);case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},H=(a(198),a(6)),U=a(229),K=a(219),P=a(42),B=a(225),W="MODAL_SHOW",Q="MODAL_HIDE",X="MODAL_CHANGE_TITLE",q=function(e){return function(t){t({type:W}),t({type:X,payload:{data:e}})}},G=function(){return function(e){return e({type:Q})}},J=a(224),z=a(2),V=(J.a.Option,function(e){switch(e.type){case"text":return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)("label",{children:e.label}),Object(z.jsx)("input",{className:"form-control",type:"text",value:e.value,onChange:e.onChange})]});case"select":return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)("label",{children:e.label}),Object(z.jsx)("div",{className:"select",children:Object(z.jsx)("select",{className:"form-control",value:e.value,onChange:e.onChange,children:e.children})})]});case"validate":return Object(z.jsx)(z.Fragment,{children:Object(z.jsx)("div",{className:"error-validate ".concat(e.validation?"err-validate":"validate"),style:{display:"none"},children:e.content})});default:return}}),Y=function(e){var t=Object(r.useState)(""),a=Object(H.a)(t,2),n=a[0],s=a[1],o=Object(r.useState)(""),i=Object(H.a)(o,2),j=i[0],d=i[1],u=Object(r.useState)(0),b=Object(H.a)(u,2),p=b[0],O=b[1],h=Object(l.d)((function(e){return e.taskReducer})),m=Object(r.useState)(!1),x=Object(H.a)(m,2),v=x[0],f=x[1],g=Object(r.useState)(!1),k=Object(H.a)(g,2),y=k[0],T=k[1],C=Object(l.c)(),N=function(e){if(e.preventDefault(),!(n.length<3?(T(!0),0):(T(!1),1)))return!1;var t=new FormData;if(t.append("name",n),t.append("desc",j),t.append("status",p),h.modal.projectId&&t.append("project",h.modal.projectId),h.taskediting&&h.taskediting._id){console.log(h.taskediting._id);var a=h.taskediting._id;C(R({name:n,desc:j,status:p,id:a}))}else{var c=h.modal.projectId;C(M({name:n,desc:j,status:p,project:c}))}f((function(e){return!e})),setTimeout((function(){f((function(e){return!e})),C(G()),T(!1),s(""),d(""),O(0)}),1e3)};return Object(z.jsx)(z.Fragment,{children:Object(z.jsx)(B.a,{title:null!==h.modal?h.modal.title:"",visible:h.showModal,onCancel:function(){C((0,c.HideModal)())},footer:null,children:Object(z.jsxs)("form",{id:"form-group",className:"form-group",onSubmit:N,children:[Object(z.jsx)("div",{className:"input",children:Object(z.jsx)(V,{type:"text",label:"Name",value:h.taskediting?h.taskediting.name:n,onChange:function(e){return s(e.target.value)}})}),Object(z.jsx)(V,{type:"validate",validation:y,content:" Title must have 4 character minimum !"}),Object(z.jsx)("div",{className:"input",children:Object(z.jsx)(V,{type:"text",label:"Desc",value:h.taskediting?h.taskediting.desc:j,onChange:function(e){return d(e.target.value)}})}),Object(z.jsx)("div",{className:"input",children:Object(z.jsx)(V,{type:"select",label:"Status",value:h.taskediting?h.taskediting.status:p,onChange:function(e){return O(e.target.value)},children:_.map((function(e){return Object(z.jsx)("option",{value:e.value,children:e.label},e.value)}))})}),Object(z.jsx)(U.b,{children:Object(z.jsx)(K.a,{spinning:v,children:Object(z.jsx)(P.a,{type:"primary",htmlType:"submit",disabled:v,children:"Submit"})})})]})})})},Z=a(12),$=a(13),ee=a(15),te=a(14),ae=a(226),ne=function(e){Object(ee.a)(a,e);var t=Object(te.a)(a);function a(){var e;Object(Z.a)(this,a);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).goback=function(){console.log("goback"),e.props.history.push("/")},e}return Object($.a)(a,[{key:"render",value:function(){return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)(ae.a,{status:"404",title:"404",subTitle:"Sorry, the page you visited does not exist.",extra:Object(z.jsx)(P.a,{type:"primary",onClick:this.goback,children:"Back Home"})}),","]})}}]),a}(r.Component),ce=a(230),re=a(231),se=a(223),oe=a(119),ie=a(232),le=a(25),je=function(e){Object(ee.a)(a,e);var t=Object(te.a)(a);function a(){return Object(Z.a)(this,a),t.apply(this,arguments)}return Object($.a)(a,[{key:"render",value:function(){var e,t=this.props.taskReducer;return Object(z.jsxs)(ce.a,{gutter:[16,24],children:[Object(z.jsx)(re.a,{span:6,children:null===(e=t.project)||void 0===e?void 0:e.map((function(e){return Object(z.jsx)("div",{className:"todo-card-ui",children:Object(z.jsxs)("div",{className:"body",children:[Object(z.jsx)("div",{className:"avatar",children:Object(z.jsx)(se.a,{type:"circle",percent:e.progress,width:80,status:e.type})}),Object(z.jsxs)("div",{className:"content",children:[Object(z.jsxs)("h3",{children:["Item: ",e.name]}),Object(z.jsxs)("p",{children:["Desc: ",e.desc]})]})]})},e._id)}))}),Object(z.jsx)(re.a,{span:18,children:Object(z.jsxs)("div",{className:"home-content",children:[Object(z.jsxs)("div",{className:"search",children:[Object(z.jsx)("label",{children:Object(z.jsx)(oe.a,{})}),Object(z.jsx)("input",{type:"search"})]}),Object(z.jsxs)("div",{className:"main-content",children:[Object(z.jsxs)("div",{className:"project-about",children:[Object(z.jsx)("h1",{className:"project-title",children:"Project Name"}),Object(z.jsx)("p",{className:"project-desc",children:" Description "})]}),Object(z.jsx)("div",{className:"project-timeline",children:Object(z.jsxs)("div",{className:"item",children:["Title : ",Object(z.jsx)("span",{children:" ......... "})]})}),Object(z.jsx)("div",{className:"project-timeline",children:Object(z.jsxs)("div",{className:"item",children:["Title : ",Object(z.jsx)("span",{children:" ......... "})]})}),Object(z.jsx)("div",{className:"project-timeline",children:Object(z.jsxs)("div",{className:"item",children:["Title : ",Object(z.jsx)("span",{children:" ......... "})]})})]}),Object(z.jsxs)("div",{className:"footer-content",children:[Object(z.jsxs)("div",{className:"footer-item",children:[Object(z.jsx)(ie.a,{}),"Photoshop"]}),Object(z.jsx)("div",{className:"footer-item",children:"Illustrator"}),Object(z.jsx)("div",{className:"footer-item",children:"Sketchup"}),Object(z.jsx)("div",{className:"footer-item",children:"Blender"})]})]})})]})}}]),a}(r.Component),de=Object(l.b)((function(e){return{taskReducer:e.taskReducer}}),null),ue=Object(le.compose)(de)(je),be=a(54),pe=a(233),Oe=a(234),he=a(235),me=a(236),xe=a(158),ve=function(e){Object(ee.a)(a,e);var t=Object(te.a)(a);function a(e){var n;return Object(Z.a)(this,a),(n=t.call(this,e)).state={search:"",x:0,y:0},n.hoverRef=s.a.createRef(),n.showform=n.showform.bind(Object(be.a)(n)),n}return Object($.a)(a,[{key:"showform",value:function(){console.log("bind func"),(0,this.props.ModalListAction.ShowModal)({title:"Add New Project"})}},{key:"render",value:function(){var e=this.props.taskReducer;return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)(ce.a,{children:Object(z.jsx)(re.a,{children:Object(z.jsx)(xe.a,{content:"Sorry this api doesnt complete",trigger:"hover",children:Object(z.jsxs)(P.a,{type:"primary",onClick:this.showform,disabled:!0,children:[Object(z.jsx)(pe.a,{})," New Project"]})})})}),Object(z.jsx)(ce.a,{gutter:[24,16],children:e.project?e.project.map((function(e){return Object(z.jsx)(re.a,{span:6,className:"gutter-row",children:Object(z.jsxs)("div",{className:"todo-card-ui",children:[Object(z.jsxs)("div",{className:"body",children:[Object(z.jsx)("div",{className:"avatar",children:Object(z.jsx)(se.a,{type:"circle",percent:e.progress,width:80,status:e.type})}),Object(z.jsxs)("div",{className:"content",children:[Object(z.jsxs)("h3",{children:["Item: ",e.name]}),Object(z.jsxs)("ul",{style:{listStyleType:"none",textAlign:"left",margin:0},children:[Object(z.jsxs)("li",{children:["Desc: ",e.desc]}),Object(z.jsxs)("li",{children:["Status: ",e.type]}),Object(z.jsxs)("li",{children:["Created: ",e.createdAt.substring(0,10)]}),Object(z.jsxs)("li",{children:["Updated: ",e.updatedAt.substring(0,10)]})]})]})]}),Object(z.jsx)("div",{className:"footer",children:Object(z.jsxs)("div",{className:"action-button",style:{padding:0},children:[Object(z.jsx)(xe.a,{content:"Manager Task",trigger:"hover",children:Object(z.jsx)(j.b,{to:{pathname:"/project/".concat(e.slug),state:{projectId:e._id}},style:{width:"100%",borderRight:"1px solid #eee",color:"inherit"},children:Object(z.jsx)(Oe.a,{})},e._id)}),Object(z.jsx)(xe.a,{content:"Edit",trigger:"hover",children:Object(z.jsx)(he.a,{})}),Object(z.jsx)(xe.a,{content:"Delete Task",trigger:"hover",children:Object(z.jsx)(me.a,{onClick:function(){return console.log("del")}},"restout")})]})})]})},e._id)})):""})]})}}]),a}(r.Component),fe=Object(l.b)((function(e){return{taskReducer:e.taskReducer}}),(function(e){return{TaskListAction:Object(le.bindActionCreators)(n,e),ModalListAction:Object(le.bindActionCreators)(c,e)}})),ge=Object(le.compose)(fe)(ve),ke=a(240),ye=a(241),Te=a(228),Ce=a(8),Ne=a(222),Se=a(237),Ae=(Ne.a.Search,Se.a,function(e){var t,a=Object(r.useState)(""),n=Object(H.a)(a,2),c=(n[0],n[1]);Object(l.c)();return Object(z.jsx)(Ne.a,(t={placeholder:"input search text",onChange:function(e){return c(e.target.value)},allowClear:!0},Object(Ce.a)(t,"placeholder","input search loading default"),Object(Ce.a)(t,"loading",!0),t))}),we=a(238),Ee=a(239),_e=a(166),De=a(220),Ie=function(e){Object(ee.a)(a,e);var t=Object(te.a)(a);function a(e){var n;return Object(Z.a)(this,a),(n=t.call(this,e)).handleClickOutside=function(e){var t=i.a.findDOMNode(Object(be.a)(n));t&&t.contains(e.target)||n.setState({active:!1})},n.handleOnclick=function(e){var t=n.props,a=t.TaskActionCreator,c=t.ModalActionCreator,r=a.Task_Editing,s=c.ShowModal;r(e),s({title:"Edit Task"})},n.handleDeleteTask=function(e){(0,n.props.TaskActionCreator.Delete_Task)(e),_e.b.success("\u0110\xe3 x\xf3a Task")},n.handleDropdownMenu=function(e){console.log(e),n.setState({dropdown:e})},n.handleSetting=function(e){n.setState({active:e})},n.wrapperRef=s.a.createRef(),n.state={dropdown:!1,active:!1},n}return Object($.a)(a,[{key:"componentDidMount",value:function(){document.addEventListener("mousedown",this.handleClickOutside)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("mousedown",this.handleClickOutside)}},{key:"render",value:function(){var e=this,t=this.props.task;return Object(z.jsxs)("div",{className:"todo-card-ui",children:[Object(z.jsxs)("div",{className:"body",children:[Object(z.jsx)("div",{className:"avatar",children:Object(z.jsx)(Te.a,{src:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"})}),Object(z.jsxs)("div",{className:"content",children:[Object(z.jsx)("h3",{className:"title",children:t.name}),Object(z.jsx)("p",{className:"desc",children:t.desc})]})]}),Object(z.jsx)("div",{className:"footer",children:Object(z.jsxs)("div",{className:"action-button",children:[Object(z.jsx)(xe.a,{content:"Setting",trigger:"hover",children:Object(z.jsx)(we.a,{onClick:function(){return e.handleSetting(!e.state.active)}},"setting")}),Object(z.jsx)(xe.a,{content:"Edit Task",trigger:"hover",children:Object(z.jsx)(he.a,{onClick:function(){return e.handleOnclick(t)}},"edit")}),Object(z.jsx)(xe.a,{content:"Task over",trigger:"hover",children:Object(z.jsx)(Ee.a,{onClick:function(){return e.handleDropdownMenu(!e.state.dropdown)}},"calendar")}),Object(z.jsx)(xe.a,{content:"Delete Task",trigger:"hover",children:Object(z.jsx)(De.a,{title:"B\u1ea1n c\xf3 ch\u1eafc mu\u1ed1n x\xf3a task n\xe0y ?",onConfirm:function(a){return e.handleDeleteTask(t)},okText:"X\xf3a",cancelText:"Kh\xf4ng",children:Object(z.jsx)(me.a,{},"restout")})})]})}),Object(z.jsx)("div",{className:"popup-action ".concat(this.state.active?"popup-active":""),children:Object(z.jsxs)("ul",{children:[Object(z.jsx)("li",{children:Object(z.jsx)("a",{children:" Color Picker"})}),Object(z.jsx)("li",{children:Object(z.jsx)("a",{children:" Tag Flag"})}),Object(z.jsx)("li",{children:Object(z.jsx)("a",{children:" Tag User"})}),Object(z.jsx)("li",{children:Object(z.jsx)("a",{children:" ..."})})]})})]})}}]),a}(r.Component),Re=Object(l.b)((function(e){return{taskReducer:e.taskReducer}}),(function(e){return{TaskActionCreator:Object(le.bindActionCreators)(n,e),ModalActionCreator:Object(le.bindActionCreators)(c,e)}})),Me=Object(le.compose)(Re)(Ie),Le=function(e){Object(ee.a)(a,e);var t=Object(te.a)(a);function a(){return Object(Z.a)(this,a),t.apply(this,arguments)}return Object($.a)(a,[{key:"render",value:function(){var e=this.props.task;return Object(z.jsx)(Me,{task:e})}}]),a}(r.Component),Fe=function(e){Object(ee.a)(a,e);var t=Object(te.a)(a);function a(){var e;Object(Z.a)(this,a);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).renderCardItem=function(){var t=e.props,a=t.task,n=t.projectId;return a.filter((function(e){return e.project===n})).map((function(e){return Object(z.jsx)(Le,{task:e},e._id)}))},e.renderModalAddNew=function(){var t=e.props,a=t.ModalActionCreator,n=t.projectId;(0,a.ShowModal)({title:"Add New Task",projectId:n})},e.handleCancel=function(){(0,e.props.ModalActionCreator.HideModal)()},e}return Object($.a)(a,[{key:"render",value:function(){var e=this,t=this.props.label;return Object(z.jsx)(re.a,{className:"gutter-row task-background",span:6,children:Object(z.jsxs)("div",{className:"task-background-component",children:[Object(z.jsx)("h2",{children:t}),this.renderCardItem(),Object(z.jsx)(P.a,{className:"task-btn",onClick:function(){return e.renderModalAddNew()},children:"Add new"})]})})}}]),a}(r.Component),He=Object(l.b)((function(e){return{taskReducer:e.taskReducer}}),(function(e){return{ModalActionCreator:Object(le.bindActionCreators)(c,e)}})),Ue=Object(le.compose)(He)(Fe),Ke=function(e){Object(ee.a)(a,e);var t=Object(te.a)(a);function a(){var e;Object(Z.a)(this,a);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={search:""},e.renderTaskBoard=function(){var t=null,a=e.props,n=a.taskReducer,c=a.location;return null!==c.state&&void 0!==c.state&&(t=_.map((function(e){var t=n.tasks.filter((function(t){return parseInt(t.status)===e.value}));return Object(z.jsx)(Ue,{task:t,label:e.label,projectId:c.state.projectId},e._id)}))),t},e}return Object($.a)(a,[{key:"render",value:function(){var e=this,t=this.props.taskReducer;return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsxs)(ce.a,{gutter:[16,24],align:"middle",children:[Object(z.jsx)(re.a,{span:4,children:Object(z.jsxs)(P.a,{type:"link",onClick:function(){return e.props.history.goBack()},children:[Object(z.jsx)(ke.a,{})," Back"]})}),Object(z.jsx)(re.a,{span:16,children:Object(z.jsx)(Ae,{})}),Object(z.jsxs)(re.a,{span:4,children:[Object(z.jsx)(Te.a,{icon:Object(z.jsx)(ye.a,{})}),Object(z.jsx)(Te.a,{icon:Object(z.jsx)(ye.a,{})}),Object(z.jsx)(Te.a,{icon:Object(z.jsx)(ye.a,{})}),Object(z.jsx)(Te.a,{icon:Object(z.jsx)(ye.a,{})})]})]}),Object(z.jsx)(ce.a,{gutter:[16,24],children:t.tasks.length>0?this.renderTaskBoard():""})]})}}]),a}(r.Component),Pe=Object(l.b)((function(e){return{taskReducer:e.taskReducer}}),(function(e){return{TaskListAction:Object(le.bindActionCreators)(n,e),ModalListAction:Object(le.bindActionCreators)(c,e)}})),Be=Object(le.compose)(Pe)(Ke),We=[{path:"/",name:"Home",exact:!0,component:ue},{path:"/project",name:"Project",component:ge}],Qe=[{path:"/",name:"Home",exact:!0,component:ue},{path:"/project/:slug",name:"Project",component:Be},{path:"/project",name:"Project",component:ge},{path:"*",name:"Not Found",component:ne}],Xe=(a(214),a(1)),qe=a(11),Ge=a(134),Je=a(221),ze=a(242),Ve=a(243),Ye=a(244),Ze=a(245),$e=a.p+"static/media/logo.6ce24c58.svg",et=Ge.a.SubMenu,tt=Je.a.Sider,at=function(e){Object(ee.a)(a,e);var t=Object(te.a)(a);function a(){var e;Object(Z.a)(this,a);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={collapsed:!1},e.onCollapse=function(t){e.setState({collapsed:t})},e}return Object($.a)(a,[{key:"render",value:function(){var e=this.state.collapsed;return Object(z.jsxs)(tt,{collapsible:!0,collapsed:e,onCollapse:this.onCollapse,children:[Object(z.jsx)("div",{className:"logo",style:{background:"url(".concat($e,") center no-repeat")}}),Object(z.jsxs)(Ge.a,{theme:"dark",defaultSelectedKeys:this.props.match.path,mode:"inline",children:[We.map((function(e,t){return Object(z.jsx)(Ge.a.Item,{icon:0===t?Object(z.jsx)(ze.a,{}):Object(z.jsx)(Ve.a,{}),children:Object(z.jsx)(j.c,{to:e.path,children:e.name})},e.path)})),Object(z.jsxs)(et,{icon:Object(z.jsx)(Ye.a,{}),title:"Team",children:[Object(z.jsx)(Ge.a.Item,{children:"Team 1"},"6"),Object(z.jsx)(Ge.a.Item,{children:"Team 2"},"8")]},"sub2"),Object(z.jsx)(Ge.a.Item,{icon:Object(z.jsx)(Ze.a,{}),children:"Files"},"9")]})]})}}]),a}(r.Component),nt=Object(l.b)((function(e){return{taskReducer:e.taskReducer}}),null),ct=Object(le.compose)(nt)(at),rt=a(227),st=Je.a.Footer,ot=function(e){Object(ee.a)(a,e);var t=Object(te.a)(a);function a(){return Object(Z.a)(this,a),t.apply(this,arguments)}return Object($.a)(a,[{key:"render",value:function(){return Object(z.jsx)(st,{style:{textAlign:"center"},children:"Ant Design \xa92018 Created by Ant UED"})}}]),a}(r.Component),it=Je.a.Header,lt=function(e){Object(ee.a)(a,e);var t=Object(te.a)(a);function a(){return Object(Z.a)(this,a),t.apply(this,arguments)}return Object($.a)(a,[{key:"render",value:function(){return Object(z.jsx)(it,{className:"site-layout-background",style:{padding:0}})}}]),a}(r.Component),jt=Je.a.Content,dt=(Je.a.Header,function(e){Object(ee.a)(a,e);var t=Object(te.a)(a);function a(){return Object(Z.a)(this,a),t.apply(this,arguments)}return Object($.a)(a,[{key:"render",value:function(){return Object(z.jsxs)(Je.a,{className:"site-layout",children:[Object(z.jsx)(lt,{}),Object(z.jsxs)(jt,{style:{margin:"0 16px"},children:[Object(z.jsxs)(rt.a,{style:{margin:"16px 0"},children:[Object(z.jsx)(rt.a.Item,{children:"Project"}),Object(z.jsx)(rt.a.Item,{children:"Daily Meal"})]}),Object(z.jsx)("div",{className:"site-layout-background",style:{padding:24,minHeight:360},children:this.props.children})]}),Object(z.jsx)(ot,{})]})}}]),a}(r.Component)),ut=["component"],bt=function(e){Object(ee.a)(a,e);var t=Object(te.a)(a);function a(e){var n;return Object(Z.a)(this,a),(n=t.call(this,e)).state={default:null},n}return Object($.a)(a,[{key:"render",value:function(){var e=this.props,t=e.component,a=Object(qe.a)(e,ut);return Object(z.jsx)(d.a,Object(Xe.a)(Object(Xe.a)({},a),{},{render:function(e){return Object(z.jsxs)(Je.a,{style:{minHeight:"100vh"},children:[Object(z.jsx)(ct,Object(Xe.a)({},e)),Object(z.jsx)(dt,{children:Object(z.jsx)(t,Object(Xe.a)({},e))})]})}}))}}]),a}(r.Component);var pt=function(){var e=Object(l.c)();return Object(r.useEffect)((function(){e(D())}),[]),Object(z.jsxs)("div",{className:"App",children:[Object(z.jsx)(Y,{}),Object(z.jsx)(j.a,{children:Object(z.jsx)(d.c,{children:Qe.map((function(e){return Object(z.jsx)(bt,{path:e.path,component:e.component,exact:e.exact,name:e.name},e.path)}))})})]})},Ot=(a(215),a(9)),ht={tasks:[],project:[],loading:!1,message:"",showModal:!1,taskediting:null,modal:null};var mt=Object(le.combineReducers)({taskReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ht,t=arguments.length>1?arguments[1]:void 0,a=-1;switch(t.type){case m:return Object(Xe.a)(Object(Xe.a)({},e),{},{loading:!0});case x:var n=t.payload,c=n.tasks,r=n.project;return Object(Xe.a)(Object(Xe.a)({},e),{},{loading:!1,tasks:c,project:r});case v:return{tasks:[],loading:!1,message:t.payload};case f:var s=t.payload.task;return Object(Xe.a)(Object(Xe.a)({},e),{},{taskediting:s});case W:return Object(Xe.a)(Object(Xe.a)({},e),{},{showModal:!0});case Q:return Object(Xe.a)(Object(Xe.a)({},e),{},{taskediting:null,showModal:!1,modal:null});case X:return Object(Xe.a)(Object(Xe.a)({},e),{},{modal:t.payload.data});case g:return Object(Xe.a)({loading:!0},e);case k:console.log(t.payload.task);var o=t.payload.task,i=e.tasks;if(-1!==(a=e.tasks.findIndex((function(e){return e._id===o._id})))){var l=[].concat(Object(Ot.a)(i.slice(0,a)),[o],Object(Ot.a)(i.slice(a+1)));return Object(Xe.a)(Object(Xe.a)({},e),{},{tasks:l,loading:!1})}return Object(Xe.a)(Object(Xe.a)({},e),{},{loading:!1});case y:return console.log(e.tasks),Object(Xe.a)(Object(Xe.a)({},e),{},{loading:!1,message:t.payload});case T:return console.log(e.tasks),Object(Xe.a)({loading:!0},e);case C:console.log(e.tasks);var j=e.tasks;return Object(Xe.a)(Object(Xe.a)({},e),{},{loading:!1,tasks:[].concat(Object(Ot.a)(j),[t.payload.data.task])});case N:return console.log(e.tasks),Object(Xe.a)(Object(Xe.a)({},e),{},{loading:!1,message:t.payload});case S:return console.log(e.tasks),Object(Xe.a)(Object(Xe.a)({},e),{},{loading:!0});case A:console.log(t.payload);var d=e.tasks;a=e.tasks.findIndex((function(e){return e._id===t.payload.data._id}));var u=[].concat(Object(Ot.a)(d.slice(0,a)),Object(Ot.a)(d.slice(a+1)));return Object(Xe.a)(Object(Xe.a)({},e),{},{tasks:u,loading:!1});case w:return console.log(e.tasks),Object(Xe.a)(Object(Xe.a)({},e),{},{message:t.payload,loading:!1});default:return e}}}),xt=a(159),vt=a(160);var ft=function(e){var t=[xt.a],a=[le.applyMiddleware.apply(void 0,t)],n=vt.composeWithDevTools.apply(void 0,a);return Object(le.createStore)(mt,e,n)}();i.a.render(Object(z.jsx)(l.a,{store:ft,children:Object(z.jsx)(pt,{})}),document.getElementById("root"))}},[[216,1,2]]]);
//# sourceMappingURL=main.5032a7c7.chunk.js.map