# AdminPro

Panel administrativo desarrollado con **Angular 17 y TypeScript**, con autenticación, gestión de usuarios, edición de perfil y visualización de gráficas.

El proyecto reúne trabajo frontend con componentes, formularios, navegación protegida e integración con una API. El backend se mantiene en [admin-pro-backend](https://github.com/Piplash/admin-pro-backend).

## Funcionalidades y alcance

- Inicio de sesión, registro y flujo de acceso con Google integrado con el backend.
- Validación y renovación de sesión mediante un servicio HTTP y un guard de rutas.
- Consulta, búsqueda, actualización y eliminación de usuarios mediante la API.
- Edición de perfil y carga de imágenes.
- Gráficas con Chart.js y ng2-charts.
- Ajustes de interfaz y ejemplos de uso de promesas y RxJS.

Las secciones de médicos y hospitales contienen componentes iniciales; no representan módulos de gestión completos. La aplicación requiere el backend y su configuración para probar las funciones autenticadas.

## Stack

Angular 17 · TypeScript 5.2 · RxJS 7.8 · Chart.js 4 · ng2-charts · SweetAlert2

## Ejecutar localmente

Necesitas Git, npm y una versión de Node.js compatible con Angular 17. Las versiones del proyecto están declaradas en `package.json`.

```bash
git clone https://github.com/Piplash/Angular-AdminPro.git
cd Angular-AdminPro
npm ci
npm start
```

Abre `http://localhost:4200`. Configura y ejecuta el backend por separado: `src/app/environments/environment.ts` define la URL de la API, cuyo valor actual es `http://localhost:3000/api`.

El acceso con Google requiere además la configuración correspondiente de identidad en frontend y backend.

## Organización

| Directorio | Responsabilidad |
| --- | --- |
| `src/app/auth/` | Vistas de inicio de sesión y registro. |
| `src/app/pages/` | Perfil, usuarios, ajustes y vistas del panel. |
| `src/app/components/` | Componentes de gráficas, controles y modales. |
| `src/app/services/` | Acceso a la API, sesión, imágenes y configuración. |
| `src/app/guards/` | Control de acceso a rutas. |
| `src/app/interfaces/` y `src/app/models/` | Tipos y modelos de datos. |

## Comandos disponibles

```bash
npm run build
npm test
```

`build` genera la compilación en `dist/`; `test` ejecuta el runner configurado con Karma y Jasmine. La existencia de estos comandos no implica una cobertura completa de las funcionalidades.

---

[Felipe Acosta · GitHub](https://github.com/Piplash)
