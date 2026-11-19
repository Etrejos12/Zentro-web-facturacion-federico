# Zentro · Facturación Federico

Panel web para Federico Arango V., médico veterinario. HTML, CSS y JavaScript plano con Supabase para el inicio de sesión.

## Estructura

```
index.html                 Inicio de sesión
dashboard_home.html        Resumen (inicio)
dashboard_clientes.html    Listado de clientes
assets/                    Imágenes (logo)
css/style.css              Estilos base, login y dashboard
css/responsive.css         Ajustes para tablet y celular (se carga después de style.css)
js/supabase.js             Conexión con Supabase
js/login.js                Lógica del login
js/responsive.js           Menú hamburguesa y tabla en tarjetas para celular
package.json               Dependencias (solo para desarrollo)
```

## Cómo verlo

Es un sitio estático. Hay que servirlo por HTTP (no abrirlo con doble clic), porque los scripts usan módulos:

```
python -m http.server 8000
```

y abrir <http://localhost:8000>.

## Pendiente

- `dashboard_facturacion.html` y `dashboard_configuracion.html`: el menú ya los enlaza, pero las páginas aún no existen.
- `js/dashboard.js`: lo cargan las dos páginas del dashboard, pero todavía no está en el repositorio.
