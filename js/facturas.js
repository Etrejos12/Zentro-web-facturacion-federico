// Página de facturación: pestañas, búsqueda y filtros.

// ---------- Pestañas ----------
const tabs = [...document.querySelectorAll('.tab')]
const paneles = [...document.querySelectorAll('[role="tabpanel"]')]

function activarTab(tab, darFoco = false) {
    tabs.forEach((t) => {
        const activa = t === tab
        t.setAttribute('aria-selected', activa)
        t.tabIndex = activa ? 0 : -1
    })
    paneles.forEach((p) => {
        p.hidden = p.id !== tab.getAttribute('aria-controls')
    })
    if (darFoco) tab.focus()
}

tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activarTab(tab))

    // Flechas izquierda/derecha cambian de pestaña
    tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') activarTab(tabs[(i + 1) % tabs.length], true)
        if (e.key === 'ArrowLeft') activarTab(tabs[(i - 1 + tabs.length) % tabs.length], true)
    })
})

// Botones y enlaces que abren una pestaña concreta
document.querySelectorAll('[data-abrir-tab]').forEach((el) => {
    el.addEventListener('click', (e) => {
        e.preventDefault()
        activarTab(document.getElementById(el.dataset.abrirTab))
    })
})

// ---------- Buscar y filtrar facturas ----------
const filas = [...document.querySelectorAll('#tablaFacturas tbody tr')]
const buscar = document.getElementById('buscarFactura')
const filtroEstado = document.getElementById('filtroEstado')
const sinResultados = document.getElementById('sinResultados')

function filtrar() {
    const texto = buscar.value.toLowerCase().trim()
    const estado = filtroEstado.value
    let visibles = 0

    filas.forEach((fila) => {
        const coincideTexto = fila.textContent.toLowerCase().includes(texto)
        const coincideEstado = estado === 'todos' || fila.dataset.estado === estado
        const mostrar = coincideTexto && coincideEstado

        fila.hidden = !mostrar
        if (mostrar) visibles++
    })

    sinResultados.hidden = visibles > 0
}

buscar.addEventListener('input', filtrar)

document.getElementById('formFiltros').addEventListener('submit', (e) => {
    e.preventDefault()
    filtrar()
})

// ---------- Descargar PDF ----------
// window.print() abre el diálogo de impresión; el CSS (@media print en factura.css)
// deja solo la hoja de la factura. Se elige "Guardar como PDF" como destino.
document.getElementById('btnPdf').addEventListener('click', () => {
    window.print()

})

// ---------- Cerrar sesión ----------
document.getElementById('btnSalir').addEventListener('click', () => {
    // Pendiente: aquí va el cierre de sesión real de Supabase (auth.signOut())
    window.location.href = 'index.html'
})
