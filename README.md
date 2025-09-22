# 🚀 ImpugnaIneInternet

Angular 20

## 🔧 Prerrequisitos

- Node.js (v18 o superior)
- npm (v9 o superior)
- Angular CLI (`npm install -g @angular/cli`)

## 📦 Dependencias

- **Angular 20.2.x** - Framework principal
- **Bootstrap 5.3.x** - Componentes UI y estilos
- **RxJS 7.8.x** - Programación reactiva
- **TypeScript 5.7.x** - Tipado estático

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/
│   │   ├── guards/
│   │   │   └── login.guard.ts
│   │   └── services/
│   ├── features/
│   │   ├── login/
│   │   │   ├── login.html
│   │   │   ├── login.scss
│   │   │   ├── login.spec.ts
│   │   │   └── login.ts
│   │   ├── inicio/
│   │   │   ├── inicio.html
│   │   │   ├── inicio.scss
│   │   │   ├── inicio.spec.ts
│   │   │   └── inicio.ts
│   │   ├── login.routes.ts
│   │   └── inicio.routes.ts
│   ├── shared/
│   │   ├── components/
│   │   │   ├── encabezado/
│   │   │   └── pie-pagina/
│   │   ├── ui/
│   │   │   ├── botones/
│   │   │   │   ├── btn-primario/
│   │   │   │   ├── btn-secundario/
│   │   │   │   └── btn-usuario/
│   │   │   ├── campos-texto/
│   │   │   │   └── textarea-primario/
│   │   │   ├── enlaces/
│   │   │   │   └── enlace-principal/
│   │   │   └── ui.module.ts
│   │   └── shared.module.ts
│   ├── app.config.ts
│   ├── app.html
│   ├── app.css
│   ├── app.routes.ts
│   └── app.ts
├── assets/
│   ├── estilos/
│   │   ├── colores.scss
│   │   ├── espaciado.scss
│   │   ├── tipografia.scss
│   │   └── variables.scss
│   ├── imgs/
│   │   └── logos/
│   └── docs/
├── environments/
│   ├── environment.ts
│   ├── environment.dev.ts
│   ├── environment.qa.ts
│   └── environment.prod.ts
├── index.html
├── main.ts
└── styles.scss
```

## 🚀 Inicio Rápido

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm start
   # o
   ng serve

   Integra -o al final si quieres que tu proyecto abra en directo en el navegador
   ```

3. **Abrir navegador:** Navegar a `http://localhost:4200/`

## 🛠️ Scripts Disponibles

- **`npm start`** - Iniciar servidor de desarrollo
- **`npm run build`** - Construir de forma local
- **`npm test`** - Ejecutar pruebas unitarias
- **`npm run watch`** - Construir en modo observación

## ⚡ Generación de Código

```bash
# Generar componente
ng generate component features/mi-funcionalidad

# Generar servicio
ng generate service core/services/mi-servicio

# Generar guard
ng generate guard core/guards/auth

# Generar interceptor
ng generate interceptor core/interceptors/http

# Listar todos los esquemas disponibles
ng generate --help
```

## 🌍 Ambientes

El proyecto soporta múltiples ambientes con configuraciones específicas:

### **Desarrollo**
- **Serve:** `ng serve --configuration=development`
- **Build:** `ng build --configuration=development`
- **Archivo:** `environment.dev.ts`

### **QA**
- **Serve:** `ng serve --configuration=qa`
- **Build:** `ng build --configuration=qa`
- **Archivo:** `environment.qa.ts`

### **Producción**
- **Serve:** `ng serve --configuration=production`
- **Build:** `ng build --configuration=production`
- **Archivo:** `environment.prod.ts`

### Estructura de Archivos de Ambiente
```typescript
export const environment = {
  production: boolean,
  apiUrl: string,
  name: string
};
```

## 🏗️ Construcción

```bash
# Construcción de desarrollo
ng build --configuration=development

# Construcción de QA
ng build --configuration=qa

# Construcción de producción (por defecto)
ng build --configuration=production
# o simplemente
ng build
```

Los artefactos de construcción se almacenan en el directorio `dist/`. Las construcciones de producción están optimizadas para rendimiento.

## 🧪 Ejecutar Pruebas Unitarias

Para ejecutar pruebas unitarias con el ejecutor de pruebas [Karma](https://karma-runner.github.io), usa el siguiente comando:

```bash
ng test
```

## 🔍 Pruebas

### Pruebas Unitarias
```bash
npm test
# o
ng test
```

### Pruebas E2E
```bash
ng e2e
```
*Nota: El framework E2E necesita ser configurado por separado.*

## 🎨 Estilos

Este proyecto usa:
- **Bootstrap 5.3.x** para componentes UI
- **SCSS** para estilos personalizados
- Estilos globales en `src/styles.scss`

## 📁 Arquitectura del Proyecto

- **Core:** Guards, interceptors y servicios singleton
- **Features:** Módulos de funcionalidades con lazy loading
- **Shared:** Componentes reutilizables y utilidades

## 🔄 Gestión de Versiones

Las dependencias usan versionado `~` para permitir actualizaciones de parches manteniendo compatibilidad:
- `~20.2.0` permite `20.2.x` pero no `20.3.0`

## 📚 Recursos Adicionales

- [Referencia Angular CLI](https://angular.dev/tools/cli)
- [Documentación Bootstrap](https://getbootstrap.com/docs/5.3/)
- [Guía de Estilo Angular](https://angular.dev/style-guide)
