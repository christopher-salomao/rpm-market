function Footer() {
  return (
    <footer className="w-full h-16 flex items-center justify-center font-medium text-lg px-4">
      &copy; 2010-{new Date().getFullYear()} RPM Market. Todos os direitos reservados.
    </footer>
  );
}

export default Footer;
