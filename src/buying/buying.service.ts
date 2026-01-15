import { Injectable, Param } from '@nestjs/common';
import { CreateBuyingDto } from './dto/create-buying.dto';
import { Item } from './entities/buying.entity';
import { InjectModel } from '@nestjs/sequelize';
import { readFileSync } from 'fs';

@Injectable()
export class BuyingService {

  constructor(
    @InjectModel(Item)
    private itemModel: typeof Item
  ) {}

  async buyWepon(createBuyingDto: CreateBuyingDto) {

    let priceAll = 0;
    for(let oneItem of createBuyingDto["purchases"]){
      priceAll += oneItem["pricePerUnit"] * oneItem["quantity"]
    }

    const getCurrentBudget = readFileSync("./Budget.json", "utf-8"); 
    const changeToObject = JSON.parse(getCurrentBudget)

    if (changeToObject < priceAll){
      throw new Error("you didn't have enugth budget")
    }

    let allItems: any = []
    for(let oneItem of createBuyingDto["purchases"]){
      const getName = oneItem["name"]
      const itemData : Item | null =  await this.itemModel.findOne<Item>({
        where: { getName} }
      );
      if (!itemData){
        this.itemModel.create({createBuyingDto})
      } else {
        const increase = itemData.quantity + createBuyingDto.purchases["quantity"]
        this.itemModel["quantity"].update(increase)
      }

      allItems.push({"id": oneItem["id"], "newQuantity": oneItem["quantity"], "spent": priceAll})

    return {"result": [
      allItems
    ]};
    }
  }

}