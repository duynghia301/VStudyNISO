
export interface PageProps<TParams = Record<string, string | string[]>> {
  params?: TParams;
  searchParams?: Record<string, string | string[] | undefined>;
}

export interface LayoutProps<TParams = Record<string, string | string[]>> {
  children: React.ReactNode;
  params?: TParams;
}
