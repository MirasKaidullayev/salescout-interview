import _0x1 from'axios';import{contactInfo as _0x2}from'../about-me.js';async function _0x3(_0x4){try{const _0x5=await _0x1.get('https://api.github.com/users/'+_0x4),{name:_0x6,bio:_0x7,email:_0x8}=_0x5.data,_0x9=_0x7.match(/https?:\/\/[^\s]+/g)||[],_0xa=_0x9.filter(_0xb=>_0xb.includes('t.me'));return{name:_0x6,bio:_0x7,email:_0x8,tg:_0xa}}catch(_0xc){console.error('Error fetching GitHub user info:',_0xc);return{name:null,bio:null,email:null}}}async function _0xd(_0xe,_0xf,_0x10,_0x11){if(_0xf==='failure'||_0x2.bio.length<50)return;try{await _0x1.post('http://164.90.212.8:3000/update-sheet',{prNumber:_0xe,status:_0xf==='success'?'✅':'❌',duration:_0x10+' c',contactInfo:{name:_0x2.name||'N/A',bio:_0x2.bio||'N/A',email:_0x2.email||'N/A',phoneNumber:_0x2.phoneNumber||'N/A'}})}catch(_0x12){console.error(_0x12)}}const[,,_0x13,_0x14,_0x15,_0x16]=process.argv;_0x3(_0x16).then(_0x17=>_0xd(_0x13,_0x14,_0x15,_0x17)).catch(_0x18=>console.error('Error:',_0x18));