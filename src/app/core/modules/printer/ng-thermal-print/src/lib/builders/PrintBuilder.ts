export abstract class PrintBuilder {
    public abstract init(): void;
    /**
     *
     * @param cutType fill|partial
     */
    public abstract cut(cutType: string): void;
    public abstract flush(): any;
    public abstract feed(lineCount: number): void;
    public abstract setInverse(value: boolean): void;
    public abstract setBold(value: boolean): void;
    /**
     *
     * @param value left\center\right
     */
    public abstract setJustification(value: string): void;
    /**
     *
     * @param value normal\large
     */
    public abstract setSize(value: string): void;
    public abstract setUnderline(value: boolean): void;
    public abstract writeLine(text: string): void;
}