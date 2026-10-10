# STEAMLab · Física universitaria · Recorrido por el flujo electromagnético

## Propósito
Laboratorio didáctico de **flujo eléctrico** y ley de Gauss en superficies cerradas, sección 1.3.2 del Cuaderno 09. **No** es un simulador completo de electromagnetismo dinámico: representa un campo electrostático ideal de carga puntual y aplica analíticamente la ley de Gauss.

## Publicación en GitHub Pages
1. Crear un repositorio público nuevo `steamlab-fisica-rv`.
2. Subir los archivos `index.html`, `estilo.css`, `laboratorio.js` y `README.md` a la raíz.
3. En `Settings → Pages`: `Deploy from a branch`, rama `main`, carpeta `/(root)`.
4. Abrir `https://TU-USUARIO.github.io/steamlab-fisica-rv/`.
5. Requiere conexión a internet para cargar A-Frame desde su CDN.

## Con y sin visores
- **Sin visor:** computadora (arrastrar para girar y WASD para moverse), teléfono (arrastrar para orientar; la interfaz conserva controles). El laboratorio funciona como exploración 3D no inmersiva.
- **Con visor WebXR:** abrir la URL en el **navegador integrado del visor** (por ejemplo, Quest Browser), pulsar el botón `VR` de la escena y seguir las indicaciones del navegador. Se admiten controles del visor con `laser-controls` cuando están disponibles. **No todos los teléfonos/Cardboard permiten entrar en VR WebXR**. Si no aparece el botón VR o indica incompatibilidad, sigue usando el modo 3D. No se incluye modo estereoscópico Cardboard garantizado.

## Misiones sugeridas
1. Esfera centrada, Q=+1 nC: predecir signo, calcular flujo neto y compararlo con valor mostrado.
2. Cambiar radio: justificar por qué el flujo permanece constante para carga encerrada idéntica.
3. Sustituir esfera por cubo: explicar la invariancia del flujo total, aunque la distribución de E·n cambie.
4. Esfera desplazada: mover el centro hasta dejar la carga fuera; determinar flujo neto y distinguirlo de campo local no nulo.
5. Cambiar carga positiva por negativa y después nula: interpretar signo del flujo.

Ley de Gauss: Φ_E = ∯_S E·dA = Q_enc/ε0. Se usa ε0 = 8.8541878128 × 10^-12 F/m. Carga puntual en origen; radios/semilados y distancia expresados en metros. En la posición donde la carga queda exactamente sobre la superficie la interfaz trata el flujo como **no encerrado**; esta situación límite es singular y no debe analizarse usando la misma expresión regular sin aclaración.

## Accesibilidad y seguridad
Sin montaje de alto voltaje. Sesiones de visores breves, supervisadas y optativas; despejar el área física. Alternativa 3D y esquemas de papel. Los colores y flechas son representaciones y no hilos físicos.

## Estado
Proyecto preparado para pruebas de navegador. No se ha probado en el hardware VR concreto del usuario. El visualizador refleja un modelo ideal, sin medición real.
