
# Design System - Clínica Horizonte

## 1. Identidad visual

**Nombre:** Clínica Horizonte  
**Sector:** Sanitario  
**Tipo de aplicación:** Portal web ficticio para el registro y autenticación de pacientes.

### Estilo visual

La identidad visual de Clínica Horizonte debe transmitir profesionalidad, confianza, tranquilidad y cercanía. Se utilizará una estética moderna, limpia y minimalista, evitando elementos visuales innecesarios.

La interfaz debe ser intuitiva y facilitar que cualquier persona pueda completar los formularios de registro e inicio de sesión sin dificultades.

### Paleta de colores

| Elemento | Color | Código hexadecimal |
|---|---|---|
| Color principal | Azul oscuro | #173B57 |
| Color secundario | Turquesa | #249D9A |
| Fondo general | Gris azulado claro | #F3F7FA |
| Superficies y tarjetas | Blanco | #FFFFFF |
| Texto principal | Gris oscuro | #333333 |
| Texto secundario | Gris azulado | #667985 |
| Bordes | Gris claro | #E0E0E0 |
| Error | Rojo | #D32F2F |
| Fondo de error | Rojo claro | #FFEBEE |
| Éxito | Verde | #388E3C |
| Fondo de éxito | Verde claro | #E8F5E9 |
| Información | Azul | #1976D2 |
| Fondo informativo | Azul claro | #E3F2FD |

El azul oscuro será el color predominante de la interfaz. El turquesa se utilizará para destacar acciones, elementos interactivos y detalles visuales.

Los colores de texto y fondo deberán combinarse de manera que faciliten la lectura y mantengan un contraste adecuado.

---

## 2. Tipografía y jerarquía visual

Se utilizará una tipografía sans-serif moderna, priorizando Inter, Roboto o Helvetica Neue.

La tipografía deberá ser legible y mantener una jerarquía visual clara.

### Jerarquía tipográfica

| Elemento | Tamaño | Peso | Color |
|---|---|---|---|
| Título principal (H1) | 40 px | 700 | #173B57 |
| Título secundario (H2) | 30 px | 600 | #173B57 |
| Subtítulo (H3) | 22 px | 500 | #249D9A |
| Texto normal | 16 px | 400 | #333333 |
| Etiquetas | 14 px | 500 | #333333 |
| Placeholder | 16 px | 400 | #667985 |
| Mensaje de error | 14 px | 500 | #D32F2F |
| Mensaje de éxito | 14 px | 500 | #388E3C |
| Texto auxiliar | 13 px | 400 | #667985 |

### Adaptación tipográfica

En dispositivos móviles se reducirán los tamaños de los títulos para evitar que ocupen demasiado espacio.

- H1: 30 px.
- H2: 24 px.
- H3: 20 px.
- Texto normal: 16 px.

---

## 3. Espaciado y dimensiones

Se utilizará una escala de espaciado común para mantener la coherencia entre los diferentes componentes.

### Escala de espaciado

| Nivel | Valor | Uso |
|---|---|---|
| XS | 4 px | Separaciones mínimas |
| S | 8 px | Separación entre elementos relacionados |
| M | 16 px | Separación entre campos |
| L | 24 px | Separación entre bloques |
| XL | 32 px | Separación entre secciones |
| XXL | 48 px | Márgenes y espacios principales |

### Dimensiones de los componentes

- Altura mínima de los campos: 48 px.
- Altura mínima de los botones: 48 px.
- Ancho de los formularios: máximo 520 px.
- Separación entre campos: 16 px.
- Separación entre secciones: 32 px.
- Padding interior de las tarjetas: 32 px.
- Padding de los campos: 12 px 16 px.

Los formularios deberán mantener una distribución equilibrada y evitar que los campos queden demasiado juntos.

---

## 4. Bordes, radios y sombras

Se utilizarán bordes suaves y esquinas redondeadas para conseguir una apariencia moderna.

### Radios de borde

| Elemento | Radio |
|---|---|
| Campos de formulario | 8 px |
| Botones | 8 px |
| Tarjetas | 12 px |
| Mensajes | 8 px |
| Elementos pequeños | 4 px |

