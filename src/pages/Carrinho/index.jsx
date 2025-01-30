export function Carrinho() {
  return (
    <div className="w-full h-full flex justify-center">
          <div className="hidden md:flex">
            <Navbar />
          </div>
    
          <div className="flex md:hidden">
            <NavbarMobile />
          </div>
          </div>
  )
}