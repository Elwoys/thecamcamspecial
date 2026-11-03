document.addEventListener("DOMContentLoaded", function () {
    let resultPage = document.getElementById("result-page");

    function checkAndTriggerGif() {
        if (resultPage.style.display !== "none") { 
            let randomInterval = Math.floor(Math.random() * 70000) + 10000;
            setTimeout(showFloatingGif, randomInterval); 
        }
    }

    function showFloatingGif() {
        if (resultPage.style.display === "none") return;

        let gif = document.createElement("img");
        gif.src = "IMG/Heh/C9.gif";  
        gif.style.position = "absolute";
        gif.style.top = Math.random() * (window.innerHeight - 150) + "px"; 
        gif.style.right = "-200px";
        gif.style.width = "150px";
        gif.style.cursor = "pointer";
        gif.style.animation = "floatUpDown 3s ease-in-out infinite"; 
        
        gif.onclick = function () {
            window.open("new.html", "_blank"); 
        };
        document.body.appendChild(gif);

        setTimeout(() => {
            gif.style.transition = "right 7s linear";
            gif.style.right = window.innerWidth + "px"; 
        }, 100);

        setTimeout(() => {
            gif.remove();
        }, 6000);
        checkAndTriggerGif();
    }

    let observer = new MutationObserver(checkAndTriggerGif);
    observer.observe(resultPage, { attributes: true, attributeFilter: ["style"] });

    let style = document.createElement("style");
    style.innerHTML = `
        @keyframes floatUpDown {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); } /* Moves up */
            100% { transform: translateY(0px); } /* Moves back down */
        }
    `;
    document.head.appendChild(style);
});





document.getElementById('start1-button').addEventListener('click', function () {
    const popSound = document.getElementById('popSound');
    popSound.play();
    document.getElementById('start-page').style.display = 'none';
    document.getElementById('interm').style.display = 'flex';
});

document.getElementById('start-button').addEventListener('click', function () {
    const notifSound = document.getElementById('notifSound');
    notifSound.play();
    document.getElementById('interm').style.display = 'none';
    document.getElementById('phone-screen').style.display = 'flex';
});

let currentMessageIndex = 0;
const scores = { B: 0, S: 0, W: 0, G: 0, P: 0, D: 0, A: 0, R: 0 };

