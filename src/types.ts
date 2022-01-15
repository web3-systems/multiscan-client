export interface BlockPagination {
  startblock?: number;
  endblock?: number;
  sort?: 'asc' | 'desc';
  page?: number;
  offset?: number;
}

export interface AccountMinedBlocksConfig {
  blocktype?: 'blocks' | 'uncles';
  page?: number;
  offset?: number;
}
