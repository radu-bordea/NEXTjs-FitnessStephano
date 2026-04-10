import { getUserRole } from "@/app/actions/getUserRole";
import NavbarClient from "./NavbarClient";

export default async function NavbarServer() {
  const role = await getUserRole();

  return <NavbarClient role={role} />;
}