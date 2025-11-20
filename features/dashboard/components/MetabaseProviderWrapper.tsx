"use client"

import React, { useMemo, useEffect, useState } from "react"
import { useMetabaseAuth } from '../context/MetabaseAuthContext'
import { prepareTokenForAlias, clearClientTokenCache } from '../services/metabase'
import dynamic from "next/dynamic"
import { MainLayout } from "@/components/layout/MainLayout"
// Add these imports from the embedding SDK
import { defineMetabaseAuthConfig, defineMetabaseTheme } from "@metabase/embedding-sdk-react"

// Load the MetabaseProvider only on the client to avoid server-side access to `document`.
const MetabaseProvider = dynamic(
  () => import("@metabase/embedding-sdk-react").then((mod) => mod.MetabaseProvider),
  { ssr: false }
)

function ProviderMountLogger({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('[MetabaseProviderWrapper] MetabaseProvider mounted')
    return () => {
      // eslint-disable-next-line no-console
      console.log('[MetabaseProviderWrapper] MetabaseProvider unmounted')
    }
  }, [])

  return <>{children}</>
}

interface Props {
  children: React.ReactNode
  /** optional alias string appended to token request e.g. '2' */
  alias?: string
}

export default function MetabaseProviderWrapper({ children, alias: propAlias }: Props) {
  const metabaseUrl = process.env.NEXT_PUBLIC_METABASE_SITE_URL
  const { state, dispatch } = useMetabaseAuth()
  // prefer prop if given (backwards compat), otherwise use context alias
  const alias = propAlias ?? state.alias ?? undefined

  if (!metabaseUrl) {
    return (
      <div className="p-8 text-red-600">❌ NEXT_PUBLIC_METABASE_SITE_URL no configurada</div>
    )
  }

  const [providerReady, setProviderReady] = useState(!alias);
  const [fetchedJwt, setFetchedJwt] = useState<string | null>(null);
  const prevAliasRef = React.useRef<string | undefined | null>(undefined)

  // Build authConfig; we may fetch token and write it into localStorage before mounting provider
  const authConfig = useMemo(() => {
    const base = `/api/metabase/token`;
    const authProviderUri = alias ? `${base}?as=${encodeURIComponent(alias)}` : base;

    // Use defineMetabaseAuthConfig for the SDK-friendly config object
    return defineMetabaseAuthConfig({
      metabaseInstanceUrl: metabaseUrl,
      authProviderUri,
      fetchOptions: { credentials: "include" },
    }) as any;
  }, [metabaseUrl, alias]);


  // Paleta de colores aleatoria generada (NUEVA):
  // Utilidad: generar un color HEX aleatorio
  // const randomHex = () =>
  //   `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;

  // // Utilidad: generar un rgba aleatorio para sombras
  // const randomRgba = () => {
  //   const r = Math.floor(Math.random() * 255);
  //   const g = Math.floor(Math.random() * 255);
  //   const b = Math.floor(Math.random() * 255);
  //   const a = (Math.random() * 0.3 + 0.1).toFixed(2);
  //   return `rgba(${r}, ${g}, ${b}, ${a})`;
  // };

  // const generateRandomColors = () => ({
  //   // Identidad corporativa
  //   brand: randomHex(),
  //   "brand-hover": randomHex(),
  //   "brand-hover-light": randomHex(),

  //   // Textos
  //   "text-primary": randomHex(),
  //   "text-secondary": randomHex(),
  //   "text-tertiary": randomHex(),

  //   // Fondos
  //   background: randomHex(),
  //   "background-light": randomHex(),
  //   "background-secondary": randomHex(),
  //   "background-hover": randomHex(),
  //   "background-disabled": randomHex(),

  //   // Bordes y líneas
  //   border: randomHex(),
  //   shadow: randomRgba(),

  //   // Específicos de charts (sí los soporta Metabase)
  //   filter: randomHex(),
  //   summarize: randomHex(),

  //   // Estados
  //   positive: randomHex(),
  //   negative: randomHex(),

  //   // 8 Colores aleatorios para gráficos
  //   charts: Array.from({ length: 8 }, () => randomHex()),
  // });

  // // 👉 Generar colores:
  // const randomColors = generateRandomColors();
  // console.log(randomColors);


  // const IntelicaTheme = defineMetabaseTheme({
  //   fontFamily: "Metropolis",

  //   fontSize: "14px",
  //   lineHeight: "20px",

  //   colors: {
  //     // Identidad corporativa
  //     brand: randomColors.brand,
  //     "brand-hover": randomColors["brand-hover"],
  //     "brand-hover-light": randomColors["brand-hover-light"],

  //     // Textos
  //     "text-primary": randomColors["text-primary"],
  //     "text-secondary": randomColors["text-secondary"],
  //     "text-tertiary": randomColors["text-tertiary"],

  //     // Fondos
  //     background: randomColors.background,
  //     "background-light": randomColors["background-light"],
  //     "background-secondary": randomColors["background-secondary"],
  //     "background-hover": randomColors["background-hover"],
  //     "background-disabled": randomColors["background-disabled"],

  //     // Bordes y líneas
  //     border: randomColors.border,
  //     shadow: randomColors.shadow,
  //     filter: randomColors.filter,     // Color aleatorio
  //     summarize: randomColors.summarize, // Color aleatorio

  //     // Estados
  //     positive: randomColors.positive,
  //     negative: randomColors.negative,

  //     // Colores para gráficos
  //     charts: randomColors.charts,
  //   },

  //   components: {
  //     /* ------------------------------
  //        DASHBOARD / CARDS
  //     ------------------------------ */
  //     dashboard: {
  //       backgroundColor: randomColors.background,
  //       gridBorderColor: randomColors.border,
  //       card: {
  //         backgroundColor: randomColors["background-hover"],
  //         border: `1px solid ${randomColors.border}`
  //       }
  //     },

  //     /* ------------------------------
  //        TABLAS
  //     ------------------------------ */
  //     table: {
  //       stickyBackgroundColor: randomColors["background-light"],
  //       cell: {
  //         backgroundColor: randomColors["background-hover"],
  //         textColor: randomColors["text-primary"],
  //         fontSize: "13px",
  //       },
  //       idColumn: {
  //         backgroundColor: randomColors["background-secondary"],
  //         textColor: randomColors.brand,
  //       }
  //     },

  //     /** Pivot table (NUEVO) **/
  //     pivotTable: {
  //       cell: {
  //         fontSize: "24px",
  //       },
  //       /** Button to toggle pivot table rows **/
  //       rowToggle: {
  //         textColor: randomColors["background-hover"],
  //         backgroundColor: randomColors.summarize, // Usando color 'summarize' aleatorio
  //       },
  //     },

  //     /* ------------------------------
  //        NÚMEROS (KPI CARDS)
  //     ------------------------------ */
  //     number: {
  //       value: {
  //         fontSize: "26px",
  //         lineHeight: "24px"
  //       }
  //     },

  //     /* ------------------------------
  //        GRÁFICOS CARTESIANOS
  //     ------------------------------ */
  //     cartesian: {
  //       padding: "8px 10px",
  //       label: { fontSize: "12px" },
  //       splitLine: { lineStyle: { color: randomColors.border } },
  //       goalLine: { label: { fontSize: "12px" } },
  //     },

  //     /* ------------------------------
  //        TOOLTIP
  //     ------------------------------ */
  //     tooltip: {
  //       backgroundColor: randomColors["background-hover"],
  //       focusedBackgroundColor: randomColors["background-hover"],
  //       textColor: randomColors["text-primary"],
  //       secondaryTextColor: randomColors["text-secondary"],
  //     },

  //     /* ------------------------------
  //        POPOVER (Filters, date pickers…)
  //     ------------------------------ */
  //     popover: {
  //       zIndex: 99
  //     },

  //     /* ------------------------------
  //        COLLECTION BROWSER
  //     ------------------------------ */
  //     collectionBrowser: {
  //       breadcrumbs: {
  //         expandButton: {
  //           textColor: randomColors.brand,
  //           backgroundColor: randomColors["background-secondary"],
  //           hoverTextColor: randomColors["background-hover"],
  //           hoverBackgroundColor: randomColors.brand
  //         }
  //       }
  //     },

  //     /* ------------------------------
  //        QUESTION VIEW
  //     ------------------------------ */
  //     question: {
  //       backgroundColor: randomColors["background-hover"],
  //       toolbar: { backgroundColor: randomColors["background-light"] },
  //     }
  //   }
  // });

  // Optional: build a theme via defineMetabaseTheme using env vars if available
  const IntelicaTheme = defineMetabaseTheme({
    fontFamily: "Lato",

    fontSize: "14px",
    lineHeight: "20px",

    colors: {
      // Identidad corporativa
      brand: "#21409A",              // Azul Intelica
      "brand-hover": "#3460DE",      // Azul más claro
      "brand-hover-light": "#6B91FF",

      // Textos
      "text-primary": "#0F1533",     // Azul oscuro corporativo
      "text-secondary": "#474D66",
      "text-tertiary": "#808599",

      // Fondos
      background: "#FDFDFF",
      "background-light": "#F0F4FF",
      "background-secondary": "#EFF3FF",
      "background-hover": "#FFFFFF",
      "background-disabled": "#B8BCCC",

      // Bordes y líneas
      border: "#D8DDEF",
      shadow: "rgba(33, 64, 154, 0.15)",

      // Estados
      positive: "#64E386",
      negative: "#F04B4B",

      // Colores para gráficos
      charts: [
        "#21409A",  // Intelica Blue
        "#FF860D",  // Naranja corporativo
        "#3083FF",
        "#2A4FBD",
        "#783FFF",
        "#A7BDFF",
        "#6B91FF",
        "#3460DE",
      ],
    },

    components: {
      /* ------------------------------
         DASHBOARD / CARDS
      ------------------------------ */
      dashboard: {
        backgroundColor: "#F2F3F5",
        gridBorderColor: "#F2F3F5",
        card: {
          backgroundColor: "#FFFFFF",
          border: "12px double #F2F3F5",
        }
      },

      /* ------------------------------
         TABLAS
      ------------------------------ */
      table: {
        stickyBackgroundColor: "#F0F4FF",
        cell: {
          backgroundColor: "#FFFFFF",
          textColor: "#0F1533",
          fontSize: "13px",
        },
        idColumn: {
          backgroundColor: "#EFF3FF",
          textColor: "#21409A",
        }
      },

      /* ------------------------------
         NÚMEROS (KPI CARDS)
      ------------------------------ */
      number: {
        value: {
          fontSize: "26px",
          lineHeight: "24px",
        },

      },

      /* ------------------------------
         GRÁFICOS CARTESIANOS
      ------------------------------ */
      cartesian: {
        padding: "8px 10px",
        label: { fontSize: "10px" },
        splitLine: { lineStyle: { color: "#D8DDEF" } },
        goalLine: { label: { fontSize: "12px" } },
      },

      /* ------------------------------
         TOOLTIP
      ------------------------------ */
      tooltip: {
        backgroundColor: "#FFFFFF",
        focusedBackgroundColor: "#EFF3FF",
        textColor: "#0F1533",
        secondaryTextColor: "#474D66",
      },

      /* ------------------------------
         POPOVER (Filters, date pickers…)
      ------------------------------ */
      popover: {
        zIndex: 5,
      },

      /* ------------------------------
         COLLECTION BROWSER
      ------------------------------ */
      collectionBrowser: {
        breadcrumbs: {
          expandButton: {
            textColor: "#21409A",
            backgroundColor: "#FFFFFF",
            hoverTextColor: "#FFFFFF",
            hoverBackgroundColor: "#21409A"
          }
        }
      },

      /* ------------------------------
         QUESTION VIEW
      ------------------------------ */
      question: {
        backgroundColor: "#FFFFFF",
        toolbar: { backgroundColor: "#F0F4FF" },
      }
    }
  });



  const theme = useMemo(() => IntelicaTheme, []);


  const providerInstanceKey = `${alias ?? 'anon'}-${state.providerKey}`

  useEffect(() => {
    // Debug log to verify which authProviderUri is being used
    // eslint-disable-next-line no-console
    console.log('[MetabaseProviderWrapper] authConfig:', { authConfig, alias, providerKey: state.providerKey });
  }, [authConfig, alias]);

  // When alias changes, reset provider readiness and handle clear/cleanup on alias removal
  useEffect(() => {
    const prev = prevAliasRef.current
    // if alias was present and now is cleared -> clear cache and bump provider key so SDK re-inits
    if (prev && !alias) {
      clearClientTokenCache()
      // bump context providerKey so any consumers remount the provider
      dispatch({ type: 'BUMP_KEY' })
    }

    // reset readiness: if we now have an alias we need to fetch+prepare before mounting
    setProviderReady(!alias)

    prevAliasRef.current = alias
  }, [alias, dispatch])

  useEffect(() => {
    // If an alias is supplied, fetch+prepare token via centralized service
    if (!alias) return

    let cancelled = false

    async function fetchAndPrepare() {
      // eslint-disable-next-line no-console
      console.log('[MetabaseProviderWrapper] starting prepareTokenForAlias for', alias)
      try {
        const jwt = await prepareTokenForAlias(String(alias))
        // eslint-disable-next-line no-console
        console.log('[MetabaseProviderWrapper] prepareTokenForAlias finished', { jwt })
        if (cancelled) return

        setFetchedJwt(jwt)

        // small delay to allow storage/cookie to settle
        setTimeout(() => {
          if (!cancelled) setProviderReady(true)
          // eslint-disable-next-line no-console
          console.log('[MetabaseProviderWrapper] providerReady set true')
        }, 50)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('[MetabaseProviderWrapper] failed to prepare alias token', err)
        if (!cancelled) setProviderReady(true)
      }
    }

    fetchAndPrepare()

    return () => {
      cancelled = true
    }
  }, [alias]);

  if (!providerReady) {
    return (
      <div className="p-6">
        <div>Preparing Metabase session...</div>
        {fetchedJwt && (
          <div className="mt-2 text-xs text-gray-600">token preview: {String(fetchedJwt).slice(0, 20)}...</div>
        )}
      </div>
    );
  }

  return (
    // MetabaseProvider is dynamically imported and will only render on client-side
    // so it's safe to reference window/document inside the SDK implementation.
    <ProviderMountLogger>
      <MetabaseProvider key={providerInstanceKey} authConfig={authConfig} theme={theme} className="metabase-provider">
        <MainLayout>
          {children}
        </MainLayout>
      </MetabaseProvider>
    </ProviderMountLogger>
  )
}
