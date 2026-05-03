# Perfil profesional — materiales CV / freelance

Aquí están los textos en Markdown que complementan tus Word actualizados en `d:\CLAUDE\`.

| Archivo | Contenido |
|---------|-----------|
| [`01-bloque-cv-y-portafolio.md`](01-bloque-cv-y-portafolio.md) | Bloque portafolio ES/EN, frases cortas, texto LinkedIn |
| [`02-perfil-freelance-automatizador.md`](02-perfil-freelance-automatizador.md) | Propuesta freelance |
| [`03-mejoras-por-producto.md`](03-mejoras-por-producto.md) | Priorización de mejoras |
| [`04-oferta-y-ejemplos-contador.md`](04-oferta-y-ejemplos-contador.md) | Pitch contadores + ideas |
| [`05-visibilidad-checklist.md`](05-visibilidad-checklist.md) | Dónde publicar |

## Sitio web del portafolio

Carpeta **[`site/`](site/)** — sitio estático **multipágina** (HTML/CSS/JS), bilingüe ES/EN:

- **`index.html`** — sobre mí, qué haces en automatización, experiencia laboral, CV descargable y competencias  
- **`proyectos.html`** — proyectos con diagramas SVG y huecos para capturas  
- **`contacto.html`** — cómo ayudas al negocio, proceso, servicios y contacto  

Instrucciones en [`site/DESPLIEGUE.md`](site/DESPLIEGUE.md).

## Word (CV empresa)

Los archivos **`Hoja de vida Federico Arango2026.docx`** y **`Federico_Arango_CV_2pages.docx`** viven en la carpeta padre `d:\CLAUDE\`. El script [`update_word_cvs.py`](update_word_cvs.py) puede volver a aplicarse de forma segura: **no duplica** la sección de portafolio si ya existe ni la frase del perfil si ya está presente.

```powershell
python d:\CLAUDE\perfil-profesional\update_word_cvs.py
```
