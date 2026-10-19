# ClimatPro · Landing Page

Plantilla HTML lista para usar de una **empresa de climatización** (HVAC) completa con 10 pantallas, animaciones, datos mockeados y formulario funcional.

## Características

- ✅ **10 pantallas HTML independientes**
- ✅ **Tailwind CSS** vía CDN (sin build step)
- ✅ **JavaScript nativo** (sin frameworks)
- ✅ **Animaciones** con AOS (Animate On Scroll)
- ✅ **Formulario de contacto** con validación y simulación de envío
- ✅ **Galería con lightbox** y filtros por categoría
- ✅ **Lightbox** navegable con teclado (← → ESC)
- ✅ **Navbar sticky** con menú mobile
- ✅ **Botón flotante de WhatsApp** en todas las páginas
- ✅ **Imágenes Unsplash** listas
- ✅ **100% responsive** mobile-first
- ✅ **SEO básico** (meta, OG, theme-color)

## Estructura

```
climatizacion-landing/
├── index.html              Inicio (hero, servicios, talleres, testimonios)
├── nosotros.html           Sobre nosotros (misión, historia, equipo)
├── servicios.html          8 servicios detallados
├── precios.html            3 planes + servicios individuales + FAQ
├── galeria.html            Galería con filtros + lightbox
├── clases.html             Horario de talleres/capacitaciones (tabs por día)
├── contacto.html           Form + mapa + horarios + redes
├── privacidad.html         Política de privacidad
├── terminos.html           Términos y condiciones
├── 404.html                Página de error
├── assets/
│   ├── css/
│   │   └── styles.css      Estilos personalizados sobre Tailwind
│   ├── js/
│   │   ├── main.js         Init AOS, año, smooth scroll, toasts
│   │   ├── navbar.js       Navbar móvil + scroll effect + active link
│   │   ├── gallery.js      Filtros + lightbox con teclado
│   │   ├── contact.js      Validación form + mock submit
│   │   └── schedule.js     Tabs por día + filtros de nivel
│   └── img/
│       └── logo.svg        Logo ClimatPro (SVG)
└── README.md               Este archivo
```

## Uso

### Instalación

1. Copiá la carpeta `climatizacion-landing/` donde quieras
2. Abrí `index.html` en cualquier navegador moderno
3. **No requiere build, npm, ni servidor**

### Personalización rápida

**Cambiar nombre de la marca** (buscar y reemplazar `ClimatPro`):
- 10 archivos HTML
- `assets/img/logo.svg`

**Cambiar colores** (paleta en cada HTML, dentro de `tailwind.config`):
```js
colors: {
  brand: { 500: '#3b82f6', 700: '#1d4ed8', 900: '#1e3a8a', ... },
  accent: { 400: '#22d3ee', 500: '#06b6d4', ... }
}
```

**Cambiar información de contacto** (buscar):
- `+56 2 2896 5400` (teléfono)
- `contacto@climatpro.cl` (email)
- `Av. Apoquindo 4711, Las Condes, Santiago` (dirección)

**Cambiar imágenes**: editá las URLs `https://images.unsplash.com/...` en cada archivo HTML. Buscá en [unsplash.com](https://unsplash.com) con keywords como `hvac`, `air-conditioner`, `technician`.

## Stack técnico

| Recurso       | URL                                                    |
| ------------ | ----------------------------------------------------- |
| Tailwind     | `https://cdn.tailwindcss.com`                         |
| AOS          | `https://unpkg.com/aos@2.3.1/dist/aos.css` + `.js`    |
| Google Fonts | `Inter` + `Poppins`                                   |
| Imágenes     | `images.unsplash.com`                                 |

## Páginas

| Página          | Ruta                | Descripción                                        |
| --------------- | ------------------- | -------------------------------------------------- |
| Inicio          | `index.html`        | Hero + servicios destacados + talleres + testimonios |
| Sobre nosotros  | `nosotros.html`     | Misión, historia (timeline), equipo, certificaciones |
| Servicios       | `servicios.html`    | 8 servicios detallados con imágenes y bullets       |
| Precios         | `precios.html`      | 3 planes + tabla de servicios individuales + FAQ     |
| Galería         | `galeria.html`      | Grid + filtros + lightbox navegable con teclado     |
| Clases          | `clases.html`       | Horario semanal + tabs por día + filtro por nivel   |
| Contacto        | `contacto.html`     | Form completo + mapa + info de contacto + redes     |
| Privacidad      | `privacidad.html`   | Texto legal con secciones estándar                  |
| Términos        | `terminos.html`     | Texto legal con secciones estándar                  |
| 404             | `404.html`          | Página de error amigable                            |

## Datos mock incluidos

- Servicios: 8 items
- Planes: 3 (Hogar / Empresa / Planta)
- Equipo: 4 miembros
- Testimonios: 3 clientes
- Galería: 16 proyectos en 5 categorías
- Talleres: 9 cursos en 6 días
- Certificaciones: 6 marcas
- Estadísticas: 4+4 KPIs
- FAQs: 4 preguntas

## Limitaciones / Notas

- El formulario **simula** el envío (no hay backend). Conectá a tu API editando `assets/js/contact.js`.
- Las URLs de imágenes apuntan a Unsplash. Algunas pueden ser reemplazadas si dejás de funcionar.
- Los textos legales (privacidad y términos) son **modelos de referencia**. Deben ser revisados por un profesional legal antes de uso comercial.
- El mapa usa un iframe genérico de Google Maps apuntando a Santiago de Chile.

## Compatibilidad

Probado en navegadores modernos: Chrome 100+, Firefox 100+, Safari 15+, Edge 100+.

## Licencia

Template creado para **Tecnodesa · Templates Market**. Uso libre para proyectos comerciales y personales.