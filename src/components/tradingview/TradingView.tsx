declare global {
  interface Window {
    TradingView: any;
  }
}

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../feature/store";

let tvScriptLoadingPromise: Promise<void>;

const TradingViewWidget = () => {
  const onLoadScriptRef = useRef<React.EffectCallback | null>(null);
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise<void>((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = () => resolve();

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => {
      if (onLoadScriptRef.current) {
        onLoadScriptRef.current();
      }
      onLoadScriptRef.current = null;
    };

    function createWidget(): void {
      if (
        document.getElementById("tradingview_cb1c2") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          autosize: "true",
          symbol: "BINANCE:ADAUSDT",
          interval: "D",
          timezone: "Etc/UTC",
          theme: `${isDarkMode ? "Dark" : "light"}`,
          style: "1",
          locale: "en",
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          hide_watchlist: false,
          watchlist: ["BINANCE:BTCUSDT", "BINANCE:BNBUSDT"],
          container_id: "tradingview_cb1c2",
        });
      }
    }
  }, [isDarkMode]);

  return (
    <div>
      <div className="tradingview-widget-container">
        <div className="h-screen" id="tradingview_cb1c2" />
        <div className="tradingview-widget-copyright h-fit">
          <a
            href="https://www.tradingview.com/"
            rel="noopener nofollow"
            target="_blank"
          ></a>
        </div>
      </div>
    </div>
  );
};

export default TradingViewWidget;
