# Publicar el sitio (3 páginas)

Sitio **100% estático**, mismo nivel de carpeta:

| Archivo | Contenido |
|---------|-----------|
| `index.html` | Sobre mí, automatización hoy, experiencia laboral, CV PDF + competencias |
| `proyectos.html` | Detalle de proyectos, diagramas SVG, huecos para capturas |
| `contacto.html` | Valor para negocios, proceso, servicios, contacto |
| `styles.css` · `app.js` | Estilos compartidos e idioma ES/EN |
| `img/` | Diagramas (`diagram-*.svg`) y opcional `financiero.png`, `selvato.png` |
| `cv/` | PDF exportados desde Word (`Federico-Arango-CV-ES.pdf`, `…-EN.pdf`) |

No hace falta Node para verlo.

## Vista local

```powershell
cd d:\CLAUDE\perfil-profesional\site
python -m http.server 8080
```

Abre http://localhost:8080 — navega entre páginas por el menú.

*(Abrir solo `index.html` por doble clic también funciona si todos los archivos están en la misma carpeta `site/`.)*

## GitHub Pages

1. Repo nuevo (ej. `federico-arango-portfolio`).
2. Sube **todo** el contenido de `site/` a la raíz del repo (o a `/docs`).
3. **Settings → Pages**: rama `main`, carpeta `/ (root)` o `/docs`.
4. URL típica: `https://TU-USUARIO.github.io/federico-arango-portfolio/`.

Rutas entre páginas son relativas (`proyectos.html`, `contacto.html`): no requieren cambios si la web está en la raíz del sitio publicado.

## Cloudflare Pages / Netlify / Vercel

Directorio de publicación = carpeta `site` (o la raíz del repo si solo contiene `site/`).

## Antes de publicar

- Coloca los PDF del CV en `cv/` (ver `cv/README.txt`).
- Opcional: `img/financiero.png` y `img/selvato.png` para sustituir los placeholders.
- En `contacto.html`, enlaces **LinkedIn** / **GitHub**: sustituye `#` por tus URLs.
- Opcional: `favicon.ico` + `<link rel="icon" href="favicon.ico" />` en cada página.
