!function(e){function a(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,a),o.l=!0,o.exports}var n=window.webpackJsonp;window.webpackJsonp=function(t,s,c){for(var r,i,l,d=0,v=[];d<t.length;d++)i=t[d],o[i]&&v.push(o[i][0]),o[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);for(n&&n(t,s,c);v.length;)v.shift()();if(c)for(d=0;d<c.length;d++)l=a(a.s=c[d]);return l};var t={},o={8:0};a.m=e,a.c=t,a.d=function(e,n,t){a.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:t})},a.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(n,"a",n),n},a.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},a.p="E:\\new_web\\boyinmovie\\dist\\es6js",a.oe=function(e){throw console.error(e),e}}([function(e,a){window.onload=function(e){var a=location.pathname.slice(1);switch(a=a.split(".")[0].toLocaleLowerCase()){case"service":$(".snav").addClass("active"),$(".fsnav").addClass("active");break;case"casesdetail":case"cases":$(".cnav").addClass("active"),$(".fcnav").addClass("active");break;case"newsdetail":case"news":$(".nnav").addClass("active"),$(".fnnav").addClass("active");break;case"about":$(".anav").addClass("active"),$(".fanav").addClass("active");break;default:$(".hnav").addClass("active"),$(".fhnav").addClass("active")}window.onscroll=function(e){(document.documentElement.scrollTop||document.body.scrollTop)>0?$(".header").addClass("active"):$(".header").removeClass("active")}}}]);