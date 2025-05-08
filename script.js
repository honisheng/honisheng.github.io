// 展開/收合功能
function toggleSection(id) {
      const section = document.getElementById(id);
      section.style.display = (section.style.display === "none" || section.style.display === "") ? "block" : "none";
    }

    // 出席選項控制人數選單
document.addEventListener('DOMContentLoaded', () => {
	const text = "我們要結婚了！";
  let i = 0;
  const headline = document.getElementById("headline");
  headline.innerHTML = text;
  const attendance = document.getElementById('attendance');
  const guestGroup = document.getElementById('guest-count-group');
  attendance.addEventListener('change', function () {
    guestGroup.style.display = this.value === 'yes' ? 'block' : 'none';
  });
  
	// 表單送出提示
      document.getElementById('rsvp-form').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('感謝您的回覆！我們期待與您共度美好時光。');
		// 此處可加入將表單資料發送到伺服器的程式碼
        this.reset();
        guestGroup.style.display = 'none';
      });
    });
/*愛心特效*/
    function createHeart() {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = 3 + Math.random() * 2 + "s";
      document.getElementById("hearts").appendChild(heart);
      setTimeout(() => {
        heart.remove();
      }, 5000);
    }
    setInterval(createHeart, 300);

    const blessings = [
      "願你們永浴愛河💗",
      "百年好合，永結同心！💍",
      "幸福久久，甜蜜滿滿🌹",
      "愛情長跑開花結果🎉"
    ];
    let blessingIndex = 0;
    setInterval(() => {
      document.getElementById("blessing-carousel").innerText = blessings[blessingIndex];
      blessingIndex = (blessingIndex + 1) % blessings.length;
    }, 4000);
	
	document.addEventListener('click', () => {
    const bgm = document.getElementById('bgm');
    bgm.muted = false;
    bgm.play();
  }, { once: true });