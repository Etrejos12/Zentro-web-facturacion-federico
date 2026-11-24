// Responsive del dashboard.
// No hace falta tocar el HTML: este script
//  1) crea el botón ☰, la capa oscura y el botón de cerrar del menú, y
//  2) etiqueta las celdas de las tablas para que en celular se vean como tarjetas.
// En páginas sin sidebar ni tablas (como el login) no hace nada.

const sidebar = document.querySelector('.sidebar')
const topbar = document.querySelector('.topbar')

if (sidebar && topbar) {
    iniciarMenu()
}

etiquetarTablas()

// Copia el título de cada columna (<th>) en un atributo data-label de sus celdas.
// El CSS lo muestra con ::before cuando la tabla se convierte en tarjetas.
// Un MutationObserver vuelve a etiquetar si luego se agregan filas desde la base de datos.
function etiquetarTablas() {
    document.querySelectorAll('.tabla').forEach((tabla) => {
        const titulos = [...tabla.querySelectorAll('thead th')].map((th) => th.textContent.trim())
        const cuerpo = tabla.querySelector('tbody')
        if (!cuerpo) return

        const etiquetar = () => {
            cuerpo.querySelectorAll('tr').forEach((fila) => {
                [...fila.children].forEach((celda, i) => {
                    if (titulos[i] && !celda.hasAttribute('data-label')) {
                        celda.setAttribute('data-label', titulos[i])
                    }
                })
            })
        }

        etiquetar()
        new MutationObserver(etiquetar).observe(cuerpo, { childList: true })
    })
}

function iniciarMenu() {
    if (!sidebar.id) sidebar.id = 'sidebar'

    // Iconos en SVG propio (así no dependemos de que Lucide haya cargado)
    const iconoMenu =
        '<svg class="ico-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
        'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/>' +
        '<line x1="4" y1="18" x2="20" y2="18"/></svg>'

    const iconoCerrar =
        '<svg class="ico-cerrar" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
        'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>'

    // Botón ☰ dentro de la barra superior, agrupado con el título
    const btnMenu = document.createElement('button')
    btnMenu.type = 'button'
    btnMenu.className = 'btn-menu'
    btnMenu.setAttribute('aria-label', 'Abrir menú')
    btnMenu.setAttribute('aria-expanded', 'false')
    btnMenu.setAttribute('aria-controls', sidebar.id)
    btnMenu.innerHTML = iconoMenu + iconoCerrar

    // Si el h1 vive dentro de un contenedor (título + subtítulo), se mueve el contenedor entero
    const h1 = topbar.querySelector('h1')
    const titulo = h1 && h1.parentElement !== topbar ? h1.parentElement : h1
    const grupoIzquierdo = document.createElement('div')
    grupoIzquierdo.className = 'topbar-izq'
    topbar.insertBefore(grupoIzquierdo, topbar.firstChild)
    grupoIzquierdo.append(btnMenu)
    if (titulo) grupoIzquierdo.append(titulo)

    // Botón "X" dentro del propio menú
    const btnCerrar = document.createElement('button')
    btnCerrar.type = 'button'
    btnCerrar.className = 'sidebar-cerrar'
    btnCerrar.setAttribute('aria-label', 'Cerrar menú')
    btnCerrar.innerHTML = iconoCerrar.replace('class="ico-cerrar"', '')

    const cabecera = sidebar.querySelector('.header-menu')
    if (cabecera) {
        cabecera.append(btnCerrar)
    } else {
        sidebar.prepend(btnCerrar)
    }

    // Capa oscura detrás del menú
    const overlay = document.createElement('div')
    overlay.className = 'menu-overlay'
    document.body.append(overlay)

    const esEscritorio = window.matchMedia('(min-width: 901px)')

    function estaAbierto() {
        return sidebar.classList.contains('abierto')
    }

    function abrir() {
        sidebar.classList.add('abierto')
        overlay.classList.add('visible')
        document.body.classList.add('menu-abierto')
        btnMenu.setAttribute('aria-expanded', 'true')
        btnMenu.setAttribute('aria-label', 'Cerrar menú')
        btnCerrar.focus({ preventScroll: true })
    }

    function cerrar() {
        const teniaFoco = sidebar.contains(document.activeElement)
        sidebar.classList.remove('abierto')
        overlay.classList.remove('visible')
        document.body.classList.remove('menu-abierto')
        btnMenu.setAttribute('aria-expanded', 'false')
        btnMenu.setAttribute('aria-label', 'Abrir menú')
        if (teniaFoco) btnMenu.focus({ preventScroll: true })
    }

    btnMenu.addEventListener('click', () => (estaAbierto() ? cerrar() : abrir()))
    btnCerrar.addEventListener('click', cerrar)
    overlay.addEventListener('click', cerrar)

    // Al tocar un enlace del menú, se cierra
    sidebar.addEventListener('click', (e) => {
        if (e.target.closest('a')) cerrar()
    })

    // Esc cierra el menú
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && estaAbierto()) cerrar()
    })

    // Si la ventana pasa a escritorio, se limpia el estado
    esEscritorio.addEventListener('change', (e) => {
        if (e.matches) cerrar()
    })

    // Al volver con el botón "atrás" el menú no debe quedar abierto
    window.addEventListener('pageshow', cerrar)
}