const dialogue = [
    // 0 (0)
    {
        speaker: 'bot',
        text: ["*Vous venez de recevoir une notification*"],
        choices: [
            { id: 1, text: "Ouvrir", type: 'A', weight: 2, next: 2, followUpText: [] },
            { id: 2, text: "Ignorer", type: 'R', weight: 2, next: 1, followUpText: [] },
            /*{ id: 2, text: 'DEBUG', type: 'O', weight: 0, next: 100, followUpText: [] },*/
        ]
    },
    // 1
    {
        speaker: 'bot',
        text: ["*Êtes-vous sûre ? Ca pourrait être important*"],
        choices: [
            { id: 1, text: "Bon okay, je vais l'ouvrir...", type: 'O', weight: 1, next: 2, followUpText: [] },
        ]
    },
    // 2 (2)
    {
        speaker: 'bot',
        text: ["Coucou Camille ! J'ai entendu dire qu'ajd était une journée spéciale pour toi :D"],
        choices: [
            { id: 1, text: "Désolée, mauvais numéro...", type: 'B', weight: 2, next: 3, followUpText: [] },
            { id: 2, text: "Et vous êtes ??", type: 'S', weight: 2, next: 4, followUpText: [] },
            { id: 3, text: "*ma maman m'a appris à ignorer les arnaqueurs, et c'en est clairement un*", type: 'W', weight: 2, next: 5, followUpText: [] },
        ]
    },

    // 3 (3_1)
    {
        speaker: 'bot',
        text: ["Mauvais numéro ?", "Je connais aucune autre Camille perso !", "En plus c'est toi qui fait appel à moi !!"],
        choices: [
            { id: 1, text: "Faire appel à toi ??", type: 'G', weight: 1, next: 6, followUpText: [] },
            { id: 2, text: "Oui oui, et les vaches ça vole...", type: 'P', weight: 1, next: 6, followUpText: [] },
            { id: 3, text: "Okay mais du coup t'es qui ?!", type: 'D', weight: 1, next: 6, followUpText: [] }
        ]
    },
    // 4 (3_2)
    {
        speaker: 'bot',
        text: ["Moi ? Mais tu me connais déjà !", "C'est toi qui viens de faire appel à moi", "C'est bien toi qui a voulu faire ce test aujourd'hui, non ?"],
        choices: [
            { id: 1, text: "Faire appel à toi ?", type: 'G', weight: 1, next: 6, followUpText: [] },
            { id: 2, text: "Mais de quoi tu parles...", type: 'P', weight: 1, next: 6, followUpText: [] },
            { id: 3, text: "Et donc t'es qui au juste ?!", type: 'D', weight: 1, next: 6, followUpText: [] }
        ]
    },
    // 5 (3_3)
    {
        speaker: 'bot',
        text: ["Eh, ne m'ignore pas !", "Je sais que tu as vu mes messages !!", "C'est toi qui a fait appel à moi pourtant :("],
        choices: [
            { id: 1, text: "Faire appel à toi ?", type: 'G', weight: 1, next: 6, followUpText: [] },
            { id: 2, text: "Mais de quoi tu parles...", type: 'P', weight: 1, next: 6, followUpText: [] },
            { id: 3, text: "T'es qui même ?!", type: 'D', weight: 1, next: 6, followUpText: [] }
        ]
    },

    // 6 (4)
    {
        speaker: 'bot',
        text: ["Ok ok, laisse-moi tout t'expliquer !", "Moi c'est Bibi, une birthday bee !", "Et mon rôle aujourd'hui c'est d'animer un peu cette journée si spéciale pour toi !!"],
        choices: [
            { id: 1, text: "Et depuis quand les abeilles animent des anniversaires même...", type: 'P', weight: 2, next: 7, followUpText: [] },
            { id: 2, text: "Okay Bibi, et comment tu comptes t'y prendre ?", type: 'G', weight: 2, next: 8, followUpText: [] },
            { id: 3, text: "On peut abréger là ? Ca devient long...", type: 'D', weight: 2, next: 8, followUpText: [] },

        ]
    },

    // 7 (5_1)
    {
        speaker: 'bot',
        text: ["Ah bah les temps sont durs pour tout le monde, hein", "Moi aussi j'ai une famille à nourrir !", "(Et des achats compulsifs à faire, mais chut)", "Enfin bref, j'aurais 12 questions à te poser", "Partante ?"],
        choices: [
            { id: 1, text: "Si tu insistes...", type: 'R', weight: 1, next: 10, followUpText: [] },
            { id: 2, text: "Tu me fais un peu pitié donc j'accepte.", type: 'A', weight: 1, next: 10, followUpText: ["J'espère pour toi que t'es bien payé pour le coup"] },
        ]
    },
    // 8 (5_2)
    {
        speaker: 'bot',
        text: ["Avec un petit quiz tout simple !", "J'aurais 12 questions à te poser", "Partante ?"],
        choices: [
            { id: 1, text: "Allez, pourquoi pas", type: 'R', weight: 1, next: 10, followUpText: [] },
            { id: 2, text: "J'avoue être un peu curieuse maintenant, on peut démarrer oui", type: 'A', weight: 1, next: 10, followUpText: [] },
        ]
    },


    // 9 (5_3)
    {
        speaker: 'bot',
        text: ["C'est que Madame est une busy bee aussi !", "J'aurais juste 12 questions à te poser", "Partante ?"],
        choices: [
            { id: 1, text: "Allez, pourquoi pas", type: 'O', weight: 0, next: 10, followUpText: [] },
            { id: 2, text: "Et z'est bartiiiii", type: 'O', weight: 0, next: 10, followUpText: [] },
            { id: 3, text: "Let's gooo", type: 'O', weight: 0, next: 10, followUpText: [] },
        ]
    },

    // 10 (Q1)
    {
        speaker: 'bot',
        text: ["Yay !", "C'est parti alors !", "1) Qu'est-ce qu'un anniversaire pour toi ?"],
        choices: [
            { id: 1, text: "Un moment où je peux rassembler tous les êtres qui me sont chers au même endroit", type: 'G', weight: 2, next: 11, followUpText: [] },
            { id: 2, text: "Une occasion de faire la fête !", type: 'P', weight: 2, next: 11, followUpText: [] },
            { id: 3, text: "Un jour comme les autres, juste un peu plus symbolique", type: 'D', weight: 2, next: 12, followUpText: [] },
            { id: 4, text: "Une journée où je peux un peu plus penser à moi-même", type: 'D', weight: 2, next: 11, followUpText: [] },
            { id: 5, text: "Un pas de plus vers le décès", type: 'P', weight: 2, next: 11, followUpText: [] },
        ]
    },

    // 11 (Q2_1,2,4)
    {
        speaker: 'bot',
        text: ["Haha je pense la même chose !", "2) Qui souhaites-tu avoir à tes côtés en cette journée si spéciale?"],
        choices: [
            { id: 1, text: "Ma famille", type: 'W', weight: 1, next: 13, followUpText: [] },
            { id: 2, text: "Mon amoureux :)", type: 'B', weight: 2, next: 13, followUpText: [] },
            { id: 3, text: "Mon cercle restreint ! Juste les quelques personnes qui comptent vraiment pour moi", type: 'S', weight: 2, next: 13, followUpText: [] },
            { id: 4, text: "J'ai envie de profiter de ma propre compagnie aujourd'hui", type: 'W', weight: 2, next: 13, followUpText: [] },
            { id: 5, text: "Toutes les personnes dont j'apprécie la compagnie, plus on est de fous, plus on rit !!", type: 'B', type2: 'S', weight: 1, next: 13, followUpText: [] },
        ]
    },


    // 12 (Q2_3,5)
    {
        speaker: 'bot',
        text: ["...Etonnante réponse venant de toi !", "Sinon, 2) Qui souhaites-tu avoir à tes côtés en cette journée si spéciale?"],
        choices: [
            { id: 1, text: "Ma famille", type: 'W', weight: 1, next: 13, followUpText: [] },
            { id: 2, text: "Mon amoureux :)", type: 'B', weight: 2, next: 13, followUpText: [] },
            { id: 3, text: "Mon cercle restreint ! Juste les quelques personnes qui comptent vraiment pour moi", type: 'S', weight: 2, next: 13, followUpText: [] },
            { id: 4, text: "J'ai envie de profiter de ma propre compagnie aujourd'hui", type: 'W', weight: 2, next: 13, followUpText: [] },
            { id: 5, text: "Toutes les personnes dont j'apprécie la compagnie, plus on est de fous, plus on rit !!", type: 'B', type2: 'S', weight: 1, next: 13, followUpText: [] },
        ]
    },

    
    // 13 (Q3)
    {
        speaker: 'bot',
        text: ["Parfait !", "3) Comment décrirais-tu le type de célébration que tu souhaiterais avoir ?"],
        choices: [
            { id: 1, text: "Simple et réconfortant, juste quelque chose qui me ferait passer un bon moment avec mes gens préférés !", type: 'G', weight: 2, next: 14, followUpText: [] },
            { id: 2, text: "Fun et festif, je déborde d'énergie !", type: 'P', weight: 2, next: 15, followUpText: [] },
            { id: 3, text: "Unique et inhabituel, c'est l'occasion de faire quelque chose de spécial !", type: 'D', weight: 2, next: 16, followUpText: [] },
        ]
    },

    
    // 14 (Q4_1)
    {
        speaker: 'bot',
        text: ["C'est ce que j'aurais choisi aussi !" "4) Et qu'est-ce que tu voudrais faire plus exactement ?"],
        choices: [
            { id: 1, text: "Une journée détente, juste à papoter et rigoler avec mes personnes préférées !", type: 'R', weight: 2, next: 17, followUpText: ["L'important c'est pas ce que l'on fait, c'est avec qui on est !"] },
            { id: 2, text: "Une soirée bar à jeux !", type: 'A', weight: 2, next: 17, followUpText: [] },
            { id: 3, text: "Une après-midi shopping avec des proches !", type: 'A', weight: 2, next: 17, followUpText: ["Occasion parfaite de me faire payer des choses hehe #rat"] },
            { id: 4, text: "Cuisiner et faire des loisirs créatifs avec mes proches", type: 'R', weight: 2, next: 17, followUpText: ["(Dans le confort de l'appart de Nico !)"] },
        ]
    },

    // 15 (Q4_2)
    {
        speaker: 'bot',
        text: ["C'est une bonne chose !", "4) Et qu'est-ce que tu voudrais faire plus exactement ?"],
        choices: [
            { id: 1, text: "Direction boîte de nuit, je veux danser !!!!", type: 'R', weight: 2, next: 17, followUpText: ["Marine serait sûrement partante aussi, vu le nombre de fois où elle nous en parle !"] },
            { id: 2, text: "Un karaoké, je suis prête à délivrer la performance d'une vie !", type: 'A', weight: 2, next: 17, followUpText: ["(Qu'Anaïs ma partenaire de chant s'échauffe la voix aussi, ce soir ça va chanter !)"] },
            { id: 3, text: "Boire un verre au bar !", type: 'A', weight: 2, next: 17, followUpText: ["Simple, mais efficace pour se retrouver ensemble !"] },
            { id: 4, text: "Home - cooking our favorite dish", type: 'R', weight: 2, next: 17, followUpText: ["A way to one's heart is through their stomach!"] },
        ]
    },
    // 16 (Q4_3)
    {
        speaker: 'bot',
        text: ["Quelque chose qui change hein ? J'adore !", "4) Et qu'est-ce que tu voudrais faire plus exactement ?"],
        choices: [
            { id: 1, text: "Une escapade dans une autre ville le temps d'un week-end !", type: 'R', weight: 2, next: 17, followUpText: ["C'est peut-être l'occasion de rendre visite à Marie à Londres, non ?"] },
            { id: 2, text: "Avoir une fête d'anniversaire surprise organisée par mes proches", type: 'A', weight: 2, next: 17, followUpText: ["Qui n'en rêve pas ?"] },
            { id: 3, text: "Une virée en bateau le long de l'Erdre !", type: 'A', type2: 'R', weight: 1, next: 17, followUpText: ["De quoi faire de jolies photos avec Marine et Louise !"] },
            { id: 4, text: "Un resto chic", type: 'A', weight: 2, next: 17, followUpText: ["Occasion parfaite de sortir ma meilleure tenue et de faire tourner la tête de mon bien-aimé hehe"] },
        ]
    },
    // 17 (Q5)
    {
        speaker: 'bot',
        text: ["Un très bon programme !", "5) Maintenant, quel type de cadeau te ferait le plus plaisir ?"],
        choices: [
            { id: 1, text: "Quelque chose de sincère et fait avec amour !", type: 'R', weight: 2, next: 18, followUpText: [] },
            { id: 2, text: "Un cadeau classique mais choisi avec goût !", type: 'A', weight: 2, next: 19, followUpText: [] },
            { id: 3, text: "Une activité à faire plutôt qu'un objet !", type: 'R', weight: 2, next: 20, followUpText: [] },
        ]
    },

    
    // 18 (Q6_1)
    {
        speaker: "bot",
        text: ["Un cadeau personnalisé ? J'adore !", "6) Par exemple ?"],
        choices: [
            { id: 1, text: "Un album photo !", type: 'G', weight: 2, next: 21, followUpText: [] },
            { id: 2, text: "Quelque chose fait à la main !", type: 'P', weight: 2, next: 21, followUpText: ["un bijou, un jeu de société sur-mesure ou même un site web par exemple haha *wink wink*"] },
            { id: 3, text: "Une jolie lettre", type: 'G', weight: 2, next: 21, followUpText: ["Pleine de mots touchants à l'intérieur !"] },
        ]
    },
    // 19 (Q6_2)
    {
        speaker: "bot",
        text: ["6) Par exemple ?"],
        choices: [
            { id: 1, text: "Une peluche jellycat !", type: "B", weight: 2, next: 21, followUpText: ["Attention à bien regarder si je n'ai pas déjà la peluche dans ma collection haha"] },
            { id: 2, text: "Un bouquet avec mes fleurs préférées", type: "S", weight: 2, next: 21, followUpText: ["Qui n'aime pas recevoir de jolies fleurs ?"] },
            { id: 3, text: "Une babiole avec une histoire !", type: "W", weight: 2, next: 21, followUpText: [] },
        ]
    },
    // 20 (Q6_3)
    {
        speaker: "bot",
        text: ["Un moment plutôt qu'un objet, bonne idée !", "6) Par exemple ?"],
        choices: [
            { id: 1, text: "Une matinée spa !", type: "B", weight: 2, next: 21, followUpText: ["De quoi bien décompresser"] },
            { id: 2, text: "Une après-midi dans un atelier créatif !", type: "S", weight: 2, next: 21, followUpText: ["De quoi laisser parler ma fibre créative !"] },
            { id: 3, text: "Gentle head pats and eyes contacts", type: "W", weight: 2, next: 21, followUpText: [] }
        ]
    },
    

    // 21 (Q7)
    {
        speaker: "bot",
        text: ["Je prends note !", "Ensuite, quoi de mieux pour animer cette journée qu'un peu de musique ?", "7) Choisis un genre musical pour rythmer ta journée !"],
        choices: [
            { id: 1, text: "De la pop anglophone !", type: "D", type2: "P", weight: 2, next: 22, followUpText: ["Sabrina Carpenter, Taylor Swift, Benson Boone", "Des choix simples, mais toujours bons !"] },
            { id: 2, text: "De la variété francophone", type: "P", weight: 1, next: 22, followUpText: ["De quoi faire un karakoé en voiture !"] },
            { id: 3, text: "Une bande-son iconique !", type: "G", weight: 2, next: 22, followUpText: ["Siri, joue le thème de la Soupe aux choux !"] },
            { id: 4, text: "De la musique classique", type: "P", weight: 2, next: 22, followUpText: ["En fin de journée, pour finir en douceur"] },
            { id: 5, text: "Des hits latinos !", type: "G", weight: 1, next: 22, followUpText: ["Parfait pour se déhancher !"] },
        ]
    },

    // 22 (Q8)
    {
        speaker: "bot",
        text: ["9) What's one item you would definitely bring on a date?"],
        choices: [
            { id: 1, text: "a flower bouquet", type: "B", weight: 2, next: 27, followUpText: [] },
            { id: 2, text: "my wallet", type: "S", weight: 2, next: 27, followUpText: [] },
            { id: 3, text: "my *whole* backpack", type: "W", weight: 2, next: 27, followUpText: ["I got wet wipes, gum, band-aid...","just in case they need it too!"] },
            { id: 4, text: "an umbrella", type: "W", weight: 2, next: 27, followUpText: ["big enough to fit both of us in case it rains"] },
            { id: 5, text: "a camera", type: "B", weight: 2, next: 27, followUpText: ["to capture our memories"] },
            { id: 6, text: "a small gift", type: "S", weight: 2, next: 27, followUpText:  ["like a plushie or matching key chains"] },
        ]
    },


    // 23 (Q9)
    {
        speaker: "bot",
        text: ["Wise choice! Now, enough with your (hypothetical) love scenarios", "Let's get to know YOU more!", "10) Who are you in a friend group?"],
        choices: [
            { id: 1, text: "The taken one", type: "D", type2: "A", weight: 2, next: 28, followUpText: [] },
            { id: 2, text: "The quiet/mysterious one", type: "G", type2: "R", weight: 2, next: 31, followUpText: [] },
            { id: 3, text: "The one who plans all the hangouts", type: "P", type2: "A", weight: 2, next: 30, followUpText: [] },
            { id: 4, text: "The shipper/matchmaker", type: "P", type2: "R", weight: 2, next: 29, followUpText: [] },
            { id: 5, text: "The single but love guru", type: "G", type2: "A", weight: 2, next: 29, followUpText: ["Coaches don’t play ;)"] },
            { id: 6, text: "Bold of you to assume I have friends", type: "D", type2: "R", weight: 2, next: 32, followUpText: [] },
        ]
    },

    // 24 (Q10)
    {
        speaker: 'bot',
        text: ["Ooooh taken, I see", "11) Any words of advices on relationship?"],
        choices: [
            { id: 1, text: "Never settle for less. You know what's best for yourself", type: 'B', weight: 2, next: 33, followUpText: [] },
            { id: 2, text: "Put in the effort, strive to make your loved one happy", type: 'W', weight: 2, next: 33, followUpText: [] },
            { id: 3, text: "Make every day feel special, cherish every moments in life", type: 'S', weight: 2, next: 33, followUpText: [] },
        ]
    },

    // 25 (Q11_2,3)
    {
        speaker: 'bot',
        text: ["Ooooh, looks like someone's playing Cupid!", "11) Any wisdom to share, love expert?"],
        choices: [
            { id: 1, text: "Never settle for less. You know what's best for yourself", type: 'B', weight: 2, next: 33, followUpText: [] },
            { id: 2, text: "Put in the effort, strive to make your loved one happy", type: 'W', weight: 2, next: 33, followUpText: [] },
            { id: 3, text: "Make every day feel special, cherish every moments in life", type: 'S', weight: 2, next: 33, followUpText: [] },
        ]
    },

    // 26 (Q11_3,4)
    {
        speaker: 'bot',
        text: ["Okayy, I bet you're cool","Now, let's say you meet your past self","11) What love advice would you give them?"],
        choices: [
            { id: 1, text: "Never settle for less. You know what's best for yourself", type: 'B', weight: 2, next: 33, followUpText: [] },
            { id: 2, text: "Put in the effort, strive to make your loved one happy", type: 'W', weight: 2, next: 33, followUpText: [] },
            { id: 3, text: "Make every day feel special, cherish every moments in life", type: 'S', weight: 2, next: 33, followUpText: [] },
        ]
    },

    // 27 (Q11...)
    {
        speaker: 'bot',
        text: ["The cool one, I see","Now, let's say you meet your past self","11) What love advice would you give them?"],
        choices: [
            { id: 1, text: "Never settle for less. You know what's best for yourself", type: 'B', weight: 2, next: 33, followUpText: [] },
            { id: 2, text: "Put in the effort, strive to make your loved one happy", type: 'W', weight: 2, next: 33, followUpText: [] },
            { id: 3, text: "Make every day feel special, cherish every moments in life", type: 'S', weight: 2, next: 33, followUpText: [] },
        ]
    },

    // 28 (Q11...)
    {
        speaker: 'bot',
        text: ["Of course you have friends! Count me in!", "And hey, you are your own best friend—ever heard that saying?", "Now, let's say you meet your past self...", "11) What love advice would you give them?"],
        choices: [
            { id: 1, text: "Never settle for less. You know what's best for yourself", type: 'B', weight: 2, next: 33, followUpText: [] },
            { id: 2, text: "Put in the effort, strive to make your loved one happy", type: 'W', weight: 2, next: 33, followUpText: [] },
            { id: 3, text: "Make every day feel special, cherish every moments in life", type: 'S', weight: 2, next: 33, followUpText: [] },
        ]
    },

    // 29 (Q12)
    {
        speaker: 'bot',
        text: ["Down to the last question, then","12) Anything you'd like to wish for?"],
        choices: [
            { id: 1, text: "For A LOT OF Chocolate!!", type: 'P',weight: 2, next: 34, followUpText: [] },
            { id: 2, text: "Send me some looove", type: 'G',weight: 2, next: 34, followUpText: [] },
            { id: 3, text: "For my crush to like me back", type: 'D',weight: 2, next: 34, followUpText: [] },
            { id: 4, text: "For a Happy Valentine's Day", type: 'P',weight: 2, next: 34, followUpText: [] },
            { id: 5, text: "For a restful weekend", type: 'D',type2:'G',weight: 2, next: 34, followUpText: [] },
        ]
    },

    // 30
    {
        speaker: 'bot',
        text: ["Noted, that shall be served","oh, Just curious, what's your plan today?","Apart from playing this silly quiz, of course"],
        choices: [
            { id: 1, text: "Eat a lot of chocolate!!!", type: 'R',weight: 2, next: 35, followUpText: [] },
            { id: 2, text: "gonna go out and have funn!", type: 'A',weight: 1, next: 35, followUpText: [] },
            { id: 3, text: "I need to work/study T^T", type: 'R',weight: 1, next: 35, followUpText: [] },
            { id: 4, text: "Duh, I have a date!", type: 'A',weight: 1, next: 35, followUpText: [] },
            { id: 5, text: "No plans, just chilling at home", type: 'R',weight: 1, next: 35, followUpText: [] },
        ]
    },
    

    // 31 last
    {
        speaker: 'bot',
        text: ["lololl have fun!","Ready to see your result?"],
        choices: [
            { id: 1, text: 'YES!', type: 'O', weight: 0, next: 100, followUpText: [] },
        ]
    },

];


