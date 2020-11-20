var sideNav = document.getElementById('sideNav');
var content;
let channel_info = document.getElementsByClassName('channel-info-content')[0];
var only_favs = false;
var ordenCookie = getCookie("ordenado");
var favsCookie = getCookie("favoritos");
var ordenando = false;

let followed_text = "CANALES QUE SIGO";

//#region svgs
let svg_is_fav = '<g style="color: #9147ff;"><path d="M8.944 2.654c.406-.872 1.706-.872 2.112 0l1.754 3.77 4.2.583c.932.13 1.318 1.209.664 1.853l-3.128 3.083.755 4.272c.163.92-.876 1.603-1.722 1.132L10 15.354l-3.579 1.993c-.846.47-1.885-.212-1.722-1.132l.755-4.272L2.326 8.86c-.654-.644-.268-1.723.664-1.853l4.2-.583 1.754-3.77z"></path></g>';
let svg_no_fav = '<g> <path fill-rule="evenodd" d="M11.456 8.255L10 5.125l-1.456 3.13-3.49.485 2.552 2.516-.616 3.485L10 13.064l3.01 1.677-.616-3.485 2.553-2.516-3.491-.485zM7.19 6.424l-4.2.583c-.932.13-1.318 1.209-.664 1.853l3.128 3.083-.755 4.272c-.163.92.876 1.603 1.722 1.132L10 15.354l3.579 1.993c.846.47 1.885-.212 1.722-1.132l-.755-4.272 3.128-3.083c.654-.644.268-1.723-.664-1.853l-4.2-.583-1.754-3.77c-.406-.872-1.706-.872-2.112 0L7.19 6.424z" clip-rule="evenodd"></path> </g>';

let svg_opcion_lista = '<svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" class="ScIconSVG-sc-1bgeryd-1 cMQeyU"> <g> <path fill-rule="evenodd" d="M3 2a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-1 0v-10A.5.5 0 0 1 3 2z"/> <path fill-rule="evenodd" d="M5.354 10.146a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L3 11.793l1.646-1.647a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 9a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/> </g> </svg>';
let svg_opcion_lista2 = '<svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" class="ScIconSVG-sc-1bgeryd-1 cMQeyU"> <g><path fill-rule="evenodd" d="M3 13a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-1 0v10a.5.5 0 0 0 .5.5z"/> <path fill-rule="evenodd" d="M5.354 4.854a.5.5 0 0 0 0-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L3 3.207l1.646 1.647a.5.5 0 0 0 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 9a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/></g> </svg>';
let svg_opcion_az = '<svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" class="ScIconSVG-sc-1bgeryd-1 cMQeyU"> <g> <path fill-rule="evenodd" d="M4 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11A.5.5 0 0 1 4 2z"></path> <path fill-rule="evenodd" d="M6.354 11.146a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L4 12.793l1.646-1.647a.5.5 0 0 1 .708 0z"> </path> <path d="M9.664 7l.418-1.371h1.781L12.281 7h1.121l-1.78-5.332h-1.235L8.597 7h1.067zM11 2.687l.652 2.157h-1.351l.652-2.157H11zM9.027 14h3.934v-.867h-2.645v-.055l2.567-3.719v-.691H9.098v.867h2.507v.055l-2.578 3.719V14z"> </path> </g> </svg>';
let svg_opcion_za = '<svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" class="ScIconSVG-sc-1bgeryd-1 cMQeyU"> <g> <path fill-rule="evenodd" d="M4 14a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-1 0v11a.5.5 0 0 0 .5.5z"/> <path fill-rule="evenodd" d="M6.354 4.854a.5.5 0 0 0 0-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L4 3.207l1.646 1.647a.5.5 0 0 0 .708 0z"/> <path d="M9.664 7l.418-1.371h1.781L12.281 7h1.121l-1.78-5.332h-1.235L8.597 7h1.067zM11 2.687l.652 2.157h-1.351l.652-2.157H11zM9.027 14h3.934v-.867h-2.645v-.055l2.567-3.719v-.691H9.098v.867h2.507v.055l-2.578 3.719V14z"/> </g> </svg>';
//#endregion

