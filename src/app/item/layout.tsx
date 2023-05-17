// import ItemTemplate from "@/app/item/template";

export default function DashboardLayout({children,}: { children: React.ReactNode; }) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>
      {children}
      Template Item
    </section>
  );
}
