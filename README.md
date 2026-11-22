# lautarowaltersdorf.com

Sitio de Lautaro Waltersdorf: páginas web para negocios. HTML, CSS y JS estático, sin build.

## Agregar un video a un trabajo

Cada trabajo tiene un espacio para video. Subí a `videos/`:

- `electrodel.webm` y `electrodel-poster.jpg`
- `emma.webm` y `emma-poster.jpg`
- `cars-3d.webm` y `cars-3d-poster.jpg` (ya están)

Si el archivo no existe, se muestra un recuadro "Video próximamente". Al subirlo, aparece solo.
Para que también cargue el poster, agregá `poster="videos/<nombre>-poster.jpg"` al `<video>` correspondiente en `index.html`.
