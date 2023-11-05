import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { BlockNumber } from "./components/BlockNumber";
import { Block } from "./components/Block";
import { Tx } from "./components/Tx";
import { Balance } from "./components/Balance";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/blockNumber" element={<BlockNumber />}></Route>
          <Route path="/balance/:address" element={<Balance />}></Route>
          <Route path="/tx/:tx" element={<Tx />}></Route>
          <Route path="/block/:block" element={<Block />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
