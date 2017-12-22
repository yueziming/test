import fastclick from '../fastclick';
import '../fontSize';
import '../msgBox';
// import Vue from 'Vue';
fastclick.attach(document.body);

var vm = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
});