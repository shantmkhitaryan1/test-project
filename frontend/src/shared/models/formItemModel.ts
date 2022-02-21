export interface FormItemModel {
    value: string;
    pattern: RegExp[] | null;
    valid: boolean;
}