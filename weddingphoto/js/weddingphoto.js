// 主題清單，只需要定義資料夾，不用數照片
const themes = [
  { title: "風格1", folder: "/weddingphoto/images/StyleA", count: 44 },
  { title: "風格2", folder: "/weddingphoto/images/StyleB", count: 37 },
  { title: "風格3", folder: "/weddingphoto/images/StyleC", count: 78 },
  { title: "風格4", folder: "/weddingphoto/images/StyleD", count: 24 },
  { title: "風格5", folder: "/weddingphoto/images/StyleE", count: 30 }
];

// 支援的副檔名
const extensions = ["jpg", "jpeg", "png", "gif"];

themes.forEach(t => {
  // 001 當封面
  t.cover = t.thumbs[0];
  
  // 原始大圖 生成 001.jpg ~ NNN.jpg
  t.images = Array.from({length: t.count}, (_, i) => {
    const num = String(i+1).padStart(3, "0"); // 補零到三位數
    return `${t.folder}/${num}.${extensions[0]}`;
  });
  
  // 縮圖 (thumbs 資料夾)
    t.thumbs = Array.from({length: t.count}, (_, i) => {
      const num = String(i+1).padStart(3, "0");
      return t.folder.replace("/weddingphoto/images/", "/weddingphoto/thumbs/") + `/${num}.${ext}`;
    });
  
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
  currentImages=theme.images; // 大圖
  themeTitle.textContent=theme.title;
  gallery.innerHTML="";
  theme.thumbs.forEach((thumb,i)=>{
    const img=document.createElement("img");
    img.src=thumb; // 顯示縮圖
	img.loading="lazy";
    img.onclick=()=>openLightbox(i); // 點縮圖 → 開大圖
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
  lightboxImg.src=currentImages[i]; // 大圖
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
// 背景點擊關閉燈箱
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  // 鍵盤操作
  document.addEventListener("keydown", e => {
    if (lightbox.style.display==="flex") {
      if (e.key==="ArrowLeft") prevImage();
      if (e.key==="ArrowRight") nextImage();
      if (e.key==="Escape") closeLightbox();
    }
  });
  
// 初始化
renderThemes();