function addMessage(speaker, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', speaker);
    messageElement.textContent = text;
    document.getElementById('chatbox').appendChild(messageElement);
    document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;


    /*if (isLink) {
        const link = document.createElement('a');
        link.innerText = text;
        link.onclick = displayResult;
        messageElement.appendChild(link);
    }
    else if (opt) {
        const link = document.createElement('a');
        link.innerText = text;
        link.href = "https://www.instagram.com/izonfalzo/?hl=en";
        link.target = "_blank";
        messageElement.appendChild(link);
    }else {
        messageElement.textContent = text;
    }*/
}

function showChoices(choices) {
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';

    choices.forEach(choice => {
        const choiceButton = document.createElement('button');
        choiceButton.classList.add('choice-button');
        choiceButton.textContent = choice.text;
        choiceButton.onclick = () => handleChoice(choice.type, choice.type2, choice.type3, choice.weight, choice.id, choice.next);
        choicesContainer.appendChild(choiceButton);
    });
}

let typingInterval;
let typingDots = 0;

function showTypingDots() {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.textContent = 'typing...';
    document.getElementById('chatbox').appendChild(typingIndicator);
    typingIndicator.style.display = 'inline';

    typingDots = 0;

    typingInterval = setInterval(() => {
        typingIndicator.textContent = '.'.repeat(typingDots % 5);
        typingDots++;
    }, 250);
}