### Sombras

Las tarjetas principales tendrán una sombra ligera que permita diferenciarlas del fondo.

Las sombras deberán ser discretas, evitando contrastes excesivos.

Ejemplo de sombra:

`0 4px 16px rgba(23, 59, 87, 0.08)`

---

## 5. Componentes de la interfaz

### 5.1. Campos de formulario

Los campos deberán presentar una apariencia limpia y uniforme.

Características:

- Etiquetas situadas encima de cada campo.
- Etiquetas alineadas a la izquierda.
- Altura mínima de 48 px.
- Ancho del 100 % del contenedor.
- Fondo blanco.
- Borde de 1 px sólido #E0E0E0.
- Radio de 8 px.
- Padding interior de 12 px 16 px.
- Placeholder de color #667985.

En escritorio, los campos podrán organizarse en dos columnas cuando su contenido lo permita. En móvil ocuparán todo el ancho disponible.

### 5.2. Botones principales

Los botones principales se utilizarán para las acciones más importantes, como registrarse o iniciar sesión.

Características:

- Fondo #173B57.
- Texto blanco.
- Sin borde visible.
- Radio de 8 px.
- Padding de 12 px 24 px.
- Altura mínima de 48 px.
- Peso tipográfico 600.
- Cursor pointer.

**Hover:**
- Fondo #249D9A.
- Transición suave.
- Sombra ligera.

### 5.3. Botones secundarios

Se utilizarán para acciones complementarias.

Características:

- Fondo transparente.
- Borde de 1 px sólido #173B57.
- Texto #173B57.
- Radio de 8 px.
- Padding de 12 px 24 px.

**Hover:**
- Fondo #E0F2F1.
- Texto #173B57.

### 5.4. Enlaces

Los enlaces deberán utilizar el color principal #173B57.

- Sin subrayado inicialmente.
- Subrayado al pasar el cursor.
- Color turquesa #249D9A en hover.
- Foco visible mediante teclado.

### 5.5. Tarjetas

Las tarjetas se utilizarán como contenedores principales de los formularios.

Características:

- Fondo blanco.
- Borde de 1 px sólido #E0E0E0.
- Radio de 12 px.
- Padding de 32 px.
- Sombra ligera.
- Ancho máximo de 520 px.

### 5.6. Mensajes de validación

Los mensajes deberán ser claros y aparecer cerca del campo al que hacen referencia.

**Error:**
- Fondo #FFEBEE.
- Texto #D32F2F.
- Icono de advertencia.
- Borde opcional de color rojo.

**Éxito:**
- Fondo #E8F5E9.
- Texto #388E3C.
- Icono de confirmación.

**Información:**
- Fondo #E3F2FD.
- Texto #1976D2.
- Icono informativo.

Los mensajes no deberán depender exclusivamente del color para transmitir su significado.

### 5.7. Iconografía

Se utilizarán iconos sencillos de estilo outline, manteniendo una apariencia uniforme.

Se podrán utilizar iconos para:

- Identificación de usuario.
- Correo electrónico.
- Contraseña.
- Mostrar y ocultar contraseña.
- Información y validación.

Los iconos tendrán un tamaño aproximado de 20 x 20 px.

### 5.8. Mostrar y ocultar contraseñas

Los campos de contraseña incorporarán un botón con icono de ojo situado a la derecha.

Características:

- Tamaño aproximado de 20 x 20 px.
- Color normal #667985.
- Color activo #173B57.
- Área interactiva mínima de 48 x 48 px.
- Accesibilidad mediante teclado.
- Etiqueta accesible que indique la acción realizada.

El botón permitirá alternar entre los tipos de campo password y text.

---

## 6. Estados de los elementos

Todos los componentes interactivos deberán disponer de estados visuales diferenciados.

### Estado normal

- Colores base.
- Bordes habituales.
- Sin efectos adicionales.

### Estado hover

- Cambio suave de color.
- Resaltado de botones y enlaces.
- Transiciones visuales discretas.

### Estado focus

