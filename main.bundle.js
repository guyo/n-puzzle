!function(e){function t(t){for(var r,i,l=t[0],u=t[1],c=t[2],f=0,d=[];f<l.length;f++)i=l[f],a[i]&&d.push(a[i][0]),a[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);for(s&&s(t);d.length;)d.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,l=1;l<n.length;l++){var u=n[l];0!==a[u]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={0:0},o=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var l=window.webpackJsonp=window.webpackJsonp||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var s=u;o.push([139,1]),n()}({139:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(11),i=n.n(o),l=n(13),u=n(1),c=n.n(u),s=function(e){var t=Math.min(e.height,e.width),n=e.borderWidth>.3*t?1:e.borderWidth,r={backgroundColor:["green","brown"][Math.floor(e.value%2)],cursor:"pointer",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",transitionProperty:"top, left",transitionDuration:"0.3s",transitionTimingFunction:"ease-in",position:"absolute",top:"".concat(e.top,"px"),left:"".concat(e.left,"px"),border:"".concat(n,"px solid white"),height:"".concat(e.height-2*n,"px"),width:"".concat(e.width-2*n,"px"),fontSize:.4*t,fontWeight:"bold"};return a.a.createElement("div",{style:r,onClick:e.onClick},e.value)};s.propTypes={top:c.a.number.isRequired,left:c.a.number.isRequired,height:c.a.number.isRequired,width:c.a.number.isRequired,value:c.a.any.isRequired,borderWidth:c.a.number,onClick:c.a.func},s.defaultProps={borderWidth:1};var f=a.a.memo(s);function d(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var h=function(e){var t=e.columns,n=e.height,o=e.width,i=e.tiles,l=e.onTileClicked,u=Math.ceil(i.length/t),c=Math.floor(o/t),s=Math.floor(n/u),h={width:"".concat(c*t+1,"px"),height:"".concat(s*u+1,"px"),position:"relative",backgroundColor:"darkgrey"},m=Object(r.useMemo)(function(){return d(Array(i.length).keys()).map(function(e){return function(){return l(e)}})},[i.length,l]);return a.a.createElement("div",{style:h,id:"grid"},i.map(function(e,n){if(null!==e){var r=Math.floor(n/t),o=n%t;return a.a.createElement(f,{key:e,value:e,left:o*c+2,top:r*s+2,height:s,width:c,borderWidth:2,onClick:m[n]})}return null}))};h.propTypes={columns:c.a.number.isRequired,height:c.a.number.isRequired,width:c.a.number.isRequired,tiles:c.a.arrayOf(c.a.number).isRequired,onTileClicked:c.a.func.isRequired};var m=h,b={},v=function(e){return Object.create(e)}(b);window.__GLOBAL_FUNCTION_HOOKS__=v;function p(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var w=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.size=t}var t,n,r;return t=e,(n=[{key:"isSolved",value:function(e){for(var t=0;t<e.length-1;t++)if(e[t]!==t+1)return!1;return null===e[e.length-1]}},{key:"checkMove",value:function(e,t){var n,r=Math.floor(t/this.size),a=t%this.size;return r>0&&null===e[n=this.index(r-1,a)]?n:r<this.size-1&&null===e[n=this.index(r+1,a)]?n:a>0&&null===e[n=this.index(r,a-1)]?n:a<this.size-1&&null===e[n=this.index(r,a+1)]?n:-1}},{key:"index",value:function(e,t){return e*this.size+t}},{key:"executeMove",value:function(e,t,n){var r=e.slice(0);return r[n]=e[t],r[t]=e[n],r}},{key:"createBoard",value:function(){if(this.size<2)return[null];var e,t,n=(e=1,t=this.size*this.size,p(Array(t-e).keys()).map(function(t){return t+e}));n.push(null);for(var r=50;r-- >0;){var a=S(n);if(!this.isSolved(a)&&this._isSolvable(a))return a}throw Error("too many iterations trying to produce valid board of size ".concat(this.size))}},{key:"_isSolvable",value:function(e){for(var t=0,n=0;n<e.length;n++)if(null!==e[n])for(var r=n+1;r<e.length;r++)null!==e[r]&&e[n]>e[r]&&t++;var a=0;if(this.size%2==0){var o;for(o=0;o<e.length&&null!==e[o];o++);a=(Math.floor(o/this.size)+1)%2}return t%2===a}}])&&y(t.prototype,n),r&&y(t,r),e}();var g,E,S=(g=function(e){for(var t,n=(e=e.slice(0)).length;n>1;){var r=(t=n--,Math.floor(Math.random()*Math.floor(t))),a=e[r];e[r]=e[n],e[n]=a}return e},E="shuffle",Object.defineProperty(b,E,{writable:!0,enumerable:!1,configurable:!0,value:g}),function(){return v[E].apply(void 0,arguments)});var O=n(29);function z(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function M(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){j(e,t,n[t])})}return e}function j(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _(e){var t=new w(e).createBoard();return{board:t,size:e,moves:[],originalBoard:t}}var C=Object(O.a)(function(e){return e.size},function(e){return new w(e)}),k=function(e){return e.moves.length>0},A=Object(O.a)([C,function(e){return e.board}],function(e,t){return e.isSolved(t)}),R=Object(O.a)([C,function(e){return e.board}],function(e,t){return function(n){return e.checkMove(t,n)}}),N=function(e){return A(e.game)},x=function(e){return R(e.game)},G={moveTile:function(e,t){return{type:"MOVE_TILE",move:{from:e,to:t}}}};var P=Object(l.b)(function(e){var t=e.game;return{board:t.board,size:t.size,checkMove:x(e)}},G)(function(e){var t,n,o=e.board,i=e.size,l=e.height,u=e.width,c=e.checkMove,s=e.moveTile;return a.a.createElement(m,{tiles:o,columns:i,height:l,width:u,onTileClicked:(t=function(e){var t=c(e);t>=0&&s(e,t)},n=Object(r.useRef)(),Object(r.useLayoutEffect)(function(){n.current=t},[t]),Object(r.useCallback)(function(){return n.current.apply(void 0,arguments)},[n]))})}),T=n(145),q=n(67),L=a.a.memo(function(e){var t=e.id,n=e.label,r=e.glyph,o=e.enabled,i=void 0===o?"true":o,l=e.handler,u=e.style,c=void 0===u?"default":u;return a.a.createElement(T.a,{bsSize:"large",bsStyle:c,disabled:!i,id:t,onClick:l,style:{marginLeft:"5px"}},a.a.createElement(q.a,{glyph:r})," ",n)}),I=function(e){var t=e.canUndo,n=e.onUndo,r=e.canReset,o=e.onReset,i=e.onNewGame;return a.a.createElement("div",{align:"center"},a.a.createElement(L,{id:"undo",label:"Undo",glyph:"repeat",enabled:t,handler:n}),a.a.createElement(L,{id:"reset",label:"Reset",glyph:"fast-backward",enabled:r,handler:o}),a.a.createElement(L,{id:"newgame",label:"New Game",glyph:"play",handler:i,style:"primary"}))};I.propTypes={canUndo:c.a.bool.isRequired,canReset:c.a.bool.isRequired,onUndo:c.a.func.isRequired,onReset:c.a.func.isRequired,onNewGame:c.a.func.isRequired};var D=I,W=Object(l.b)(function(e){var t=function(e){return k(e.game)}(e),n=N(e);return{canReset:!n&&t,canUndo:!n&&t}},function(e){return{onReset:function(){return e({type:"RESET_BOARD"})},onUndo:function(){return e({type:"UNDO_MOVE"})},onNewGame:function(){return e({type:"OPEN_NEW_GAME_MODAL"})}}})(D),B=n(142),U=n(144),F=n(140),V=n(143),H=n(141);function J(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,o=void 0;try{for(var i,l=e[Symbol.iterator]();!(r=(i=l.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==l.return||l.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var K=function(e){var t=J(Object(r.useState)(e.defaultSize),2),n=t[0],o=t[1],i=+n,l=i>=e.minSize&&i<=e.maxSize,u=function(){return l&&e.onSubmit(i)};return a.a.createElement(B.a,{show:e.show,onHide:e.onClose,backdrop:!!e.canClose||"static",id:"newGameModal"},a.a.createElement(B.a.Header,{closeButton:e.canClose},a.a.createElement(B.a.Title,null,e.title)),a.a.createElement(B.a.Body,null,a.a.createElement("form",{onSubmit:function(e){e.preventDefault(),u()}},a.a.createElement(U.a,{validationState:l?null:"error"},a.a.createElement(F.a,null,"Choose Puzzle Size:"),a.a.createElement(V.a,{type:"text",autoFocus:!0,value:n,onChange:function(e){return o(e.target.value)}}),a.a.createElement(V.a.Feedback,null),!l&&a.a.createElement(H.a,null,"Enter a number between 3 and 12")))),a.a.createElement(B.a.Footer,null,a.a.createElement(T.a,{bsStyle:"success",onClick:u,disabled:!l,id:"newgamestart"},"Start Game !"),e.canClose&&a.a.createElement(T.a,{onClick:e.onClose,id:"newgamecancel"},"Cancel")))};K.propTypes={show:c.a.bool.isRequired,title:c.a.string.isRequired,canClose:c.a.bool.isRequired,onSubmit:c.a.func.isRequired,onClose:c.a.func.isRequired,defaultSize:c.a.number,minSize:c.a.number,maxSize:c.a.number},K.defaultProps={minSize:3,maxSize:10,defaultSize:4};var Y=K;function Q(){return(Q=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var X=Object(l.b)(function(e,t){var n=e.modal;return{showInit:n.showInit,showNewGame:n.showNewGame,ownProps:t}})(function(e){var t=e.showInit,n=e.showNewGame,r=e.ownProps,o=e.dispatch,i=!0,l="",u=!1;return t?(u=!0,i=!1,l="Welcome to N-Puzzle!"):n&&(u=!0,i=!0,l="Start a new Game?"),a.a.createElement(Y,Q({},r,{show:u,title:l,canClose:i,onClose:function(){o({type:"CLOSE_NEW_GAME_MODAL"})},onSubmit:function(e){o(function(e){return{type:"NEW GAME",size:e}}(e))}}))}),Z=function(e){var t=e.show,n=e.onClose,r=e.onNewGame;return a.a.createElement(B.a,{show:t,onHide:n,id:"solvedModal",backdrop:"static"},a.a.createElement(B.a.Header,{closeButton:!0},a.a.createElement(B.a.Title,null,"Puzzle Solved")),a.a.createElement(B.a.Body,null,"Congratulations you have successfully finished the puzzle!!!",a.a.createElement("br",null),a.a.createElement("br",null),"Start a new game?",a.a.createElement("br",null)),a.a.createElement(B.a.Footer,null,a.a.createElement(T.a,{bsStyle:"default",id:"solvedstart",onClick:r,autoFocus:!0},"Yes"),a.a.createElement(T.a,{bsStyle:"default",id:"solvedcancel",onClick:n},"No")))};Z.propTypes={onClose:c.a.func.isRequired,onNewGame:c.a.func.isRequired,show:c.a.bool.isRequired};var $,ee=Z,te=Object(l.b)(function(e){return{show:N(e)&&e.modal.canShowSolved}},function(e){return{onClose:function(){return e({type:"CLOSE_SOLVED_MODAL"})},onNewGame:function(){return e({type:"OPEN_NEW_GAME_MODAL"})}}})(ee),ne={defaultSize:4,minSize:2,maxSize:12},re=function(){return a.a.createElement("div",{align:"center"},a.a.createElement(a.a.StrictMode,null,a.a.createElement("h1",null," N-Puzzle "),a.a.createElement("br",null),a.a.createElement(P,{height:400,width:400}),a.a.createElement("br",null),a.a.createElement(W,null),a.a.createElement("br",null),a.a.createElement("br",null)),a.a.createElement(te,null),a.a.createElement(X,ne))},ae=n(16),oe={showInit:!0,showNewGame:!1,canShowSolved:!1},ie=Object(ae.c)({game:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_(1),t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"NEW GAME":return _(t.size);case"RESET_BOARD":return A(e)||!k(e)?e:M({},e,{board:e.originalBoard,moves:[]});case"MOVE_TILE":if(A(e))return e;var n=t.move;return M({},e,{board:C(e).executeMove(e.board,n.from,n.to),moves:[].concat(z(e.moves),[n])});case"UNDO_MOVE":if(A(e)||!k(e))return e;var r=e.moves.slice(0),a=r.pop(),o=a.from,i=a.to;return M({},e,{board:C(e).executeMove(e.board,i,o),moves:r});default:return e}},modal:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:oe;switch((arguments.length>1?arguments[1]:void 0).type){case"OPEN_NEW_GAME_MODAL":return{showInit:!1,showNewGame:!0,canShowSolved:e.canShowSolved};case"CLOSE_NEW_GAME_MODAL":return{showInit:!1,showNewGame:!1,canShowSolved:e.canShowSolved};case"CLOSE_SOLVED_MODAL":return{showInit:e.showInit,showNewGame:e.showNewGame,canShowSolved:!1};case"NEW GAME":return{showInit:!1,showNewGame:!1,canShowSolved:!0};default:return e}}}),le=(n(78),Object(ae.d)(ie,$,ae.a.apply(void 0,[])));i.a.render(a.a.createElement(l.a,{store:le},a.a.createElement(re,null)),document.getElementById("root"))}});
//# sourceMappingURL=main.bundle.js.map