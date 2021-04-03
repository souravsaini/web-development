(this.webpackJsonpchatapp=this.webpackJsonpchatapp||[]).push([[0],{113:function(e,a){},116:function(e,a,t){},117:function(e,a,t){},118:function(e,a,t){},164:function(e,a,t){},165:function(e,a,t){},166:function(e,a,t){},167:function(e,a,t){"use strict";t.r(a);var n,c=t(0),r=t.n(c),l=t(61),s=t.n(l),o=t(19),m=t(1),i=t(8),u=(t(73),function(){var e=Object(c.useState)(""),a=Object(i.a)(e,2),t=a[0],n=a[1],l=Object(c.useState)(""),s=Object(i.a)(l,2),m=s[0],u=s[1];return r.a.createElement("div",{className:"joinOuterContainer"},r.a.createElement("div",{className:"joinInnerContainer"},r.a.createElement("h1",{className:"heading"},"join"),r.a.createElement("div",null,r.a.createElement("input",{type:"text",placeholder:"name",className:"joinInput",onChange:function(e){n(e.target.value),console.log(t)}})," "),r.a.createElement("div",null,r.a.createElement("input",{type:"text",placeholder:"room",className:"joinInput mt-20",onChange:function(e){u(e.target.value),console.log(m)}})," "),r.a.createElement(o.b,{onClick:function(e){return t&&m?null:e.preventDefault()},to:"/chat?name=".concat(t,"&room=").concat(m)},r.a.createElement("button",{className:"button mt-20",type:"submit"},"sign in "))))}),A=t(67),E=t(63),g=t.n(E),p=t(64),f=t.n(p),h=(t(116),t(65)),d=t.n(h),v=t(20),N=t.n(v),j=(t(117),function(e){var a=e.room;return r.a.createElement("div",{className:"infoBar"},r.a.createElement("div",{className:"leftInnerContainer"},r.a.createElement("img",{className:"onlineIcon",src:N.a,alt:"onlineImg"}),r.a.createElement("h3",null,a)),r.a.createElement("div",{className:"rightInnerContainer"},r.a.createElement("a",{href:"/"},r.a.createElement("img",{src:d.a,alt:"closeImg"}))))}),b=(t(118),function(e){var a=e.message,t=e.setMessage,n=e.sendMessage;return r.a.createElement("form",{className:"form"},r.a.createElement("input",{className:"input",type:"text",placeholder:"Type a message...",value:a,onChange:function(e){return t(e.target.value)},onKeyPress:function(e){return"Enter"===e.key?n(e):null}}),r.a.createElement("button",{className:"sendButton",onClick:function(e){return n(e)}},"Send"))}),C=t(66),O=t.n(C),I=t(35),S=t.n(I),x=(t(164),function(e){var a=e.message,t=a.user,n=a.text,c=!1,l=e.name.trim().toLowerCase();return t===l&&(c=!0),c?r.a.createElement("div",{className:"messageContainer justifyEnd"},r.a.createElement("p",{className:"sentText pr-10"},l),r.a.createElement("div",{className:"messageBox backgroundBlue"},r.a.createElement("p",{className:"messageText colorWhite"},S.a.emojify(n)))):r.a.createElement("div",{className:"messageContainer justifyStart"},r.a.createElement("div",{className:"messageBox backgroundLight"},r.a.createElement("p",{className:"messageText colorDark"},S.a.emojify(n))),r.a.createElement("p",{className:"sentText pl-10"},t))}),y=(t(165),function(e){var a=e.messages,t=e.name;return r.a.createElement(O.a,{className:"messages"},a.map((function(e,a){return r.a.createElement("div",{key:a},r.a.createElement(x,{message:e,name:t}))})))}),k=(t(166),function(e){var a=e.users;return r.a.createElement("div",{className:"textContainer"},r.a.createElement("div",null,r.a.createElement("h1",null,"Realtime Chat Application ",r.a.createElement("span",{role:"img","aria-label":"emoji"},"\ud83d\udcac")),r.a.createElement("h2",null,"Created with React, Express, Node and Socket.IO ",r.a.createElement("span",{role:"img","aria-label":"emoji"},"\u2764\ufe0f")),r.a.createElement("h2",null,"Try it out right now! ",r.a.createElement("span",{role:"img","aria-label":"emoji"},"\u2b05\ufe0f"))),a?r.a.createElement("div",null,r.a.createElement("h1",null,"People currently chatting:"),r.a.createElement("div",{className:"activeContainer"},r.a.createElement("h2",null,a.map((function(e){var a=e.name;return r.a.createElement("div",{key:a,className:"activeItem"},a,r.a.createElement("img",{alt:"Online Icon",src:N.a}))}))))):null)}),R=function(e){var a=e.location,t=Object(c.useState)(""),l=Object(i.a)(t,2),s=l[0],o=l[1],m=Object(c.useState)(""),u=Object(i.a)(m,2),E=u[0],p=u[1],h=Object(c.useState)(""),d=Object(i.a)(h,2),v=d[0],N=d[1],C=Object(c.useState)([]),O=Object(i.a)(C,2),I=O[0],S=O[1],x=Object(c.useState)([]),R=Object(i.a)(x,2),w=R[0],B=R[1],M="https://freechatapplication.herokuapp.com";Object(c.useEffect)((function(){var e=g.a.parse(a.search),t=e.name,c=e.room;return n=f()(M),o(t),p(c),n.emit("join",{name:t,room:c}),function(){n.emit("disconnect"),n.off()}}),[M,a.search]),Object(c.useEffect)((function(){n.on("message",(function(e){B([].concat(Object(A.a)(w),[e]))})),n.on("roomData",(function(e){var a=e.users;N(a)}))}),[w]);return console.log(I,w),r.a.createElement("div",{className:"outerContainer"},r.a.createElement("div",{className:"container"},r.a.createElement(j,{room:E}),r.a.createElement(y,{messages:w,name:s}),r.a.createElement(b,{message:I,setMessage:S,sendMessage:function(e){e.preventDefault(),I&&n.emit("sendMessage",I,(function(){S("")}))}})),r.a.createElement(k,{users:v}))},w=function(){return r.a.createElement(o.a,null,r.a.createElement(m.a,{path:"/",exact:!0,component:u}),r.a.createElement(m.a,{path:"/chat",exact:!0,component:R}))};s.a.render(r.a.createElement(w,null),document.querySelector("#root"))},20:function(e,a){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAExJREFUCB1jbPh/le3lx5tNDIwMcQwg8J9hkTi/eh0LWJCBoRwoAAPlQDEGJrhKmDCIBupmQuYjs5lAZiILgNlAMRaQRSAz4UZCLQcAIwYaiAejKoYAAAAASUVORK5CYII="},65:function(e,a){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAHBJREFUGBmNkAEKwCAMA2VfGP2mrx3sOV2us6IymIXQGlNTW9zdhCqcZQm4dmelFUp+CZZa6sYpeUVIFyIixMqjCO51Wy5unQExuYSbSF5JASLqPsqRM21lOoWc89tagr3PSMgOiWlwnUeXWA/E78IfuAX270S3ydAAAAAASUVORK5CYII="},68:function(e,a,t){e.exports=t(167)},73:function(e,a,t){}},[[68,1,2]]]);
//# sourceMappingURL=main.c3116e53.chunk.js.map