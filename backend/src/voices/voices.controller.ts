import { Controller, Get } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import voices from "./voices";

@Controller("voices")
export class VoicesController {

  @ApiOperation({ summary: "Получение голосов" })
  @Get()
  get() {
    return voices
  }
}
