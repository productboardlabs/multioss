export interface WorkspaceBuilderSchema {
  /**
   * Library name
   */
  name: string;
  /**
   * Use @babel/register to avoid manual compilation
   * @default true
   */
  autoCompile?: boolean;
  /**
   * Skip formatting files
   */
  description?: string;
  /**
   * Skip formatting files
   * @default false
   */
  skipFormat?: boolean;
}
