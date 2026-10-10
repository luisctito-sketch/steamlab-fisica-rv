# STEAMLab Física RV V3 · modo visor horizontal

Publica los cinco archivos de este ZIP directamente en la raíz del repositorio `steamlab-fisica-rv`.

- `index.html`: laboratorio 3D tradicional, conservado de la V2; agrega enlace al modo visor.
- `visor-cardboard.html`: NUEVA página de pantalla estereoscópica horizontal para visores económicos tipo Cardboard. Renderiza la misma idea física (esfera gaussiana, carga puntual y líneas de campo), pero como demostración simplificada, no incluye los controles avanzados del laboratorio 3D.
- `estilo.css`: mejora el enlace al modo visor.
- `laboratorio.js`: lógica existente de V2, sin modificaciones.

## Uso en celular

1. Abre https://luisctito-sketch.github.io/steamlab-fisica-rv/visor-cardboard.html
2. Activa la rotación automática de Android. Abre en Chrome o un navegador que permita orientación y pantalla completa.
3. Toca **Iniciar pantalla dividida**. Gira el celular a horizontal si no gira automáticamente.
4. Introduce el teléfono en un visor tipo Cardboard. Verás dos imágenes correspondientes a dos ojos.
5. Con sensores habilitados puedes intentar mover la cabeza; si el navegador no expone el sensor, arrastra con el dedo antes de colocar el móvil en el visor. También puedes recentrar.

## Limitaciones

El modo Cardboard es estereoscópico sin exigir WebXR. La rotación automática y el sensor de orientación pueden no funcionar en todos los navegadores/teléfonos. No equivale a RV 6DoF ni ofrece seguimiento posicional; tampoco tiene calibración IPD específica de cada visor. La pantalla dividida y el sensor deben probarse en el teléfono del usuario. Usa sesiones breves y si genera mareos suspende la actividad. No se ha probado aquí en el visor físico del usuario.
