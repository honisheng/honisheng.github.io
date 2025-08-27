<script>
let themes = [];

// 從 themes.json 載入資料
fetch("themes.json")
  .then(res => res.json())
  .then(data => {
    themes = data;
    renderThemes();
  });

const themeList=document.getElementById("themeList");
const themeGallery=document.getElementById("themeGallery");
const themeTitle=document.getElementById("themeTitle");
const gallery=document.getElementById("gallery");

let currentImages=[];
let currentIndex=0;

// 顯示主題清單
function renderThemes(){
  themeList.innerHTML="";
  themes.forEach((t,i)=>{
    const card=document.createElement("div");
    card.className="theme-card";
    card.innerHTML=`<img src="${t.cover}" alt=""><h3>${t.title}</h3>`;
    card.onclick=()=>openTheme(i);
    themeList.appendChild(card);
  });
}

function openTheme(index){
  const theme=themes[index];
  currentImages=theme.images;
  themeTitle.textContent=theme.title;
  gallery.innerHTML="";
  theme.images.forEach((url,i)=>{
    const img=document.createElement("img");
    img.src=url;
    img.onclick=()=>openLightbox(i);
    gallery.appendChild(img);
  });
  themeList.style.display="none";
  themeGallery.style.display="block";
}

function showThemes(){
  themeGallery.style.display="none";
  themeList.style.display="grid";
}

// 燈箱
const lightbox=document.getElementById("lightbox");
const lightboxImg=document.getElementById("lightboxImg");

function openLightbox(i){
  currentIndex=i;
  lightboxImg.src=currentImages[i];
  lightbox.style.display="flex";
}
function closeLightbox(){ lightbox.style.display="none"; }
function prevImage(){
  currentIndex=(currentIndex-1+currentImages.length)%currentImages.length;
  lightboxImg.src=currentImages[currentIndex];
}
function nextImage(){
  currentIndex=(currentIndex+1)%currentImages.length;
  lightboxImg.src=currentImages[currentIndex];
}
</script>