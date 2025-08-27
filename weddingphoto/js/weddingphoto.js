// 主題清單，只需要定義資料夾，不用數照片
const themes = [
  { title: "風格1", folder: "/weddingphoto/images/StyleA" },
  { title: "風格2", folder: "/weddingphoto/images/StyleB" },
  { title: "風格3", folder: "/weddingphoto/images/StyleC" },
  { title: "風格4", folder: "/weddingphoto/images/StyleD" },
  { title: "風格5", folder: "/weddingphoto/images/StyleE" }
];

// 支援的副檔名
const extensions = ["jpg", "jpeg", "png", "gif"];
const maxPhotos = 50; // 每個主題最多檢查 50 張

themes.forEach(t => {
  t.images = [];
  let foundFirst = false;

  // 嘗試不同編號 + 副檔名
  for (let i = 1; i <= maxPhotos; i++) {
    extensions.forEach(ext => {
      const url = `${t.folder}/${i}.${ext}`;
      const img = new Image();
      img.src = url;

      img.onload = () => {
        t.images.push(url);
        if (!foundFirst) {
          t.cover = url; // 第一張成功載入的圖片當封面
          foundFirst = true;
          renderThemes(); // 更新主題卡片
        }
      };
    });
  }
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
    if (!t.cover) return; // 沒有圖片就跳過
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