//#region Listeners
window.addEventListener("load", () => {//al cargar la pagina
    try {
        setTimeout(function () {
            addFavBtn();
        }, 3000);

        if (sideNav) {
            content = sideNav.getElementsByClassName("simplebar-content")[0];
            if (content) {
                addSelect();

                let grup = sideNav.getElementsByClassName('tw-transition-group')[0];
                if (grup) {
                    //TODO listener si twitch cambia el orden de la lista o la actualiza

                    // var observer = new MutationObserver(function (mutations) {
                    //     mutations.forEach(function (mutation) {
                    //         reOrdenar();
                    //     });
                    // });

                    // var config = { attributes: true, childList: true, characterData: true };

                    // observer.observe(grup, config);
                }

                if (ordenCookie != "") {
                    let orden = ordenCookie.split("|");
                    if (orden) {
                        let tipo = orden[0];
                        only_favs = (orden[1] == "true");

                        if (only_favs) {
                            let filtro_favs = sideNav.getElementsByClassName("filtro_favs")[0];
                            if (filtro_favs) {
                                let svg = filtro_favs.getElementsByTagName("svg")[0];
                                if (svg) {
                                    svg.innerHTML = svg_is_fav;
                                }
                            }
                        }
                        setTimeout(function () {
                            ordenar(tipo);
                        }, 3000);

                        let elems = sideNav.querySelectorAll("#balloon-hide a");

                        elems.forEach(function (el) {
                            let el_tipo = el.dataset.orden;

                            if (tipo == el_tipo) {
                                cambiarSelect(el);
                            }
                        });
                    }
                }
            }
        }
    } catch (error) {
        console.log("Error ", error);
    }
});

window.addEventListener("click", () => {//añade el bonton de fav al hacer click
    setTimeout(function () {
        mouseListener();
    }, 3000);
}, { once: true });

if (channel_info) {//añade el bonton de fav si el raton está encima de la info del canal
    channel_info.addEventListener("mousemove", () => {
        mouseListener();
    }, { once: true });
}

document.body.addEventListener("mousemove", () => {
    mouseListener();
}, { once: true });

function mouseListener() {
    try {
        addFavBtn();
    } catch (error) {
        console.log("Error ", error);
    }
}
//#endregion

function reOrdenar() {//TODO reordenar despues de que twitch cambie el orden
    if (!ordenando) {
        console.log("test");
    }
}

function addFavBtn() {
    let fav_btn = document.getElementById("fav_btn");
    if (!fav_btn) {//si no existe
        if (channel_info) {
            let items = channel_info.getElementsByClassName('tw-accent-region')[1];
            let secondary = channel_info.getElementsByClassName('metadata-layout__secondary-button-spacing')[0];
            let marginRight = "-35px";
            if (!secondary) {
                let region = items;
                if (region) {
                    region.style.display = "flex";
                    items = region.parentNode;
                }
            } else {
                secondary.style.marginRight = "10px";
            }

            if (items) {
                let fav_btn_div = document.createElement("div");
                let html = `<div id="fav_btn" class="tw-border-radius-medium tw-c-background-base tw-inline-flex tw-overflow-hidden">
                            <button style="z-index: 1;" class="tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-core-button tw-core-button--secondary tw-full-width tw-inline-flex tw-interactive tw-justify-content-center tw-overflow-hidden tw-relative">
                                <div class="tw-align-items-center tw-core-button-label tw-flex tw-flex-grow-0">
                                    <div class="tw-flex-grow-0">
                                        <div class="tw-align-items-center tw-flex tw-justify-content-center">
                                            <div class="tw-align-items-center tw-flex tw-justify-content-center tw-mg-r-0">
                                                <div class="tw-animation tw-animation--bounce-in tw-animation--duration-long tw-animation--fill-mode-both tw-animation--timing-ease">
                                                    <div class="tw-align-items-center tw-flex tw-justify-content-center">
                                                        <figure class="ScFigure-sc-1j5mt50-0 laJGEQ tw-svg"><svg width="100%"
                                                                height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px"
                                                                class="ScIconSVG-sc-1bgeryd-1 cMQeyU">
                                                                <g>
                                                                    <path fill-rule="evenodd"
                                                                        d="M11.456 8.255L10 5.125l-1.456 3.13-3.49.485 2.552 2.516-.616 3.485L10 13.064l3.01 1.677-.616-3.485 2.553-2.516-3.491-.485zM7.19 6.424l-4.2.583c-.932.13-1.318 1.209-.664 1.853l3.128 3.083-.755 4.272c-.163.92.876 1.603 1.722 1.132L10 15.354l3.579 1.993c.846.47 1.885-.212 1.722-1.132l-.755-4.272 3.128-3.083c.654-.644.268-1.723-.664-1.853l-4.2-.583-1.754-3.77c-.406-.872-1.706-.872-2.112 0L7.19 6.424z"
                                                                        clip-rule="evenodd"></path>
                                                                </g>
                                                            </svg></figure>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>`;
                fav_btn_div.innerHTML = html;
                fav_btn_div.style.maxWidth = "40px";
                fav_btn_div.style.marginRight = marginRight;

                let canal = getCanal();
                favsCookie = getCookie("favoritos");
                if (favsCookie.includes(canal)) {
                    let svg = fav_btn_div.getElementsByTagName("svg")[0];
                    if (svg) {
                        svg.innerHTML = svg_is_fav;
                    }
                }

                fav_btn_div.onclick = function () {//añair/quitar de favs
                    let svg_path = '';
                    let canal = getCanal();
                    favsCookie = getCookie("favoritos");
                    if (favsCookie.includes(canal)) {
                        value = favsCookie.replace("|" + canal, "");
                        svg_path = svg_no_fav;
                    } else {
                        value = favsCookie + "|" + canal;
                        svg_path = svg_is_fav;
                    }

                    let tipo = "menos";
                    let ordenCookie = getCookie("ordenado");
                    if (ordenCookie != "") {
                        let orden = ordenCookie.split("|");
                        if (orden) {
                            tipo = orden[0];
                        }
                    }

                    setCookie("favoritos", value, 2);//2 años
                    ordenar(tipo);

                    let svg = fav_btn_div.getElementsByTagName("svg")[0];
                    if (svg) {
                        svg.innerHTML = svg_path;
                    }
                }

                items.parentNode.insertBefore(fav_btn_div, items);
            }
        }
    }
}

