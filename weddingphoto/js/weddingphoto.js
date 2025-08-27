const themes = [
      {
        title:"主題 A - 海邊夕陽",
        cover:"https://placekitten.com/400/300",
        images:[
          "https://placekitten.com/800/600",
          "https://placekitten.com/801/600",
          "https://placekitten.com/802/600"
        ]
      },
      {
        title:"主題 B - 森林小徑",
        cover:"https://placekitten.com/401/300",
        images:[
          "https://placekitten.com/803/600",
          "https://placekitten.com/804/600",
          "https://placekitten.com/805/600"
        ]
      },
      {
        title:"主題 C - 棚拍浪漫",
        cover:"https://placekitten.com/402/300",
        images:[
          "https://placekitten.com/806/600",
          "https://placekitten.com/807/600"
        ]
      }
    ];

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

    renderThemes();