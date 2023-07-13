export interface Plugin {}

export interface MenuPlugin extends Plugin {
  run(): Promise<void>;
}