function getCanal() {
    let canal = "";
    let url = window.location.pathname.toLocaleLowerCase().replace("/", "");
    let splited = url.split("/")[0];
    if (splited) canal = splited;
    return canal;
}

//#region cookies
function setCookie(cname, cvalue, year) {
    var d = new Date();
    d.setTime(d.getTime() + (year * 365 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
//#endregion

function addSelect() {
    let is_sel_ord = document.getElementsByClassName("sel_ord")[0];
    if (!is_sel_ord) {//si no existe
        let opciones = document.createElement("div");
        //boton ordenar
        let html = '<button style="width: 60%;" class="sel_ord side-nav-header-text tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-core-button tw-inline-flex tw-interactive tw-justify-content-center tw-overflow-hidden tw-relative tw-select-button"><div class="tw-align-items-center tw-core-button-label tw-core-button-label--dropdown tw-flex tw-flex-grow-1"><div class="tw-flex-grow-1"><div id="select_text" class="tw-align-items-center tw-flex">Ordenar por</div></div><div class="tw-align-items-center tw-flex tw-mg-l-05"><div class="tw-align-items-center tw-core-button-icon tw-inline-flex"><div class="ScIconLayout-sc-1bgeryd-0 kbOjdP tw-icon"><div class="ScAspectRatio-sc-1sw3lwy-1 dNNaBC tw-aspect"><div class="ScAspectSpacer-sc-1sw3lwy-0 gkBhyN"></div><svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" class="ScIconSVG-sc-1bgeryd-1 cMQeyU"><g><path d="M14.5 6.5L10 11 5.5 6.5 4 8l6 6 6-6-1.5-1.5z"></path></g></svg></div></div></div></div></div></button>';
        let svg = svg_no_fav;
        //boton filtrar favs
        html += `<div class="filtro_favs" style="display: inline-block; vertical-align: middle; margin-left: 9px;"><div style="max-width: 40px;"><div id="" class="tw-border-radius-medium tw-c-background-base tw-inline-flex tw-overflow-hidden"> <button style="z-index: 1;" class="tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-core-button tw-core-button--secondary tw-full-width tw-inline-flex tw-interactive tw-justify-content-center tw-overflow-hidden tw-relative"> <div class="tw-align-items-center tw-core-button-label tw-flex tw-flex-grow-0"> <div class="tw-flex-grow-0"> <div class="tw-align-items-center tw-flex tw-justify-content-center"> <div class="tw-align-items-center tw-flex tw-justify-content-center tw-mg-r-0"> <div class="tw-animation tw-animation--bounce-in tw-animation--duration-long tw-animation--fill-mode-both tw-animation--timing-ease"> <div class="tw-align-items-center tw-flex tw-justify-content-center"> <figure class="ScFigure-sc-1j5mt50-0 laJGEQ tw-svg"><svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" class="ScIconSVG-sc-1bgeryd-1 cMQeyU"> ${svg} </svg></figure> </div> </div> </div> </div> </div> </div> </button> </div></div></div>`;
        //desplegable
        html += `<div id="balloon-hide" style="display: none; margin: -7px 0 0 10px;" class="tw-absolute tw-balloon tw-balloon--auto tw-balloon--down tw-balloon--left">
                    <div class="tw-border-radius-large tw-c-background-base tw-c-text-inherit tw-elevation-2">
                        <div class="tw-flex tw-flex-column">
                            <div class="tw-overflow-auto tw-pd-1">
                                <div class="directory-channel-sort-drop-down">
                                    ${addOpcion("Viewers", "menos", svg_opcion_lista, true)}
                                    ${addOpcion("Viewers", "mas", svg_opcion_lista2, false)}
                                    ${addOpcion("Canal", "alfabet", svg_opcion_az, false)}
                                    ${addOpcion("Canal", "tebafla", svg_opcion_za, false)}
                                    ${addOpcion("Juego", "juego", svg_opcion_az, false)}
                                    ${addOpcion("Juego", "ogeuj", svg_opcion_za, false)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
        opciones.innerHTML = html;
        opciones.style.marginTop = "10px";
        opciones.style.marginBottom = "-10px";
        opciones.style.position = "relative";
        opciones.className = "side-nav__overlay-wrapper tw-pd-1";

        let sel_ord = opciones.getElementsByClassName("sel_ord")[0];
        sel_ord.onclick = function () {//ocultar/mostrar opciones
            let balloon_hide = document.getElementById("balloon-hide");
            if (balloon_hide) {
                if (balloon_hide.style.display === "none") {
                    balloon_hide.style.display = "block";
                } else {
                    balloon_hide.style.display = "none";
                }
            }
        }

        let elems = opciones.querySelectorAll("#balloon-hide a");

        elems.forEach(function (el) {
            el.onclick = function () {//al cambiar opción se ordena
                cambiarSelect(el);
                let tipo = el.dataset.orden;
                setCookie("ordenado", tipo + "|" + only_favs, 2);//2 años
            }
        });

        let filtro_favs = opciones.getElementsByClassName("filtro_favs")[0];
        if (filtro_favs) {
            filtro_favs.onclick = function () {//filtrar por favoritos
                only_favs = !only_favs;
                let tipo = "menos";

                let ordenCookie = getCookie("ordenado");
                if (ordenCookie != "") {
                    let orden = ordenCookie.split("|");
                    if (orden) {
                        tipo = orden[0];
                        only_favs = !(orden[1] == "true");
                    }
                }

                let svg = filtro_favs.getElementsByTagName("svg")[0];
                if (svg) {
                    if (only_favs) {
                        svg.innerHTML = svg_is_fav;
                    } else {
                        svg.innerHTML = svg_no_fav;
                    }
                }

                setCookie("ordenado", tipo + "|" + only_favs, 2);//2 años
                ordenar(tipo);
            }
        }

        content.prepend(opciones);

        let collapse = sideNav.getElementsByClassName("collapse-toggle")[0];
        if (collapse) {
            collapse.setAttribute("style", "padding-top: 15px !important;");
        }
    }
}

function addOpcion(nombre, tipo, svg, estaSeleccionado) {
    let seleccionado = '';
    let clase = '';
    if (estaSeleccionado) {
        seleccionado = `<div id="este" class="tw-align-items-center tw-flex tw-flex-shrink-0 tw-mg-l-2">
                        <div class="ScIconLayout-sc-1bgeryd-0 cFCmuf tw-icon">
                            <div class="ScAspectRatio-sc-1sw3lwy-1 dNNaBC tw-aspect">
                                <div class="ScAspectSpacer-sc-1sw3lwy-0 gkBhyN"></div>
                                <svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" class="ScIconSVG-sc-1bgeryd-1 cMQeyU">
                                    <g> <path d="M4 10l5 5 8-8-1.5-1.5L9 12 5.5 8.5 4 10z"></path> </g>
                                </svg>
                            </div>
                        </div>
                    </div>`;
        clase = 'tw-interactable--selected ';
    }

    return `<div class="tw-full-width tw-relative">
                <a style="cursor: pointer;" data-orden="${tipo}" class="tw-block tw-border-radius-medium tw-full-width tw-interactable tw-interactable--default tw-interactable--hover-enabled tw-interactive ${clase}">
                    <div class="tw-align-items-center tw-flex tw-pd-05 tw-relative">
                        <div class="tw-align-items-center tw-flex tw-flex-shrink-0 tw-pd-r-05">
                            <div class="tw-align-items-center tw-drop-down-menu-item-figure tw-flex">
                                <div class="ScIconLayout-sc-1bgeryd-0 cFCmuf tw-icon">
                                    <div class="ScAspectRatio-sc-1sw3lwy-1 dNNaBC tw-aspect">
                                        <div class="ScAspectSpacer-sc-1sw3lwy-0 gkBhyN"></div>
                                        ${svg}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tw-flex-grow-1">
                            <div class="tw-flex">
                                <div class="tw-flex-grow-1">${nombre}</div>
                            </div>
                        </div>
                        ${seleccionado}
                    </div>
                </a>
            </div>`;
}

function addFavList(el) {
    let fav_list = document.getElementById("fav_list");
    if (!fav_list && only_favs) {
        let vacia = false;
        let followed = sideNav.getElementsByTagName("h5")[0];
        if (followed) {
            followed.innerText = "Canales favoritos";
        }
        let followed_section = sideNav.getElementsByClassName("side-nav-section")[0];
        if (followed_section) {
            followed_text = followed_section.ariaLabel;
            let name_primer = getName(followed_section);
            vacia = !(favsCookie.includes(name_primer));
        }

        let ninguno_txt = 'No hay ningún canal favorito en directo';
        let ninguno = 'display: none;';
        if (favsCookie == "" || vacia) {
            ninguno = 'display: block;';
            if (favsCookie == "") ninguno_txt = 'No has añadido ningún canal a favoritos';
        }
        let html = `<div id="fav_list">
                        <div id="ninguno" style="${ninguno} padding-left: 20px;" class="side-nav-header-text tw-c-text-alt-2 tw-font-size-6">${ninguno_txt}</div>
                        <h5 style="padding: 1rem 0 0 0;" class="tw-font-size-6 tw-semibold tw-upcase side-nav-header-text tw-mg-1 tw-pd-t-05">${followed_text}</h5>
                    </div>`;

        el.outerHTML = html + el.outerHTML;
    }
}

function removeFavList() {
    let fav_list = document.getElementById("fav_list");
    if (fav_list) {
        fav_list.remove();
        let followed = sideNav.getElementsByTagName("h5")[0];
        if (followed) {
            followed.innerText = followed_text;
        }
    }
}

function cambiarSelect(el) {
    let balloon_hide = document.getElementById("balloon-hide");
    if (balloon_hide) {
        let selected = balloon_hide.getElementsByClassName("tw-interactable--selected")[0];
        if (selected) {
            if (selected.dataset.orden != el.dataset.orden) {//si no está ordenado con la misma opcion
                selected.classList.remove("tw-interactable--selected");

                let select_text = document.getElementById("select_text");
                select_text.innerHTML = el.innerHTML;

                el.classList.add("tw-interactable--selected");
                let este = document.getElementById("este");
                let aqui = el.getElementsByClassName("tw-relative")[0];
                if (este && aqui) {
                    aqui.appendChild(este);//cambia el ✔
                }

                let tipo = el.dataset.orden;

                ordenar(tipo);
            }
        }
        balloon_hide.style.display = "none";
    }
}

function ordenar(tipo) {
    let click_max = 10;
    if (!sideNav) return false;
    let grup = sideNav.getElementsByClassName('tw-transition-group')[0];
    if (!grup) return false;
    let cargar = sideNav.getElementsByClassName('side-nav-show-more-toggle__button')[0];
    let btns;
    if (cargar) {//muestra todos los canales online
        btns = cargar.getElementsByTagName('button');
        if (btns) {
            let btnMas = btns[0];
            if (btnMas) {
                let clicks = 0;
                while (!grup.innerHTML.includes("offline") && clicks < click_max) {
                    btnMas.click();//botón Mostrar más
                    clicks++;
                }
            }
        }
    }

    removeFavList();
    favsCookie = getCookie("favoritos");
    ordenando = true;

    let toSort = Array.prototype.slice.call(grup.children, 0);

    //#region tipos
    if (tipo == "menos") {//9->0
        toSort.sort(views2);
    }

    if (tipo == "mas") {//0->9
        toSort.sort(views);
    }

    if (tipo == "alfabet") {//A->Z
        toSort.sort(alfabet);
    }

    if (tipo == "tebafla") {//Z->A
        toSort.sort(tebafla);
    }

    if (tipo == "juego") {//A->Z
        toSort.sort(juego);
    }

    if (tipo == "ogeuj") {//Z->A
        toSort.sort(juego2);
    }
    //#endregion

    grup.innerHTML = "";//borra toda la lista

    let fav_list_added = false;
    for (let i = 0, l = toSort.length; i < l; i++) {//añade los canels ordenados en la lista
        let newChild = toSort[i];
        newChild.getElementsByTagName("a")[0].dataset.aId = "followed-channel-" + i;
        grup.appendChild(newChild);

        if (!fav_list_added && !isFav(newChild)) {
            fav_list_added = true;
            addFavList(newChild);
        }

        if (i == l - 1) {
            ordenando = false;
        }
    }
}

//#region funciones ordenar
function alfabet(a, b) {
    let reverse = false;
    return ordAlfabet(a, b, reverse)
}

function tebafla(a, b) {
    let reverse = true;
    return ordAlfabet(a, b, reverse)
}

function ordAlfabet(a, b, reverse) {
    let res = descarta(a, b);
    if (res != 200) return res;

    let aord = getName(a);
    let bord = getName(b);
    let comp = aord.localeCompare(bord);
    if (reverse) comp *= -1;
    return comp;
}

function views(a, b) {
    let reverse = false;
    return ordViews(a, b, reverse)
}

function views2(a, b) {
    let reverse = true;
    return ordViews(a, b, reverse)
}

function ordViews(a, b, reverse) {
    let res = descarta(a, b);
    if (res != 200) return res;

    let aord = viewsToNum(a);
    let bord = viewsToNum(b);
    let comp = (aord - bord);
    if (reverse) comp *= -1;
    return comp;
}

function juego(a, b) {
    let reverse = false;
    return ordJuego(a, b, reverse)
}

function juego2(a, b) {
    let reverse = true;
    return ordJuego(a, b, reverse)
}

function ordJuego(a, b, reverse) {
    let res = descarta(a, b);
    if (res != 200) return res;

    let aord = getGame(a);
    let bord = getGame(b);
    let comp = aord.localeCompare(bord);
    if (reverse) comp *= -1;
    return comp;
}

function viewsToNum(v) {//convierte el texto de los viewers a numero
    let txt = v.getElementsByClassName('tw-c-text-alt')[1].innerText.replace(/\./g, "");
    if (txt.includes("K")) {//mil views
        txt = txt.replace("K", "") + "000";
    }
    let ord = txt * 1;
    return ord;
}

function descarta(a, b) {//descarta ordenar si no existe, si está offline o modo solo favs
    if (!a || !b) return 0;
    if (!a.innerHTML.includes("tw-channel-status-indicator--live")) return 1;
    if (!b.innerHTML.includes("tw-channel-status-indicator--live")) return -1;

    if (only_favs) {
        if (!isFav(a)) return 1;
        if (!isFav(b)) return -1;
    }
    return 200;
}

function isFav(a) {
    let name = getName(a);
    return (favsCookie.includes(name));
}

function getName(a) {
    let name = a.getElementsByClassName('tw-c-text-alt')[0].innerText.toLocaleLowerCase();
    return name;
}

function getGame(a) {
    let game = a.getElementsByClassName('tw-c-text-alt-2')[0].innerText.toLocaleLowerCase();
    return game;
}
//#endregion