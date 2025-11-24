# 📘 TypeScript vs JavaScript: Guía de Migración

Has migrado tu proyecto de JavaScript (JS) a TypeScript (TS). ¡Felicidades! 🎉
Pero, ¿qué significa esto realmente? ¿Por qué nos hemos tomado la molestia?

Este documento explica las diferencias clave usando tu propio código como ejemplo.

---

## 1. Estructura del Proyecto

### JavaScript (Antes)
Todo estaba "suelto". Ejecutabas directamente los archivos `.js`.
```
/proyecto
  ├── index.js
  ├── controllers/
  │    └── user.controller.js
  └── ...
```

### TypeScript (Ahora)
Tenemos dos mundos separados:
1.  **`src/` (Source):** Donde escribes tu código `.ts`. Es para humanos.
2.  **`dist/` (Distribution):** Donde se guarda el código `.js` traducido (compilado). Es para la máquina.

> **¿Por qué?** Los navegadores y Node.js *no entienden* TypeScript. Necesitamos un paso intermedio (compilación) que traduce tu TS moderno y seguro a JS estándar que Node puede ejecutar.

---

## 2. Modelos de Mongoose: La Base de Datos

Aquí es donde TypeScript brilla más.

### ❌ JavaScript (El problema)
En JS, definías un esquema, pero tu código no sabía qué propiedades tenía un usuario.
```javascript
// user.model.js
const userSchema = new mongoose.Schema({ username: String, ... });
// Más tarde en el código...
user.nombre = "Juan"; // ✅ Bien
user.nombree = "Juan"; // 😱 ERROR TIPOGRÁFICO: JS no te avisa, simplemente añade una propiedad nueva.
```

### ✅ TypeScript (La solución)
En TS, definimos una **Interfaz** (`IUserDocument`) que actúa como un contrato.

```typescript
// src/types/user.type.ts
export interface IUserDocument extends Document {
  username: string;
  email: string;
  // ...
}

// src/models/user.model.ts
const userSchema = new Schema<IUserDocument>({ ... });
```

**Beneficio:** Si ahora intentas escribir `user.nombree`, TypeScript te subrayará el error en rojo **antes** de que ejecutes el código. ¡Has prevenido un bug!

---

## 3. Controladores: Request y Response

### ❌ JavaScript
Los parámetros `req` y `res` eran cajas negras. No sabías qué métodos tenían a menos que miraras la documentación de Express.

```javascript
// user.controller.js
const login = (req, res) => {
  // ¿req tiene body? ¿query? ¿params? Tienes que confiar.
  res.send("Hola"); // ¿send o json?
}
```

### ✅ TypeScript
Importamos los tipos oficiales de Express.

```typescript
// src/controllers/user.controller.ts
import { Request, Response } from "express";

export const loginController = async (req: Request, res: Response): Promise<void> => {
  // Ahora, si escribes "req.", el editor te muestra una lista: body, params, query, headers...
  // ¡Autocompletado mágico! ✨
  res.json({ token });
};
```

**Beneficio:** Programas más rápido porque el editor te "chiva" lo que puedes hacer.

---

## 4. Importaciones Modernas

### JavaScript (CommonJS)
```javascript
const express = require("express");
const { login } = require("./controllers/user.controller");
```

### TypeScript (ES Modules)
```typescript
import express from "express";
import { loginController } from "./controllers/user.controller";
```

**Diferencia:** La sintaxis `import/export` es el estándar moderno de JavaScript. TypeScript nos permite usarlo hoy mismo, incluso si Node.js a veces se pone "tiquismiquis" con ello.

---

## 5. Ejecución: `nodemon` vs `ts-node-dev`

### JavaScript
Usabas `nodemon index.js`. Nodemon reiniciaba el servidor al guardar.

### TypeScript
Usamos `ts-node-dev`.
1.  **Observa** tus archivos `.ts`.
2.  **Compila** en memoria (muy rápido) a JS.
3.  **Ejecuta** el resultado.
4.  **Reinicia** si cambias algo.

Todo esto ocurre transparente para ti con `npm run dev`.

---

## 📝 Resumen: ¿Qué ganas?

| Característica | JavaScript 🟡 | TypeScript 🔵 |
| :--- | :--- | :--- |
| **Errores** | Te enteras cuando la app falla en ejecución. | Te enteras mientras escribes el código. |
| **Autocompletado** | Básico / Adivinanza. | Total y preciso. |
| **Mantenimiento** | Difícil en proyectos grandes. "¿Qué recibía esta función?". | Fácil. Los tipos documentan el código por ti. |
| **Velocidad** | Escribes rápido, debuggeas lento. | Escribes con cuidado, debuggeas menos. |

¡Bienvenido al desarrollo profesional con TypeScript! 🚀
