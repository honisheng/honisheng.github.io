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
  t.cover = `${t.folder}/001.${extensions[0]}`;
  
  // 生成 001.jpg ~ NNN.jpg
  t.images = Array.from({length: t.count}, (_, i) => {
    const num = String(i+1).padStart(3, "0"); // 補零到三位數
    return `${t.folder}/${num}.${extensions[0]}`;
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

// 初始化
renderThemes();
