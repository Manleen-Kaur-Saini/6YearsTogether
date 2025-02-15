document.addEventListener("DOMContentLoaded", () => {
     // DOM Elements for Audio
  const bgMusic = document.getElementById("bgMusic");
  const startBtn = document.getElementById("startBtn");
  const startContainer = document.getElementById("startContainer");

  // Unmute and play background audio on start
  startBtn.addEventListener("click", function() {
    bgMusic.muted = false;
    bgMusic.play().then(() => {
      // Hide the start button container after audio starts
      startContainer.style.display = "none";
    }).catch(error => {
      console.error("Audio play error:", error);
    });
  });

    
    // DOM Elements

    const openModalBtn = document.getElementById('openModal');
    const modal = document.getElementById('modal');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const errorMessage = document.getElementById('errorMessage');

    const milestones = document.querySelectorAll('.milestone');
    const memoryText = document.getElementById('memoryText');
    const memoryImg = document.getElementById('memoryImg');

    const wheel = document.getElementById('wheel');
    const spinDateBtn = document.getElementById('spinDate');

    const passwordInput = document.getElementById('passwordInput');
    const submitPasswordBtn = document.getElementById('submitPassword');
    const secretDisplay = document.getElementById('secretDisplay');

    // Spin result popup elements
    const spinResultPopup = document.getElementById('spinResultPopup');
    const resultText = document.getElementById('resultText');
    const resultImage = document.getElementById('resultImage');
    const closePopupBtn = document.getElementById('closePopup');

    // Debug: log to ensure elements are loaded
    console.log("Spin popup element:", spinResultPopup);
    console.log("Close popup button:", closePopupBtn);

    // Ensure the spin popup is hidden on load
    spinResultPopup.style.display = "none";

    // Global confetti function
    function triggerConfettiGlobal() {
        const confettiContainer = document.createElement('div');
      confettiContainer.className = 'confetti';
      const count = 50;
      for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        const emojis = ["💖", "💖", "💕", "❤️", "😘", "💕", "💕"];
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = -(Math.random() * 100 + 50) + 'px';
        const duration = Math.random() * 2 + 5;
        confetti.style.animationDuration = `${duration}s`;
        const delay = Math.random() * 2;
        confetti.style.animationDelay = `${delay}s`;
        confettiContainer.appendChild(confetti);
      }
      document.body.appendChild(confettiContainer);
      setTimeout(() => {
        confettiContainer.remove();
      }, 6000);
    }
  
    // --- Escape Game Modal ---
    let noHoverCount = 0;
    openModalBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
    });
  
    noBtn.addEventListener('mouseenter', () => {
      noHoverCount++;
      const messages = [
        "Edan Kidan sohniye",
        "Really? NO? Try again!",
        "Nope nope nope, you are mine",
        "Edan Kidan sohniye",
        "Meriye Sohniye Bloongdiyeeee"
      ];
      errorMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
      noBtn.style.animation = 'wiggle 0.5s';
      setTimeout(() => { noBtn.style.animation = ''; }, 500);
      if (noHoverCount < 3) {
        const modalContent = document.querySelector('.modal-content');
        const modalRect = modalContent.getBoundingClientRect();
        const maxX = modalRect.width - noBtn.offsetWidth - 20;
        const maxY = modalRect.height - noBtn.offsetHeight - 20;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        noBtn.style.position = 'relative';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
      } else {
        errorMessage.textContent = "This btn is broken! say yes already";
      }
    });
  
    yesBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      noBtn.style.left = '0px';
      noBtn.style.top = '0px';
      noHoverCount = 0;
      errorMessage.textContent = "";
      triggerConfettiGlobal();
    });
  
    // --- Memory Lane ---
    milestones.forEach(milestone => {
      milestone.addEventListener('click', () => {
        memoryText.textContent = milestone.getAttribute('data-memory');
        memoryImg.src = milestone.getAttribute('data-img');
      });
    });
  
    // --- Virtual Date Generator ---
    const dateIdeas = [
      {
        idea: "Netflix trivia night: Loser will drink kacha dudh",
        image: "media/Netflix.png"
      },
      {
        idea: "Singing Romance Together",
        image: "media/kareoke.jpg"
      },
      {
        idea: "Romantic Movie Night with Popcorns in your Balti",
        image: "media/Movies.jpg"
      },
      {
        idea: "Doven cooking krange kathe.. Dishing mai krlunga",
        image: "media/cooking.jpg"
      }
    ];
  
    spinDateBtn.addEventListener('click', () => {
      // Spin animation on the wheel
      const randomDeg = Math.floor(Math.random() * 360) + 360;
      wheel.style.transform = `rotate(${randomDeg}deg)`;
      // Trigger confetti burst
      triggerConfettiGlobal();
  
      setTimeout(() => {
        // Randomly select a date idea
        const selected = dateIdeas[Math.floor(Math.random() * dateIdeas.length)];
        resultText.textContent = selected.idea;
        resultImage.src = selected.image;
        // Show the popup result by removing the inline style "display"
        spinResultPopup.style.display = "flex";
        // Also add the hidden class removal in case other styles depend on it
        spinResultPopup.classList.remove("hidden");
        // Extra confetti burst inside popup
        triggerConfettiGlobal();
      }, 1000);
    });
  
    // Close spin result popup
    closePopupBtn.addEventListener('click', () => {
      spinResultPopup.style.display = "none";
      spinResultPopup.classList.add("hidden");
    });
  
    // --- Password-Locked Secret Message ---
    const correctPassword = "neck"; // using lowercase for consistency
submitPasswordBtn.addEventListener('click', () => {
  const entered = passwordInput.value.trim().toLowerCase();
  if (entered === correctPassword) {
    secretDisplay.innerHTML = `
      <div class="secret-message animate-secret">
        <p class="romantic">You know it already but again I can leave everything behind me to be with you forever! <br> I Love you soo soo much meri sohniyee ❤️</p>
      </div>`;
  } else {
    secretDisplay.innerHTML = `<img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" alt="Wrong Password" />`;
  }
});

  });
  