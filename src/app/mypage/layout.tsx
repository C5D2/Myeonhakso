function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <div className="basis-1/5">layout</div>
      {children}
    </div>
  );
}

export default Layout;
