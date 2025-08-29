export type PageProps<TParams = {}, TSearch = {}> = {
  params: Promise<TParams>;
  searchParams?: Promise<TSearch>;
};
