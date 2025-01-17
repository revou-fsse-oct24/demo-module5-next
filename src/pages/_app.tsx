import { useRouter } from "next/router";
import { useEffect } from "react";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Check authentication on route change
    const handleRouteChange = () => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      const isPhotosPage = router.pathname.startsWith("/photos");

      if (!isAuthenticated && isPhotosPage) {
        router.push("/");
      }
    };

    // Check on initial load
    handleRouteChange();

    // Add route change handler
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
