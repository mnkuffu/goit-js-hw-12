import{a as E,S as b,i as a}from"./assets/vendor-df5IXrWy.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))m(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&m(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function m(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const $="https://pixabay.com/api/",R="";async function f(s,e){try{return(await E.get($,{params:{key:R,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e}})).data}catch(o){throw console.error("Error fetching images:",o.message),o}}const y=document.querySelector(".gallery"),g=document.querySelector(".loader"),L=document.querySelector(".load-more"),h=document.querySelector(".loader-text");let x=new b(".gallery a",{captionsData:"alt",captionDelay:250});function w(s){const e=s.map(o=>`
        <li class='item'>
          <a class='gallery-item' href='${o.largeImageURL}'>
            <img 
              class='gallery-img' 
              src='${o.webformatURL}' 
              alt='${o.tags}' 
              loading="lazy" 
            />
          </a>
          <div class='info'>
            <ul class='info-list'>
              <li><h3>Likes</h3><p>${o.likes}</p></li>
              <li><h3>Views</h3><p>${o.views}</p></li>
              <li><h3>Comments</h3><p>${o.comments}</p></li>
              <li><h3>Downloads</h3><p>${o.downloads}</p></li>
            </ul>
          </div>
        </li>
      `).join("");y.insertAdjacentHTML("beforeend",e),x.refresh()}function B(){y.innerHTML=""}function v(){g.classList.remove("is-hidden"),h.classList.remove("is-hidden")}function c(){g.classList.add("is-hidden"),h.classList.add("is-hidden")}function S(){L.classList.remove("is-hidden"),h.classList.add("is-hidden")}function d(){L.classList.add("is-hidden")}const M=document.querySelector(".form"),p=document.querySelector('input[name="search-text"]'),P=document.querySelector(".load-more");document.querySelector(".loader-text");let n="",i=1;const q=15;let u=0;M.addEventListener("submit",O);P.addEventListener("click",H);async function O(s){if(s.preventDefault(),B(),d(),n=p.value.trim(),i=1,!n){a.warning({title:"Error",message:"Please type something to search",position:"topRight"});return}v(),p.value="";try{const e=await f(n,i);if(u=e.totalHits,!e.hits.length){a.info({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),c();return}w(e.hits),i*q<u?S():d()}catch(e){a.error({message:`Error: ${e.message}`,position:"topRight"})}finally{c()}}async function H(){v(),i+=1;try{const s=await f(n,i);w(s.hits),i*q>=u?(a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),d()):S();const e=document.querySelector(".gallery li").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}catch(s){a.error({message:`Error: ${s.message}`,position:"topRight"})}finally{c()}}
//# sourceMappingURL=index.js.map
