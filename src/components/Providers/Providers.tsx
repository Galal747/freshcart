"use client";

import { AppStore, createStore, PreloadedState } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";

export default function Providers({ children, preloadedState }: { children: ReactNode, preloadedState: PreloadedState }) {
  const myClient = new QueryClient();


  const storeRef = useRef<null | AppStore>(null)

  if (storeRef.current == null) {
    storeRef.current = createStore(preloadedState)
  }

  return (
    <>
      <Provider store={storeRef.current}>
        <QueryClientProvider client={myClient}>

          {children}

          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </QueryClientProvider>
      </Provider>
    </>
  );
}
