import { useQuery } from "@tanstack/react-query";
import logo from "/silk-armis-logo.png";
import { trpc } from "./trpc.ts";

function App() {
  const serverTime = useQuery(trpc.utils.getServerTime.queryOptions());
  const tables = useQuery(trpc.utils.getDbTables.queryOptions());

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={logo} alt="logo" height={150} />
      </div>
      <p>
        Last server fetch:{" "}
        {serverTime.isLoading || !serverTime.data
          ? "loading..."
          : serverTime.data.time.toLocaleString()}
      </p>
      <p>
        Available db tables:{" "}
        <strong>
          {tables.isLoading || !tables.data
            ? "loading..."
            : tables.data.join(", ")}
        </strong>
      </p>
    </div>
  );
}

export default App;
