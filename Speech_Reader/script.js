const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {
        image: 'https://via.placeholder.com/150/0000FF/808080?Text=Drink',
        text: "I'm Thirsty"
    },
    {
        image: 'https://via.placeholder.com/150/FF0000/808080?Text=Food',
        text: "I'm Hungry"
    },
    {
        image: 'https://via.placeholder.com/150/800080/808080?Text=Tired',
        text: "I'm Tired"
    },
    {
        image: 'https://via.placeholder.com/150/008000/808080?Text=Hurt',
        text: "I'm Hurt"
    },
    {
        image: 'https://via.placeholder.com/150/FFFF00/808080?Text=Happy',
        text: "I'm Happy"
    },
    {
        image: 'https://via.placeholder.com/150/FFA500/808080?Text=Angry',
        text: "I'm Angry"
    },
    {
        image: 'https://via.placeholder.com/150/800000/808080?Text=Sad',
        text: "I'm Sad"
    },
    {
        image: 'https://via.placeholder.com/150/FFC0CB/808080?Text=Scared',
        text: "I'm Scared"
    },
    {
        image: 'https://via.placeholder.com/150/87CEEB/808080?Text=Outside',
        text: 'I Want To Go Outside'
    },
    {
        image: 'https://via.placeholder.com/150/FFD700/808080?Text=Home',
        text: 'I Want To Go Home'
    },
    {
        image: 'https://via.placeholder.com/150/00BFFF/808080?Text=School',
        text: 'I Want To Go To School'
    },
    {
        image: 'https://via.placeholder.com/150/F5DEB3/808080?Text=Grandma',
        text: 'I Want To Go To Grandmas'
    }
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
    const box = document.createElement('div');

    const { image, text } = item;

    box.classList.add('box');

    box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        // Add active effect
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
    });

    main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');

        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;

        voicesSelect.appendChild(option);
    });
}

// Set text
function setTextMessage(text) {
    message.text = text;
}

// Speak text
function speakText() {
    speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () =>
    document.getElementById('text-box').classList.toggle('show')
);

// Close button
closeBtn.addEventListener('click', () =>
    document.getElementById('text-box').classList.remove('show')
);

// Read text button
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
});


getVoices();