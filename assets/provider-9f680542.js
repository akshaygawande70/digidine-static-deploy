var d=Object.defineProperty;var p=(i,e,t)=>e in i?d(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var r=(i,e,t)=>(p(i,typeof e!="symbol"?e+"":e,t),t);import{H as s}from"./provider-f4bd1e11.js";import"./index-4e9ba7fe.js";class P extends s{constructor(){super(...arguments);r(this,"$$PROVIDER_TYPE","AUDIO")}get type(){return"audio"}setup(t){super.setup(t),this.type==="audio"&&t.delegate.p("provider-setup",{detail:this})}get audio(){return this.j}}export{P as AudioProvider};
