export class Locker {
  private records: Record<string, boolean> = {};

  public lock = (name: string): void => {
    this.records[name] = true;
  };

  public unlock = (name: string): void => {
    delete this.records[name];
  };

  public isLocked = (name: string): boolean => !!this.records[name];
}
