import React, { useEffect, useRef, useState } from "react";

const CustomersMF: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isContainerReady, setIsContainerReady] = useState(false);

  useEffect(() => {
    const checkContainer = () => {
      if (containerRef.current) {
        setIsContainerReady(true);
        return true;
      }
      return false;
    };

    if (checkContainer()) {
      return;
    }

    const intervalId = setInterval(() => {
      if (checkContainer()) {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isContainerReady) {
      return;
    }

    const loadMicrofrontend = async () => {
      try {
        setIsLoading(true);
        setError(null);

        await new Promise((resolve) => setTimeout(resolve, 50));

        const container = containerRef.current;
        if (!container) {
          throw new Error("Container element not found");
        }

        const module = await import("customersMF/bootstrap");
        const bootstrapFn = module.bootstrap || module.default;

        if (!bootstrapFn) {
          throw new Error("Bootstrap function not found");
        }

        await bootstrapFn(container);
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading Customer Management microfrontend:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setIsLoading(false);
      }
    };

    loadMicrofrontend();
  }, [isContainerReady]);

  return (
    <div
      className="customers-mf-container"
      style={{
        width: "100%",
        height: "100%",
        minHeight: "500px",
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#f8f9fa",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            zIndex: 10,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "4px solid rgba(255,255,255,0.3)",
              borderTop: "4px solid white",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <div style={{ fontSize: "20px", fontWeight: "600" }}>
            Loading Customer Management
          </div>
          <div style={{ fontSize: "14px", opacity: 0.8, textAlign: "center" }}>
            {!isContainerReady
              ? "Preparing container..."
              : "Initializing Angular microfrontend..."}
          </div>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      )}

      {error && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            padding: "40px",
            background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
            color: "white",
            zIndex: 10,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "56px" }}>⚠️</div>
          <h2 style={{ margin: 0, fontSize: "28px", fontWeight: "700" }}>
            Customer Management Unavailable
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: "16px",
              opacity: 0.9,
              maxWidth: "500px",
            }}
          >
            {error}
          </p>
          <div
            style={{
              marginTop: "24px",
              padding: "20px",
              background: "rgba(255,255,255,0.15)",
              borderRadius: "12px",
              fontSize: "14px",
              lineHeight: "1.6",
              backdropFilter: "blur(10px)",
            }}
          >
            <p
              style={{
                margin: "0 0 12px 0",
                fontWeight: "600",
                fontSize: "16px",
              }}
            >
              Troubleshooting Steps:
            </p>
            <div style={{ textAlign: "left", opacity: 0.9 }}>
              • Ensure Angular microfrontend is running on port 3001
              <br />
              • Check browser console for detailed error messages
              <br />
              • Verify network connectivity to the microfrontend
              <br />• Try refreshing the page
            </div>
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        data-container="angular-mf"
        style={{
          width: "100%",
          height: "100%",
          minHeight: "500px",
          background: "#ffffff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
        }}
      />
    </div>
  );
};

export default CustomersMF;
