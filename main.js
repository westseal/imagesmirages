//lien social
let active = null;
let slides = [];

var numero = 0;
var maxNum = 15;

function ChangeSlide(sens) {
    if (!active) return;
    numero = numero + sens;
    if (numero < 0) numero = slides.length - 1;
    if (numero > slides.length - 1) numero = 0;

    UpdateSlide();
}

function UpdateSlide() {
    document.getElementById("slide-active").src = `img/photos/${slides[numero]}.jpg`;
}
//pour chaque lien : quand le terme "battue" id=battue est cliqué, alors le slide qui aparraît est le slide qui correspond à l'id

$(document).ready(function () {
    const nodes = $(".node");

    for (const node of nodes) {
        const num = node.id.replace("node", "");

        node.onclick = function () {
            openMenu(num, true);
            $(".croix").click(function () {
                hideAllMenus();
            });
        };
    }
});



const openMenu = (num, onlyOpenMenu) => {
    hideAllMenus();

    active = num;

    const menuDiv = $(`.menu#${num}`);
    menuDiv.show();

    const options = menuDiv.find(".name");
    for (const option of options) {
        option.onclick = function () {
            const thisSrc = option.id;
            const othersSrc = options
                .toArray()
                .filter((opt) => opt.id !== option.id)
                .map((opt) => opt.id);

            numero = 0;
            slides = [thisSrc, ...othersSrc];
            UpdateSlide();

            //from ./description.js
            const textData = descriptions[active];

            $("#paragraphe #title").html(textData?.title || "Pas de titre");
            $("#paragraphe #content").html(textData?.content || "Pas de contenu");
            if (!textData?.tags) {
                $("#paragraphe #tags-title").hide();
                $("#paragraphe #tags").hide();
            } else {
                $("#paragraphe #tags-title").show();
                $("#paragraphe #tags").show();
                $("#paragraphe #tags").html(makeTagsHtml(textData?.tags));
            }
            if (!textData?.ressources) {
                $("#paragraphe #ressources-title").hide();
                $("#paragraphe #ressources").hide();
            } else {
                $("#paragraphe #ressources-title").show();
                $("#paragraphe #ressources").show();
                $("#paragraphe #ressources").html(makeRessourcesHtml(textData?.ressources));
            }

            $("#definition").html(textData?.definition || "");

            $("#open-description").click(function () {
                $("#description").show();
            });

            $(".div#fullscreen").show();

            $("#open-description").click(function () {
                $("#description").show();
            });

            $(".retour").click(function () {
                $(".nav").hide();
            });

            $(".close").click(function () {
                $(".div#fullscreen").hide();
                hideAllMenus();
            });
        };
    }

    if (onlyOpenMenu) return;
    options[0].click();
};

const hideAllMenus = function () {
    for (let i = 1; i <= maxNum; i++) {
        $(`.menu#${i}`).hide();
    }
};

const makeTagsHtml = (tags) => {
    let str = "";
    for (const label in tags) {
        str += `<li onclick='openMenu(${tags[label]})'>${label}</li>`;
    }
    return str;
};

const makeRessourcesHtml = (ressources) => {
    let str = "";
    for (const label in ressources) {
        str += `<li><a target="_blank" href="${ressources[label]}">${label}</a></li>`;
    }
    return str;
};

$(document).ready(function () {
    $('#about').click(function () {
      $('#leftAbout').show();
    });
  });

$(document).ready(function () {
    $('#colophon').click(function () {
      $('#middleColophon').show();
    });
  });  

$(document).ready(function () {
    $('.croix').click(function () {
      $('#leftAbout').hide();
      $('#middleColophon').hide();
    });
  });



