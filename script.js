console.log("JS BERHASIL DIMUAT");

const cards = document.querySelectorAll(".card");

let firstCard = null;
let secondCard = null;
let lock = false;
let matched = 0;

cards.forEach(card => {

  card.innerHTML = card.dataset.emoji;

  card.addEventListener("click", () => {

    if(lock) return;

    if(card === firstCard) return;

    card.classList.add("flipped");

    if(!firstCard){

      firstCard = card;

    }else{

      secondCard = card;
      lock = true;

      checkMatch();

    }

  });

});

function checkMatch(){

  const same =
    firstCard.dataset.emoji === secondCard.dataset.emoji;

  if(same){

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matched++;

    resetTurn();

    if(matched === 6){

      setTimeout(showGift, 1000);

    }

  }else{

    setTimeout(() => {

      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      resetTurn();

    }, 800);

  }

}

function resetTurn(){

  [firstCard, secondCard] = [null, null];
  lock = false;

}

/* SHOW GIFT */
function showGift(){

  confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 }
  });

  document.getElementById("gameBox").style.display = "none";

  document
    .getElementById("giftBox")
    .classList.remove("hidden");

}

/* OPEN GIFT */
function openGift(){

  document.getElementById("giftBox").style.display = "none";

  const messageBox = document.getElementById("messageBox");

  messageBox.classList.remove("hidden");

  messageBox.style.display = "flex";

  typeMessage();
}

function typeMessage(){

  const original =
    document.getElementById("messageContent");

  const target =
    document.getElementById("typingText");

  const text = original.innerText
    .replace(/\n\s*\n/g,"\n\n")
    .trim();

  target.innerHTML = "";
  target.classList.add("typing-cursor");

  let i = 0;

  function typing(){

    if(i < text.length){

      target.innerHTML += text.charAt(i);

      /* otomatis ikut turun saat teks bertambah */
      target.scrollTop = target.scrollHeight;

      i++;

      setTimeout(typing,100);

    }else{

  target.classList.remove("typing-cursor");

  document
    .getElementById("flowerButtonContainer")
    .classList.remove("hidden");

}

  }

  typing();

}


function startGame(){

    const music =
        document.getElementById("bgMusic");

    music.play().catch(err => {
        console.log(err);
    });

    document.getElementById(
        "startScreen"
    ).style.display = "none";

    document.getElementById(
        "gameBox"
    ).style.display = "block";

}

function showFlower(){

    document.getElementById(
        "messageBox"
    ).style.display = "none";

    document.getElementById(
        "flowerBox"
    ).classList.remove("hidden");

}