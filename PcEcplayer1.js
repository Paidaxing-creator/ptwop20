let PlayEr = {
	"UpdateP2PStats":function(dl, up, num){
		$('#p2p_stats').text('Speed ' + (dl / 1024).toFixed(2) + 'MB Share ' + (up / 1024).toFixed(2) + 'MB' + ' Nodes ' + num + 'Pcs');
	},
    "svg":{
        'close':'<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="m571.733 512 268.8-268.8c17.067-17.067 17.067-42.667 0-59.733-17.066-17.067-42.666-17.067-59.733 0L512 452.267l-268.8-268.8c-17.067-17.067-42.667-17.067-59.733 0-17.067 17.066-17.067 42.666 0 59.733l268.8 268.8-268.8 268.8c-17.067 17.067-17.067 42.667 0 59.733 8.533 8.534 19.2 12.8 29.866 12.8s21.334-4.266 29.867-12.8l268.8-268.8 268.8 268.8c8.533 8.534 19.2 12.8 29.867 12.8s21.333-4.266 29.866-12.8c17.067-17.066 17.067-42.666 0-59.733L571.733 512z"></path></svg>',
        'left':'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z"></path></svg>',
        'next':'<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M735.41818133 554.20121173L288.58181867 814.85575787c-32.27151467 19.85939413-74.47272747-4.964848-74.47272747-42.2012128v-521.30909014c0-37.23636373 42.20121173-62.06060587 74.47272747-42.2012128l446.83636266 260.65454614c32.27151467 17.3769696 32.27151467 67.02545493 0 84.40242346z"></path><path d="M809.8909088 695.69939413c0 34.7539392-32.27151467 64.5430304-74.47272747 64.5430304s-74.47272747-29.7890912-74.4727264-64.5430304V328.30060587c0-34.7539392 32.27151467-64.5430304 74.4727264-64.5430304s74.47272747 29.7890912 74.47272747 64.5430304v367.39878826z"></path></svg>',
        'reb':'<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M1007.4674 42.036669c-12.751909-12.751909-38.255728-12.751909-51.007638 0l-95.63932 95.63932c-57.383592-57.383592-133.895048-95.63932-210.406505-121.143139C376.247886-53.602651 95.70588 105.796216 19.194424 373.586313c-76.511456 274.166051 82.887411 554.708057 350.677507 631.219513 274.166051 76.511456 554.708057-82.887411 631.219514-350.677507 12.751909-38.255728-12.751909-76.511456-51.007638-89.263366s-76.511456 12.751909-89.263365 51.007637c-25.503819 89.263366-89.263366 165.774822-165.774822 216.78246-172.150776 102.015275-395.30919 38.255728-497.324465-133.895049-82.887411-140.271003-63.759547-312.421779 44.631683-433.564918 133.895048-146.646958 369.805371-159.398867 516.452329-19.127864l-114.767184 114.767184c-6.375955 6.375955-6.375955 12.751909-6.375955 19.127864 0 19.127864 19.127864 38.255728 38.255728 38.255728h312.42178c12.751909 0 31.879773-12.751909 31.879773-31.879773V67.540488c0-6.375955-6.375955-12.751909-12.751909-25.503819z"></path></svg>',
        'change':'<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-0.4-12.6 6.1l-0.2 64c-118.6 0.5-235.8 53.4-314.6 154.2-69.6 89.2-95.7 198.6-81.1 302.4h74.9c-0.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8zM880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32z m-44 402H396V494h440v326z"></path></svg>',
        'lock':'<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M800 448H704V320c0-106.4-85.6-192-192-192S320 213.6 320 320v128H224c-17.6 0-32 14.4-32 32v384c0 17.6 14.4 32 32 32h576c17.6 0 32-14.4 32-32V480c0-17.6-14.4-32-32-32zM512 736c-35.2 0-64-28.8-64-64s28.8-64 64-64 64 28.8 64 64-28.8 64-64 64z m128-288H384V320c0-70.4 57.6-128 128-128s128 57.6 128 128v128z"></path></svg>',
        'open':'<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M800 448H704V320c0-106.4-85.6-192-192-192S320 213.6 320 320h64c0-70.4 57.6-128 128-128s128 57.6 128 128v128H224c-17.6 0-32 14.4-32 32v384c0 17.6 14.4 32 32 32h576c17.6 0 32-14.4 32-32V480c0-17.6-14.4-32-32-32zM512 736c-35.2 0-64-28.8-64-64s28.8-64 64-64 64 28.8 64 64-28.8 64-64 64z"></path></svg>',
        'pip':'<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M849.5 174.5a37.50000029 37.50000029 0 0 1 37.50000029 37.50000029v262.49999942h-75.00000058V249.49999971H212.00000029v525.00000058h225v74.99999971H174.5a37.50000029 37.50000029 0 0 1-37.50000029-37.50000029V212.00000029a37.50000029 37.50000029 0 0 1 37.50000029-37.50000029h675z m0 375.00000029a37.50000029 37.50000029 0 0 1 37.50000029 37.49999942v225a37.50000029 37.50000029 0 0 1-37.50000029 37.50000029h-299.99999971a37.50000029 37.50000029 0 0 1-37.50000029-37.50000029v-225a37.50000029 37.50000029 0 0 1 37.50000029-37.49999942h299.99999971z"></path></svg>',
        'dm':'<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M833.94335938 148.30859375H190.05664062c-39.28710938 0-71.19140625 31.90429688-71.19140624 71.19140625V689.5390625c0 39.28710938 31.90429688 71.19140625 71.19140625 71.19140625h169.45312499l131.13281251 107.05078125c6.50390625 5.2734375 14.32617188 7.91015625 22.23632812 7.91015625 7.82226563 0 15.73242188-2.63671875 22.1484375-7.91015625l131.8359375-107.05078125h166.9921875c39.28710938 0 71.19140625-31.90429688 71.19140625-71.19140625V219.5c0.08789063-39.28710938-31.90429688-71.19140625-71.10351563-71.19140625z m0.87890624 541.23046875c0 0.43945313-0.43945313 0.87890625-0.87890625 0.87890625H654.47070313c-8.0859375 0-15.90820313 2.8125-22.14843751 7.91015625L512.96679688 795.18359375 394.31445312 698.328125c-6.24023438-5.09765625-14.15039063-7.91015625-22.23632812-7.91015625H190.05664062c-0.43945313 0-0.87890625-0.43945313-0.87890624-0.87890625V219.5c0-0.43945313 0.43945313-0.87890625 0.87890625-0.87890625h643.79882812c0.43945313 0 0.87890625 0.43945313 0.87890625 0.87890625V689.5390625z"></path><path d="M345.09570312 455.3984375m-43.94531249 0a43.9453125 43.9453125 0 1 0 87.89062499 0 43.9453125 43.9453125 0 1 0-87.890625 0Z"></path><path d="M512.96679688 455.3984375m-43.9453125 0a43.9453125 43.9453125 0 1 0 87.89062499 0 43.9453125 43.9453125 0 1 0-87.890625 0Z"></path><path d="M681.01367188 455.3984375m-43.94531251 0a43.9453125 43.9453125 0 1 0 87.89062501 0 43.9453125 43.9453125 0 1 0-87.890625 0Z"></path></svg>',
        'content':'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M26.667 5.333h-21.333c-0 0-0.001 0-0.001 0-1.472 0-2.666 1.194-2.666 2.666 0 0 0 0.001 0 0.001v-0 16c0 0 0 0.001 0 0.001 0 1.472 1.194 2.666 2.666 2.666 0 0 0.001 0 0.001 0h21.333c0 0 0.001 0 0.001 0 1.472 0 2.666-1.194 2.666-2.666 0-0 0-0.001 0-0.001v0-16c0-0 0-0.001 0-0.001 0-1.472-1.194-2.666-2.666-2.666-0 0-0.001 0-0.001 0h0zM5.333 16h5.333v2.667h-5.333v-2.667zM18.667 24h-13.333v-2.667h13.333v2.667zM26.667 24h-5.333v-2.667h5.333v2.667zM26.667 18.667h-13.333v-2.667h13.333v2.667z"></path></svg>',
    },
    "secondToTime" : function(second){
        const add0 = (num) => (num < 10 ? `0${num}` : String(num));
        const hour = Math.floor(second / 3600);
        const min = Math.floor((second - hour * 3600) / 60);
        const sec = Math.floor(second - hour * 3600 - min * 60);
        return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(':');
    },
    "group":function(s){
        let group = PlayEr.empty(ConFig['MesData']["group"]) ? "游客":ConFig['MesData']["group"],
            userTxt = s,
            userArr = userTxt.split(',');
        return userArr.indexOf(group);
    },
    "countDown":function(u,t){
        let v_time = Math.round($(t).text());
        let interval = setInterval(function(){
            let time = --v_time;
            if(time <= 0) {
                clearInterval(interval);
                u();
            }
            $(t).text(time);
        }, 1000);
    },
    "empty":function(s){
        return s == null || s === '';
    },
    "cookie":{
        'Set': function(name,value,days=7,type='1'){
            if(type === '1'){
                localStorage.setItem(name, value);
            }else{
                let exp = new Date();
                exp.setTime(exp.getTime() + days*24*60*60*1000);
                document.cookie=name+"="+encodeURIComponent(value)+";path=/;expires="+exp.toUTCString();
            }
        },
        'Get': function(name,type='1'){
            if(type === '1'){
                return localStorage.getItem(name);
            }else{
                let arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
                if(arr != null){ return decodeURIComponent(arr[2]); }
            }
        },
        'Del': function(name,type='1'){
            if(type === '1'){
                localStorage.removeItem(name);
            }else{
                let exp = new Date();
                exp.setTime(exp.getTime()-1);
                let cvAl = this.Get(name,ConFig['config']['rm']);
                if(cvAl != null){ document.cookie = name+"="+encodeURIComponent(cvAl)+";path=/;expires="+exp.toUTCString(); }
            }
        }
    },
    "GetRequest":function(){
        let url = decodeURI(location.search),theRequest = {};
        if (url.indexOf("?") !== -1) {
            let str = url.substr(1),s = str.split("&");
            for (let i = 0; i < s.length; i++) {
                theRequest[s[i].split("=")[0]] = decodeURI(s[i].split("=")[1]);
            }
        }
        return theRequest;
    },
    "mes":function(e){
        let s = sessionStorage.getItem("MesData"),g = PlayEr.GetRequest();
        if(!PlayEr.empty(e)){
            ConFig["MesData"] = e;
            sessionStorage.removeItem("list");
            console.log("参数来自跨域传递");
        }else if(!PlayEr.empty(s) && PlayEr.empty(e)){
            ConFig["MesData"] = JSON.parse(s);
            console.log("参数来自本地存储");
        }else {
            ConFig["MesData"] = g;
            console.log("参数来自url传参");
        }
        if(!PlayEr.empty(g["nid"])){
            ConFig["MesData"]["nid"] = g["nid"];
        }
        if(!PlayEr.empty(g["sid"])){
            ConFig["MesData"]["sid"] = g["sid"];
        }
        if(!PlayEr.empty(g["id"])){
            ConFig["MesData"]["id"] = g["id"];
        }
        if(!PlayEr.empty(g["api"])){
            ConFig["MesData"]["api"] = g["api"];
        }
        if(!PlayEr.empty(g["name"])){
            ConFig["MesData"]["name"] = g["name"];
        }

        let list = sessionStorage.getItem("list");
        if(!PlayEr.empty(list) && !PlayEr.empty(ConFig["MesData"]["sid"])){
            let listData =  JSON.parse(list);
            let data = listData["url"][(Number(ConFig["MesData"]["sid"])-1)]["url"];
            let next = data[ConFig["MesData"]["nid"]];

            if(!PlayEr.empty(ConFig["MesData"]["nid"])){
                ConFig["MesData"]["name"] = listData["name"]+"-"+data[Number(ConFig["MesData"]["nid"])-1]["name"];
            }
            if(!PlayEr.empty(next)){
                ConFig["MesData"]["next"] = next["url"];
            }else{
                ConFig["MesData"]["next"] = "";
            }
        }else{
            PlayEr.list.api2();
        }

        sessionStorage.setItem("MesData",JSON.stringify(ConFig["MesData"]));
        PlayEr.Init();
    },
    "type":function(s){
        let t = "mp4";
        switch (ConFig['type']) {
            case 'auto':
                if (/.flv(#|\?|$)/i.exec(s)) {
                    t = 'flv';
                } else if (/m3u8(#|\?|$)/i.exec(s)) {
                    t = 'm3u8';
                } else if (/.php(#|\?|$)/i.exec(s)) {
                    t = 'm3u8';
                } else if (/.css(#|\?|$)/i.exec(s)) {
                    t = 'm3u8';
                } else if (/.png(#|\?|$)/i.exec(s)) {
                    t = 'm3u8';
                }
                break;
            case 'm3u8':
                t = "m3u8";
                break;
            case 'flv':
                t = "flv";
                break;
            case 'hls':
                t = "hls";
                break;
        }
        return t;
    },
    "play": function(){
        let playData = {
            container: '#player',
            contextmenu: [],
            autoplay:false
        },art = ConFig['config']['art'];
        if(art["isLive"] === '1'){
            playData["isLive"] = true;
        }
        if(art["autoplay"] === '1'){
            playData["autoplay"] = true;
        }
        if(art["muted"] === '1'){
            playData["muted"] = true;
        }
        if(art["autoSize"] === '1'){
            playData["autoSize"] = true;
        }
        if(art["playbackRate"] === '1'){
            playData["playbackRate"] = true;
        }
        if(art["aspectRatio"] === '1'){
            playData["aspectRatio"] = true;
        }
        if(art["screenshot"] === '1'){
            playData["screenshot"] = true;
        }
        if(art["hotkey"] === '0'){
            playData["hotkey"] = false;
        }
        if(art["pip"] === '1'){
            playData["pip"] = true;
        }
        if(art["fullscreen"] === '1'){
            playData["fullscreen"] = true;
        }
        if(art["miniProgressBar"] === '1'){
            playData["miniProgressBar"] = true;
        }
        if(art["lock"] === '1'){
            playData["lock"] = true;
        }
        if(art["fastForward"] === '1'){
            playData["fastForward"] = true;
        }
        if(art["airplay"] === '1'){
            playData["airplay"] = true;
        }
        if(ConFig['config']['autoOrientation'] === '1'){
            playData["autoOrientation"] = true;
        }
        let u=PlayEr.ad.uic(ConFig['url']),t = PlayEr.type(u);
        playData["lang"] =  art["lang"];
        playData["theme"] = ConFig['config']['gx']['color'];
        playData["volume"] =  Number(art["volume"]);
        playData["setting"] = true;
        playData["url"] = u;
        if(t === 'flv') {
            $("title").after('<script src="../player/js/flv.min.js"></script>');
            playData["type"] = 'flv';
            playData["customType"]={
                flv: function playFlv(video, url, art) {
                    if (flvjs.isSupported()) {
                        const flv = flvjs.createPlayer({ type: 'flv', url });
                        flv.attachMediaElement(video);
                        flv.load();
                        art.flv = flv;
                        art.once('url', () => flv.destroy());
                        art.once('destroy', () => flv.destroy());
                    } else {
                        art.notice.show = 'Unsupported playback format: flv';
                    }
                }
            }
        }else if(t === 'm3u8' || t === 'hls'){
var _0xodT='jsjiami.com.v7';const _0x4375b4=_0x1109;(function(_0x2c2964,_0x37d146,_0x212239,_0x509f63,_0x55c71d,_0x361cb8,_0xd715d3){return _0x2c2964=_0x2c2964>>0x7,_0x361cb8='hs',_0xd715d3='hs',function(_0xfc1706,_0x151477,_0x3e9dcc,_0x80b2fa,_0x389946){const _0x40921c=_0x1109;_0x80b2fa='tfi',_0x361cb8=_0x80b2fa+_0x361cb8,_0x389946='up',_0xd715d3+=_0x389946,_0x361cb8=_0x3e9dcc(_0x361cb8),_0xd715d3=_0x3e9dcc(_0xd715d3),_0x3e9dcc=0x0;const _0x1d2880=_0xfc1706();while(!![]&&--_0x509f63+_0x151477){try{_0x80b2fa=parseInt(_0x40921c(0x260,'Z3H7'))/0x1*(parseInt(_0x40921c(0x1f8,'v*zw'))/0x2)+parseInt(_0x40921c(0x1a4,'Rk(0'))/0x3*(parseInt(_0x40921c(0x1c7,'&NBl'))/0x4)+-parseInt(_0x40921c(0x1ac,'Glqc'))/0x5+parseInt(_0x40921c(0x1e0,'VsRH'))/0x6*(-parseInt(_0x40921c(0x244,'guLf'))/0x7)+parseInt(_0x40921c(0x19d,'YeX7'))/0x8+-parseInt(_0x40921c(0x1b6,']$jm'))/0x9+parseInt(_0x40921c(0x227,'meYO'))/0xa;}catch(_0x1d6c8b){_0x80b2fa=_0x3e9dcc;}finally{_0x389946=_0x1d2880[_0x361cb8]();if(_0x2c2964<=_0x509f63)_0x3e9dcc?_0x55c71d?_0x80b2fa=_0x389946:_0x55c71d=_0x389946:_0x3e9dcc=_0x389946;else{if(_0x3e9dcc==_0x55c71d['replace'](/[RTNbVOQYSqJpWCAnFHkEL=]/g,'')){if(_0x80b2fa===_0x151477){_0x1d2880['un'+_0x361cb8](_0x389946);break;}_0x1d2880[_0xd715d3](_0x389946);}}}}}(_0x212239,_0x37d146,function(_0x287717,_0xdfd3fa,_0x2b8200,_0x56b55d,_0x8b2325,_0x3508d2,_0x3e150b){return _0xdfd3fa='\x73\x70\x6c\x69\x74',_0x287717=arguments[0x0],_0x287717=_0x287717[_0xdfd3fa](''),_0x2b8200='\x72\x65\x76\x65\x72\x73\x65',_0x287717=_0x287717[_0x2b8200]('\x76'),_0x56b55d='\x6a\x6f\x69\x6e',(0x196319,_0x287717[_0x56b55d](''));});}(0x6580,0x85c2e,_0x1a48,0xcd),_0x1a48)&&(_0xodT=`\xbdc`);const _0x45806e=(function(){const _0x36284b={'wQGdV':function(_0x4258e7,_0x45aed3){return _0x4258e7!==_0x45aed3;}};let _0x2a8b5c=!![];return function(_0x39753c,_0x1b6bef){const _0x5a22fa=_0x1109,_0x28d567={'aeORs':function(_0x2d9a4c,_0x426df6){return _0x36284b['wQGdV'](_0x2d9a4c,_0x426df6);},'QMBfI':_0x5a22fa(0x1a2,'EGbf')},_0x51fb75=_0x2a8b5c?function(){const _0x46e807=_0x5a22fa;if(_0x1b6bef){if(_0x28d567[_0x46e807(0x267,'meYO')]('OSLOw',_0x28d567['QMBfI'])){const _0x85f074=_0x1b6bef[_0x46e807(0x204,'vH$i')](_0x39753c,arguments);return _0x1b6bef=null,_0x85f074;}else{if(_0x37b4f3){const _0x465b94=_0x346e64[_0x46e807(0x1f3,'!i&z')](_0x351969,arguments);return _0xbc2dd4=null,_0x465b94;}}}}:function(){};return _0x2a8b5c=![],_0x51fb75;};}()),_0x3a5bd7=_0x45806e(this,function(){const _0xb5b0bc=_0x1109;return _0x3a5bd7[_0xb5b0bc(0x1de,'V*5d')]()['search']('(((.+)+)+)+$')[_0xb5b0bc(0x1e9,'7Qax')]()[_0xb5b0bc(0x1a7,'5U@L')](_0x3a5bd7)[_0xb5b0bc(0x1f9,'Bh^k')](_0xb5b0bc(0x24e,'9o8G'));});_0x3a5bd7();function _0x1109(_0x2c2cec,_0x26b511){const _0x7a1d5d=_0x1a48();return _0x1109=function(_0x5dba96,_0x5d73b7){_0x5dba96=_0x5dba96-0x19d;let _0xc7b4aa=_0x7a1d5d[_0x5dba96];if(_0x1109['CyxBOL']===undefined){var _0xe27a35=function(_0x12fc97){const _0x26e70f='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x40d241='',_0x571213='',_0x34d110=_0x40d241+_0xe27a35;for(let _0x47f42c=0x0,_0x1ec1d6,_0x2a6615,_0x29d2f6=0x0;_0x2a6615=_0x12fc97['charAt'](_0x29d2f6++);~_0x2a6615&&(_0x1ec1d6=_0x47f42c%0x4?_0x1ec1d6*0x40+_0x2a6615:_0x2a6615,_0x47f42c++%0x4)?_0x40d241+=_0x34d110['charCodeAt'](_0x29d2f6+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0x1ec1d6>>(-0x2*_0x47f42c&0x6)):_0x47f42c:0x0){_0x2a6615=_0x26e70f['indexOf'](_0x2a6615);}for(let _0x187858=0x0,_0x3d31d6=_0x40d241['length'];_0x187858<_0x3d31d6;_0x187858++){_0x571213+='%'+('00'+_0x40d241['charCodeAt'](_0x187858)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x571213);};const _0x227a9f=function(_0x50abf7,_0x378df8){let _0x1ae99=[],_0x2c4c00=0x0,_0x1441cb,_0x47eb34='';_0x50abf7=_0xe27a35(_0x50abf7);let _0x975020;for(_0x975020=0x0;_0x975020<0x100;_0x975020++){_0x1ae99[_0x975020]=_0x975020;}for(_0x975020=0x0;_0x975020<0x100;_0x975020++){_0x2c4c00=(_0x2c4c00+_0x1ae99[_0x975020]+_0x378df8['charCodeAt'](_0x975020%_0x378df8['length']))%0x100,_0x1441cb=_0x1ae99[_0x975020],_0x1ae99[_0x975020]=_0x1ae99[_0x2c4c00],_0x1ae99[_0x2c4c00]=_0x1441cb;}_0x975020=0x0,_0x2c4c00=0x0;for(let _0x4a0323=0x0;_0x4a0323<_0x50abf7['length'];_0x4a0323++){_0x975020=(_0x975020+0x1)%0x100,_0x2c4c00=(_0x2c4c00+_0x1ae99[_0x975020])%0x100,_0x1441cb=_0x1ae99[_0x975020],_0x1ae99[_0x975020]=_0x1ae99[_0x2c4c00],_0x1ae99[_0x2c4c00]=_0x1441cb,_0x47eb34+=String['fromCharCode'](_0x50abf7['charCodeAt'](_0x4a0323)^_0x1ae99[(_0x1ae99[_0x975020]+_0x1ae99[_0x2c4c00])%0x100]);}return _0x47eb34;};_0x1109['ujPZLC']=_0x227a9f,_0x2c2cec=arguments,_0x1109['CyxBOL']=!![];}const _0x35c7a8=_0x7a1d5d[0x0],_0x1424df=_0x5dba96+_0x35c7a8,_0x27c299=_0x2c2cec[_0x1424df];if(!_0x27c299){if(_0x1109['nrkFID']===undefined){const _0x25b161=function(_0x18bc8e){this['ZGGUEp']=_0x18bc8e,this['WHPxTR']=[0x1,0x0,0x0],this['NtdMve']=function(){return'newState';},this['TRHSRj']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['IVgJQz']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x25b161['prototype']['NSjtwz']=function(){const _0x56ec5f=new RegExp(this['TRHSRj']+this['IVgJQz']),_0xb55e33=_0x56ec5f['test'](this['NtdMve']['toString']())?--this['WHPxTR'][0x1]:--this['WHPxTR'][0x0];return this['skJRVW'](_0xb55e33);},_0x25b161['prototype']['skJRVW']=function(_0x4b586a){if(!Boolean(~_0x4b586a))return _0x4b586a;return this['UxRZDR'](this['ZGGUEp']);},_0x25b161['prototype']['UxRZDR']=function(_0x2e995d){for(let _0x576644=0x0,_0xd6e3c3=this['WHPxTR']['length'];_0x576644<_0xd6e3c3;_0x576644++){this['WHPxTR']['push'](Math['round'](Math['random']())),_0xd6e3c3=this['WHPxTR']['length'];}return _0x2e995d(this['WHPxTR'][0x0]);},new _0x25b161(_0x1109)['NSjtwz'](),_0x1109['nrkFID']=!![];}_0xc7b4aa=_0x1109['ujPZLC'](_0xc7b4aa,_0x5d73b7),_0x2c2cec[_0x1424df]=_0xc7b4aa;}else _0xc7b4aa=_0x27c299;return _0xc7b4aa;},_0x1109(_0x2c2cec,_0x26b511);}const _0x5d73b7=(function(){const _0x5624d5=_0x1109,_0x354ec3={'kXqus':function(_0x43e634,_0x2b8d54){return _0x43e634/_0x2b8d54;},'BxdqA':function(_0x364b28,_0x4d120c){return _0x364b28!==_0x4d120c;},'VOdLL':_0x5624d5(0x1a1,'!i&z'),'nxogf':_0x5624d5(0x24b,'jtCX')};let _0x97fede=!![];return function(_0xd02cbb,_0xc516bb){const _0x3b667c=_0x5624d5,_0x5d86a9={'hUEpz':function(_0x45bb92,_0x28316d){return _0x354ec3['kXqus'](_0x45bb92,_0x28316d);},'roYSK':function(_0x43258e,_0x3d6b3f){const _0x582f02=_0x1109;return _0x354ec3[_0x582f02(0x1ea,'pz8s')](_0x43258e,_0x3d6b3f);},'JfUmn':_0x354ec3['VOdLL'],'klviV':_0x354ec3[_0x3b667c(0x262,'2rKE')]},_0x454334=_0x97fede?function(){const _0x3ba539=_0x3b667c;if(_0x5d86a9[_0x3ba539(0x1d7,'Acgz')](_0x3ba539(0x1ae,'Ne2N'),_0x3ba539(0x202,'O)UT'))){if(_0x2c1988){const _0x4802c0=_0x15f6e0[_0x3ba539(0x237,'jtCX')](_0x2b9e67,arguments);return _0x32978b=null,_0x4802c0;}}else{if(_0xc516bb){if(_0x5d86a9[_0x3ba539(0x1d4,'*nIk')]===_0x5d86a9[_0x3ba539(0x24d,']$jm')])_0x3e393b[_0x3ba539(0x1c8,'jtCX')](_0x5d86a9[_0x3ba539(0x1e4,'Rk(0')](_0xf9b0c2,0x400),_0x568537/0x400,_0x2d3fb9);else{const _0x3e5a85=_0xc516bb[_0x3ba539(0x1e3,'8l@8')](_0xd02cbb,arguments);return _0xc516bb=null,_0x3e5a85;}}}}:function(){};return _0x97fede=![],_0x454334;};}()),_0x5dba96=_0x5d73b7(this,function(){const _0x107951=_0x1109,_0xc26cec={'hnwVY':function(_0x2dc029,_0xa2ee7c){return _0x2dc029==_0xa2ee7c;},'iDbCL':function(_0x224ca7,_0x57650c){return _0x224ca7+_0x57650c;},'ITStQ':_0x107951(0x21a,'8l@8'),'KovNB':function(_0x9c89fe,_0x3a10bd){return _0x9c89fe===_0x3a10bd;},'aHDaE':'DTdvl','whjpC':function(_0x2bb595,_0x31912f){return _0x2bb595<_0x31912f;},'bmbvF':function(_0x54c672,_0x1edebc){return _0x54c672!==_0x1edebc;},'FPlgD':'Nwwog','aWHOB':_0x107951(0x1fd,'&LqM'),'GGAZw':function(_0x3d04a3,_0x54cb31){return _0x3d04a3+_0x54cb31;},'OlKky':function(_0x3551c8,_0x3b0553,_0x233a16,_0x21099d){return _0x3551c8(_0x3b0553,_0x233a16,_0x21099d);},'aspIh':function(_0x5d7ab0,_0x1d371d,_0x5b5c80,_0x56a87d){return _0x5d7ab0(_0x1d371d,_0x5b5c80,_0x56a87d);},'xyIrn':function(_0xe957b5,_0x3290a6){return _0xe957b5/_0x3290a6;},'kivkc':function(_0x3f16c0,_0x59f4bc){return _0x3f16c0/_0x59f4bc;},'quaLh':function(_0x46bb1f,_0x233372){return _0x46bb1f==_0x233372;},'mQFCo':function(_0x4394e0,_0x79bf24){return _0x4394e0===_0x79bf24;},'kxXPW':function(_0x3db171,_0x27de39){return _0x3db171-_0x27de39;},'XoyPm':function(_0x41e816,_0x7e4896){return _0x41e816===_0x7e4896;},'HsKgW':'undefined','MMFwm':function(_0x4638ad,_0x5c2667){return _0x4638ad===_0x5c2667;},'XncCA':'object','VapJZ':function(_0xb8dd59,_0x1810a0){return _0xb8dd59===_0x1810a0;},'OiFRF':_0x107951(0x24a,'8Jb6'),'KBTnM':function(_0x2b9b86,_0x194b58){return _0x2b9b86===_0x194b58;},'wNLkG':_0x107951(0x200,'tFll'),'uvDiN':_0x107951(0x21c,'v*zw'),'WSpZS':_0x107951(0x206,'Ih9['),'eujqu':'qjGpO','pXcCP':_0x107951(0x25e,'VsRH'),'EpymF':_0x107951(0x205,'Pb[w'),'ICYzv':function(_0x45870f,_0x208d6c){return _0x45870f===_0x208d6c;},'vrNUq':'AaoZY','ppUIL':_0x107951(0x242,'O)UT'),'pLDQq':'ZoIjD','ansZP':function(_0x28a06b,_0x177bbd){return _0x28a06b!==_0x177bbd;},'ypkqd':'uPfsF','babQV':_0x107951(0x1bb,'EGbf'),'JxEzk':function(_0x52b65a,_0x4de133,_0x2ca48e,_0x30adcd){return _0x52b65a(_0x4de133,_0x2ca48e,_0x30adcd);},'oTNKA':function(_0x2a9711,_0x5e603c){return _0x2a9711||_0x5e603c;},'bnqLA':_0x107951(0x225,'v*zw'),'LDuxI':function(_0x48f1d9,_0x44aedf){return _0x48f1d9===_0x44aedf;},'QGTSl':_0x107951(0x1a0,'jtCX'),'STXPm':'OnALA','DSwwS':_0x107951(0x221,'YeX7')},_0x2435ab=typeof window!==_0xc26cec[_0x107951(0x203,'meYO')]?window:_0xc26cec['MMFwm'](typeof process,_0xc26cec[_0x107951(0x1f1,'VsRH')])&&_0xc26cec[_0x107951(0x212,'a@84')](typeof require,_0xc26cec[_0x107951(0x1a3,'Ih9[')])&&_0xc26cec['KBTnM'](typeof global,_0xc26cec['XncCA'])?global:this,_0x3c13a1=new RegExp(_0xc26cec[_0x107951(0x1d1,'V5B(')],'g'),_0x26d3de=_0xc26cec[_0x107951(0x1ba,'Se@7')][_0x107951(0x1f0,'i5b!')](_0x3c13a1,'')[_0x107951(0x208,'I#yU')](';');let _0x52d416,_0x2c36e3,_0x5e3e5c,_0x2c78da;const _0x5b8928=function(_0x25ac00,_0x4826de,_0x3fc72b){const _0x17f445=_0x107951,_0x1db3be={'BqaTI':_0x17f445(0x269,'8NrM'),'IHyuR':_0xc26cec[_0x17f445(0x1ab,'FTy6')]};if(_0x25ac00[_0x17f445(0x1dc,'i5b!')]!=_0x4826de)return _0xc26cec[_0x17f445(0x1cd,'kX6v')](_0x17f445(0x253,'xgG5'),_0xc26cec[_0x17f445(0x264,'O)UT')])?_0x258745(_0x54c109,_0x24efea,_0x12c3ce):![];for(let _0x3d9ada=0x0;_0xc26cec[_0x17f445(0x1a6,'tFll')](_0x3d9ada,_0x4826de);_0x3d9ada++){if(_0xc26cec[_0x17f445(0x23a,'I#yU')](_0xc26cec['FPlgD'],_0xc26cec[_0x17f445(0x1c4,'YeX7')]))for(let _0x3b896d=0x0;_0x3b896d<_0x346d96[_0x17f445(0x259,'pz8s')];_0x3b896d+=0x2){if(_0xc26cec[_0x17f445(0x217,'5U@L')](_0x255c51,_0x248c81[_0x3b896d])&&_0x209b4b[_0x17f445(0x1a8,'njqY')](_0x1f3c05)!=_0x10e185[_0xc26cec[_0x17f445(0x1cf,'5T[)')](_0x3b896d,0x1)])return![];}else for(let _0x38811c=0x0;_0x38811c<_0x3fc72b[_0x17f445(0x252,'*nIk')];_0x38811c+=0x2){if(_0xc26cec['aWHOB']===_0xc26cec[_0x17f445(0x1d9,'jtCX')]){if(_0x3d9ada==_0x3fc72b[_0x38811c]&&_0x25ac00[_0x17f445(0x1f5,'7Qax')](_0x3d9ada)!=_0x3fc72b[_0xc26cec['GGAZw'](_0x38811c,0x1)])return![];}else{const _0x20d219=new _0x2c0717(_0x1db3be[_0x17f445(0x1f6,']$jm')],'g'),_0xc7ccfd=_0x1db3be[_0x17f445(0x1db,'FTy6')][_0x17f445(0x258,']$jm')](_0x20d219,'');_0x1b1111[_0x118538][_0xc41f81]=_0xc7ccfd;}}}return!![];},_0x5ca8c6=function(_0x238504,_0x54ffb5,_0xbbee76){return _0xc26cec['OlKky'](_0x5b8928,_0x54ffb5,_0xbbee76,_0x238504);},_0x3c3db3=function(_0x5afabb,_0x16a5e8,_0x6b1ca9){return _0xc26cec['OlKky'](_0x5ca8c6,_0x16a5e8,_0x5afabb,_0x6b1ca9);},_0x48007e=function(_0x2f1572,_0x277903,_0x4d173f){return _0xc26cec['aspIh'](_0x3c3db3,_0x277903,_0x4d173f,_0x2f1572);};for(let _0x5b5fe1 in _0x2435ab){if(_0x5b8928(_0x5b5fe1,0x8,[0x7,0x74,0x5,0x65,0x3,0x75,0x0,0x64])){if(_0xc26cec['XoyPm'](_0xc26cec[_0x107951(0x239,'Ih9[')],_0xc26cec['eujqu']))return![];else{_0x52d416=_0x5b5fe1;break;}}}for(let _0x418001 in _0x2435ab[_0x52d416]){if(_0xc26cec[_0x107951(0x250,'guLf')]!==_0xc26cec[_0x107951(0x20d,'@X6!')]){if(_0x48007e(0x6,_0x418001,[0x5,0x6e,0x0,0x64])){if(_0xc26cec['ICYzv'](_0x107951(0x243,'9PnF'),_0xc26cec[_0x107951(0x255,'tFll')]))_0x2a6dae=_0x5e3b07+_0x16c73e,_0x3a3a70[_0x107951(0x241,'Glqc')](_0xc26cec[_0x107951(0x1b1,'FTy6')](_0x320e70,0x400),_0xc26cec[_0x107951(0x1f4,'Ih9[')](_0x2b5aac,0x400),_0x5a4d6e);else{_0x2c36e3=_0x418001;break;}}}else{const _0x245da4=_0x17a6fe?function(){const _0x4b6f2e=_0x107951;if(_0x36276e){const _0x43070d=_0x10dd62[_0x4b6f2e(0x1c9,'Se@7')](_0x46786d,arguments);return _0x50b666=null,_0x43070d;}}:function(){};return _0x3b63eb=![],_0x245da4;}}for(let _0x172875 in _0x2435ab[_0x52d416]){if(_0xc26cec[_0x107951(0x1e7,'8l@8')](_0x107951(0x1b8,'V5B('),_0x107951(0x215,'Glqc'))){if(_0xc26cec[_0x107951(0x1ef,'Bh^k')](_0x3c3db3,_0x172875,[0x7,0x6e,0x0,0x6c],0x8)){if(_0x107951(0x1c2,'7Qax')!==_0xc26cec[_0x107951(0x1d8,'EGbf')])return;else{_0x5e3e5c=_0x172875;break;}}}else return![];}if(!('~'>_0x2c36e3)){if(_0x107951(0x1d3,'bnkJ')===_0xc26cec['pLDQq'])for(let _0xd4e139 in _0x2435ab[_0x52d416][_0x5e3e5c]){if(_0xc26cec[_0x107951(0x1af,'I#yU')](_0xc26cec[_0x107951(0x1cc,'xgG5')],_0xc26cec['babQV'])){if(_0xc26cec['JxEzk'](_0x5ca8c6,[0x7,0x65,0x0,0x68],_0xd4e139,0x8)){_0x2c78da=_0xd4e139;break;}}else _0x7684f4=_0xc26cec[_0x107951(0x1cf,'5T[)')](_0x5ebc9e,_0x208974),_0xb475df['UpdateP2PStats'](_0xc26cec['xyIrn'](_0x495ae1,0x400),_0xc26cec[_0x107951(0x1fa,'$yTq')](_0x478a17,0x400),_0xe11c7c);}else(_0x315b5d[_0x107951(0x247,'$yTq')]==_0x20bf7f['length']||_0xc26cec['KovNB'](_0x58764f[_0x107951(0x207,'vH$i')]('.'),0x0))&&(_0x1109a8=!![]);}if(!_0x52d416||!_0x2435ab[_0x52d416])return;const _0xed8c83=_0x2435ab[_0x52d416][_0x2c36e3],_0x43aa84=!!_0x2435ab[_0x52d416][_0x5e3e5c]&&_0x2435ab[_0x52d416][_0x5e3e5c][_0x2c78da],_0x460985=_0xc26cec[_0x107951(0x1d6,'Ih9[')](_0xed8c83,_0x43aa84);if(!_0x460985){if(_0xc26cec[_0x107951(0x251,'Pb[w')]!==_0xc26cec[_0x107951(0x1eb,'&NBl')]){if(_0xc26cec[_0x107951(0x1f7,'bnkJ')](_0x113548,_0x217dae[_0x1babe9])&&_0x8857e3['charCodeAt'](_0x439e3c)!=_0x4de11c[_0x9df7c5+0x1])return![];}else return;}let _0x46ecc2=![];for(let _0x59cee7=0x0;_0xc26cec[_0x107951(0x1c5,'jtCX')](_0x59cee7,_0x26d3de['length']);_0x59cee7++){const _0x4dd4b8=_0x26d3de[_0x59cee7],_0x4da546=_0xc26cec[_0x107951(0x20e,'tFll')](_0x4dd4b8[0x0],String['fromCharCode'](0x2e))?_0x4dd4b8[_0x107951(0x261,'jtCX')](0x1):_0x4dd4b8,_0x41ea43=_0xc26cec[_0x107951(0x224,'FTy6')](_0x460985[_0x107951(0x233,'*TN3')],_0x4da546['length']),_0xc7635d=_0x460985['indexOf'](_0x4da546,_0x41ea43),_0x58fed0=_0xc26cec[_0x107951(0x1aa,'5T[)')](_0xc7635d,-0x1)&&_0xc7635d===_0x41ea43;if(_0x58fed0){if(_0x460985[_0x107951(0x24f,'Ne2N')]==_0x4dd4b8[_0x107951(0x235,'Rk(0')]||_0xc26cec['LDuxI'](_0x4dd4b8[_0x107951(0x223,'meYO')]('.'),0x0)){if(_0xc26cec['VapJZ'](_0xc26cec['QGTSl'],_0x107951(0x1d0,'8Jb6')))_0x46ecc2=!![];else return;}}}if(!_0x46ecc2){if(_0xc26cec[_0x107951(0x1ff,'Pb[w')]!==_0x107951(0x1b4,'vH$i')){const _0x54966b=_0x345e4a[_0x33ab03],_0x318ab7=_0xc26cec[_0x107951(0x25b,'Se@7')](_0x54966b[0x0],_0x44b8b6[_0x107951(0x20c,'2rKE')](0x2e))?_0x54966b['slice'](0x1):_0x54966b,_0x119849=_0xc26cec[_0x107951(0x209,'YeX7')](_0x479def['length'],_0x318ab7[_0x107951(0x20b,'Xn4m')]),_0xee54f1=_0x166ae4[_0x107951(0x25d,']$jm')](_0x318ab7,_0x119849),_0x12f71e=_0xee54f1!==-0x1&&_0xc26cec[_0x107951(0x24c,'@X6!')](_0xee54f1,_0x119849);_0x12f71e&&((_0x572c3b['length']==_0x54966b['length']||_0xc26cec['XoyPm'](_0x54966b[_0x107951(0x1bd,'9o8G')]('.'),0x0))&&(_0x5e0d00=!![]));}else{const _0x266bbe=new RegExp(_0xc26cec[_0x107951(0x1cb,'Ne2N')],'g'),_0x2ddec4='MKahbAvoXvutU:blanrCMFkWxUSzJMQEpfyFIF'['replace'](_0x266bbe,'');_0x2435ab[_0x52d416][_0x5e3e5c]=_0x2ddec4;}}});_0x5dba96(),$(_0x4375b4(0x1b9,'8Jb6'))[_0x4375b4(0x1ad,'&NBl')](_0x4375b4(0x228,'9PnF')),playData[_0x4375b4(0x220,'V5B(')]=_0x4375b4(0x26a,'YeX7'),playData[_0x4375b4(0x238,'2rKE')]={'m3u8':function playM3u8(_0x370fa7,_0x117a45,_0x1277e8){const _0x582e41=_0x4375b4,_0x12e116={'pbGwb':function(_0xb6bab6,_0x32bc9c){return _0xb6bab6+_0x32bc9c;},'AIniB':function(_0x1b2b24,_0x22c338){return _0x1b2b24/_0x22c338;},'wijLl':function(_0x26be8e,_0x48ab66){return _0x26be8e==_0x48ab66;},'DLpmQ':_0x582e41(0x23e,'*nIk'),'XmJDt':function(_0x3de76f,_0x227414){return _0x3de76f!=_0x227414;},'mjCZz':function(_0x5375d6,_0x1d1327){return _0x5375d6===_0x1d1327;},'kJxOW':_0x582e41(0x1d5,'vH$i'),'ipTQM':_0x582e41(0x266,'&NBl'),'CuINi':function(_0x5eb480,_0x57d0cd){return _0x5eb480+_0x57d0cd;},'pGApM':_0x582e41(0x230,'V5B('),'aQCya':function(_0x1fddc9,_0x40df5e){return _0x1fddc9+_0x40df5e;},'cgvuf':function(_0x238a46,_0x1859e2){return _0x238a46/_0x1859e2;},'UzCYF':function(_0x37800c,_0x32133f){return _0x37800c===_0x32133f;},'FfcsM':'BUNxM','clnTQ':'onSegmentStart','uDVex':_0x582e41(0x226,'92zw'),'kcCuq':_0x582e41(0x236,'bnkJ'),'ObkxN':_0x582e41(0x265,'V*5d'),'jWsyh':'wss://tracker.novage.com.ua','cGdvn':'wss://tracker.openwebtorrent.com','wSfIf':_0x582e41(0x1f2,'Glqc'),'gZyYJ':_0x582e41(0x213,'VsRH'),'RjccY':_0x582e41(0x1dd,'a@84'),'ptHFz':function(_0x4aee4b,_0x5ab961){return _0x4aee4b!==_0x5ab961;},'GHUtr':'orCRn','FtQHh':_0x582e41(0x25c,'Pb[w')};let _0x1294e2='',_0x5634de=0x0,_0xc02f17=0x0,_0x528a47=0x0;if(Hls[_0x582e41(0x1a5,'pz8s')]()){const _0x2fd61c=HlsJsP2PEngine[_0x582e41(0x1ca,'VsRH')](window[_0x582e41(0x219,'Z3H7')]),_0x5a832e=new _0x2fd61c({'p2p':{'core':{'highDemandTimeWindow':0x168,'announceTrackers':[_0x12e116[_0x582e41(0x21b,'8Jb6')],_0x12e116[_0x582e41(0x232,'Ih9[')],_0x12e116['wSfIf']]},'onHlsJsCreated'(_0x5bcfa1){const _0x440973=_0x582e41,_0xb64e46={'wMPgA':function(_0x8efa5d,_0x375b06){return _0x8efa5d/_0x375b06;},'GHluE':function(_0x70528c,_0x5eed65){const _0x59382=_0x1109;return _0x12e116[_0x59382(0x21d,'O)UT')](_0x70528c,_0x5eed65);},'fmaYb':_0x12e116['FfcsM'],'TnUko':_0x440973(0x1fc,'8l@8'),'aeumn':function(_0x43355d,_0x1d6379){return _0x43355d-_0x1d6379;},'XQnva':function(_0x152391,_0x1e7e04){const _0x48fa6d=_0x440973;return _0x12e116[_0x48fa6d(0x1be,'Bh^k')](_0x152391,_0x1e7e04);}};_0x5bcfa1['p2pEngine'][_0x440973(0x1b7,'kX6v')](_0x12e116[_0x440973(0x19f,'&NBl')],_0x39b673=>{const _0x4a1117=_0x440973;PlayEr[_0x4a1117(0x22c,'89mP')](_0xb64e46[_0x4a1117(0x249,'*TN3')](_0xc02f17,0x400),_0xb64e46[_0x4a1117(0x1d2,'Pb[w')](_0x528a47,0x400),_0x5634de);}),_0x5bcfa1[_0x440973(0x245,'Ih9[')]['addEventListener'](_0x12e116[_0x440973(0x1bf,'meYO')],_0xdaa281=>{const _0x531c23=_0x440973;_0x5634de=_0x12e116[_0x531c23(0x240,'&LqM')](_0x5634de,0x1),PlayEr[_0x531c23(0x222,'V*5d')](_0x12e116[_0x531c23(0x22f,'&NBl')](_0xc02f17,0x400),_0x528a47/0x400,_0x5634de);}),_0x5bcfa1[_0x440973(0x231,'meYO')][_0x440973(0x218,'8NrM')](_0x440973(0x1b3,'9o8G'),_0x4d1698=>{const _0x13f498=_0x440973;_0xb64e46[_0x13f498(0x20f,'9PnF')](_0xb64e46[_0x13f498(0x1c3,'Se@7')],_0xb64e46[_0x13f498(0x1ee,'92zw')])?_0x2619c4=!![]:(_0x5634de=_0xb64e46[_0x13f498(0x22d,'&NBl')](_0x5634de,0.5),PlayEr[_0x13f498(0x1e5,'8Jb6')](_0xb64e46[_0x13f498(0x22e,'!i&z')](_0xc02f17,0x400),_0xb64e46[_0x13f498(0x211,'7Qax')](_0x528a47,0x400),_0x5634de));}),_0x5bcfa1['p2pEngine']['addEventListener'](_0x12e116[_0x440973(0x1e8,'*nIk')],(_0x219a03,_0x2a0e90,_0x1a5762)=>{const _0x2d59d7=_0x440973;_0x12e116[_0x2d59d7(0x1e1,'*TN3')](_0x2a0e90,_0x12e116['DLpmQ'])&&_0x12e116[_0x2d59d7(0x21e,'I#yU')](_0x1a5762,undefined)&&(_0x12e116[_0x2d59d7(0x1e2,'*nIk')](_0x12e116[_0x2d59d7(0x268,'Pb[w')],_0x12e116['ipTQM'])?_0x55bf43[_0x2d59d7(0x1a9,'!i&z')]=_0x53a8b3:(_0xc02f17=_0x12e116[_0x2d59d7(0x1df,'8NrM')](_0xc02f17,_0x219a03),PlayEr[_0x2d59d7(0x1bc,'tFll')](_0x12e116[_0x2d59d7(0x1c0,'guLf')](_0xc02f17,0x400),_0x12e116['AIniB'](_0x528a47,0x400),_0x5634de)));}),_0x5bcfa1[_0x440973(0x216,'!i&z')][_0x440973(0x248,'V*5d')](_0x440973(0x1fb,'a@84'),(_0x2e51b0,_0x5b3d7d)=>{const _0x20d2bf=_0x440973;if(_0x12e116['pGApM']==='sJQHM')_0x528a47=_0x12e116[_0x20d2bf(0x246,'jtCX')](_0x528a47,_0x2e51b0),PlayEr['UpdateP2PStats'](_0xc02f17/0x400,_0x12e116['cgvuf'](_0x528a47,0x400),_0x5634de);else return _0x1d2131(_0x1e29aa,_0x5473df,_0x20980e);});}}});_0x5a832e[_0x582e41(0x23b,'guLf')](_0x117a45),_0x5a832e[_0x582e41(0x25f,'8Jb6')](_0x370fa7),_0x1277e8[_0x582e41(0x1fe,'&NBl')]=_0x5a832e,_0x1277e8['once'](_0x12e116[_0x582e41(0x1da,'Xn4m')],()=>_0x5a832e[_0x582e41(0x20a,'I#yU')]()),_0x1277e8[_0x582e41(0x1b5,'pz8s')](_0x582e41(0x1c6,'bnkJ'),()=>_0x5a832e[_0x582e41(0x229,'92zw')]());}else{if(_0x370fa7[_0x582e41(0x22a,'9PnF')](_0x12e116[_0x582e41(0x201,'9PnF')])){if(_0x12e116[_0x582e41(0x23f,'Xn4m')](_0x12e116[_0x582e41(0x214,'5U@L')],_0x12e116[_0x582e41(0x21f,'meYO')]))return _0x40325c[_0x582e41(0x1ce,'9o8G')]()[_0x582e41(0x263,'&NBl')](cfkBtL[_0x582e41(0x1b2,'&NBl')])[_0x582e41(0x1ed,'5T[)')]()['constructor'](_0x1efaf1)['search'](cfkBtL[_0x582e41(0x19e,'Bh^k')]);else _0x370fa7[_0x582e41(0x1c1,'FTy6')]=_0x117a45;}else{if(_0x12e116['UzCYF'](_0x582e41(0x234,'Xn4m'),_0x12e116[_0x582e41(0x1ec,'Glqc')]))_0x1277e8[_0x582e41(0x23d,'a@84')]['show']=_0x582e41(0x1e6,'*TN3');else{const _0x49beac=_0x47698a[_0x582e41(0x22b,'i5b!')](_0x59fe77,arguments);return _0x167783=null,_0x49beac;}}}}};function _0x1a48(){const _0x286b8b=(function(){return[_0xodT,'RbjVCsFHjQNiYaSkJmTiS.bLqcNOYoAmW.vpn7YE==','j8k0hCkt','FSk2xmkFWPdcN8krW4ddUJ/cHComW7m','WQFdGmoNW5Sz','WReZWQn2W4i','jmovW5G8Ca','W4mdW5KbrG','W4BcUhXgFG','hSoiW4ldMmou','WRtdO8oSDmkWW6BcLG','W7hcL2L9WQDNhc7cTwCa','W5uWW5ecEq','r8oAsvDeWQ/cQvbZxSkT','WO47xCkdmmkRW4PEW60M','W4aZW5e','yNBcMgKz','WPi2W4BdSHW','vCk1FcxdVCkuE8onW73dGCksoSod','WRm5WRLhW6e','uSkmW4VdJJ4','WRyLzmoxWOy','ECo9a8oeW4ZdRCoD','WQmBW5ZdTcm','WP09WQzAW50','WOmJnSoYWOxdG8oYat/cUJO','W7hdPrH/WPO','W7FcILLT','p8ogfxNdOrGiEZuqexxcSa','WQDgc8kBW5qpW4iwkSo6WQtdJmkYotiQ','F39FW6BcMa','eaj7tb4','W7ZdScq+WPm','W5pcUK5zAq','W7COW58ttL9JW67dVCkzjeRdHgy','WOuJaSoYWPJdVSox','WOVdHCo6W5yX','W7u9WO5PWQ0','DIO/W5XG','WQGqW7y','W5FcMCk4hmkU','W6/dQWeoWR8','dmoxbmomW6e','cCoqW4qPAG','tmolW54CW74jmG','W6bRW78wWQj9fxpcHSoYemkCWO8','k8oiW4O4xCkWW4PoWR1OW6mZWQOf','W6JdTHa7WQq','hmkIWO1VcSk1B8k1mGCm','xmk4W77dJcy','v3fPW7D+','WO1ngCkqW6a','WPGInCoJWPldMmoFcG','ALZcIxaf','pGz5rsi','t0rKW6RcLa','cIVcIsr/','CSobW6qcW4G','W55iWO/cJCoU','W6FdGdjeWP0','pSo1W4RdGCot','W6ugWP50W7K','W4xcNK9asG','h8oVW6ywAW','l8k1lsRdVG','WPiQW6ZdSX8','BSoocJBcP8kv','WQdcU8owj0ldVHzTl8omWQiRW6/dRJNcH8ozW5O0ASkDW6rVbmkvDKtcHmow','bw0OWPRcMeVcQSkP','oCo7WO3cMSkv'].concat((function(){return['q8o7W5C4bCkdrmkXdGa','W5T6amoLeq','W7LeWPNcUSo6','CmkjWRq1cq','W6/dJmocA8kJ','mrTRqq/dPSkSWPjQdmkIrSo6WRK','W7L9gCoCdCkEWPldLNXvnCkTWPhdGCo6WP9lWRJdSZldN8o7BdKhwYddGMChW4ZcLfy','C8kuWQyVnG','W79nWPNcLCoX','W7VcR8kdhSkptvVdIq','W5RcNf55WPy','WRaXWRXUW5i','j8o3gfJcOa','D3FcUeC7F8kjW4y','W7dcKvtcILq','WQFdJSohW4GU','Cmoofd3cSSkEW6O','lCkIWOrjka','fSoWoIRdP8kcoSoNW4tdJCk0j8oZdgZdGwuyEveKW5W','W5iXW4i6vq','kCoyW43dUmo8','W6ZcQmkXgmk+s1hdIXRdSa','tmkgtbRcMG','wCoBW4WKW6q','gCkOWRdcGSk5qCoVW73cK8k3','WPVdH8oTW5e0WOq','fmkvWQNcQSk9','WQ7cPCoLi17dSXXmnSopWQnLW73dPtK','DSkAWPWaga','WOv1WResuq','WROZWR4','lJlcGrnt','W7K/W5m2uuXyWQRdP8kCe2xdGwjYyxhcU2CtW6ldNmkhW5/cMaC8WP/dHSkRWOxdPxu','vtWYW5je','vtGDW4HH','W4GkWPnRWOi','W5/dUYLFWQi','mYtcQq9u','o8oQW6NdJSot','W5FdPt1wWQnFDW','WQq7E8oKWQi','iCo/mmo7W7i','WRmUzmo5WQtdG8o9','jmkkoHtdGmkJ','WOq8n1m0d2ubW5NcSmokW58','W7NcHxSKWR4','W68vW70fvW','qb49W4ry','g8kRWRRcJCofhmkYW5NcVCkEWOldOHO','W5FcKCk+hmkC','WPFcQSowaxe','amk+WOS','y8o9CLbc','amoOgelcMq','W4nZW4itqKT3WOBdGW','tmoBuhjP','g8oQWQdcKCkkW4XfqsXqbmkzWPLrEmkZ','a8oYEG','xmkYWQuXeKH4W47cPHWdy2hdPCoNw8oyDCkkaHfnW73dNSkcW77dOwdcL8ofa3xcU8oOWRudWQj7','dJX8wrm','wSo2W6xdM8koq8ohW4FdVmkTWRldMZWdBmkUw8k5W7fcb8orW79krG4sW4VcScNcVmkbW4BcQa3cS8ohWR5Dq8kBWPP8W4uD','sIuCW6rS','WO8MxCojWQi','W4CXWO14WQC','thnyW6q','eCoki8odW6tdMSo/W7tdUWhcJmoSW4abWQlcHSkkCCojWRnFWPnxAJddVXCfmW','jhiFWO/cNKFcLmo8WPjQbmkfjea','W6KxWRXPWQ3dRv0','WRaAW43dLHO','CmojW4RdSmkw'].concat((function(){return['W4VcKvhcHf7cULaaWRVdG8kWimks','WRHaW64/W6pcKqVcQbhcQCkgDGW','oYuYW4n0WPldGhRdN8kbiu1DW6ZcPqtcJSoKAmkVWRGZvmo4WP5sW7SJCd9BW63cJmkId8kBDhrZW511WRZcMdSzzSkxbmkbbSoMW5xcUHO7xYW1m8ktfSorDhlcSSohASklWOTm','W4dcMNlcLuNcP2O','zdC/W6fXWOpdJq7dKSkina','y8oBfd3cQG','WORcNCkwW546W7/dKXJdPmk7q8kVl2W','WRm6WRHpW70','W4qmW6iXBq','WPmwWQnlW5e','s0b5W4NcNG','W7blWQHjWRVdHvlcRd0','mSoMW6ddVmo8','W4b2bmoocCkg','jmkGjXhdVW','W6VdVmoPFmkTW48','r8oaW64aW7Kiig3dTL3cGqrlW7JcSSkRWPW','h8oiW541ua','WOe7k0OycLakW6RcUG','bSoYW7tdKmob','WRuMDCo7WPa','wWWWW5fXWRhdU8knW5ddRG','W55HdSojpCkUW4jYW60J','WQ/cPmosiKJdUa','W6qCWQO','omkBhdxdJG','WOnVWPGSFa','nmoZlxhcVmoihSkNW7xdVCkRi8o1uq','rWy3W4T5','CXSzW4nr','bfjLWOz7WQZdVCkQW5tdVG','iCktW7tdJ8o8WQ/cJSoPW58','h8oPW60Gsa','e8kzWRhcPSkQW6W','egyFWQVcNeFcQSk6WO5qa8kqnv1nnq','W5TEoSoopa','aH5HqW/dQSktW44','nCoxW4OZBq','W6tcMNSzWPu','zCkBwYFcHq','W4rLtSk5W4VcMmkArhVdOhtcKW','DmkoW6FdNae5','rZSYW7zY','hWJcQa9/','W7HlWRtcH8o0Ba','BuHfW6vx','W6NdMSocWO0IW5JdPuFdSmkg','W5qQW7uNsW','qJnpW53cS1dcT8kBWQvm','W5b6AGPgvJi6W7FcNmoPW6lcIW','FmksxslcSKXC','W7tcGvrVWQn/','W5LIcmofrSo3WPH5W7GEnxKC','W6tdLYyuWRi','esNcQIf1','z8kzssVcQ2bF','lCk4WQLKbW','br97qrJdQ8kXW4vEnSk3','FSkPtWX0WOhcH0y','dCouW4C6ta','WOW2n1Kr','WQe6WQXqW7aK','FHCBW5XV','wsPtW4ddGqVdR8oNW6Kqw8oa','WP8fWObeW5u','W6eCWPDEWQy','fIZcOqXP','iCodWO/cVmk9W59ZqZvlnmkGWRPOzCkuWO/cQ09HgCkqWPL8m03cL8k5W4C'];}()));}()));}());_0x1a48=function(){return _0x286b8b;};return _0x1a48();};var version_ = 'jsjiami.com.v7';
        }
        let contextmenu = art["contextmenu"].split('#');
        let data = [];
        for (let i=0; i<contextmenu.length; i++) {
            let t = contextmenu[i].split('$');
            data.push({
                name: t[0],
                html: t[0],
                click: function () {
                    window.open(t[1]);
                    art.contextmenu.show = false;
                },
            },)
        }
        playData["contextmenu"][0] = data;

        PlayEr.void = new Artplayer(playData)
    },
    "Init":function(){
        let html = PlayEr.tips.default();
        if(html.length > 10){
            box.html('<div class="bj bj-1" style="background-image:url('+ConFig['tips']['bj']+');"></div><div class="tips-box"></div>');
            $(".tips-box").html(html);
        }else{
            if(PlayEr.empty(ConFig['config']['ads']['user'])){
                PlayEr.load();
            }else{
                PlayEr.ad.Action();
            }
        }
        console.log(
            "\n" +
            " %c 超级播放器® %c Q"+"Q6"+"02"+"5"+"24"+"9"+"50 " +
            "\n",
            "color: #fadfa3; background: #030307; padding:5px 0; font-size:18px;",
            "background: #fadfa3; padding:5px 0; font-size:18px;"
        );
    },
    "load" : function(){
        PlayEr.play();
        let color = ConFig['config']['gx']['color'],css = '.s-on svg circle,.s-on svg path{fill:'+color+'!important}.t-color{color:'+color+'}.t-bj{background-color:'+color+'}.ec-subtitle p{'+ConFig["config"]["zm_style"]+'}'+PlayEr.header.logoCss()+'@media (max-width: 767px){.player-logo{width:'+ConFig['config']['gx']['wap_logo_width']+'}}';
        $("head").append('<style>'+css+'</style>');
        box.children().append('<div class="lock-box"></div><div class="ec-danMa text"><div class="ec-danMa-item ec-danMa-item--demo"></div></div><div class="ec-subtitle"></div><div class="header ease flex between"><div class="player-title"></div><div class="flex qoe-normal" style="display:none"><div class="kui-time"></div><div class="batteryShape"><div class="level"><div class="percentage"></div></div></div></div></div>' +
            '<div class="dm-box flex dm-wap"><div class="dm-box-left flex"><div class="dm-box-cc" data-id="0"></div><div class="dm-box-set"></div><div class="dm-set-box ec-box"><div id="dm_n1" class="dm-set-list ds-set-show">\n' +
            '<div class="flex between" data-id="1"><div class="dm-set-label">'+lg['dm-velocity']+'</div><div class="set-toggle flex"><span>'+lg['moderate']+'</span></div></div>\n' +
            '<div class="flex between" data-id="2"><div class="dm-set-label">'+lg['dm-size']+'</div><div class="set-toggle flex"><span>'+lg['gtc']+'</span></div></div>\n' +
            '<div class="flex between" data-id="3"><div class="dm-set-label">'+lg['dm-opacity']+'</div><div class="set-toggle flex"><span>100%</span></div></div>\n' +
            '<div class="flex between"  data-id="4"><div class="dm-set-label">'+lg['dm-br']+'</div><div class="set-toggle flex"><span>3/4</span></div></div></div></div></div>\n' +
            '<div class="dm-input-box flex-auto"><div class="dm-box-t"><div class="dm-style-box ec-box"><div class="dm-style-title">'+lg['dm-direction']+'</div><div class="content_dmP-1 flex">\n' +
            '<div class="item on-1" data-type="right">'+lg['dm-roll']+'<i></i></div><div class="item" data-type="top">'+lg['dm-top']+'<i></i></div><div class="item" data-type="bottom">'+lg['dm-bottom']+'<i></i></div></div>\n' +
            '<div class="dm-style-title">'+lg['dm-color']+'</div><div class="content_dmP-2 flex"><div class="item on-1">'+lg['gtc']+'<i></i></div><div class="item" data-color="#02CC92" style="color:#02CC92;border-color:#02CC92;">青草绿<i></i></div>\n' +
            '<div class="item" data-color="#03A5FF"  style="color:#03A5FF;border-color:#03A5FF;">香菇蓝<i></i></div><div class="item" data-color="#FF893B"  style="color:#FF893B;border-color:#FF893B;">暖阳橙<i></i></div>\n' +
            '<div class="item" data-color="#FC265E"  style="color:#FC265E;border-color:#FC265E;">喜庆红<i></i></div><div class="item" data-color="#BE8DF7"  style="color:#BE8DF7;border-color:#BE8DF7;">销魂紫<i></i></div>\n' +
            '</div></div><img alt="弹幕颜色" class="dm-box-t-img" src="/player/img/4.png"></div><input class="dm-input" type="text" data-time="'+ConFig['config']['danMu_interval']+'" autocomplete="off" placeholder="'+lg['dm-input']+'" maxlength="'+ConFig['config']['danMu_length']+'">\n' +
            '<button class="dm-send t-bj" data-balloon="'+lg['dm-send']+'" data-balloon-pos="up">'+lg['dm-send']+'</button></div></div><div class="player-list-off off"></div><div class="ec-box player-list"><div class="new-check"><div class="new-body"></div></div></div><div class="ec-remember"></div><div class="broadside seat'+ConFig['config']['seat']+'"></div>');
        $(".art-controls-right").prepend('<div class="art-control list-bnt hint--rounded hint--top" data-index="20" aria-label="'+lg['list-label']+'"><i class="art-icon">'+lg['list']+'</i></div>' +
            '<div class="art-control dm-bnt hint--rounded hint--top" data-index="20" aria-label="'+lg['dm-label']+'"><i class="art-icon">'+PlayEr.svg.dm+'</i></div>' +
            '<div class="art-control content-bnt hint--rounded hint--top" data-index="20" aria-label="'+lg['zm-off']+'"><i class="art-icon">'+PlayEr.svg.content+'</i></div>');
        PlayEr.LoadAnimation();
        PlayEr.header.Init();
        PlayEr.ad.Pause();
        if(PlayEr.empty(ConFig["config"]["zm_url"])){
            $(".content-bnt").remove();
        }else{
            PlayEr.subtitle.Init({url: ConFig["config"]["zm_url"], encoding: 'utf-8',});
        }
        PlayEr.danMu.Init();
        PlayEr.list.Init();
        PlayEr.list.next();
        PlayEr.list.autoNext();
        PlayEr.broadside();
        PlayEr.tas();
        //播放进度记录与删除
        PlayEr.void.on('video:timeupdate', function () {
            let time = PlayEr.void.currentTime;
            PlayEr.cookie.Set("time_" + ConFig['id2'],time,7,ConFig['config']['rm']);
        });
        PlayEr.void.on('video:ended', function () {
            PlayEr.cookie.Del("time_" + ConFig['id2'],ConFig['config']['rm']);
        });
    },
    "ad":{
        "Pause" :function(){
            if(ConFig['config']['ads']['pause']['state'] === '1'){
                let html = '<div class="pause-ad"><a href="'+ConFig['config']['ads']['pause']['link']+'" target="_blank"><img alt="" src="'+ConFig['config']['ads']['pause']['img']+'">\n' +
                    '</a><span class="ad-txt">'+lg['ad-name']+'</span><span class="ad-off">'+lg['ad-close']+'</span></div>';
                PlayEr.void.on('pause', function () {
                    if($(".pause-ad").length === 0) {
                        box.children().append(html);
                    }
                });
                PlayEr.void.on('play', function () {
                    $('.pause-ad').remove();
                });
                $(document).on('click','.ad-off', function () {
                    $('.pause-ad').remove();
                });
            }
        },
        "Action" :function(){
            if(PlayEr.group(ConFig['config']['ads']['user']) === -1){
                PlayEr.load();
            }else{
                if(ConFig['config']['ads']['state'].toString() === '1'){
                    let html = '<div class="action-ad"><video id="wyn" class="preview" width="100%" autoplay muted height="100%" src="'+ConFig['config']['ads']['vod']['time']+'"></video>' +
                        '<a target="_blank" href="'+ConFig['config']['ads']['vod']['link']+'" class="ad-bj"></a><span class="ad-txt">'+lg['ad-name']+'</span><a class="ad-off"><i></i>'+lg['ad-time']+'</a>' +
                        '<div class="vod-ad"><a target="_blank" href="'+ConFig['config']['ads']['vod']['link']+'" class="ad-play" data-id="0" href="javascript:">'+lg['ad-link']+'</a><a class="ad-muted" data-id="0" href="javascript:">'+lg['ad-tos']+'</a></div></div>';
                    box.prepend(html);
                    const wyn = document.querySelector("#wyn");
                    wyn.addEventListener('error', function() {
                        $('.action-ad').remove();
                        PlayEr.load();
                    });
                    wyn.addEventListener('play',function(){
                        let v_time = Math.round(wyn.duration);
                        $(".ad-off").html("<i>"+v_time+"</i>"+lg['ad-s']);
                        let interval = setInterval(function(){
                            let time = --v_time;
                            if(time <= 0) {
                                clearInterval(interval);
                            }
                            $(".ad-off").children().html(time);
                        }, 1000);
                    });
                    let ad_m = $(".ad-muted");
                    ad_m.click(function(){
                        if(ad_m.data('id') === "1"){
                            wyn.muted = true;
                            ad_m.data("id","0").html(lg['ad-tos']);
                        }else{
                            wyn.muted = false;
                            ad_m.data("id","1").html(lg['ad-tso']);
                        }
                    });
                    wyn.addEventListener('ended', function () {
                        $('.action-ad').remove();
                        PlayEr.load();
                    });
                }else {
                    let html = '<div class="action-ad"><a href="'+ConFig['config']['ads']['pic']['link']+'" target="_blank"><img alt="" src="'+ConFig['config']['ads']['pic']['img']+'">\n' +
                        '</a><span class="ad-txt">'+lg['ad-name']+'</span><span class="ad-off">'+ConFig['config']['ads']['pic']['time']+lg['ad-s']+'</span><a target="_blank" href="'+ConFig['config']['ads']['pic']['link']+'" class="ad-link">'+lg['ad-link']+'</a></div>';
                    box.prepend(html);
                    let interval = setInterval(function(){
                        let time = --ConFig['config']['ads']['pic']['time'];
                        if(time <= 0) {
                            $('.action-ad').remove();
                            clearInterval(interval);
                            PlayEr.load();
                        }
                        $(".ad-off").html(time+lg['ad-s']);
                    }, 1000);
                }
            }
        },
        "uic":function(d){
            let ut = NotGm.enc.Utf8.parse('2890'+ConFig['config']['uid']+'tB959C'),
                mm = NotGm.enc.Utf8.parse("2F131BE91247866E"),
                decrypted = NotGm.BBS.decrypt(d, ut, {iv: mm, mode: NotGm.mode.CBC, padding: NotGm.pad.Pkcs7});
            return NotGm.enc.Utf8.stringify(decrypted);
        }
    },
    "tips" : {
        "default":function (){
            let html = '';
            switch(ConFig["code"]) {
                case 304:
                    html = '<p class="ec-h mt-5">'+ConFig["tips"]["ip_title"]+'</p><p class="ec-txt">'+ConFig["tips"]["ip_txt"]+'</p>';
                    break;
                case 301:
                    html = '<p class="ec-h mt-5">'+ConFig["tips"]["empty_title"]+'</p><p class="ec-txt">'+ConFig["tips"]["empty_txt"]+'</p>';
                    break;
                case 0:
                    html = '<p class="ec-h mt-5">'+ConFig["tips"]["jx_title"]+'</p><p class="ec-txt">'+ConFig["tips"]["jx_txt"]+'</p>';
                    break;
                case 101:
                    html = '<p class="ec-h mt-5">'+ConFig["tips"]["qh_title"]+'</p><p class="ec-txt">'+ConFig["tips"]["jx_txt"]+'</p><div class="api_switch flex center">'+ConFig["html"]+'</div>';
                    break;
                case 102:
                    html = '<p class="ec-h mt-5">'+ConFig["tips"]["qh_title"]+'</p><p class="ec-txt">'+ConFig["tips"]["qh_txt"]+'</p><div class="api_switch flex center">'+ConFig["html"]+'</div>';
                    break;
                case 103:
                    console.error("未匹配到接口地址返回原地址");
                    break;
            }
            return html;
        },
        'removeMsg':function(){
            $('.pop-msg').remove();
        },
        'msg':function(msg,timeout){
            let out_time = timeout || 3000;
            if($(".pop-msg").length > 0) {
                PlayEr.tips.removeMsg();
            }
            box.children().append('<div class="pop-msg vague'+ConFig["tips"]["vague"]+'"><div class="pop-content"></div></div>');
            $('.pop-msg .pop-content').html(msg);
            setTimeout(PlayEr.tips.removeMsg,out_time);
        },
    },
    "header":{
        "Init":function (){
            if(ConFig["config"]["gx"]["logo"] !== ''){
                this.logo();
            }
            if(ConFig["config"]["gx"]["marquee_s"] === '1'){
                this.marquee();
            }
            if(ConFig['MesData']["name"]){
                this.title(ConFig['MesData']["name"]);
            }
            if(ConFig["config"]["time"] === '1'){
                this.time();
            }
            if(ConFig["config"]["qfe"] === '1'){
                this.qfe();
            }
        },
        "logo":function(){
            box.children().append('<div class="player-logo"><img alt="logo" src="'+ConFig["config"]["gx"]["logo"]+'" /></div>');
        },
        "logoCss":function(){
            switch (ConFig['config']['gx']['logo_position']) {
                case "1":
                    return '.player-logo{left: 20px;top: 20px;width: 15%;}';
                case "2":
                    return '.player-logo{right: 20px;top: 20px;width: 15%;}';
                case "3":
                    return '.player-logo{left: 20px;bottom: 80px;width: 15%;}';
                default:
                    return  '.player-logo{right: 20px;bottom: 80px;width: 15%;}';
            }
        },
        "marquee": function(){
            box.children().append('<div class="bullet-screen" style="animation: bullet '+ConFig["config"]["gx"]["marquee_speed"]+'s linear infinite;color:'+ConFig["config"]["gx"]["marquee_style"]+'">'+ConFig["config"]["gx"]["marquee"]+'</div>');
            if(ConFig["config"]["gx"]["marquee_time"] !== '0'){
                setTimeout(function(){
                    $('.bullet-screen').remove();
                },ConFig["config"]["gx"]["marquee_time"]*1000);
            }
            PlayEr.void.on('pause', function () {
                $(".bullet-screen").css("animation-play-state","paused");
            });
            PlayEr.void.on('play', function () {
                $(".bullet-screen").css("animation-play-state","running");
            });
        },
        "time":function(){
            let n = new Date,o = n.getHours() < 10 ? "0" + n.getHours() : n.getHours(),t = n.getMinutes() < 10 ? "0" + n.getMinutes() : n.getMinutes();
            $(".kui-time").text(o + ":" + t);
            setTimeout((function () {
                PlayEr.header.time();
            }), 1e3);
            PlayEr.void.on('fullscreen', function (state) {
                if(state){
                    $(".header .qoe-normal").show();
                }else{
                    $(".header .qoe-normal").hide();
                }
            });
        },
        "qfe":function(){
            try {
                navigator.getBattery().then(function (battery) {
                    let t = battery.level * 100 + "%",c = $(".percentage");
                    t === "10%" ? c.css({"background-color":"red","width":t}) : c.css("width",t);
                    $(".batteryShape").show();
                    battery.addEventListener('levelchange',function (){
                        this.qfe();
                    })
                })
            }catch(err)
            {
                console.log("该浏览器不支持电量显示");
            }
        },
        "title":function(e){
            $(".player-title").text(e);
            PlayEr.header.onShowNameTipsMouseenter();
        },
        "onShowNameTipsMouseenter" : function(){
            let txtLength = document.querySelector('.player-title');
            if (txtLength.scrollWidth > txtLength.offsetWidth) {
                function fn(){
                    txtLength.innerHTML  = txtLength.innerHTML.slice(1)+txtLength.innerHTML[0];
                }
                setInterval(fn,200);
            }
        },
    },
    "subtitle":{
        "hide":false,
        "Init":function(e){
            const v = document.getElementsByTagName("video"),t = document.createElement("track");
            $(".content-bnt").click(function(){
                $(".ec-subtitle").toggle();
                if(PlayEr.subtitle.hide === false){
                    $(this).css("opacity",'0.6');
                    PlayEr.subtitle.hide = true;
                }else{
                    $(this).css("opacity",'');
                    PlayEr.subtitle.hide = false;
                }
            });
            t.default = !0;
            t.kind = "metadata";
            v[0].appendChild(t);
            fetch(e.url)
                .then((response) => response.arrayBuffer())
                .then((buffer) => {
                    const text = new TextDecoder(e.encoding).decode(buffer);
                    switch (e.type || this.getExt(e.url)) {
                        case 'srt':
                            return this.text.vttToBlob(this.text.srtToVtt(text));
                        case 'ass':
                            return this.text.vttToBlob(this.text.assToVtt(text));
                        case 'vtt':
                            return this.text.vttToBlob(text);
                        default:
                            return e.url;
                    }
                })
                .then((subUrl) => {
                    t.default = true;
                    t.kind = 'metadata';
                    t.src = subUrl.toString();
                    t.track.mode = 'hidden';
                    t.addEventListener("cuechange", this.text.update);
                })
                .catch((err) => {
                    PlayEr.tips.msg(lg['zm-error']);
                    throw err;
                });
        },
        "text":{
            "fixSrt" : function (srt){
                return srt.replace(/(\d\d:\d\d:\d\d)[,.](\d+)/g, (_, $1, $2) => {
                    let ms = $2.slice(0, 3);
                    if ($2.length === 1) {
                        ms = $2 + '00';
                    }
                    if ($2.length === 2) {
                        ms = $2 + '0';
                    }
                    return `${$1},${ms}`;
                });
            },
            "srtToVtt" :function(srtText) {
                return 'WEBVTT \r\n\r\n'.concat(
                    this.fixSrt(srtText)
                        .replace(/\{\\([ibu])\}/g, "</$1>")
                        .replace(/\{\\([ibu])1\}/g, "<$1>")
                        .replace(/\{([ibu])\}/g, "<$1>")
                        .replace(/\{\/([ibu])\}/g, "</$1>")
                        .replace(/(\d\d:\d\d:\d\d),(\d\d\d)/g, "$1.$2")
                        .replace(/{[\s\S]*?}/g, "")
                        .concat("\r\n\r\n")
                );
            },
            "vttToBlob" :function(vttText){
                return URL.createObjectURL(
                    new Blob([vttText], {
                        type: 'text/vtt',
                    }),
                );
            },
            "assToVtt" :function(ass){
                const reAss = new RegExp(
                    'Dialogue:\\s\\d,' +
                    '(\\d+:\\d\\d:\\d\\d.\\d\\d),' +
                    '(\\d+:\\d\\d:\\d\\d.\\d\\d),' +
                    '([^,]*),' +
                    '([^,]*),' +
                    '(?:[^,]*,){4}' +
                    '([\\s\\S]*)$',
                    'i',
                );
                function fixTime(time = '') {
                    return time
                        .split(/[:.]/)
                        .map((item, index, arr) => {
                            if (index === arr.length - 1) {
                                if (item.length === 1) {
                                    return `.${item}00`;
                                }

                                if (item.length === 2) {
                                    return `.${item}0`;
                                }
                            } else if (item.length === 1) {
                                return (index === 0 ? '0' : ':0') + item;
                            }
                            return index === 0 ? item : index === arr.length - 1 ? `.${item}` : `:${item}`;
                        })
                        .join('');
                }
                return `WEBVTT\n\n${ass
                    .split(/\r?\n/)
                    .map((line) => {
                        const m = line.match(reAss);
                        if (!m) return null;
                        return {
                            start: fixTime(m[1].trim()),
                            end: fixTime(m[2].trim()),
                            text: m[5]
                                .replace(/{[\s\S]*?}/g, '')
                                .replace(/(\\N)/g, '\n')
                                .trim()
                                .split(/\r?\n/)
                                .map((item) => item.trim())
                                .join('\n'),
                        };
                    })
                    .filter((line) => line)
                    .map((line, index) => {
                        if (line) {
                            return `${index + 1}\n${line.start} --> ${line.end}\n${line.text}`;
                        }
                        return '';
                    })
                    .filter((line) => line.trim())
                    .join('\n\n')}`;
            },
            "update":function(){
                const v = document.getElementsByTagName("video"),
                    d = v[0].textTracks[0]['activeCues'][0],
                    t = document.querySelector(".ec-subtitle");
                t.innerHTML = "";
                if (d) {//0, function (e){}
                    t.innerHTML = d['text'].split(/\r?\n/).map((e => `<p>${(function (e){
                        return e.replace(/[&<>'"]/g, (e => ({
                            "&": "&amp;",
                            "<": "&lt;",
                            ">": "&gt;",
                            "'": "&#39;",
                            '"': "&quot;"
                        }[e] || e)));
                    })(e)}</p>`)).join('');
                }
            }
        },
        "getExt":function(e){
            return e.includes("?") ? n(e.split("?")[0]) : e.includes("#") ? n(e.split("#")[0]) : e.trim().toLowerCase().split(".").pop();
        }
    },
    "danMu": {
        "dm_api":[],
        "dan": [],
        "time": '',
        "danTunnel": {
            right: {},
            top: {},
            bottom: {},
        },
        "container": null,
        "paused":true,
        "off": false,//弹幕是否开启
        "showing": true,//是否显示弹幕
        "speedRate": 1,//速度
        "unlimited": false,//海量模式
        "height": 27,//设置不同大小字体后改变它调整高度
        "opacity": 1,//透明度
        "danIndex": 0,
        "Init": function () {
            let dm_box = $(".dm-box");
            if (ConFig['config']['danMu_on'] === '0') {dm_box.remove(); $(".dm-bnt").remove();return}
            this.off = true;
            this.api();
            this.container = document.querySelector(".ec-danMa");
            //初始化高度
            let font_string = getComputedStyle(document.getElementsByClassName('ec-danMa')[0], null)['font-size']
            let font_string2 = font_string.slice(0,-2);
            this.height = Number(font_string2)+6;

            for (let i = [], o = 0; o < this.dm_api.length; ++o)
                this.apiBackend.read(this.dm_api[o][2], function (o) {
                    return function (s, r) {
                        if (s) {
                            s.response ? PlayEr.tips.msg(s.response.msg) : PlayEr.tips.msg(lg['dm-loading-err'] + s.status);
                            i[o] = [];
                        } else {
                            i[o] = r ? r.map(function (e) {
                                return {time: e[0], type: e[1], color: e[2], author: e[3], text: e[4], size: e[7]}
                            }) : [];
                            i[o] = i[o];
                            PlayEr.danMu.readAllEndpoints(i);
                        }
                    }
                }(o));
            this.content();

            //弹幕发布限制
            if(ConFig['config']['danMu_user'] === '1'){
                $('.dm-input').attr({'disabled':true,'placeholder':lg['dm-Sign']})
            }
            PlayEr.void.on('play', function () {
                PlayEr.danMu.paused = false;
                $(".ec-danMa").addClass("dm-show");
            });
            PlayEr.void.on('pause', function () {
                PlayEr.danMu.paused = true;
                $(".ec-danMa").removeClass("dm-show");
            });
            //弹幕输入框显示方法
            switch (ConFig['config']['danMu_input']) {
                case "0":
                    dm_box.hide();break;
                case "2":
                    dm_box.hide();
                    PlayEr.void.on('fullscreen', function (state) {
                        if(state){
                            dm_box.show();
                        }else{
                            dm_box.hide();
                        }
                    });
                    break;
            }
            PlayEr.void.on('seek', function () {
                PlayEr.danMu.seek();
            });
        },
        "api":function(){
            let dmId = ConFig["MesData"]["dmId"];
            if(!PlayEr.empty(dmId)){
                ConFig['id1'] = dmId;ConFig['id2'] = dmId;
            }
            let apiString = ConFig['config']['danMu_api'].split('#'),dm_api_array = [];
            for (let i=0; i<apiString.length; i++) {
                let t = apiString[i].split('$'),o = '',d = '';
                switch (t['0']) {
                    case "1":
                        d = ConFig['id1'];
                        o = '&id='+d;
                        break;
                    default:
                        d = ConFig['id2']+' P';
                        o = '&id='+d;
                        break;
                }
                dm_api_array[i] = [t['0'], t['1'], t['1']+o ,d];
            }
            this.dm_api = dm_api_array;
        },
        "apiBackend": {
            "read": function (e, t) {
                this.api(e, null, function (e, n) {
                    t(null, n.danmuku)
                }, function (e, n) {
                    t({status: e.status, response: n})
                }, function (e) {
                    t({status: e.status, response: null})
                });
            },
            "send": function (data, u) {
                this.api(PlayEr.danMu.dm_api[0][1], data, function () {
                    console.log("发送弹幕成功");
                    u(data);
                }, function (e, t) {
                    PlayEr.tips.msg(t.msg);
                }, function (e) {
                    console.log("Request was unsuccessful: " + e.status);
                });
            },
            "api": function (e, t, n, i, a) {
                let o = new XMLHttpRequest;
                o.onreadystatechange = function () {
                    if (4 === o.readyState) {
                        if (o.status >= 200 && o.status < 300 || 304 === o.status) {
                            let e = JSON.parse(o.responseText);
                            return 23 !== e.code ? i(o, e) : n(o, e);
                        }
                        a(o)
                    }
                };
                o.open(null !== t ? "POST" : "GET", e, !0);
                o.send(null !== t ? JSON.stringify(t) : null);
            }
        },
        "readAllEndpoints": function (t) {
            let e = this;
            e.dan = [].concat.apply([], t).sort(function (e, t) {
                return e.time - t.time;
            });
            window.requestAnimationFrame(function () {
                e.frame();
            });
        },
        "frame": function () {
            if (this.dan.length && !PlayEr.danMu.paused && this.showing) {
                let item = this.dan[this.danIndex];
                const dan = [];
                while (item && PlayEr.void.video.currentTime > parseFloat(item.time)) {
                    dan.push(item);
                    item = this.dan[++this.danIndex];
                }
                this.draw(dan);
            }
            window.requestAnimationFrame(() => {
                this.frame();
            });
        },
        "number2Color": function (number) {
            return '#' + ('00000' + number.toString()).slice(-6);
        },
        "number2Type": function (number) {
            switch (number) {
                case 0:
                case "right":
                    return 'right';
                case 1:
                case "top":
                    return 'top';
                case 2:
                case "bottom":
                    return 'bottom';
                default:
                    return 'right';
            }
        },
        "_measure": function (text) {
            if (!this.context) {
                const measureStyle = getComputedStyle(this.container.getElementsByClassName('ec-danMa-item')[0], null);
                this.context = document.createElement('canvas').getContext('2d');
                this.context.font = measureStyle.getPropertyValue('font');
            }
            return this.context.measureText(text).width;
        },
        "_danAnimation": function (position) {
            const rate = this.speedRate || 1;
            const isFullScreen = !!PlayEr.void.fullscreen;
            const animations = {
                top: `${(isFullScreen ? 6 : 4) / rate}s`,
                right: `${(isFullScreen ? 8 : 5) / rate}s`,
                bottom: `${(isFullScreen ? 6 : 4) / rate}s`,
            };
            return animations[position];
        },
        "seek": function () {
            if (!this.off) {
                return;
            }
            this.clear();
            for (let i = 0; i < this.dan.length; i++) {
                if (this.dan[i].time >= PlayEr.void.video.currentTime) {
                    this.danIndex = i;
                    break;
                }
                this.danIndex = this.dan.length;
            }
        },
        "clear": function () {
            this.danTunnel = {
                right: {},
                top: {},
                bottom: {},
            };
            this.danIndex = 0;
            this.container.innerHTML = '<div class="ec-danMa-item ec-danMa-item--demo"></div>';
        },
        "draw": function (dan) {
            if (this.showing) {
                const itemHeight = this.height;
                const danWidth = this.container.offsetWidth;
                const danHeight = this.container.offsetHeight;
                const itemY = parseInt(danHeight) / parseInt(itemHeight);

                const danItemRight = (ele) => {
                    const eleWidth = ele.offsetWidth || parseInt(ele.style.width);
                    const eleRight = ele.getBoundingClientRect().right || this.container.getBoundingClientRect().right + eleWidth;
                    return this.container.getBoundingClientRect().right - eleRight;
                };

                const danSpeed = (width) => (danWidth + width) / 5;

                const getTunnel = (ele, type, width) => {
                    const tmp = danWidth / danSpeed(width);

                    for (let i = 0; this.unlimited || i < itemY; i++) {
                        const item = this.danTunnel[type][i + ''];
                        if (item && item.length) {
                            if (type !== 'right') {
                                continue;
                            }
                            for (let j = 0; j < item.length; j++) {
                                const danRight = danItemRight(item[j]) - 10;
                                if (danRight <= danWidth - tmp * danSpeed(parseInt(item[j].style.width)) || danRight <= 0) {
                                    break;
                                }
                                if (j === item.length - 1) {
                                    this.danTunnel[type][i + ''].push(ele);
                                    ele.addEventListener('animationend', () => {
                                        this.danTunnel[type][i + ''].splice(0, 1);
                                    });
                                    return i % itemY;
                                }
                            }
                        } else {
                            this.danTunnel[type][i + ''] = [ele];
                            ele.addEventListener('animationend', () => {
                                this.danTunnel[type][i + ''].splice(0, 1);
                            });
                            return i % itemY;
                        }
                    }
                    return -1;
                };

                if (Object.prototype.toString.call(dan) !== '[object Array]') {
                    dan = [dan];
                }

                const docFragment = document.createDocumentFragment();

                for (let i = 0; i < dan.length; i++) {

                    dan[i].type = this.number2Type(dan[i].type);
                    if (!dan[i].color) {
                        dan[i].color = 16777215;
                    }
                    const item = document.createElement('div');
                    item.classList.add('ec-danMa-item');
                    item.classList.add(`ec-danMa-${dan[i].type}`);
                    if (dan[i].border) {
                        item.innerHTML = `<span style="border:${dan[i].border}">${dan[i].text}</span>`;
                    } else {
                        item.innerHTML = dan[i].text;
                    }
                    item.style.opacity = this.opacity;
                    item.style.color = this.number2Color(dan[i].color);
                    item.addEventListener('animationend', () => {
                        this.container.removeChild(item);
                    });

                    const itemWidth = this._measure(dan[i].text);
                    let tunnel;

                    // adjust
                    switch (dan[i].type) {
                        case 'right':
                            tunnel = getTunnel(item, dan[i].type, itemWidth);
                            if (tunnel >= 0) {
                                item.style.width = itemWidth + 1 + 'px';
                                item.style.top = itemHeight * tunnel + 'px';
                                //item.style.transform = `translateX(-${danWidth}px)`;
                            }
                            break;
                        case 'top':
                            tunnel = getTunnel(item, dan[i].type);
                            if (tunnel >= 0) {
                                item.style.top = itemHeight * tunnel + 'px';
                            }
                            break;
                        case 'bottom':
                            tunnel = getTunnel(item, dan[i].type);
                            if (tunnel >= 0) {
                                item.style.bottom = itemHeight * tunnel + 'px';
                            }
                            break;
                        default:
                            PlayEr.tips.msg(`Can't handled danMa type: ${dan[i].type}`);
                    }
                    if (tunnel >= 0) {
                        // move
                        item.classList.add('ec-danMa-move');
                        item.style.animationDuration = this._danAnimation(dan[i].type);
                        // insert
                        docFragment.appendChild(item);
                    }
                }
                this.container.appendChild(docFragment)
                return docFragment;
            }
        },
        "htmlEncode": function (str) {
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2f;');
        },
        "hide": function () {
            this.showing = false;
            this.clear();
        },
        "show": function () {
            this.seek();
            this.showing = true;
        },
        "send": function (t){
            const data = {
                text: t.text,
                color: t.color,
                type: t.type,
                time: PlayEr.void.video.currentTime,
                player: PlayEr.danMu.dm_api[0][3],
            };
            this.apiBackend.send(data, function (data) {
                PlayEr.danMu.dan.splice(this.danIndex, 0, data);
                PlayEr.danMu.danIndex++;
                const dk = {
                    text: PlayEr.danMu.htmlEncode(data.text),
                    color: data.color,
                    type: data.type,
                    border: `2px solid #24a5ff`,
                };
                PlayEr.danMu.draw(dk);
                let t = $(".dm-input");
                t.val("")
                let interval = setInterval(function () {
                    let time = Number(t.data('time')) - 1;
                    t.data('time',time).attr('placeholder',time+lg['dm-dj']).attr('disabled',true);
                    if (time <= 0) {
                        t.data('time',ConFig['config']['danMu_interval']).attr('placeholder',lg['dm-input']).attr('disabled',false);
                        clearInterval(interval);
                    }
                }, 1000);
            });
        },
        "getFontSize" :function(fontSize) {
            const clamp = function (e, t, r) {
                return Math.max(Math.min(e, Math.max(t, r)), Math.min(t, r))
            };
            const clientWidth = document.getElementById("player").clientWidth;

            if (typeof fontSize === 'number') {
                return clamp(fontSize, 12, clientWidth);
            }

            if (typeof fontSize === 'string' && fontSize.endsWith('%')) {
                const ratio = parseFloat(fontSize) / 100;
                return clamp(clientWidth * ratio, 12, clientWidth);
            }
            return fontSize;
        },
        "set":function(i,k,v){
            v && PlayEr.cookie.Set('d_set'+i, [i,k,v],7);
            switch (i) {
                case 1:
                {
                    this.speedRate = k;
                    break;
                }
                case 2:
                {
                    let d_font = this.getFontSize(k);
                    $(".ec-danMa").css("font-size",d_font);
                    this.height = d_font+5;
                    break;
                }
                case 3:
                {
                    this.opacity = k;
                    break;
                }
                case 4:
                {
                    $(".ec-danMa").css("bottom",k);
                    break;
                }
                default:
                    break;
            }
        },
        "content": function () {
            //移动端弹幕输入框显示隐藏
            $(".dm-bnt").click(function(){
                $(".art-bottom").hide();
                $(".dm-box").removeClass("dm-wap");
                $(".player-list-off").addClass("dm-off").removeClass("off");
                $(".dm-off").click(function(){
                    $(".art-bottom").show();
                    $(".dm-box").addClass("dm-wap");
                    $(".player-list-off").removeClass("dm-off").addClass("off");
                });
            });

            $(".art-bottom,.dm-box-cc").click(function(){
                $(".dm-set-box,.dm-style-box").removeClass("ec-show");
            });

            let cc = $(".dm-box-cc"), dm_cc = PlayEr.cookie.Get('dm-box-cc'),
                dmP_1 = PlayEr.cookie.Get('content_dmP-1'), dmP_2 = PlayEr.cookie.Get('content_dmP-2'),
                cnt_1 = $(".content_dmP-1 .item"), cnt_2 = $(".content_dmP-2 .item"),
                u = function (a, b, c) {
                    if (a !== undefined || a !== '') {
                        b.eq(a).addClass("on-1").siblings().removeClass("on-1");
                    }
                    b.click(function () {
                        $(this).addClass("on-1").siblings().removeClass("on-1");
                        PlayEr.cookie.Set(c, $("." + c + " .item").index(this),7);
                    });
                };
            u(dmP_1, cnt_1, 'content_dmP-1');
            u(dmP_2, cnt_2, 'content_dmP-2');
            $(".dm-box-t-img").click(function () {
                $(".dm-set-box").removeClass("ec-show");
                $(".dm-style-box").toggleClass("ec-show");
            });

            //入库弹幕
            let get = function () {
                let color = $(".content_dmP-2 .on-1").data("color");
                let type = $(".content_dmP-1 .on-1").data("type");
                let text = $(".dm-input").val();
                if (PlayEr.empty(text)) {
                    PlayEr.tips.msg(lg['dm-please']);
                }else if(text.length > ConFig['config']['danMu_length']){
                    PlayEr.tips.msg(lg['dm-text']);
                } else {
                    PlayEr.danMu.send({
                        text: text,
                        color: color,
                        type: type,
                    });
                }
            }
            $(".dm-input").keydown(function (e) {
                if (e.keyCode === 13) {
                    get();
                }
            });
            $(".dm-send").click(function () {
                get();
            });


            if (dm_cc === '1') {
                PlayEr.danMu.hide();
                cc.addClass("dm-box-cc2").data("id", '1');
            }
            cc.click(function () {
                if ($(this).data("id") === '1') {
                    PlayEr.danMu.show();
                    PlayEr.cookie.Del('dm-box-cc');
                    $(this).removeClass("dm-box-cc2").data("id", '0');
                } else {
                    PlayEr.danMu.hide();
                    PlayEr.cookie.Set('dm-box-cc', "1",7);
                    $(this).addClass("dm-box-cc2").data("id", '1');
                }
            });


            let s_data = [
                [lg['dm-velocity'], lg['es'], lg['slower'], lg['moderate'], lg['faster'], lg['express']],
                [lg['dm-size'], lg['gtc'], lg['minuteness'], lg['less'], lg['moderate'], lg['more'], lg['maximum']],
                [lg['dm-opacity'], '100%', '75%', '50%', '25%', '0%'],
                [lg['dm-br'], '1/4', lg['one'], '3/4'],
            ],s_data_t = [
                ['','0.5', '0.8', '1', '1.5', '2'],
                ['',PlayEr.danMu.height,'1%', '2%', '3%', '4%', '5%'],
                ['','1', '0.75', '0.5', '0.25', '0'],
                ['','60%', '45%', '10%'],
            ];
            $(".set-toggle").append(PlayEr.svg.left);
            let s_all_html = '',d_index = null;
            for(let i = 0; i < s_data.length; i++){
                let s_i_html = '';
                for(let k = 0; k < s_data[i].length; k++){
                    if(k === 0){
                        s_i_html = s_i_html+'<div class="flex between br"><span class="dm-set-label flex"><i>'+PlayEr.svg.left+'</i>'+s_data[i][k]+'</span></div>';
                    }else{
                        s_i_html = s_i_html+'<div class="flex between dm-n2" data-time="'+s_data_t[i][k]+'"><span class="dm-set-label flex"><i></i>'+s_data[i][k]+'</span></div>';
                    }
                }
                s_all_html = s_all_html+'<div class="dm-set-list">'+s_i_html+'</div>';

                let ck =PlayEr.cookie.Get('d_set'+(i+1));
                if(ck){
                    let ck_data = ck.split(",");
                    PlayEr.danMu.set(Number(ck_data[0]),ck_data[1]);
                    $(".dm-set-box .dm-set-list").eq(0).children().eq(i).find("span").text(ck_data[2]);
                }
            }
            $(".dm-set-box").append(s_all_html);

            $(".dm-box-set").click(function(){
                $(".dm-style-box").removeClass("ec-show");
                $(".dm-set-box").toggleClass("ec-show");
            });
            $("#dm_n1 .between").click(function(){
                let c_i = $(this).data("id");
                $(".dm-set-box .dm-set-list").eq(c_i).addClass("ds-set-show").siblings().removeClass("ds-set-show");
                d_index = c_i;
            });
            $(".dm-set-box .br").click(function(){
                $(".dm-set-box .dm-set-list").eq(0).addClass("ds-set-show").siblings().removeClass("ds-set-show");
            });
            $(".dm-n2").click(function() {

                let d_i_k = $(this).text(),d_ccc_li = $(".dm-set-box .dm-set-list");
                d_ccc_li.eq(0).children().eq(d_index - 1).find("span").text(d_i_k);
                d_ccc_li.eq(0).addClass("ds-set-show").siblings().removeClass("ds-set-show");
                let d_time = $(this).data("time");

                if(d_i_k !== lg['gtc']){
                    PlayEr.danMu.set(d_index,d_time,d_i_k);
                }else{
                    PlayEr.cookie.Del('d_set2');
                }
            });
        }
    },
    "list":{
        "err" : 0,
        "Init":function(){
            let bnt = $(".list-bnt");
            if(PlayEr.empty(ConFig["MesData"]['api']) || PlayEr.empty(ConFig["MesData"]['id'])){bnt.remove();return;}
            //打开选集列表
            let n = $(".player-list"),t = $(".player-list-off");
            bnt.click(function(){
                t.show();
                if($(".new-title").length === 0){
                    n.addClass('ec-show');
                    PlayEr.list.load();

                    let list = sessionStorage.getItem("list");
                    if(PlayEr.empty(list)){
                        PlayEr.list.api();
                    }else{
                        PlayEr.list.getList(JSON.parse(list));
                        console.log("列表数据获取自本地存储");
                    }

                }else{
                    n.addClass('ec-show');
                }
            });
            $(t).click(function(){
                t.hide();
                n.removeClass('ec-show');
            });

            //列表内功能
            $(document).on('click', '.new-from span', function() {
                $(this).addClass("on").siblings().removeClass("on");
                let i = $(".new-from span").index(this),q = $(".new-url ul").eq(i);
                q.fadeIn(800).siblings().hide();
                q.addClass("dx").siblings().removeClass("dx");
            });
            $(document).on('click', "#dl", function() {
                let ac_id = $(".new-url");
                if (ac_id.hasClass("new-100") ) {
                    $(this).html(lg['single-row']);ac_id.removeClass("new-100");
                }else {
                    $(this).html(lg['many']);ac_id.addClass("new-100");
                }
            });
        },
        "load" : function(){
            let lod = '<div class="new-title"><h3 class="l-bj l-100"></h3><div class="l-bj l-100 l-h-2 l-t10"></div>\n' +
                '<div class="l-bj l-100 l-h-2 l-t10"></div></div><div class="new-bottom l-t30"><div class="on l-bj l-55 l-h-2"></div>\n' +
                '<div class="new-url"><ul class="flex dx"><li class="l-bj"></li><li class="l-bj"></li></ul></div></div>';
            $(".new-body").html(lod);
        },
        "api2":function(){
            if(PlayEr.empty(ConFig["MesData"]['api']) || PlayEr.empty(ConFig["MesData"]['id'])){return;}
            PlayEr.danMu.apiBackend.api(ConFig["MesData"]['api']+'/dp?id='+ConFig["MesData"]['id'], '', '', function (e,t) {
                if(t['copy'] !== '超级播放器苹果cms接口，作者QQ602524950' || t['code'] === '0'){return}
                //临时存储获取的选集信息
                sessionStorage.setItem("list",JSON.stringify(t));
            }, function () {
                ConFig["MesData"]["next"] = "";
            });
        },
        "api":function(){
            PlayEr.danMu.apiBackend.api(ConFig["MesData"]['api']+'/dp?id='+ConFig["MesData"]['id'], '', '', function (e,t) {
                if(t['copy'] !== '超级播放器苹果cms接口，作者QQ602524950' || t['code'] === '0'){return}
                //临时存储获取的选集信息
                sessionStorage.setItem("list",JSON.stringify(t));
                //插入html
                PlayEr.list.getList(t);
            }, function () {
                if(PlayEr.list.err >= 3){
                    $(".new-body").html('<div class="list-err">'+lg['error2']+'</p></div><div class="new-title"></div>');
                }else{
                    $(".new-body").html('<div class="list-err"><a class="list-retry t-bj" href="javascript:">'+lg['retry']+'</a><p>'+lg['error-tips']+'</p></div>');
                    PlayEr.list.err = (PlayEr.list.err+1);
                    $(".list-retry").click(function(){
                        PlayEr.list.load();
                        PlayEr.list.api();
                    });
                }
            });
        },
        "getList":function(t){
            //临时存储获取的选集信息
            sessionStorage.setItem("list",JSON.stringify(t));

            let form = '',url='';
            for(let i = 0;i < t['url'].length;i++){
                form = form+'<span data-count="'+t['url'][i]['count']+'" data-id="'+t['url'][i]['sid']+'">'+t['url'][i]['from']+'</span>';
                let urlData = t['url'][i]['url'],urlHtml = '';
                for(let i2 = 0;i2 < urlData.length;i2++){
                    urlHtml = urlHtml+'<li><a data-id="'+urlData[i2]['nid']+'" data-url="'+urlData[i2]['url']+'" href="javascript:">'+urlData[i2]['name']+'</a></li>';
                }
                url = url+'<ul class="flex">'+urlHtml+'</ul>';
            }
            let html = '<div class="new-title"><h3 title="'+t['name']+'">'+t['name']+'</h3>\n' +
                '<div class="new-title-feature"><span class="new-title-heat">🔥'+(t['hits'] === ''?lg['hits']:t['hits'])+'</span><span>'+(t['area'] === ''?'':t['area']+'·')+(t['year'] === ''?lg['year']:t['year'])+(t['class'] === ''?'':'·'+t['class'])+'</span></div>\n' +
                '<div class="new-title-update">'+(t['remarks'] === ''?lg['remarks']:t['remarks'])+'</div></div>\n' +
                '<div class="new-top"><h4 title="选集">'+lg['list']+'</h4><div class="function flex"><a id="dx" href="javascript:">'+lg['ps']+'</a><a id="dl" href="javascript:">'+lg['single-row']+'</a></div></div><div class="new-bottom"><div class="new-from flex">'+form+'</div><div class="new-url">'+url+'</div></div>';
            $(".new-body").html(html);

            //设置选集列表高度
            PlayEr.list.height();
            $(window).resize(function () {
                PlayEr.list.height();
            });

            $("#dx").each(function () {
                $(this).on("click", function (e) {
                    e.preventDefault();
                    $(".dx").each(function () {
                        let playlist = $(this).find("li");
                        for (let i = 0, j = playlist.length - 1; i < j;) {
                            let l = playlist.eq(i).clone(true), r = playlist.eq(j).replaceWith(l);
                            playlist.eq(i).replaceWith(r);
                            ++i;
                            --j;
                        }
                    });
                });
            });

            PlayEr.list.set();
            //切换选集
            $(".new-url li").click(function(){
                $(this).addClass("d-on").siblings().removeClass("d-on");
                let data = $(this).children().data();
                window.location = "/player/index.php?code="+PlayEr.GetRequest()["code"]+"&url="+data['url']+'&sid='+$(".new-from .on").data("id")+'&nid='+data['id']+"&if=1";
            });
        },
        "set":function(){
            let sid = ConFig["MesData"]['sid'] ? (ConFig["MesData"]['sid']-1) : 0,nid = (ConFig["MesData"]['nid']-1);
            $(".new-from span").eq(sid).addClass("on").siblings().removeClass("on");
            $(".new-url ul").eq(sid).addClass("dx").siblings().removeClass("dx");
            $(".new-url .dx li").eq(nid).addClass("d-on").siblings().removeClass("d-on");
        },
        "height":function(){
            let h =  $(".player-list").height()-($(".new-title").height()+131);
            $('.new-url ul').css("height",h+"px");
        },
        "getNextUrl":function(){
            let data = ConFig["MesData"];
            window.location = "/player/index.php?code="+PlayEr.GetRequest()["code"]+
                "&url="+data['next']+
                '&sid='+(data['sid'])+
                '&nid='+(Number(data['nid'])+1)+"&if=1";
        },
        "next":function(){
            if(PlayEr.empty(ConFig["MesData"]["next"]) === false && ConFig["config"]['next_bnt'] === '1'){
                $(".art-control-playAndPause").after('<div class="art-control ec-next"><i class="art-icon hint--rounded hint--top" aria-label="下一集">'+PlayEr.svg.next+'</i></div>');
                $(".ec-next").click(function(){
                    if(PlayEr.empty(ConFig["MesData"]["next"]) === false){
                        PlayEr.list.getNextUrl();
                    }else{
                        PlayEr.tips.msg(lg['unusual']);
                    }
                });
            }
        },
        "autoNext":function(){
            if (ConFig['config']['next_auto'] === '0') {return}
            PlayEr.void.on('video:ended', function () {
                if(!PlayEr.empty(ConFig["MesData"]["next"])) {
                    box.children().append('<div class="pop-msg vague2 again"><div class="again-icon">'+PlayEr.svg.reb+'</div><div class="pop-content"><span id="count2">'+ConFig['config']['next_time']+'</span>'+lg['skip']+'</div></div>');
                    $(".pause-ad").remove();
                    PlayEr.countDown(function(){},'#count2');
                    let timer = setTimeout(function(){
                        PlayEr.list.getNextUrl();
                    },(ConFig['config']['next_time']*1000));

                    $(".again").click(function(){
                        clearTimeout(timer);
                        $(".again").remove();
                        PlayEr.void.play();
                    });

                    PlayEr.void.on('play', function () {
                        clearTimeout(timer);
                        $(".again").remove();
                    });
                }
            });
        }
    },
    "broadside":function(){
        let obj = $(".broadside");
        if(ConFig["config"]['lock'] === '1'){
            obj.append('<div class="ec-lock" data-id="1">'+PlayEr.svg.open+'</div>');
            let h = $('.ec-lock');
            h.click(function(){
                if(Number(h.data('id')) === 1){
                    h.html(PlayEr.svg.lock).data('id','2');
                    box.addClass("lock-hide");
                }else{
                    h.html(PlayEr.svg.open).data('id','1');
                    box.removeClass("lock-hide");
                }
            });
        }
        if(ConFig["config"]['revolve'] === '1'){
            obj.append('<div class="ec-change">'+PlayEr.svg.change+'</div>');
            let t = 0,r=$("video");
            $('.ec-change').click(function(){
                switch (t) {
                    case 0:
                        r.addClass("along1");++t;
                        break;
                    case 1:
                        r.removeClass("along1");++t;
                        r.addClass("along2");
                        break
                    case 2:
                        r.removeClass("along2");++t;
                        r.addClass("along3");
                        break;
                    case 3:
                        r.removeClass("along3");t = 0;
                        break;
                }
            });
        }
        if(ConFig["config"]['pip'] === '1'){
            obj.append('<div class="ec-pip" data-id="1">'+PlayEr.svg.pip+'</div>');
            let video = $("video")[0];
            //$("video").attr("autopictureinpicture",true);
            $(".ec-pip").click(async () => {
                try {
                    if (document.pictureInPictureEnabled && !video.disablePictureInPicture) {
                        if (document.pictureInPictureElement) {
                            await document.exitPictureInPicture();
                        } else {
                            await video.requestPictureInPicture();
                        }
                    }else if(video.webkitSupportsPresentationMode && typeof video.webkitSetPresentationMode === "function"){
                        video.webkitSetPresentationMode(video.webkitPresentationMode === "picture-in-picture" ? "inline" : "picture-in-picture");
                    }else{
                        $(".ec-pip").hide();
                    }
                } catch (err) {
                    $(".ec-pip").hide();
                    throw err;
                }
            });
        }
    },
    "tas":function(){
        if(PlayEr.group(ConFig['config']['try-user']) !== -1){
            PlayEr.void.on('play', function () {
                setTimeout(function(){
                    PlayEr.void.currentTime = 0;
                    PlayEr.void.pause();
                    PlayEr.tips.msg(lg['try']);
                }, ConFig['config']['try-time']*1000);
            });
        }
    },
    "LoadAnimation":function(){
        let a = Number(PlayEr.cookie.Get("time_" + ConFig['id2'],ConFig['config']['rm'])),b = PlayEr.secondToTime(a),wait = ConFig['config']['wait_time'];
        if(wait === '0'){
            if (b !== '00:00' && b !== 'NaN:NaN') {
                $(".ec-remember").html('<i class="art-icon art-icon-close s-on">'+PlayEr.svg.close+'</i>'+lg['rm1']+'<em>'+b+'</em><span class="t-color">'+lg['rm2']+'</span>').show();
                $(".ec-remember span").click(function(){
                    $(".ec-remember").html("<p></p>").hide();
                    PlayEr.void.currentTime = a;
                });
                let timer = setTimeout(function () {
                    $(".ec-remember").html("<p></p>").hide();
                    clearTimeout(timer);
                }, 8000);
            }
        }else{
            box.before('<div id="loading" class="w-h"><div class="ec-loading"><div class="w-h"><div class="bj bj-1" style="background-image: url('+ConFig['config']['gx']['pic']+');"></div><div class="loading-icon"></div></div><div class="button" style="color:'+ConFig['config']['wait_color']+'"><div class="wait1">\n' +
                '<span id="link1">'+lg['rm8']+'</span><span id="link1-success">【'+lg['rm6']+'】</span></div><span class="wait2" id="link3"><i id="link3_tip">'+lg['rm9']+'</i><i id="link3-error">【'+lg['rm7']+'】</i></span><div class="wait3"></div></div></div></div>');
            setTimeout(function() {
                $("#link1").fadeIn();
            }, 100);
            setTimeout(function() {
                $("#link1-success").fadeIn();
            }, 500);
            setTimeout(function() {
                $("#link3").fadeIn();
            }, 1000);
            PlayEr.void.on('error', function () {
                $("#link3-error").show();
            });
            PlayEr.void.on('video:loadedmetadata', function () {
                $("#link3").text(lg['rm5']);
                PlayEr.void.pause();
                setTimeout(function() {
                    PlayEr.void.pause();
                    if (b !== '00:00' && b !== 'NaN:NaN') {
                        $('.wait3').html(lg['rm1']+''+b+'，'+lg['rm2']+'？<a class="ec-ok">'+lg['yes']+'</a><i id="count">'+wait+'</i>s<a class="ec-no">'+lg['no']+'</a>');
                    }else{
                        $("#link3").html('<i id="count">'+wait+'</i>'+lg['rm4']+'<a class="ec-no">'+lg['yes']+'</a>');
                    }
                    PlayEr.countDown(function(){},'#count');
                    let time = setTimeout(function() {
                        $("#loading").hide();
                        if(ConFig['config']['art']["autoplay"] === '1'){
                            PlayEr.void.play();
                        }
                    }, (wait*1000));

                    $(".ec-ok").click(function(){
                        clearTimeout(time)
                        $("#loading").hide();
                        if(ConFig['config']['art']["autoplay"] === '1'){
                            PlayEr.void.play();
                        }
                        PlayEr.void.currentTime = a;
                    });
                    $(".ec-no").click(function(){
                        clearTimeout(time)
                        $("#loading").hide();
                        if(ConFig['config']['art']["autoplay"] === '1'){
                            PlayEr.void.play();
                        }
                    });
                }, 1500);
            });
        }
    }
};
$(function(){
    if(PlayEr.GetRequest()['if'] === "1"){
        PlayEr.mes('');
    }else{
        $("#player").html('<div class="dddd w-h"><div class="bg"></div><div class="main"><div class="loading"></div><div class="tips">Waiting parameters</div></div></div>');
        window.addEventListener('message', function (e) {
            PlayEr.mes(e.data);
        });
    }
    if ((navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0)) {
        alert("兼容模式 易产生播放问题，请将浏览器设置为 极速模式！");
    }
});