interface HeaderType {
  children: string;
}

export function Header({ children }: HeaderType) {
  return (
    <header>
      <h1>{children}</h1>
    </header>
  );
}
