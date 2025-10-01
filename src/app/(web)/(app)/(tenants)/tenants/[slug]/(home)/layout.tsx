import Navbar from '@/modules/home/ui/components/navbar'

interface Props {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}
const Layout = ({ children, params }: Props) => {
  return (
    <div className="min-h-screen bg-[#F4F4F0] flex flex-col">
      <Navbar />
      {children}
    </div>
  )
}

export default Layout
