# React Query

React Query ist eine Open-Source-Bibliothek zum Verwalten von Serverzuständen in React-Anwendungen.
Die Bibliothek ist darauf ausgerichtet, asynchrone Daten zu manipulieren, zu zwischenspeichern und zu aktualisieren sowie veraltete Daten zu aktualisieren oder zu synchronisieren .

Kernfeatures:

- Declarative Data Fetching: React Query bietet eine deklarative Art und Weise, um Daten von APIs und Servern zu holen, indem es React-Komponenten zur Verfügung stellt, die Daten holen und aktualisieren können.

- Caching und Invalidation: bietet eine integrierte Caching-Lösung, die es uns ermöglicht, Daten zwischenzuspeichern und sie bei Bedarf automatisch zu aktualisieren (invalidieren).

- Paginierung: bietet eine integrierte Paginierungslösung, die es uns ermöglicht, Daten automatisch zu paginieren und sie bei Bedarf automatisch zu aktualisieren

- Data Refetching und Polling: React Query ermöglicht es Entwicklern, Daten manuell oder automatisch (mit einem einstellbaren Intervall) abzurufen.

- Parallel Data Fetching: bietet eine einfache Möglichkeit, mehrere Datenanfragen parallel zu verarbeiten.

- Query Management: React Query bietet eine zentrale Stelle, um die Anfragen zu verwalten und zu überwachen, sowie eine Möglichkeit, Fehler abzufangen und zu behandeln.

- Query Stale-While-Revalidate: React Query stellt sicher, dass die Daten auf der Seite immer aktuell sind, indem es sie im Hintergrund aktualisiert, während die Seite weiterhin die älteren Daten anzeigt.

- Devtools: bietet Devtools, die helfen, die inneren Arbeitsabläufe von React Query zu visualisieren und bei der Fehlersuche zu unterstützen
  - [Installation und Anwendung](https://tanstack.com/query/v5/docs/react/devtools)
  - Ermöglicht die Beobachtung von Abfragen, jedoch nicht von Mutationen

> 💿 Installation: `npm i @tanstack/react-query`

## [Grundlegende Anwendung](https://tanstack.com/query/v5/docs/react/quick-start)

```jsx
// Konfiguration (kan auch in einer separaten Datei erfolgen)
...
// 1. import
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 2. Erstellung einer Instanz von "QueryClient", der für die Verwaltung von Abfragen und Caches verantwortlich ist.
const queryClient = new QueryClient();

function App() {
  return (
    // 3. Anwendungskomponente mit dem Provider "umschließen" und den queryClient als Prop übergeben
    <QueryClientProvider client={queryClient}>
      // Hier kommt der restliche Code der Anwendung
    </QueryClientProvider>
  );
}
```

### [`useQuery`](https://tanstack.com/query/v5/docs/react/reference/useQuery)-Hook:

- behandelt das Abrufen von Daten. Wird immer dann aufgerufen, wenn Daten abgerufen werden müssen.
- akzeptiert einen eindeutigen Schlüssel für die Abfrage und eine Funktion, die eine Promise zurückgibt.
- Der eindeutige Schlüssel wird verwendet, um die Abfrage intern zu aktualisieren, zu zwischenspeichern und zu teilen.
- `useQuery` gibt eine Handvoll von Objekten zurück, z.B. `isSuccess`, `isError`, `isLoading`, `isFetching`, `data` und `error`.

```jsx
// Anwendungsbeispiel
import { useQuery } from "@tanstack/react-query";

function App() {
  const info = useQuery({ queryKey: ["todos"], queryFn: fetchTodoList });
}
```

## [`useMutation`](https://tanstack.com/query/v5/docs/react/reference/useMutation)-Hook:

- `useMutation`-Hook ermöglicht das Schreiben von Daten. Mutationen sind "Schreib"-Operationen (im Gegensatz zu "Lese"-Operationen).
- Akzeptiert eine Funktion, die ein Promise zurückgibt, die unsere Daten schreibt.
- Mit `onSuccess` können wir dann die Abfrage aktualisieren, die die Daten abruft.
- Man kann auch `setQueryData` verwenden, um unsere Abfrage darüber zu informieren, dass es ein Update gibt, anstatt ihr mitzuteilen, dass alles ungültig ist und eine neue Abfrage erfolgen soll.

```jsx
// Anwendungsbeispiel mit Query Invalidation
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "../utils";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isLoading: deleteTaskLoading } = useMutation({
    mutationFn: (taskId) => {
      return customFetch.delete(`/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return { deleteTask, deleteTaskLoading };
};
```

---

> [Schöner Vergleich zwischen React Query, SWR(Vercel), RTK Query und React Router](https://tanstack.com/query/v5/docs/react/comparison)