function stopTypingDots() {
    clearInterval(typingInterval);
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function displayResult() {
    let resultType = '';
    // B, S, or W
    let topBSW = [];
    if (scores.B >= scores.S && scores.B >= scores.W) topBSW.push('B');
    if (scores.S >= scores.B && scores.S >= scores.W) topBSW.push('S');
    if (scores.W >= scores.B && scores.W >= scores.S) topBSW.push('W');
    resultType += topBSW[Math.floor(Math.random() * topBSW.length)];

    // C, P, or D
    let topGPD = [];
    if (scores.G >= scores.P && scores.G >= scores.D) topGPD.push('G');
    if (scores.P >= scores.G && scores.P >= scores.D) topGPD.push('P');
    if (scores.D >= scores.G && scores.D >= scores.P) topGPD.push('D');
    resultType += topGPD[Math.floor(Math.random() * topGPD.length)];

    // A or R
    let topAR = [];
    if (scores.A >= scores.R) topAR.push('A');
    if (scores.R >= scores.A) topAR.push('R');
    resultType += topAR[Math.floor(Math.random() * topAR.length)];


    const resultsText = {
        'BGA': 'Raccoon',
        'BGR': 'Black Cat',
        'BDA': 'Doberman',
        'BDR': 'Lion',
        'BPA': 'Golden Retriever',
        'BPR': 'Fox',
        'SGA': 'Hamster',
        'SGR': 'Capybara',
        'SDA': 'Duck',
        'SDR': 'Sheep',
        'SPA': 'Orange Cat',
        'SPR': 'Chihuahua',
        'WGA': 'Bird',
        'WGR': 'Deer',
        'WDA': 'Snow Leopard',
        'WDR': 'Hedgehog',
        'WPA': 'Bunny',
        'WPR': 'Red Panda'
    }
const resultImages = {
    'BGA': '1.jpg',
    'BGR': '2.jpg',
    'BDA': '3.jpg',
    'BDR': '4.jpg',
    'BPA': '5.jpg',
    'BPR': '6.jpg',
    'SGA': '7.jpg',
    'SGR': '8.jpg',
    'SDA': '9.jpg',
    'SDR': '10.jpg',
    'SPA': '11.jpg',
    'SPR': '12.jpg',
    'WGA': '13.jpg',
    'WGR': '14.jpg',
    'WDA': '15.jpg',
    'WDR': '16.jpg',
    'WPA': '17.jpg',
    'WPR': '18.jpg',
};

    //document.getElementById('result-text').textContent = resultType + ' ' + resultsText[resultType];
    /*document.getElementById('result-image').src = resultImages[resultType];
    document.getElementById('result-overlay').style.display = 'flex';*/
    document.getElementById("phone-screen").style.display = "none";
    document.getElementById("result-page").style.display = "flex";
    document.getElementById("result-image").src = "IMG/" + resultImages[resultType];
    document.getElementById("result-image").alt = resultType + resultsText[resultType];
}

/*function closeResult() {
    document.getElementById('result-overlay').style.display = 'none';
    setTimeout(() => {
        addMessage('bot', 'Would you like to play again?');
        showChoices([
            { text: 'Yes, let’s go!', type: 'restart' },
            { text: 'No, thanks.', type: 'exit' }
        ]);
    }, 500);
}*/

function handleChoice(type, type2, type3, weight, id, nextIndex) {
    const dingSound = document.getElementById('dingSound');
    dingSound.play();
    const chosenOption = dialogue[currentMessageIndex].choices.find(choice => choice.type === type && choice.id === id);
    scores[type] += weight;
    scores[type2] += weight;
    scores[type3] += weight;



    updateDebugScores();
    currentMessageIndex = nextIndex;
    document.getElementById('choices').innerHTML = '';
    addMessage('user', chosenOption.text, false);

    if (chosenOption.followUpText && chosenOption.followUpText.length > 0) {
        chosenOption.followUpText.forEach((followUp, index) => {
            setTimeout(() => {
                addMessage('user', followUp);
            }, (index + 1) * 1000);
        });
    }

    setTimeout(() => {
        showTypingDots();

        setTimeout(() => {
            stopTypingDots();
            const popSound = document.getElementById('popSound');
            popSound.play();
            if (currentMessageIndex == 0 || currentMessageIndex == 2 || currentMessageIndex >=3 ) {
                const header = document.getElementById("header");
                header.textContent = 'Unknown';
                header.style.color = 'var(--6-color)';
                header.style.backgroundColor = 'var(--2-color)';
                const phoneScreen = document.getElementById("phone-screen");
                phoneScreen.style.backgroundColor = '#fff';
            }

            if (currentMessageIndex >= 6) {
                const header = document.getElementById("header");
                header.textContent = 'Cupid';
                header.style.color = 'var(--6-color)';
            }

            if (currentMessageIndex < dialogue.length) {
                const currentDialogue = dialogue[currentMessageIndex];
                currentDialogue.text.forEach((text, index) => {
                    setTimeout(() => {
                        addMessage(currentDialogue.speaker, text);
                    }, index * 1000);
                });
                setTimeout(() => {
                    showChoices(currentDialogue.choices);
                }, currentDialogue.text.length * 1000);

            }
            else {
                triggerIconShower();
                displayResult();
            }

        }, 1500);
    }, (chosenOption.followUpText.length * 1000) + 500);
}
//}


function restartQuiz() {
    document.getElementById("result-page").style.display = "none";
    document.getElementById("start-page").style.display = "flex";
    currentMessageIndex = 0;
    scores.B = scores.S = scores.W = scores.G = scores.P = scores.D = scores.A = scores.R = 0;
    document.getElementById('chatbox').innerHTML = '';
    document.getElementById('choices').innerHTML = '';
    const header = document.getElementById("header");
    header.textContent = '02/14';
    header.style.color = '#fff';
    header.style.backgroundColor = 'rgb(22, 22, 22)';
    const phoneScreen = document.getElementById("phone-screen");
    phoneScreen.style.backgroundColor = 'rgb(22, 22, 22)';
    startConversation();
}

function startConversation() {

    addMessage('bot', dialogue[0].text);
    showChoices(dialogue[0].choices);

}

function updateDebugScores() {
    const debugScoresElement = document.getElementById('debug-scores');
    const formattedScores = `
    ${currentMessageIndex+1}
B: ${scores.B}, S: ${scores.S}, W: ${scores.W},
G: ${scores.G}, P: ${scores.P}, D: ${scores.D}, 
A: ${scores.A}, R: ${scores.R}`;
    debugScoresElement.textContent = formattedScores.trim();
}




/*function share() {
    const link = window.location.href;
    
    navigator.clipboard.writeText(link)
        .then(() => {
            alert('Link copied to clipboard!');
        })
        .catch(err => {
            alert('Failed to copy the link: ' + err);
        });

    html2canvas(document.body).then(canvas => {
        const screenshot = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = screenshot;
        downloadLink.download = 'myresult.png';
        downloadLink.click();
    });
}*/


function share() {
    const resultImg = document.getElementById("result-image");
    const imgSrc = resultImg.src;

    const link = document.createElement("a");
    link.href = imgSrc;
    link.download = imgSrc.split("/").pop(); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}




function triggerIconShower(event) {
    for (let i = 0; i < 15; i++) {
        const icon = document.createElement('div');
        icon.classList.add('icon');

        const iconContent = Math.random() > 0.5 ? '♥' : '★';
        icon.textContent = iconContent;


        if (iconContent === '♥') {
            icon.classList.add('heart');
        }
        else {
            icon.classList.add('star');
        }


        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        icon.style.left = `${x}px`;
        icon.style.top = `${y}px`;


        document.body.appendChild(icon);


        setTimeout(() => {
            icon.remove();
        }, 3000);
    }
}

startConversation();




