import NavbarServer from "@/components/NavbarServer";


export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarServer/>
      {children}
    </>
  );
}