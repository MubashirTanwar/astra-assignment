// root proider export
import QueryClientProvider from "./QueryClientProvider";
import { ThemeProvider } from "./ThemeProvider";


export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryClientProvider>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}