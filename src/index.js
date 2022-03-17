import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// import the queryClient and queryClientProvider from react-query
import { QueryClient, QueryClientProvider } from "react-query";
// import ReactQueryDevTools to check react-query calls and stored cache data
import { ReactQueryDevtools } from "react-query/devtools";

// create a query client
const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        {/* Wrap the <App /> with <QueryClientProvider /> and pass client prop with queryClient*/}
        <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);
