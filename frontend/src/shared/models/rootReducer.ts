import { PdfReducerInterface } from "./pdfModel/reducerModel";
import { UserReducerInterface } from "./userModel/reducerModel";

export interface RootReducerInterface {
    user: UserReducerInterface;
    pdf: PdfReducerInterface;
}