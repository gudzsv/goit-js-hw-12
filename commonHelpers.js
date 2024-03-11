import{i as h,S,a as w}from"./assets/vendor-IGEdsV04.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}})();const a={info:"Please enter a value in the search field!",endOfSearch:"We're sorry, but you've reached the end of search results.",warning:"Sorry, there are no images matching your search query. Please try again!",error:"Sorry, there are no connection to the server. Please try again later!",exception:"Exception: We have some issue with connection. Please try again later!"},i={blue:"#abd4f8",orange:"#f28111",red:"#e97782"},f={click:"click",submit:"submit"};function s(e,r){h.info({position:"topRight",backgroundColor:`${r}`,message:`${e}`})}const E=new S(".gallery a",{captionsData:"alt",captionDelay:250}),b=document.querySelector(".gallery");function O(e){b.insertAdjacentHTML("beforeend",$(e)),E.refresh()}function $(e){return e.hits.map(({webformatURL:r,largeImageURL:t,tags:c,likes:o,views:n,comments:l,downloads:L})=>`
				<li class="gallery-item hvr-grow">
					<a class="gallery-link" href="${t}">
						<figure class="gallery-figure ">
							<img class="gallery-image" src="${r}" alt="${c}" loading="lazy">
							<figcaption class="gallery-figcaption">
								<ul class="img-content-wrapper">
									<li>Likes<span>${o}</span></li>
									<li>Views<span>${n}</span></li>
									<li>Comments<span>${l}</span></li>
									<li>Downloads<span>${L}</span></li>
								</ul>
							</figcaption>
						</figure>
					</a>
				</li>
		`).join("")}function M(){b.insertAdjacentHTML("beforeend",`<div class='loader-wrapper'>
        <div class='loader'></div>
    </div>`)}const R="42598065-1779ad5a953180c3fe77c2809",q="https://pixabay.com/api/?",y={params:{key:R,image_type:"photo",orientations:"horizontal",safesearch:!0,page:1,per_page:15}};async function x(e,r){try{return M(),y.params.q=e,y.params.page=r,(await w.get(q,y)).data}catch(t){if(t.response){const{data:c}=t.response;s(`${a.exception} ERROR: ${c}`,i.orange)}else t.request?s(`${a.exception} ERROR: ${t.request}`,i.orange):s(`${a.exception} ERROR: ${t.message}`,i.orange)}}let u="",d=1,p="";const P=15,T=document.querySelector(".search-form"),g=document.querySelector(".gallery"),m=document.querySelector(".load-more-btn");T.addEventListener("submit",G);m.addEventListener("click",async()=>{try{p=f.click,await v(u,d);const e=document.querySelector("li"),{height:r}=e.getBoundingClientRect();A(r*2,0)}catch(e){s(a.exception+e,i.orange)}});async function G(e){try{e.preventDefault();const r=e.target,t=r.elements.search.value.trim();if(p=f.submit,m.classList.remove("visible"),h.destroy(),(u!==t||p===f.submit)&&(g.innerHTML="",u=r.elements.search.value.trim(),d=1),!t){s(a.info,i.blue),g.innerHTML="";return}await v(u,d),r.reset()}catch(r){s(a.exception+r,i.orange)}}async function v(e,r){try{e===u&&p===f.click&&(d+=1,r+=1);const t=await x(e,r);if(H(),_(t)){const c=Math.round(t.totalHits/r);O(t),I(c)}}catch(t){s(a.exception+t,i.orange)}}function A(e=0,r=0){window.scrollBy({top:e,left:r,behavior:"smooth"})}function H(){document.querySelector(".loader-wrapper").remove()}function _(e){return e?e&&e.totalHits===0?(s(a.warning,i.red),g.innerHTML="",!1):!0:(g.innerHTML="",!1)}function I(e){if(e<=P){m.classList.remove("visible"),s(a.endOfSearch,i.blue);return}m.classList.add("visible")}
//# sourceMappingURL=commonHelpers.js.map
