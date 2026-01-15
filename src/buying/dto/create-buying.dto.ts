import { IsNotEmpty } from "class-validator";

export class CreateBuyingDto {
    @IsNotEmpty({
        each: true
    })
    purchases: [{
        name: string,
        type: string,
        quantity: number,
        pricePerUnit: number,
    }];
}