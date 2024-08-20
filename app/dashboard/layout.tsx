import { Navbar } from "@/app/dashboard/_components/navbar"
import { WelcomeMsg } from "@/app/dashboard/_components/welcomeMsg"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <WelcomeMsg />
      <main>{children}</main>
    </>
  )
}

export default DashboardLayout