- Contorno de 2 px sólido #249D9A.
- Indicador de foco claramente visible.
- Aplicable a navegación mediante teclado.

### Estado activo

- Resaltado visual de la acción seleccionada.
- Fondo ligeramente diferenciado.
- Borde más visible cuando corresponda.

### Estado error

- Borde #D32F2F.
- Mensaje de error asociado al campo.
- Fondo de error opcional #FFEBEE.

### Estado deshabilitado

- Opacidad reducida.
- Borde gris.
- Texto #9E9E9E.
- Cursor not-allowed.
- Sin posibilidad de interacción.

---

## 7. Diseño responsive

La aplicación deberá adaptarse correctamente a ordenadores, tablets y dispositivos móviles.

### Escritorio (1024 px o superior)

- Formularios centrados horizontalmente.
- Ancho máximo de 520 px.
- Distribución de campos en dos columnas cuando resulte apropiado.
- Tarjetas con padding de 32 px.
- Botones alineados según la composición del formulario.

### Tablet (768 px - 1023 px)

- Formularios adaptados al ancho disponible.
- Distribución preferente de una columna.
- Tarjetas con padding de 24 px.
- Márgenes laterales suficientes.

### Móvil (menos de 768 px)

- Campos ocupando el 100 % del ancho.
- Formularios en una sola columna.
- Botones ocupando todo el ancho disponible.
- Tarjetas con padding de 20 px.
- Títulos adaptados a pantallas pequeñas.
- Sin desplazamiento horizontal.
- Elementos táctiles cómodos de utilizar.

---

## 8. Accesibilidad

La aplicación deberá seguir criterios básicos de accesibilidad para facilitar su utilización.

### Contraste

Se buscará un contraste mínimo de 4.5:1 para el texto normal y 3:1 para texto grande y elementos gráficos relevantes, siguiendo las recomendaciones WCAG.

Las combinaciones de colores deberán comprobarse antes de considerar que cumplen estos requisitos.

### Etiquetas y formularios

- Todos los campos tendrán una etiqueta asociada mediante `label` y `for`.
- Se utilizarán tipos de input adecuados.
- Se indicarán los campos obligatorios.
- Los mensajes de error estarán relacionados con sus respectivos campos.

### Navegación

- Todos los elementos interactivos podrán utilizarse mediante teclado.
- Los indicadores de foco serán visibles.
- El orden de navegación será lógico.

### Mensajes dinámicos

- Los errores podrán utilizar `role="alert"`.
- Los mensajes de actualización podrán utilizar `aria-live`.
- Los iconos decorativos no sustituirán a los textos informativos.

### Objetivos táctiles

Los botones y controles interactivos tendrán un área de interacción preferiblemente de al menos 48 x 48 px.

---

## 9. Criterios generales de implementación

Durante el desarrollo se respetarán las siguientes directrices:

- Mantener una apariencia coherente entre registro e inicio de sesión.
- Reutilizar los mismos estilos para componentes equivalentes.
- Separar HTML, CSS y JavaScript en sus correspondientes archivos.
- Utilizar nombres de clases CSS descriptivos.
- Evitar duplicaciones innecesarias de código.
- Mantener una estructura sencilla y organizada.
- Priorizar la legibilidad y el mantenimiento del código.
- No utilizar elementos visuales que dificulten la comprensión de los formularios.
- Comprobar el funcionamiento en diferentes tamaños de pantalla.

---

## 10. Alcance del sistema de diseño

Este sistema de diseño se aplicará al portal ficticio de pacientes de Clínica Horizonte.

Su finalidad es establecer una identidad visual común para las siguientes interfaces:

- Página principal del portal.
- Formulario de registro de pacientes.
- Formulario de inicio de sesión.

El diseño deberá mantener una apariencia profesional, accesible y coherente en todas las páginas.

La aplicación utilizará HTML5, CSS3 y JavaScript, junto con Firebase Authentication para la gestión de usuarios y Cloud Firestore para el almacenamiento de información adicional del perfil y el registro de accesos.

Este documento servirá como referencia durante todo el desarrollo para mantener la coherencia visual y facilitar futuras modificaciones.
