const startDate = new Date('2025-11-29');
const endDate = new Date('2026-01-13');
const today = new Date();

const messagesParDate = {
    "2025-11-29": "Joyeux anniversaire ! (de la part de tout le monde !)",
    "2025-11-30": "Je t'aime ma soeur (Manon)",
    "2025-12-01": "Choisis d'être heureuse ici et maintenant (maman)",
    "2025-12-02": "Je pense à toi tout le temps (Axel)",
    "2025-12-03": "Je t'adore, ne l'oublie jamais (Axel)",
    "2025-12-04": "Profite des experiences que la vie te propose (mamie)",
    "2025-12-05": "Ton sourire illumine ma journée (Axel)",
    "2025-12-06": "Merci d'être toi (Axel)",
    "2025-12-07": "Chaque jour est une nouvelle opportunité de grandir et d'apprendre (maman)",
    "2025-12-08": "L'essentiel dans la vie est de se sentir aimé et accepté comme tu es (mamie)",
    "2025-12-09": "Tu es trop gentille (Anae)",
    "2025-12-10": "Profite de ta vie et de tes amis (Manon)",
    "2025-12-11": "Tu es capable de réaliser tout ce que tu désire (maman)",
    "2025-12-12": "Je suis heureuse que tu sois rentrée dans notre vie (Sandra)",
    "2025-12-13": "Je t'aime !! (Axel/m-1 <3)",
    "2025-12-14": "Sois contente de te lever le matin (mamie)",
    "2025-12-15": "Tu dois être fière de ce que tu es et de tout ce que tu accomplis (maman)",
    "2025-12-16": "Je te souhaite beaucoup de bonheur (Christophe)",
    "2025-12-17": "Prend le temps de partager la vie avec les autres (mamie)",
    "2025-12-18": "Notre vie on va la passer ensemble c'est promis (Axel)",
    "2025-12-19": "On te souhaite tout le bonheur du monde (Sandra, Christophe, Anae)",
    "2025-12-20": "Je me concentre sur ce qui compte vraiment (maman)",
    "2025-12-21": "Il en faut peut pour être heureux !! (Greg)",
    "2025-12-22": "Distribue de l'amour, la vie te le rendra (maman)",
    "2025-12-23": "Ta franchise, ta bonne humeur et ta maturité sont de tres belles qualités qui me plaisent (Sophie)",
    "2025-12-24": "Fais toi confiance et trace ton chemin (mamie)",
    "2025-12-25": "Joyeux Noël chérie !",
    "2025-12-26": "Fais de ta vie un rêve, et d'un rêve une réalité (Sandra)",
    "2025-12-27": "Tu es une belle personne ne l'oublie jamais (Vincent)",
    "2025-12-28": "Coucouuu mvvvv 💕
Je repense à nos vacances à l’île d’Oléron : les dodos en tente, tous nos fous rires, les plages, le vélo… et évidemment le fameux cahier de vacances qui nous a pris la tête toute la matinée jusqu’au repas du midi 😅 #traumatiser
Mais franchement, maintenant qu’on y repense (et qu’on n’a plus de cahier 😌), ça reste un super souvenir. Avec toi, même les galères deviennent marrantes. »
Vivement les prochaines vacances à îles d’Oléron.",
    "2025-12-29": "",
    "2025-12-30": "",
    "2025-12-31": "",
    "2026-01-01": "Bonne année mon coeur!",
    "2026-01-02": "",
    "2026-01-03": "",
    "2026-01-04": "",
    "2026-01-05": "",
    "2026-01-06": "",
    "2026-01-07": "",
    "2026-01-08": "",
    "2026-01-09": "",
    "2026-01-10": "",
    "2026-01-11": "",
    "2026-01-12": "",
    "2026-01-13": "Jour magique, deux ans ensemble !!!",

};

const messages = [
    "Je t'aime !!"
];

const bubblesContainer = document.getElementById('bubbles');
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
const totalDays = Math.ceil((endDate - startDate)/(1000*60*60*24)) + 1;

// --- Fonction utilitaire pour formater la date en 'YYYY-MM-DD' ---
// Ceci est crucial pour des comparaisons de dates précises
function formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

const todayKey = formatDate(today); // '2025-11-29'

// --- Stockage local pour l'état d'ouverture ---
// Simule le fait qu'une bulle a été cliquée le jour même.
// On utilise localStorage pour que l'état persiste après rechargement.
const openedState = JSON.parse(localStorage.getItem('bubbleOpened')) || {};

for(let i = 0; i < totalDays; i++){
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    // ... (Position et Animation inchangées) ...
    bubble.style.top = Math.random() * (viewportHeight - 80) + 'px';
    bubble.style.left = Math.random() * (viewportWidth - 80) + 'px';

    const anim = ['float1','float2','float3'][Math.floor(Math.random()*3)];
    const dur = 5 + Math.random()*5;
    bubble.style.animation = `${anim} ${dur}s ease-in-out infinite alternate`;

    // Date
    const bubbleDate = new Date(startDate);
    bubbleDate.setDate(bubbleDate.getDate() + i);
    const dateKey = formatDate(bubbleDate); // Clé de la date pour la comparaison et le dictionnaire

    // Affichage de la date (Jour/Mois)
    bubble.textContent = `${bubbleDate.getDate()}/${bubbleDate.getMonth()+1}`;

    // Message
    const span = document.createElement('span');
    span.textContent = messagesParDate[dateKey] || messages[i % messages.length];
    span.style.pointerEvents = 'none';
    bubble.appendChild(span);


    // -----------------------------------------------------------------
    // LOGIQUE DE CLIC ET D'ÉTAT (MODIFIÉE)
    // -----------------------------------------------------------------

    // 1. Détermination de l'état de la bulle par rapport à aujourd'hui
    let state = 'future';
    if (dateKey === todayKey) {
        state = 'today'; // Cliquable uniquement aujourd'hui
    } else if (bubbleDate < today) {
        state = 'past';  // Ouvert par défaut (reseté)
    }

    // 2. Application des classes CSS et de l'état d'ouverture

    // État "PASSÉ" : Toujours ouvert
    if (state === 'past') {
        bubble.classList.add('opened', 'small');
        // Retirez l'événement de clic pour les bulles passées
        bubble.style.pointerEvents = 'none';
    }

    // État "AUJOURD'HUI" : Cliquable
    else if (state === 'today') {
        bubble.classList.add('clickable');

        // Vérification de l'état dans le localStorage (si la bulle a déjà été ouverte aujourd'hui)
        if (openedState[dateKey] === true) {
            bubble.classList.add('opened'); // Si déjà ouvert, l'afficher
        }

        // Gestion du clic
        bubble.addEventListener('click', () => {
            if (!bubble.classList.contains('opened')) {
                bubble.classList.add('opened');
                // Enregistrer l'état d'ouverture dans le stockage local
                openedState[dateKey] = true;
                localStorage.setItem('bubbleOpened', JSON.stringify(openedState));
            }
        });
    }

    // État "FUTUR" : Non cliquable
    else {
        bubble.style.pointerEvents = 'none';
        bubble.addEventListener('click', () => {
            alert("Cette bulle n'est pas encore prête 💖");
        });
    }

    bubblesContainer.appendChild(bubble);
}
