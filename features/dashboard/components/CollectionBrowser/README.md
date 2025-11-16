# MetabaseCollectionBrowser - Estructura de Carpetas

Este componente ha sido refactorizado en una estructura modular para mejorar mantenibilidad y reutilización.

## 📁 Estructura de Carpetas

```
CollectionBrowser/
├── index.tsx                    # Componente principal
├── CreateMenu.tsx               # Menú desplegable para crear items
├── CollectionHeader.tsx         # Header con navegación y controles
├── SelectedItemView.tsx         # Vista cuando se selecciona un dashboard/pregunta
├── components/
│   ├── QuestionEditor.tsx       # Editor de preguntas optimizado con memo
│   └── index.ts                # Exports de componentes
├── types/
│   └── index.ts                # Tipos TypeScript compartidos
├── modals/
│   ├── CreateDashboardModal.tsx # Modal para crear dashboards
│   ├── CreateQuestionModal.tsx  # Modal para crear preguntas
│   └── index.ts                # Exports de modales
└── hooks/
    ├── useCollectionNavigation.ts  # Hook para navegar entre colecciones
    ├── useCollectionModals.ts      # Hook para gestionar estado de modales
    └── index.ts                    # Exports de hooks
```

## 📦 Componentes

### `index.tsx` - MetabaseCollectionBrowser
Componente principal que orquesta toda la funcionalidad.
- Usa `useCallback` para optimizar renderizados
- Gestiona el estado de selección de items

### `CreateMenu.tsx`
Menú dropdown para crear nuevos dashboards o preguntas.
- **Props**: `onCreateDashboard`, `onCreateQuestion`

### `CollectionHeader.tsx`
Header con título, botón de navegación atrás y menú de creación.
- **Props**: `currentCollectionTitle`, `historyStackLength`, `onGoBack`, `onCreateDashboard`, `onCreateQuestion`

### `SelectedItemView.tsx`
Renderiza un dashboard o pregunta cuando se selecciona desde la lista.
- **Props**: `item`, `onBack`

### `QuestionEditor.tsx`
Componente especializado que envuelve `InteractiveQuestion` con optimizaciones.
- Usa `React.memo()` para evitar re-renders innecesarios
- Implementa custom comparación de props
- Evita warnings de ciclo de vida (`UNSAFE_componentWillReceiveProps`)

## 🪝 Hooks Personalizados

### `useCollectionNavigation()`
Gestiona la navegación entre colecciones.
```typescript
const {
  currentCollectionId,
  currentCollectionTitle,
  historyStack,
  enterCollection,
  goBack,
} = useCollectionNavigation();
```

### `useCollectionModals()`
Gestiona el estado de los modales con `useCallback` optimizado.
```typescript
const {
  isCreateDashboardOpen,
  isCreateQuestionOpen,
  isModalOpen,
  openCreateDashboard,
  closeCreateDashboard,
  openCreateQuestion,
  closeCreateQuestion,
  closeAllModals,
  handleDashboardCreated,
  handleQuestionCreated,
  refreshKey,
} = useCollectionModals();
```

## 📝 Tipos

```typescript
interface CollectionHistoryItem {
  id: number | 'root' | 'personal' | string;
  title: string;
}

interface SelectedItem {
  id: number | string;
  model: 'dashboard' | 'card';
  name?: string;
  title?: string;
  display_name?: string;
}

interface MetabaseItem {
  id?: number | 'root' | 'personal' | string;
  model?: 'dashboard' | 'card' | 'collection';
  name?: string;
  title?: string;
  display_name?: string;
  [key: string]: any;
}
```

## 🔄 Flujo de Datos

1. **MetabaseCollectionBrowser** (componente principal)
   - Usa `useCollectionNavigation()` para manejar la navegación
   - Usa `useCollectionModals()` para manejar los modales
   - Renderiza `CollectionHeader`, `CreateMenu`, y modales

2. **Navegación de Colecciones**
   - Al hacer click en una colección, se llama a `enterCollection()`
   - El histórico se almacena en `historyStack`
   - Puede volver atrás con `goBack()`

3. **Modales**
   - Se controlan independientemente para dashboard y pregunta
   - Cada uno tiene su propio componente modal
   - Al crear un item, se dispara `handleDashboardCreated()` o `handleQuestionCreated()`

4. **Editor de Preguntas**
   - El `QuestionEditor` está optimizado con `React.memo()`
   - Solo re-renderiza si `currentCollectionId` o `onSave` cambian
   - Evita warnings de ciclo de vida del SDK de Metabase

## 🚀 Ventajas de esta Estructura

✅ **Modularidad**: Cada componente tiene una responsabilidad única
✅ **Reutilizabilidad**: Los hooks pueden usarse en otros componentes
✅ **Mantenibilidad**: Código más limpio y fácil de entender
✅ **Escalabilidad**: Fácil agregar nuevas funcionalidades
✅ **Testing**: Cada módulo puede ser testeado independientemente
✅ **Performance**: Optimizaciones con `useCallback` y `React.memo()`
✅ **Estabilidad**: Sin warnings de ciclo de vida en Strict Mode

## ⚡ Optimizaciones Implementadas

- **useCallback**: Las funciones se memoizan para evitar creación innecesaria
- **React.memo**: El `QuestionEditor` usa custom comparación para evitar re-renders
- **useMemo**: Los props del editor se memoizan para estabilidad
- **key prop**: Se usa `refreshKey` en `CollectionBrowser` para forzar re-render cuando es necesario
