# FID by Lakaut — Flujo Prototipo

Prototipo HTML/CSS/JS del flujo completo de contratación y emisión de un **Certificado Digital Jurídico** para el producto **FID by Lakaut**. Es un front-end estático (sin backend ni framework), pensado para validar UX y presentar el flujo completo a stakeholders.

---

## Estructura del proyecto

```
Flujo-alta-iFrame/
├── assets/
│   ├── css/
│   │   ├── tokens.css        # Variables de diseño (colores, tipografía, spacing)
│   │   ├── base.css          # Reset y estilos globales
│   │   ├── header.css        # Header compartido
│   │   ├── buttons.css       # Sistema de botones (primary, outline, secondary)
│   │   ├── inputs.css        # Campos de formulario
│   │   └── exit-modal.css    # Modal "¿Dejás el proceso?"
│   ├── icons/                # SVGs e íconos del sistema
│   ├── images/               # Ilustraciones y avatares
│   └── js/
│       └── exit-modal.js     # Lógica compartida del modal de salida
├── index.html                # Página de Planes y Precios
├── login.html                # Inicio de sesión
├── paso1.html                # Iniciar solicitud — datos de cuenta y empresa
├── paso2.html                # Verificación de datos personales (RENAPER simulado)
├── editar-datos.html         # Corrección de datos personales
├── otp-correo.html           # Validación de correo (OTP)
├── otp-tel.html              # Validación de teléfono (OTP)
├── paso3.html                # Carga de documentación
├── paso4.html                # Paso adicional de solicitud
├── validando-identidad.html  # Pantalla de espera — biometría en proceso
├── biometria.html            # Captura biométrica
├── validacion-exitosa.html   # Identidad validada correctamente
├── clave-firma.html          # Creación de clave de firma digital
├── generando-certificado.html# Pantalla de espera — generando certificado
├── certificado-listo.html    # Certificado emitido — datos finales
├── pago.html                 # Pantalla de pago — Plan PyME
├── pago-exitoso.html         # Confirmación de pago
└── guia-botones.html         # Guía interna del sistema de diseño de botones
```

---

## Flujo principal

```
index.html (Planes y Precios)
    └─▶ paso1.html (Datos de cuenta + empresa)
            └─▶ paso2.html (Verificar datos personales)
                    ├─▶ editar-datos.html (Corregir datos) ──▶ paso2.html
                    └─▶ otp-correo.html (Validar correo)
                            └─▶ otp-tel.html (Validar teléfono)
                                    └─▶ paso3.html (Documentación)
                                            └─▶ paso4.html
                                                    └─▶ validando-identidad.html
                                                            └─▶ biometria.html
                                                                    └─▶ validacion-exitosa.html
                                                                            └─▶ clave-firma.html
                                                                                    └─▶ generando-certificado.html
                                                                                            └─▶ certificado-listo.html
```

**Flujo de pago** (separado, accesible desde `login.html`):
```
login.html ──▶ pago.html ──▶ pago-exitoso.html
```

---

## Persistencia de datos (sessionStorage)

El prototipo usa `sessionStorage` para pasar datos entre pantallas sin backend. Las claves utilizadas son:

| Clave | Se guarda en | Se lee en | Descripción |
|---|---|---|---|
| `p1_email` | `paso1.html` | `certificado-listo.html` | Correo del titular |
| `p1_cargo` | `paso1.html` | `certificado-listo.html` | Cargo en la empresa |
| `p1_sociedad` | `paso1.html` | `certificado-listo.html` | Tipo de sociedad |
| `p1_razon` | `paso1.html` | `certificado-listo.html` | Razón social |
| `p1_cuit` | `paso1.html` | `certificado-listo.html` | CUIT de la empresa |
| `cert_nombre` | `paso2.html` | `certificado-listo.html` | Nombre verificado (RENAPER) |
| `cert_cuil` | `paso2.html` | `certificado-listo.html` | CUIL verificado (RENAPER) |
| `cert_dni` | `paso2.html` | `certificado-listo.html` | DNI verificado (RENAPER) |
| `edit_dni` | `paso2.html` | `editar-datos.html` | DNI previo para edición |
| `edit_genero` | `paso2.html` | `editar-datos.html` | Género previo para edición |
| `renaper_nombre` | `editar-datos.html` | `paso2.html` | Nombre actualizado tras corrección |
| `renaper_dni` | `editar-datos.html` | `paso2.html` | DNI actualizado tras corrección |
| `renaper_cuil` | `editar-datos.html` | `paso2.html` | CUIL actualizado tras corrección |
| `renaper_genero` | `editar-datos.html` | `paso2.html` | Género actualizado tras corrección |

> **Regla clave:** los datos que aparecen en `certificado-listo.html` provienen siempre de lo verificado en `paso2.html` (identidad RENAPER) y de lo ingresado en `paso1.html` (empresa). Lo que el usuario escriba fuera de esas pantallas no afecta el certificado.

---

## Precios

El producto tiene un único precio consistente en todo el flujo:

| Plan | Precio (con IVA) | Precio s/imp. nac. |
|---|---|---|
| PyME — 500 firmas digitales | **$200.000** | $165.289 |
| Enterprise — 2000 firmas digitales | **$400.000** | — |

En la pantalla de pago (`pago.html`) se aplica un descuento del 10%:
- Subtotal: $200.000
- Descuento: -$20.000
- **Total: $180.000**

---

## Cómo correr el proyecto

Al ser HTML estático, cualquier servidor local funciona. Opción rápida con Node.js:

```bash
npx serve .
```

O con Python:

```bash
python3 -m http.server 3000
```

Luego abrí `http://localhost:3000/index.html` en el navegador.

---

## Sistema de diseño

- **Tokens**: definidos en `assets/css/tokens.css` (colores, radios, sombras).
- **Tipografía**: Inter (textos generales), Open Sans (helpers y notas), Montserrat (destacados).
- **Botones**: ver `guia-botones.html` para referencia visual de todos los estados.
- **Modal de salida**: componente compartido (`exit-modal.js` + `exit-modal.css`) inyectado automáticamente en todas las pantallas que lo importan. Muestra "¿Dejás el proceso?" con un botón primario (continuar) y uno secundario con borde (salir).

---

## Notas de desarrollo

- El prototipo **simula** la consulta a RENAPER con datos aleatorios según el DNI y género ingresados. No hay llamadas reales a APIs externas.
- Los OTP de correo y teléfono son simulados (cualquier código de 6 dígitos avanza el flujo).
- La biometría es una pantalla de espera con temporizador, sin integración real.
- `guia-botones.html` es una pantalla interna de referencia, no forma parte del flujo de usuario.
