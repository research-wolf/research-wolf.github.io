// Handle message showing
function createChatRow(sender, text, imageSrc) {
  var article = document.createElement("article");
  article.className = "media"

  var figure = document.createElement("figure");
  figure.className = "media-left";

  var span = document.createElement("span");
  span.className = "icon is-large";

  var icon = document.createElement("i");
  icon.className = "fas fas fa-2x" + (sender === "User" ? " fa-user " : sender === "WoLF" ? " fa-robot" : "");

  var media = document.createElement("div");
  media.className = "media-content";

  var content = document.createElement("div");
  content.className = "content";

  var para = document.createElement("p");

  // wrap text in pre tag to preserve whitespace and line breaks
  var pre_text = document.createElement("pre");
  pre_text.style = "background-color: white; font-size: 18px; font-family: Arial; padding: 0; margin: 0; white-space: pre-wrap; word-wrap: break-word;";
  var paraText = document.createTextNode(text);
  pre_text.appendChild(paraText);

  var strong = document.createElement("strong");
  strong.innerHTML = sender;
  var br = document.createElement("br");

  para.appendChild(strong);
  para.appendChild(br);
  para.appendChild(pre_text);

  // Add image if imageSrc is provided
  if (imageSrc) {
    var img = document.createElement("img");
    img.src = imageSrc;
    img.style = "max-width: 100%; max-height: 300px;"; // Adjust the style as needed
    para.appendChild(img);
  }

  content.appendChild(para);
  media.appendChild(content);
  span.appendChild(icon);
  figure.appendChild(span);
  if (sender !== "Description") {
    article.appendChild(figure);
  };
  article.appendChild(media);
  return article;
}

function addMessageToChatHistory(sender, message, imageSrc) {
  const chatHistory = document.querySelector('.chat-history');
  const chatRow = createChatRow(sender, message, imageSrc);
  chatHistory.appendChild(chatRow);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

function clearChatHistory() {
  const chatHistory = document.querySelector('.chat-history');
  chatHistory.innerHTML = "";
}

// 
const conversations = [
  {
    "description": "thao-and-bo",
    "turns": [
      // ["Description", "Please read the description and answer the question."],
      ["User", "", "./static/images/image_dashboard_1.jpg"],
      ["User", "The patient first had NaCl 0.9% intake during the current ICU visit. Find any abnormalities in this CXR."],
      ["WoLF", "The CXR reveals a new right subclavian central venous catheter with proper tip placement in the lower SVC. This type of catheter is typically used for administering IV fluids like NaCl 0.9% in ICU patients. No other new abnormalities are observed."]
    ]
  },
  {
    "description": "thao-and-bo",
    "turns": [
      // ["Description", "Please read the description and answer the question."],
      ["User", "", "./static/images/image_dashboard_2.jpg"],
      ["User", "What kind of findings does the CXR show? The patient had an exploratory laparotomy within 2 days after a chest X-ray showing a PICC last January."],
      ["WoLF", "CXR shows worsened pulmonary edema, cardiac enlargement, and new right pleural effusion. Multiple medical devices visible, likely from recent laparotomy. Findings suggest worsening heart failure, contrasting with January's CXR showing only a PICC line."]
    ]
  },
  {
    "description": "thao-and-bo",
    "turns": [
      // ["Description", "Please read the description and answer the question."],
      ["User", "", "./static/images/image_dashboard_3.jpg"],
      ["User", "Describe any anatomical findings in the right clavicle on the X-ray. Patient has been prescribed with omeprazole."],
      ["WoLF", "The chest x-ray shows a chronic displaced fracture of the right clavicle. The omeprazole may be part of post-operative care following the patient's Pancoast tumor resection, while the clavicle fracture is likely a consequence of the same surgery. Both findings indicate ongoing management of the patient's complex chest condition."]
    ]
  },
  //... (기타 conversations 내용)
];

// The current image index
let currentIndex = 0;

// The function to update the displayed chat history
function update_dialog_demo() {
  // Clear the chat history
  clearChatHistory();

  for (let i = 0; i < conversations[currentIndex].turns.length; i++) {
    if (conversations[currentIndex].turns[i].length == 2) {
      addMessageToChatHistory(conversations[currentIndex].turns[i][0], conversations[currentIndex].turns[i][1]);
    }
    else {
      addMessageToChatHistory(conversations[currentIndex].turns[i][0], conversations[currentIndex].turns[i][1], conversations[currentIndex].turns[i][2]);
    }
  }

  // scroll to the top of the chat history
  document.querySelector('.chat-history').scrollTop = 0;
}

// Initialize the displayed image
update_dialog_demo();

// Event listeners for the buttons
document.getElementById('prev-question').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + conversations.length) % conversations.length;
  update_dialog_demo();
});

document.getElementById('next-question').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % conversations.length;
  update_dialog_demo();
});



// swiper

var swiper = new Swiper('.swiper-container', {
    loop: true,                          // 무한 루프 설정
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    speed: 500,
    cssMode: true,                       // cssMode 활성화
    simulateTouch: true,                 // 마우스 드래그를 터치처럼 동작하게 설정
    touchStartPreventDefault: true,      // 터치 및 드래그 시작 시 기본 동작 방지
    allowTouchMove: true,                // 마우스와 터치 모두 스와이프 가능하게 설정
    on: {
        init: function () {
            // 슬라이드 내의 모든 이미지 요소에 대해 드래그 기능을 비활성화합니다.
            this.slides.find('img').each(function () {
                this.setAttribute('draggable', 'false');
            });
        },
    },
});
