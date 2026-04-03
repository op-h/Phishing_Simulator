import "./globals.css";

export const metadata = {
  title: "SOC Platform | Simulator",
  description: "Internal SOC Phishing and Smishing Simulator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
